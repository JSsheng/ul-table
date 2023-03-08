<script lang="ts" setup>
import { reactive } from 'vue'
import { ElTable } from 'element-plus'
import router from '../../router'
import { useRoute } from "vue-router";
import {getstinstplinsList} from '../../api/strategy-template'



const route = useRoute()
const state = reactive({
  TabDataList:[]
})
getstinstplinsList({ tplName: "*", sn: 1 }).then((res) => {
  state.TabDataList = res.data || []
 })


 const type = route.query?.name as string || "";
let tableData: never[] = []


const edit = () => {
  router.push({
    path: "/strategy-template/template-edit",
    query: {
      parent: JSON.stringify({
        name: type
      })
    }
  })
}
</script>



<template>
    <el-button  style="margin:5px 0 10px 10px;" type="success">
    <el-icon style="margin-right:5px;"><Plus /></el-icon>Add</el-button>
    
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column :label="$t('Strategy_Template.title')" width="200"/>
    <el-table-column property="name" :label="$t('Strategy_Template.des')" width="120" />
    <el-table-column label="Operations">
      <template #default="scope">
        <el-button @click="edit" size="small" type="success">{{ $t('Strategy_Template.edit') }}</el-button>
        <el-button size="small" type="danger">{{ $t('Strategy_Template.delete') }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
