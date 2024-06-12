<template>
  <el-card>
    <el-table :data="tableData">
      <el-table-column prop="id" label="记录编号" width="100" align="center"></el-table-column>
      <el-table-column prop="title" label="题目编号" width="100" align="center"></el-table-column>
      <el-table-column prop="status" label="评测状态" width="160" align="center"></el-table-column>
      <el-table-column prop="totalTime" label="总用时" width="120" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" width="180" align="center"></el-table-column>
      <el-table-column prop="astSuggestion" label="AST分析建议" align="center"></el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import request from "../../utils/request";
import { ElLoading, ElMessage } from "element-plus";

const tableData = ref([
  {
    id: '1',
    title: '求两数之和',
    status: '已评测',
    totalTime: '332ms',
    submitTime: '2024-6-03',
    astSuggestion: '无'
  }
]);

const getRecords = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/submit_record/2');
    tableData.value = response.map((item) => {
      return {
        id: item.submission_id,
        title: item.question_id,
        status: item.status,
        totalTime: item.execution_time,
        submitTime: item.submit_time,
        astSuggestion: item.ast_advice
      };
    })
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
}

onMounted(() => {
  getRecords();
});
</script>

<style scoped></style>