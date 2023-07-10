<script lang="ts" setup>
import { MainContent, NavBar, SideBar } from './components/index';
import { useRoute } from 'vue-router';
import router from '@/router';
import { computed } from 'vue';
import { useMenuStore } from '@/store/modules/menu';

const route = useRoute();
const menu = useMenuStore();

menu.getMenuList()

const select = (index: string) => {
  if (index.indexOf("/") > -1) {
    router.push(index).catch(err => err);
  }
}

// @TODO need to improve
const matchPath = computed(() => {
  const path = route.path.split("/")[1];
  const fullParam = route.query;
  let suffix = "";
  let param = "";

  // There is no relationship between the two routing
  let spec = "";

  // TODO: need to be improved
  // Maybe there are two or more properties in the parent object. Or the parent parameter is not named 'name'.
  if (fullParam.parent) {
    const o = JSON.parse(fullParam.parent as string);

    if (o.name) {
      param = `name=${o.name}`
    }

    if (o.suffix) {
      suffix = o.suffix
    }

    if (o.spec) {
      spec = o.spec
    }
  }

  if (param) {
    return `/${path}?${param}`;
  }

  // case of suffix
  if (suffix) {
    return `/${path}`;
  }

  // case of spec
  if (spec) {
    return `/${spec}`;
  }

  return route.fullPath;
})

</script>

<template>
  <div class="container">
    <el-scrollbar>
      <SideBar :menuList="menu.menuList" :default-active="matchPath" @select="select" class="side-bar-container" />
    </el-scrollbar>

    <div class="main-container">
      <NavBar />

      <MainContent class="main" />
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
}
.side-bar-container {
  width: 180px;
  height: 100vh;
  flex-shrink: 0;
  flex-grow: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.main-container {
  width: calc(100% - 180px);
  position: absolute;
  top: 0;
  left: 180px;
  height: 100%;
}

.main {
  height: calc(100% - 54px);
}
</style>
