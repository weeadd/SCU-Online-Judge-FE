<template>
  <el-card>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: large; font-weight: bold; color: #333;">题目列表</span>
      <el-button type="primary" @click="dialogVisible = true">新增题目</el-button>
    </div>
    <el-table :data="currentData">
      <el-table-column prop="id" label="题目编号" width="100"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="language" label="语言" width="100"></el-table-column>
      <el-table-column prop="submits" label="提交次数" width="100"></el-table-column>
      <el-table-column prop="acRate" label="通过率" width="100"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
      <el-table-column prop="modifyTime" label="修改时间" width="120"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="delete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
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
  <el-dialog title="新增题目" v-model="dialogVisible">
    <el-form ref="form" :model="newProblem" label-width="120px">
      <el-form-item label="标题">
        <el-input v-model="newProblem.title"></el-input>
      </el-form-item>
      <el-form-item label="题目内容">
        <el-input type="textarea" v-model="newProblem.content"></el-input>
      </el-form-item>
      <el-form-item label="样例">
        <el-input type="textarea" v-model="newProblem.samples"></el-input>
      </el-form-item>
      <el-form-item label="语言">
        <el-select v-model="newProblem.language" placeholder="请选择语言">
          <el-option label="Python" value="python"></el-option>
          <el-option label="Java" value="java"></el-option>
          <el-option label="Shell" value="shell"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="add">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
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

const dialogVisible = ref(false);
const newProblem = ref({
  title: '',
  content: '',
  samples: '',
  language: '',
});


const add = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.post('/question_manage/question_manage', newProblem.value);
    ElMessage.success('新增题目成功');
    getProblems();
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
  dialogVisible.value = false;
};

const edit = (problem) => {
  newProblem.value = { ...problem };
  dialogVisible.value = true;
};

const fetchAllProblems = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const response = await request.get('/questionlist');
    allData.value = response.map((item) => {
      return {
        id: item.question_id,
        title: item.title,
        language: item.language,
        submits: item.submit_count,
        acRate: item.accepted_rate,
        createTime: new Date().toLocaleDateString(),
        modifyTime: new Date().toLocaleDateString()
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
  fetchAllProblems();
});
</script>
<style scoped>

.demo-pagination-block {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
</style>