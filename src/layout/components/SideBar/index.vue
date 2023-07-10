
<script setup lang="ts">
import { MenuItem } from "./types";
import HighEleSubMenu from "./HighEleSubMenu.vue";
import PersonalControl from "../PersonalControl/index.vue";

const props = defineProps<{
  menuList: MenuItem[];
}>();

</script>

<template>
  <el-menu class="menu-container" v-bind="$attrs">
    <PersonalControl />
    <HighEleSubMenu
      v-for="menuItem in props.menuList"
      :key="menuItem.index"
      :menuItem="menuItem"
    />
  </el-menu>
</template>

<style scoped>
.menu-container {
  height: 100%;
}
</style>
