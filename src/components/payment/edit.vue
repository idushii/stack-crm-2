<template>
  <div>
    Payment
    </div>
</template>

<script>
export default {
  name: 'edit',
  data() {
    return {}
  },
  computed: {
    request() {
      return this.$root.request
    }
  },
  mounted() {
    this.$root.btns = {
      btnBack: { click: this.back, icon: 'chevron_left' },
      btnSave: { click: this.save, icon: 'save' },
      btnSend: { click: this.next, icon: 'check' }
    }
  },
  methods: {
    back() {},
    save() {},
    next() {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>