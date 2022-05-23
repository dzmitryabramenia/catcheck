<template>

<div class="container q-pa-lg bg-body" id="block1">


<h1 class="text-center">There is the first stage of the testnet on catcheck.org</h1>

    <q-card bordered class="q-ma-md q-pa-lg row blockEcosystem">
        <div class="col-md-2 col-sm-12 q-pa-md">
            <q-icon name="miscellaneous_services" class="bg-icon" style="font-size: 9rem;" />
        </div>
        <div class="col-md-10 col-sm-12">

            <p>
              Complete various actions on the site and get POINTS, which will be exchanged for 6,000,000 CATCH tokens. Tokens will 
              be unlocked within 12 months after listing each month at 8.33%, tokens will be distributed in % ratio, to the earned 
              POINTS. The price per 1 token will be known in the near future, stay tuned to the news of the project. 
            </p>
            <p>You will receive POINTS for:
                <ul>
                  <li>Add tokens = 500 POINTS <router-link to="/faq#how-to-add-token">https://catcheck.org/faq#how-to-add-token</router-link></li>
                  <li>If you add a strong project with a good event = 2500 POINTS (TOP Events - this means good chances to get into the whitelist, 
                  with good funds on board from 0.5% , or good chances to win an airdrop from 1%, or good conditions for staking a fundamental 
                  strong project, and other events with good profit)</li>
                  <li>Add event tokens = 250 PONTS <router-link to="/faq#how-to-add-token-event">https://catcheck.org/faq#how-to-add-token-event</router-link></li>
                  <li>Voting 1 POINTS (limited)</li>
                  <li>Report that the token event has ended = 100POINTS <router-link to="/faq#how-to-report-that-the-token-event-has-ended">https://catcheck.org/faq#how-to-report-that-the-token-event-has-ended</router-link></li>
                  <li>You can earn POINTS in the referral program, you will receive 10% of your referral's income, read more here</li>
                  <li>You can earn POINTS for your video bounty company, read more here</li>
                </ul>
            </p>

            <p>We are working on a lot of products and features for which we will also charge POINTS.</p>

            <p>After listing, we will continue to charge POINTS for work on the site and exchange them for CATCH tokens.</p>

            <p>When you add a token or event, you can add your referral link, the link will remain on the site forever and you will get free new referrals ( stay tuned for news about link rotation, and the sale of referral spots)</p>

            <p>Please note: Due to the recent launch of the testnet, some functions of the site and charging tokens may temporarily work incorrectly.</p> 

            <p>Attention: No suspicious scam projects can not be added, if your project is not added to the site after moderation, it is not good enough, according to our analysts-moderators.</p> 

            <p>If there are any questions, you can ask them in our social networks or chat box site!</p>
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