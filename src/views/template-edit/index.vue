  <script lang="ts" setup>
  import { ref } from 'vue'
  import { ElTable } from 'element-plus'
  import i18n from '../../lang/index'

  
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
  
  const tableData: User[] = [
    {
      date: 'name',
      name: '........',
      address: '',
        },
        {
      date: 'name',
      name: '........',
      address: '',
    },
    {
      date: 'name',
      name: '........',
      address: '',
    },
    {
      date: 'name',
      name: '........',
      address: '',
    },
    {
      date: 'name',
      name: '........',
      address: '',
    },
    
  ]
  </script>


<template>

  <el-row class="mb-4">
    <el-button style="margin:5px 0 10px 30px;" type="success">Submit</el-button>
  </el-row>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :label="i18n.global.t('Strategy_Edit.title')" width="200">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" :label="i18n.global.t('Strategy_Edit.kind')" width="120" />
      <el-table-column property="name" :label="i18n.global.t('Strategy_Edit.paraname')" width="120" />
      <el-table-column property="name" :label="i18n.global.t('Strategy_Edit.show')" width="120" />
      <el-table-column property="name" :label="i18n.global.t('Strategy_Edit.des')" width="120" />
      <el-table-column property="address" :label="i18n.global.t('Strategy_Edit.operation')" show-overflow-tooltip >
        <template #default="slot">
            <el-button size="small" type="success">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  