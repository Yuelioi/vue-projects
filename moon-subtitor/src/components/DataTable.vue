<script setup lang="ts" >
/// <reference path = "../types/index.d.ts" />

import { storeToRefs } from "pinia";
import { useDateStore } from "../store/userdata";

let { search, isEdit } = storeToRefs(useDateStore());

const filterTableData = useDateStore().filterTableData;

const handleDelete = (index: any, row: any) => {
  useDateStore().handleDelete(index, row);
  window.fs.writeFileSync("./userdata.txt", useDateStore().getTableData());
};
const handleSave = (index: any, row: any) => {
  useDateStore().handleSave(index, row);
  window.fs.writeFileSync("./userdata.txt", useDateStore().getTableData());

};
const handleEdit = (index: any, row: any) => {
  useDateStore().handleEdit(index, row);
};

const handleAdd = () => {
  useDateStore().handleAdd();
  useDateStore().isEdit = true;
  // useDateStore().switchEdit();
}
</script>

<template>


  <el-table ref="table" :data="filterTableData()" style="width: 100%">

    <el-table-column slotScope="scope" label="原名称">
      <template #default="scope">
        <span v-show="!isEdit">{{ scope.row.src }}</span>
        <el-input v-show="isEdit" v-model="scope.row.src" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="现名称">
      <template #default="scope">
        <span v-show="!isEdit">{{ scope.row.trg }}</span>
        <el-input v-show="isEdit" v-model="scope.row.trg" size="small"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="备注">
      <template #default="scope">
        <span v-show="!isEdit">{{ scope.row.description }}</span>
        <el-input v-show="isEdit" v-model="scope.row.description" size="small"></el-input>
      </template>
    </el-table-column>

    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />

      </template>
      <template #default="scope">
        <el-button size="small" v-show="!isEdit" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button v-show="isEdit" size="small" type="success"
          @click="handleSave(scope.$index, scope.row)">Save</el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>

      </template>

    </el-table-column>

  </el-table>
  <el-button type="primary" @click="handleAdd()" style="margin-top:1rem">Add</el-button>
</template>

