<template>



<div class="q-pa-md" v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder' || $store.getters.role == 'Owner Token'">
  <div class="q-gutter-md">
    <div class="row">
      <q-card style="width: 100%">

        <q-tabs
          v-model="tab"
          class="bg-primary text-white shadow-2"
          active-color="white"
          indicator-color="white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="whitelist" label="WhiteList" />
          <q-tab name="bounty" label="Bounty" />
          <q-tab name="airdrop" label="AirDrop" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          
          <!-- Start WhiteList -->

         <q-tab-panel name="whitelist">
            <div class="col-3">
              <div class="row">
                <WhiteList />
              </div>
            </div>
          </q-tab-panel> 

          <!-- End WhiteList> -->

          <!-- Start Bounty -->
          <q-tab-panel name="bounty">
            <div class="col-3">
              <div class="row">
                <Bounty />
              </div>
            </div>
          </q-tab-panel>

          <!-- End Bounty -->

          <!-- Start AirDrop -->

          <q-tab-panel name="airdrop">
            <div class="col-3">
              <div>
                <AirDrop />
              </div>
        
            </div>
          </q-tab-panel>
        </q-tab-panels>

        <!-- End AirDrop -->
      </q-card>
    </div>
  </div>
</div>
</template>



<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import WhiteList from 'components/GleamForm/WhiteList'
import Bounty from 'components/GleamForm/Bounty'
import AirDrop from 'components/GleamForm/AirDrop'

import { getDatabase, ref, set } from "firebase/database";


export default {
  name: 'TheCreatePost',

    data() {
   return {
      id: '',
      name: '',
      symbol: '',
      img: '',
      file: null,
      airdrop: 0,
      bounty: 0,
      votes: 0,
      address: '',
      tokens: [],
      chain: '',
      selectToken: 'BSC',
      addTokenTime: Date.now(),
      category: 'game',
      website: '',
      telegram: '',
      twitter: '',
      text: '',
      date: '',
      dateLaunch: '',
      whiteList: '',
      tab: 'airdrop',
      startsWhiteList: '',
      endsWhiteList: '',
      startsBounty: '',
      endsBounty: '',
      startsAirDrop: '',
      endsAirDrop: '',
      twitterAirdropEntry: '',
      retweetATweet: '',
      tweet: '',
      followOnTwitter: '',
      twitterPostURL: '',
      youtubeAirdropEntry: ''
    }
    },
    methods: {
    writeAirdrop () {
      const db = getDatabase();
      set(ref(db, `airdrop/${this.uid}`), {
      startsAirDrop: this.startsAirDrop,
      twitterAirdropEntry: this.twitterAirdropEntry,
      retweetATweet: this.retweetATweet,
      tweet: this.tweet,
      followOnTwitter: this.followOnTwitter,
      twitterPostURL: this.twitterPostURL,
      });
    }

  },
  components: {
    WhiteList, Bounty, AirDrop
  }

}


</script>

