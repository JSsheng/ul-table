
<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute, RouteLocationMatched } from 'vue-router';
import { compile } from 'path-to-regexp';
import router from '../../../router';

const currentRoute = useRoute();

const pathCompile = (path: string) => {
  const { params } = currentRoute;

  const toPath = compile(path);
  return toPath(params);
};

const breadcrumbs = ref([] as Array<RouteLocationMatched>);

const getBreadcrumb = () => {
  let matched = currentRoute.matched.filter(
    item => item.meta && item.meta.title
  );

  breadcrumbs.value = matched.filter(item => {
    return item.meta && item.meta.title && item.meta.breadcrumb !== false;
  });
}

const handleLink = (item: any) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect).catch(err => {
      console.warn(err);
    });
    return;
  }
  
  router.push(pathCompile(path)).catch(err => {
    console.warn(err);
  });
}

watch(
  () => currentRoute.path,
  path => {
    if (path.startsWith('/redirect/')) {
      return;
    }
    getBreadcrumb();
  }
);

onBeforeMount(() => {
  getBreadcrumb();
});
</script>

<template>
  <el-breadcrumb
    separator=">"
    class="app-breadcrumb"
  >
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
      <span
        v-if="
          item.redirect === 'noredirect' || index === breadcrumbs.length - 1
        "
        >{{ item.meta.title }}</span
      >
      <a v-else @click.prevent="handleLink(item)">
        {{ item.meta.title }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
