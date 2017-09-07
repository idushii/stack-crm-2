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
  mounted() { },
  methods: {
    setHeader() { }
  },
  components: {
    tasks
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>