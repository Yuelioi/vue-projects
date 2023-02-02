import * as VueRouter from "vue-router";
// 1. 定义路由组件.

import Login from "@/router/login.vue";
import Manage from "@/router/manage.vue";

// 2. 定义一些路由

const routes = [
  { path: "/", component: Login },
  { path: "/manage", component: Manage },
];

// 3. 创建路由实例并传递 `routes` 配置

const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
