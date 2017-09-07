<template>
  <div>
    <a class="waves-effect waves-light btn" @click="goToAuth">Авторизация</a>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {}
  },
  computed: {},
  mounted() {
    console.log('page login')
    console.log(this.$route.query)
  },
  methods: {
    goToAuth() {
      this.$root.login = '1'
      this.$router.push({
        path: '/requests'
      })//*/
    }, 
    db() {
      console.log(this.$root.token)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>