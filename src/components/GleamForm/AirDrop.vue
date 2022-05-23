<template>

    <q-form
        @submit="airdrop"
        class="q-gutter-md flex flex-center" style="min-width: 300px"
    >
        <div class="col-xs-12 col-sm-4">
            
            <q-select class="q-ma-md"
                color="grey-3"
                outlined
                label-color="primary"
                v-model="selectToken"
                :options="optionsSelectToken"
                label="Select Token"
                @click="optionsSelectToken2"
            >
                <template v-slot:append>
                <q-icon name="fas fa-coins" color="primary" />
                </template>
            </q-select>
                
            <q-date class="q-ma-md" v-model="startsAirDrop" subtitle="Starts AirDrop"/>
            
            <q-date class="q-ma-md" v-model="endsAirDrop" subtitle="Ends AirDrop"/>

        </div>

        <!-- Start Airdrop Twitter -->



        <q-card class="col-xs-12 col-sm-4">


            <q-card-section>
                <q-input
                    class="minWidthInput q-pa-xs"
                    placeholder="https://twitter.com/CatCheck/status/1474338406922481664"
                    filled
                    type="text"
                    v-model="twitterAirdropFollow"
                    label="Follow"
                >
                    <template v-slot:prepend>
                    <q-icon class="twitterBlue" name="fab fa-twitter" />
                    </template>

                </q-input>
                <q-input
                    class="minWidthInput q-pa-xs"
                    placeholder="Number of points"
                    v-model.number="twitterAirdropFollowNumber"
                    type="number"
                    filled
                    style="max-width: 200px"
                    >
                    <template v-slot:prepend>
                        <q-icon name="filter_1" color="primary" class="cursor-pointer" />
                    </template>
                </q-input>
            </q-card-section>
  
        </q-card>

        <!-- End Airdrop Facebook -->

<!-- <q-btn @click="twitter">click</q-btn> -->

        <div class="minWidthInput q-ma-md">
            <q-btn class="q-ma-md" label="Submit" type="submit" color="primary"/>
        </div>
    </q-form>



</template>

<script>
import axios from 'axios'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getDatabase, ref, set } from "firebase/database";

export default{
    data() {
        return {
            selectToken: '',
            optionsSelectToken: [],
            tokens: [],
            startsAirDrop: '',
            endsAirDrop: '',
            twitterAirdropFollow: '',
            twitterAirdropFollowNumber: '',
        }
    },
    methods: {
    airdrop () {
      const db = getDatabase();
      set(ref(db, `airdrop/${this.uid}`), {
      startsAirDrop: this.startsAirDrop,
      endsAirDrop: this.endsAirDrop,
      twitterAirdropFollow: this.twitterAirdropFollow,
      twitterAirdropFollowNumber: this.twitterAirdropFollowNumber,
      });
    },
    async loadToken() {
      const {data} = await axios.get('https://catcheckorg-34caf-default-rtdb.firebaseio.com/token.json')
      this.tokens = Object.keys(data).map(key => {
        return {
          id: key,
          ...data[key]
        }
      })
      
    },
  

    
    
  },
  created() {
      firebase.auth().onAuthStateChanged((auth) => {
        const user = firebase.auth().currentUser;
          if (auth) {
          this.uid = auth.uid
          } else {
          console.log('user name is null')
          }
      }),
      this.loadToken()

      
    },
    computed: {
        optionsSelectToken1 () {
            return this.tokens.filter(token => token.ownerToken == this.uid)
           },
        optionsSelectToken2 () {
            return this.optionsSelectToken1.map(optionsSelectTok => this.optionsSelectToken.push(optionsSelectTok.name))
        }

    },
    mounted() {}
}

</script>


<style scoped lang="sass">
.minWidthInput
  min-width: 300px


.twitterBlue
  color: rgb(29, 155, 240)

.facebookColor
  color: #4267B2

.youtubeRed
  color: #ff0000

.instagromColor
  display: inline-block
  width: 25px
  height: 25px
  text-align: center
  border-radius: 4px
  color: #fff
  font-size: 22px
  line-height: 25px
  vertical-align: middle
  background: #d6249f
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)

.tiktokBlack
    color: #010101

.telegramColor
    color: #0088CC

.discordBlue
    color: #5865F2

.redditColor
    color: #FF5700

.mediumColor
    color: #000
</style>