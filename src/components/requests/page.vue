<template>
  <router-view>
  </router-view>
</template>

<script>
import loader from '@/components/loader'
const УпешноеСохранение = 'Упешное сохранение'
export default {
  name: 'requests-page',
  data() {
    return {
      emptyValues: {
        Customer: {
          FIO: '',
          Phone: '',
          Telegram: '',
          Adress: ''
        },
        Dates: {
          'Date of issue': '',                // дата оформления
          'Clearance time': '',               // время оформления
          'Stated implementation date': '',   // заявленная дата выполнения
          'Claimed lead time': '',            // заявленное время выполнения
          'Date of arrival': '',              // дата приезда
          'Time of arrival': '',              // время приезда
          'date of completion': '',           // дата выполнения
          'lead time': '',                    // время выполнения
        },
        User: '',
        Tasks: [],
        Description: 'Описание из формы или просто какой-то текст с описанием.',
        goods: [{ title: '', price: 0 }, { title: '', price: 0 }, { title: '', price: 0 }]
      },
      tasks: [{
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
      }
      ]
    }
  },
  computed: {
    number() {
      return this.$route.params.number;
    },
    key() {
      if (this.number != 'new') {
        return this.values['.key']
      }
      return null
    },
    values() {
      if (this.number != 'new') {
        let request = this.$root.requests.filter(r => r.Number == this.number).pop()
        if (request) return request;
      }
      return this.$parent.emptyValues
    },
    load() {
      setTimeout(function() {
        if (Materialize.updateTextFields) Materialize.updateTextFields()
      }, 100)
      return !this.values
    }
  },
  mounted() {
  },
  methods: {
    setHeader() {
      this.$emit('update:title', this.number == 'new' ? 'Новая' : `# ${this.number}`)
      this.$root.btns = {
        btnRequest: { click: this.openFormRequest, text: 'Заявка' },
        btnGoods: { click: this.openFormGoods, text: 'Товары' },
        btnTasks: { click: this.openFormTasks, text: 'Задачи' },
        btnSave: { click: this.save, icon: 'save' },
        btnSend: { click: this.next, icon: 'send' }
      }

      switch (this.$route.name) {
        case 'page-edit-request':
          this.setActiveBtn('Заявка')
          break;
        case 'page-edit-goods':
          this.setActiveBtn('Товары')
          break;
        case 'page-edit-tasks':
          this.setActiveBtn('Задачи')
          break;
        case 'page-list-requests':
          break;
      }
    },
    save() {
      let this_ = this;
      let values = { ...this.values}
      delete values['.key']
      this.$root.$firebaseRefs.requests.child(this.key).set(values)
      .then(function() {
        this_.$router.push({
          name: 'page-list-requests'
        })
        Materialize.toast(УпешноеСохранение, 1000)
      }).catch(function(e) {
        Materialize.toast(e)
      })
    },
    next() {
      let this_ = this;
      let values = { ...this.values}
      delete values['.key']
      this.$root.$firebaseRefs.requests.child(this.key).set(values)
      .then(function() {
        this_.$router.push({
          name: 'page-view-drive',
          params: {number: this_.number}
        })
        Materialize.toast(УпешноеСохранение, 1000)
      }).catch(function(e) {
        Materialize.toast(e)
      })
    },
    openFormRequest() {
      this.$router.push({
        name: 'page-edit-request',
        params: { number: this.number }
      })
      this.setActiveBtn('Заявка')
    },
    openFormGoods() {
      this.$router.push({
        name: 'page-edit-goods',
        params: { number: this.number }
      })
      this.setActiveBtn('Товары')
    },
    openFormTasks() {
      this.$router.push({
        name: 'page-edit-tasks',
        params: { number: this.number }
      })
      this.setActiveBtn('Задачи')
    },
    setActiveBtn(text) {
      for (let key in this.$root.btns) {
        let btn = this.$root.btns[key]
        if (btn.text == text)
          btn.active = true
        else
          btn.active = false
      }
    }
  },
  components: {
    loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>