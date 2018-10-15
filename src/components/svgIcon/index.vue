<template>
  <svg :class="svgClass">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    name: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName(){
      return `#icon-${this.name}`
    },
    svgClass(){
      return this.iconClass ? `svg-icon ${this.iconClass}`: 'svg-icon'
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
