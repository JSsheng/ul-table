<script lang="ts" setup>
import { reactive, ref, toRefs, nextTick } from 'vue';
import SvgIcon from '@/components/SvgIcon/index.vue';
import { ElForm, ElInput } from 'element-plus';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

const loginFormRef = ref(ElForm);
const passwordRef = ref(ElInput);
const userStore = useUserStore();
const userName = import.meta.env.VITE_USER_NAME || "";
const password = import.meta.env.VITE_PWD || "";

const state = reactive({
  loginData: {
    userName,
    password,
    appType: "1"
  },
  loginRules: {
    userName: [
      { required: true, message: 'username is required', trigger: 'blur' },
      { min: 2, max: 20, message: 'the usename length is not less than 3 and does not exceed 20', trigger: 'blur' },
    ],
    password: [
      { required: true, message: 'password is required', trigger: 'blur' },
      { min: 4, max: 20, message: 'the password length is not less than 6 and does not exceed 20', trigger: 'blur' },
    ],
  },
  passwordType: 'password',
  loading: false,
  capslockTooltipDisabled: true,
})

const {
  loginData,
  loginRules,
  loading,
  passwordType,
  capslockTooltipDisabled
} = toRefs(state)

const handleLogin = () => {
  loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      await userStore.login(loginData.value);
      router.push({ path: "/"})
    }
  });
};


const showPwd = () => {
  passwordType.value = passwordType.value === 'password' ? '' : 'password';
  nextTick(() => {
    passwordRef.value.focus();
  });
}

</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginData"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="userName">
        <el-input
          ref="username"
          v-model="loginData.userName"
          :placeholder="$t('login.userName')"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-tooltip
        :disabled="capslockTooltipDisabled"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item prop="password">
          <el-input
            ref="passwordRef"
            :key="passwordType"
            v-model="loginData.password"
            :type="passwordType"
            :placeholder="$t('login.pwd')"
            name="password"
            tabindex="2"
            auto-complete="on"
            @blur="capslockTooltipDisabled = true"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        size="default"
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleLogin"
        >{{ $t('login.login') }}
      </el-button>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 9px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep(.el-input__wrapper) {
    padding: 7px 11px;
  }

  ::v-deep(.el-button) {
    padding: 24px;
  }
}
</style>