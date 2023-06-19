import { createRouter, createWebHistory } from "vue-router";
import ExhibitionView from "../views/ExhibitionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ExhibitionView,
    },
    {
      path: "/page/:slug",
      name: "page",
      component: () => import("../views/PageView.vue"),
    },
    {
      path: "/room/:number",
      name: "room",
      component: () => import("../views/RoomView.vue"),
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // scroll to anchors
    if (to.hash) {    
      return { el: to.hash }
    }
    // always scroll to top
    return { top: 0 }
  },
});

export default router;
