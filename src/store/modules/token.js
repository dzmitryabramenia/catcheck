import { getDatabase, ref, onValue } from "firebase/database";

export default {
    state() {
        return {
            tokens: []
        }
    },
    actions: {
        loadToken(ctx) {
            const db = getDatabase()
            const tokensRef = ref(db, 'token/')
            onValue(tokensRef, (snapshot) => {
            const data = snapshot.val()
            const tokens = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...data[key]
                    }
                }).sort((a, b) => b.votes - a.votes)
            ctx.commit('updateTokens', tokens)             
            });           
        }
    },
    mutations: {
        updateTokens(state, tokens) {
            state.tokens = tokens
        }
    },
    getters: {
        tokens(state) {
            return state.tokens
        }
    }
}