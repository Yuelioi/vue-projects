<script lang="ts" setup>
// import { storeToRefs } from "pinia";
import { useDateStore } from "@/stores/userdata";
import { toRefs } from "vue";

//!!! storeToRefs 和 toRefs的区别?

const {
  search,
  isEdit,
  isAdmin,
  isOnline,

  filterTableData,
  handleTableAdd,
  handleTableEdit,
  handleTableDelete,
  handleTableSave,
} = toRefs(useDateStore());

useDateStore().init();
</script>
<template>
  <div v-if="isOnline">
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="关键词" prop="keyword">
        <template #default="scope">
          <span v-show="!isEdit">{{ scope.row.keyword }}</span>
          <el-input
            v-show="isEdit"
            v-model="scope.row.keyword"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="回复" prop="reply">
        <template #default="scope">
          <span v-show="!isEdit">{{ scope.row.reply }}</span>
          <el-input
            v-show="isEdit"
            v-model="scope.row.reply"
            size="small"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="群号" prop="groups" />
      <el-table-column label="ID" prop="id" />

      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索..." />
        </template>
        <template #default="scope">
          <el-button size="small" v-show="!isEdit" @click="handleTableEdit()"
            >Edit</el-button
          >
          <el-button
            v-show="isEdit"
            size="small"
            type="success"
            @click="handleTableSave(scope.$index, scope.row)"
            >保存</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleTableDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="handleTableAdd()" style="margin-top: 1rem"
      >Add</el-button
    >
  </div>
  <div v-else>请先登录喵</div>
</template>

<style scoped>
</style>
