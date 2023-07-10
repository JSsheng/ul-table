<script setup lang="ts">
import { getStaticResource } from "@/api/static"
import { reactive } from "vue"
import { useRoute } from "vue-router"

const state = reactive({
  html: ""
})
const route = useRoute()
const content = decodeURIComponent(route.query.id as string)

getStaticResource(content).then((html: any) => {
  state.html = html ;// html.replaceAll(/<img(.+)>/gi, `<custom-img$1 />`);
})

</script>

<template>
<!-- <custom-render :html="state.html"></custom-render>-->
  <div v-show="state.html" v-html="state.html"></div>
</template>
