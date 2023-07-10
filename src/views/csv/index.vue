<script setup lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { PostSortRowsParams } from "ag-grid-community";
import { useRoute } from "vue-router";
import { getStaticResource } from "@/api/static";
import csvtojson from 'csvtojson';
import { reactive, ref, computed } from "vue";
import * as echarts from 'echarts';
import type { TabsPaneContext } from 'element-plus';
import { option } from "./config";

export interface ColItem {
  headerName: string;
  field: string;
}

const route = useRoute();
const fullUrl = route.query?.url as string || "";
const urlList = fullUrl.split(";");
const constantPane = ["Balance", "Delta", "Chain","BalanceByLabel","BalanceByChain"];
let idx = ref(0);

const pane = urlList.map((url, i) => {
  return url.split("/").pop()?.split(".")[0] || `Tab${i}`;
});


const needInit = computed(() => {
  return constantPane.includes(pane[idx.value]);
});

const state = reactive({
  rowData: [] as any,
  columnDefs: [] as any
});

const promiseList = urlList.map(async url => {
  return await getStaticResource(url);
});

// get data list by csv
Promise.all(promiseList).then((list) => {
  list.forEach(async (str: any, i) => {
    let data = [];
    if (str) {
      data = await csvtojson().fromString(str) as any || [];
    }
    state.rowData.push(data);

    const col = Object.keys(data[0] || [])?.map((key, index) => {
      return {
        headerName: key,
        field: key,
        flex: 1,
        filter: index === 0,
        sortable: true,
        comparator: (a: any, b: any) => {
          const getA = a.replaceAll(",", "");
          const getB = b.replaceAll(",", "");
          const isNumber = !isNaN(getA) && !isNaN(getB);

          if (isNumber) {
            // parseInt will remove the decimal part
            return Number(getA) > Number(getB) ? 1 : -1;
          }
          return getA > getB ? 1 : -1;
        },
        cellStyle: (params: any) => {
          if ([params?.data?.Chain, params?.data?.Ticker, params?.column?.colId].includes("Sum")) {
            return { backgroundColor: 'lightpink' };
          }
          return null;
        }
      }
    });

    state.columnDefs.push(col);

    if (i === list.length - 1 && needInit.value) {
      // init chart for first tab after data ready
      initChart(pane[idx.value], idx.value);
    }
  });
});

// init chart by idx
const initChart = (type: string, idx: number) => {
  const main = document.getElementById("chart");

  if (main) {
    const myChart = echarts.init(main);
    myChart.clear();

    if (type !== "Collateral") {
      const dataOfNormal = state.rowData[idx].filter((i: any) => i.Ticker !== "Sum");
      const dataOfSerices = Object.keys(state.rowData[idx][0] || []).filter(i => i !== "Ticker" && i !== "Sum");
      let yAxis = {
        type: 'category',
        data: dataOfNormal.map((i: any) => {
          return i.Ticker || "--";
        })
      } as any;

      let defaultSerices = {
        type: 'bar',
        emphasis: {
          focus: 'series'
        }
      } as any;
      switch (type) {
        case "Balance":
        case "BalanceByLabel":
        case "BalanceByChain":

          defaultSerices.stack = "total";
          const seriesOfBalance = dataOfSerices.map((key) => {
            return {
              name: key,
              ...defaultSerices,
              data: dataOfNormal.map((i: any) => parseInt(i[key].replace(",", "")))
            }
          });

          myChart.setOption({ ...option.axis, yAxis, series: seriesOfBalance });
          break;

        case "Delta":
          yAxis.axisTick = {
            show: false
          };
          const seriesOfNormal = dataOfSerices.map((key) => {
            if (key !== "DeltaUSD") {
              defaultSerices.stack = "total";
              defaultSerices.itemStyle = {
                color: key === "SpotDeltaUSD" ? "#b6c6f7" : "#a9df96"
              };
            } else {
              defaultSerices.stack = null;
              defaultSerices.itemStyle = {
                color: "rgba(213, 41, 41, 1)"
              };
            }
            return {
              name: key,
              ...defaultSerices,
              data: dataOfNormal.map((i: any) => parseInt(i[key].replace(",", "")))
            }
          });

          myChart.setOption({ ...option.axis, yAxis, series: seriesOfNormal });
          break;
        case "Chain":
          const data = state.rowData[idx].filter((i: any) => i.Chain !== "Sum").map((i: any) => {
            return {
              name: i.Chain,
              value: parseInt(i.BalanceUSD.replaceAll(",", ""))
            }
          });
          const seriesOfChain = [
            {
              ...option.circle.series[0],
              data: [...data, {
                value: data.reduce((acc: number, cur: any) => acc + cur.value, 0),
                itemStyle: {
                  color: 'none',
                  decal: {
                    symbol: 'none'
                  }
                },
                label: {
                  show: false
                }
              }]
            }
          ];

          myChart.setOption({ ...option.circle, series: seriesOfChain });
          break;
      }
    }
  }
};

const changeTab = (tab: TabsPaneContext) => {
  idx.value = tab.paneName as number || 0;
  initChart(pane[idx.value], idx.value);
};

const postSortRows = (params: PostSortRowsParams) => {
    let rowNodes = params.nodes;
    let nextInsertPos = 0;
    if (rowNodes && rowNodes.length > 0) {
      for (let i = 0; i < rowNodes.length; i++) {
        const sum = rowNodes[i].data.Chain || rowNodes[i].data.Ticker;
        if (sum === 'Sum') {
          rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
          nextInsertPos++;
        }
      }
    }
};
</script>

<template>
  <div :class="['csv-container', !needInit && 'csv-container--full']">
    <el-tabs
      v-model="idx"
      type="card"
      class="csv-tab-container"
      @tab-click="changeTab"
    >
      <el-tab-pane
        v-for="(item, idx) in pane"
        :key="item"
        :label="item"
        :name="idx"
      >
      <ag-grid-vue
        class="ag-theme-alpine"
        :columnDefs="state.columnDefs[idx]"
        :rowData="state.rowData[idx]"
        :postSortRows="postSortRows"
      >
      </ag-grid-vue>
      </el-tab-pane>
    </el-tabs>

    <div id="chart" class="echart"></div>
  </div>
</template>

<style lang="scss">
.csv-container {
  height: 100%;

  .csv-tab-container {
    height: 50%;
  }

  .csv-tab-container > .el-tabs__content {
    height: calc(100% - 60px);
  }

  .csv-tab-container .el-tab-pane,
  .csv-tab-container .el-tab-pane .ag-theme-alpine {
    height: 100%;
  }

  .echart {
    margin: 0 auto;
    width: 100%;
    height: 50%;
  }
}

.csv-container--full {
  .csv-tab-container {
    height: 100%;
  }

  .echart {
    display: none;
  }
}

</style>
