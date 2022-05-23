<template>

              <div class="my-card">
                <div horizontal @click="isOpen = !isOpen" class="row border-bottom items-center">

                  <div class="col-xs-6 col-md-2" align="center">
                    <q-img style="height: 50px; max-width: 50px"
                    spinner-color="grey-4"
                    :src="`${token.imgUrl}`"/>
                  </div>

                  <div class="col-xs-6 col-md-2" align="center">
                    {{ token.name }}
                  </div>
          
                  <div class="col-xs-6 col-md-2" align="center">
                    {{ token.symbol }}
                  </div>


                  <div class="col-xs-6 col-md-2" align="center">
                      <q-chip square style="min-width: 95px">
                        <q-tooltip>{{timeLaunch() == 1 ? "day" : "days"}}</q-tooltip>
                      <q-avatar :color="timeLaunch() > 0 ? 'green' : 'primary'" text-color="white">{{ timeLaunch() }}</q-avatar>
                        &nbsp; {{timeLaunch() > 0 ? "list" : "launch"}}
                        </q-chip>
                  </div>

                  <div class="col-xs-6 col-md-2" align="center">
                      <q-chip square>
                      <q-avatar color="primary" text-color="white">{{ token.votes }}</q-avatar>
                        &nbsp;votes
                        </q-chip>
                  </div>

                  <div class="col-xs-6 col-md-2" align="center">
                    <div style="display: inline">
                      <q-tooltip>Token UP</q-tooltip>
                    <q-btn
                      class="button-margin"
                      color="green"
                      icon="keyboard_arrow_up"
                      @click.stop="couterVotes(token.id, token.votes), addPrecentUp(token.id, token.percentsUp)"
                      >&nbsp;{{ token.percentsUp }}
                    </q-btn>
                    </div>
                    
                    <div style="display: inline">
                      <q-tooltip>Token DOWN</q-tooltip>
                      <q-btn
                      color="red"
                      icon-right="keyboard_arrow_down"
                      @click.stop="couterVotes(token.id, token.votes), addPrecentDown(token.id, token.percentsDown)"
                      >{{ token.percentsDown }}&nbsp;
                      </q-btn>
                    </div>
                  </div >
                </div >
                <div v-if="isOpen">
                  <div class="row">
                    <div class="q-pa-sm col-xs-12 col-sm-6">
                      <div class="word-wrap"><strong>Token address:</strong><br>  {{ token.address }}</div>
                      <div><strong>Token added:</strong><br> {{ tokenTime(token.addTokenTime) }} </div>
                      <div><strong>Token Launch:</strong><br> {{ token.dateLaunch }} </div>
                      <div><strong>Website: </strong> 
                        <a :href="`${token.website}`" target="_blank" rel="nofollow">Visit Website</a>
                      </div>
                      <div><strong>Telegram: </strong>
                        <a :href="`${token.telegram}`" target="_blank" rel="nofollow">Join Telegram</a>
                      </div>
                      <div><strong>Twitter: </strong>
                        <a :href="`${token.twitter}`" target="_blank" rel="nofollow">Follow Twitter</a>
                      </div>
                    </div>
                    <div class="q-pa-sm col-xs-12 col-sm-6">
                      <div><strong>Description:</strong><br> {{token.text}} </div>
                    </div>
                  </div>
                </div>
              </div >



</template>

<script>
import { date } from 'quasar'






export default {
  name: 'BlockToken',
  props: ["token"],

  data() {
    return {
      isOpen: false

    }
  },
  methods: {
    couterVotes() {
      this.$emit("couterVotes", this.token.id, this.token.votes)
    },
    addPrecentUp() {
      this.$emit("addPrecentUp", this.token.id, this.token.percentsUp)
    },
    addPrecentDown() {
      this.$emit("addPrecentDown", this.token.id, this.token.percentsDown)
    },
    tokenTime(value) {
      return date.formatDate(value, 'YYYY DD MMMM HH:mm:ss')
    },
    timeLaunch() {
      const date1 = new Date(this.token.dateLaunch)
      const date2 = new Date()
      const unit = 'days'
      return date.getDateDiff(date1, date2, unit)
    }
  },
  
}
</script>

<style lang="sass" scoped>
.my-card
  padding: 10px 0
  border-bottom: 1px solid #ccc
  
.button-margin
  margin: 10px

.word-wrap
  word-wrap: break-word
</style>