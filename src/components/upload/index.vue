<template>
  <div class="upload-container">
    <div class="file-container">
      <input type="file" :accept="props.type" @change="uploadCSVBtn">
      <el-button style="margin-bottom: 20px" :icon="Plus" type="success">{{ $t("uploadCSVBtn") }}</el-button>
    </div>
    <span class="file-name">{{ fileName }}</span>
  </div>
</template>

<script setup lang="ts">
import {
  Plus
} from "@element-plus/icons"
import i18n from '@/lang/index';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';

const emits = defineEmits(['upload'])

const props = defineProps({
  type: {
    type: String,
    default: '.csv'
  }
});

const fileName = ref('');

const uploadCSVBtn = (e: any) => {
  const files = e?.target?.files as FileList;
  const file = files[0];

  if (!file.name.endsWith(props.type)) {
    ElMessage({
      message: i18n.global.t('fileTypeErr'),
      type: 'error'
    });
    fileName.value = "";
    return;
  }

  fileName.value = file.name;

  const reader = new FileReader();
  reader.onload = () => {
    const csvString = reader.result as string;
    return emits('upload', { value: csvString, file });
  }
  reader.readAsText(file);
}
</script>

<style scoped lang="scss">
.file-container {
  position: relative;
  display: inline-block;

  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
  }
}

.file-name {
  color: #848383;
  margin-left: 20px;
}
</style>