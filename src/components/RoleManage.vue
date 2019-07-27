<template>
  <div class="UserTManage">
    <div class="layout">
      <Layout>
        <Header class="head-back-color">
          <Button @click="setRole" type="info">设置权限</Button>
          <Button @click="modal1 = true" type="success">添加角色</Button>
          <Button @click="editRole" type="warning">编辑角色</Button>
          <Button @click="delRole" type="error">删除角色</Button>
          <Input
            v-model="searchVal"
            placeholder="请输入要查询的角色"
            style="width:200px"
            @on-search="initTable"
          />
          <Button @click="searchData" class="searchBtn" type="primary"
            >搜索</Button
          >
          <!--  添加角色 管理 弹出框  -->
          <Modal
            v-model="modal1"
            title="添加角色"
            @on-ok="ok1"
            @on-cancel="cancel"
            width="500"
            ok-text="确定"
            cancel-text="取消"
          >
            <!--给 Form  先设置 label-width，  才能给 FormItem 设置属性 label , label可以显示表单域的标签-->
            <Form ref="formInline" :model="formInline" :label-width="80" inline>
              <!-- 角色名栏 -->
              <FormItem label="角色名">
                <Input
                  type="text"
                  v-model="formInline.name"
                  placeholder="请输入角色名"
                >
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <!-- 角色描述栏-->
              <FormItem label="角色描述">
                <Input v-model="formInline.des" placeholder="请对角色进行描述">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <!-- 提交时间栏 -->
              <FormItem label="提交时间">
                <Row>
                  <Col span="12">
                    <DatePicker
                      type="date"
                      show-week-numbers
                      placeholder="请选择日期"
                      style="width: 200px"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Modal>

          <!-- 编辑角色弹出框 -->
          <Modal
            v-model="modal2"
            title="编辑角色"
            @on-ok="ok2"
            @on-cancel="cancel"
            width="500"
            ok-text="确定"
            cancel-text="取消"
          >
            <!--给 Form  先设置 label-width，  才能给 FormItem 设置属性 label , label可以显示表单域的标签-->
            <!-- v-model="editbox" -->
            <Form :model="editbox" ref="formInline" :label-width="80" inline>
              <!-- 角色名栏 -->
              <FormItem label="角色名">
                <Input
                  type="text"
                  v-model="editbox.name"
                  placeholder="请输入角色名"
                >
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>
              <!-- 角色描述栏-->
              <FormItem label="角色描述">
                <Input v-model="editbox.des" placeholder="请对角色进行描述">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
                </Input>
              </FormItem>

              <!-- 提交时间栏 -->
              <FormItem label="提交时间">
                <Row>
                  <Col span="12">
                    <DatePicker
                      v-model="editbox.subon"
                      type="date"
                      show-week-numbers
                      placeholder="请选择日期"
                      style="width: 200px"
                    ></DatePicker>
                  </Col>
                </Row>
              </FormItem>
            </Form>
          </Modal>

          <!-- 删除角色 的弹出框 -->
          <Modal
            v-model="modal3"
            title="删除角色"
            @on-ok="ok3"
            @on-cancel="cancel"
            width="500"
            ok-text="确定"
            cancel-text="取消"
          >
            <p slot="top" style="color:#e74c3c;text-align:center">
              <Icon type="ios-information-circle" />
              <span>删除确认</span>
            </p>
            <div style="text-align:center">
              <p>角色删除！是否继续删除？</p>
            </div>
            <div slot="footer">
              <Button
                type="warning"
                html-type="submit"
                :loading="loading3"
                @click="deletedRole"
                >删除
              </Button>
            </div>
          </Modal>
        </Header>
        <Content :style="{ padding: '0  0 25px' }">
          <Card>
            <div style="min-height: 400px;">
              <!-- 引入角色管理的列表组件 -->
              <roleTable :roledata="roledata">角色管理</roleTable>
            </div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">
          <Page
            :total="total"
            :page-size="pageSize"
            :current="current"
            @on-change="handlePageChange"
            @on-page-size-change="handlePageSizeChange"
            show-total
            show-sizer
            show-elevator
          />
        </Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
import roleTable from "../components/RoleTable";
import api from "../api";
export default {
  name: "roleManage",
  data() {
    return {
      total: 0,
      pageSize: 10,
      current: 1,
      roledata: [], // 往表格添加数据
      modal1: false,
      modal2: false,
      modal3: false,
      loading3: false, //删除角色按钮绑定的添加事件
      editRow: "", // 要编辑的那条数据
      searchVal: "",
      //添加角色的
      formInline: {
        name: "",
        des: "",
        subon: ""
      },
      //  编辑角色的
      editbox: {
        name: "",
        des: "",
        subon: ""
      }
      // searchVal: ""
    };
  },
  components: {
    roleTable // 注册子组件 userTable
  },
  created() {
    this.searchData();
    api.getRole().then(res => {
      this.roledata = res.data;
    });
  },

  methods: {
    // 当前页
    handlePageChange(page) {
      // console.log(current);
      this.current = page;
      this.searchData();
    },
    // 一页多少条
    handlePageSizeChange(pageSize) {
      // console.log(pageSize);
      this.pageSize = pageSize;
      this.searchData();
    },
    // 添加角色的方法
    ok1() {
      api
        .addRole({
          name: this.formData.name,
          des: this.formData.des,
          subon: this.formData.subon,
          del: 0
        })
        .then(() => {
          this.initTable();
          this.formData = [];
        });
    },
    // 编辑角色的方法
    ok2() {
      api.ediRole(this.formInline.id, this.formInline).then(() => {
        this.initTable();
      });
    },
    // 对角色表格进行初始化
    initTable() {
      api.getRole(this.searchVal).then(res => {
        console.log(this.searchVal);
        this.roledata = res.data;
        this.editRow = [];
      });
    },
    // 删除角色的方法
    ok3() {},
    cancel() {},
    // formInline() {},
    setRole() {},
    // 编辑角色
    editRole() {
      if (this.editRow.length <= 0) {
        this.$Message.warning("请先选中角色再进行修改操作");
        return;
      } else {
        this.modal2 = true;
        this.formInline = this.editRow[0];
        console.log(this.formInline.id);
      }
    },

    // 删除角色按钮
    delRole() {
      if (this.editRow.length <= 0) {
        this.$Message.warning("请先选中角色再进行删除!");
        return;
      } else {
        this.modal3 = true;
      }
    },
    //弹出框确认后的 删除按钮
    deletedRole() {
      this.loading3 = true;
      setTimeout(() => {
        this.loading3 = false;
        this.modal3 = false;
        this.editRow.forEach(item => {
          api
            .delRole({
              id: item.id
            })
            .then(() => {
              this.initTable();
              console.log(this.editRow);
            })
            .catch(() => {
              this.$Notice.error({
                title: "删除异常"
              });
            });
        });
      }, 1000);
    },
    searchData() {
      // 拿到用户数据， 在data里面定义一个空数组roledata，
      api.getRole(this.searchVal, this.pageSize, this.current).then(res => {
        console.log("res :", res);
        //  tabledata去接受下拿到的数据
        this.roledata = res.data;
        this.editRow = [];
        // 数据的总条数 从请求头里面拿
        // const total = this.total;
      });
    } //查询
  }
};
</script>

<style lang="scss" scoped>
.layout {
  // border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 2px;
  overflow: hidden;
  .head-back-color {
    background-color: #2ecc71;
  }
}
// 设置按钮 输入框 之间的距离
button {
  margin-right: 10px;
}
.searchBtn {
  margin-left: 10px;
}
.layout-footer-center {
  text-align: center;
}
</style>
