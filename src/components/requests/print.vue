<template>
  <div id="print">
    <table v-for="(table, index) in scheme" :key="index" :style="{border: table.border}" :cellpadding="table.border != 'none' ? 4 : 0">
      <tr v-for="(line, index_) in table.source" :key="index_">
        <td v-for="(pole, index__) in line" :key="index__" :colspan="pole.cols" :style="{'text-align': pole.align, border: table.border, width: pole.width, height: '18px'}">{{pole.value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'print',
  data() {
    return {
      scheme: []
    }
  },
  computed: {},
  mounted() {
    this.$parent.$emit('update:title', this.$route.params.number)
    this.$root.$refs.App.btnSave =  null
    this.$root.$refs.App.btnPrint = null
    this.$root.$refs.App.btnBack = null
    this.$root.$refs.App.btnEdit = this.edit
    let this_ = this;
    fetch('./static/data/scheme-print.json')
      .then(response => response.json())
      .then(data => {
        this_.scheme = data,
          firebase.database().ref('requests/' + this_.$route.params.number).once('value').then(function (snapshot) {
            let values = snapshot.val()
            for (let keySection in values) {
              for (let key_ur_1 in values[keySection]) {
                if (typeof (values[keySection][key_ur_1]) == 'string') {
                  this_.setValues(`${keySection}.${key_ur_1}`, values[keySection][key_ur_1])
                } else {
                  for (let key_ur_2 in values[keySection][key_ur_1]) {
                    this_.setValues(`${keySection}.${key_ur_1}.${key_ur_2}`, values[keySection][key_ur_1][key_ur_2])
                  }
                }
              }
            }
          })
            .then(e => {
              //w = window.open("http://app.vando.company/tcp_pdf/html.php?html=" + $('#print').html())
              window.location.href = "http://app.vando.company/tcp_pdf/html.php?file=Request " + this.$route.params.number + "&html=" + $('#print').html()
            })
      })
      .catch(alert);
  },
  methods: {
    setValues(name = '', value = '') { // Вычисление значений для схемы, на вход подается название поля и его значение в БД
      for (let table in this.scheme) { // После перебором находит соответвие в схеме и вычисляется формула
        for (let line in this.scheme[table].source) {
          for (let pole in this.scheme[table].source[line]) {
            //console.log(this.scheme[table].source[line][pole].value)
            this.scheme[table].source[line][pole].value = this.scheme[table].source[line][pole].value.replace(`'${name}'`, value)
            if (this.scheme[table].source[line][pole].type == 'formula' && this.scheme[table].source[line][pole].value.indexOf("'") == -1) {
              try {
                this.scheme[table].source[line][pole].value = eval(this.scheme[table].source[line][pole].value) + '';
              } catch (err) { }
            } else {
            }
          }
        }
      }
    },
    edit() {
      this.$router.push({
        name: 'page-edit-request',
        params: { number: this.$route.params.number }
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  /*border: 1px solid black;
  width: 16%;/**/
}

.border {
  border: 1px solid black;
}
</style>