<template>
<h1 class="q-mx-md">Referral Program</h1>
<div class="q-ma-md">
    Eternal referral program from catcheck.<br>
    You will receive 10% of any income of your referral.<br>
    More about earnings on the site check out here <router-link to="/testnet">https://catcheck.org/testnet</router-link> and <router-link to="/faq#how-to-make-money-on-the-catcheck">https://catcheck.org/faq#how-to-make-money-on-the-catcheck</router-link>
</div>
<div v-if="$store.getters.uid">
    <div class="q-ma-md">To attract referrals click on the REFERRAL PROGRAM in the header of the site, copy your referral code</div>
    <div class="flex q-ma-md">
        
        <div class="q-px-md q-py-md fontReferralTitle">Your referral code</div>
        <div class="q-pa-sm flex borderReferral fontReferralCode">
            <div class="q-mx-md">
                {{$store.getters.uid}}
            </div>
            <q-separator vertical inset />
            <div class="q-mx-md">
                <q-btn label="Copy" icon="fas fa-copy" @click="copyToClipboard($store.getters.uid)" />
            </div>
        </div>
    </div>
    <p class="q-px-lg">Ask to enter your referral code, you and your referral will receive 500 POINTS</p>
    <div v-if="dataReferral" class="flex q-mx-md q-pt-lg">
        <div class="q-pa-sm flex borderReferral fontReferralCode">
            <div class="q-mx-md">
                <q-input class="fontReferralEnterCode" style="width: 335px" dense v-model="referralCode" />
            </div>
            <q-separator vertical inset />
            <div class="q-mx-md">
                <q-btn
                    label="Send" 
                    icon="fas fa-paper-plane" 
                    @click="addReferralCode"
                    :disable="loading"
                    :loading="loading" 
                />
            </div>
        </div>
    </div>


    <TableReferral />
</div>
<div v-if="!$store.getters.uid" class="flex q-mx-lg"> 
    <q-btn 
    color="primary" 
    class="q-ma-sm buttonWidth"
    label="Login"
    @click="this.$store.dispatch('google')" 
    />
    <p class="q-mt-md q-ml-md">to use the referral program</p>
</div>

<br>
<div class="q-ma-md">
    <p>Make reviews or tell your friends and your community about the project, also recommend them to get acquainted with rewards for testnet <router-link to="/testnet">https://catcheck.org/testnet</router-link>
    and our video bounty company (link), you can participate in everything at the same time so as to get more POINTS</p>
    
    <p>POINTS will be exchanged for 6,000,000 CATCH tokens, which is 6% of the total supply of tokens, tokens will be unlocked within 12 months after listing, each month for 8.33%</p>

    <p>The price of tokens will be known soon, stay tuned to the project news</p>

</div>
   
</template>

<script>
import { getDatabase, ref, onValue, set, get, child, update} from "firebase/database"
import TableReferral from './TableReferral.vue'


export default {
    data() {
       return {
           formAddReferralCode: false,
           referralCode: '',
           loading: false,
           tab: 'table', 
       } 
    },
    methods: {
        async copyToClipboard(some) {
            console.log(this.$store.getters.users)
            await navigator.clipboard.writeText(some)
            .then(() => {
                this.$q.notify({message: `Saved code`, color: 'green'})
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'})
            })
        },
        addReferralCode() {
            // this.loading = true
            const db = getDatabase()
            const dbRef = ref(getDatabase());
            get(child(dbRef, `users/`)).then((snapshot) => {
              if (this.referralCode !== this.$store.getters.uid && Object.keys(snapshot.val()).find(i => i == this.referralCode)) {
                    set(ref(db, 'users/' + this.referralCode + '/referral/' + this.$store.getters.uid), {
                        value: 0,
                        time: Date.now()
                        })
                    .then(() => {
                        this.loading = false
                        this.$q.notify({message: `Referral ${this.referralCode} added`, color: 'green'}) 
                    })
                    .catch((error) => {
                        this.loading = false
                        this.$q.notify({message: `${error}`, color: 'red'}) 
                    })

                    update(ref(db, 'users/' + this.referralCode), {
                        points: 500,
                        })
                    .catch((error) => {
                        this.loading = false
                        this.$q.notify({message: `${error}`, color: 'red'}) 
                    })

                    update(ref(db, 'users/' + this.$store.getters.uid), {
                        points: 500,
                        })
                    .then(() => {
                        this.loading = false
                        this.$q.notify({message: `You have earned 500 points`, color: 'green'}) 
                    })
                    .catch((error) => {
                        this.loading = false
                        this.$q.notify({message: `${error}`, color: 'red'}) 
                    })
                    
                } else {
                    this.loading = false
                    this.$q.notify({message: `This referral code does not exist.`, color: 'red'})
                } 
            }).catch((error) => {
                console.error(error)
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })






/*      set(ref(db, 'users/' + this.$store.getters.uid + '/referral/' + this.referralCode), {
            value: 0,
            time: Date.now()
            })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Referral ${this.referralCode} added`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        }) */
        }
    },
    components: {
        TableReferral
    },
    computed: {
        dataReferral() {
            if (this.$store.getters.dataReferral) {
                return this.$store.getters.dataReferral !== this.$store.getters.uid
            } else if(this.$store.getters.dataReferral == undefined) {
                return true
            } else {
                return false
            }
            
        }
    }
}
</script>

<style scoped lang="sass">
.borderReferral
    border: 2px solid #ccc
    border-radius: 10px

.fontReferralTitle
    font-size: 1.8em !important
    font-weight: 400

.fontReferralCode
    font-size: 1.5em !important
    font-weight: 600
    line-height: 50px

.fontReferralEnterCode
    font-size: 1em !important
    font-weight: 900

h1
    font-size: 4rem
</style>
