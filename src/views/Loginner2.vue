<template>
  <!-- 这是自己手写的 -->
  <div class="login">
    <h1>欢迎登录后台管理系统</h1>
    <div class="login-box">
      <form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        action
        id="back-login-list"
      >
        <input type="text" placeholder="UserName" name="username" /><br />
        <input type="password" placeholder="UserPassword" name="password" />
        <div @click="jump" class="list-log">LOGIN</div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api.js";
import { setTimeout } from "timers";
export default {
  name: "login",
  data() {
    return {
      ruleForm2: {
        username: "",
        password: ""
      },
      rules2: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "长度在3到5个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在3 到12个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    jump() {
      //进行校验
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          api
            .login({
              username: this.ruleForm2.username,
              password: this.ruleForm2.password
            })
            .then(res => {
              if (res.data.code == 1) {
                this.$store.commit("inituserIdList", res.data.user.id);
                this.$Spin.show();
                setTimeout(() => {
                  this.$Spin.hide();
                  this.$router.push("/Manage");
                }, 1000);
              } else {
                this.$message("这是一条消息提示");
              }
            });
        } else {
          this.$message.error("用户名或密码错误， 请重输！");
        }
      });
      // this.$router.push("/Manage");
    }
  }
};
</script>
<style>
body,
html {
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

<style lang="scss" scoped>
// background: url("../assets/back.jpg") no-repeat;
.login {
  h1 {
    text-align: center;
    margin-top: 60px;
    // color: #f16deb;
    font-size: 50px;
  }
  background: url("../assets/back.jpg") no-repeat;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: 100% 100%;
  background-attachment: fixed;
  .login-box {
    background-color: #22afda;
    width: 500px;
    height: 380px;
    line-height: 100px;
    margin-left: 50px;
    text-align: center;
    padding-top: 50px;
    position: absolute;
    left: 34%;
    #back-login-list {
      input {
        outline: none;
        border: none;
        width: 400px;
        height: 50px;
        padding-left: 1em;
        margin-bottom: 20px;
      }
      &:hover {
        color: rgb(0, 255, 55);
      }
      .list-log {
        margin-left: 60px;
        width: 380px;
        border: 1px solid #f16deb;
        text-align: center;
        font-size: 24px;
        border-radius: 7px;
      }
    }
  }
}
</style>
