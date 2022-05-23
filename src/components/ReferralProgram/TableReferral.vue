<template>
<div class="q-pt-xl" v-if="referral.length">
  <h4 class="q-ma-lg">My Referrals</h4>
  <table style="width:100%">
    <tbody>
      <tr v-for="ref in referral" :key="ref.id">
        <td colspan="2">{{ref.id}}</td>
        <td>{{new Intl.DateTimeFormat('en-En', {
                                          day: '2-digit',
                                          month: 'long',
                                          year: 'numeric',
                                    }).format(new Date(ref.time))}}</td>
        <td>{{ref.value}}</td>
      </tr>
    </tbody>
  </table>
</div>

</template>

<script>
/* const columns = [
  {
    name: 'id',
    required: true,
    label: 'Referral',
    align: 'left',
    field: row => row.id,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'time', label: 'Time', field: row => row.time,
    format: val => new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                }).format(new Date(val)), sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'value', label: 'Value', field: 'value', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
 */


export default {
  data () {
    return {

    }
  },
  computed: {
    referral() {
      return this.$store.getters.users
    }
  }
}
</script>

<style scoped lang="sass">
table, th, td 
  padding: 10px
  border: 1px solid black
  border-collapse: collapse

</style>