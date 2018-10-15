<template>
  <div class="tags-view-container">
    <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container tags-view-wrapper"
    @wheel.native.prevent="handleScroll">
      <router-link v-for="tag in visitedViews"
      ref="tag"
      :to="tag.fullPath"
      :key="tag.path"
      tag="span"
      class="tags-view-item"
      :class="isActive(tag)?'active':''"
      @click.middle.native="closeSelectedTag(tag)"
      @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </el-scrollbar>
  </div>
</template>

<script>
const PADDING = 15
export default {
  name: 'tagsView',
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  mounted() {
    this.addViewTags()
  },
  watch: {
    '$route'() {
      this.addViewTags()
      this.moveToCurrentTag()
    }
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    addViewTags() {
      const { name } = this.$route
      name && this.$store.dispatch('addVisitedView', this.$route)
    },
    closeSelectedTag(tag) {
      this.$store.dispatch('delVisitedView', tag).then((visitedViews) => {
        /**
         * 若删除的路由是当前选中的路由，则取路由表里的最后一个，若存在则为当前路由，否则为首页路由
        */
        if (this.isActive(tag)) {
          const lastView = visitedViews.slice(-1)[0] //最后一个
          if (lastView) {
            this.$router.push(lastView)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    openMenu(tag, e) {
      this.visible = true
      this.selectedTag = tag
      const offsetLeft = this.$el.getBoundingClientRect().left
      this.left = e.clientX - offsetLeft + 15
      this.top = e.clientY
    },
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    moveToTarget($target) {
      const $container = this.$refs.scrollContainer.$el
      const $containerWidth = $container.offsetWidth
      const $scrollWrapper = this.$refs.scrollContainer.$refs.wrap
      const $targetLeft = $target.offsetLeft
      const $targetWidth = $target.offsetWidth
      if ($targetLeft > $containerWidth) {
        // tag in the right
        $scrollWrapper.scrollLeft = $targetLeft - $containerWidth + $targetWidth + padding
      } else {
        // tag in the left
        $scrollWrapper.scrollLeft = $targetLeft - padding
      }
    },
  }
}
</script>

<style lang="scss">
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 100;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
