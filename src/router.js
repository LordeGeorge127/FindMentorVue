import { createRouter, createWebHistory } from "vue-router";
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachDetails.vue';
import CoachRegister from './pages/coaches/CoachDetails.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieived from './pages/requests/RequestsRecieived.vue';
import NotFound from './pages/NotFound.vue';


const router = createRouter({
  history: createWebHistory(),
  routers: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      children: [{ path: '/contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegister },
    { path: '/requests', component: RequestsRecieived },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});
export default router;
