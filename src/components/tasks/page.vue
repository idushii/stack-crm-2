<template>
  <div>
    <router-view />
  </div>
</template>

<script>
const УспешноеСохранение = 'Успешное сохранение'

  export default {
    name: 'page',
    data() {
      return {}
    },
    computed: {
      tasks() {
        return this.$root.tasks
      }
    },
    mounted() {},
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>