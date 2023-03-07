  <script lang="ts" setup>
  import { ElTable } from 'element-plus'
  import { getsetinsList } from '../../api/strategy-template'

  
  
getsetinsList({ tplName: "", des: "", items: [] }).then((res) => {
  tableData = res.data
})

  let tableData: never[] = []
  </script>


<template>
    <el-button style="margin:5px 0 10px 10px;" type="success">Submit</el-button>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column :label="$t('Strategy_Edit.title')" width="200">
        <template #default="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column property="name" :label="$t('Strategy_Edit.kind')" width="120" />
      <el-table-column property="name" :label="$t('Strategy_Edit.paraname')" width="120" />
      <el-table-column property="name" :label="$t('Strategy_Edit.show')" width="120" />
      <el-table-column property="name" :label="$t('Strategy_Edit.des')" width="120" />
      <el-table-column property="address" :label="$t('Strategy_Edit.operation')" show-overflow-tooltip >
        <template #default="slot">
            <el-button size="small" type="success">{{ $t('Strategy_Edit.edit') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  