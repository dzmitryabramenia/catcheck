export default {

  state() {
    return {
      tab: 'AddToken'
    }
  },
  mutations: {
    tabTokenModeration(state) {
      state.tab = 'TokenModeration'
    },
    tabAddToken(state) {
      state.tab = 'AddToken'
    },
    tabPresaleModeration(state) {
      state.tab = 'PresaleModeration'
    },
    tabAddModerator(state) {
      state.tab = 'AddModerator'
    },
    tabLinkIsNotValid(state) {
      state.tab = 'LinkIsNotValid'
    },
    tabEventsModerator(state) {
      state.tab = 'EventsModerator'
    },
    tabEventsForm(state) {
      state.tab = 'EventsForm'
    },
    tabReferral(state) {
      state.tab = 'Referral'
    }
  },
  getters: {
    tabSelect(state) {
      return state.tab
    }
  }
}