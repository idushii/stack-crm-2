<template>
  <div class="row" id="form-request">
    <div class="col s12 center" v-if="load">
      <loader />
    </div>
    <div class="card" v-if="!load">
      <div class="card-content row">
        <div class="col s12 row">
          <div class="input-field col s6">
            <input type="text" class="datepicker" v-model="values.Dates['Date of issue']" id="valuesCustomerDateofissue">
            <label for="valuesCustomerDateofissue">Дата оформления</label>
          </div>
          <div class="input-field col s6">
            <input type="text" class="timepicker" v-model="values.Dates['Clearance time']" onchange="window.request_edit_forms_values['Dates']['Clearance time'] = this.value" id="valuesCustomerClearancetime">
            <label for="valuesCustomerClearancetime">Время оформления</label>
          </div>
          <div class="input-field col s6">
            <input type="text" class="datepicker" v-model="values.Dates['Stated implementation date']" id="valuesCustomerStatedimplementationdate">
            <label for="valuesCustomerStatedimplementationdate">Заявленная дата выполнения</label>
          </div>
          <div class="input-field col s6">
            <input type="text" class="timepicker" v-model="values.Dates['Claimed lead time']" onchange="window.request_edit_forms_values['Dates']['Claimed lead time'] = this.value" id="valuesCustomerClaimedleadtime">
            <label for="valuesCustomerClaimedleadtime">Заявленное время выполнения</label>
          </div>
          <div class="input-field col s6">
            <input type="text" v-model="values.Customer.FIO" id="valuesCustomerFIO">
            <label for="valuesCustomerFIO">ФИО клиента</label>
          </div>
          <div class="input-field col s6">
            <input type="text" v-model="values.Customer.Adress" id="values.Customer.Adress">
            <label for="values.Customer.Adress">Адрес</label>
          </div>
        </div>
        <div class="col s4 row">
          <div class="input-field col s12">
            <input type="text" v-model="values.Customer.Phone" id="values.Customer.Phone">
            <label for="values.Customer.Phone">Телефон</label>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="values.Customer.Telegram" id="values.Customer.Telegram">
            <label for="values.Customer.Telegram">Telegram</label>
          </div>
          <div class="input-field col s12">
            <input type="text" v-model="values.User" id="valuesUser">
            <label for="valuesUser">Мастер</label>
          </div>
        </div>
        <div class="col s8 row">
          <div class="input-field">
            <textarea id="valuesDescription" class="materialize-textarea" v-model="values.Description"></textarea>
            <label for="valuesDescription">Описание</label>
          </div>
          <ul class="collection with-header" v-for="(group, index_group) in values.Tasks" :key="index_group" v-if="group.list.length">
            <li class="collection-header center">
              <h5>{{group.title}}</h5>
            </li>
            <li v-for="(task, index) in group.list" :key="index" class="collection-item">
              <b>{{task.title}},</b>
              <i>{{task.price}}</i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loader from '@/components/loader'
import input_mat from '@/components/input'
import input_box from '@/components/input-box'
window.request_edit_forms_values = {}
export default {
  name: 'requests-edit',
  props: ['title'],
  data() {
    return {
      lists: {
        Users: [
          'Иван',
          'Петр',
          'Федя'
        ],
        Customers: [
          { FIO: 'Иван', Phone: '111', Telegram: '33322', Adress: 'аа' },
          { FIO: 'Ваня', Phone: '222', Telegram: '34534', Adress: 'бб' },
          { FIO: 'Федя', Phone: '333', Telegram: '53545', Adress: 'вв' },
          { FIO: 'Женя', Phone: '444', Telegram: 'sdfgs', Adress: 'гг' },
        ]
      },
      selectForm: 'request'
    }
  },
  computed: {
    number() {
      return this.$route.params.number;
    },
    values() {
      return this.$parent.values
    },
    load() { return this.$parent.load }
  },
  mounted() {
    let this_ = this;
    request_edit_forms_values = this.values;
    this.$parent.setHeader()
    $('#valuesCustomerDateofissue').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
      onSet(val) {
        this_.values.Dates['Date of issue'] = valuesCustomerDateofissue.value
      }
    });
    $('#valuesCustomerStatedimplementationdate').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Today',
      clear: 'Clear',
      close: 'Ok',
      closeOnSelect: true, // Close upon selecting a date,
      onSet(val) {
        this_.values.Dates['Stated implementation date'] = valuesCustomerStatedimplementationdate.value
      }
    });

    $('.timepicker').pickatime({
      default: 'now', // Set default time: 'now', '1:30AM', '16:30'
      fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
      twelvehour: true, // Use AM/PM or 24-hour format
      donetext: 'OK', // text for done-button
      cleartext: 'Clear', // text for clear-button
      canceltext: 'Cancel', // Text for cancel-button
      autoclose: true, // automatic close timepicker
      ampmclickable: true, // make AM PM clickable
      aftershow: function() { } //Function for after opening timepicker
    });
    $(document).ready(function() {
      let list = {}
      for (let key in this_.lists.Users) list[this_.lists.Users[key]] = null;
      $('#valuesUser').autocomplete({
        data: list,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function(val) {
          this_.values.User = val
        },
        minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
      });

      list = {}
      for (let key in this_.lists.Customers) list[this_.lists.Customers[key].FIO] = null;

      $('#valuesCustomerFIO').autocomplete({
        data: list,
        limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function(val) {
          this_.values.Customer.FIO = val
          let Customer = this_.lists.Customers.filter(c => c.FIO == val).pop()
          if (Customer) {
            this_.values.Customer.Phone = Customer.Phone
            this_.values.Customer.Adress = Customer.Adress
            this_.values.Customer.Telegram = Customer.Telegram
          }
          setTimeout(function() { Materialize.updateTextFields(); }, 100)
        },
        minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
      });

      $('#valuesDescription').trigger('autoresize');
      Materialize.updateTextFields();
    });
  },
  methods: {
  },
  components: {
    input_mat,
    input_box,
    loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-content.row {
  margin-bottom: 0px;
}

.card .card-content .card-title {
  margin-bottom: 15px;
}

.item-add {
  cursor: pointer;
}

a.secondary-content,
td a {
  cursor: pointer;
}

td input[type=text] {
  margin: 0px;
}

td {
  padding: 5px;
}
</style>
<style>
#form-request ul.autocomplete-content.dropdown-content {
  position: absolute;
}
</style>