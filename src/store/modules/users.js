import 'firebase/compat/firestore';
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Notify } from 'quasar'


export default {
        state() {
            return {
                role: '',
                email: '',
                photoUrl: '',
                user: '',
                uid: '',
                usersData: [],
                referralAdded: '',
                dataReferral: '',
                pointsUser: '',
                dataVotesUser: ''
            }
        },
        actions: {
            authentication(ctx) {
                firebase.auth().onAuthStateChanged((result) => {
                    result.getIdTokenResult().then(getIdTokenResult => { 
                        ctx.commit('updateAuthentication', result)
                        ctx.commit('updateAuthenticationRole', getIdTokenResult)
                    }).then(() => {
                        const db = getDatabase()
                        const usersRef = ref(db, 'users/')

                        onValue(usersRef, (snapshot) => {
                            const users = snapshot.val()

                            const dataRef = Object.keys(users).map(key => {
                                return {
                                    id: key,
                                    ...users[key]
                                }
                            }).filter(i => i.referral).map(i => i.referral).map(i => Object.keys(i)) 

                            if(users[result.uid]['votes'] === undefined) {
                                const dataVotesUser = {"time": 1637519293261, "value": 100}
                                ctx.commit('updateDataVotesUser', dataVotesUser)
                            } else {
                                const dataVotesUser = users[result.uid]['votes']
                                ctx.commit('updateDataVotesUser', dataVotesUser)
                            }
                        
                           


                            if(users[result.uid]['points']) {
                                const dataVotes = Object
                                .values(users[result.uid]['votes'])
                                .map(x => x.value)
                                .filter(r => r !== undefined)
                                .reduce((a, b) => a + b, 0)

                                const dataPoints = users[result.uid]['points'] 

                                const pointsUser = dataVotes + dataPoints

                                ctx.commit('updatePointsUser', pointsUser)

                            } else if ((users[result.uid]['votes'])) {
                                const pointsUser = Object
                                .values(users[result.uid]['votes'])
                                .map(x => x.value)
                                .filter(r => r !== undefined)
                                .reduce((a, b) => a + b, 0)
                                ctx.commit('updatePointsUser', pointsUser)

                            } else {
                                const pointsUser = true
                                ctx.commit('updatePointsUser', pointsUser)
                            }

                            const dataReferral = [].concat(...dataRef).find(i => i == result.uid)

                            ctx.commit('updateDataReferral', dataReferral)

                            const usersData = Object.keys(users).filter(i => i == result.uid).map(key => {
                                return {
                                    id: key,
                                    ...users[key]
                                }
                            })
                                                
                            if(usersData[0]['referral']) {
                                const usersReferral = Object.keys(usersData[0]['referral']).map(key => {
                                    return {
                                        id: key,
                                        ...usersData[0]['referral'][key]
                                    }
                                })
                                ctx.commit('updateUsersData', usersReferral)
                            } else {

                                const usersReferral = ''
                                ctx.commit('updateUsersData', usersReferral)
                            }
                            
                        })
                    })
                })
                         
            },
            logout() {
                firebase.auth().signOut()
                    .then(() => {
                    Notify.create({message: 'Sign Out Success.', color: 'green'})
                    this.$router.go(this.$router.currentRoute)
                })
                .catch(error =>  console.log('error',error))
        
            },
            google() {
                const provider = new firebase.auth.GoogleAuthProvider()
                firebase.auth().signInWithPopup(provider)
                .then(auth => {
                    const userId = auth.user.uid
                    const email = auth.user.email
                    const db = getDatabase();
        
                    update(ref(db, 'users/' + userId), {email: email});
                    
                    Notify.create({message: 'Sign In Success.', color: 'green'})
                })
                .catch(error => console.log('error',error))
            },

        },
        mutations: {
            updateAuthentication(state, result) {
                state.user = result.displayName
                state.email = result.email
                state.photoUrl = result.photoURL
                state.uid = result.uid
            },
            updateAuthenticationRole(state, getIdTokenResult) {
                state.role = getIdTokenResult.claims.role
            },
            updateUsersData(state, usersReferral) {
                state.usersData = usersReferral
            },
            updateDataReferral(state, dataReferral) {
                state.dataReferral = dataReferral
            },
            updatePointsUser(state, pointsUser) {
                state.pointsUser = pointsUser
            },
            updateDataVotesUser(state, dataVotesUser) {
                state.dataVotesUser = dataVotesUser
            }
        },
        getters: {
            role(state) {
                return state.role
            },
            user(state) {
                return state.user
            },
            email(state) {
                return state.email
            },
            photoUrl(state) {
                return state.photoUrl
            },
            uid(state) {
                return state.uid
            },
            users(state) {
                return state.usersData
            },
            dataReferral(state) {
                return state.dataReferral
            },
            pointsUser(state) {
                return state.pointsUser
            },
            dataVotesUser(state) {
                return state.dataVotesUser
            }
        },
  }