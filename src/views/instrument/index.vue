<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { BaseinsReq, StinsReq, AccinsReq } from "../../api/types"
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { genTable } from "../../utils/common"
import { config } from "./config"

export interface ColItem {
  headerName: string;
  field: string;
}

const route = useRoute();
const type = route.query?.name as string || "";
const state = reactive({
  rowData: [],
  columnDefs: [] as ColItem[]
});

let param = {} as BaseinsReq | StinsReq | AccinsReq;

switch (type) {
  case "strategy":
    param = { stIns: "*", sn: 1 };
    state.columnDefs = config.strategy;
    break;
  case "account":
    param = { accIns: "*", sn: 1 };
    state.columnDefs = config.account;
    break;
  case "base":
  default:
    param = { ins: "*", sn: 1 };
    state.columnDefs = config.base;
}

genTable(type, param).then(({ data: rowData }) => {
  state.rowData = rowData;
})

</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="state.columnDefs"
    :rowData="state.rowData"
  >
  </ag-grid-vue>
</template>
