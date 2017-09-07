<template>
  <div class="row">
    <table class="col s12 bordered centered hovered">
      <thead>
        <tr>
          <th>Номер</th>
          <th>Дата создания</th>
          <th>Время выполнения</th>
          <th>Клиент</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(request,index) in requests" :key="index" @click="openRequest(request.Number)">
          <td>{{request.Number}}</td>
          <td>{{request.Dates['Date of issue']}}</td>
          <td>{{request.Dates['Stated implementation date']}} {{request.Dates['Claimed lead time']}}</td>
          <td>{{request.User}}</td>
        </tr>
      </tbody>
    </table>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large waves-effect waves-light blue" @click="openNew">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import input_mat from '@/components/input'
export default {
  name: 'requests-list',
  props: ['title'],
  data() {
    return {
      
    }
  },
  computed: {
    requests: function() {
      return this.$root.requests || []
    }
  },
  mounted() {
    this.$parent.$emit('update:title', 'Заявки')
    this.$root.btns = {}
    let this_ = this;
    console.log(this.$root.requests)
  },
  methods: {
    openRequest(NumberRequest) {
      this.$router.push({ name: 'page-edit-request', params: { number: NumberRequest } })
    },
    openNew() {
      this.$router.push({ name: 'page-edit-request', params: { number: 'new' } })
    }
  },
  components: {
    input_mat
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
table {}
</style>