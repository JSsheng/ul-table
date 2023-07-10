<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon/index.vue';
import { MenuItem } from "./types";

const props = defineProps<{
  menuItem: MenuItem
}>()
</script>

<template>
  <el-sub-menu
    v-if="props.menuItem.children && props.menuItem.children.length"
    :index="props.menuItem.index"
    :key="props.menuItem.title"
  >
    <template #title>
      <SvgIcon v-if="props.menuItem.icon" :icon-class="props.menuItem.icon" />
      <span>{{ props.menuItem.title }}</span>
    </template>
    <HighEleSubMenu
      v-for="item in props.menuItem.children"
      :menuItem="item"
      :key="item.title"
    />
  </el-sub-menu>
  <el-menu-item
    v-else
    v-bind="menuItem"
    :index="props.menuItem.index"
  >
    <SvgIcon v-if="props.menuItem.icon" :icon-class="props.menuItem.icon" />
    <span>{{ props.menuItem.title }}</span>
  </el-menu-item>
</template>

<style lang="scss" scoped>
::v-deep(.svg-icon) {
  margin-right: 8px;
}
</style>
