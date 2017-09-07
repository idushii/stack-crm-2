<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper teal">
        <a href="#" class="brand-logo" :class="positionTitle">{{title}}</a>
        <ul id="nav-mobile" class="left">
          <li v-if="links.length"><a data-activates="slide-out" class="button-collapse"><i class="material-icons">menu</i></a></li>
        </ul>
        <ul id="nav-actions" class="right">
          <li v-for="(btn, index) in btns" :key="index" :class="{active: btn.active}"><a class="" @click="btn.click"><i class="large material-icons" v-if="btn.icon">{{btn.icon}}</i><span v-else>{{btn.text}}</span></a></li>
          <li><a class="" @click="btnPrint" v-if="btnPrint"><i class="large material-icons">print</i></a></li>
          <li><a class="" @click="btnSave" v-if="btnSave"><i class="large material-icons">save</i></a></li>
          <li><a class="" @click="btnEdit" v-if="btnEdit"><i class="large material-icons">edit</i></a></li>
          <li><a class="" @click="btnBack" v-if="btnBack"><i class="large material-icons">keyboard_arrow_up</i></a></li>
          <li><a class="" @click="btnNext" v-if="btnNext"><i class="large material-icons">navigate_next</i></a></li>
        </ul>
        <ul id="nav-mobile" class="left hide-on-med-and-down">
          <li v-for="(link, index) in links" :key="index"><router-link  :to="{name: link.name}">{{link.label}}</router-link></li>
        </ul>
      </div>
    </nav>
    <ul id="slide-out" class="side-nav">
      <li><div class="divider"></div></li>
      <li v-for="(link, index) in links" :key="index"><router-link  :to="{name: link.name}">{{link.label}}</router-link></li>
    </ul>
    <transition name="showHide">
      <div class="row page-conteiner">
        <router-view :title.sync="title" class="col s12 l8 offset-l2 page"></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        title: 'Счета 2.0',
        positionTitle: 'left',
        transitionName: '',
        isEdit: true,
        btnSave: null,
        btnPrint: null,
        btnBack: null,
        btnNext: null,
        btnEdit: null
      }
    },
    computed: {
      login() { return this.$root.login },
      token() { return this.$root.token },
      links() {
        let links = []
        links.push({name: 'page-list-requests', label: 'Заявки'})
        links.push({name: 'list-offers', label: 'Предложения'})
        links.push({name: 'page-list-order', label: 'Счета'})
        return [];
      },
      btns: function() {
        return this.$root.btns;
      }
    },
    watch: {
      '$route' (to, from) {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
          //this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
          //this.transitionName = 'showHide'
      },
      'title' (to, from) {
        window.document.title = to
      }
    },
    methods: {
      openSideNav() {
        $(".button-collapse").sideNav('show');
      }
    },
    mounted() {
      $(document).ready(function() {
        $(".button-collapse").sideNav({
          menuWidth: 300, // Default is 300
          edge: 'left', // Choose the horizontal origin
          closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
          draggable: true, // Choose whether you can drag to open on touch screens,
          onOpen: function(el) {
            /* Do Stuff* / }, // A function to be called when sideNav is opened
                 onClose: function(el) { /* Do Stuff*/
          }, // A function to be called when sideNav is closed
          onClose: function() {}
        });
      })
    },
    updated() {
      //console.log(this.$route.name)
      switch (this.$route.name) {
        case 'page-view-order':
          break;
        case 'page-edit-order':
          break;
        case 'offer-new-edit':
          break;
        case 'offer-new-edit-windows':
          break;
        case 'page-view-request':
          break;
        case 'page-edit-request':
          break;
        case 'page-print-request':
          break;
        default:
          this.btnSave = null;
          this.btnPrint = null;
          this.btnBack = null;
          this.btnNext = null;
          this.btnEdit = null;
          break;
      }
    }
  }
</script>

<style>
  body,
  html {
    margin: 0;
    height: 100%;
  }
  
  #app {
    min-height: 100%;
    background-color: #e3f2fd;
  }
  
.brand-logo {
  margin-left: 10px;
}

  .showHide-enter-active {
    opacity: 0;
    transition: all .3s ease;
  }
  
  .showHide-enter-to {
    opacity: 1;
  }
  
  .showHide-leave-active {
    /*transition: all 1s ease;//*/
  }
  
  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
  
.page-conteiner {
  height: 100%;
}

  .page {
    margin-top: 20px;
    height: 100%;
  }
  
  .hovered tbody tr {
    cursor: pointer;
    transition: 0.2s;
  }
  
  .hovered tbody tr:hover {
    background-color: rgba(0, 0, 0, 0.2)
  }
  
  .router-link-active {
    background-color: rgba(0, 0, 0, 0.1)
  }
</style>