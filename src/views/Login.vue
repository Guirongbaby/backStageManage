<template>
  <div id="login">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item class="ziti" label="用户名" prop="username">
        <el-input
          type="text"
          v-model="ruleForm2.username"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="ziti" label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm2.pass"
          auto-complete="off"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from "../api.js";
export default {
  name: "login",
  data() {
    return {
      ruleForm2: {
        username: "",

        pass: ""
        // age: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在3到5个字符", trigger: "blur" }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ]
        // pass: [
        //   { required: true, message: "请输入密码", trigger: "blur" },
        //   { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        // ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          api
            .login({
              username: this.ruleForm2.username,
              password: this.ruleForm2.pass
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$store.commit("inituserIdList", res.data.user.id);
                // this.$Spin.show();
                setTimeout(() => {
                  // this.$Spin.hide();
                  this.$router.push("/Manage");
                }, 1000);
              } else {
                this.$message("这是一条消息提示");
              }
            });
        } else {
          this.$message.error("用户名或密码错误,请重新输入！！！");
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
#login {
  .demo-ruleForm {
    width: 25%;
    margin: 200px auto;
  }
}
</style>
<style>
body {
  background: url("../assets/back.jpg") no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-attachment: fixed;
}
</style>
