<script lang="ts" setup>
import { ref, reactive, toRefs } from "vue";
import { useDateStore } from "@/stores/userdata";
const { tableData, getAvatar, isOnline } = toRefs(useDateStore());

function refreshData() {}

function uploadCSV(filename: string) {
  let upload_btn: HTMLElement = document.querySelector("#file") as HTMLElement;
  upload_btn.addEventListener("change", (e: any) => {
    let file = e.target.files[0];
    var reader = new FileReader();

    reader.onload = function () {
      var csvData = reader.result;
      console.log(csvData);
    };

    reader.readAsText(file);
  });
  upload_btn.click();
}

function downloadCSV(filename: string) {
  let csv = "\uFEFF"; //解决乱码问题
  csv += "keyword,replay\n"; //添加表格的头
  for (let index = 0; index < tableData.value.length; index++) {
    const element = tableData.value[index];
    csv += `${element.keyword},${element.reply}\n`;
  }

  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv;charset=utf-8" });
  // Download link
  downloadLink = document.createElement("a");
  // File name
  downloadLink.download = filename;
  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  // Add the link to DOM
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
}

const goBack = () => {
  window.location.href = "";
};
</script>

<template>
  <el-page-header :icon="null" title="返回主页" @back="goBack">
    <template #content>
      <div class="flex items-center">
        <el-avatar :size="32" class="mr-3" :src="getAvatar" v-show="isOnline" />
        <el-avatar
          :size="32"
          class="mr-3"
          :src="getAvatar"
          v-show="!isOnline"
        />

        <el-tag style="margin-left: 0.75rem">Admin</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button @click="uploadCSV" style="margin-right: 0.75rem"
          >上传</el-button
        >
        <input type="file" id="file" style="display: none" />
        <el-button class="ml-2" @click="downloadCSV('data.csv')"
          >下载</el-button
        >
        <el-button type="success" class="ml-2" @click="refreshData"
          >刷新数据</el-button
        >
      </div>
    </template>
  </el-page-header>
  <el-divider />
</template>

<style scoped>
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
</style>
