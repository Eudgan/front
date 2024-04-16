import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: {
      title: 'Главная страница'
    }
  },
  {
    path: '/menu',
    name: 'menu',
    props: (route) => ({ query: route.query.name }),
    component: () => import('../views/MenuView.vue'),
    children: [
      {
        path: ':id',
        name: 'item',
        component: () => import('../components/ItemCastomizationComponent.vue'),
        props: true,
      }
    ],
    meta: {
      title: 'Меню'
    }
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('../views/TeamView.vue'),
    meta: {
      title: 'Команда'
    }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import('../views/SuppliersView.vue'),
    meta: {
      title: 'Поставщики'
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/CartView.vue'),
    children: [
      {
        path: ':id-:uuid',
        name: 'cartItem',
        component: () => import('../components/ItemCastomizationComponent.vue'),
        props: true,
      }
    ],
    meta: {
      title: 'Корзина'
    }
  },
  {
    path: '/confidentiality',
    name: 'confidentiality',
    component: () => import('../views/СonfidentialityView.vue'),
    meta: {
      title: 'Политики конфиденциальности'
    }
  },
  {
    path: '/:pathMatch(.*)*', // Маршрут для любых несуществующих маршрутов
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'Страница не найдена'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from) {
    if (to.name === 'item' && from.name === 'menu') {
      return false;
    } else if (to.name === 'menu' && from.name === 'item') {
      return false;
    }
      return { top: 0 };
  },
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router
