<template>
  <div class=nav-wrapper>
      <el-header>
        <TeacherMenu />
      </el-header>
  </div>
     
  <el-container>
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
  margin: auto;
  height: 100%;
}

.el-header{
  width: 1200px;
  margin: 0 auto;
  height: 100%;

}

.nav-wrapper{
  width: 100%;
  height: 100%;
  background: #fff;
  color:#fff;
  box-sizing: border-box;
  box-shadow: 0px 0px 4px 0px rgba(168, 170, 173, .2);
  border-bottom: 1px solid var(--el-menu-border-color);

}
.el-container{
  width: 1200px;
}
</style>
