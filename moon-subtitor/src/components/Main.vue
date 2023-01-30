
<script setup lang="ts" >
/// <reference path = "../types/index.d.ts" />

import DataTable from "./DataTable.vue";
import Upload from "./Upload.vue";

import { useDateStore } from "../store/userdata";


function initTableData() {
  let fileContents = window.fs.readFileSync("./userdata.txt", 'utf-8');
  fileContents = fileContents.split("\n");
  let dt = <any>[];
  for (var i = 0, l = fileContents.length; i < l; i++) {
    var q = fileContents[i].split("\t");
    dt.push({
      src: q[0],
      trg: q[1],
      description: q[2],
    })
  }
  console.log(dt)
  useDateStore().setTableData(dt);

}

initTableData();

defineProps<{ msg: string }>(); // TODO
</script>

<template>
  <h1>{{ msg }}</h1>
  <Upload />
  <DataTable />
</template>


<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}

.routerlink {
  margin: 0 10px;
}
</style>
