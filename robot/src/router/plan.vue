<script lang="ts" setup>
import Header from "@/components/Header.vue";
import { usePlanStore } from "@/stores/plan";
import { toRefs, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Check, Remove } from "@element-plus/icons-vue";
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
} = toRefs(usePlanStore());

function handle_hover(row: any) {
    console.log(row);
    row.isFocus = true;
}
function handle_leave_hover(row: any) {
    row.isFocus = false;
}

function row_click(row: any, column: any, event: any) {
    // console.log(row, column);
}
let markdown = ref("# 111\n## 22 \n### 3");
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
usePlanStore().init(token.value);
</script>
<template>
    <div id="plan-page">
        <Header />
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
            <el-tabs
                v-show="isFocus"
                v-model="activeName"
                class="tabs"
                @tab-click="handleClick"
            >
                <el-tab-pane label="Write" name="first" class="tabnav-tabs">
                    <div class="markdown-content">
                        <textarea
                            v-model="markdown"
                            class="form-control"
                        ></textarea>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="Preview" name="second" class="tabnav-tabs"
                    ><div v-html="markdownToHtml()"></div
                ></el-tab-pane>
            </el-tabs>
        </div>

        <div v-if="isOnline">
            <el-table
                :data="filterTableData"
                style="width: 100%"
                @row-click="row_click"
                @cell-mouse-enter="handle_hover"
                @cell-mouse-leave="handle_leave_hover"
            >
                <el-table-column #default="scope" width="60">
                    <el-button :icon="Check" circle size="mini"></el-button>
                </el-table-column>
                <el-table-column #default="scope">
                    <div class="task_list_item_content">
                        <div
                            class="task_list_item_content_wrapper"
                            style="display: flex; flex-direction: column"
                        >
                            <div class="task_title">
                                {{ scope.row.keyword }}
                            </div>
                            <div class="task_content">
                                {{ scope.row.username }}
                            </div>
                            <div class="task_create_date">
                                {{ scope.row.username }}
                            </div>
                        </div>
                    </div>
                </el-table-column>

                <el-table-column prop="id" align="right" />
            </el-table>
            <el-button
                type="primary"
                @click="handleTableAdd()"
                style="margin-top: 1rem"
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
    </div>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
    display: none;
}
* {
    box-sizing: border-box;
}
#plan-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}
.markdown-wrapper {
    --color-canvas-default: #ffffff;
    --color-canvas-inset: #f6f8fa;
    --color-fg-default: #24292f;
    --color-border-default: #d0d7de;
    --color-accent-fg: #0969da;
    --color-border-muted: hsla(210, 18%, 87%, 1);
    --color-primer-shadow-inset: inset 0 1px 0 rgba(208, 215, 222, 0.2);
}
.markdown-wrapper {
    border: 1px solid var(--color-border-default);
    padding: 8px;
    border-radius: 6px;
}
.markdown-title {
    padding: 5px;
    background-color: var(--color-canvas-inset);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    color: var(--color-fg-default);
}
.markdown-title input {
    width: 100%;
}
.markdown-content {
    padding: 5px;
}
.markdown-content textarea {
    width: 100%;
    overflow: hidden;
}
.tabs {
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--color-border-default);
    margin: 5px;
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

.el-button {
    box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #ffffff;
    background: var(--main-bg-color);
    color: var(--main-text-color);
    border: none;
}
.el-button:focus,
.el-button:hover {
    color: unset;
    border-color: var(--main-bg-color);
    background-color: unset;
    box-shadow: var(--main-box-shadow-xs-in);
    color: #686868;
}

.el-tabs__item {
    background-color: initial;
    border: 1px solid #0000;
    border-bottom: 0;

    display: inline-block;
    flex-shrink: 0;

    line-height: 23px;
    padding: 8px 16px;
    text-decoration: none;
    transition: color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
}
.el-tabs__item[aria-selected="true"] {
    background-color: var(--color-canvas-default);
    border-color: var(--color-border-default);
    border-radius: var(--primer-borderRadius-medium, 6px)
        var(--primer-borderRadius-medium, 6px) 0 0;
    color: var(--color-fg-default);
}
.el-tabs__header {
    margin: 0 0 5px;
}

.markdown-wrapper h1,
h2,
h3,
h4 {
    text-align: left !important;
}
h1,
h2 {
    padding-bottom: 0.3em;
    font-size: 1.5em;
    border-bottom: 1px solid var(--color-border-muted);
}
#pane-second h1 {
    text-align: left;
}

/*  */
</style>
