<template>
  <div>
    <p v-for="p in cell" style="margin: 0;line-height: 2.5">
      <el-link type="primary" @click="preview(p.url)">{{ p.name + "; " }} </el-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { LinkItem } from "../../views/report/index.vue";
import router from "../../router"
import { reactive } from "vue";
import { useRoute } from "vue-router"

const props = defineProps<{
  params: any;
}>();

const cell: LinkItem[] = reactive(props.params.value) as LinkItem[];

const param = useRoute().query;

const preview = (url: string) => {
  return router.push({ 
    path: `/report/preview`, 
    query: {
      parent: JSON.stringify({ 
        name: param.name 
      }), 
      id: encodeURIComponent(url) 
    } 
  });
}
</script>

