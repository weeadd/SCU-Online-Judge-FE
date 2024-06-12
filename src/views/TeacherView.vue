<template>
  <el-container>
    <el-header>
      <TeacherMenu />
    </el-header>
    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<script setup>
import TeacherMenu from "@/components/TeacherMenu.vue";
</script>

<style scoped>
.el-container {
  width: 70%;
  margin: auto;
  height: 100%;
}
</style>
