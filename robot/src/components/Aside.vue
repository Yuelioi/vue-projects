<template>
    <el-aside width="200px">
        <el-tabs
            v-model="editableTabsValue"
            editable
            class="plan-categorys"
            @tab-add="handleTabAdd"
            @tab-remove="handleTabRemove"
            @tab-click="handleTabClick"
            :tab-position="'left'"
        >
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :closable="true"
                :name="item.name"
            >
            </el-tab-pane> </el-tabs
    ></el-aside>
</template>
  <script lang="ts" setup>
import { TabsPaneContext } from "element-plus";
import { ref } from "vue";

let tabIndex = 2;
const editableTabsValue = ref("2");
const editableTabs = ref([
    {
        title: "Tab 1",
        name: "1",
        isActive: true,
        content: "Tab 1 content",
    },
    {
        title: "Tab 2",
        name: "2",
        isActive: false,
        content: "Tab 2 content",
    },
]);

const handleTabAdd = () => {
    const newTabName = `${++tabIndex}`;
    editableTabs.value.push({
        title: "New Category",
        name: newTabName,
        isActive: false,
        content: "New Tab content " + tabIndex,
    });
    editableTabsValue.value = newTabName;
};
const handleTabRemove = (targetName: string) => {
    const tabs = editableTabs.value;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                    activeName = nextTab.name;
                }
            }
        });
    }

    editableTabsValue.value = activeName;
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
const handleTabClick = (pane: TabsPaneContext, ev: Event) => {
    console.log(pane.index, ev.target);
};
</script>
<style scoped>
:deep(.el-tabs__active-bar) {
    box-shadow: var(--main-box-shadow-xs);
    background: #ffffff;
}
:deep(.is-icon-close) {
    display: none;
}
:deep(.is-active .is-icon-close) {
    display: initial;
}
:deep(.el-tabs--left .el-tabs__item) {
    text-align: left;
}
:deep(.el-tabs--left .el-tabs__header) {
    width: 200px;
}
</style>

