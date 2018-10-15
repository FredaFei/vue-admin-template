<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index) in routes" :key="item.path" v-if="item.meta.title">
      <span v-if="item.redirect==='noredirect'||index==routes.length-1">{{item.meta.title}}</span>
      <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
export default {
  name: 'breadCrumb',
  computed: {
    routes() {
      let { params } = this.$route
      let matchArr = this.$route.matched.filter(item => {
        if (item.name) {
          let toPath = pathToRegexp.compile(item.path)
          item.path = toPath(params)
          return true
        }
      })
      let first = matchArr[0]
      if (first && first.name.trim().toLocaleLowerCase() !== 'Home'.toLocaleLowerCase()) { // 保留首页导航
        matchArr = [{ path: '/home', meta: { title: 'home' } }].concat(matchArr)
      }
      return matchArr
    },
  },
}
</script>

<style>

</style>
