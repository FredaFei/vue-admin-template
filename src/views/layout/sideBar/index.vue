<template>
  <el-scrollbar>
    <el-menu :show-timeout="200"
    :default-active="$route.path"
    :collapse="isCollapse"
    mode="vertical"
    background-color="#304156"
    active-text-color="#409eff"
    text-color="#bfcbd9">
      <sidebar-item v-for="route in permissionRouters" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sideBarItem'
export default {
  name: 'sideBar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permissionRouters'
    ]),
    isCollapse() {
      // todo
      return false
    }
  },
  mounted() {
    console.log(this.permissionRouters)
  },
}
</script>

<style lang="scss">
</style>
