import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use( Vuetify, {
    iconfont: 'mdi'
});

const opts = {
    theme : {
        themes : {
            light : {
                primary: '#000000'
            }
        }
    }
};

export default new Vuetify(opts)