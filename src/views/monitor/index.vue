<script setup lang="ts">
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { getSubList } from "@/api/monitor";
import router from "@/router";
import { SubListReq, KVStore } from "@/api/types";
import { getKVStore } from "@/api/csv";

const route = useRoute();
const type = route.query?.name as string || "";

const state = reactive({
  subData: []
});

let param = {
  sn: 1
} as SubListReq;

// cfg is a special case
let kvParams = {
  sn: 1,
  isPre: true
} as KVStore

switch (type) {
  case "acc":
    param.itemPath = "/Monitor/Account";
    break;
  case "st":
    param.itemPath = "/Monitor/Strategy";
    break;
  case "cfg":
    kvParams.key = "/MonitorCfg/";
    break;
  case "tables":
  default:
    param.itemPath = "/Monitor/Tables";
}

if (type === "cfg") {
  getKVStore(kvParams).then(async ({ data }) => {
    const kv = {} as any;
    Object.keys(data).forEach(i => {
      kv[i] = data[i].value;
    });
    state.subData = kv;
  });
} else {
  getSubList(param).then(async ({ data }) => {
    state.subData = data || [];
  });
}

const previewCSV = (url: string, key: any) => {
  let path = "/monitor/csv-editable";
  let param = {
    url,
    title: key
  }  as any;

  if (url.endsWith(".html")) {
    path = "/monitor/preview";
    param = { id: encodeURIComponent(url), title: key }
  }

  if (url.endsWith(".csv")) {
    path = "/monitor/csv"
  }

  router.push({
    path,
    query: {
      parent: JSON.stringify({
        name: type
      }),
      meta: key,
      ...param
    }
  })
}

</script>

<template>
  <ul>
    <li v-for="(url, key) of state.subData" @click="previewCSV(url, key)">
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
