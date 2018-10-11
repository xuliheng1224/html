import HelloWorld from '../components/HelloWorld'
import VueRouter from 'vue-router'

const routes = [{
  path: '/',
  name: 'HelloWorld',
  component: HelloWorld
},
{
  path: '/mine',
  name: '/mine',
  component: r => require.ensure([], () => r(require('../components/mine/mine')), 'mine')
},
{
  path: '/mine/informations',
  name: '/mine/information',
  component: r => require.ensure([], () => r(require('../components/mine/information')), 'mine')
}]

const router = new VueRouter({
  routes
})

export default router
