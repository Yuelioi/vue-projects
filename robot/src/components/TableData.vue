<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useDateStore } from "@/stores/userdata";
import { toRefs } from "vue";

//!!! storeToRefs 和 toRefs的区别?

const {
  search,
  current_page,

  total,
  isOnline,
  page_size,

  filterTableData,
  handleTableAdd,
  handleTableEdit,
  handleTableDelete,
  handleTableSave,
} = toRefs(useDateStore());

const is_hide_on_single_page = true;
useDateStore().init();
</script>
<template>
  <div v-if="isOnline">
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="关键词" prop="keyword">
        <template #default="scope">
          <span v-show="!scope.row.isEditting">{{ scope.row.keyword }}</span>
          <el-input
            autofocus="true"
            v-show="scope.row.isEditting"
            v-model="scope.row.keyword"
            size="small"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="回复" prop="reply">
        <template #default="scope">
          <span v-show="!scope.row.isEditting">{{ scope.row.reply }}</span>
          <el-input
            v-show="scope.row.isEditting"
            v-model="scope.row.reply"
            size="small"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="群号" prop="groups" />
      <!-- <el-table-column label="ID" prop="id" /> -->

      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索..." />
        </template>
        <template #default="scope">
          <el-button
            size="small"
            v-show="!scope.row.isEditting"
            @click="handleTableEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-show="scope.row.isEditting"
            size="small"
            type="success"
            @click="handleTableSave(scope.row)"
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
  <el-divider v-show="!is_hide_on_single_page" />
  <el-pagination
    background
    :hide-on-single-page="is_hide_on_single_page"
    :page-size="page_size"
    :total="total"
    v-model:current-page="current_page"
    layout="prev, pager, next"
  />
</template>

<style scoped>
</style>
