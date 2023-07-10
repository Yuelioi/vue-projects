<script lang="ts" setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Aside from "@/components/Aside.vue";
import { useReplyStore } from "@/stores/reply";
import { toRefs } from "vue";
import { useAuthStore } from "@/stores/auth";

const { isOnline } = toRefs(useAuthStore());

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

const is_hide_on_single_page = true;
useReplyStore().init();
</script>
<template >
    <div id="reply-page">
        <el-container class="common-layout">
            <Header />
            <el-container class="content">
                <el-container>
                    <el-main>
                        <div v-if="isOnline">
                            <el-table :data="filterTableData" style="width: 100%" :header-row-style="{
                                background: 'var(--main-bg-color)',
                            }">
                                <el-table-column label="ID" prop="ID" width="75px">
                                </el-table-column>
                                <el-table-column label="用户名" prop="username" />
                                <el-table-column label="关键词" prop="keyword">
                                    <template #default="scope">
                                        <span v-show="!scope.row.isEditting">{{
                                            scope.row.keyword
                                        }}</span>
                                        <el-input autofocus="true" v-show="scope.row.isEditting" v-model="scope.row.keyword"
                                            size="small"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="回复" prop="reply">
                                    <template #default="scope">
                                        <span v-show="!scope.row.isEditting">{{
                                            scope.row.reply
                                        }}</span>
                                        <el-input v-show="scope.row.isEditting" v-model="scope.row.reply"
                                            size="small"></el-input>
                                    </template>
                                </el-table-column>

                                <el-table-column label="群号" prop="qq_groups" />

                                <el-table-column align="right">
                                    <template #header>
                                        <el-input v-model="search" size="small" placeholder="搜索..." />
                                    </template>
                                    <template #default="scope">
                                        <el-icon :size="20" v-show="!scope.row.isEditting"
                                            @click="handleTableEdit(scope.row)">
                                            <Edit />
                                        </el-icon>

                                        <el-icon :size="20" v-show="scope.row.isEditting" style="margin-left: 8px"
                                            @click="handleTableSave(scope.row)">
                                            <Check />
                                        </el-icon>
                                        <el-icon :size="20" style="margin-left: 8px" @click="
                                            handleTableDelete(
                                                scope.$index,
                                                scope.row
                                            )
                                            ">
                                            <Delete />
                                        </el-icon>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-button type="primary" @click="handleTableAdd()" style="margin-top: 1rem">Add</el-button>
                        </div>

                        <div v-else>请先登录喵</div>
                        <el-divider v-show="!is_hide_on_single_page" />
                        <el-pagination background :hide-on-single-page="is_hide_on_single_page" :page-size="page_size"
                            :total="total" v-model:current-page="current_page" layout="prev, pager, next" />
                    </el-main></el-container> </el-container>
            <Footer />
        </el-container>
    </div>
</template>


<style scoped lang="less">
#reply-page {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;

    .common-layout {
        flex-direction: column;
    }

    .el-container.content {
        margin-top: 50px;
    }

    span {
        word-break: keep-all;
        white-space: nowrap;
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

    :deep(.el-input__inner) {
        height: 30px;
        padding-left: 10px;
    }
}
</style>
