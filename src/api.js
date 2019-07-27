import axios from "axios";
axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

export default {
  // #region 用户列表
  //  1 登录请求
  login(data) {
    return axios.post("/api/userlogin", data);
  },
  // #endregion

  // # region
  //  2 请求 用户列表2 列表数据
  getUser(page = 1, limit = 10, q = "") {
    // console.log(page, limit);
    return axios.get(
      `/api/user?_page=${page}&_limit=${limit}${q ? "&q=" + q : ""}`
    );
  },
  // 用户列表2 添加用户信息
  addUser(data) {
    return axios.post("/api/user", data);
  },
  // 用户列表2 删除用户信息
  delUser(id) {
    return axios.delete(`/api/user/${id}`);
  },

  // 用户列表2 编辑用户信息
  editUser(id, data) {
    return axios.put(`/api/user/${id}`, data);
  },
  // # endregion

  // #region
  // 3 请求 角色管理 后台列表数据
  getRole(q = "") {
    return axios.get(`/per/role/${q ? "?q=" + q : ""}`);
  },
  // 角色管理 添加角色
  addRole(data) {
    return axios.post("/per/role", data);
  },
  // 角色管理 编辑用户
  editRole(id, data) {
    return axios.put("/per/role/" + id, data);
  },
  // 角色管理 删除用户
  deleteRole(id, data) {
    return axios.put("/per/role/" + id, data);
  },

  // #endregion

  // #region
  // 4 请求 权限管理 后台列表数据
  getAuthority(q = "") {
    return axios.get(`/per/permission/${q ? "?q=" + q : ""}`);
  }
  // #endregion
};
