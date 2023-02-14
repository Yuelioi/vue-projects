import { defineStore } from "pinia";
import axios from "axios";
import { Reply } from "@/stores/interface";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

export const useReplyStore = defineStore("storeId", {
    // 推荐使用 完整类型推断的箭头函数
    state: () => {
        return {
            // 所有这些属性都将自动推断其类型
            search: "",
            username: "10000",
            qqgroup: [""],
            current_page: 1,
            total: 1,
            page_size: 20,
            token: "",
            tableData: [
                {
                    username: "",
                    keyword: "",
                    reply: "",
                    groups: ["123"],
                    id: 1,
                    isEditting: false,
                    isModified: false,
                },
            ],
        };
    },
    getters: {
        getAvatar: state => {
            return `https://q.qlogo.cn/g?b=qq&nk=${state.username}&s=640`;
        },
        filterTableData: state => {
            let data = state.tableData.filter((data: Reply) => {
                return (
                    !state.search ||
                    data.keyword.toLowerCase().includes(state.search.toLowerCase()) ||
                    data.reply.toLowerCase().includes(state.search.toLowerCase())
                );
            });
            data.sort((a: any, b: any) => {
                return a["username"] - b["username"];
            });
            state.total = data.length;

            data = data.slice((state.current_page - 1) * state.page_size, (state.current_page - 1) * state.page_size + state.page_size);

            return data;
        },
    },
    actions: {
        responseToData(sqldata: any) {
            let res = [];
            for (let i = 0; i < sqldata.length; i++) {
                let ele = sqldata[i];
                res.push({
                    username: ele[1],
                    keyword: ele[2],
                    reply: ele[3],
                    groups: ele[4],
                    id: ele[0],
                    isEditting: false,
                    isModified: false,
                });
            }
            return res;
        },

        init(token: string) {
            let that = this;

            onMounted(() => {
                that.token = localStorage.getItem("bot_jwt_token") || "";

                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/reply/list",
                    params: {
                        token: that.token,
                    },
                }).then(function (response) {
                    const sqldata = response.data["sqldata"];
                    let res = <any>[];
                    if (sqldata) {
                        res = that.responseToData(sqldata);
                    }

                    if (res.length > 0) {
                        that.username = res[0].username;
                        that.tableData = res;
                        that.qqgroup = res[0].groups;
                    }

                    return res;
                });
            });
        },

        handleTableAdd() {
            this.search = "";
            this.total += 1;
            this.current_page = Math.trunc(this.total / this.page_size) + 1;
            this.tableData.push({
                username: this.username,
                keyword: "",
                reply: "",
                groups: this.qqgroup,
                id: 0,
                isEditting: true,
                isModified: true,
            });
            this.tableData[this.total - 1].isEditting = true;
        },
        handleTableDelete(index: any, row: Reply) {
            const that = this;
            if (row.id !== 0) {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/reply/delete",
                    params: {
                        reply_id: row.id,
                        token: this.token,
                    },
                }).then(function (response) {
                    that.refreshData();
                    ElMessage({
                        showClose: true,
                        message: "删除成功",
                        type: "success",
                    });
                });
            } else {
                ElMessage({
                    showClose: true,
                    message: "删除成功",
                    type: "warning",
                });
            }

            this.tableData.splice(index, 1);
        },
        handleTableSave(row: Reply) {
            let needRefresh = true;
            if (row.id == 0) {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/reply/add",
                    params: {
                        token: this.token,
                        key: row.keyword,
                        reply: row.reply,
                        groups: row.groups || "",
                    },
                }).then(function (response) { });
            } else {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/reply/update",
                    params: {
                        token: this.token,
                        key: row.keyword,
                        reply: row.reply,
                        groups: row.groups || "",
                        reply_id: row.id,
                    },
                }).then(function (response) {
                    console.log(response.status);
                });
            }

            if (needRefresh) {
                this.refreshData();
                ElMessage({
                    showClose: true,
                    message: "更新成功",
                    type: "success",
                });
            }

            row.isEditting = false;
        },
        refreshData() {
            const that = this;
            axios({
                method: "get",
                url: "https://bot.yuelili.com/api/reply/list",
                params: {
                    token: this.token,
                },
            }).then(function (response) {
                that.tableData = that.responseToData(response.data["sqldata"]);
            });
        },
        handleTableEdit(row: Reply) {
            row.isEditting = true;
        },
    },
});
