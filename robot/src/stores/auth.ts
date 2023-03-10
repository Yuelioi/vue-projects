import axios from "axios";
import { defineStore } from "pinia";
import { onMounted } from "vue";

export const useAuthStore = defineStore("authId", {
    state: () => {
        return {
            username: "10000",
            isOnline: false,
            token: "",
        };
    },
    getters: {
        avatar: state => {
            https://q1.qlogo.cn/g?b=qq&nk=435826135&s=640
            return `https://q1.qlogo.cn/g?b=qq&nk=${state.username}&s=640`;
        },
    },
    actions: {
        init() {
            onMounted(() => {
                this.token = localStorage.getItem("bot_jwt_token") || "";
                let that = this;

                if (this.token) {
                    axios.post(
                        "https://bot.yuelili.com/api/login",
                        {
                            token: this.token,
                        },
                    ).then(function (response) {
                        that.isOnline = true;
                        that.username = response.data.username;
                        return;
                    });
                }
            });
        },
    },
});
