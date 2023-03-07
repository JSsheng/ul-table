<script lang="ts" setup>
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import i18n from '../../lang/index'
import router from '../../router';


interface User {
  date: string
  name: string
  address: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<User[]>([])
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
}

const tableData: User[] = [
{
    date: '2016-05-03',
    name: 'Tom',
    address: '',
  }
]

const edit = () => {
  router.push({
    path: "/strategy-template/template-edit",
  })
}
</script>



<template>
  <el-row class="mb-4">
    <el-button  style="margin:5px 0 10px 30px;" type="success">
      <el-icon style="margin-right:5px;">
        <Plus />
      </el-icon>
      Add
    </el-button>
    <!-- <el-button type="primary" :icon="Search">Search</el-button> -->
  </el-row>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column :label="i18n.global.t('Strategy_Template.title')" width="200">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" :label="i18n.global.t('Strategy_Template.des')" width="120" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button @click="edit" size="small" type="success">Edit</el-button>
        <el-button size="small" type="danger">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
