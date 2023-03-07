<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="state.columnDefs"
    :rowData="state.rowData"
  >
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { AppStateReq, WorkerStateReq } from "../../api/types"
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { genTable, B2G } from "../../utils/common"
import { config } from "./config"

export interface ColItem {
  headerName: string;
  field: string;
}

const route = useRoute();
const type = route.query?.name as string || "";
const state = reactive({
  rowData: [] as any,
  columnDefs: config.app as ColItem[]
});

let param = {} as AppStateReq | WorkerStateReq;

switch (type) {
  case "worker":
    param = { workerId: "*", sn: 1 };
    state.columnDefs = config.worker as ColItem[]
    break;
  case "app":
  default:
    param = { appId: "*", sn: 1 };
}

genTable(type, param).then(({ data: rowData }) => {
  state.rowData = rowData.map((i: any) => {
    if (type === 'worker') {
      const { workerId, diskInfo } = i;
      return {
        workerId,
        diskInfo: {
          value: Object.keys(diskInfo).reduce((useage: string, key: string) => {
            const { path, usedPercent, used } = diskInfo[key];
            return `${useage}<p>${path}[${usedPercent.toFixed()}%；${B2G(used)}]</p>`
          }, ''),
          raw: { ...diskInfo }
        }
      }
    } else if (type === 'app') {
      const { appName, programmer, workPath } = i.cfg;
      const { isExist, startTime, workerId } = i.state;
      return {
        appName,
        programmer,
        isExist: isExist ? 'ON' : 'OFF',
        startTime,
        workerId,
        workPath
      }
    }
  })
})
</script>
