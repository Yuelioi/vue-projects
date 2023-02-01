import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 配置别名,在tsconfig.json 也要做类似的配置
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: "views", replacement: resolve(__dirname, "./src/views") },
      { find: "router", replacement: resolve(__dirname, "./src/router") },
    ],
  },
});
