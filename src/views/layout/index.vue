<template>
  <div class="app-wrapper">
    <side-bar class="sidebar-container"/>
    <div class="main-container">
      <nav-bar class="navbar"/>
      <tags-view/>
      <app-main class="app-content"/>
    </div>
  </div>
</template>

<script>
import SideBar from './sideBar/index'
import NavBar from './navBar'
import TagsView from './tagsView'
import AppMain from './appMain'

export default {
  name: 'layout',
  components: {
    SideBar,
    NavBar,
    TagsView,
    AppMain
  }
}
</script>

<style lang="scss">
.app-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
  position: relative;
  background: #ffffff;
}
.sidebar-container {
  flex: 0 0 260px;
  width: 260px;
  height: 100vh;
  overflow: hidden;
  background: #ddd;
}
.main-container {
  flex: 1;
  width: 100%;
  min-height: 100%;
  .navbar {
    padding: 14px;
    border-bottom: 1px solid #f2f2f2;
  }
  .app-content {
    padding-left: 14px;
  }
}
</style>
