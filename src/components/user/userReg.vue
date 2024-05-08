<template>
  <div class="reg">
    <el-card class="box-card" shadow="hover">
      <template #header>
        <div class="card-header">
          注册
        </div>
      </template>

      <el-form :model="userInfo" v-show="!active">
        <el-form-item label="姓名" prop="name" style="margin-left: 15px">
          <el-input v-model="userInfo.name" type="text" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="学号" prop="name" style="margin-left: 15px">
          <el-input v-model="userInfo.student_id" type="text" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="年级" prop="name" style="margin-left: 15px">
          <el-input v-model="userInfo.grade" type="text" placeholder="请输入年级" />
        </el-form-item>
        <el-form-item label="班级 " prop="name" style="margin-left: 15px">
          <el-input v-model="userInfo.class" type="text" placeholder="请输入班级" />
        </el-form-item>
        <el-form-item label="用户名" prop="name" style="margin-left: 15px">
          <el-input v-model="userInfo.username" type="text" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="pass" style="margin-left: 28px">
          <el-input v-model="userInfo.pwd" type="password" placeholder="长度在 6~31 之间" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="userInfo.rePwd" type="password" />
        </el-form-item>
        <el-button type="primary" @click="reg" style="width: 250px;">注册</el-button>
      </el-form>
      <el-divider />
      <el-button type="info" plain @click="this.$router.push('/user/login')"
        style="width: 100%; height: 40px;">已有用户？点此登录</el-button>
    </el-card>
  </div>
</template>
<script>
import axios from "axios";
import { ElMessage } from "element-plus";

export default {
  name: "userReg",
  data() {
    return {
      active: 0,
      recap: 0,
      userInfo: {
        name: "",
        student_id:'',
        grade:'',
        class:'',
        username: "",
        pwd: "",
        rePwd: "",
      },
      emailInfo: {
        email: "",
        verifyCode: "",
      },
    }
  },
  methods: {
    reg() {
      axios.post('/api/user/reg', {
        name: this.userInfo.name,
        student_id: this.userInfo.student_id,
        grade: this.userInfo.grade,
        class: this.userInfo.class,
        username: this.userInfo.username,
        pwd: this.userInfo.pwd,
      }).then(res => {
        if (res.status === 200) {
          ElMessage({
            message: '注册成功',
            type: 'success',
            duration: 2000,
          });
          this.$router.push('/user/login');
        } else {
          ElMessage({
            message: res.data.message,
            type: 'error',
            duration: 2000,
          });
        }
      }).catch(err => {
        ElMessage({
          message: err.message,
          type: 'error',
          duration: 2000,
        });
      });
    },
  },
  async mounted() {
    if (this.$store.state.uid) {
      this.$router.push('/');
      return;
    }
  }
}
</script>

<style scoped>
.reg {
  text-align: center;
  margin: 0 auto;
  max-width: 500px;
}

.card-header {
  font-weight: bold;
  font-size: 20px;
}
</style>