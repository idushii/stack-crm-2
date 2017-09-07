<template>
  <div id="map">
  </div>
</template>

<script>
export default {
  name: 'view',
  data() {
    return {
    }
  },
  computed: {},
  mounted() {
    this.$root.$emit('update:title', this.number == 'new' ? 'Новая' : `# ${this.number}`)
    this.$root.btns = {
      btnRequest: { click: this.openFormRequest, text: 'Заявка' },
      btnSend: { click: this.next, icon: 'send' }
    }

    setTimeout(function() {
      window.map.style.height = document.body.clientHeight - 105 + 'px'
      var uluru = { lat: -25.363, lng: 131.044 };
      var map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
      });
      var marker = new window.google.maps.Marker({
        position: uluru,
        map: map
      });
    }, 1000)

  },
  methods: {
    openFormRequest() {
      this.$router.push({
        name: 'page-edit-request',
        params: { number: this.$route.params.number }
      })
    },
    next() {
      this.$router.push({
        name: 'page-edit-confirm',
        params: { number: this.$route.params.number }
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>