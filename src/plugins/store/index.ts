import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   searchInput: '',

   category: 'all',
   categories: [
       {
           text: 'All',
           value: 'all'
       },
       {
           text  : 'Converse',
           value : 'converse'
       },
       {
           text  : 'Sneakers',
           value : 'sneakers'
       },
       {
           text  : 'Top-siders',
           value : 'top-siders'
       },
       {
           text  : 'Basketball shoes',
           value : 'basketball'
       },
   ],

   sale: 'all',
   saleOptions: [
       {
           text: 'All',
           value: 'all',
       },
       {
           text: 'On sale',
           value: 'onSale',
       }
   ],

   sort: 'asc',
   sortOptions: [
       {
           text: 'Ascending',
           value: 'asc',
       },
       {
           text: 'Descending',
           value: 'desc',
       }
   ],

   loading: true,

   basket: {
       products: [],
       total: 0.0,
       subtotal: 0.0
   },
   products: [],
   sortedProducts: []
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
