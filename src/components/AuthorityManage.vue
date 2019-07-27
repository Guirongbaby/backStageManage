<template>
  <div class="UserTManage">
    <div class="layout">
      <Layout>
        <Header class="head-back-color">
          <Button @click="setRole" type="info">添加权限</Button>
          <Button @click="setRepository" type="error">删除权限</Button>
          <Button @click="editUser" type="success">编辑权限</Button>
          <Input placeholder="请输入您要查询的用户名" style="width:200px" />
          <Button @click="searchData" class="searchBtn" type="primary"
            >搜索</Button
          >
        </Header>
        <Content :style="{ padding: '0  0 25px' }">
          <Card>
            <div style="min-height: 200px;">
              <!-- 引入列表组件 -->
              <authorityTable :authoritydata="authoritydata"
                >权限管理</authorityTable
              >
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
import AuthorityTable from "../components/AuthorityTable";
import api from "../api";
export default {
  name: "authorityManage",
  data() {
    return {
      total: 0,
      pageSize: 10,
      current: 1,
      authoritydata: [] // 往表格里添加数据
    };
  },
  components: {
    AuthorityTable // 注册子组件 authorityTable
  },
  created() {
    this.searchData();
  },
  methods: {
    // 当前页
    handlePageChange(current) {
      console.log(current);
      // this.current = page;
      // this.searchData();
    },
    // 一页多少条
    handlePageSizeChange(pageSize) {
      console.log(pageSize);
    },
    setRole() {},
    setRepository() {},
    editUser() {},
    searchData() {
      // 拿到用户数据， 在data 里面定义一个空数组 authoritydata,
      api.getAuthority(this.current, this.limit, this.searchVal).then(res => {
        // authoritydata 去接受下拿到的数据
        this.authoritydata = res.data;
        // 数据的 总条数， 从请求头里面拿
        // this.total = total;
      });
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
