<template>
  <div class="input-container">
    <div class="card-header">
      <p class="title">布置作业</p>
    </div>
    <div class="input-group">
      <el-input
          v-model="classInput"
          placeholder="请输入班级"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="classNum" @change="updateClassInput" placeholder="选择班级" style="width: 100px" class="green-select">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
          </el-select>
        </template>
      </el-input>
    </div>

    <div class="input-group">
      <el-input
          v-model="name"
          placeholder="作业名称"
      >
      </el-input>
    </div>

    <div class="input-group">
      <el-input
          v-model="detail"
          placeholder="作业详情"
      >
      </el-input>
    </div>

    <div class="input-group">
      <el-date-picker
          v-model="deadline"
          type="datetime"
          placeholder="截止时间选择"
          style="width: 100%;"
      ></el-date-picker>
    </div>


    <div class="input-group">
      <el-input
          v-model="problemInput"
          placeholder="请选择题目"
          class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="problem" @change="updateProblemInput" placeholder="选择题目" style="width: 100px" class="green-select">
            <el-option label="1" value="1" />
            <el-option label="2" value="2" />
            <el-option label="3" value="3" />
            <el-option label="4" value="4" />
            <el-option label="5" value="5" />
            <el-option label="6" value="6" />
            <el-option label="7" value="7" />
            <el-option label="8" value="8" />
            <el-option label="9" value="9" />
            <el-option label="10" value="10" />
          </el-select>
        </template>
      </el-input>
    </div>
    <div>
      <button type="button" class="el-button el-button--success el-button--circle" @click="submitDataToBackend">
        <i class="el-icon-check"></i>
        提交
      </button>
    </div>
  </div>
</template>

<script>
import { ElInput, ElSelect, ElOption } from 'element-plus';
import axios from "axios";

export default {
  components: {
    ElInput,
    ElSelect,
    ElOption,
  },
  data() {
    return {
      classNum: '',
      classInput: '请输入班级',
      name: '',
      detail: '',
      problem: '',
      problemInput: '请选择题目',
      deadline: ''
    };
  },
  methods: {
    updateClassInput(value) {
      this.classInput = `${value}`;
      this.classNum = '选择班级'
    },
    updateProblemInput(value) {
      this.problemInput = `${value}`;
      this.problem = '选择题目'
    },
    submitDataToBackend() {
      axios.post('/api/homework/submit', {
        classInput: this.classInput,
        problemInput: this.problemInput,
        detail: this.detail,
        name: this.name,
        deadline: this.deadline
      }).then(res => {
        if (res.status === 200) {
          // 提交成功，弹出成功框
          this.$message({
            message: '提交成功',
            type: 'success',
            duration: 2000
          });

          // 页面跳转到指定位置
          this.$router.push('/');
        } else {
          // 提交失败，弹出失败框
          this.$message.error('提交失败：' + res.data.message);
        }
      }).catch(error => {
        // 异常处理
        console.error('提交数据时发生错误:', error);
        this.$message.error('提交失败，请稍后再试！');
      });
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 居中显示 */
}

.card-header .title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}

.input-group {
  margin-bottom: 30px;
  width: 30%; /* 使每个输入框占据整个宽度 */
}

.green-select .el-input {
  background-color: #e6f7e6;
}
</style>
