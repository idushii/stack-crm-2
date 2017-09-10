<template>
  <div>
    <tasks />
  </div>
</template>

<script>
import tasks from '@/components/requests/edit-tasks'
export default {
  name: 'edit',
  data() {
    return {}
  },
  computed: {
    number() {
      return this.$route.params.number;
    },
    tasks() {
      return [{
        title: 'Группа задач 1',
        list: [
          {
            title: 'Задача 1 1',
            price: '100',
            select: false
          },
          {
            title: 'Задача 1 2',
            price: '120',
            select: false
          },
          {
            title: 'Задача 1 3',
            price: '140',
            select: false
          }
        ]
      }, {
        title: 'Группа задач 2',
        list: [
          {
            title: 'Задача 2 1',
            price: '100',
            select: false
          },
          {
            title: 'Задача 2 2',
            price: '120',
            select: false
          },
          {
            title: 'Задача 2 3',
            price: '140',
            select: false
          }
        ]
      }]
    },
    values() {
      if (this.number != 'new') {
        let request = this.$root.requests.filter(r => r.Number == this.number).pop()
        if (request) return request;
      }
      return this.$parent.emptyValues
    }
  },
  mounted() {
    this.$root.$emit('update:title', this.number == 'new' ? 'Новая' : `# ${this.number}`)
    this.$root.btns = {
      btnRequest: { click: this.openFormRequest, text: 'Заявка' },
      btnSend: { click: this.next, icon: 'send' }
    }

  },
  methods: {
    setHeader() { },
    openFormRequest() {
      this.$router.push({
        name: 'page-edit-request',
        params: { number: this.$route.params.number }
      })

    },
    next() {
      this.$router.push({
        name: 'page-edit-payment',
        params: { number: this.$route.params.number }
      })

    }
  },
  components: {
    tasks
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>