import Vue from "vue";
import Router from "vue-router";
import Login from "./views/Login.vue";
import Manage from "./views/Manage.vue";
import UserManage from "./components/UserManage"; // 用户列表管理
import UserTManage from "./components/UserTManage"; // 用户列表管理2
import RoleManage from "./components/RoleManage"; // 角色管理
import AuthorityManage from "./components/AuthorityManage"; //权限管理

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    // { duplicate defination...↓ ↑
    //   path: "/login",
    //   name: "login",
    //   component: Login
    // },
    {
      path: "/Manage",
      name: "manage",
      component: Manage,
      // Manage 的子组件children有 4 个。
      children: [
        {
          path: "/UserTManage",
          component: UserTManage
        },
        {
          path: "/UserManage",
          component: UserManage
        },
        {
          path: "/RoleManage",
          component: RoleManage
        },
        {
          path: "/AuthorityManage",
          component: AuthorityManage
        }
      ]
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
