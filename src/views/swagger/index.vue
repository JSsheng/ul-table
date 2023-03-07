<script setup lang="ts">
import { getStaticResource } from "../../api/static";
import { SwaggerUIBundle } from "swagger-ui-dist";
import { onMounted } from 'vue'

onMounted(async () => {
  const spec = await getStaticResource(`${import.meta.env.VITE_APP_BASE_API}/docs/nt_basecamp_rpc.swagger.json`);

  if (spec) {
    const ui = SwaggerUIBundle({
      spec,
      dom_id: '#swagger-ui',
      onComplete: () => {
        ui.preauthorizeApiKey("Authorization", "token");
      }
    })
  }
})

</script>

<template>
  <div id="swagger-ui">
  </div>
</template>

<style scoped>
#swagger-ui {
  height: 100vh;
}
</style>
