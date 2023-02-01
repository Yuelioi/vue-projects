<script lang="ts" setup>
import { toRefs } from "vue";
import { storeToRefs } from "pinia";
import { useTestStore } from "@/stores/test";

let { btnloading } = storeToRefs(useTestStore());

const { change } = toRefs(useTestStore());
</script>
<template #default="scope">
  <div>{{ btnloading }}</div>
  <button @click="change"></button>
</template>
<style scoped>
</style>