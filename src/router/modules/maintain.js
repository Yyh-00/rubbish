// 动态路由的规则额外写
// 导出员工的路由规则

import Layout from '@/layout'

export default {
  // 路由规则
  path: '/maintain', // 路由地址
  name: 'maintain', // 给模块的一级路由加一个name属性 这个属性我们后面会在做权限的时候用到
  component: Layout,
  children: [
    {
      // 二级路由的path什么都不用写的时候 此时他表示二级路由的默认路由
      path: '/maintain',
      // 组件的按需导入
      component: () => import('@/views/maintain'),
      // 路由元信息 就是一个存储数据的地方 可以放任何内容
      meta: {
        title: '运营管理', // 这里放title 是因为左侧导航读取了这里的title属性
        icon: 'setting'
      }
    }
  ]
}
