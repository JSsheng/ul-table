<template>
  <ag-grid-vue
    v-loading="loading"
    class="ag-theme-alpine"
    :columnDefs="state.columnDefs"
    :rowData="state.rowData"
    @cell-clicked="onCellClicked"
    @grid-ready="onGridReady"
    >
    <!-- @firstDataRendered="autoSizeAll(false)" -->
  </ag-grid-vue>
</template>

<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { AppStateReq, WorkerStateReq } from "@/api/types"
import { nextTick, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { genTable, B2G } from "@/utils/common"
import { config } from "./config"
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from "@/lang";
import { oFFBtn } from "@/api/hawkeye"
import {
  GridReadyEvent,
  ColumnApi,
} from 'ag-grid-community';

export interface ColItem {
  headerName: string;
  field: string;
}

const switchMap = {
  "1": "ON",
  "0": "OFF",
  "-1": "UNKNOWN"
} as Record<string, string>;

const route = useRoute();
const loading = ref(false)
const type = route.query?.name as string || "";
const state = reactive({
  offName: "",
  id: "",
  rowData: [] as any,
  columnDefs: config.app as ColItem[]
});

let param = {} as AppStateReq | WorkerStateReq;
const gridColumnApi = ref(null as ColumnApi | null);

switch (type) {
  case "worker":
    param = { workerId: "*", sn: 1 };
    state.columnDefs = config.worker as ColItem[]
    break;
  case "app":
  default:
    param = { appId: "*", sn: 1 };
}

const data = () => {
  loading.value = true;
  return genTable(type, param).then(({ data: rowData }) => {
    const arr = Object.keys(rowData).map((i) => rowData[i]);

    state.rowData = arr.map((i: any) => {
      if (type === 'worker') {
        let { workerId, diskInfo } = i;
        diskInfo = JSON.parse(diskInfo);
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
        const { state, startTime, workerId, tailLogs } = i.state;
        return {
          appName,
          programmer,
          isExist: switchMap[state],
          state,
          startTime,
          workerId,
          workPath,
          tailLogs: {
            value: tailLogs?.replaceAll(/\n/g, "<br/>")
          },
          custom: {
            appName,
            workerId
          }
        }
      }
    });
    loading.value = false;
  });
}

// get data
data();

const onCellClicked = (e: any) => {
  let { state, workerId, appName } = e.data;
  const targetState = state === -1 ? true : !state;

  if (e.colDef.headerName === "State") {
    ElMessageBox.confirm(i18n.global.t('switchForm', { state: switchMap[String(Number(targetState))], appName }), i18n.global.t('confirm'), {
      confirmButtonText: i18n.global.t('confirm'),
      type: 'warning'
    }).then(async () => {
      loading.value = true;
      try {
        await oFFBtn({
          workerId,
          appName,
          switch: targetState,
          sn: 0
        });

        // refresh data
        await data();
        ElMessage.success(i18n.global.t('innerUpdateMsg'));

        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    });
  }
}

const onGridReady = (params: GridReadyEvent<any>) => {
  gridColumnApi.value = params.columnApi;
}

// const autoSizeAll = (skipHeader: boolean) => {
//   // gridColumnApi.value?.autoSizeColumn("tailLogs", skipHeader);
// }
</script>
<style scope>

</style>