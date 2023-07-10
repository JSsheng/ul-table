<template>
  <el-link type="primary" @click="log">show log</el-link>
</template>

<script setup lang="ts">
import router from "@/router"
import { reactive } from "vue";
const props = defineProps<{
  params: any;
}>();

const cell = reactive(props.params.value);

const log = () => {
  return router.push({ 
    path: '/log', 
    query: {
      parent: JSON.stringify({ 
        spec: "hawkeye?name=app",
      }),
      info: JSON.stringify(cell)
    } 
  });
}
</script>

