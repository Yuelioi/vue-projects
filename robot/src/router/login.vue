<script lang="ts" setup>
import { toRefs, ref } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
import type { FormInstance } from "element-plus";
import { reactive } from "vue";

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
    <el-row :gutter="10">
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
                            <a
                                class="forgot-password"
                                @click="ForgetPwdDlg = true"
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

                <el-dialog
                    v-model="showAutoLoginDlg"
                    title="状态检测"
                    width="20%"
                >
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
                        <el-form-item
                            label="用户名"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="form.name"
                                autocomplete="off"
                                class="form__input"
                            />
                        </el-form-item>
                        <el-form-item
                            label="旧密码"
                            :label-width="formLabelWidth"
                        >
                            <el-input
                                v-model="form.oldpassword"
                                autocomplete="off"
                                class="form__input"
                                id="form__input"
                            />
                        </el-form-item>
                        <el-form-item
                            label="新密码"
                            :label-width="formLabelWidth"
                        >
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
    </el-row>
</template>

<style lang="css">
@import "@style/login.css";
</style>


<style scoped>
.el-button:hover {
    background-color: #7d97e7;
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
</style>