import User from '../components/Home/user'
import Header from '../components/Home/header'
import Singer from '../views/singer/singer'
import Rank from '../views/rank/rank'
import Video from '../views/video/video'

// import SingerList from '../views/singer/singerList/singerList'//二级组件
import SingerInfo from '../views/singer/singerInfo'//二级组件
import PlistInfo from '../views/plist/plistInfo'//二级组件

import Search from '../views/search/search';//公用组件
import PList from '../views/plist/plist'//公用组件

// 导航区域的配置
export let navConfig = [
  {
    path: '/',
    title: '首页',
    component: Header,
    info:{
      order:0
    }
  },
  {
    path: '/user',
    title: '个人中心',
    component: User,
    info:{
      order:0
    }
  },
  {
    path: '/plist',
    title: '分类歌单',
    component: PList,
    info:{
      order:0
    }
  },
  {
    path: '/search',
    title: '搜索',
    component: Search
  },
  {
    path: '/singer',
    title: '歌手',
    component: Singer,
    info:{
      order:1
    }
  },
  {
    path: '/rank',
    title: '排行',
    component: Rank,
    info: {
      order: 1
    }
  },
  {
    path: '/video',
    title: '视频',
    component: Video,
    info:{
      order:0
    }
  },
  //二级路径
  {
    path: '/plist/list/:id',
    title: '歌单信息',
    component: PlistInfo//动态路由，获取歌单id
  },
  {
    path: '/singer/info/:id',
    title: '歌手信息',
    component: SingerInfo
  }, 
  // {
  //   path: '/singer/list/:id',
  //   title: '歌手',
  //   component: SingerList
  // }
]

export default [...navConfig]