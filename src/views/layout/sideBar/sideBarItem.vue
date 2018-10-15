<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">
    <!-- 只有一个子路由 -->
    <template v-if="hasOneShowChild(item.children,item)&&(!onlyOneChild.children||onlyOneChild.noShowChildren)&&!item.alwaysShow">
      <app-link :to="`${item.path}/${item.children[0].path}`">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
          <Item v-if="onlyOneChild.meta" :title="onlyOneChild.meta.title" :icon="onlyOneChild.meta.icon"/>
        </el-menu-item>
      </app-link>
    </template>
    <!-- 嵌套路由 -->
    <el-submenu v-else ref="submenu" :index="item.name||item.path" :key="item.name">
      <template slot="title">
          <Item v-if="item.meta" :title="item.meta.title" :icon="item.meta.icon"/>
      </template>
      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :is-nest="true"
          :key="child.path"
          class="nest-menu"/>

        <app-link v-else :to="`${item.path}/${child.path}`" :key="child.name">
          <el-menu-item :index="child.path">
            <Item v-if="child.meta" :title="child.meta.title" :icon="child.meta.icon"/>
          </el-menu-item>
        </app-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import AppLink from './link'
import Item from './item'
export default {
  name: 'sidebarItem',
  components: {
    AppLink,Item
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      onlyOneChild: ''
    }
  },
  methods: {
    hasOneShowChild(children, parent) {
      const showChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          this.onlyOneChild = item
          return true
        }
      })
      if (showChildren.length === 1) {
        return true
      }
      if (showChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }
      return false
    },
    // resolvePath(routePath){
    //   if(this.isExternalLink){}
    // }
  }
}
</script>

<style lang="scss">
.menu-wrapper {
  > a {
    color: #ffffff;
  }
}
</style>
