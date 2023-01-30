<script setup lang="ts">
/// <reference path = "../types/index.d.ts" />

import { jyParson } from "../lib/srtParser";
import { useDateStore } from "../store/userdata";
import { ElMessage } from "element-plus";


let { filePath } = useDateStore();

async function handleFileChange(file: any) {
  filePath = file.raw.path;
  useDateStore().filePath = filePath;
}

function handleFileExceed(files: any) {
  useDateStore().filePath = files[0].path;
}

const openVn = (filePath: any) => {
  ElMessage({
    message: "成功写入 " + filePath.match(/[^\\]+$/)[0],
    type: "success",
  });
};

async function handleJIanYingFile() {
  if (window.fs.existsSync(filePath)) {
    const fileContents = await window.fs.readFileSync(filePath, 'utf-8');
    const srcList = useDateStore().getSrc();
    const trgList = useDateStore().getTrg();
    const res = jyParson(fileContents, srcList, trgList);

    window.fs.writeFileSync(filePath, JSON.stringify(res));
    openVn(filePath);
  } else {
    ElMessage({
      message: "Warning, 请选择一个文件",
      type: "warning",
    });
  }
}
</script>

<template>
  <el-row :gutter="0">
    <el-col :span="4">
      <el-upload class="uploader" :limit="1" :on-change="handleFileChange" :on-exceed="handleFileExceed"
        :show-file-list="false" :auto-upload="false">
        <el-button type="primary">上传</el-button>
      </el-upload>
    </el-col>
    <el-col :span="16" style="text-align: left">
      <span>{{ useDateStore().filePath }}</span>
    </el-col>
    <el-col :span="4">
      <el-button type="success" @click="handleJIanYingFile">替换</el-button>
    </el-col>
  </el-row>
  <el-divider />
</template>

<style scoped>
.el-row {
  align-items: baseline;
}
</style>
