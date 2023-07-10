<script lang="ts" setup>
import { computed, ref, nextTick, onMounted } from "vue";
import { config } from "./config"
import Rainbow from "@/utils/rainbow";
import { getLogTxt } from "@/api/log";
import { useRoute } from "vue-router";
import {
  Download
} from '@element-plus/icons';
import { downloadFile } from "@/utils/common";
import { ElMessage } from 'element-plus'

const NO_FILE = "No log file found."

const route = useRoute();
const logInfo = JSON.parse(route.query?.info as string || "")
const lineCnt = "9"
const keys = ["c"];
const file = ref("");
const loading = ref(false);
const hasFile = computed(() => file.value !== "" && file.value !== NO_FILE);
const codeContainer = ref();
const sectionRef = ref()
let arr = ref()
let str = ref()
let page = ref(1)
let size = 90
let end = ref(-1);
onMounted(() => {
  sectionRef.value.addEventListener('scroll', listenBottomOut)  
}),
Rainbow.extend("log", config, "generic");

const data = {
  appName: logInfo.appName,
  workerId: logInfo.workerId,
  lineCnt,
  keys
}

const getLog = async (data: any) => {
  try {
    loading.value = true;
    const res = await getLogTxt(data);
    file.value = res.data;
    arr.value = file.value.split('/n')
    str.value = arr.value.slice(0, size).join('')
    end.value = Math.ceil(arr.value.length / size);

    nextTick(() => {
      // Rainbow.color()
      loading.value = false;
    })

  } catch {
    file.value = NO_FILE
    loading.value = false;
  }
}

getLog(data);

const download = () => {
  if (!hasFile.value) {
    ElMessage.error(NO_FILE);
    return;
  }
  const blob = new Blob([file.value]);
  downloadFile(URL.createObjectURL(blob), `${logInfo.appName}-${logInfo.workerId}.log`);
}

const listenBottomOut = () => {
  const scrollTop = sectionRef.value.scrollTop
  const clientHeight = sectionRef.value.clientHeight
  const scrollHeight = sectionRef.value.scrollHeight

  if (scrollHeight > clientHeight && scrollTop + clientHeight + 250 > scrollHeight) {
    if (page.value <= end.value) {
      ++page.value;
      const s = arr.value.slice((page.value - 1) * size, (page.value - 1) * size + size);
      str.value += ("\n" + s.join(''));
    }
  }
}



</script>

<template>
  <div ref="sectionRef" class="log-container" v-loading="loading">
    <div class="download">
      <el-button :disabled="!hasFile" @click="download" type="primary" :icon="Download">
        下载
      </el-button>
    </div>

    <pre ref="codeContainer">
      <code data-language="log">
        {{ str }}
      </code>
    </pre>

  </div>
</template>

<style scoped lang="scss">
.log-container {
  width: 100%;
  overflow: scroll;
  background: #f8f8f8;
  border: 1px solid #ccc;

  pre {
    padding-top: 0;
    margin-top: 0;
    width: 100%;
    background: transparent;
    border: none;
  }

  .download {
    position: fixed;
    top: 10px;
    right: 10px;
  }
}
</style>