<script lang="ts" setup>
import Header from "@/components/Header.vue";
import { usePlanStore } from "@/stores/plan";
import { toRefs, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { Check } from "@element-plus/icons-vue";

import type { TabsPaneContext } from "element-plus";
import { marked } from "marked";

console.log(marked.parse("# 11"));

const { isOnline, token } = toRefs(useAuthStore());
const activeName = ref("write-mode");
const {
    current_page,
    total,
    page_size,
    filterTableData,
    handleTableAdd,
    current_task_content,
} = toRefs(usePlanStore());

function submit_plan(row: any) {
    row.isEditting = false;
}

function row_click(row: any, column: any, event: any) {
    row.isEditting = true;
}

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event.target);
};

const is_hide_on_single_page = true;
usePlanStore().init(token.value);
</script>
<template>
    <div id="plan-page">
        <el-container class="common-layout">
            <Header />
            <el-container class="main">
                <el-container class="side"><Aside /></el-container>
                <el-container class="content">
                    <el-main>
                        <div v-if="isOnline">
                            <el-table
                                :data="filterTableData"
                                style="width: 100%"
                                @row-click="row_click"
                            >
                                <el-table-column width="60" #default="scope">
                                    <el-button
                                        :icon="Check"
                                        circle
                                        size="mini"
                                        @click="submit_plan(scope.row)"
                                    >
                                    </el-button>
                                </el-table-column>
                                <el-table-column #default="scope">
                                    <div
                                        class="task_list_item_content"
                                        v-show="!scope.row.isEditting"
                                    >
                                        <div
                                            class="
                                                task_list_item_content_wrapper
                                            "
                                        >
                                            <div class="task_title">
                                                {{ scope.row.title }}
                                            </div>
                                            <div class="task_content">
                                                {{ scope.row.content }}
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        v-show="scope.row.isEditting"
                                        class="markdown-wrapper"
                                    >
                                        <div class="markdown-title">
                                            <input
                                                required
                                                autofocus
                                                type="text"
                                                name="title"
                                                id="title"
                                                :value="scope.row.title"
                                                class="form-control"
                                            />
                                        </div>
                                        <el-tabs
                                            v-model="activeName"
                                            :data="`${scope.row.content}`"
                                            class="tabs"
                                            @tab-click="handleClick"
                                        >
                                            <el-tab-pane
                                                label="Write"
                                                name="write-mode"
                                                class="tabnav-tabs"
                                            >
                                                <div class="markdown-content">
                                                    <textarea
                                                        v-model="
                                                            scope.row.content
                                                        "
                                                        class="form-control"
                                                    ></textarea>
                                                </div>
                                            </el-tab-pane>

                                            <el-tab-pane
                                                label="Preview"
                                                name="preview-mode"
                                                class="tabnav-tabs"
                                                ><div>
                                                    {{ current_task_content }}
                                                </div>
                                            </el-tab-pane>
                                        </el-tabs>
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
                    </el-main>
                </el-container>
            </el-container>
            <Footer />
        </el-container>
    </div>
</template>

<style scoped>
:deep(.el-table__header-wrapper) {
    display: none;
}

.task_list_item_content_wrapper {
    display: flex;
    flex-direction: column;
}
:deep(.el-table) {
    box-shadow: unset;
}
.common-layout {
    flex-direction: column;
}

section.main {
    margin-top: 50px;
}
section.main {
    box-shadow: 8px 8px 12px #d1d9e6, -8px -8px 12px #f9f9f9;
}
:deep(.el-tabs__header) {
    display: flex;
}
:deep(.el-tabs__new-tab) {
    float: unset;
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
