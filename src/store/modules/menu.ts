import { defineStore } from "pinia";
import { reactive } from "vue";
import { store } from '../index';
import { getReportList } from '@/api/report';
import { ProjectListReq } from "@/api/types"
import { MenuItem } from '@/layout/components/SideBar/types';
import { menu } from "@/utils/menuList";

export const useMenuStore = defineStore('menu', () => {
  const menuList = reactive([] as MenuItem[]);

  const getMenuList = async (): Promise<void> => {
    const { Home,swagger, baseCamp, hawkeye, monitor, setting } = menu;
    const report = await getDynamicReport({ projRe: "*" });

    // clear menuList
    menuList.length = 0;

    // add menuList to array
    [Home,report, baseCamp, hawkeye, monitor, setting, swagger].forEach((item: MenuItem) => menuList.push(item))
  }
  
  return {
    menuList,
    getMenuList
  } 
})

export function useMenuStoreHook() {
  return useMenuStore(store);
}

async function getDynamicReport(data: ProjectListReq): Promise<MenuItem> {
  const { data: reportList = [] } = await getReportList(data);

  return {
    title: "Report",
    index: "/report",
    icon: "report",
    children: reportList.map((report: any) => {
      return {
        title: report.name,
        index: `/report?name=${report.name}`
      }
    }) as MenuItem[] || []
  } as MenuItem
}