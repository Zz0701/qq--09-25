import axios from 'axios'

var baseUrl = '/qq';
let oneLeve = axios.create({
  baseURL: baseUrl,
})

let requestQQ = (path) => {
  return oneLeve(path).catch((e) => {
    if (e) {
      alert('请求QQ网络错误')
    }
  })
}
//获取首页广告图
export const getBanner = (params = { 
  platform: 'h5',
  uin: 0,
  needNewCode: 1 
  }) => {
return requestQQ(`/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg`) 
}
//获取排行
export const getRankData = (params = { 
platform: 'h5',
uin: 0,
needNewCode: 1 
}) => {
return requestQQ(`/v8/fcg-bin/fcg_myqq_toplist.fcg`)
}


var baseurl = '/kugou';
let twoLeve = axios.create({
  baseURL: baseurl,
})

let requestKugou = (path) => {
  return twoLeve(path).catch((e) => {
    if (e) {
      alert('请求Kugou网络错误')
    }
  })
}

export const getSearch = (value) => {
return requestKugou(`/api/v3/search/song?format=jsonp&keyword=${value}`) 
}


var baseUrL = '/kugo';
let theLeve = axios.create({
  baseURL: baseUrL,
  responseType: 'json',
  transformResponse(data) {
    console.log(888)
    if (!data) return;
    if (typeof data === 'string') data = JSON.parse(data);
    let o = {}
    if (data.list) {
      o.data = data.list;
      o.origin = 'singer'
    } else if (data.banner) {
      o.data = data.data;
      o.banner = data.banner
      o.origin = 'home'
    } else if (data.rank) {
      o.data = data.rank.list;
      o.origin = 'rank'
    } else if (data.plist) {
      o.data = data.plist.list.info;
      o.origin = 'plist'
    } else if (data.singers) {
      o.data = data.singers.list.info;
      o.origin = 'singers-list'
    } else if (data.songs) {
      o.data = data.songs.list;
      o.info = data.info;
      o.origin = 'singers-info'
    }
    return o;
  }
})

let requestKugo = (path) => {
  return theLeve(path).catch((e) => {
    if (e) {
      alert('请求Kugo网络错误')
    }
  })
}
//获取banner和新歌
export const getNewSongs = () => {
  return requestKugo('/?json=true')
}

// 获取排行数据
export const getRankList = () => {
  return requestKugo('/rank/list&json=true')
}
// 获取歌单数据
export const getPlist = () => {
  return requestKugo('/plist/index&json=true')
}

// 获取歌手分类数据
export const getSingers = () => {
  return requestKugo('/singer/class&json=true')
}

// 根据歌手分类id，获取歌手分类歌手

export const getSingerList = (params = { classid: '' }) => {
  return requestKugo(`/singer/list/${params.classid}?json=true`)
}

// 根据歌手id，获取歌手歌曲

export const getSingerInfo = (params = { singerid: '' }) => {
  return requestKugo(`/singer/info/${params.singerid}?json=true`)
}

//根据歌单id，获取歌单信息
export const getPlistInfo = (params = { specialid: '' }) => {
  console.log(312334,params.specialid)
  return requestKugo(`/plist/list/${params.specialid}?json=true`)
}


export default {
  getBanner,
  getRankData,
  getSearch,
  getRankList,
  getPlist,
  getSingers,
  getSingerList,
  getSingerInfo,
  getPlistInfo//歌单id
}


/* 
  export let a = 10;
  export let b = 10;
  export let c = 10;

  exprort default {}

  用解构赋值拿到export暴漏出来的子
  import {a,b,c} from ''

  用来接收文件中暴露的  exprort default 对应的值
  import abc from ''



*/
