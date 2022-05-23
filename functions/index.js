const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const TwitterApi = require('twitter-api-v2').default;
const client = new TwitterApi({
    appKey: process.env.APP_KEY_TWITTER,
    appSecret: process.env.APP_SECRET_TWITTER,
    accessToken: process.env.ACCESS_TOKEN_TWITTER,
    accessSecret: process.env.ACCESS_SECRET_TWITTER,
});
const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID_TWITTER,
    clientSecret: process.env.CLIENT_SECRET_TWITTER,
  })
const dbRef = admin.firestore().doc('tokens/demo')
const callbackURL = 'http://127.0.0.1:5001/catcheckorg-34caf/us-central1/callback'

exports.twitterUpdateId = functions.database.ref('token/{tokenId}/twitter/twitterId')
    .onWrite((snapshot, context) => {
        // Function deletes twitterStatistics token data when TwitterId changes
        admin.database().ref(`twitterStatistics/${context.params.tokenId}`).remove()
    })

exports.twitterPercentageDays = functions.database.ref('/twitterStatistics/{tokenId}')
    .onWrite((snapshot, context) => {
    try{
        if(Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 2]) {
            const oneIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 1].followers_count
            const twoIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 2].followers_count
            const result = (oneIndex - twoIndex) / twoIndex * 100
            admin.database().ref(`token/${context.params.tokenId}/twitter`).update({'twitterPercentage1Day': result})
          }
          if(Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 10]) {
            const oneIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 1].followers_count
            const tenIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 10].followers_count
            const result = (oneIndex - tenIndex) / tenIndex * 100        
            admin.database().ref(`token/${context.params.tokenId}/twitter`).update({'twitterPercentage10Days': result})
          }
          if(Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 20]) {
            const oneIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 1].followers_count
            const twentyIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 20].followers_count
            const result = (oneIndex - twentyIndex) / twentyIndex * 100        
            admin.database().ref(`token/${context.params.tokenId}/twitter`).update({'twitterPercentage20Days': result})
          }
          if(Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 30]) {
            const oneIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 1].followers_count
            const thirtyIndex = Object.values(snapshot.after._data)[Object.values(snapshot.after._data).length - 30].followers_count
            const result = (oneIndex - thirtyIndex) / thirtyIndex * 100        
            admin.database().ref(`token/${context.params.tokenId}/twitter`).update({'twitterPercentage30Days': result})
          }
          return null
    } catch(e) {
        console.log(e)
    }
      
    });


exports.twitterCheckFollowersCounter = functions.pubsub.schedule('0 2 * * *')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    const data = await admin.database().ref(`token`).get()
    const dataObject = Object.keys(data.val()).map(key => {
        return {
            id: key,
            ...data.val()[key]
        }
    })
    async function twitterApi(twit) {
        try{
            if(twit.twitter.twitterId) {
                const followers =  await client.v2.user(`${twit.twitter.twitterId}`, {'user.fields': ['public_metrics', 'created_at', 'location', 'verified']})
                return admin.database().ref(`/token/${twit.id}/twitter`).update({
                    twitterName: followers.data.name,
                    twitterUsername: followers.data.username,
                    twitterCreatedAt: followers.data.created_at,
                    twitterVerified: followers.data.verified,
                    twitterFollowersCount: followers.data.public_metrics.followers_count,
                    twitterFollowingCount: followers.data.public_metrics.following_count,
                    twitterTweetCount: followers.data.public_metrics.tweet_count,
                    twitterListedCount: followers.data.public_metrics.listed_count
              }).then(() => {
                return admin.database().ref(`/twitterStatistics/${twit.id}`).push({
                    checkTimeTwitter: Date.now(),
                    followers_count: followers.data.public_metrics.followers_count,
                    following_count: followers.data.public_metrics.following_count,
                    tweet_count: followers.data.public_metrics.tweet_count,
                    listed_count: followers.data.public_metrics.listed_count
                })
              })
            }
        } catch(e) {
            console.log('Error:', e)
        }
    }
    
    function showNumbers(num) {
        if(num < dataObject.length) {
            twitterApi(dataObject[num])
            setTimeout(showNumbers, 3000, ++num) 
        }
    }
    setTimeout(showNumbers, 2000, 0)
});


exports.twitterCheckURL = functions.https.onCall((data, context) => {
    const twitUsername = data.split('/').pop()
    const twitRequest =  client.v2.userByUsername(`${twitUsername}`)
    return twitRequest
})

exports.addTraineeRole = functions.https.onCall((data, context) => {
    if(context.auth.token.moderator == true ||
        context.auth.token.admin == true ||
        context.auth.token.founder == true) {
            // get user and add custom claim (trainee)
            return admin.auth().getUserByEmail(data.email).then(user => {
                return admin.auth().setCustomUserClaims(user.uid, {
                    role: "Trainee",
                    trainee: true,
                    admin: false,
                    moderator: false,
                    founder: false,
                    ownerToken: false
                })
            }).then(() => {
                return {
                    message: `Success! ${data.email} has been made an Trainee`
                }
            }).catch(err => {
                return err
            })
    } else {
        return {error: 'Only admins can add other trainee, sucker' }
    }
})

exports.addModeratorRole = functions.https.onCall((data, context) => {
    if(context.auth.token.admin == true ||
        context.auth.token.founder == true) {
            // get user and add custom claim (moderator)
        return admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                role: "Moderator",
                trainee: false,
                admin: false,
                moderator: true,
                founder: false,
                ownerToken: false
            })
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an Moderator`
            }
        }).catch(err => {
            return err
        })
    } else {
        return {error: 'Only admins can add other Moderator, sucker' }
    }
})

exports.addAdminRole = functions.https.onCall((data, context) => {
    if(context.auth.token.founder == true) {
    // get user and add custom claim (admin)
        return admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                role: "Admin",
                trainee: false,
                admin: true,
                moderator: false,
                founder: false,
                ownerToken: false
            })
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an Admin`
            }
        }).catch(err => {
            return err
        })
    } else {
        return {error: 'Only Founder can add other Admin, sucker' }
    }
})

exports.addFounderRole = functions.https.onCall((data, context) => {
    if(context.auth.token.founder == true) {
    // get user and add custom claim (founder)
        return admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                role: "Founder",
                trainee: false,
                admin: false,
                moderator: false,
                founder: true,
                ownerToken: false
            })
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an Founder`
            }
        }).catch(err => {
            return err
        })
    } else {
        return {error: 'Only Founder can add other Founder, sucker' }
    }
})

exports.addOwnerTokenRole = functions.https.onCall((data, context) => {
    if(context.auth.token.moderator == true ||
        context.auth.token.admin == true ||
        context.auth.token.founder == true) {
    // get user and add custom claim (OwnerToken)
        return admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                role: "Owner Token",
                trainee: false,
                admin: false,
                moderator: false,
                founder: false,
                ownerToken: true
            })
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an Owner Token`
            }
        }).catch(err => {
            return err
        })
    } else {
        return {error: 'Only Founder can add other Owner Token, sucker' }
    }
})

exports.deleteEmployeer = functions.https.onCall((data, context) => {
    if(context.auth.token.founder == true) {
    // get user and add custom claim (Delete Employee)
        return admin.auth().getUserByEmail(data.email).then(user => {
            return admin.auth().setCustomUserClaims(user.uid, {
                role: 'User',
                trainee: false,
                admin: false,
                moderator: false,
                founder: false,
                ownerToken: false
            })
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an Delete Employeer`
            }
        }).catch(err => {
            return err
        })
    } else {
        return {error: 'Only Founder can add other Delete Employeer, sucker' }
    }
})

exports.auth = functions.https.onRequest(async (request, response) => {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
      callbackURL,
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );
    await dbRef.set({ codeVerifier, state });
    response.redirect(url);
  });

exports.callback = functions.https.onRequest(async (request, response) => {
    const { state, code } = request.query
    const dbSnapshot = await dbRef.get()
    const { codeVerifier, state: storedState } = dbSnapshot.data()
    if(state !== storedState) {
        return response.status(400).send('Stored tokens do not match!')
    }
    const {client: loggedClient, accessToken, refreshToken} = await twitterClient.loginWithOAuth2({
        code,
        codeVerifier,
        redirectUri: callbackURL
    })
    await dbRef.set({ accessToken, refreshToken })
    response.sendStatus(200)
})

exports.tweet = functions.https.onRequest( async (request, response) => {
    const { refreshToken } = (await dbRef.get()).data()
    const { client: refreshedClient, accessToken, refreshToken: newRefreshToken 
    } = await twitterClient.refreshOAuth2Token(refreshToken)
    await dbRef.set({ accessToken, refreshToken: newRefreshToken })
    const { data } = await refreshedClient.v2.tweet('Hello World')
    response.send(data)
})