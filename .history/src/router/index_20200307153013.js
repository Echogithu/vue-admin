import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//引入布局组件
import Layout from "@/views/Layout";

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录",
      isPublic: true
    },
    component: () => import("../views/Login/index.vue")
  },
  /**
   * 我教的课
   */
  {
    path: "/courses",
    name: "Courses",
    redirect: "index",
    meta: {
      name: "我教的课",
      icon: "el-icon-data-line"
    },
    component: Layout,
    children: [
      {
        path: "/courses/list",
        name: "CourseList",
        meta: {
          name: "我教的课"
        },
        component: () => import("../views/Courses/CoursesList.vue")
      },
      {
        path: "/courses/create",
        name: "CoursesEdit",
        meta: {
          name: "创建课程"
        },
        component: () => import("../views/Courses/CoursesEdit.vue")
      }
    ]
  },
  /**
   * 课程-班级详情
   */
  {
    path: `/course/class/:id`,
    name: "CourseClassDetail",
    hidden: true,
    meta: {
      name: "CourseClassDetail"
    },
    // redirect: "/course/class/microCourse",
    component: () => import("../views/Courses/CourseDetail.vue")
  },

  /**
   * 课程-班级-编辑测验
   */
  {
    path: `/course/class/activities/classTest/:id`,
    name: "ClassTest",
    hidden: true,
    meta: {
      name: "ClassTest"
    },
    // redirect: "/course/class/microCourse",
    component: () => import("../views/Activities/ClassTest.vue")
  },

  {
    path: `/test/start/:id`,
    hidden: true,
    meta: {
      name: "ClassTest"
    },
    // redirect: "/course/class/microCourse",
    component: () => import("../views/Activities/TestAction.vue")
  },

  /**测验内容 */
  {
    path: `/test/content/:id`,
    hidden: true,
    meta: {
      name: "TestContent",
      isPublic: true
    },
    // redirect: "/course/class/microCourse",
    component: () => import("../views/Activities/TestContent.vue")
  },

  /**
   * 我听的课
   */
  {
    path: "/class",
    name: "Class",
    meta: {
      name: "我听的课",
      icon: "el-icon-reading"
    },
    component: Layout,
    children: [
      {
        path: "/Class",
        name: "Class",
        meta: {
          name: "我听的课"
        },
        component: () => import("../views/Class")
      }
      // {
      //   path: "/infoCategory",
      //   name: "InfoCategory",
      //   meta: {
      //     name: "加入班级"
      //   },
      //   component: () => import("../views/Info/category.vue")
      // }
    ]
  },

  /**
   * 资源管理
   */
  {
    path: "/folder",
    name: "Folder",
    meta: {
      name: "资料管理",
      icon: "el-icon-folder-add"
    },
    component: Layout,
    children: [
      {
        path: "/folder",
        name: "Folder",
        meta: {
          name: "资料列表"
        },
        component: () => import("../views/Folder")
      }
    ]
  },

  /**
   * 用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理",
      icon: "el-icon-user"
    },
    component: () => import("../views/Layout/index.vue"),
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户信息"
        },
        component: () => import("../views/User/index.vue")
      },
      {
        path: "/edit/user",
        name: "editUser",
        meta: {
          name: "修改密码"
        },
        component: () => import("../views/User/password.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

//路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next("/login");
  }
  next();
});

export default router;
