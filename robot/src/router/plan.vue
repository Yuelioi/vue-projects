<script lang="ts" setup>
import Header from "../components/Header.vue";
import { useReplyStore } from "@/stores/reply";
import { toRefs, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Check } from "@element-plus/icons-vue";
import { marked } from "marked";

import type { TabsPaneContext } from "element-plus";

const { isOnline, token } = toRefs(useAuthStore());

const {
  search,
  current_page,
  total,
  page_size,
  filterTableData,
  handleTableAdd,
  handleTableEdit,
  handleTableDelete,
  handleTableSave,
} = toRefs(useReplyStore());

function row_click(row: any, column: any, event: any) {
  console.log(row, column);
}
let markdown = ref("# 111");
let isFocus = ref(true);
// isFocus.value = false;

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

function markdownToHtml() {
  return marked(markdown.value);
}

const is_hide_on_single_page = true;
useReplyStore().init(token.value);
</script>
<template #default="scope">
  <Header />

  <el-tabs
    v-show="isFocus"
    v-model="activeName"
    class="demo-tabs"
    @tab-click="handleClick"
  >
    <div class="markdown-wrapper">
      <div class="markdown-title">
        <input
          required
          autofocus
          type="text"
          name="title"
          id="title"
          class="form-control"
        />
      </div>
      <el-tab-pane label="Write" name="first">
        <div class="markdown-content">
          <textarea v-model="markdown" class="form-control"></textarea>
        </div>
      </el-tab-pane>
    </div>
    <el-tab-pane label="Preview" name="second"
      ><div v-html="markdownToHtml()"></div
    ></el-tab-pane>
  </el-tabs>

  <div v-if="isOnline">
    <el-table
      :data="filterTableData"
      style="width: 100%"
      @row-click="row_click"
    >
      <el-table-column width="60">
        <el-button :icon="Check" circle></el-button>
      </el-table-column>
      <el-table-column #default="scope">
        <div class="task_list_item_content">
          <div
            class="task_list_item_content_wrapper"
            style="display: flex; flex-direction: column"
          >
            <div class="task_title">{{ scope.row.keyword }}</div>
            <div class="task_content">{{ scope.row.username }}</div>
            <div class="task_create_date">{{ scope.row.username }}</div>
          </div>
        </div>
      </el-table-column>

      <el-table-column prop="id" align="right" />
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
.markdown-wrapper {
  --color-canvas-default: #ffffff;
  --color-canvas-inset: #f6f8fa;
  --color-fg-default: #24292f;
  --color-border-default: #d0d7de;
  --color-accent-fg: #0969da;
  --color-primer-shadow-inset: inset 0 1px 0 rgba(208, 215, 222, 0.2);
}
.markdown-wrapper {
  width: 50%;
  border: 1px solid var(--color-border-default);
}
.markdown-title {
  background-color: var(--color-canvas-inset);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: var(--color-fg-default);
}
.markdown-title input {
  padding: 5px 12px;
  font-size: 16px;
  line-height: 20px;
  width: 100%;
  color: var(--color-fg-default);
  background-color: var(--color-canvas-inset);
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  box-shadow: var(--color-primer-shadow-inset);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}
.form-control,
.form-select {
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-fg-default);
  vertical-align: middle;
  background-color: var(--color-canvas-default);
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  box-shadow: var(--color-primer-shadow-inset);
  transition: 80ms cubic-bezier(0.33, 1, 0.68, 1);
  transition-property: color, background-color, box-shadow, border-color;
}
.form-control:focus {
  background-color: var(--color-canvas-default);
  border-color: var(--color-accent-fg);
  outline: none;
  box-shadow: inset 0 0 0 1px var(--color-accent-fg);
}
</style>
