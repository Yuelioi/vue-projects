<script lang="ts" setup>
import { ref, reactive } from "vue";
function refreshData() {}
function exportTableToCSV(filename: any) {
  var csv = [1];
  var rows = document.querySelectorAll("table tr");

  // for (var i = 0; i < rows.length; i++) {
  //   var row = [],
  //     cols = rows[i].querySelectorAll("td, th");

  //   for (var j = 0; j < cols.length; j++) row.push();

  //   csv.push(row.join(","));
  // }

  // Download CSV file
  downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv: BlobPart, filename: string) {
  var csvFile;
  var downloadLink;

  // CSV file
  csvFile = new Blob([csv], { type: "text/csv" });

  // Download link
  downloadLink = document.createElement("a");

  // File name
  downloadLink.download = filename;

  // Create a link to the file
  downloadLink.href = window.URL.createObjectURL(csvFile);

  // Hide download link
  downloadLink.style.display = "none";

  // Add the link to DOM
  document.body.appendChild(downloadLink);

  // Click download link
  downloadLink.click();
}

const goBack = () => {
  alert(111);
};
</script>

<template>
  <el-page-header :icon="null" title="返回主页" @back="goBack">
    <template #content>
      <div class="flex items-center">
        <el-avatar
          :size="32"
          class="mr-3"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />

        <el-tag>Default</el-tag>
      </div>
    </template>
    <template #extra>
      <div class="flex items-center">
        <el-button>Upload</el-button>
        <el-button type="primary" class="ml-2">Download</el-button>
        <el-button type="primary" class="ml-2" @click="refreshData"
          >刷新数据</el-button
        >
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
</style>
