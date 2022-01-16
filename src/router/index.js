import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import card from "../components/card.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true,
  },
  {
    path: "/card/:id",
    name: "card",
    component: card,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
