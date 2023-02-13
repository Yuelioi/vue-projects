<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
import type { FormInstance } from "element-plus";
import { reactive } from "vue";

import "@style/element-plus-custom.css";

const ForgetPwdDlg = ref(false);
const formLabelWidth = "100px";

const form = reactive({
    name: "",
    oldpassword: "",
    newpassword: "",
});

let { btnloading, yiyan } = storeToRefs(useLoginStore());
const { model, rules, login, reset_password, showAutoLoginDlg, AutoLogin } =
    toRefs(useLoginStore());

useLoginStore().init();

function switch_card() {
    let switchCtn: any = document.querySelector("#switch-cnt");
    let switchC1: any = document.querySelector("#switch-c1");
    let switchC2: any = document.querySelector("#switch-c2");
    let switchCircle = document.querySelectorAll(".switch__circle");
    let switchBtn = document.querySelectorAll(".switch-btn");
    let card1: any = document.querySelector(".card1");
    let card2: any = document.querySelector(".card2");

    switchCtn.classList.add("is-gx");
    setTimeout(function () {
        switchCtn.classList.remove("is-gx");
    }, 1500);

    switchCtn.classList.toggle("is-txr");
    switchCircle[0].classList.toggle("is-txr");
    switchCircle[1].classList.toggle("is-txr");

    switchC1.classList.toggle("is-hidden");
    switchC2.classList.toggle("is-hidden");
    card1.classList.toggle("is-txl");
    card2.classList.toggle("is-txl");
    card2.classList.toggle("is-z200");
}

const formRef = ref<FormInstance>();
</script>
<template #default="scope">
    <div id="login-page">
        <div class="login">
            <div class="card1 card">
                <el-card style="border-radius: 10px" shadow="never">
                    <h2 class="title">登录</h2>
                    <el-form
                        class="login-form"
                        :model="model"
                        :rules="rules"
                        ref="formRef"
                    >
                        <el-form-item prop="username">
                            <el-input
                                prefix-icon="User"
                                v-model="model.username"
                                placeholder="用户名(QQ)"
                            ></el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input
                                prefix-icon="Flag"
                                v-model="model.password"
                                placeholder="密码"
                                type="password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :loading="btnloading"
                                class="login-button"
                                type="primary"
                                native-type="submit"
                                @click="login(formRef)"
                                block
                                >登录</el-button
                            >
                        </el-form-item>
                        <a class="forgot-password" @click="ForgetPwdDlg = true"
                            >忘记密码 ?</a
                        >
                    </el-form>
                </el-card>
            </div>
            <div class="card2 card">
                <el-card style="border-radius: 10px" shadow="never">
                    <h2 class="title">注册</h2>
                    <el-form
                        class="login-form"
                        :model="model"
                        :rules="rules"
                        ref="formRef"
                    >
                        <el-form-item prop="username">
                            <el-input
                                prefix-icon="User"
                                v-model="model.username"
                                placeholder="用户名(QQ)"
                            ></el-input>
                        </el-form-item>

                        <el-form-item prop="password">
                            <el-input
                                prefix-icon="Flag"
                                v-model="model.password"
                                placeholder="昵称"
                                type="password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input
                                prefix-icon="Flag"
                                v-model="model.password"
                                placeholder="密码"
                                type="password"
                            ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                :loading="btnloading"
                                class="login-button"
                                type="primary"
                                native-type="submit"
                                block
                                >注册</el-button
                            >
                        </el-form-item>
                    </el-form>
                </el-card>
            </div>

            <div class="switch" id="switch-cnt">
                <div class="switch__circle"></div>
                <div class="switch__circle switch__circle--t"></div>
                <div class="switch__container" id="switch-c1">
                    <h2 class="switch__title title">欢迎回来喵!</h2>
                    <p class="switch__description description">
                        {{ yiyan }}
                    </p>
                    <el-button @click="switch_card"> 注册 </el-button>
                </div>
                <div class="switch__container is-hidden" id="switch-c2">
                    <h2 class="switch__title title">你好喵</h2>
                    <p class="switch__description description">
                        暂时不支持注册 请联系月离离开通!
                    </p>
                    <el-button @click="switch_card"> 登录 </el-button>
                </div>
            </div>

            <el-dialog v-model="showAutoLoginDlg" title="状态检测" width="20%">
                <span>检测到登录信息,是否自动登录</span>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="showAutoLoginDlg = false"
                            >取消</el-button
                        >
                        <el-button type="primary" @click="AutoLogin()">
                            确定
                        </el-button>
                    </span>
                </template>
            </el-dialog>

            <el-dialog
                v-model="ForgetPwdDlg"
                title="更改密码"
                width="25%"
                style="font-size=24px"
            >
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input
                            v-model="form.name"
                            autocomplete="off"
                            class="form__input"
                        />
                    </el-form-item>
                    <el-form-item label="旧密码" :label-width="formLabelWidth">
                        <el-input
                            v-model="form.oldpassword"
                            autocomplete="off"
                            class="form__input"
                            id="form__input"
                        />
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth">
                        <el-input
                            v-model="form.newpassword"
                            autocomplete="off"
                            class="form__input"
                        />
                    </el-form-item>
                </el-form>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="ForgetPwdDlg = false"
                            >取消</el-button
                        >
                        <el-button
                            type="primary"
                            @click="
                                reset_password(
                                    form.name,
                                    form.oldpassword,
                                    form.newpassword
                                )
                            "
                        >
                            提交
                        </el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>

<style>
#login-page {
    overflow: hidden;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    font-size: 12px;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
}
</style>

<style scoped>
a:hover {
    color: #7e7e7e;
}

.login :deep(.el-table th.el-table__cell) {
    background-color: var(--main-bg-color);
}

.el-button:hover {
    background-color: #7d97e7;
}

:deep(.el-input__wrapper) {
    box-shadow: inset 1px 1px 2px #d1d9e6, inset -1px -1px 2px #f9f9f9;
}
:deep(.el-dialog__footer) {
    padding-bottom: 25px;
}

.el-dialog__footer .el-button {
    width: 72px;
    height: 32px;
    margin-top: 5px;
}
.dialog-footer {
    display: flex;
    justify-content: space-evenly;
    padding-bottom: 15px;
}
.el-form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.login {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: var(--main-bg-color);
    box-shadow: var(--main-box-shadow-lg);
    border-radius: 12px;
    overflow: hidden;
}

.login :deep(.switch) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: var(--main-bg-color);
    overflow: hidden;
    box-shadow: var(--main-box-shadow-sm);
}
.login :deep(.switch__circle) {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: var(--main-bg-color);
    box-shadow: var(--main-box-shadow-md-in);
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}
.switch__circle--t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.login :deep(.el-dialog) {
    background-color: var(--main-bg-color);
    box-shadow: var(--main-box-shadow-xs);
    border-radius: 15px !important;
}

.switch__container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
}

.card {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: var(--main-bg-color);
    transition: 1.25s;
}
.card1 {
    z-index: 100;
    left: calc(100% - 600px);
}

.card2 {
    z-index: 0;
    left: calc(100% - 600px);
}
.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: var(--main-title-color);
}
.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    line-height: 1.6;
    text-align: left;
    text-indent: 2em;
}
.forgot-password {
    /* border-bottom: 1px solid #9b9b9b69; */
    color: var(--main-title-color);
    font-size: 15px;
    margin-top: 25px;
    border-bottom: var(--main-border);
    line-height: 2;
}
.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}
.login :deep(.el-input__wrapper) {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 16px;
}

.el-button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: var(--btn-bg-color);
    color: #f9f9f9;
    box-shadow: var(--btn-box-shadow);
    border: none;
    outline: none;
}

.login :deep(.is-txr) {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}
.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}
.is-z200 {
    z-index: 200;
    transition: 1.25s;
}
</style>