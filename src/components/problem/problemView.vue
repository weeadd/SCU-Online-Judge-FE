<template>
  <el-row style="margin: auto;max-width: 1500px;min-width: 600px;">
    <el-col :xs="24" :sm="24" :md="12">
      <el-card class="box-card" shadow="hover">
        <template #header>
          <div class="card-header">
            <p class="title">#{{ problemInfo.pid }}、{{ problemInfo.title }}</p>
          </div>
        </template>
        <v-md-preview v-show="!isSubmit" :text="problemInfo.description"> </v-md-preview>
      </el-card>
    </el-col>


    <el-col :xs="24" :sm="24" :md="12">
      <el-card class="box-card" shadow="hover">
        <div>
          <el-select v-model="language" placeholder="选择编程语言" style="width: 20%; color: black; margin-bottom: 16px;">
            <el-option label="Java" value="java"></el-option>
            <el-option label="C++" value="cpp"></el-option>
            <el-option label="C" value="c"></el-option>
            <el-option label="Python" value="python"></el-option>
          </el-select>
        </div>

        <div v-if="!isSubmit">
          <monacoEditor :value="code" @update:value="code = $event" />
          <el-divider />
          <div style="text-align: center;">
            <el-button type="primary" @click="submit">
              <el-icon class="el-icon--left">
                <Upload />
              </el-icon>
              确认提交
            </el-button>
          </div>
        </div>

        <div style="text-align: center;">
          <el-button v-if="this.gid > 1" type="danger" @click="this.$router.push('/problem/edit/' + problemInfo.pid)">
            <el-icon class="el-icon--left">
              <Operation />
            </el-icon>
            题目管理
          </el-button>
        </div>
      </el-card>
    </el-col>



  </el-row>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'
import monacoEditor from '@/components/monacoEditor.vue'

export default {
  name: "problemView",
  data() {
    return {
      pid: 0,
      gid: 1,
      problemInfo: {},
      code: '',
      language:'',
      isSubmit: false
    }
  },
  components: {
    monacoEditor
  },
  methods: {
    submit() {
      console.log(this.pid)
      console.log(this.code)
      console.log(this.language)

      axios.post('/api/judge/submit', {
        pid: this.pid,
        code: this.code,
        language: this.language

      }).then(res => {
        if (res.status === 200) {
          this.$router.push('/submission/' + res.data.sid);
        } else {
          ElMessage({
            message: '提交失败' + res.data.message,
            type: 'error',
            duration: 2000,
          });
        }
      });
    },
  },

  async mounted() {
    this.pid = this.$route.params.pid;
    this.gid = this.$store.state.gid;
    await axios.post('/api/problem/getProblemInfo', { pid: this.pid }).then(res => {
      if (res.status === 200) {
        this.problemInfo = res.data.data
        this.problemInfo.isPublic = res.data.data.isPublic ? true : false;
      }
      else {
        this.$router.push({ path: '/' });
      }
    });
    document.title = "题目 — " + this.problemInfo.title;
  }
}
</script>

<style scoped>
.box-card {
  margin: 10px;
  text-align: left;
}

.title {
  text-align: center;
  margin: 0;
  font-size: 25px;
}

.el-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>