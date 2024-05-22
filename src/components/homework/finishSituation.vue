<template>
  <div class="container">
    <el-table
        :data="tableData"
        border
        style="width: 80%">
      <el-table-column
          prop="homeworkId"
          label="作业编号"
          width="180">
      </el-table-column>
      <el-table-column
          prop="homeworkName"
          label="作业名称"
          width="180">
      </el-table-column>
      <el-table-column
          prop="class"
          label="待完成班级">
      </el-table-column>
      <el-table-column
          prop="completionStatus"
          label="完成情况">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    // 模拟从后端获取数据
    setTimeout(() => {
      this.tableData = [
        { homeworkId: '1', homeworkName: '作业1', class: '班级1', completionStatus: '完成' },
        { homeworkId: '2', homeworkName: '作业2', class: '班级2', completionStatus: '未完成' },
        { homeworkId: '3', homeworkName: '作业3', class: '班级3', completionStatus: '完成' },
        { homeworkId: '4', homeworkName: '作业4', class: '班级4', completionStatus: '未完成' }
      ];
    }, 500);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px; /* 设置上边距，使表格置顶显示 */
}
</style>
