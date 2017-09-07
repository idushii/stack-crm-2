<template>
  <div class="row">
    <div class="col s12 center-align" v-if="loader">
      <loader class="" />
    </div>
    <div class="col l4 m6 s12" v-else v-for="(taks_list, index) in tasks" :key="index">
      <ul class="collection with-header">
        <li class="collection-header">
          <h4>{{taks_list.title}}
            <a class="secondary-content" @click="openEditList(index)">
              <i class="material-icons">edit</i>
            </a>
          </h4>
        </li>
        <li class="collection-item item-task" v-for="(task, indexTask) in taks_list.list" :key="indexTask">
          <span>{{task.title}}</span>,
          <span>{{task.price}}</span>&#8381;
        </li>
      </ul>

    </div>
    <div class="fixed-action-btn">
      <a class="btn-floating btn-large green waves-effect waves-light" @click="add_tasks_list">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script>
import loader from '@/components/loader'
export default {
  name: 'list',
  data() {
    return {}
  },
  computed: {
    loader() {
      return this.tasks == undefined
    },
    tasks() {
      return this.$root.tasks
    }
  },
  mounted() {
    this.$root.btns = {
      btnSave: { click: this.$root.openFormRequest, text: 'Заявки' },
    }
  },
  methods: {
    add_tasks_list() {
      this.tasks.push({
        title: `Группа ${this.tasks.length}`,
        list: []
      })
      this.openEditList(this.tasks.length - 1)
    },
    openEditList(numberTask = 0) {
      this.$router.push({
        name: 'page-edit-list-tasks',
        params: { number: numberTask }
      })
    }
  },
  components: { loader }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.secondary-content {
  cursor: pointer;
}
</style>