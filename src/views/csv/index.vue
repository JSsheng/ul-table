<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { useRoute } from "vue-router";
import { getStaticResource } from "../../api/static";
import csvtojson from 'csvtojson';
import { reactive } from "vue";

export interface ColItem {
  headerName: string;
  field: string;
}

const route = useRoute();
const url = route.query?.url as string || "";

const state = reactive({
  rowData: [],
  columnDefs: [] as ColItem[]
});

getStaticResource(url).then(async (str: any) => {
  state.rowData = await csvtojson().fromString(str) as any;

  state.columnDefs = Object.keys(state.rowData[0]).map((key, index) => {
    return {
      headerName: key,
      field: key,
      flex: 1,
      filter: index === 0,
      sortable: index === 0
    }
  })
});
</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="state.columnDefs"
    :rowData="state.rowData"
  >
  </ag-grid-vue>
</template>
