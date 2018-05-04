import HelloWorld from '../components/HelloWorld'


export default [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path:'/mine',
    name:'/mine',
    component:r=>require.ensure([],()=>r(require('../components/mine/mine')),'mine')
  },{
    path:'/mine/information',
    name:'/mine/information',
    component:r=>require.ensure([],()=>r(require('../components/mine/information')),'mine')
  }
]
