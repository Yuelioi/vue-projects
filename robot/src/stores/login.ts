import { defineStore } from "pinia";
import axios from "axios";

import { onMounted } from "vue";

import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
//引入element-plus的css样式文件
import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";
// import { Message } from "@element-plus/icons-vue";

export const useLoginStore = defineStore("loginId", {
    state: () => {
        return {
            btnloading: false,
            yiyan: "",
            user: { username: "", password: "", nickname: "" },
            showAutoLoginDlg: false,
            token: "",
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

    actions: {
        init() {
            let that = this;
            that.token = localStorage.getItem("bot_jwt_token") || "";
            onMounted(() => {
                axios({
                    method: "get",
                    url: "https://api.ixiaowai.cn/ylapi/index.php/",

                }).then((response) => {
                    that.yiyan = response.data;
                });


                if (that.token) {
                    that.showAutoLoginDlg = true;
                }
            });
        },
        AutoLogin() {
            axios.post("https://bot.yuelili.com/api/login", {
                token: this.token,

            }).then((response: any) => {
                console.log(response.data)

                if (response.data.status_code == 200) {
                    ElMessage({
                        showClose: true,
                        message: response.data.message,
                        type: "success",
                    });
                    window.location.href += "reply";
                } else {
                    this.showAutoLoginDlg = false;
                    ElMessage({
                        showClose: true,
                        message: response.data.message,
                        type: "error",
                    });
                }

            });

        },
        async reset_password(username: string, password: string, new_password: string) {
            const response = await axios.get("https://bot.yuelili.com/api/change_password", {
                params: {
                    username: username,
                    password: password,
                    new_password: new_password,
                },
            });
            return response.data;
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



        async register(formEl: FormInstance | undefined) {
            if (!formEl) {
                return;
            }
            let valid = await formEl.validate();
            if (!valid) {
                return;
            }

            const response = await axios.post("https://bot.yuelili.com/api/register", {
                username: this.user.username,
                password: this.user.password,
                nickname: this.user.nickname,
            });


            if (response.data.status_code == 200) {
                ElMessage({
                    showClose: true,
                    message: response.data.message,
                    type: "success",
                });
                localStorage.setItem("bot_jwt_token", response.data.token);
            } else {
                ElMessage({
                    showClose: true,
                    message: response.data.message,
                    type: "error",
                });
            }


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

            const response = await axios.post("https://bot.yuelili.com/api/login", {
                username: this.user.username,
                password: this.user.password,
            });

            if (response.data.status_code == 200) {
                ElMessage({
                    showClose: true,
                    message: response.data.message,
                    type: "success",
                });
                localStorage.setItem("bot_jwt_token", response.data.token);
                window.location.href += "reply";
            } else {
                ElMessage({
                    showClose: true,
                    message: response.data.message,
                    type: "error",
                });
            }

        },
    },
});
