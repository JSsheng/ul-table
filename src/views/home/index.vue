<script setup lang='ts'>
import { ref } from 'vue'
 
</script>
<template>
  <div class="app">
    <span class="subelement">
        <span>NEW</span>
    </span>
    <span class="subelement"></span>
    <span class="subelement"></span>
    <span class="subelement"></span>
    <span class="subelement"></span>
    <span class="subelement"></span>
  </div>
</template>
<style lang="scss" scoped >
.app{
    display: flex;
    width: 2000px;
    height: 100%;
    padding: 10px 10px 10px 10px;
    background-color: red;

    .subelement{
        display: block;
        width: 200px;
        height: 300px;
        background-color: pink;
        margin:10px 10px 10px 10px ;
    }
}
</style>