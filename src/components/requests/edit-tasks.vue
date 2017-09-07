<template>
  <div class="row">
    <div class="col s12 center" v-if="load">
      <loader />
    </div>
    <div class="col s4" v-for="(group, index_group) in tasks" :key="index_group" v-if="!load">
      <ul class="collection with-header">
        <li class="collection-header" :class="{load}">
          <h5>{{group.title}}</h5>
        </li>
        <li v-for="(item, index) in group.list" :key="index" @click="selectItem(group, item)" class="collection-item" :class="{'green lighten-4': item.select, load}">
          <i class="material-icons tiny">{{item.select ? 'check' : 'check_box_outline_blank'}}</i>&nbsp;&nbsp;&nbsp;{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import loader from '@/components/loader'
export default {
  name: 'edit-tasks',
  data() {
    return {}
  },
  computed: {
    tasks() {
      return this.$parent.tasks
    },
    values() {
      return this.$parent.values
    },
    load() {
      if (this.values) {
        if (!this.values.Tasks) this.values.Tasks = []
        return false
      }
      return true
      }
  },
  mounted() { this.$parent.setHeader() },
  methods: {
    selectItem(group, item) {
      if (this.load) return;
      item.select = !item.select
      if (item.select) {
        if (!this.values.Tasks) this.values.Tasks = []
        let valuesGroupTasks = this.values.Tasks.filter(g => g.title == group.title).pop()
        if (valuesGroupTasks == undefined) {
          let index = this.values.Tasks.push({title: group.title, list: []})
          valuesGroupTasks = this.values.Tasks[this.values.Tasks.length - 1]
        }
        valuesGroupTasks.list.push(item)
      } else {
        let valuesGroupTasks = this.values.Tasks.filter(g => g.title == group.title).pop()
        if (valuesGroupTasks) {
          for(let key in valuesGroupTasks.list) {
            if (valuesGroupTasks.list[key].title == item.title)
              valuesGroupTasks.list.splice(key, 1)
          }
        }
      }
    }
  },
  components: {
    loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li.collection-item {
  cursor: pointer;
}

li.load {
  background-color: #e0e0e0 !important;
}
</style>