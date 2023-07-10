<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { BaseinsReq, StinsReq, AccinsReq } from "@/api/types"
import { getStrategyTmpList } from "@/api/strategy"
import { reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { genTable } from "@/utils/common"
import { config, defaultColDef } from "./config"
import type { TabsPaneContext } from 'element-plus'
import { InnerTableRow } from "../strategy/index.vue";

export interface ColItem {
  headerName: string;
  field: string;
  valueSetter?: (params: any) => boolean;
}

const activeName = ref(0)
const route = useRoute();
const type = route.query?.name as string || "";
const state = reactive({
  rowData: [],
  columnDefs: [] as ColItem[],
  keyName : [] as any
});

let param = {} as BaseinsReq | StinsReq | AccinsReq;

switch (type) {
  case "strategy":
    param = { stIns:'', sn: 1 };
    break;
  case "account":
    param = { accIns: "*", sn: 1 };
    setSetterValue(config.account);
    state.columnDefs = config.account;
    break;
  case "base":
  default:
    param = { ins: "*", sn: 1 };
    setSetterValue(config.base);
    state.columnDefs = config.base;
}

const getTable = async () => {
  const { data: rowData } = await genTable(type, param);
  state.rowData = rowData;
}

// type strategy to get list
const getList = async () => {
  const { data } = await getStrategyTmpList({ tplName: "*", sn: 1 });
  state.keyName = Object.keys(data) || [];

  state.columnDefs = state.keyName.map((i: string) => {
    const items = data[i].items;

    return items?.filter((i: any) => i.show)?.map((i: InnerTableRow, idx: number) => {
      return {
        headerName: i.stAttr,
        field: i.jsonField,
        minWidth: 140,
        sortable: true,//!idx,
        filter: true,//!idx,
        flex: 1,
        // recover value for every cell
        valueSetter: () => {
          return false;
        }
      };
    });
  });

  setParam(param, activeName.value);
}

// type strategy to set param and then to refresh table data
const setParam = async (param: StinsReq, idx: number) => {
  param.stIns = `${state.keyName[idx]}.*`;

  getTable();
}

// init tab and table data
if (type === 'strategy') {
  getList();
} else {
  getTable();
}

const getColums = computed(() => {
  return type === 'strategy' ? state.columnDefs[activeName.value] : state.columnDefs;
});

const handleClick = (tab: TabsPaneContext) => {
  setParam(param, tab.paneName as number);
}

function setSetterValue (config: ColItem[]):void {
  config.forEach(i => {
    i.valueSetter = () => {
      return false;
    }
  });
}
</script>

<template>
  <div class="ins-container">
    <el-tabs
      v-if="type === 'strategy'"
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
    <el-tab-pane
      v-for="(index,item) in state.keyName"
      :key="index"
      :label="index"
      :name="item"
      />
    </el-tabs>
    <ag-grid-vue
      :class="['ag-theme-alpine', type !== 'strategy' && 'ag-theme-alpine--full']"
      :columnDefs="getColums"
      :rowData="state.rowData"
      :defaultColDef="defaultColDef"
    >
    </ag-grid-vue>
  </div>
</template>
<style lang="scss" scoped>
.ins-container {
  height: 100%;

  .el-tabs {
    height: 56px;
  }

  .ag-theme-alpine {
    height: calc(100% - 60px);
  }

  .ag-theme-alpine--full {
    height: 100%;
  }
}
</style>
