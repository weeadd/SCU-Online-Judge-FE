<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column prop="id" label="题目编号" width="100" align="center"></el-table-column>
      <el-table-column label="标题" align="center">
        <template #default="scope">
          <router-link :to="`/problem/${scope.row.id}`">{{ scope.row.title }}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="language" label="语言" width="120" align="center"></el-table-column>
      <el-table-column prop="submits" label="提交次数" width="120" align="center"></el-table-column>
      <el-table-column prop="acRate" label="通过率" width="120" align="center"></el-table-column>
      <el-table-column prop="launchTime" label="发布时间" width="180" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import request from "../../utils/request";
import { ElLoading, ElMessage } from "element-plus";

const tableData = ref([
  {
    id: '1',
    title: '求两数之和',
    language: 'python',
    submits: '4',
    acRate: '75%',
    launchTime: '2024-6-01',
  },
]);

const getProblems = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/questionlist');
    tableData.value = response.map((item) => {
      return {
        id: item.question_id,
        title: item.title,
        language: item.language,
        submits: item.submit_count,
        acRate: item.accepted_rate,
        launchTime: '2024-6-01',
      };
    })
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
};

onMounted(() => {
  getProblems();
});
</script>

<style scoped>
a {
  color: #79bbff;
  text-decoration: none;
}
</style>