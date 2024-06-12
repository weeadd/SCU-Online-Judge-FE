import { createRouter, createWebHistory } from "vue-router";
import PortalView from "@/views/PortalView.vue";
import StudentView from "@/views/StudentView.vue";
import TeacherView from "@/views/TeacherView.vue";

import problemPage from "@/components/studentPages/problemPage.vue";
import homeworkPage from "@/components/studentPages/homeworkPage.vue";
import submissionPage from "@/components/studentPages/submissionPage.vue";
import EditCode from "@/components/studentPages/editCode.vue";
import HomeworkDetail from "@/components/studentPages/homeworkDetail.vue";

import problemManage from "@/components/teacherPages/problemManage.vue";
import homeworkManage from "@/components/teacherPages/homeworkManage.vue";
import AllSubmission from "@/components/teacherPages/AllSubmission.vue";

import rank from "@/components/rank.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: PortalView,
    },
    {
      path: "/student",
      component: StudentView,
      children: [
        {
          path: "problem",
          component: problemPage,
        },
        {
          path: '/problem/:id',
          component: EditCode,
          props: true
        },
        {
          path: "homework",
          component: homeworkPage,
        },
        {
          path: '/homework/:id',
          component: HomeworkDetail,
          props: true
        },
        {
          path: "submission",
          component: submissionPage,
        },
        {
          path: "rank",
          component: rank,
        }
      ],
    },
    {
      path: "/teacher",
      component: TeacherView,
      children: [
        {
          path: "problemManage",
          component: problemManage,
        },
        {
          path: "homeworkManage",
          component: homeworkManage,
        },
        {
          path: "submission",
          component: AllSubmission,
        },
        {
          path: "rank",
          component: rank,
        }
      ],
    },
  ],
});

export default router;
