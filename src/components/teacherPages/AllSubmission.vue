<template>
  <el-card>
    <el-table :data="currentData">
      <el-table-column prop="id" label="记录编号" width="100" align="center"></el-table-column>
      <el-table-column prop="title" label="题目编号" align="center"></el-table-column>
      <el-table-column prop="submitter" label="提交者" width="100" align="center"></el-table-column>
      <el-table-column prop="status" label="评测状态" width="180" align="center"></el-table-column>
      <el-table-column prop="totalTime" label="总用时" width="120" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间" width="180" align="center"></el-table-column>
      <el-table-column prop="astSuggestion" label="AST分析建议" width="180" align="center"></el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import request from '../../utils/request.js'
import { ElLoading, ElMessage } from "element-plus";

const currentPage = ref(1);
const pageSize = ref(20);
const totalItems = ref(0);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const allData = ref([]);
const tableData = ref([]);
const currentData = computed(() => tableData.value);

const fetchAllRecords = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/submit_record');
    allData.value = response.map((item) => {
      return {
        id: item.submission_id,
        title: item.question_id,
        status: item.status,
        totalTime: item.execution_time,
        submitTime: item.submit_time,
        astSuggestion: item.ast_advice,
        submitter: item.submitter,
      };
    });
    totalItems.value = allData.value.length; // 计算总条目数
    updateTableData();
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
}

const updateTableData = () => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  tableData.value = allData.value.slice(start, end);
};

const handleSizeChange = (val) => {
  pageSize.value = val;
  updateTableData();
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  updateTableData();
};

onMounted(() => {
  fetchAllRecords();
});
</script>

<style scoped>
.el-pagination {
  margin: 15px;
}

.demo-pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
</style>