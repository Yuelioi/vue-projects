import { defineStore } from "pinia";
import axios from "axios";
import { UserData } from "@/stores/interface";

import { ElMessage } from "element-plus";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

export const useDateStore = defineStore("storeId", {
  // 推荐使用 完整类型推断的箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断其类型
      search: "",
      username: "10000",
      qqgroup: [""],
      isOnline: false,
      isEdit: false,
      isAdmin: false,
      token: "",
      current_page: 1,
      total: 1,
      page_size: 10,
      oldData: [],
      tableData: [
        {
          username: "",
          keyword: "",
          reply: "",
          groups: ["123"],
          id: 1,
        },
      ],
    };
  },
  getters: {
    getAvatar: state => {
      return `https://q.qlogo.cn/g?b=qq&nk=${state.username}&s=640`;
    },
    filterTableData: state => {
      let data = state.tableData.filter((data: UserData) => {
        return (
          !state.search ||
          data.keyword.toLowerCase().includes(state.search.toLowerCase()) ||
          data.reply.toLowerCase().includes(state.search.toLowerCase())
        );
      });
      state.total = data.length;

      data = data.slice((state.current_page - 1) * state.page_size, (state.current_page - 1) * state.page_size + state.page_size);

      return data;
    },
  },
  actions: {
    responseToData(response: any) {
      let sqldata = response.data["sqldata"];

      let res = [];
      for (let i = 0; i < sqldata.length; i++) {
        let ele = sqldata[i];
        res.push({
          username: ele[1],
          keyword: ele[2],
          reply: ele[3],
          groups: ele[4],
          id: ele[0],
        });
      }
      return res;
    },

    init() {
      let that = this;

      this.token = localStorage.getItem("bot_jwt_token") || "";

      axios({
        method: "get",
        url: "https://bot.yuelili.com/api/reply_list",
        params: {
          token: this.token,
        },
      }).then(function (response) {
        console.log(response.data);
        const res = that.responseToData(response);
        that.username = res[0].username;
        that.isOnline = true;
        that.tableData = res;
        that.qqgroup = res[0].groups;

        return res;
      });
    },

    handleTableAdd() {
      this.tableData.push({
        username: this.username,
        keyword: "",
        reply: "",
        groups: this.qqgroup,
        id: 0,
      });
      this.isEdit = true;
    },
    handleTableDelete(index: any, row: UserData) {
      if (row.id !== 0) {
        axios({
          method: "get",
          url: "https://bot.yuelili.com/api/delete_reply",
          params: {
            reply_id: row.id,
            token: this.token,
          },
        }).then(function (response) {
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
          type: "success",
        });
      }

      this.tableData.splice(index, 1);
    },
    handleTableSave(index: any, row: UserData) {
      for (var i = 0, l = this.tableData.length; i < l; i++) {
        var ele = this.tableData[i];
        let needRefresh = false;
        if (ele.id == 0) {
          needRefresh = true;
          axios({
            method: "get",
            url: "https://bot.yuelili.com/api/add_reply",
            params: {
              token: this.token,
              key: ele.keyword,
              reply: ele.reply,
              groups: ele.groups || "",
            },
          }).then(function (response) {});
        } else {
          axios({
            method: "get",
            url: "https://bot.yuelili.com/api/update_reply",
            params: {
              token: this.token,
              key: ele.keyword,
              reply: ele.reply,
              groups: ele.groups || "",
              reply_id: ele.id,
            },
          }).then(function (response) {
            console.log(response.status);
          });
        }

        if (needRefresh) {
          this.refreshData();
        }
      }
      ElMessage({
        showClose: true,
        message: "保存成功",
        type: "success",
      });
      this.isEdit = false;
    },
    refreshData() {
      const that = this;
      axios({
        method: "get",
        url: "https://bot.yuelili.com/api/reply_list",
        params: {
          token: this.token,
        },
      }).then(function (response) {
        that.tableData = that.responseToData(response);
        ElMessage({
          showClose: true,
          message: "更新成功",
          type: "success",
        });
      });
    },
    handleTableEdit() {
      this.isEdit = true;
    },
  },
});
