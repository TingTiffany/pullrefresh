import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import pageOne from '@/pages/pageOne'
import pageTwo from '@/pages/pageTwo'
import pageThree from '@/pages/pageThree'
import pageFour from '@/pages/pageFour'
import pageFive from '@/pages/pageFive'
import pageSix from '@/pages/pageSix'
import pageSeven from '@/pages/pageSeven'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'index',
			component: index
		},
		{
			path: '/pageOne',
			name: 'pageOne',
			component: pageOne
		},
		{
			path: '/pageTwo',
			name: 'pageTwo',
			component: pageTwo
		},
		{
			path: '/pageThree',
			name: 'pageThree',
			component: pageThree
		},
		{
			path: '/pageFour',
			name: 'pageFour',
			component: pageFour
		},
		{
			path: '/pageFive',
			name: 'pageFive',
			component: pageFive
		},
		{
			path: '/pageSix',
			name: 'pageSix',
			component: pageSix
		},
		{
			path: '/pageSeven',
			name: 'pageSeven',
			component: pageSeven
		}
	]
});
