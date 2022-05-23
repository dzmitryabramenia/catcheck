<template>
    <h4 v-if="presaleDateLinkModeration.length == 0" class="q-mx-lg">No presale events to check</h4>
    <div v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" class="flex flex-center">
        <q-card class="q-ma-md q-pa-sm" v-for="token in presaleDateLinkModeration" :key="token.id">
            <h4 class="headerRed q-ma-sm q-px-lg">Presale Moderation</h4>
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
    <!-- Date Start Presale -->           
                <q-card-section class="box-shadow q-pa-md q-ma-sm">
                    <span class="bold">Presale Start:&nbsp;</span>
                    {{ token.dateLaunchModerationStartPresale == '' ? '' : `${new Intl.DateTimeFormat('en-En').format(new Date(token.dateLaunchModerationStartPresale))}`}}
<!--                     <q-popup-proxy v-model="token.dateLaunchModerationStartPresale" cover transition-show="scale" transition-hide="scale">
                        
                        <q-date class="q-ma-md" subtitle="Start Presale" v-model="token.dateLaunchModerationStartPresale"/>
                        <div class="row items-center justify-start q-gutter-sm q-ma-md">
                            <q-btn @click="editDateLaunchModerationStartPresale(Date.parse(dateLaunchModerationStartPresale), token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                            <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                        </div>
                    </q-popup-proxy> -->
                </q-card-section>
    <!-- Date End Presale -->           
                <q-card-section class="box-shadow q-pa-md q-ma-sm">
                    <span class="bold">Presale End:&nbsp;</span>
                    {{ token.dateLaunchModerationStartPresale == '' ? '' : `${new Intl.DateTimeFormat('en-En').format(new Date(token.dateLaunchModerationEndPresale))}`}}
<!--                     <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        
                        <q-date class="q-ma-md" subtitle="End Presale" v-model="dateLaunchModerationEndPresale"/>
                        <div class="row items-center justify-start q-gutter-sm q-ma-md">
                            <q-btn @click="editDateLaunchModerationEndPresale(Date.parse(dateLaunchModerationEndPresale), token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                            <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                        </div>
                    </q-popup-proxy> -->
                </q-card-section>
    <!-- Presale Links -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 1:&nbsp;</span>
                {{ token.linkToPresale1 }}
                <q-popup-edit v-model="token.linkToPresale1">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale1"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale1}`" v-if="token.linkToPresale1" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale1(token.linkToPresale1, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 2:&nbsp;</span>
                {{ token.linkToPresale2 }}
                <q-popup-edit v-model="token.linkToPresale2">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale2"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale2}`" v-if="token.linkToPresale2" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale2(token.linkToPresale2, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 3:&nbsp;</span>
                {{ token.linkToPresale3 }}
                <q-popup-edit v-model="token.linkToPresale3">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale3"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale3}`" v-if="token.linkToPresale3" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale3(token.linkToPresale3, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 4:&nbsp;</span>
                {{ token.linkToPresale4 }}
                <q-popup-edit v-model="token.linkToPresale4">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale4"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale4}`" v-if="token.linkToPresale4" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale4(token.linkToPresale4, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 5:&nbsp;</span>
                {{ token.linkToPresale5 }}
                <q-popup-edit v-model="token.linkToPresale5">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale5"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale5}`" v-if="token.linkToPresale5" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale5(token.linkToPresale5, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 6:&nbsp;</span>
                {{ token.linkToPresale6 }}
                <q-popup-edit v-model="token.linkToPresale6">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale6"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale6}`" v-if="token.linkToPresale6" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale6(token.linkToPresale6, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 7:&nbsp;</span>
                {{ token.linkToPresale7 }}
                <q-popup-edit v-model="token.linkToPresale7">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale7"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale7}`" v-if="token.linkToPresale7" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale7(token.linkToPresale7, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 8:&nbsp;</span>
                {{ token.linkToPresale8 }}
                <q-popup-edit v-model="token.linkToPresale8">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale8"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale8}`" v-if="token.linkToPresale8" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale8(token.linkToPresale8, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 9:&nbsp;</span>
                {{ token.linkToPresale9 }}
                <q-popup-edit v-model="token.linkToPresale9">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale9"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale9}`" v-if="token.linkToPresale9" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale9(token.linkToPresale9, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale Link 10:&nbsp;</span>
                {{ token.linkToPresale10 }}
                <q-popup-edit v-model="token.linkToPresale10">
                    <span class="bold">Presale Link:</span>  
                    <q-input
                        v-model="token.linkToPresale10"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.linkToPresale10}`" v-if="token.linkToPresale10" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editLinkToPresale10(token.linkToPresale10, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>


    <!-- Button Public Presale -->
            <q-card-section>
                <div style="display: inline">
                    <q-btn
                    class="button-margin"
                    color="green"
                    @click="publicDateLaunch(token.id, token.dateLaunchModerationStartPresale, token.dateLaunchModerationEndPresale, linkToPresale1, linkToPresale2, linkToPresale3, linkToPresale4, linkToPresale5, linkToPresale6, linkToPresale7, linkToPresale8, linkToPresale9, linkToPresale9)"
                    >Public</q-btn>
                </div>
            </q-card-section>
    <!-- Button Delete Presale -->
            <q-card-section>
                <div style="display: inline">
                    <q-btn
                    class="button-margin"
                    color="primary"
                    @click="deleteDateLaunch(token.id)"
                    >Delete</q-btn>
                </div>
            </q-card-section>
            </div>
        </q-card>
    </div>
</template>


<script>
import 'firebase/compat/auth';
import { getDatabase, ref, onValue, set, update, remove} from "firebase/database";





export default {
    
  data () {
    return {
      tokens: [],
      dateLaunch: '',
      presale: '',
      dateLaunchModerationStartPresale: '',
      dateLaunchModerationEndPresale: '',
    }
  },
  methods: {
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
    editDateLaunchModerationStartPresale(dateLaunchModerationStartPresale, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            dateLaunchModerationStartPresale: dateLaunchModerationStartPresale
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Date Launch StartPresale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editDateLaunchModerationEndPresale(dateLaunchModerationEndPresale, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            dateLaunchModerationEndPresale: dateLaunchModerationEndPresale
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Date Launch StartPresale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale1(linkToPresale1, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale1: linkToPresale1
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale2(linkToPresale2, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale2: linkToPresale2
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale3(linkToPresale3, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale3: linkToPresale3
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale4(linkToPresale4, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale4: linkToPresale4
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale5(linkToPresale5, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale5: linkToPresale5
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale6(linkToPresale6, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale6: linkToPresale6
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale7(linkToPresale7, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale7: linkToPresale7
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale8(linkToPresale8, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale8: linkToPresale8
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale9(linkToPresale9, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale9: linkToPresale9
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editLinkToPresale10(linkToPresale10, id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkToPresale10: linkToPresale10
        })
        .then(() => {
            this.submitting = false
            this.$q.notify({message: `Saved Link to Presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicDateLaunch (id, dateLaunchModerationStartPresale, dateLaunchModerationEndPresale) {
        console.log('dateLaunchModerationStartPresale', dateLaunchModerationStartPresale)
        console.log('dateLaunchModerationEndPresale', dateLaunchModerationEndPresale)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
          dateLaunch : dateLaunchModerationStartPresale,
          dateLaunchEnd: dateLaunchModerationEndPresale,
          dateLaunchModerationStartPresale : '',
          dateLaunchModerationEndPresale: ''
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Public Date Launch`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteDateLaunch (id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
          dateLaunchModerationStartPresale : '',
          dateLaunchModerationEndPresale: '',
          linkToPresale1: '',
          linkToPresale2: '',
          linkToPresale3: '',
          linkToPresale4: '',
          linkToPresale5: '',
          linkToPresale6: '',
          linkToPresale7: '',
          linkToPresale8: '',
          linkToPresale9: '',
          linkToPresale10: ''
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    }

  },
  computed: {
        presaleDateLinkModeration() {
            return this.tokens.filter(token => token.dateLaunchModerationEndPresale !== '' && token.linkToPresale1 !== undefined)
        }
  },
  mounted() {
    this.loadToken()
  }
}
</script>

<style scoped lang="sass">

.box-shadow 
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
    border-radius: 4px
    vertical-align: top
    background: #fff
    position: relative

</style>