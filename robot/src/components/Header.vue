<script lang="ts" setup>
import { useReplyStore } from "@/stores/reply";
import { useAuthStore } from "@/stores/auth";
import { storeToRefs } from "pinia";
import { toRefs } from "vue";

const { tableData } = storeToRefs(useReplyStore());
const { isOnline, avatar, token } = toRefs(useAuthStore());
const { refreshData } = toRefs(useReplyStore());

useAuthStore().init();

function uploadCSV() {
    let upload_btn: HTMLElement = document.querySelector(
        "#file"
    ) as HTMLElement;
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

    var csvFile, downloadLink;

    csvFile = new Blob([csv], { type: "text/csv;charset=utf-8" });
    downloadLink = document.createElement("a");
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";
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
                <el-avatar :size="32" class="mr-3" :src="avatar" />

                <el-tag style="margin-left: 0.75rem" v-show="isOnline"
                    >Admin</el-tag
                >
                <el-tag style="margin-left: 0.75rem" v-show="!isOnline"
                    >游客</el-tag
                >
            </div>
        </template>
        <template #extra>
            <div class="flex items-center"></div>
        </template>
    </el-page-header>
    <el-divider />
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
