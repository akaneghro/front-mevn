import { api } from "src/boot/axios";

const redirectLink = async (to, from, next) => {
  try {
    const { data } = await api.get(`/links/${to.params.nanoid}`);
    window.location.href = data.longLink;
    next();
  } catch (e) {
    console.log(e);
    next("/404");
  }
};

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "protected",
        component: () => import("pages/ProtectedPage.vue"),
        meta: {
          auth: true,
        },
      },
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/:nanoid",
        component: () => import("pages/RedirectPage.vue"),
        beforeEnter: redirectLink,
      },
    ],
  },
  {
    path: "/404",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
