<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { getReportData } from '../../api/report';
import { useRoute } from "vue-router";
import { ProjectDataReq } from "../../api/types"
import { reactive, watch } from "vue";
import { useMenuStore } from "../../store/modules/menu";
import router from "../../router";
import { MenuItem } from "../../layout/components/SideBar/types";
import { config } from "./config"

export interface LinkItem {
  name: string;
  url: string;
}
const menu = useMenuStore();
const route = useRoute();
const state = reactive({
  rowData: []
});
const name = route.query?.name as string || "";

if (!name && menu.menuList?.length) {
  redirect(menu.menuList);
}

watch(menu.menuList, (newList) => {
  redirect(newList);
});

(async(param: ProjectDataReq) => {
  const res = await getReportData(param)
  let { reports } = res.data;

  reports = reports.sort((a: any, b: any) => {
    return a.date > b.date ? -1 : 1;
  })

  state.rowData = reports || [];
})({ projName: name })

function redirect(newList: MenuItem[]) {
  const report = newList?.find((i: any) => i.index === "/report");
  if (report?.children?.length) {
    const path = report.children[0].index || "";
    router.push(path)
  }
}

</script>

<template>
  <ag-grid-vue
    class="ag-theme-alpine"
    :columnDefs="config"
    :rowData="state.rowData"
  >
  </ag-grid-vue>
</template>
