<template>
  <div class="row">
    <div class="col m4">
      <div class="input-field">
        <button class="waves-effect waves-light btn btn-action-report">Отправить на почту</button>
      </div>
      <div class="input-field">
        <button class="waves-effect waves-light btn btn-action-report">Отправить в СМС</button>
      </div>
      <div class="input-field">
        <button class="waves-effect waves-light btn btn-action-report">Печать</button>
      </div>
    </div>
    <div class="col m8">
      <ul>
        <li>gjhsgdfj</li>
      </ul>
      <h4>Сумма: 000</h4>
    </div>
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
    back() { },
    save() { },
    next() { }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn-action-report {
  width: 100%;
}
</style>