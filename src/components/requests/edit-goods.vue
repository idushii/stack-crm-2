<template>
  <div class="row">
    <div class="col s12 center" v-if="load">
      <loader />
    </div>
    <div class="col s12 card" v-if="!load">
      <div class="card-content">
        <table>
          <thead>
            <tr>
              <td class="center">Наименование</td>
              <td class="center" style="width: 20%;">Стоимость</td>
              <td style="width: 20px;">Удалить</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(good, index) in values.goods" :key="index">
              <td>
                <input type="text" v-model="good.title">
              </td>
              <td>
                <input type="text" v-model="good.price">
              </td>
              <td class="center">
                <a @click="values.goods.splice(index, 1)">
                  <i class="material-icons">remove</i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="fixed-action-btn horizontal">
          <a class="btn-floating waves-effect waves-light btn-large blue" @click="values.goods.push({title: '', price: 0})">
            <i class="large material-icons">add</i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '@/components/loader'
export default {
  name: 'edit-goods',
  data() {
    return {

    }
  },
  computed: {
    number() {
      return this.$parent.number;
    },
    values() {
      if (this.number != 'new') {
        let request = this.$root.requests.filter(r => r.Number == this.number).pop()
        if (request) return request;
      }
      return this.$parent.emptyValues
    },
    load() { return this.$parent.load }
  },
  mounted() {
    this.$parent.setHeader()
  },
  methods: {


  }, components: { loader }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>