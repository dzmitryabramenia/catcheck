<template>

<div class="container q-pa-lg bg-body" id="block1">

  <div class='light x1'></div>
  <div class='light x2'></div>
  <div class='light x3'></div>
  <div class='light x4'></div>
  <div class='light x5'></div>
  <div class='light x6'></div>
  <div class='light x7'></div>
  <div class='light x8'></div>
  <div class='light x9'></div>

<h4 class="text-center">CATCH is a token that unites an ecosystem of 3 products:</h4>

<div class="row flex q-pt-lg flex-center">
  <q-card class="my-card q-ma-lg" flat bordered >
      <q-card-section class="col-4 q-pa-lg bg-primary text-white my-card-section">
        <h4 class="text-center q-my-lg">CATCHECK.ORG</h4>
        <q-separator inset dark />
        <p class="q-mt-lg">any user or creator of a project gets CATCH tokens for :</p>
            <ul>
                <li>adding tokens to the web-site with their events (presale, whitelist, testnet, bounty(ambassador), airdrop)</li>
                <li>promptly updating or correcting the information.</li>
                <li>voting for the best events in their opinion: where you can get a good chance to be on presale whitelist, or win an airdrop, or participate in testinet, or advertising the best project in their opinion.</li>
            </ul>
      </q-card-section>
  </q-card>
  <q-card class="my-card q-ma-lg" flat bordered>
      <q-card-section class="col-4 q-pa-lg bg-primary text-white my-card-section">
          <h4 class="text-center q-my-lg">CATCH LABS</h4>
            <q-separator inset dark />
            <p class="q-mt-lg">is our venture capital fund, we help projects to launch before their public-sale</p>
                <ul>
                    <li>Advising</li>
                    <li>Tokenomics</li>
                    <li>Strategic partnerships</li>
                    <li>Promotion</li>
                    <li>Influencers</li>
                </ul>
            <p class="q-mt-lg">More info can be found here <router-link to="/catchlabs">https://catcheck.org/catchlabs</router-link>.</p>
      </q-card-section>
  </q-card>
  <q-card class="my-card q-ma-lg" flat bordered>
      <q-card-section class="col-4 q-pa-lg bg-primary text-white my-card-section">
        <h4 class="text-center q-my-lg">CATCHPAD</h4>
          <q-separator inset dark />
          <p class="q-mt-lg">is now in development, this launchpad will be embedded into our website catcheck.org. Token holders or loyal users of the web- site are likely to win allocations in pre-sales of top projects.
          </p>
          <p class="q-mt-lg">We will provide services for projects:
          </p>
              <ul>
                  <li>Smart Contract Audit</li>
                  <li>KYC</li>
                  <li>Liquidity lock</li>
                  <li>Vesting</li>
                  <li>Many other services</li>
              </ul>
      </q-card-section>
  </q-card>
</div>

    <q-card class="q-ma-md q-pa-lg row bg-primary blockEcosystem">
        <div class="col-md-2 col-sm-12 q-pa-md">
            <q-icon name="fas fa-recycle" class="bg-icon" style="font-size: 9rem;" />
        </div>
        <div class="col-md-10 col-sm-12">
            <p>All ecosystem products will be useful for any projects at pre-presale stage, payment for all services will be made in CATCH token, then part of these tokens will be forwarded to pay, voting, updating and adding tokens, as well as to web-site moderators for their work.</p> 
            <p>The main goal of CATCH is to collect all information about projects' tokens and events in one place, this way any market participant - investor, influencer, updater, tester can find all projects on pre-sale stage, and information about their events at one convenient web-site.
            And projects, in turn, would get good coverage and new loyal supporters of their project. </p>
        </div>
    </q-card>
</div>
</template>

<script>
import { createMetaMixin } from 'quasar'

const metaData = {
  // sets document title
  title: 'Catch Labs - platform for cryptocurrency projects',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title}`,

  // meta tags
  meta: {
    description: { name: 'description', content: 'The main goal of CATCH is to collect all information about projects tokens and events in one place, this way any market participant - investor, influencer, updater, tester can find all projects on pre-sale stage, and information about their events at one convenient web-site.' },
  }
}

export default {
  mixins: [
    createMetaMixin(metaData)
  ]
}
</script>



<style scoped>

h4, h5, p, li, a {
  color: #fff;
}
.my-card {
  padding: 0px 0;
  width: 100%;
  max-width: 500px;
  font-size: 1.1rem;
}
.blockEcosystem{
  max-width: 1600px;
  margin: 0 auto;
}
.my-card-section {
    min-height: 480px
}
.container{
    font-size: 1.1rem;
}
.bg-body{
    background-color: #f1f2f3;
}
.bg-icon{
   color: #f1f2f3;
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

#block1, #block2, #block3 {
    background: radial-gradient(rgb(43, 60, 68), rgb(20, 27, 31));


}

 .light {
    position: absolute;
    width: 0px;
    opacity: .75;
    background-color: white;
    box-shadow: #e9f1f1 0px 0px 20px 2px;
    opacity: 0;
    top: 100vh;
    bottom: 0px;
    left: 0px;
    right: 0px;
    margin: auto;
}

.x1{
  -webkit-animation: floatUp 4s infinite linear;
  -moz-animation: floatUp 4s infinite linear;
  -o-animation: floatUp 4s infinite linear;
  animation: floatUp 4s infinite linear;
   -webkit-transform: scale(1.0);
   -moz-transform: scale(1.0);
   -o-transform: scale(1.0);
  transform: scale(1.0);
}

.x2{
  -webkit-animation: floatUp 7s infinite linear;
  -moz-animation: floatUp 7s infinite linear;
  -o-animation: floatUp 7s infinite linear;
  animation: floatUp 7s infinite linear;
  -webkit-transform: scale(1.6);
  -moz-transform: scale(1.6);
  -o-transform: scale(1.6);
  transform: scale(1.6);
  left: 15%;
}

.x3{
  -webkit-animation: floatUp 2.5s infinite linear;
  -moz-animation: floatUp 2.5s infinite linear;
  -o-animation: floatUp 2.5s infinite linear;
  animation: floatUp 2.5s infinite linear;
  -webkit-transform: scale(.5);
  -moz-transform: scale(.5);
  -o-transform: scale(.5);
  transform: scale(.5);
  left: -15%;
}

.x4{
  -webkit-animation: floatUp 4.5s infinite linear;
  -moz-animation: floatUp 4.5s infinite linear;
  -o-animation: floatUp 4.5s infinite linear;
  animation: floatUp 4.5s infinite linear;
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
  left: -34%;
}

.x5{
  -webkit-animation: floatUp 8s infinite linear;
  -moz-animation: floatUp 8s infinite linear;
  -o-animation: floatUp 8s infinite linear;
  animation: floatUp 8s infinite linear;
  -webkit-transform: scale(2.2);
  -moz-transform: scale(2.2);
  -o-transform: scale(2.2);
  transform: scale(2.2);
  left: -57%;
}

.x6{
  -webkit-animation: floatUp 3s infinite linear;
  -moz-animation: floatUp 3s infinite linear;
  -o-animation: floatUp 3s infinite linear;
  animation: floatUp 3s infinite linear;
  -webkit-transform: scale(.8);
  -moz-transform: scale(.8);
  -o-transform: scale(.8);
  transform: scale(.8);
  left: -81%;
}

.x7{
  -webkit-animation: floatUp 5.3s infinite linear;
  -moz-animation: floatUp 5.3s infinite linear;
  -o-animation: floatUp 5.3s infinite linear;
  animation: floatUp 5.3s infinite linear;
  -webkit-transform: scale(3.2);
  -moz-transform: scale(3.2);
  -o-transform: scale(3.2);
  transform: scale(3.2);
  left: 37%;
}

.x8{
  -webkit-animation: floatUp 4.7s infinite linear;
  -moz-animation: floatUp 4.7s infinite linear;
  -o-animation: floatUp 4.7s infinite linear;
  animation: floatUp 4.7s infinite linear;
  -webkit-transform: scale(1.7);
  -moz-transform: scale(1.7);
  -o-transform: scale(1.7);
  transform: scale(1.7);
  left: 62%;
}

.x9{
  -webkit-animation: floatUp 4.1s infinite linear;
  -moz-animation: floatUp 4.1s infinite linear;
  -o-animation: floatUp 4.1s infinite linear;
  animation: floatUp 4.1s infinite linear;
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
  -o-transform: scale(0.9);
  transform: scale(0.9);
  left: 85%;
}


@-webkit-keyframes floatUp{
  0%{top: 100vh; opacity: 0;}
  25%{opacity: 1;}
  50%{top: 0vh; opacity: .8;}
  75%{opacity: 1;}
  100%{top: -100vh; opacity: 0;}
}
@-moz-keyframes floatUp{
  0%{top: 100vh; opacity: 0;}
  25%{opacity: 1;}
  50%{top: 0vh; opacity: .8;}
  75%{opacity: 1;}
  100%{top: -100vh; opacity: 0;}
}
@-o-keyframes floatUp{
  0%{top: 100vh; opacity: 0;}
  25%{opacity: 1;}
  50%{top: 0vh; opacity: .8;}
  75%{opacity: 1;}
  100%{top: -100vh; opacity: 0;}
}
@keyframes floatUp{
  0%{top: 100vh; opacity: 0;}
  25%{opacity: 1;}
  50%{top: 0vh; opacity: .8;}
  75%{opacity: 1;}
  100%{top: -100vh; opacity: 0;}
}


@-webkit-keyframes fadeIn{
  from{opacity: 0;}
  to{opacity: 1;}
}

@-moz-keyframes fadeIn{
  from{opacity: 0;}
  to{opacity: 1;}
}

@-o-keyframes fadeIn{
  from{opacity: 0;}
  to{opacity: 1;}
}

@keyframes fadeIn{
  from{opacity: 0;}
  to{opacity: 1;}
}

@-webkit-keyframes fadeOut{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 0;}
}

@-moz-keyframes fadeOut{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 0;}
}

@-o-keyframes fadeOut{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 0;}
}

@keyframes fadeOut{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 0;}
}

@-webkit-keyframes finalFade{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 1;}
}

@-moz-keyframes finalFade{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 1;}
}

@-o-keyframes finalFade{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 1;}
}

@keyframes finalFade{
  0%{opacity: 0;}
  30%{opacity: 1;}
  80%{opacity: .9;}
  100%{opacity: 1;}
}
</style>