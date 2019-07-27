<template>
  <div class="UserManage">
    <!-- 这是列表页面 -->
    <div class="layout">
      <div class="layout-logo"></div>
      <Layout>
        <Header class="tophead">
          <p>后台权限管理</p>
          <h2>取消登录</h2>
        </Header>
        <Layout>
          <!--  S 侧边栏sider布局 -->
          <Sider
            class="sider-left"
            hide-trigger
            :style="{ background: '#fff' }"
          >
            <Menu
              active-name="1-2"
              theme="light"
              width="auto"
              :open-names="['1']"
            >
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  <!-- Item 1 -->
                  列表分配
                </template>
                <router-link to="/UserManage">
                  <MenuItem name="1-1">
                    <Icon type="ios-contact" />用户列表</MenuItem
                  >
                </router-link>
                <router-link to="/UserTManage">
                  <MenuItem name="1-2">
                    <Icon type="ios-contact" />用户列表 2</MenuItem
                  >
                </router-link>
                <router-link to="/RoleManage">
                  <MenuItem name="1-4">
                    <Icon type="md-contacts" />角色管理</MenuItem
                  >
                </router-link>
                <router-link to="/AuthorityManage">
                  <MenuItem name="1-3">
                    <Icon type="md-create" />权限管理</MenuItem
                  >
                </router-link>
              </Submenu>
            </Menu>
          </Sider>
          <!--  E 侧边栏sider布局 -->

          <!-- S 中间 Content 布局 -->
          <Layout :style="{ padding: '0 24px 24px' }">
            <Content
              :style="{
                padding: ' 0 18px 18px',
                minHeight: '280px',
                background: '#fff'
              }"
            >
              <router-view />
            </Content>
          </Layout>
          <!-- E 中间 Content 布局 -->
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
export default {
  name: "Manage",
  data() {
    return {};
  },
  methods: {
    out() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="scss">
.layout {
  min-height: 750px;
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  .tophead {
    height: 60px;
    line-height: 60px;
    color: #f5f7f9;
    p {
      float: left;
      font-size: 26px;
    }
    h2 {
      float: right;
      cursor: pointer;
    }
  }
}
// .layout-logo {
//   width: 100px;
//   height: 30px;
//   background: #5b6270;
//   border-radius: 3px;
//   float: left;
//   position: relative;
//   top: 15px;
//   left: 20px;
// }
// .layout-nav {
//   width: 420px;
//   margin: 0 auto;
//   margin-right: 20px;
// }
.sider-left {
  height: 750px;
  .sider-l {
    background-color: white;
  }
}
</style>
