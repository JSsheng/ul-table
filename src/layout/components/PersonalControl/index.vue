<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../../store/modules/user';

const userStore = useUserStore();

const logout = () => {
  return userStore.logout();
};

const userName = computed(() => userStore.userInfo?.userName);

</script>

<template>
  <div class="personal-control">
    <span>{{ userName }}</span>

    <el-button type="text" @click="logout">{{ $t('logout') }}</el-button>
  </div>
</template>

<style lang="scss" scoped>
.personal-control {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;

  span {
    color: #606266;
    line-height: 25px;
  }
}
</style>