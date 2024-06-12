<template>
  <el-card>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: large; font-weight: bold; color: #333;">作业列表</span>
      <el-button type="primary" @click="dialogVisible = true;">新增作业</el-button>
    </div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="作业编号" width="100"></el-table-column>
      <el-table-column prop="name" label="作业名称" align="center"></el-table-column>
      <el-table-column prop="content" label="作业描述" align="center"></el-table-column>
      <el-table-column prop="problemId" label="题目" width="120"></el-table-column>
      <el-table-column prop="launchTime" label="发布时间" width="180"></el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" @click="delete (scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog title="新增作业" v-model="dialogVisible" width="400">
    <el-form ref="form" :model="newHomework" label-width="120px">
      <el-form-item label="作业名称">
        <el-input v-model="newHomework.name"></el-input>
      </el-form-item>
      <el-form-item label="作业描述">
        <el-input v-model="newHomework.content"></el-input>
      </el-form-item>
      <el-form-item label="截止时间">
        <el-date-picker v-model="newHomework.deadline" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="题目编号">
        <el-input v-model="newHomework.problem_ids"></el-input>
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
import { ref, onMounted } from 'vue';
import request from '../../utils/request.js'
import { ElLoading, ElMessage } from "element-plus";

const tableData = ref();

const dialogVisible = ref(false);
const newHomework = ref({
  name: "",
  content: "",
  class_id: "1",
  deadline: "",
  problem_ids: ""
});

const add = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    newHomework.value.deadline = new Date(newHomework.value.deadline).toLocaleString('zh-CN', { hour12: false });
    const response = await request.post('/homework_manage/homework_manage', newHomework.value);
    ElMessage.success('新增题目成功');
    getHomework();
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
  dialogVisible.value = false;
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

<style scoped></style>