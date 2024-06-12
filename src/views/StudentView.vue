<template>
  <el-container>
    <el-header>
      <StudentMenu />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import StudentMenu from "@/components/StudentMenu.vue";
</script>

<style scoped>
.el-container {
  width: 70%;
  margin: auto;
  height: 100%;
}
</style>
