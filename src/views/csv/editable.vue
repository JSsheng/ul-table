<script setup lang='ts'>
import { useRoute } from "vue-router";
import csvtojson from 'csvtojson';
import { computed, reactive, ref } from "vue";
import { setKVStore } from "@/api/csv";
import { json2csv } from 'json-2-csv';
import i18n from '@/lang/index'
import { ElMessage } from 'element-plus';
import router from "@/router";
import {
  Plus
} from "@element-plus/icons"

const route = useRoute();
const showDialog = ref(false);

const state = reactive({
  tableData: [] as any,
  rawData: "",
  form: {} as any,
  idx : -1
});

const url = (route.query?.url as string || "").replaceAll(";", ",");
const type = route.query?.meta as string || "";
const parentName = JSON.parse(route.query?.parent as string || "").name;
const specName = JSON.parse(route.query?.parent as string || "").spec;
const showOperation = computed(() => {
  return !!specName;
})

const updateParam = () => {
  const parent = {} as any;
  if (parentName) {
    parent.name = parentName;
  }

  if (specName) {
    parent.spec = specName;
  }
  router.replace({
    path: '/monitor/csv-editable',
    query: {
      parent: JSON.stringify({
        ...parent
      }),
      meta: type,
      title: type,
      url: state.rawData
    }
  });
}

async function getjson() {
  if (url) {
    state.tableData = await csvtojson().fromString(url) as any || [];
  }
}

const confirmEdit = async () => {
  if (checkForm(state.form)) {
    const rawData = JSON.parse(JSON.stringify(state.tableData)) || [];
    if (rawData && rawData.length) {
      // update raw data and handle csv
      if (state.idx === -1) {
        // add
        rawData.push(state.form)
      } else {
        // eidt
        rawData[state.idx] = state.form;
      }
      updateRaw(rawData)
    }
  }
}

const edit = (idx: number, row: any) => {
  showDialog.value = true;
  state.form = JSON.parse(JSON.stringify(row));
  state.idx = idx;
}

const deleteRow = (idx: number) => {
  const rawData = JSON.parse(JSON.stringify(state.tableData)) || [];
  if (rawData && rawData.length) {
    // update raw data and handle csv
    rawData.splice(idx, 1);
    updateRaw(rawData);
  }
}

// format raw data to csv and update kvstore
const updateRaw = async (rawData: any) => {
  const csv = await json2csv(rawData);
  state.rawData = csv?.replaceAll(",", ";");

  // update csv
  await setKVStore({
    item: {
      key: type,
      value: state.rawData,
    },
    sn: 1
  });

  ElMessage.success(i18n.global.t('innerUpdateMsg'));
  // update router
  updateParam();
}

getjson()

// add style for matched row
const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: any
  rowIndex: number
}) => {
  if (rowIndex % 2 !== 0) {
    return 'span-row'
  }
  return ''
}

const addCSV = () => {
  state.form = initForm();
  showDialog.value = true;
}

function initForm() {
  const form = {} as any;
  for(let i in state.tableData[0]) {
    form[i] = "-";
  }
  return form;
}

function checkForm(form: any) {
  const keys = Object.keys(form);
  for(let i = 0; i < keys.length; ++i) {
    if (!form[keys[i]] || !form[keys[i].trim()]) {
      ElMessage.error(i18n.global.t("checkForm"));
      return false;
    }
  }
  return true;
}
</script>
<template>
  <div class="csv-editor-container">
    <el-button v-if="showOperation" type="success" :icon="Plus" @click="addCSV">{{ $t("addBtn") }}</el-button>

    <el-table :data="state.tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column v-for="(item, key) of state.tableData[0]" :key="key" :label="key" :prop="key" />
      <el-table-column v-if="showOperation" label="Operations" width="140">
        <template #default="scope">
          <el-button link type="primary" @click="edit(scope.$index, scope.row)">{{ $t("editBtn") }}</el-button>
          <el-button link type="danger" @click="deleteRow(scope.$index)">{{ $t("deleteBtn") }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showDialog" :title="$t('addBtn')">
      <el-form model="state.from">
        <el-form-item  v-for="(value, key) of state.form" :key="key" :label="key" :prop="key">
          <el-input  v-model="state.form[key]" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showDialog = false">{{ $t("cancelBtn") }}</el-button>
        <el-button type="primary" @click="confirmEdit">{{ $t('innerSubmitBtn') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.csv-editor-container {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}

::v-deep(.el-table .span-row){
  --el-table-tr-bg-color: #fcfcfc;
}
</style>