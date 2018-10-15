<template>
  <div>
    <h1>personal {{roles}}</h1>
    <el-radio-group v-model="switchRoles">
      <el-radio-button label="editor"/>
      <el-radio-button label="admin"/>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  name: 'personal',
  computed: {
    roles() {
      return this.$store.getters.roles
    },
    switchRoles: {
      get() {
        return this.roles[0]
      },
      set(val) {
        this.$store.dispatch('changeRoles', val).then(() => {
          this.$router.push({ path: '/permission/index?' + +new Date() })
        })
      }
    }
  }
}
</script>

<style lang="scss">
</style>
