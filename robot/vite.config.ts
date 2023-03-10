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
    css: {
        preprocessorOptions: {
            less: {
                math: "always", // 括号内才使用数学计算
                globalVars: {
                    // 全局变量
                    mainColor: "red",
                },
            },
        },
    },
    resolve: {
        // 配置别名,在tsconfig.json 也要做类似的配置
        alias: [
            { find: "@", replacement: resolve(__dirname, "./src") },
            { find: "@style", replacement: resolve(__dirname, "./src/assets/css") },
        ],
    }, build: {
        chunkSizeWarningLimit: 1500,
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }
                }
            }
        }
    },


});
