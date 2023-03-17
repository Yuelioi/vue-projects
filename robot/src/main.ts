import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import pinia from "@/stores/index";

// ElementPlus Icons
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// oh-vue-icons
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";

addIcons(FaFlag, RiZhihuFill);

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.component("OhVueIcon", OhVueIcon);

app.use(pinia);
app.use(router);

app.mount("#app");
