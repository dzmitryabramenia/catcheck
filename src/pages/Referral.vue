<template>

<Referral />




</template>

<script>
import { createMetaMixin } from 'quasar'
import Referral from '../components/ReferralProgram/Referral.vue'



const metaData = {
  // sets document title
  title: 'Referral Program CatCheck.org',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title}`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'Referral Program Service CatCheck.org' },
  }
}


export default {



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
    Referral,
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