<script lang="ts" setup>
import {
  Plus
} from "@element-plus/icons"
import { reactive, ref } from "vue";
import { getStrategyTmpList, newStrategyTmp, deleteStrategyTmp } from "@/api/strategy";
import router from "@/router";
import i18n from '@/lang/index';
import { ElMessage, ElMessageBox } from 'element-plus';

export interface InnerTableRow {
  jsonField: string
  kind: string
  stAttr: string
  show: boolean
  des: string
}

export interface TableRow {
  template: string
  des: string
  items: InnerTableRow[]
}

const state = reactive({
  tableData: [] as TableRow[]
});
const showDialog = ref(false);
const form = reactive({
  template: "",
  des: ""
});

const getList = async () => {
  const { data } = await getStrategyTmpList({ tplName: "*", sn: 1 });

  state.tableData = Object.keys(data).map(key => {
    return {
      des: key,
      template: data[key].TplName,
      ...data[key]
    };
  });
}

getList();

const editStrategy = (data: TableRow) => {
  router.push({
    path: '/setting-strategy/strategy-edit',
    query: {
      parent: JSON.stringify({
        suffix: "edit"
      }),
      data: JSON.stringify(data)
    }
  })
}

const deleteStrategy = (data: TableRow) => {
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
      await deleteStrategyTmp({ item: data.template });
      ElMessage({
        type: 'success',
        message: i18n.global.t('delMsg'),
      });
      getList();
    });
}

const addStrategy = () => {
  // init form & show dialog
  form.des = "";
  form.template = "";
  showDialog.value = true;
}

const confirmAdd = async () => {
  if (form.template.indexOf(" ") > -1) {
    ElMessage.error(i18n.global.t('noSpace'));
    return;
  }

  if (!form.template.trim() || !form.des.trim()) {
    ElMessage.error(i18n.global.t('checkForm'));
    return;
  }

  await newStrategyTmp({ TplName: form.template, des: form.des, sn: 1 });
  ElMessage.success(i18n.global.t('addMsg'));

  showDialog.value = false;

  getList();
}
</script>


<template>
  <div class="strategy-container">
    <el-button @click="addStrategy" style="margin-bottom: 20px" :icon="Plus" type="success">{{ $t("addBtn") }}</el-button>
    <el-table :data="state.tableData" style="width: 100%">
      <el-table-column prop="template" label="Template Name"/>
      <el-table-column prop="des" label="Des" />

      <el-table-column label="Operations" width="140">
        <template #default="scope">
          <el-button link type="primary" @click="editStrategy(scope.row)"
            >{{ $t("editBtn") }}</el-button
          >
          <el-button link type="danger" @click="deleteStrategy(scope.row)">{{ $t("deleteBtn") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog
    v-model="showDialog"
    :title="$t('addBtn')"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item required label="Tpl Name">
        <el-input v-model.trim="form.template" />
      </el-form-item>
      <el-form-item required label="Des">
        <el-input v-model="form.des" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">{{ $t('cancelBtn') }}</el-button>
        <el-button type="primary" @click="confirmAdd">
          {{ $t('addBtn') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style>
.strategy-container {
  padding: 10px;
  box-sizing: border-box;
}
</style>