import { createRouter, createWebHistory } from "vue-router";
import LiveFootballDashboard from "../views/LiveFootballDashboard.vue";

const routes = [
  {
    path: "/",
    name: "LiveFootballDashboard",
    component: LiveFootballDashboard,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
