<template>
  <!-- 这是AddUser组件 -->
  <div class="AddUser">
    <!-- iView 的添加用户的模态对话框 -->
    <Modal
      v-model="modal1"
      :title="flag === 'add' ? '添加用户' : '编辑用户'"
      @on-ok="ok"
      @on-cancel="cancel"
      :mask-closable="false"
      width="500"
      ok-text="确定"
      cancel-text="取消"
    >
      <!--给 Form  先设置 label-width，  才能给 FormItem 设置属性 label , label可以显示表单域的标签-->
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :label-width="80"
      >
        <!-- 用户栏 -->
        <FormItem prop="name" label="用户名">
          <Input
            type="text"
            v-model="formInline.name"
            placeholder="请输入用户名"
          >
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 学校栏 -->
        <FormItem prop="school" label="学校">
          <Input v-model="formInline.school" placeholder="请输入学校">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 电话栏 -->
        <FormItem prop="phone" label="电话">
          <Input v-model="formInline.phone" placeholder="请输入电话">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 邮箱栏 -->
        <FormItem prop="mail" label="邮箱">
          <Input v-model="formInline.mail" placeholder="请输入邮箱">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="handleCancel">取消</Button>
        <Button type="primary" @click="handleSubmit">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import eventbus from "../../eventbus";
import api from "../api";
export default {
  name: "AddUser",
  props: {
    flag: {
      type: String,
      default: "add"
    },
    selections: {
      type: Array,
      default: () => []
      // 假如是对象类型 就下面这么写：
      // type: Object,
      // default: () =>({})
    }
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value !== 0 && !value) {
        return callback(new Error("电话不能为空！"));
      }

      if (!Number.isInteger(value - 0)) {
        callback(new Error("请输入数字"));
      } else {
        if (value.length !== 11) {
          callback(new Error("手机号码长度必须11位"));
        } else {
          callback();
        }
      }
    };
    return {
      modal1: false, // 打开或者关闭对话框
      formInline: {
        id: "",
        name: "",
        school: "",
        phone: "",
        mail: ""
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        school: [
          {
            required: true,
            message: "请输入学校",
            trigger: "change"
          }
        ],
        mail: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change"
          },
          // 邮箱输入规范
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: "change"
          }
        ],
        phone: [
          {
            // type: "phone",
            required: true,
            message: "请输入电话",
            trigger: "change"
          },
          {
            validator: validatePhone,
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    modal1: {
      handler(newVal) {
        // console.log("newVal :", newVal);
        if (!newVal) {
          // 如果模态框是关闭状态，不执行任何语句
          // 如果是打开对话框，继续往下执行，初始化表单
          return;
        }
        if (this.flag === "edit") {
          // 如果是编辑
          // 那么初始化表单，把选中行的数据 填充到 表单中
          const { id, school, mail, phone, name } = this.selections[0] || {};
          const newItem = { id, school, mail, phone, name };
          this.formInline = newItem;
        } else {
          this.formInline = {
            ...this.formInline, // 先
            id: ""
          };
        }
      },
      immediate: true // true页面初始化的时候就监听flag的值， false 默认值，只有flag改变才会触发handler方法
      // deep: true  // 深度监听， 如果是对象 或者数组这样的复杂数据类型， deep为true能监听到对象或者数组属性的改变，否则只能监听到 数据整体改变。简单数据类型可写也可以不写
    }
  },
  // props: ["show"], 会改变父组件的modal 属性，不可用
  created() {
    eventbus.$on("pop", () => {
      this.modal1 = true;
    });
  },
  methods: {
    // 手动点击取消按钮：两个功能：
    // 1-取消 本身的功能：关闭Modal框
    // 2-执行重置表单方法： resetFields
    handleCancel() {
      // 关闭对话框！
      this.modal1 = false;
      this.$refs["formInline"].resetFields();
    },
    // 点击 的确定按钮-校验->提交
    handleSubmit() {
      this.$refs["formInline"].validate(valid => {
        if (valid) {
          // 如果是添加
          if (this.flag === "add") {
            api.addUser(this.formInline).then(res => {
              if (res.status === 201) {
                this.$emit("updata"); // 成功之后初始化用户列表
                this.$Message.success("添加成功！！");
                // 关闭对话框！
                this.modal1 = false;
                this.$refs["formInline"].resetFields();
              } else {
                this.$Message.error("添加失败！！！");
              }
            });
          } else {
            // 如果是修改
            // this.$Message.info("编辑"); alert提示
            const { id, phone, school, name, mail } = this.formInline;
            api.editUser(id, { phone, school, name, mail }).then(res => {
              if (res.status === 200) {
                this.$emit("updata"); // 成功之后初始化用户列表
                this.$Message.success("编辑成功！！");
                // 关闭对话框！
                this.modal1 = false;
                this.$refs["formInline"].resetFields();
              } else {
                this.$Message.error("编辑失败！！！");
              }
            });
          }
        } else {
          console.log("表单校验没有通过");
        }
      });
    },
    // 添加
    ok() {
      // validate
      // this.$Message.info("Clicked ok");
      // if (this.formInline.name == undefined) {
      //   return;
      // } else {
      //   api.ok(this.formInline).then(() => {
      //     this.$emit("updata"); // 成功之后初始化用户列表
      //     this.formInline = {};
      //   });
      // }
    },
    // 取消
    cancel() {
      // this.$Message.info("Clicked cancel");
      // this.formInline = {};
      // 模态框关闭之后   重置表单内容 用 Form 的 resetFields方法
      this.$refs["formInline"].resetFields();
    }
  }
};
</script>
