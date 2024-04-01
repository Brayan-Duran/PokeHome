
import pokedex from "../components/pokedex.vue"
import { createRouter, createWebHashHistory } from "vue-router";
import pokehome from "../components/pokehome.vue";
import pokegame from "../components/pokegame.vue";

const routes =[
{path: "/", component: pokehome},
{path: "/pokedex", component: pokedex},
{path: "/pokegame", component: pokegame}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})