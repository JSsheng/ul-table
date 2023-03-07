<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { getSubList } from "../../api/monitor";
import router from "../../router";
import { SubListReq } from "../../api/types";

const route = useRoute();
const type = route.query?.name as string || "";

const state = reactive({
  subData: []
});

let param = {
  sn: 1
} as SubListReq;

switch (type) {
  case "acc":
    param.itemPath = "/Monitor/Account";
    break;
  case "st":
  default:
    param.itemPath = "/Monitor/Strategy";
}

getSubList(param).then(async ({ data }) => {
  state.subData = data || [];
});

const previewCSV = (url: string) => {
  router.push({
    path: "/monitor/csv",
    query: {
      parent: JSON.stringify({
        name: type
      }),
      url
    }
  })
}

</script>

<template>
  <ul>
    <li v-for="(url, key) of state.subData" @click="previewCSV(url)">
      <el-link>{{ key }}</el-link>
    </li>
  </ul>
</template>

<style scoped>
li {
  padding: 10px;
  cursor: pointer;
}
</style>
