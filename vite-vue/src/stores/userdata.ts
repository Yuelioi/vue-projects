import { defineStore } from "pinia";
import axios from "axios";
import { UserData } from "@/stores/interface";
import { ref, computed } from "vue";

// axios({
//   method: "get",
//   url: "http://bit.ly/2mTM3nY",
//   responseType: "stream",
// }).then(function (response) {
//   console.log(response.data);
// });

export const useDateStore = defineStore("userdataId", () => {
  let search = ref("");
  let isEdit = ref(false);
  let isAdmin = ref(false);
  let tableData: UserData[] = [
    {
      username: "yueli",
      keyword: "兜里",
      reply: "哈哈哈",
      groups: [123, 456],
    },
    {
      username: "yueli",
      keyword: "兜里2",
      reply: "嘿嘿嘿",
      groups: [123, 456],
    },
  ];

  const filterTableData = computed(() => {
    return tableData;
    // return tableData.filter((data: UserData) => {
    //   console.log(data);
    //   return (
    //     !search || data.keyword.toLowerCase().includes(search.value.toLowerCase()) || data.reply.toLowerCase().includes(search.value.toLowerCase())
    //   );
    // });
  });

  function getTableData() {
    let res = "";
    for (var i = 0, l = tableData.length; i < l; i++) {
      var td = tableData[i];
      res += td.username + "\t" + td.keyword + "\t" + td.reply + "\n";
    }
    return res;
  }

  function handleTableAdd() {
    tableData.push({
      username: "yueli",
      keyword: "",
      reply: "",
      groups: [123, 456],
    });
    // isEdit.value = true;
  }
  function handleTableDelete(index: any) {
    tableData.splice(index, 1);
    tableData = filterTableData.value;
  }
  function handleTableSave(index: any, row: UserData) {
    isEdit.value = false;
  }
  function handleTableEdit() {
    isEdit.value = true;
  }

  return { search, isEdit, isAdmin, tableData, filterTableData, getTableData, handleTableAdd, handleTableDelete, handleTableSave, handleTableEdit };
});
