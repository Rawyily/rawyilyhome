import { createRouter, createWebHistory } from 'vue-router';
const Home = () => import('views/Home.vue')
const Administrator = () => import('views/administrator/Administrator.vue')
const UploadSlideshowImg = () => import('views/administrator/UploadSlideshowImg.vue')
const UploadRecommendImg = () => import('views/administrator/UploadRecommendImg.vue')
const UploadMyProject = () => import('views/administrator/UploadProject.vue')
const Loginbase = () => import('views/login/Loginbase.vue')
const Lonin = () => import('views/login/Login.vue')
const Register = () => import('views/login/Register.vue')
const updatapassword = () => import('views/login/Updatapassword.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component:Home,
  },
  {
    path: '/administrator',
    name: 'Administrator',
    component:Administrator,
    children: [
      {
        path: 'uploadslideshowimg',
        name: 'UploadSlideshowImg',
        component:UploadSlideshowImg,
      },
      {
        path: 'uploadrecommendimg',
        name: 'UploadRecommendImg',
        component:UploadRecommendImg,
      },
      {
        path: 'uploadmyproject',
        name: 'UploadMyProject',
        component:UploadMyProject,
      },
      
    ]
    
  },
  {
    path: '/loginbase',
    name: 'Loginbase',
    component:Loginbase,
    children: [
      {
        path: 'login',
        name: 'Lonin',
        component:Lonin,
      },
      {
        path: 'register',
        name: 'Register',
        component:Register,
      },
      {
        path: 'updatapassword',
        name: 'updatapassword',
        component:updatapassword,
      },
      
    ]
    
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
