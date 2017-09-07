<template>
  <div>
    <input type="text" v-if="dataComp.type == 'input'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <input type="number" v-if="dataComp.type == 'number'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <input type="date" class="datepicker" placeholder="" v-if="dataComp.type == 'data'" :id="id" :data-value="dataValue" :disabled="dataComp.disabled || disabled">
    <input type="text" class="autocomplete" v-if="dataComp.type == 'autocomplete'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <textarea class="materialize-textarea"  v-if="dataComp.type == 'description'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled"></textarea>
    
    <div class="switch" v-if="dataComp.type == 'switch'"><label>Off<input type="checkbox"><span class="lever"></span>On</label></div>
    <input type="checkbox" v-if="dataComp.type == 'checkbox'" v-model="dataValue" :id="id" :disabled="dataComp.disabled || disabled">

    <label :for="id" v-if="dataComp.type!='switch'">{{dataComp.label}}</label>
  </div>
</template>
<script>
  export default {
    name: 'input-mat-box',
    props: ['num', 'data', 'value', 'selector', 'disabled'], //'type', 'disabled', 'value', 'label', 'placeholder', 'selector'
    computed: {
      selector_() {
        let str = '';
        if (this.data) {
          if (this.data.selector) str += this.data.selector;
          if (this.selector)
            if (str) str += ' ' + this.selector
            else str = this.selector;

          return str ? str.split(' ') : ''
        } else return ''
      },
      id() {
        return 'input_' + (this.num ? this.num : Math.round(Math.random() * 100000))
      },
      dataComp() {
        return {
          type: 'input' || this.data.type,
          disabled: false || this.data.disabled,
          value: '' || this.data.value,
          label: '' || this.data.label,
          placeholder: '' || this.data.placeholder,
          selector: '' || this.data.selector,
          hide: false || this.data.hide
        }
      },
      dataValue: {
        get() {
          return this.value ? this.value : this.data.value
        },
        set(value) {
          this.data.value = value
          this.$emit('update:value', value)
        }
      }
    },
    mounted() {
      //console.log(this.data.type)
      window.this_ = this;
      let this_ = this;
      if (this.data.type == 'description') {
        $(`#${this.id}`).trigger('autoresize');
      }

      if (this.data.type == 'data') {
        $(`#${this.id}`).pickadate({
          selectMonths: true, // Creates a dropdown to control month
          selectYears: 15, // Creates a dropdown of 15 years to control year,
          today: 'Сегодня',
          clear: 'Сброс',
          close: 'Принять',
          closeOnSelect: true, // Close upon selecting a date,
          format: 'dd/mm/yyyy',
          onSet(val) {
            this_.dataValue = $(`#${this_.id}`).val()
          }
        });
      }

      setTimeout(function() {
        if (this_.data.type == 'autocomplete') {
          $(`#${this_.id}`).autocomplete({
            data: this_.data.list,
            limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
              this_.dataValue = val
            },
            minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
          });
        } //*/
        $(`#${this_.id}+ul`).css({
          'margin': 0,
          width: $(`#${this_.id}`).width()
        })
      }, 100)

      $(document).ready(function() {
        Materialize.updateTextFields();
      })

    }
  }
</script>
<style scoped>
  .switch {
    min-height: 63px;
  }
  
  input {
    margin: 0px !important;
  }
  /*.autocomplete-content {
    margin-top: 0px;
  }//*/
</style>
<style>
  ul.autocomplete-content {
    position: absolute;
    width: 100%;
  }
</style>