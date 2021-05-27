// 动态路由的规则额外写
// 导出员工的路由规则

import Layout from '@/layout'

export default {
  // 路由规则
  path: '/alarm', // 路由地址
  name: 'alarm', // 给模块的一级路由加一个name属性 这个属性我们后面会在做权限的时候用到
  component: Layout,
  // meta: {
  //   title: '审批' // 这里放title 是因为左侧导航读取了这里的title属性
  // },
  children: [
    {
      // 二级路由的path什么都不用写的时候 此时他表示二级路由的默认路由
      path: '/alarm',
      // 组件的按需导入
      component: () => import('@/views/alarm'),
      // 路由元信息 就是一个存储数据的地方 可以放任何内容
      meta: {
        title: '报警管理', // 这里放title 是因为左侧导航读取了这里的title属性
        icon: 'tree-table'
      }
    }
    // {
    //   path: '/approvals/aa',
    //   component: () => import('@/views/approvals'),
    //   meta: {
    //     title: '审批1' // 这里放title 是因为左侧导航读取了这里的title属性
    //   }
    // }
  ]
}
