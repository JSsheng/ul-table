<script lang="ts" setup>
import { reactive, ref, nextTick } from "vue";
import { useRoute } from "vue-router";
import { InnerTableRow, TableRow } from "./index.vue";
import { ElMessage, ElTable } from 'element-plus';
import { editStrategyTmp } from "@/api/strategy";
import i18n from '@/lang/index'
import router from "@/router";

const data = JSON.parse(useRoute().query.data as string || '{}') as TableRow;

const tableData: InnerTableRow[] = reactive(data.items);
const tableRef = ref<InstanceType<typeof ElTable>>();
const preData = JSON.parse(JSON.stringify(tableData));

const showDialog = ref(false);
const state = reactive({
  form: {
    jsonField: "",
    kind: "",
    stAttr: "",
    show: false,
    des: ""
  } as InnerTableRow
});

// update template to server
const updateTmp = async () => {
  return await editStrategyTmp({
    item: {
      TplName: data.template,
      items: tableData
    }
  });
}

// update items
const updateParam = () => {
  router.replace({
    path: '/setting-strategy/strategy-edit',
    query: {
      parent: JSON.stringify({
        suffix: "edit"
      }),
      data: JSON.stringify({
        ...data,
        items: tableData
      })
    }
  })
}

const edit = (data: InnerTableRow) => {
  // init edit form
  state.form = { ...data };

  showDialog.value = true;
}

const confirmEdit = async () => {
  if (!state.form.kind.trim() || !state.form.stAttr.trim()) {
    ElMessage.error(i18n.global.t('checkForm'));
    return;
  }

  if (!state.form.des) {
    state.form.des = "--";
  }

  const idx = tableData.findIndex(i => i.jsonField === state.form.jsonField);
  if (idx === -1) {
    // not found
    return;
  } else {
    tableData[idx] = state.form;

    await updateTmp();
    ElMessage.success(i18n.global.t('innerUpdateMsg'));

    updateParam();
  }

  showDialog.value = false;
}
</script>


<template>
  <div class="strategy-container">
    <el-table ref="tableRef" :data="tableData" style="width: 100%">
      <el-table-column label="Display Switch" width="150" align="center">
        <template #default="{row}">
          <el-checkbox v-model="row.show"  size="large" />
        </template>
      </el-table-column>
      <el-table-column prop="jsonField" label="Proto Name"/>
      <el-table-column prop="kind" label="Kind" />
      <el-table-column prop="stAttr" label="Para Name" />
      <el-table-column prop="des" label="Des" />

      <el-table-column label="Operations" width="140">
        <template #default="scope">
          <el-button link type="primary" @click="edit(scope.row)"
            >{{ $t("editBtn") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog
    v-model="showDialog"
    :title="$t('editBtn')"
  >
    <el-form :model="state.form" label-width="150px">
      <el-form-item label="Proto Name">
        <el-input disabled v-model="state.form.jsonField" />
      </el-form-item>
      <el-form-item required label="Kind">
        <el-input :disabled="!(state.form.jsonField.startsWith('p1'))" v-model="state.form.kind" />
      </el-form-item>
      <el-form-item required label="Para Name">
        <el-input v-model="state.form.stAttr" />
      </el-form-item>
      <el-form-item required label="Display Switch">
        <el-radio-group v-model="state.form.show">
          <el-radio :label="true">true</el-radio>
          <el-radio :label="false">false</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item required label="Des">
        <el-input v-model="state.form.des" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">{{ $t('cancelBtn') }}</el-button>
        <el-button type="primary" @click="confirmEdit">
          {{ $t('editBtn') }}
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