<template>
  <img :src="source">
</template>

<script setup lang="ts">
import { getImg } from "../../api/pic"
import { ref } from "vue"

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const source = ref("");
let imgUrl = props.src

if (props.src.startsWith("/")){
  imgUrl = import.meta.env.VITE_APP_BASE_API + props.src
}

if (imgUrl.startsWith(import.meta.env.VITE_APP_BASE_API)) {
  getImg(imgUrl).then((res: any) => {
    const blob = new Blob([res], { type: 'image/png' });
    source.value = URL.createObjectURL(blob);
  })
} else {
  source.value = imgUrl;
}

</script>