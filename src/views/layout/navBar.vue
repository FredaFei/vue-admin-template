<template>
  <nav class="navbar-content clearfix">
    <!-- menu -->
    <div class="menu" @click="toggleMenu">菜栏</div>
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <bread-crumb/>
    </div>
    <!-- 个人中心 -->
    <el-dropdown class="dropdown">
      <span class="el-dropdown-link">
        个人设置<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/">
          <el-dropdown-item>Home</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">LogOut</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </nav>
</template>

<script>
import BreadCrumb from '@/components/breadCrumb/index'
export default {
  name: 'navBar',
  data() {
    return {
      routeList: ''
    }
  },
  components: {
    BreadCrumb
  },
  methods: {
    toggleMenu() { },
    logout() {
      this.$store.dispatch('logOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss">
.breadcrumb,
.menu {
  display: inline-block;
}
.breadcrumb {
}
.dropdown {
  float: right;
}
</style>
