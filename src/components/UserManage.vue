<template>
  <div class="UserManage">
    <div class="layout">
      <Layout>
        <Header class="head-back-color">
          <Button @click="setRole" type="info">设置角色</Button>
          <Button @click="addUser" type="primary">添加</Button>
          <Button @click="delUser" type="warning">删除</Button>
          <Button @click="editUser" type="error">编辑</Button>
          <Input placeholder="请输入您要查询的用户名" style="width:240px" />
          <Button @click="searchData" class="searchBtn" type="primary"
            >查询</Button
          >
          <Button @click="cancelData" class="searchBtn" type="warning"
            >取消</Button
          >
        </Header>
        <Content :style="{ padding: '0  0 25px' }">
          <Card>
            <div style="min-height: 200px;">
              <userTable :tabledata="tabledata">用户列表</userTable>
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
import api from "../api";
import userTable from "../components/UserTable";
export default {
  name: "userManage",
  data() {
    return {
      total: 0,
      pageSize: 10,
      current: 1,
      tabledata: [] // 往表格添加数据
    };
  },
  components: {
    //  注册 子组件 userTable
    userTable
  },
  created() {
    this.searchData();
  },
  methods: {
    // 当前页
    handlePageChange(page) {
      this.current = page;
      this.searchData();
    },
    // 一页多少条
    handlePageSizeChange(pageSize) {
      console.log(pageSize);
    },
    setRole() {},
    addUser() {},
    delUser() {},
    editUser() {},
    cancelData() {},
    searchData() {
      // 拿到用户数据， 在data里面定义一个空数组tabledata，
      api.getUser(this.current, this.limit, this.searchVal).then(res => {
        console.log(res);
        const total = parseInt(res.headers["x-total-count"]);
        //  tabledata去接受下拿到的数据
        this.tabledata = res.data;
        // 数据的总条数 从请求头里面拿
        this.total = total;
      });
    },
    candelData() {} // 取消
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
