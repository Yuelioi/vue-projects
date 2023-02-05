<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";

import type { FormInstance } from "element-plus";

import { reactive } from "vue";

const ForgetPwdDlg = ref(false);
const formLabelWidth = "100px";

const form = reactive({
  name: "",
  oldpassword: "",
  newpassword: "",
});

let { btnloading } = storeToRefs(useLoginStore());
const { model, rules, login, reset_password, showAutoLoginDlg, AutoLogin } =
  toRefs(useLoginStore());

const formRef = ref<FormInstance>();
</script>
<template #default="scope">
  <div class="login">
    <el-card style="border-radius: 10px">
      <h2>BOT 管理系统</h2>
      <el-form class="login-form" :model="model" :rules="rules" ref="formRef">
        <el-form-item prop="username">
          <el-input
            prefix-icon="User"
            v-model="model.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="Flag"
            v-model="model.password"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="btnloading"
            class="login-button"
            type="primary"
            native-type="submit"
            @click="login(formRef)"
            block
            >登录</el-button
          >
        </el-form-item>
        <a class="forgot-password" @click="ForgetPwdDlg = true">忘记密码 ?</a>
      </el-form>
    </el-card>

    <el-dialog
      v-model="showAutoLoginDlg"
      title="状态检测"
      width="20%"
      style="border-radius: 5px"
    >
      <span>检测到登录信息,是否自动登录</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAutoLoginDlg = false">取消</el-button>
          <el-button type="primary" @click="AutoLogin()"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-model="ForgetPwdDlg"
      title="更改密码"
      width="25%"
      style="border-radius: 5px"
    >
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="form.oldpassword" autocomplete="off" />
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.newpassword" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="ForgetPwdDlg = false">取消</el-button>
          <el-button
            type="primary"
            @click="
              reset_password(form.name, form.oldpassword, form.newpassword)
            "
          >
            提交
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
body {
  margin: 0;
  padding: 0;
  background: #102a43;
  background-image: url("https://uploads.codesandbox.io/uploads/user/c3fb8e8a-35ea-4232-b5d6-0f3c5373510b/LVs7-dots.png");
  background-size: contain;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer h1,
.header h1,
.footer h2,
.header h2,
.footer h3,
.header h3 {
  color: #f0f4f8;
  padding: 0;
  margin: 0;
}
.footer .links,
.header .links {
  display: flex;
  font-family: "Open Sans";
}
.footer .links span,
.header .links span {
  padding: 0 10px;
  font-size: 18px;
  border-right: 1px solid #9fb3c8;
}
.footer .links span:last-child,
.header .links span:last-child {
  border-right: none;
}
.footer .version,
.header .version {
  font-family: "Open Sans";
  padding: 0 10px;
  color: #9fb3c8;
  font-size: 12px;
  margin-top: 5px;
}
.header {
  padding: 10px 20px;
}
.header .logo {
  font-family: "Open Sans";
  letter-spacing: 3px;
  padding-top: 15px;
  padding-bottom: 15px;
}
.header .logo .part-2 {
  color: #d64545;
}

.el-button--primary {
  background: #007c89;
  border-color: #007c89;
}
.el-button--primary:hover,
.el-button--primary.active,
.el-button--primary:focus {
  background: #009cad;
  border-color: #009cad;
}
.el-card__body {
  width: 100%;
}
.login .el-input__inner:hover {
  border-color: #007c89;
}
.login .el-input__prefix {
  background: #eeedea;
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
}
.login .el-input__prefix .el-input__icon {
  width: 30px;
}
.login .el-input input {
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: #007c89;
  text-decoration: none;
}
a:hover,
a:active,
a:focus {
  color: #009cad;
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}

.login-button {
  width: 100%;
  margin-top: 30px;
}
.el-input__wrapper {
  padding: 1px 2px;
}
</style>