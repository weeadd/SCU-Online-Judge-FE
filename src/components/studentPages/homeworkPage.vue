<template>
  <el-card>
    <el-table :data="currentData">
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


const handleEdit = (index, row) => {
  console.log('编辑', index, row);
};

const fetchAllHomework = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/homework_manage/homework_manage');
    allData.value = response.map((item) => {
      return {
        id: item.homework_id,
        name: item.name,
        content: item.content,
        launchTime: item.release_time,
        deadline: item.deadline,
        problemId: item.problem_ids,
      };
    });
    totalItems.value = allData.value.length; // 计算总条目数
    updateTableData();
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
};

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
  fetchAllHomework();
});
</script>

<style scoped>
a {
  color: #79bbff;
  text-decoration: none;
}

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