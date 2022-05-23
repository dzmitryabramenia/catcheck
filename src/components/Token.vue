<template>

    <SkeletonTokenPage v-if="tokens.length == 0" />

    <div class="container" v-for="token in tokens" :key="token.id">
        
    <div class="row ">
      <div class="col-xs-12 col-sm-12 col-md-8">
            <q-card class="q-ma-md q-pa-md">
                <q-card-section>
                    <div class="flex">
<!-- Button IMG -->
                        <img
                            loading="lazy"
                            style="height: 50px; width: 50px"
                            spinner-color="primary"
                            :src="`${token.imgUrl}`"
                            :alt="`${token.name} token`"
                            class="q-ma-md"
                        />
            <!-- name -->
                        <h1 class="bold q-ma-md">{{ token.name }}</h1>
                    </div>
                </q-card-section>
<!-- description -->
                <q-card-section v-if="token.text">
                    <div v-html="token.text"></div>
                </q-card-section>
            </q-card>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4">
            <q-card class="q-ma-md q-pa-md row flex">
                <q-card-section key="symbol" class="flex flex-center q-pa-md q-ma-sm">
                    <h5 class="q-my-xs q-mr-md">Vote for this token : &nbsp;</h5>
                        <q-btn
                        :disabled="disabledButtonVotes(dataVotesUser[token.id])"
                        :loading="submitting"
                        class="button-margin"
                        color="yellow-12"
                        text-color="primary"
                        icon="keyboard_arrow_up"
                        @click.stop="couterVotes(token.id, token.votes)"
                        >&nbsp;{{ token.votes }}
                  </q-btn>
                </q-card-section>
            </q-card>
            <q-card class="q-ma-md q-pa-md">
              <div id="chart">
                <apexchart type="area" height="350" :options="chartOptions" :series="series"></apexchart>
              </div>
            </q-card>
            <q-card class="q-ma-md q-pa-md">
<!-- Banner -->         
                <div>
                  <a href="https://gleam.io/mqR6c/globula-is-a-mobile-movetoearn-ar-metaverse-with-a-hardcore-scifi-fabula" 
                    target="_blank" 
                    rel="noopener noreferrer nofollow"
                    >
                    <video 
                      style="width: 100%"
                      src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/banners%2FCatchlab%20Banner.webm?alt=media&token=6b9fa430-811a-4c73-a81a-9029cd65c4c1" 
                      loop
                      autoplay
                      poster="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/banners%2Fglobula-banner.webp?alt=media&token=413faf03-347d-4331-bd86-6066e0133f31"
                      >
                      </video>
                    </a>
                </div>
            </q-card>
            <q-card class="q-ma-md q-pa-md row flex">
<!-- symbol -->
                <q-card-section key="symbol" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Symbol:&nbsp;</span>
                    {{ token.symbol }}
                </q-card-section>
<!-- chain -->
                <q-card-section key="chain" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Chain:&nbsp;</span>
                    {{ token.chain }}
                </q-card-section>
<!-- category -->
                <q-card-section key="category" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Category:&nbsp;</span>
                    {{ token.category }}
                </q-card-section>
<!-- presale -->
                <q-card-section key="dateLaunch" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Presale:&nbsp;</span>
                    {{ token.dateLaunch == 'NoN' ? 'NoN' :  new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                }).format(new Date(token.addTokenTime)) }}
                </q-card-section>
<!-- whiteList -->
                <q-card-section key="whiteList" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">WhiteList:&nbsp;</span>
                    {{ token.whiteList }}
                </q-card-section>
<!-- airdrop -->
                <q-card-section key="airdrop" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Airdrop:&nbsp;</span>
                    {{ token.airdrop }}
                </q-card-section>
<!-- bounty -->
                <q-card-section key="bounty" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Bounty:&nbsp;</span>
                    {{ token.bounty }}
                </q-card-section>
<!-- testnet -->
                <q-card-section key="testnet" class="flex flex-center q-pa-md q-ma-sm">
                    <span class="bold">Testnet:&nbsp;</span>
                    {{ token.testnet }}
                </q-card-section>
<!-- address -->
                <q-card-section key="address" v-if="token.address" class="flex flex-center q-pa-md q-ma-sm">
                    <div class="wordWrapBreak flex items-center">
                        <span class="bold">Address:&nbsp;</span>
                        <span>{{ token.address }}</span>
                    </div>
                </q-card-section>
            </q-card>
            <q-card class="q-ma-md q-pa-md row flex">
<!-- website -->
                <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fas fa-globe" label="Website" />
                </a>        
<!-- telegram -->
                <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                </a>
<!-- twitter -->
                <a class="linkButtonDisplayBlock" v-if="token.twitter.twitterLink" :href="`${token.twitter.twitterLink}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-twitter" label="Twitter" />
                </a>
<!-- discord -->
                <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-discord" label="Discord" />
                </a>
<!-- facebook -->
                <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
                </a>
<!-- instagram -->
                <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-instagram" label="Instagram" />
                </a>
<!-- medium -->
                <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-medium-m" label="Medium" />
                </a>
<!-- reddit -->
                <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                </a>
<!-- twitch -->
                <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-twitch" label="Twitch" />
                </a>
<!-- youtube -->
                <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-youtube" label="Youtube" />
                </a>
<!-- linkedin -->
                <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                </a>
<!-- github -->
                <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                    <q-btn class="q-ma-md" color="primary" icon="fab fa-github-alt" label="Github" />
                </a>
            </q-card>

            <q-card v-if="token.addLinkReferralToken" class="q-ma-md q-pa-md">
<!-- Referral Token -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Referral Token:&nbsp;
                            <a :href="`${token.addLinkReferralToken}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Referral"
                                    color="primary" 
                                    class="q-ma-md"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'referral')"
                            icon-right="support"
                            :label="token.declareNotWorkingReferralTokenLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingReferralTokenLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionReferralToken" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Referral Token: </strong>
                        <p v-html="token.descriptionReferralToken"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

            <q-card v-if="token.addLinkReferralBounty" class="q-ma-md q-pa-md">
<!-- Referral Bounty -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Bounty:&nbsp;
                            <a :href="`${token.addLinkReferralBounty}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Bounty"
                                    color="primary" 
                                    class="q-ma-md"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'bounty')"
                            icon-right="support"
                            :label="token.declareNotWorkingBountyLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingBountyLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionBounty" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Bounty: </strong>
                        <p v-html="token.descriptionBounty"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

            <q-card v-if="token.addLinkReferralAirdrop" class="q-ma-md q-pa-md">
<!-- Referral Airdrop -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Airdrop:&nbsp;&nbsp;&nbsp;
                            <a :href="`${token.addLinkReferralAirdrop}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Airdrop"
                                    color="primary" 
                                    class="q-ma-md iconLinkWebsiteTextDecoration"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'airdrop')"
                            icon-right="support"
                            :label="token.declareNotWorkingAirdropLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingAirdropLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionAirdrop" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Airdrop: </strong>
                        <p v-html="token.descriptionAirdrop"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

            <q-card v-if="token.addLinkReferralWhitelist" class="q-ma-md q-pa-md">
<!-- Referral Whitelist -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Whitelist:&nbsp;
                            <a :href="`${token.addLinkReferralWhitelist}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Whitelist"
                                    color="primary" 
                                    class="q-ma-md iconLinkWebsiteTextDecoration"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'whitelist')"
                            icon-right="support"
                            :label="token.declareNotWorkingWhitelistLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingWhitelistLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionWhitelist" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Whitelist: </strong>
                        <p v-html="token.descriptionWhitelist"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

            <q-card v-if="token.addLinkReferralTestnet" class="q-ma-md q-pa-md">
<!-- Referral Testnet -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Testnet:&nbsp;
                            <a :href="`${token.addLinkReferralTestnet}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Testnet"
                                    color="primary" 
                                    class="q-ma-md iconLinkWebsiteTextDecoration"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'testnet')"
                            icon-right="support"
                            :label="token.declareNotWorkingTestnetLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingTestnetLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionTestnet" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Testnet: </strong>
                        <p v-html="token.descriptionTestnet"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

            <q-card v-if="token.addLinkStaking" class="q-ma-md q-pa-md">
<!-- Staking -->         
                <div>
                    <div class="q-px-md row justify-between">
                        <span class="bold">Staking {{token.staking}} %&nbsp;
                            <a :href="`${token.addLinkStaking}`" class="LinkWebsiteTextDecoration" target="_blank" rel="nofollow">
                                <q-btn 
                                    icon-right="link"
                                    label="Open Staking"
                                    color="primary" 
                                    class="q-ma-md iconLinkWebsiteTextDecoration"
                                    target="_blank"
                                />
                            </a>
                        </span>
                        <span>Event ended?
                            <q-btn
                            outline
                            @click="confirmDeclareNotWorkingEventLink(token.id, 'staking')"
                            icon-right="support"
                            :label="token.declareNotWorkingStakingLink == true ? 'Moderation' : 'Report & Earn'" 
                            color="primary" 
                            class="q-ma-md"
                            :loading="submitting"
                            :disabled="token.declareNotWorkingStakingLink == true"
                            />
                        </span>
                    </div>
                    <div v-if="token.descriptionStaking" class="maxWidthCardText">
                        <q-card class="q-ma-sm q-pa-md "><strong>Description Staking: </strong>
                        <p v-html="token.descriptionStaking"></p>
                        </q-card>
                    </div>
                </div>
            </q-card>

      </div>
    </div>

    </div>
    <div class="container">
    <q-card class="q-ma-md q-pa-md">
        <q-list bordered class="rounded-borders">
<!-- How to make money on the catcheck -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="How to make money on the catcheck"
      >
        <q-card>
          <q-card-section>
            <h2>Anyone can make money on catcheck</h2>
            <q-separator class="qSeparator" inset />
            <p>1) when adding projects or events you can leave your referral link and get a large number of referrals especially if the project hits the TOP Events</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fhow-to-make-money-on-the-catcheck.webp?alt=media&token=07e065dd-3c47-4472-b97b-f12047a94961" alt="add link and discription">
            <p>2) When adding projects, you can add a link to guides, articles and videos on any of your social media accounts and web-sites to the description, thus you will get traffic to your resources. We can update the content if we find more quality content. Perhaps, in the future we will pay tokens for writing articles</p>

            <p>3) For every action on the web-site: 
            - adding a token, and its events :<br>
            - presale,<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fpresale.webp?alt=media&token=592e98b2-79fa-4a28-9514-0f41d519065e" alt="presale"> <br>
            - whitelist, <br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fwhitelist.webp?alt=media&token=265d9a19-46ac-4114-a516-f7c78d4e1a7f" alt="whitelist"> <br>
            - airdrop, <br>
            - bounty,<br>
            - testing, <br>
            - referral,<br>
            - farming, <br>
            - for voting, for updating the information: indicate that the project is or is not a TOP Events,<br>
            - report the end of any event<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fevent-ended.webp?alt=media&token=a8204f77-4369-4b42-994b-a4627ad46594" alt="Event ended"> <br>
            for each of the actions above you get catch points, these points can be exchanged for catch tokens.
             Now testnet is going on, after the pre-sale of token and listing we will pay all testers CATCH tokens, 
             which will be embedded in project tokenomics, the more you earn points the more you get tokens, our goal is to 
             reward all project supporters at the start with big payouts and use thus viral marketing, which 
             <a href="https://uniswap.org/" title="uniswap.org" target="_blank">uniswap</a>, <a href="https://app.1inch.io/" title="1inch.io" target="_blank">1inch</a>, 
             <a href="https://godsunchained.com/" title="godsunchained.com" target="_blank">gods unchained</a> and other projects used, in return we will 
             get traffic and users, practice showed that for working 
             products this is good strategy.  But please understand we are not promising anything specifically, it all depends 
             on what funds will invest in us in the early stages of 
             <a href="https://en.wikipedia.org/wiki/Presales#:~:text=Presales%20is%20a%20process%20or,is%20delivered%20to%20the%20customer." title="wikipedia.org" target="_blank">pre-sales</a>
             and other factors when choosing a development 
             strategy for the project, now we are looking for and negotiating strategic partnerships, anyway, our main goal is 
             to pay those who work on the web-site, our community and we are one team.
            </p>
            <p>After the listings, the points accumulated for each month of your work, we will sum up in % ratio and pay catch 
            tokens earned for the previous month, we will take tokens CATCH from the sale of advertising and other services 
            on the web-site (as well as for a good start, probably put additional rewards in tokenomics), after the payment 
            of tokens once a month points will be reset.
            </p>
            <blockquote>
                <p>ATTENTION, IF YOU DO NOT VISIT THE WEB-SITE, THE POINTS WILL BE TAKEN AWAY</p>
            </blockquote>
            <p>4) There will be a ranking system on the web-site, maybe we will give all early and active users 
            high ranks after listing, the higher your rank the higher the payout of CATCH tokens. Also, if 
            you have a high rank you will be able to get tickets to participate in public sales on our 
            CATCHPAD Launchpad.
            </p>
            <p>5) Every project event on the web-site has the potential to get profit</p>
            <ul>
                <li>presale you can find and buy token at presale stage and resell tokens or nft profitably after listing on exchanges.</li>
                <li>whitelist entry in pre-sale stage, if you do not have money to invest you can sell won place ( investment opportunity allocation) 
                    on OTC market, we plan to make this market on our website.</li>
                <li>airdrop free cryptocurrency giveaway, usually for uncomplicated actions in social media</li>
                <li>bounty will suit Influencers, designers . You promote and advertise the project, in return you get tokens of 
                    the project, or the opportunity to buy tokens of the project allocation). If you are a good Influencer 
                    with a large audience, then big money and interesting projects await you</li>
                <li>testing of cryptoproject product, maintaining the node (modern mining), testing demo, alpha version of the game, 
                    application testing , testing SWAP, cross-chain DEFI projects and any other testing of crypto products , 
                    in return you can be paid very big sums in the project tokens</li>
                <li>refferal programs, which you can promote by inviting users to the already working project, you can be paid 
                    with % of income on a permanent basis or one-time payments</li>
                <li>farming is staking or adding tokens to the liquidity pool to generate income, very similar to a deposit in a bank, 
                    it requires your own investment</li>
            </ul>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
<!-- What is catcheck -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="What is catcheck"
      >
        <q-card>
          <q-card-section>
            <h2>What is catcheck</h2>
            <q-separator class="qSeparator" inset />
            <p>Catcheck is token event aggregator site, similar to wikipedia, where each user or project owner can 
            add token and its events: presale, whitelist, airdrop, bounty(ambassador), testnet,refferal, farming.
            </p>
            <p>When adding a token or adding an event on the main page of the web-site, the user can add their 
            referral link in any section of the token or report that the event is over, as well as to vote 
            for a token, open a dispute about whether the event is top or not ( this means that it will probably 
            give a lot of money).
            </p>
            <p>In addition to the ability to add referral links to any section of the project, users get CATCH 
            points for the above activities on the web-site. In case the web-site works perfectly after the 
            testnet and listing, catch points at the end of each month will be exchanged to CATCH tokens, 
            catch tokens will be taken from the sale of services on the web-site. The more catch points you 
            accumulate, the higher your account rank will be, the higher your account rank, the higher the 
            ratio and the higher the payout of CATCH tokens, as well as more tickets for lotteries of places 
            (allocations) in our catchpad public sales.
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
<!-- For project founders -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="For project founders"
      >
        <q-card>
          <q-card-section>
            <h2>For project founders</h2>
            <q-separator class="qSeparator" inset />
            <p>Dear projects' CEO, or managers, adding your project to our web-site you can make an announcement of 
            any event :
                <ul>
                    <li>presale</li>
                    <li>whitelist registration for the presale according to the preliminary list</li>
                    <li>airdrop cryptocurrency giveaway</li>
                    <li>bounty influencers (ambassador, allocation)</li>
                    <li>testing (testnet, masternode, game, site, defi, app testing)</li>
                    <li>refferal program</li>
                    <li>farming (staking, liquidity pools)</li>
                </ul>
            </p>
            <p>
            You will get users' coverage from the catcheck web-site and new supporters for your project, 
            you can also create a free Events Form (gleam) directly on our website  
            by performing tasks of the form, inviting referrals all users will vote for your project, 
            thereby raising it in the rankings of the web-site, so you get a large coverage from our 
            web-site to all events of your project and attention to the project as a whole.
            </p>
            <p>If you have already created events on the gleam web-site, no problem you can simply add a link 
            to your form on a third-party web-site. We also recommend making a post on your social networks 
            to show your project on catcheck and ask your community to vote for your project on catcheck, 
            people will vote and your project will rise in the web-site rankings and get new users from 
            catcheck web-site.
            </p>
            <blockquote>
                <p>Please keep catcheck updated with all your project events</p>
            </blockquote>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
<!-- How to use the web-site -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="How to use the web-site"
      >
        <q-card>
          <q-card-section>
            <h2>How to use the web-site</h2>
            <q-separator class="qSeparator" inset />
            <p>There are many different  filters on the web-site, let's take a detailed look at them</p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Ffilters-Show.webp?alt=media&token=b2baa5a7-3705-4ca8-af15-80a02d9d702e" alt="Filters Show"> <br>
            <p>
            <span style="font-weight:bold">"Filters"</span> - remove filters<br>
            <span style="font-weight:bold">"Show Tooltips"</span> - remove the description of filters and buttons
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fnon.webp?alt=media&token=3d84fbbe-5044-4432-9c28-7575610cecba" alt="NoN"> <br>
            <span style="font-weight:bold">"NoN"</span> - is to exclude all events in the column
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Ftop-events.webp?alt=media&token=b685d6ec-ad7f-47aa-a135-b4bd4e396f7f" alt="TOP Events"> <br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Ftop-events-catch.webp?alt=media&token=5d4e7982-b929-4126-80ae-aec01de173f8" alt="TOP Events Catch"> <br>
            <span style="font-weight:bold">"TOP Events"</span> - are potentially the most profitable events of the project according to our analysts.<br>
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fadded-days.webp?alt=media&token=c9cc4dd3-4f09-4660-8b40-1b9617250323" alt="Added days"> <br>
            <span style="font-weight:bold">"Added days"</span> - with this filter, we can expose fresh, added or edited tokens or their events, attention any editing by the moderator of a token, even deleting a past event, 
            will give you the token as freshly edited for today as it is added.
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fcategory.webp?alt=media&token=85ffdc01-6709-4355-9c98-b62792139e40" alt="Category"> <br>
            <span style="font-weight:bold">"Category"</span> - filter by category of projects defi, games, exchanges, etc.
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fwhitelist-filter.webp?alt=media&token=cee300ad-696f-4289-baa3-605ef02b084e" alt="Whitelist filter"> <br>
            <span style="font-weight:bold">"Whitelist"</span> - whitelisting filter for TOKEN or NFT presales, select the presale you are interested in
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fairdrop-filter.webp?alt=media&token=6c2e6521-eb03-4777-b217-ecdf4874e2a3" alt="Airdrop filter"> <br>
            <span style="font-weight:bold">"Airdrop"</span> - NFT or TOKEN distribution filter
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fbounty-filter.webp?alt=media&token=44e92a7f-2fd3-41f3-b84b-b40c1408e96b" alt="Bounty filter"> <br>
            <span style="font-weight:bold">"Bounty"</span> - project promotion, for influencers and creative people, you can help the project in promotion: 
            shoot videos, write articles, make posts, draw design pictures FREE filter means that you will receive free tokens for promotion and help to 
            the project without any checks on the quality of the content of the project, usually such bounties take place on bitcointalk forum website in 
            the bounty section, through the admins of the forum.
            </p>
            <p>AMBASSADOR filter means that the project itself conducts a set of Influencers and other participants of the company, checks all the content 
            itself, here the quality of the content is very high, in most cases, tokens are paid FREE for helping the project, in rare cases it is allocation
            </p>
            <p>ALLOCATION filter means that you promote the project for the opportunity to buy tokens on presale, as a rule, it is the top projects, 
            which select the best major Influencers.
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Ftestnet-filter.webp?alt=media&token=286df91b-842f-4c40-aa67-b45d92250e3e" alt="Testnet filter"> <br>
            <span style="font-weight:bold">"Testnet"</span> - at the presale stage, all projects need to have their product tested, its availability, 
            fix bugs, adjust operation, for the help of testing, usually product creators of the project can pay a decent amount after listing on the exchanges.
            </p>
            <p>TESTNET filter is network testing with a created node, usually by POS technology, something like more modern mining, there are instructions on 
            how to launch the NODE and maintain the network in the description or via the link. Usually projects give free test-tokens to test the platform, 
            then after listing they pay real tokens for testing the network.
            </p>
            <p>DEFI filter is SWAP testing, cross-chain bridge testing, and any other DEFI related tests.
            </p>
            <p>GAME filter is testing a demo or alpha version of a game to get paid.
            </p>
            <p>APP filter testing of programs or crypto applications.
            </p>
            <p>SITE filter testing all possible functions of a crypto project's web-site.
            </p>
            <p>Filter Masternode launching of a working node - the project node (mainnet) 
            to process a blockchain network, for the node we get reward in % of token uploaded to exchanges (in the future we will connect via api and get the actual data on %).
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Felimination-of-stubs.webp?alt=media&token=781aa4a9-941c-491c-873b-bd520d884cfc" alt="Elimination of stubs"> <br>
            Exclude columns that you do not use
            </p>
            <q-separator class="qSeparator" inset />
            <p>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fstubs.webp?alt=media&token=41db74c3-4281-4fde-ab91-a446c9eaa858" alt="Stubs"> <br>
            Each column is sorted alphabetically or numerically
            </p>
            <p>
             VOTES takes into account the % of likes and dislikes, so new projects can easily make it to the top (% entry is affected by the emoji column, if the project has top 
             foundations and celebrities in the team it is easier to get a high %, but if the projects is suspected to be a scam the weight of dislikes will be much higher) now 
             the ordinary vote counting system is used and there is no emoji column   
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
<!-- Testnet -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="Testnet"
      >
        <q-card>
          <q-card-section>
            <h2>Testnet</h2>
            <q-separator class="qSeparator" inset />
            <p>All users can:
                <ul>
                    <li>add tokens</li>
                    <li>add token events</li>
                    <li>vote</li>
                </ul>
            </p>
            <p>
            You will get CATCH points for each action.
            </p>
            <p>The most active testers of the web-site will be rewarded in catch points After presale 
                and listing of CATCH token, you will be able to exchange your points for the token.
            </p>
            <p>In the first phase of the testnet, we will add power and adjust the functioning of all 
            the nodes of the site, adjust the functioning of the web-site without bugs, as well as 
            add a referral program and launch our secret product.
            </p>
            <p>
            Please note: Due to the imperfect operation of the system of charges and changes in the 
            terms of scoring, in the first phase of testing we will periodically reset your earned points, 
            we will save the database with your points and then after the launch of the main model, charging 
            points and power, we will give you all the fair amount of catch points as a percentage of all 
            previous updates.
            </p>
            <p>
            Also we want to pay attention that all referral links on the web-site are yours, if you add a 
            project with your referral link in TOP Events, you will get a lot of referrals from your link.
            </p>
            <p>
            Shitcoin and scam projects can not be added.
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      <q-separator />
<!-- How to add token -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="How to add token"
      >
        <q-card>
          <q-card-section>
            <h2>How to add token</h2>
            <q-separator class="qSeparator" inset />
            <p>All users can:
                <ol>
                    <li>In order to add a token, you need to sign up, registration via gmail</li> 
                    <li>Press <span style="font-weight:bold">"Profile"</span> or <span style="font-weight:bold">"Login"</span><br>
                        <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Flogin.webp?alt=media&token=02f037a5-1cd2-48e7-8817-48197b378156" alt="Login">
                    </li>
                    <li>Choose a gmail account to sign up</li>
                    <li>There will be a drop-down menu on the left press <span style="font-weight:bold">"Add Token"</span><br>
                        <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fleft-menu.webp?alt=media&token=7902485a-be65-492b-9939-a1bfec8d31f0" alt="Left menu">
                    </li>
                    <li>The fields to be filled in will appear <br>
                        <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fadd-token.webp?alt=media&token=86c789cc-167a-4402-9e71-b118f5875a56" alt="Add token"><br>
                        Be sure to fill in all possible fields and add a photo logo, photos can be taken in social networks, make a screenshot.<br>
                        <span style="font-weight:bold">"Symbol"</span> write the abbreviation for the token.<br>
                        Next, add the site and social networks with a link to the project.<br>
                        <span style="font-weight:bold">"Token launch"</span> if the public sale date is known, add it.<br>
                        <span style="font-weight:bold">"Token Category"</span> what kind of project? Game, defi, launchpad, NFT?<br>
                        <span style="font-weight:bold">"Whitelist"</span> choose token or NFT.<br>
                        <span style="font-weight:bold">"Airdrop"</span> choose token or NFT.<br>
                        <span style="font-weight:bold">"Bounty"</span> choose free (distribution of tokens for project promotion, bitcointalk),
                        ambassador ( distribution of tokens for promotion or giving out allocations, held by project admins), 
                        allocation is an ability to buy tokens for project promotion.<br>
                        <span style="font-weight:bold">"Testing"</span><br>
                        <span style="font-weight:bold">"DEFI"</span> is <span style="font-weight:bold">"SWAP"</span> testing, cross-chain bridge testing, and any other DEFI related tests <br>
                        <span style="font-weight:bold">"GAME"</span> for rewards<br>
                        <span style="font-weight:bold">"APP"</span> testing of programs or crypto applications<br>
                        <span style="font-weight:bold">"SITE"</span> testing of different functions of projects’ web-sites<br>
                        <span style="font-weight:bold">"MASTERNODE"</span> launching of a working node - the project node (mainnet) to process a blockchain network, 
                        for the node we get reward in % of token already listed on exchanges (in the future we will connect via api and get the actual data on %)<br>
                        <span style="font-weight:bold">"REFFERAL"</span> % of income, for example, referral program at binance exchange, Fixed fee - the fixed payment for a specified action<br>
                        <span style="font-weight:bold">"FARMING"</span> is something similar to bank deposit . staking of tokens for APR or APY, <br>
                        <span style="font-weight:bold">"POOLS"</span> liquidity pools, there is a pair of 2 traded tokens on DEX exchanges, you give your tokens to a decentralized exchange to provide liquidity<br>
                        <span style="font-weight:bold">"Description"</span>  , mini project overview, idea, team, funds, competition<br>
                        After choosing the event, click <span style="font-weight:bold">"Bounty"</span> / <span style="font-weight:bold">"Airdrop"</span> / <span style="font-weight:bold">"WhiteList"</span> are already passing! Do you want to add your referral link? <br>
                        <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fhow-to-make-money-on-the-catcheck.webp?alt=media&token=07e065dd-3c47-4472-b97b-f12047a94961" alt="add referral link"><br>
                        Insert a referral link in the section "Add link to Whitelist" <br>
                        In description write about the requirements<br>
                        If the ability to add a referral link and descriptions has not appeared, it means that you have not chosen the type of event to add - whitelist -airdrop -bounty-testing - refferal - farming <br>
                        Click SUBMIT, a green sign will appear that the token is sent to moderation, you have to wait a little bit and then the token may return for revision with a note that there is something wrong with the information 

                    </li>
                </ol>
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    <q-separator />
<!-- How to add token event -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="How to add token event"
      >
        <q-card>
          <q-card-section>
            <h2>How to add token event</h2>
            <q-separator class="qSeparator" inset />
            <p>
            On the main page of the web-site <a href="https://catcheck.org/" target="_blank">https://catcheck.org/</a> type 
            the name of a token  into a search engine<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fsearch.webp?alt=media&token=e39d2439-38b3-447e-8dd2-4cd809df6661" alt="search">
            </p>
            then in the token itself in the columns<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fadd-event.webp?alt=media&token=887694ea-901e-495a-b00d-4d4c56657820" alt="Add event"><br>
             -presale -whitelist  -airdrop -bounty - influencers - testing -refferal -farming click the button ADD&EARN
            <p>
            the following window will appear<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Ftestnet.webp?alt=media&token=b5efc17f-5b3e-4ea2-a5aa-d942f023289d" alt="testnet"><br>
            fill in the blanks and send it to moderation
            </p>
            <p>
            Your referral link<br>
            Choose type of event<br>
            Description of event conditions
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
     <q-separator />
<!-- How to report that the token event has ended -->
      <q-expansion-item
        expand-separator
        icon="help_outline"
        label="How to report that the token event has ended"
      >
        <q-card>
          <q-card-section>
            <h2>How to report that the token event has ended</h2>
            <q-separator class="qSeparator" inset />
            <p>
            If you clicked on the link and the event has already ended and is not active, you can report it and earn Points<br>
            <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesFAQ%2Fevent-ended.webp?alt=media&token=a8204f77-4369-4b42-994b-a4627ad46594" alt="Event ended"> 
            </p>
            <p>
            click <span style="font-weight:bold">"REPORT EARN"</span>, the moderator will check and correct
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
      
    </q-list>
    </q-card>
    </div>

    
</template>

<script>
import axios from 'axios'
import 'firebase/compat/firestore';
import { getDatabase, ref, child, get, set, update, onValue } from "firebase/database"
import { createMetaMixin } from 'quasar'
import SkeletonTokenPage from './SkeletonTokenPage.vue'
import VueApexCharts from "vue3-apexcharts"


export default {

  data() {
    return {
        twit: [],
        result: [],
        submitting: false,
        tokens: [],
        title: '',
        description: '',
        img: '',
        check:[],

        
        checkTimeTwitter: [],
        followers_count: [],
        following_count: [],
        listed_count: [],
        tweet_count: [],
      //   chartOptions: {
      //     responsive: true,
      //     maintainAspectRatio: false
      // },

      series: [{
              name: "Followers",
              data: []
          }],
      chartOptions: {
            chart: {
              height: 350,
              type: 'area',
              zoom: {
                enabled: true
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'straight'
            },
            title: {
              text: 'Twitter',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: [],
              labels: {
                  rotate: -45,
                  rotateAlways: true,
              }
            }
          }
        }
  },
  created() {
      this.loadToken()
      this.twitterStatistics()
  },
  methods: {
      loadToken() {
            const db = getDatabase()
            const tokensRef = ref(db, 'token/')
            const id = ''
            const tokens = new Promise((resolve, reject) => {
                onValue(tokensRef, (snapshot) => {
                const data = snapshot.val()
                const result = Object.keys(data).map(key => {
                        return {
                            id: key,
                            ...data[key]
                        }
                    }).filter(token => token.name.toLowerCase().trim().replace(/[^a-z0-9]/g,'') == this.$route.params.token)      
                resolve(result[0].id)
                console.log('tokens result', result[0].id)
                this.tokens = result
                })
            })
            tokens.then((id) => this.twitterStatistics(id)).then(() => this.setAnotherTitle())         
    },
    twitterStatistics(id) {
      const db = getDatabase()
        const tokensRef = ref(db, `twitterStatistics/${id}`)
          const p = new Promise((resolve, reject) => {
          onValue(tokensRef, (snapshot) => {
          const data = snapshot.val()
          const twit = Object.keys(data).map(key => {
              return {
                id: key,
                ...data[key]
               }
            })
            resolve(twit)
            })
          })
        p.then((twit) => this.updateChart(twit))
        p.then((twit) => this.updateTheme(twit))
    },
    updateChart(twit) {
        const followersCount = twit.map(i => i.followers_count)
            this.series = [{
              data: followersCount
            }]
    },
    updateTheme(twit) {
      const f = twit.map(i => new Intl.DateTimeFormat('en-US', {month: 'numeric', day: 'numeric'}).format(i.checkTimeTwitter))
      this.chartOptions = {
        xaxis: {
              categories: f
            }
      };
    },
    setAnotherTitle () {
      this.img = this.tokens[0].imgUrl
      this.title = this.tokens[0].name + ' (' + this.tokens[0].symbol + ')' + ' Token (Coin)' + ' | CatCheck.org'
      this.description = '✅ ' + this.tokens[0].name + ' token - analytics 📈, review 🔬, the best tools 🛠 from Catcheck.org 😻 for making money 💸 on cryptocurrency 😎'
    },
    couterVotes(id, votes) {
      this.submitting = true
        if (this.user) {
          console.log('user token 5', this.user)
          const counter = votes + 1
          if (this.dataVotesUser[id] == undefined) {
            const score = 1 
            this.plusVotes(id, counter, score)
          } else {
            const score = this.dataVotesUser[id].value + 1
            this.plusVotes(id, counter, score)
          }
        } else {
          this.submitting = false
          this.$q.notify({message: 'Please. Log in.', color: 'red'})
        }
    },
    async plusVotes (id, counter, score) {  

      const db = getDatabase();

      set(ref(db, 'users/' + this.userId + '/votes/' + id), {
        value: score,
        time: Date.now()
      });

       await axios.patch(`https://catcheckorg-34caf-default-rtdb.firebaseio.com/token/${id}.json`, {        
        votes: counter   
       })
      this.submitting = false
      this.$q.notify({message: 'Thank you. Next time you can vote for this token in 24 hours', color: 'green'})
    },
    disabledButtonVotes(a) {
       if (a) {
         if(a.time + 86400000 < Date.now()){
           return false
         }
         return true
       } else {
         return false
       }
    },
    confirmDeclareNotWorkingEventLink (id, event) {
      this.$q.dialog({
        title: 'Attention!',
        message: `Are you sure you want to report that the link is broken?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.declareNotWorkingEventLink(id, event)
      })
    },
    declareNotWorkingEventLink (id, event) {
      this.loading = true
      console.log(id, event)
       const db = getDatabase()

       if(event == 'referral') {
         update(ref(db, "token/" + id), {
            declareNotWorkingReferralTokenLink : true
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

       if(event == 'whitelist') {
         update(ref(db, "token/" + id), {
            declareNotWorkingWhitelistLink : true
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

       if(event == 'airdrop') {
         update(ref(db, "token/" + id), {
            declareNotWorkingAirdropLink : true
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
        
      if(event == 'bounty') {
         update(ref(db, "token/" + id), {
            declareNotWorkingBountyLink : true
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

       if(event == 'testnet') {
         update(ref(db, "token/" + id), {
            declareNotWorkingTestnetLink : true
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

       if(event == 'staking') {
         update(ref(db, "token/" + id), {
            declareNotWorkingStakingLink : true
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
    
  },
  computed: {
/*     tokens() {
        return this.tokens.filter(token => token.name.toLowerCase().trim().replace(/[^a-z0-9]/g,'') == this.$route.params.token)
    },
    title () {
      return this.tokens[0].name + ' (' + this.tokens[0].symbol + ')' + ' Token (Coin)' + ' | CatCheck.org'
    }, */
    user() {
        return this.$store.getters.user
    },
    userId() {
        return this.$store.getters.uid
    },
    dataVotesUser() {
      return this.$store.getters.dataVotesUser
    }
  },
  components: {
      SkeletonTokenPage, apexchart: VueApexCharts
  },

  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
        return {
        // assuming `this.myTitle` exists in your mixed in component
        title: this.title,
        meta: {
            description: { name: 'description', content: this.description },
            ogTitle:  {
                property: 'og:title',
                // optional; similar to titleTemplate, but allows templating with other meta properties
                template () {
                    return `CatCheck.org`
                }
            },
            ogImage:  { property: 'og:image', content: this.img },

        }
      }
    })
  ]
}
</script>

<style lang="sass">
.wordWrapBreak
    word-break: break-all

.linkButtonDisplayBlock
    display: block
    text-decoration: none

img
    max-width: 100%

iframe
    width: 100%

.LinkWebsiteTextDecoration
    text-decoration: none

.youtube
  position: relative
  max-width: 2000px
  margin: auto

.youtube:before
  content: ""
  display: block
  padding-top: 56%

.youtube iframe 
  width: 100%
  height: 100%
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

h2, h3
 margin-top: 10px

.container
  body.screen--xl &
    padding: 40px
  body.screen--lg &
    padding: 30px
  body.screen--md &
    padding: 20px
  body.screen--sm &
    padding: 10px
  body.screen--xs &
    padding: 0

.q-card__section--vert
  body.screen--xl &
    padding-left: 55px
    padding-right: 55px
  body.screen--lg &
    padding-left: 45px
    padding-right: 45px
  body.screen--md &
    padding-left: 20px
    padding-right: 20px
  body.screen--sm &
    padding-left: 10px
    padding-right: 10px
  body.screen--xs &
    padding-left: 0px
    padding-right: 0px

blockquote 
    margin-top: 20px
    margin-left: 20px
    margin-right: 0px
    margin-bottom: 20px
    color: #231E28
    padding: 30px 10px 15px 60px
    border-left: 8px solid rgb(38, 50, 56)
    position: relative
    background: #f1f2f3
    font-weight: 400

blockquote:before
    content: "\FE15"
    font-family: Arial
    color: rgb(38, 50, 56)
    font-size: 70px
    position: absolute
    left: -20px
    top: 0px

blockquote p 
    font-size: 20px
    margin-top: 0  


blockquote 
  body.screen--sm &
    margin-top: 0px
    margin-left: 10px
    margin-right: 0px
    margin-bottom: 20px
    color: #231E28
    padding: 30px 10px 15px 60px
    border-left: 8px solid rgb(38, 50, 56)
    position: relative
    background: #f1f2f3
    font-weight: 400

blockquote 
  body.screen--xs &
    margin-top: 0px
    margin-left: 0px
    margin-right: 0px
    margin-bottom: 20px
    color: #231E28
    padding: 30px 10px 15px 20px
    border-left: 8px solid rgb(38, 50, 56)
    position: relative
    background: #f1f2f3
    font-weight: 400

blockquote:before
  body.screen--xs &
    content: ""
    font-family: Arial
    color: rgb(38, 50, 56)
    font-size: 70px
    position: absolute
    left: -10px
    top: 0px

h1 
    font-size: 2.5rem
    line-height: 2.5rem

h2 
    font-size: 2rem
    line-height: 2rem

h3 
    font-size: 1.7rem
    line-height: 1.7rem

h4 
    font-size: 1.4rem
    line-height: 1.4rem

h5 
    font-size: 1.1rem
    line-height: 1.1rem

h6 
    font-size: 0.9rem
    line-height: 0.9rem

</style>



