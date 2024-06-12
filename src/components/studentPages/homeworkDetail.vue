<template>
  <el-card>
    <template #header>
      <h1>第一次作业</h1>
    </template>
    <el-table :data="tableData">
      <el-table-column prop="id" label="题目编号" width="100" align="center"></el-table-column>
      <el-table-column label="标题" align="center">
        <template #default="scope">
          <router-link :to="`/problem/${scope.row.id}`">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="language" label="语言" width="120" align="center"></el-table-column>
      <el-table-column prop="submits" label="提交次数" width="120" align="center"></el-table-column>
      <el-table-column prop="ac" label="是否通过" width="120" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from '../../utils/request.js'
import { ElLoading, ElMessage } from "element-plus";
import { useRoute } from 'vue-router';

const route = useRoute();
const tableData = ref();

const getHomeworkDetail = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/student_homework/get_homework?homework_id=' + route.params.id);
    tableData.value = response.map((item) => {
      return {
        id: item.question_id,
        title: item.title,
        language: 'python',
        submits: item.submit_count,
        ac: "未通过"
      };
    })
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
};

onMounted(() => {
  getHomeworkDetail();
});
</script>

<style scoped>
h1 {
  margin: 0;
  text-align: center;
}

a {
  color: #79bbff;
  text-decoration: none;
}
</style>
