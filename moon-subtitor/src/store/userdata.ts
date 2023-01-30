import { REFUSED } from "dns";
import { defineStore } from "pinia";

import { User } from "./interface";

export const useDateStore = defineStore({
  id: "usedate",
  state: () => ({
    filePath: "",
    size: 1920,
    search: "",
    isEdit: false,
    tableData: [
      {
        src: "遍",
        trg: "编",
        description: "12",
      },
      {
        src: "杠",
        trg: "/",
        description: "23",
      },
    ],
  }),

  actions: {
    increment() {
      // this.count++;
    },
    getSrc() {
      let src: any[] = [];
      this.tableData.forEach(ele => src.push(ele.src));
      return src;
    },
    getTrg() {
      let trg: any[] = [];
      this.tableData.forEach(ele => trg.push(ele.trg));
      return trg;
    },
    getTableData() {
      let res = "";
      for (var i = 0, l = this.tableData.length; i < l; i++) {
        var td = this.tableData[i];
        res += td.src + "\t" + td.trg + "\t" + td.description + "\n";
      }
      return res.substr(0, res.length - 1);
    },
    handleAdd() {
      this.tableData.push({
        src: "",
        trg: "",
        description: "",
      });
    },
    setTableData(arr: User[]) {
      this.tableData = arr;
    },

    filterTableData() {
      return this.tableData.filter((data: User) => {
        return (
          data.src.toLowerCase().includes(this.search.toLowerCase()) ||
          data.trg.toLowerCase().includes(this.search.toLowerCase()) ||
          data.description.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
    handleDelete(index: any, row: any) {
      this.tableData.splice(index, 1);
    },
    handleSave(index: any, row: any) {
      this.isEdit = false;
    },
    handleEdit(index: any, row: any) {
      this.isEdit = true;
      console.log("99");
    },
  },
});
