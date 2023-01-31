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
      username: "435826135",
      qqgroup: ["435826135"],
      isOnline: false,
      isEdit: false,
      isAdmin: false,
      token: "",
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
      return state.tableData.filter((data: UserData) => {
        return (
          !state.search ||
          data.keyword.toLowerCase().includes(state.search.toLowerCase()) ||
          data.reply.toLowerCase().includes(state.search.toLowerCase())
        );
      });
    },
  },
  actions: {
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
        console.log(ele);
        if (ele.id == 0) {
          console.log(ele.groups);
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
        }
      }

      this.isEdit = false;
    },
    handleTableEdit() {
      this.isEdit = true;
    },
  },
});
