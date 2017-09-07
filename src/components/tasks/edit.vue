<template>
  <div>
    <div class="row" v-if="loader">
      <div class="col s12 center-align">
          <loader />
      </div>
    </div>
    <ul class="collection with-header" v-else>
      <li class="collection-header">
        <h4>{{task.title}}
          <a class="secondary-content" :class="{disabled}" @click="editTitle">
            <i class="material-icons">edit</i>
          </a>
        </h4>
      </li>
      <li class="collection-item" v-for="(taskItem, index) in task.list" :key="index">
        <div>{{taskItem.title}}, {{taskItem.price}}&#8381;
          <a class="secondary-content" :class="{disabled}" @click="editTask(index)">
            <i class="material-icons">edit</i>
          </a>
        </div>
      </li>
    </ul>
    <div class="fixed-action-btn" v-if="!loader">
      <a class="btn-floating btn-large green waves-effect waves-light" :class="{disabled}" @click="add_task">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
const УспешноеСохранение = 'Успешное сохранение'
import loader from '@/components/loader'
export default {
  name: 'edit',
  data() {
    return {
      emptyList: {
        title: ``, list: []
      },
      disabled: false
    }
  },
  computed: {
    number() {
      return this.$route.params.number
    },
    loader() {
      return this.task == this.emptyList
    },
    task() {
      return this.$root.tasks.filter((t, index) => index == this.number).pop() || this.emptyList
    },
  },
  mounted() {
    this.$root.btns = {
      btnSave: { click: this.save, icon: 'save' },
    }
  },
  methods: {
    save() {
      let this_ = this;
      this.disabled = true
      let task = {...this.task}
      delete task['.key']
      this.$root.$firebaseRefs.tasks.child(this.number).set(task)
      .then(function() {
        Materialize.toast(УспешноеСохранение, 1000)
        this_.$router.push({
          name: 'page-list-tasks'
        })
      })
      
    },
    add_task() {
      this.task.list.push({ title: `Задача #${this.task.list.length}`, select: false, price: 0 })
      if (!this.editTask(this.task.list.length - 1)) {
        this.task.list.splice(this.task.list.length - 1, 1)
      }
    },
    editTask(num) {
      if (this.disabled) return;
      let task = this.task.list[num]
      let title = window.prompt('Заголовок?', task.title)
      if (title) {
        task.title = title;
        let price = window.prompt('Цена?', task.price)
        if (price)
          task.price = price
          return true
      }//*/
      return false
    },
    editTitle() {
      if (this.disabled) return;
      let title = window.prompt('Заголовок?', this.task.title)
      if (title) {
        this.task.title = title;
      }
    }
  }, 
  components: {loader}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  i.material-icons {cursor: pointer;}
  .secondary-content.disabled i {color: grey; cursor: default;}
</style>