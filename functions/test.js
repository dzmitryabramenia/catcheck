const TwitterApi = require('twitter-api-v2').default;
const client = new TwitterApi({
    appKey: "luC10Xvf0ew5FfD0NuuY9xeFO",
    appSecret: "JX3JKQktgeKVuRBNLVcNoljqndXxHrzbylk8faBeQlUuGkoxeX",
    accessToken: "1478400670269067265-6I7h4eetsTsWsbnTXZOBgtnyYchwxS",
    accessSecret: "R5PsmVe3M7PgrauhuMReMSQMESvlCUBbnRu2uSSUKAcxA"
});

const data = {
"-MuUsXZboPFU8n0zlN9T":{
    "twitterId":"1483817657203892224"
},
"-MuUsXZboPFU8n0zldsf":{
    "twitterId":"1826201"
}
}
const dataObject = Object.keys(data).map(key => {
    return {
        id: key,
        ...data[key]
    }
})

const checkTimeTwitter = {
    checkTimeTwitter: Date.now(),
    followers_count: followers.data.public_metrics.followers_count,
    following_count: followers.data.public_metrics.following_count,
    tweet_count: followers.data.public_metrics.tweet_count,
    listed_count: followers.data.public_metrics.listed_count

}
const data = Object.assign(followers.data, checkTimeTwitter) 

console.log('dataObject', dataObject)


