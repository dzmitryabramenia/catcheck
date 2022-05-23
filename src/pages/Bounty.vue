<template>

<div class="container q-pa-lg bg-body" id="block1">


<h1 class="text-center">Bounty program CatCheck.org</h1>

    <q-card bordered class="q-ma-md q-pa-lg row blockEcosystem">
        <div class="col-md-2 col-sm-12 q-pa-md">
            <q-icon name="cake" class="bg-icon" style="font-size: 9rem;" />
        </div>
        <div class="col-md-10 col-sm-12">

            <p>
              Get from 100 to 10 000 points per video (depends on views), according to our estimates it is about $10-$100, but this 
              is rough and not accurate, since we are now making strategic partnerships and in the process of making our tokenomics 
              and plans, but as we said we believe that giving out large sums at the start of the project like 
              <a href="https://uniswap.org/" target="_blank" rel="noopener noreferrer">UNISWAP</a>, 
              <a href="https://app.1inch.io/#/1/swap/ETH/DAI" target="_blank" rel="noopener noreferrer">1INCH</a>, 
              <a href="https://godsunchained.com/" target="_blank" rel="noopener noreferrer">GODS UNCHAINED</a> will give viral marketing and coverage. But we can not promise anything for 100%, the marketing strategy and 
              tokenomics are in development so the payouts may be much lower, or much higher than announced.
            </p>
            <p>Video bounty ambassador rules make an overview of the catcheck project, tell your viewers how to add tokens and their 
                events on the web-site, how to update information, how to inform that the event has ended and the link is no longer active, 
                open a dispute on top events, vote, tell me about the exchange of earned points on tokens catch after listing. Speak about 
                the referral program for INVITECODE and the income from each invited user. All the above information is in the 
                <router-link to="/faq">FAQ.</router-link>
                You can make up to 9 videos for each of the queries, tags below Use 1 of the queries of your choice in the video titles 
                catcheck review | manual guide yield farming | yield farming crypto | staking crypto | staking cryptocurrency whitelist 
                | how to get whitelisted | how to get whitelisted nft presale crypto | new crypto presale | presale token | testnet 
                airdrop | crypto nodes | testing crypto games | airdrop crypto | airdrop token | free airdrop | crypto giveaway crypto 
                affiliate program | crypto affiliate marketing website | referral program ambassador crypto masternode.
            </p>

            <p>Make sure you make a catcheck rewiew video first, and in your subsequent videos explain what is whitelist, airdrop, 
                presale, yield farming staking, testnet , crypto affiliate program, ambassador crypto and masternode. You can find it 
                and filter on the web-site catcheck , show in the video how to do it , as well as add new projects and earn money on the 
                web-site. How to earn on the web-site watch in my video catcheck rewiew Under all videos leave the tag #catcheck and 
                a tag with the subject of the video from the list and information <router-link to="/">https://catcheck.org/</router-link>
            </p>
                <b>INVITECODE</b><br>
                <a href="https://twitter.com/catcheck_org" target="_blank" rel="noopener noreferrer">https://twitter.com/catcheck_org</a><br>
                <a href="https://t.me/catcheck_org" target="_blank" rel="noopener noreferrer">https://t.me/catcheck_org</a><br>
                <a href="https://discord.com/invite/S7fVnY6snN" target="_blank" rel="noopener noreferrer">https://discord.com/invite/S7fVnY6snN</a><br>
                youtube (comming soon)<br>
                medium (comming soon)<br><br>
            <p>Send a link to the video to catcheck.org@gmail.com specify the email you used when you registered on the web-site 
                and we will add points to your account
            </p>

            <p>Shooting rules: please understand the project, well read all the faq and sections of the web-site and watch all 
                the videos in faq (if we added them) , make a review with an understanding of the project and its goals, we will 
                credit points, depending on the quality of the video and understanding, the number of views. If we consider that 
                you poorly understood the project and thoughtlessly give unreliable information about the project, on the fly 
                reading and understanding, you will not get anything.
            </p>

        </div>
    </q-card>
</div>
</template>

<script>
import { createMetaMixin } from 'quasar'

const metaData = {
  // sets document title
  title: 'Testnet CatCheck.org',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title}`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'In the first phase of the testnet, we will add power and adjust the functioning of all the nodes of the site, adjust the functioning of the web-site without bugs, as well as add a referral program and launch our secret product' },
  }
}

export default {
  mixins: [
    createMetaMixin(metaData)
  ]
}
</script>

<style scoped>
.my-card {
  padding: 0px 0;
  width: 100%;

}
.blockEcosystem{
  max-width: 1600px;
  margin: 0 auto;
}
.my-card-section {
    min-height: 480px
}
h1 {
    font-size: 2.4rem;
}

.card-about{
    min-height: 530px;
    max-width: 500px;
}
.icon-top-labs{
    margin-top: 16%;
    text-align: center;
}
.icon-top-pad{
    margin-top: 12%;
    text-align: center;
}

</style>