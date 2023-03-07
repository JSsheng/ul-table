<template>
  <div v-html="cell">
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const { params } = defineProps<{
  params: any;
}>();

const cell = ref(params?.value?.value as string) ;
</script>

<style scoped>
p {
  margin: 0;
}
</style>
