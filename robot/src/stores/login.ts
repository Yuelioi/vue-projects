import { defineStore } from "pinia";
import axios from "axios";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";
import { Message } from "@element-plus/icons-vue";

export const useLoginStore = defineStore("loginId", {
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型

      btnloading: false,
      model: { username: "", password: "" },
      rules: {
        username: [
          { required: true, message: "未填写用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度低于3位",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "需要填写密码", trigger: "blur" },
          {
            min: 3,
            message: "密码至少3位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  getters: {
    getAvatar: state => {
      return `https://q.qlogo.cn/g?b=qq&nk=${state.model.username}&s=640`;
    },
  },
  actions: {
    init() {
      onMounted(() => {
        let token = localStorage.getItem("bot_jwt_token");

        if (token) {
          this.parse_token(token).then(async data => {
            await this.simulateLogin();
            if (data.status == 200) {
              ElMessage({
                showClose: true,
                message: "登录成功",
                type: "success",
              });
              window.location.href += "manage";
            } else {
              ElMessage({
                showClose: true,
                message: "token已过期 请重新登录",
                type: "warning",
              });
            }
          });
        }
      });
    },

    async simulateLogin() {
      this.btnloading = true;
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.btnloading = false;
    },
    async parse_token(token: string) {
      const response = await axios.get("https://bot.yuelili.com/api/parse_token", {
        params: {
          token: token,
        },
      });
      return response.data;
    },
    async verify_password(username: string, password: string) {
      const response = await axios.get("https://bot.yuelili.com/api/auth", {
        params: {
          username: username,
          password: password,
        },
      });
      return response.data;
    },
    async login(formEl: FormInstance | undefined) {
      if (!formEl) {
        return;
      }
      let valid = await formEl.validate();
      if (!valid) {
        return;
      }
      await this.simulateLogin();

      this.verify_password(this.model.username, this.model.password).then(data => {
        if (data.status == 200) {
          ElMessage({
            showClose: true,
            message: "登录成功",
            type: "success",
          });
          localStorage.setItem("bot_jwt_token", data.token);
          window.location.href += "manage";
        } else {
          ElMessage({
            showClose: true,
            message: "用户名或密码错误",
            type: "error",
          });
        }
      });
    },
  },
});