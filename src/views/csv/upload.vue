<script lang="ts" setup>
import { reactive } from "vue";
import { getKVStore, delKVStore, setKVStore } from "@/api/csv";
import i18n from '@/lang/index';
import { ElMessage, ElMessageBox } from 'element-plus';
import Upload from "@/components/upload/index.vue";
import router from "@/router";
import { downloadFile } from "@/utils/common";

export interface TableRow {
  key: string
  value: string
}

const state = reactive({
  tableData: [] as TableRow[]
});

const getList = async () => {
  const { data } = await getKVStore({ key: "/MonitorCfg/", isPre: true });

  state.tableData = Object.keys(data).map(key => {
    return {
      key,
      value: data[key]?.value
    };
  });
}

getList();

const deleteCSV = (data: TableRow) => {
  ElMessageBox.confirm(
    i18n.global.t('delConfirm'),
    'Warning',
    {
      confirmButtonText: i18n.global.t('deleteBtn'),
      cancelButtonText: i18n.global.t('cancelBtn'), 
      type: 'warning',
    }
  )
    .then(async () => {
      await delKVStore({ keys: [data.key] });
      ElMessage({
        type: 'success',
        message: i18n.global.t('delMsg'),
      });
      getList();
    });
}

const uploadCSVBtn = async ({ value, file }: { value: string, file: File}) => {
  // upload csv
  await setKVStore({
    item: {
      key: `/MonitorCfg/${file.name}`,
      value: value.replaceAll(",", ";"),
    },
    sn: 1
  });

  ElMessage.success(i18n.global.t('uploadSuccessMsg'));
  getList();
}

const editCSV = (row: TableRow) => {
  router.push({
    path: "/monitor/csv-editable",
    query: {
      parent: JSON.stringify({
        spec: "setting-csv"
      }),
      meta: row.key,
      url: row.value,
      title: row.key
    }
  })
}

const downloadCSV = (row: TableRow) => {
  const value = row.value.replaceAll(";", ",");
  if (!value) {
    ElMessage.error(i18n.global.t('downloadFileErr'));
    return;
  }
  const templateCsv = "data:text/csv;charset=utf-8,\ufeff" + value;
  downloadFile(templateCsv, row.key.split("/").splice(-1)[0]);
}
</script>


<template>
  <div class="csv-upload-container">
    <Upload @upload="uploadCSVBtn"></Upload>

    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="key" label="Table Name"/>

      <el-table-column label="Operations" width="200">
        <template #default="scope">
          <el-button link type="primary" @click="editCSV(scope.row)">{{ $t("editBtn") }}</el-button>
          <el-button link type="danger" @click="deleteCSV(scope.row)">{{ $t("deleteBtn") }}</el-button>
          <el-button link type="primary" @click="downloadCSV(scope.row)">{{ $t("downloadBtn") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style>
.csv-upload-container {
  padding: 10px;
  box-sizing: border-box;
}
</style>