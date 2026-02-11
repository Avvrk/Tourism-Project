import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import Explore from '@/views/Explore.vue'
import AI from '@/views/AI.vue'
import Favorites from '@/views/Favorites.vue'
import More from '@/views/More.vue'
import Emergencies from '@/views/Emergencies.vue'
import DestinationDetail from '@/views/DestinationDetail.vue'
import MunicipioDetail from '@/views/MunicipioDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'home', component: Home },
    { path: '/explore', name: 'explore', component: Explore },
    { path: '/ai', name: 'ai', component: AI },
    { path: '/favorites', name: 'favorites', component: Favorites },
    { path: '/more', name: 'more', component: More },
    { path: '/emergencies', name: 'emergencies', component: Emergencies },
    { path: '/explore/:municipioSlug', name: 'MunicipioDetail', component: MunicipioDetail },
    { path: '/explore/:municipioSlug/:destinoSlug', name: 'DestinationDetail', component: DestinationDetail },
  ],
})

export default router
