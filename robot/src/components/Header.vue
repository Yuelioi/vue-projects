<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const { isOnline } = toRefs(useAuthStore());

const avatar = localStorage.getItem("bot_avatar")

useAuthStore().init();

const goBack = () => {
    window.location.href = "";
};
</script>

<template>
    <el-header>
        <el-page-header :icon="null" title="返回主页" @back="goBack">
            <template #breadcrumb>
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: './' }">
                        主页
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{
                        useRouter().currentRoute.value.meta.parent
                    }}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{
                        useRouter().currentRoute.value.meta.breadcrumb
                    }}</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
            <template #content>
                <span class="text-large font-600 mr-3" style="font-size: 14px">
                    {{ useRouter().currentRoute.value.meta.name }}
                </span>
            </template>
            <template #extra>
                <div class="flex items-center">
                    <el-avatar :size="32" class="mr-3" :src="avatar" />

                    <el-tag style="margin-left: 0.75rem" v-show="isOnline">Admin</el-tag>
                    <el-tag style="margin-left: 0.75rem" v-show="!isOnline">游客</el-tag>
                </div>
            </template>
        </el-page-header>
        <el-divider /></el-header>
</template>

<style lang="css">
@import "@style/element-plus-custom.css";
@import "@style/ele-input.css";
@import "@style/ele-table.css";
@import "@style/ele-dialog.css";
</style>

<style scoped>
.flex {
    display: flex;
}

.items-center {
    align-items: center;
}
</style>
