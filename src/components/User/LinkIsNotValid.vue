<template>
<div v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" class="flex flex-center">
<!-- Link Referral Token is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkReferralTokenIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Referral Token is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token Event:&nbsp;</span>
                <a :href="`${token.addLinkReferralToken}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralToken}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Referral Token Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageReferralTokenLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralToken(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>
<!-- Link Witelist is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkWitelistIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Witelist is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Whitelist Event:&nbsp;</span>
                <a :href="`${token.addLinkReferralWhitelist}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralWhitelist}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Whitelist Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageWhitelistLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralWhitelist(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>

<!-- Link Airdrop is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkAirdropIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Airdrop is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Airdrop Event:&nbsp;</span>
                <a :href="`${token.addLinkReferralAirdrop}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralAirdrop}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Airdrop Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageAirdropLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralAirdrop(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>

<!-- Link Testnet is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkTestnetIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Testnet is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Testnet Event:&nbsp;</span>
                <a :href="`${token.addLinkReferralTestnet}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralTestnet}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Testnet Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageTestnetLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralTestnet(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>

<!-- Link Bounty is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkBountyIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Bounty is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Bounty Event:&nbsp;</span>
                <a :href="`${token.addLinkReferralBounty}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralBounty}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Bounty Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageBountyLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralBounty(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>

<!-- Link Staking is not valid-->
    <q-card class="q-ma-md q-pa-sm" v-for="token in linkStakingIsNotValid" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Link Staking is not valid</h4>
        <div class="row flex">
        <!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- Event -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Staking Event:&nbsp;</span>
                <a :href="`${token.addLinkStaking}`" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkStaking}}
                    <q-icon name="launch" color="primary" size="sm" />
                </a>
            </q-card-section>
<!-- Button Hide Message Staking Link is not valid -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="buttonHideMessageStakingLinkIsNotValid(token.id)"
                >Hide</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkStaking(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>
</div>
</template>



<script>

import { getDatabase, onValue, ref, update} from "firebase/database";

export default {
      data () {
    return {
      tokens: [],
    }
  },
    methods:{

        loadToken() {
            const db = getDatabase()
            const tokensRef = ref(db, 'token/')
            onValue(tokensRef, (snapshot) => {
            const data = snapshot.val()
            this.tokens = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...data[key]
                    }
                })
            })
        },
        buttonHideMessageReferralTokenLinkIsNotValid(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingReferralTokenLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkReferralToken(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                referralToken: 'NoN',
                addLinkReferralToken: '',
                declareNotWorkingReferralTokenLink: false
            })
            .then(() => {
                this.$q.notify({message: `Whitelist referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        buttonHideMessageWhitelistLinkIsNotValid(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingWhitelistLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkReferralWhitelist(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                whiteList: 'NoN',
                addLinkReferralWhitelist: '',
                declareNotWorkingWhitelistLink: false
            })
            .then(() => {
                this.$q.notify({message: `Whitelist referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        buttonHideMessageAirdropLinkIsNotValid(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingAirdropLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkReferralAirdrop(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                airdrop: 'NoN',
                addLinkReferralAirdrop: '',
                declareNotWorkingAirdropLink: false
            })
            .then(() => {
                this.$q.notify({message: `Airdrop referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        buttonHideMessageBountyLinkIsNotValid (id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingBountyLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkReferralBounty(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                bounty: 'NoN',
                addLinkReferralBounty: '',
                declareNotWorkingBountyLink: false
            })
            .then(() => {
                this.$q.notify({message: `Bounty referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        buttonHideMessageTestnetLinkIsNotValid(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingTestnetLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkReferralTestnet(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                testnet: 'NoN',
                addLinkReferralTestnet: '',
                declareNotWorkingTestnetLink: false
            })
            .then(() => {
                this.$q.notify({message: `Testnet referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        buttonHideMessageStakingLinkIsNotValid(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                declareNotWorkingStakingLink: false
            })
            .then(() => {
                this.$q.notify({message: `Message hidden`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
        deleteLinkStaking(id) {
            const db = getDatabase()
            update(ref(db, "token/" + id), {
                staking: 0,
                addLinkStaking: '',
                declareNotWorkingStakingLink: false
            })
            .then(() => {
                this.$q.notify({message: `Staking referral link deleted`, color: 'green'}) 
            })
            .catch((error) => {
                this.$q.notify({message: `${error}`, color: 'red'}) 
            })
        },
    },
    computed: {
        linkReferralTokenIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingReferralTokenLink == true)
        },
        linkWitelistIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingWhitelistLink == true)
        },
        linkAirdropIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingAirdropLink == true)
        },
        linkBountyIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingBountyLink == true)
        },
        linkTestnetIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingTestnetLink == true)
        },
        linkStakingIsNotValid() {
            return this.tokens.filter(token => token.declareNotWorkingStakingLink == true)
        }
  },
    mounted() {
    this.loadToken()
  }
}

</script>