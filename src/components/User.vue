<template>

<div class="flex flex-center q-pa-sm">
    <h5 class="q-ma-md">{{$store.getters.role}}</h5>
    <q-avatar size="45px" class="q-ma-sm">
        <q-img
        style="height: 45px; max-width: 45px"
        spinner-color="grey-4"
        :src="`${$store.getters.photoUrl}`"
        />
    </q-avatar>
    {{$store.getters.email}}
    <q-space />
      
</div>

  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab label="Add Token" @click="$store.commit('tabAddToken')" />
      <q-tab label="Token Moderation" @click="$store.commit('tabTokenModeration')" />
      <q-tab v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" label="Presale Moderation" @click="$store.commit('tabPresaleModeration')" />
      <q-tab v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" label="Link Is Not Valid" @click="$store.commit('tabLinkIsNotValid')" />
      <q-tab v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" label="Events Moderator" @click="$store.commit('tabEventsModerator')" />
      <q-tab v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" label="Events Form" @click="$store.commit('tabEventsForm')" />
    </q-tabs>

        <q-tab-panels
          v-model="this.$store.getters.tabSelect"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >

          <q-tab-panel name="TokenModeration">
            <TokenModeration />
          </q-tab-panel>

<!-- Presale Moderation-->
          <q-tab-panel name="PresaleModeration">
            <PresaleModeration />
          </q-tab-panel>

<!-- Link is not valid-->
          <q-tab-panel name="LinkIsNotValid">
            <LinkIsNotValid />
          </q-tab-panel>

<!-- Events Moderator -->
          <q-tab-panel name="EventsModerator">
            <EventsModerator />
          </q-tab-panel>

          <q-tab-panel name="AddModerator">
            <AddModerator />
          </q-tab-panel>

          <q-tab-panel name="AddToken">
            <AddToken />
          </q-tab-panel>

          <q-tab-panel name="EventsForm">
            <EventsForm />
          </q-tab-panel>

          
        </q-tab-panels>

  </div>


</template>

<script>
import 'firebase/compat/auth';
import AddToken from 'components/User/AddToken.vue'
import EventsForm from 'src/components/EventsForm.vue'
import PresaleModeration from 'components/User/PresaleModeration.vue'
import EventsModerator from 'components/User/EventsModerator.vue'
import LinkIsNotValid from 'components/User/LinkIsNotValid.vue'
import AddModerator from 'components/User/AddModerator.vue'
import TokenModeration from 'components/User/TokenModeration.vue'




export default {
    
  data () {
    return {
      role: '',
      email: '',
      photoUrl: '',
      tab: '',
      tabl: this.$store.getters.tabSelect,
      splitterModel: 10
    }
  },
  components: {
    AddToken,
    EventsForm,
    PresaleModeration,
    EventsModerator,
    LinkIsNotValid,
    AddModerator,
    TokenModeration
  }
}
</script>

