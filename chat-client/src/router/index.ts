import { createRouter, createWebHashHistory } from 'vue-router'

const routerHistory = createWebHashHistory(import.meta.env.BASE_URL)
const router = createRouter({
	history: routerHistory,
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/Home.vue')
		},
		{
			path: '/:name',
			name: 'chat',
			component: () => import('../views/Chat.vue')
		}
	]
})

router.beforeEach((to, _form, next) => {
	if (to.name == 'chat') {
		const name = decodeURIComponent(to.params.name as string)
		document.title = name + ' - 聊天室'
	} else {
		document.title = '凌凯定制聊天室'
	}
	next()
})

export default router
