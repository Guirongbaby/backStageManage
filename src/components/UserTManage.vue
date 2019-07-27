<template>
  <div class="UserTManage">
    <div class="layout">
      <Layout>
        <Header class="head-back-color">
          <Button @click="setRole" type="info">设置角色</Button>
          <Button @click="setRepository" type="success">设置权限</Button>
          <Button @click="addUserModal" type="primary">添加用户</Button>
          <Button @click="editUserModal" type="warning">编辑用户</Button>
          <Button @click="delUserModal" type="error">删除用户</Button>
          <Input
            v-model="searchVal"
            placeholder="请输入您要查询的用户名"
            style="width:300px"
          />
          <Button @click="searchData" class="searchBtn" type="primary"
            >查询</Button
          >
          <Button @click="cancelData" class="searchBtn" type="warning"
            >取消</Button
          >
          <!-- Button 按钮弹出的模态对话框 用自己定义的组件addUser写 -->
          <!--  1 Modal 的第一个弹出框 add -->
          <addUser
            :selections="selections"
            :flag="flag"
            @updata="searchData"
          ></addUser>

          <!--  2 Modal 的第二个弹出框del -->
          <!-- <delUser @updata="searchData"></delUser> -->

          <!--  3 Modal 的第三个弹出框edit -->
          <!-- <editUser @updata="searchData"></editUser> -->
        </Header>
        <Content :style="{ padding: '0  0 25px' }">
          <Card>
            <div style="min-height: 400px;">
              <!-- 引入列表组件 -->
              <userTable
                @select-change="handleSelectChange"
                :tabledata="tabledata"
                >用户列表2</userTable
              >
            </div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">
          <!-- <div class="page-button"> -->
          <!-- <div class="page">
              <Button>设置全选</Button>
              <Button>取消全选</Button>
            </div> -->
          <!-- <AddPage
            @pageChange="changepage"
            @PageSizeChange="nowPageSize"
            :totalNumber="totalNumber"
          ></AddPage> -->
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
          <!-- </div> -->
        </Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
import eventbus from "../../eventbus";
// import editUser from "../components/EditUser"; // 引入编辑 用户 的组件
// import delUser from "../components/DelUser"; //引入删除用户 组件
import addUser from "../components/AddUser"; //引入添加用户组件
import userTable from "../components/UserTable"; //引入table组件
import api from "../api";

export default {
  name: "userTManage",
  // 存储数据
  data() {
    return {
      total: 0, // 一共多少条数据
      pageSize: 10,
      current: 1, // 当前第几页
      tabledata: [], // 往表格添加数据
      searchVal: "",
      addModal: false,
      selections: [], // 存储选中行的数据
      flag: "add" // add代表是新增, edit代表编辑
    };
  },
  components: {
    // 注册 子组件 userTable addUser delUser editUser
    userTable, // 用户列表2
    addUser //  谈话框 添加用户
    // delUser // 谈话框 删除用户
    // editUser // 编辑用户
  },
  created() {
    this.searchData();
  },

  methods: {
    //  选择项改变是触发:
    handleSelectChange(selections) {
      this.selections = selections;
    },
    // 当前页
    handlePageChange(page) {
      this.current = page;
      this.searchData();
    },
    // 一页多少条
    handlePageSizeChange(limit) {
      this.pageSize = limit;
      this.searchData();
    },
    setRole() {},
    setRepository() {},
    // 弹出添加用户的模态框
    addUserModal() {
      this.flag = "add";
      eventbus.$emit("pop");
      // this.addModal = true;会改变父组件的属性 不可用
    },
    // 编辑 弹出框
    editUserModal() {
      // eventbus.$emit("popEdit");
      // 1. 判断是否选中一个，只能选中一个，
      // 2. 如果选中多个，会提示: 只能选择 一个
      // 3. 选择一行之后， 拿到当前行的数据
      //  4 .
      const selections = this.selections;

      if (selections.length === 0) {
        this.$Message.error("请先选中一条数据！");
      } else if (selections.length !== 1) {
        this.$Message.error("只能选中一条数据！");
      } else {
        // this.$Message.success("success！！！");
        this.flag = "edit";
        eventbus.$emit("pop");
      }
    },
    // 删除 弹出框
    delUserModal() {
      // eventbus.$emit("popDelete");
      // 1. 判断是否选中一个，只能选中一个，
      const selections = this.selections;

      if (selections.length === 0) {
        this.$Message.error("请先选中一条数据！");
      } else {
        this.$Modal.confirm({
          title: "你确认删除吗",
          content: "",
          onOk: () => {
            // this.$Message.info("Clicked ok");
            api.delUser(selections[0].id).then(() => {
              this.$Message.success("删除成功！");
              this.searchData();
            });
          },
          onCancel: () => {
            // this.$Message.info("Clicked cancel");
          }
        });
      }
    },
    // 初始化表格数据
    searchData() {
      this.selections = []; //页面再次刷新时，清空选中行的数据
      // 拿到用户数据， 在data里面定义一个空数组tabledata，
      api.getUser(this.current, this.pageSize, this.searchVal).then(res => {
        const total = parseInt(res.headers["x-total-count"]);
        //  tabledata去接受下拿到的数据
        this.tabledata = res.data;
        // 数据的总条数 从请求头里面拿
        this.total = total;
      });
    },
    // 搜索框取消查询 按钮
    cancelData() {
      this.searchVal = "";
      this.searchData();
    }
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
  // Footer 分页区域的 样式
  // .page-button {
  //   display: flex;
  //   justify-content: space-between;
  // }
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
