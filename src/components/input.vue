<template>
  <div class="input-field" :class="selector_" v-if="!dataComp.hide">
    <p v-if="dataComp.type == 'label'" :id="id" class="input_label">{{dataValue}}</p>
    <input type="text" v-if="dataComp.type == 'input'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <input type="number" v-if="dataComp.type == 'number'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <input type="date" class="datepicker" :placeholder="dataComp.placeholder" v-if="dataComp.type == 'data'" :id="id" :data-value="dataValue" v-model="dataValue" :disabled="dataComp.disabled || disabled">
    <input type="text" class="autocomplete" v-if="dataComp.type == 'autocomplete'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled">
    <textarea class="materialize-textarea" v-if="dataComp.type == 'description'" v-model="dataValue" :id="id" :placeholder="dataComp.placeholder" :disabled="dataComp.disabled || disabled"></textarea>
  
    <div class="switch" v-if="dataComp.type == 'switch'">
      <label>Off
        <input type="checkbox">
        <span class="lever"></span>On</label>
    </div>
    <input type="checkbox" v-if="dataComp.type == 'checkbox'" v-model="dataValue" :id="id" :disabled="dataComp.disabled || disabled">
  
    <label :for="id" v-if="dataComp.type!='switch'">{{dataComp.label}}</label>
  </div>
</template>
<script>
export default {
  name: 'input-mat',
  props: ['num', 'data', 'value', 'selector', 'disabled', 'list', 'keys'], //'type', 'disabled', 'value', 'label', 'placeholder', 'selector'
  watch: {
    value: function (newVal) {
      //console.log(newVal)
    }
  },
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
    list_compiled() {
      if (this.data.list && Object.keys(this.data.list).length !== 0) {
        return this.data.list
      }
      if (this.list) {
        if (this.list.length) {
          let list = {}
          for (let key in this.list) {
            list[this.list[key]] = null
          }
          return list
        } else {
          return this.list
        }
      }
      return {}
    },
    dataComp() {
      return {
        type: this.data.type || 'input',
        disabled: false || this.data.disabled,
        value: this.data.value || '',
        label: '' || this.data.label,
        placeholder: '' || this.data.placeholder,
        selector: '' || this.data.selector,
        hide: false || this.data.hide,
        list: this.list_compiled
      }
    },
    dataValue: {
      get() {
        if (this.value != undefined) {
          return this.value;
        }
        if (this.data.value != undefined) {
          return this.data.value;
        }
        return undefined;
      },
      set(value) {
        //this.data.value = value
        this.$emit('update:value', value)
        this.$emit('update:input', {
          value,
          keys: this.keys
        })
      }
    }
  },
  mounted() {
    window.this_ = this;
    let this_ = this;
    if (this.data.type == 'description') {
      $(`#${this.id}`).trigger('autoresize');
    }

    if (this.dataComp.type == 'data') {
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

    if (this.dataComp.type == 'label') {
      $(`#${this.id}`).css('margin-top', 15)
    }

    setTimeout(function () {
      if (this_.dataComp.type == 'autocomplete') {
        $(`#${this_.id}`).autocomplete({
          data: this_.dataComp.list,
          limit: 20, // The max amount of results that can be shown at once. Default: Infinity.
          onAutocomplete: function (val) {
            this_.dataValue = val
          },
          minLength: 0, // The minimum length of the input for the autocomplete to start. Default: 1.
        });
      } //*/
    }, 100)

    $(document).ready(function () {
      Materialize.updateTextFields();
    })

  }
}
</script>
<style scoped>
.switch {
  min-height: 63px;
}

input:not([type]):disabled, input:not([type])[readonly="readonly"], input[type=text]:not(.browser-default):disabled, input[type=text]:not(.browser-default)[readonly="readonly"], input[type=password]:not(.browser-default):disabled, input[type=password]:not(.browser-default)[readonly="readonly"], input[type=email]:not(.browser-default):disabled, input[type=email]:not(.browser-default)[readonly="readonly"], input[type=url]:not(.browser-default):disabled, input[type=url]:not(.browser-default)[readonly="readonly"], input[type=time]:not(.browser-default):disabled, input[type=time]:not(.browser-default)[readonly="readonly"], input[type=date]:not(.browser-default):disabled, input[type=date]:not(.browser-default)[readonly="readonly"], input[type=datetime]:not(.browser-default):disabled, input[type=datetime]:not(.browser-default)[readonly="readonly"], input[type=datetime-local]:not(.browser-default):disabled, input[type=datetime-local]:not(.browser-default)[readonly="readonly"], input[type=tel]:not(.browser-default):disabled, input[type=tel]:not(.browser-default)[readonly="readonly"], input[type=number]:not(.browser-default):disabled, input[type=number]:not(.browser-default)[readonly="readonly"], input[type=search]:not(.browser-default):disabled, input[type=search]:not(.browser-default)[readonly="readonly"], textarea.materialize-textarea:disabled, textarea.materialize-textarea[readonly="readonly"] {
  color: rgba(0, 0, 0, 0.7);
}
</style>
<style>
ul.autocomplete-content {
  position: absolute;
  width: 100%;
}
</style>