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
            qq_groups: "",
            tableData: [
                {
                    username: "",
                    keyword: "",
                    reply: "",
                    qq_groups: "123",
                    ID: 0,
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
        init() {
            let that = this;
            onMounted(() => {
                that.token = localStorage.getItem("bot_jwt_token") || "";
                that.refreshData()

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
                qq_groups: this.qq_groups,
                ID: 0,
                isEditting: true,
                isModified: true,
            });
            this.tableData[this.total - 1].isEditting = true;

        },
        handleTableDelete(index: any, row: Reply) {
            const that = this;
            console.log(row.ID);

            if (row.ID !== 0) {
                axios({
                    method: "delete",
                    url: "https://bot.yuelili.com/api/reply/delete",
                    params: {
                        reply_id: row.ID,
                        token: this.token,
                    },
                }).then(function (response) {
                    if (response.data.status_code == 200) {
                        that.refreshData();
                        ElMessage({
                            showClose: true,
                            message: "删除成功",
                            type: "success",
                        });
                    } else {
                        ElMessage({
                            showClose: true,
                            message: "删除失败",
                            type: "warning",
                        });
                    }
                });
            }

            this.tableData.splice(index, 1);
        },
        handleTableSave(row: Reply) {
            let needRefresh = true;
            const that = this;
            console.log(row.ID)

            axios({
                method: "post",
                url: "https://bot.yuelili.com/api/reply/update",
                params: {
                    token: this.token,
                    reply_id: row.ID,
                    username: this.username,
                    key: row.keyword,
                    reply: row.reply,
                    qq_groups: row.qq_groups || "",
                },
            }).then(function (response) {
                if (response.data.status_code == 200) {
                    if (needRefresh) {
                        that.refreshData();
                        ElMessage({
                            showClose: true,
                            message: "更新成功",
                            type: "success",
                        });
                        row.isEditting = false;
                    } else {
                        ElMessage({
                            showClose: true,
                            message: "删除成功",
                            type: "warning",
                        });
                    }

                } else {

                }

            });


        },
        refreshData() {
            const that = this;
            axios({
                method: "get",
                url: "https://bot.yuelili.com/api/reply/list",
                params: {
                    token: that.token,
                },
            }).then(function (response) {
                if (response.data.status_code == 200 && response.data["sqldata"].length > 0) {
                    const sqldata = response.data["sqldata"];
                    let res = <any>[];
                    console.log(sqldata)
                    res = sqldata.map((ele: any) => {
                        return {
                            ...ele,
                            isEditting: false,
                            isModified: false
                        }
                    });
                    that.username = res[0].username;
                    that.tableData = res;
                    that.qqgroup = res[0].qq_qq_groups;
                }
            });
        },
        handleTableEdit(row: Reply) {
            row.isEditting = true;
        },
    },
});
