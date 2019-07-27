<template>
  <!-- 这是EditUser组件 -->
  <div class="EditUser">
    <!-- iView 的添加用户的模态对话框 -->
    <Modal
      v-model="modal1"
      title="编辑用户"
      @on-ok="ok"
      @on-cancel="cancel"
      width="500"
      ok-text="确定"
      cancel-text="取消"
      :mask-closable="false"
    >
      <!--给 Form  先设置 label-width，  才能给 FormItem 设置属性 label , label可以显示表单域的标签-->
      <Form
        ref="formInline"
        :model="formInline"
        :rules="ruleInline"
        :label-width="80"
        inline
      >
        <!-- 用户栏 -->
        <FormItem prop="name" label="用户名">
          <Input type="text" v-model="formInline.name" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 学校栏 -->
        <FormItem prop="school" label="学校">
          <Input v-model="formInline.school" placeholder="school">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 电话栏 -->
        <FormItem prop="phone" label="电话">
          <Input v-model="formInline.phone" placeholder="phone">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!-- 邮箱栏 -->
        <FormItem prop="mail" label="邮箱">
          <Input v-model="formInline.mail" placeholder="mail">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import eventbus from "../../eventbus";
import api from "../api";
export default {
  name: "EditUser",
  data() {
    return {
      modal1: false,
      formInline: {
        // user: "",
        // password: ""
      },
      ruleInline: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        school: [
          {
            required: true,
            message: "请输入学校",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          },
          // 邮箱输入规范
          {
            type: "email",
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入电话",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // props: ["show"], 会改变父组件的modal 属性，不可用
  created() {
    eventbus.$on("popEdit", () => {
      this.modal1 = true;
    });
  },
  methods: {
    // 添加
    ok() {
      // this.$Message.info("Clicked ok");
      if (this.formInline.name == undefined) {
        return;
      } else {
        api.ok(this.formInline).then(() => {
          this.$emit("updata"); // 成功之后初始化用户列表
          this.formInline = {};
        });
      }
    },
    // 取消
    cancel() {
      // this.$Message.info("Clicked cancel");
      this.formInline = {};
    }
  }
};
</script>
