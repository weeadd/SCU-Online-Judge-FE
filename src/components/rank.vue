<template>
  <el-table :data="tableData" :default-sort="{ prop: 'passes', order: 'descending' }">
    <el-table-column type="index" label="排名" width="100" align="center"></el-table-column>
    <el-table-column prop="username" label="用户名" align="center"></el-table-column>
    <el-table-column prop="submitTimes" label="提交次数" width="120" align="center"></el-table-column>
    <el-table-column prop="passes" label="完成题目数" width="120" align="center" sortable>
      <template #default="scope">
        <span>{{ scope.row.passes }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="passRate" label="通过率" width="120" align="center" sortable>
      <template #default="scope">
        <span>{{ scope.row.passRate }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from "../utils/request";
import { ElLoading, ElMessage } from "element-plus";

const tableData = ref([
  {
    username: 'user1',
    submitTimes: '4',
    passes: 3,
    passRate: '0.75'
  },
  {
    username: 'admin',
    submitTimes: '5',
    passes: 4,
    passRate: '0.67'
  },
  {
    username: 'test',
    submitTimes: '9',
    passes: 1,
    passRate: '0.10'
  },
  {
    username: 'lihua',
    submitTimes: '10',
    passes: 8,
    passRate: '0.50'
  },

]);

const getRank = () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  setTimeout(() => {
    loadingInstance.close();
  }, 1000);
};

onMounted(() => {
  getRank();
});
</script>

<style scoped></style>