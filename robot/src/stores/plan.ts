import { defineStore } from "pinia";
import axios from "axios";
import { Plan } from "@/stores/interface";
import { onMounted } from "vue";
import { ElMessage } from "element-plus";
import { marked } from "marked";

//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

export const usePlanStore = defineStore("storeId", {
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
            current_task_content: "",
            tableData: [
                {
                    username: "A",
                    type: "B",
                    create_date: "1",
                    finish_date: "2",
                    status: "3",
                    tag: "4",
                    id: 1,
                    isEditting: false,
                    isFocus: false,
                    isModified: false,
                },
            ],
        };
    },
    getters: {
        getAvatar: (state) => {
            return `https://q.qlogo.cn/g?b=qq&nk=${state.username}&s=640`;
        },
        filterTableData: (state) => {
            let data = state.tableData.filter((data: Plan | any) => {
                return (
                    !state.search ||
                    data.create_date.toLowerCase().includes(state.search.toLowerCase()) ||
                    data.create_date.toLowerCase().includes(state.search.toLowerCase())
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
                    username: ele["username"],
                    title: ele["title"],
                    content: ele["content"],
                    create_date: ele["create_date"],
                    finish_date: ele["finish_date"],
                    period: ele["period"],
                    priority: ele["priority"],
                    status: ele["status"],
                    tag: ele["tag"],
                    category: ele["category"],
                    id: ele["ID"],
                    isEditting: false,
                    isModified: false,
                });
            }
            return res;
        },
        getHtml(content: any) {
            return marked.parse(content);
        },
        init(token: string) {
            let that = this;

            onMounted(() => {
                that.token = localStorage.getItem("bot_jwt_token") || "";
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/plan/list",
                    params: {
                        token: that.token,
                    },
                }).then(function (response) {
                    const sqldata = response.data["sqldata"];
                    let res = <any>[];
                    console.log(sqldata);
                    if (sqldata) {
                        res = that.responseToData(sqldata);
                    }
                    console.log(res);
                    if (res.length > 0) {
                        that.username = res[0].username;
                        that.tableData = res;
                        that.qqgroup = res[0].qq_groups;
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
                type: "",
                create_date: "",
                finish_date: "",
                status: "",
                tag: "",
                id: 1,
                isEditting: false,
                isModified: false,
                isFocus: false,
            });
            this.tableData[this.total - 1].isEditting = true;
        },
        handleTableDelete(index: any, row: Plan) {
            const that = this;
            if (row.ID !== 0) {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/plan/delete",
                    params: {
                        plan_id: row.ID,
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
        handleTableSave(row: Plan) {
            let needRefresh = true;
            if (row.ID == 0) {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/plan/add",
                    params: {
                        token: this.token,
                    },
                }).then(function (response) {});
            } else {
                axios({
                    method: "get",
                    url: "https://bot.yuelili.com/api/plan/update",
                    params: {
                        token: this.token,
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
                url: "https://bot.yuelili.com/api/plan/list",
                params: {
                    token: this.token,
                },
            }).then(function (response) {
                // that.tableData = that.responseToData(response.data["sqldata"]);
            });
        },
        handleTableEdit(row: Plan) {
            row.isEditting = true;
        },
    },
});
