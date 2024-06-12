<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column prop="id" label="作业编号" width="100" align="center"></el-table-column>
      <el-table-column prop="name" label="作业名称" align="center">
        <template #default="scope">
          <router-link :to="`/homework/${scope.row.id}`">{{ scope.row.name }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="完成情况" width="120" align="center"></el-table-column>
      <el-table-column prop="launchTime" label="发布时间" width="180" align="center"></el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="180" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from '../../utils/request.js'
import { ElLoading, ElMessage } from "element-plus";

const tableData = ref();

const handleEdit = (index, row) => {
  console.log('编辑', index, row);
};

const getHomework = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/homework_manage/homework_manage');
    tableData.value = response.map((item) => {
      return {
        id: item.homework_id,
        name: item.name,
        content: item.content,
        launchTime: item.release_time,
        deadline: item.deadline,
        problemId: item.problem_ids,
      };
    })
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
};

onMounted(() => {
  getHomework();
});
</script>

<style scoped>
a {
  color: #79bbff;
  text-decoration: none;
}
</style>