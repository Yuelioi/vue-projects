import { defineStore } from "pinia";
import axios from "axios";

import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
//引入Elmessage和Elloading的css样式文件
import "element-plus/theme-chalk/el-loading.css";
import "element-plus/theme-chalk/el-message.css";

export const useTestStore = defineStore("loginId", {
  state: () => {
    return {
      btnloading: false,
    };
  },
  getters: {},
  actions: {
    change() {
      this.btnloading = !this.btnloading;
    },
  },
});
