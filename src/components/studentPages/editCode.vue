<template>
  <el-row :gutter="10">
    <el-col :span="10">
      <el-card style="height: 640px;">
        <template #header>
          <h2>{{ title }}</h2>
        </template>
        <!-- 题目描述内容 -->
        <h3>题目描述</h3>
        <p>{{ content }}</p>
        <h3>样例</h3>
        <p>{{ samples }}</p>
      </el-card>
    </el-col>
    <el-col :span="14">
      <el-card style="height: 640px;">
        <template #header>
          <div class="header">
            <h3>代码编辑</h3>
            <el-select v-model="selectedLanguage" placeholder="请选择语言" style="width: 140px"
              @change="handleLanguageChange">
              <el-option label="Python" value="python"></el-option>
              <el-option label="Java" value="java"></el-option>
              <el-option label="Shell" value="shell"></el-option>
            </el-select>
          </div>
        </template>
        <div class="editor">
          <Codemirror v-model:value="code" :options="cmOptions" border ref="cmRef"> </Codemirror>
        </div>
        <div class="submit">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submitCode">提交</el-button>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from "vue"
import 'codemirror/mode/python/python.js';
import 'codemirror/mode/shell/shell.js';
import Codemirror from "codemirror-editor-vue3"
import router from "../../router"
import request from "../../utils/request";
import { ElLoading, ElMessage } from "element-plus";
import { useRoute } from 'vue-router';

const title = ref('两数之和');
const content = ref('给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回它们的数组下标。');
const samples = ref('示例 1：输入：nums = [2,7,11,15], target = 9 输出：[0,1] 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]。');
const submitForm = reactive({
  student_id: "2",
  question_id: "5",
  submitter: "lihua",
  code: "print(\"6\")",
  language: "python"
});
const selectedLanguage = ref('python'); // 默认选择 Python

const handleLanguageChange = (newLanguage) => {
  cmOptions.mode = newLanguage;
  cmRef.value?.refresh();
};

const code = ref(
  `print(128425485935180313)`
)

const cmRef = ref()
const cmOptions = {
  mode: "python"
}

const cancel = () => {
  code.value = '';
  router.push('/student/problem')
};

const submitCode = async () => {
  submitForm.code = code.value;
  submitForm.language = selectedLanguage.value;
  try {
    ElMessage.success("提交成功");
    const response = await request.post('/judge/submit', submitForm);
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    
  }
};

const getDetail = async () => {
  const loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "正在加载中...",
  });
  try {
    const route = useRoute();
    const id = route.params.id;
    const response = await request.get('/questionlist/' + id);
    title.value = response.title;
    content.value = response.content;
    samples.value = response.samples;
  } catch (error) {
    ElMessage.error(error.message);
  } finally {
    loadingInstance.close();
  }
}

onMounted(() => {
  getDetail()
})

onUnmounted(() => {
  cmRef.value?.destroy()
})

</script>

<style scoped>
h2,
h3 {
  margin: 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor {
  height: 500px;
}

.submit {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>