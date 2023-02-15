import * as VueRouter from "vue-router";
// 1. 定义路由组件.

import Login from "@/router/login.vue";
import Reply from "@/router/reply.vue";
import Plan from "@/router/plan.vue";

// 2. 定义一些路由

const routes = [
    { path: "/", component: Login, name: "统登录页面 | Bot管理系统", meta: {} },
    { path: "/reply", component: Reply, name: "应答管理 | Bot管理系统", meta: { parent: "系统管理", breadcrumb: "应答", name: "我的应答" } },
    { path: "/plan", component: Plan, name: "计划管理 | Bot管理系统", meta: { parent: "系统管理", breadcrumb: "计划", name: "我的计划" } },
];

// 3. 创建路由实例并传递 `routes` 配置

const router = VueRouter.createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: VueRouter.createWebHashHistory(),
    routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {
    (document as any).title = to.name;
    next();
});

export default router;
