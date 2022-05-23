<template>


<TableTokens/>




</template>

<script>
import { createMetaMixin } from 'quasar'
import { defineComponent } from 'vue';
import TableTokens from '../components/TableTokens.vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, set } from "firebase/database";
import axios from 'axios'
import detectEthereumProvider from '@metamask/detect-provider'

const metaData = {
  // sets document title
  title: 'CatCheck.org - platform for promoting cryptocurrency tokens',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title}`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Service for search, promotion, analytics and voting of the best cryptocurrency tokens' },
  }
}


export default {
name: "Home",


  data () {
  return {
    user: '',
    email: '',
    accountMetamask: '',
    chainId: '',
    uid: '',
    photoUrl: '',

    }
  }, 
  components: {
    TableTokens
  },
  methods: {
      
    },
  mixins: [
    createMetaMixin(metaData)
  ]

}
</script>

<style lang="sass" scoped>
.bg-body
  background-color: #f1f2f3

</style>
