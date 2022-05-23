<template>

  <div class="container">
    <h1 class="q-pa-sm">Whitepaper of Catcheck.org</h1>

    <div class="row reverse-wrap">
      <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">

    <!-- About -->
        <q-card id="about">
              <q-card-section>
                <h2 @click="copyLink('about')">1. About</h2>
                <q-separator class="qSeparator" inset />
                <p>Catcheck is an infrastructure platform for searching, analyzing and promoting new cryptocurrencies, consisting of 3 combined products, with elements of DAO</p>
                <div class="row">
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 row items-center justify-center">
                    <q-img class="q-mx-xl q-mt-sm q-mb-lg" src="/icons/catcheck-logo.svg" alt="catcheck logo" height="230px" width="200px" />
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-4 col-lg-8 row items-center q-my-lg">
                    <h3><router-link to="/whitepaper#catcheck"><span class="orangeColor">CATCHECK</span></router-link> - crypto event aggregator</h3>
                    <h3><router-link to="/whitepaper#catchlabs"><span class="orangeColor">CATCHLABS</span></router-link> - venture capital fund, incubator for projects (start-ups)</h3>
                    <h3><router-link to="/whitepaper#catchpad"><span class="orangeColor">CATCHPAD</span></router-link> - launchpad (crowdfunding)</h3>
                  </div>
                </div>

                <p>Why lynx? LYNX (the name of our wallet) is a symbol of our project. The lynx is a very cautious and calm animal, 
                  surviving under any harsh conditions. Lynx can wait for hours in cold weather to CATCH its prey. At the same time 
                  it takes very thorough care of its offspring while growing them up. It will be the same with our projects, they 
                  will be carefully selected by CATCH among the flow on the catcheck and will achieve their success during growing 
                  up thanks to our help and support.
                </p>

                <h3 id="general-overview" @click="copyLink('general-overview')">1.1 General overview:</h3>
                <div class="q-ma-md">
                  <div class="q-pb-sm q-pl-md">
                    <h4>Problems:</h4> 
                    <p>All crypto projects and their events (presales, whitelists, airdrops, testnets, ambassador programs, staking, 
                      referral programs) are spread over different sites
                    </p>
                    <h4>Solution:</h4> 
                    <p>All projects and their events are in one place</p>
                    <h4>Idea of implementation:</h4> 
                    <p>Users will add and update the information on <a href="https://catcheck.org/" target="_blank">https://catcheck.org</a> 
                    for rewards in CATCH tokens, launchpad tickets, and the opportunity to add their referral link.</p>
                    <h4>Business model:</h4> 
                    <p>Project founders as well as users pay for more than 15 services on the site in CATCH tokens:</p>
                    <h4>Owners spend CATCH on:</h4>
                    <ol>
                      <li>PROMOTED advertising + banner advertising</li>
                      <li>Advertising-airdrop, additional giveaways of CATCH tokens from projects, for voting on the site (In order not to spend money on tapping votes, you can use this service)</li>
                      <li>Audit</li>
                      <li>Tokenomics design + token use cases</li>
                      <li>Smart contract development</li>
                      <li>Holding bounty programs%*</li>
                      <li>Search for crypto specialists (branch of applicants), spend on boosting advertisement</li>
                      <li>Running an event form (similar to GLEAM)</li>
                      <li>Launchpad, IDO %*</li>
                      <li>Paid daily update of project information by assigned performer</li>
                    </ol>
                    <p><b>* % means that the system takes % of sales of user services or site services.</b></p>
                    <h4>Users spend CATCH on:</h4>
                    <ol>
                      <li>For a private subscription to blogs with investment ideas from other users %*</li>
                      <li>Increase user's rating for more earnings and launchpad tickets</li>
                      <li>Fee for mini-games %*</li>
                      <li>Trading referral links of the project's events %*</li>
                      <li>OTC (trading whitelists tickets for launchpad and other things), CATCH is a guarantor %*</li>
                      <li>Selling API statistics</li>
                    </ol>
                    <p>Approximate research on income from services and products <br>
                      <a class="wordWrapBreak" href="https://docs.google.com/spreadsheets/d/1YjiJfIYmI6TuWjJy3ndRkSju9bZiRwQf" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/1YjiJfIYmI6TuWjJy3ndRkSju9bZiRwQf</a>
                    </p>
                    <p>We plan many other products in <router-link to="/whitepaper#ecosystem">the CATCHECK ecosystem</router-link> (see roadmap). See the token use cases in the tokenomics section.
                    </p>
                    <h4>Incubation profit:</h4>
                    <p>CATCHLABS selects projects, incubates (helps in all stages of development) and advertises on the website and promotes 
                      in all other ways (more here <router-link to="/catchlabs">https://catcheck.org/catchlabs</router-link>), for assistance 
                      CATCHLABS receives:
                      <ul>
                        <li>Allocations on SEED ROUND of projects that he incubates, and as a result multiply his capital</li>
                        <li>Tokens allocated for adviser services</li>
                        <li>% of gathering in case of advertising on the site</li>
                      </ul>
                    </p>
                  </div>
                  <p>CATCHPAD holds a public sale and launch of projects on 
                    <a href="https://en.wikipedia.org/wiki/Decentralized_exchange" target="_blank" rel="noopener noreferrer">DEX exchanges</a> 
                  </p>
                  <p>10% of net income from incubation goes to redeem and burn tokens</p>
                  <p>In order to learn where we will take the traffic, read below in the marketing section</p>
                </div>
              </q-card-section>
        </q-card>

    <!-- Ecosystem -->
        <q-card class="q-mt-xl" id="ecosystem">
          <q-card-section>
            <h2 @click="copyLink('ecosystem')">2. Ecosystem</h2>
            <q-separator class="qSeparator" inset />
            <h3 id="catcheck" @click="copyLink('catcheck')"><span class="orangeColor">2.1 CATCHECK</span></h3>
            <h4 id="read-more-about-the-products" @click="copyLink('read-more-about-the-products')">2.1.1 Read more about the products:</h4>
            <p>Site <router-link to="/">https://catcheck.org</router-link> - aggregator of information statistics on tokens and their events on which you can earn.</p>
            <p>The main events and information on the site: PRESALE | 
              <a href="https://academy.binance.com/en/glossary/whitelist" target="_blank" rel="noopener noreferrer">WHITELIST</a> | 
              <a href="https://en.wikipedia.org/wiki/Testnet" target="_blank" rel="noopener noreferrer">TESTNET</a> | 
              <a href="https://academy.binance.com/en/glossary/bounty" target="_blank" rel="noopener noreferrer">BOUNTY</a> | 
              <a href="https://academy.binance.com/en/glossary/airdrop" target="_blank" rel="noopener noreferrer">AIRDROP</a> 
              | REFERRAL PROGRAM | 
              <a href="https://academy.binance.com/en/articles/what-is-staking" target="_blank" rel="noopener noreferrer">STAKING</a> | 
              STATISTIC 
            </p>
            <img class="q-my-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fcatcheck-products.webp?alt=media&token=b87e089a-14f3-4551-8261-40b56d55ef2b" alt="catcheck products">
            <p>Any user can add a token, or an event, as well as report a bug or incorrect information, all this passes moderation, 
              in the end the user will receive tokenы for his work ( CATCH tokenы we will pay from the sale of our services, there 
              will be no endless inflation, see below)
            </p>
            <img class="q-my-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fcatcheck-home-page.webp?alt=media&token=ee319e96-ce39-4518-b325-36e3b013bdd5" alt="catcheck home page">
            <p>
              As a result, we got an aggregator with all the necessary, constantly updated information with a large number of filters 
              for investors, Influencers, testers to earn and project creators, who can promote the project by adding all the existing 
              token events in one place in a clear form for users. Everyone will find what they need!!!
            </p>

            <h4 id="right-now-at-catcheck-we-are-working-on" @click="copyLink('right-now-at-catcheck-we-are-working-on')">2.1.2 Right now at catcheck we are working on:</h4>
            <p><b>Own EVENT form for projects (similar to gleam):</b> Creating tasks (social activity, etc.), for which the points are charged. 
              The form will be created with built-in referral system.
            </p>
            <p><b>A column with statistics on social networks:</b> users will be able to filter the projects by number of users, or the number 
              of growth of social media for the desired period of time.
            </p>
            <p><b>The Cabinet of management and maintenance of bounty (Ambassador) programs by admins:</b> Convenient tools for receiving 
            applications from Influencers, tracking traffic through the links, issuing the status of Influencers, etc. (Bounty on bitcointalk 
            is used by less and less projects, because of the difficulty of registration and knowledge of the rules of this old forum, the 
            forum gives poor coverage of projects, because there is no good influencers, everything is cheated). Now projects choose 
            AMBASSADOR programs, which developers lead themselves, through invitation links, telegram and discord, and make events and 
            giveaways in glim forms. We will make all these products more convenient and user-friendly, so that no project needs to make 
            up its own wheel, but get all the necessary tools, including coverage to promote its token or NFT on our site.
            </p>

            <h4 id="filter-with-emoji-for-projects" @click="copyLink('filter-with-emoji-for-projects')">2.1.3 Filter with emoji for projects:</h4>
            <p>
              ❗️ suspected scam (closed team without KYC) <br>
              ❌ scam (scam projects are important to add to the site, so that newcomers adding a token to the site know that the 
              project is scam or is suspected of scam, and make the right decision not to invest in such projects. There will be 
              no links to sites of scam projects, we will write articles on exposure)<br>
              🔎 The team has passed KYC (if there are no funds),<br>
              A smart contract audit(if there are no funds) <br>
              🏦 there are backers(funds)<br>
              ⭐️ stars in team, or funds, or adviser ( Vitalik Buterin invested, or top funds, or creator - google founder) <br>
              💡 good fresh idea with innovations, new uniswap, solana, AAA game with 10 million users, SANDBOX
            </p>
            <p>
              By project characteristics in the form of pictures, there will also be filters.
            </p>
            <p>
              As a result, for example, you will be able to select projects that: 
              passed KY, 10000 social network users and more than 30% growth in social networks in the last 7 days, a category such 
              as GAME, and the type of event you are interested in, for example a NFT whitelist. 
            </p>
            <p>
              You will get: a list of game projects, with growing coverage over the past week, the team who have 
              passed the KYC and who have a whitelist for the NFT.
            </p>

            <h4 id="the-coin-section" @click="copyLink('filter-with-emoji-for-projects')">2.1.4 In the coin section for each project will be information.</h4>
              <dl>
                <dt>Review:</dt>
                  <dd>article + video, working on filling (then buying links = SEO traffic)</dd>
                <dt>Chart:</dt>
                  <dd>trade schedule with a set of tools for traders</dd>
                <dt>Market:</dt>
                  <dd>exchanges where the project is traded</dd>
                <dt>Chat about the project</dt>
                  <dd>(possible integration with Telegram)</dd>
                <dt>Tokenomics vesting:</dt>
                  <dd>information on tokenomics, as well as a handy chart of token unlocking, which can be superimposed on the price and see how the price changed at what volume of unlocking</dd>
                <dt>Roadmap:</dt>
                  <dd>events, roadmap</dd>
              </dl>

            <h4 id="dao-found" @click="copyLink('dao-found')">2.1.5 DAO Found</h4>

            <h4 id="dao-voting" @click="copyLink('dao-voting')">2.1.6 DAO Voting</h4>
            
            <h4 id="dao-ranking" @click="copyLink('dao-ranking')">2.1.7 DAO Ranking</h4>
            <p>Users on the site will be 7 user ratings, the higher the rating the more tokens are earned, as well as with 3 of his 
              rating can receive tickets to the launchpad CATCHPAD, as well you can stake or burn tokens CATCH to get the 4th or 5th 
              rating and receive tickets to participate in the launchpad.
            </p>


            <h4 id="nft-avatars" @click="copyLink('nft-avatars')">2.1.8 NFT avatars</h4>
            <p>Give advantages in mini-games, higher ranking on site</p>

            <h4 id="cryptocurrency-events-calendar" @click="copyLink('cryptocurrency-events-calendar')">2.1.9 Cryptocurrency events calendar</h4>
            <p>Listings on exchanges, app launches, token burns, and more. There will be a separate page, interacts with ROADMAP 
              in the coin section.
            </p>

            <h4 id="investment-ideas" @click="copyLink('investment-ideas')">2.1.10 Investment ideas</h4>
            <p>Every user can keep his own blog and add his own investment idea for crypto market based on fundamental information 
              and analytics. CATCHECK will collect statistics of each analyst and his profitable and negative investment ideas, all 
              information will be protected by decentralization, results cannot be hidden, other user of the site (consumer investor) 
              in their turn can choose through filters the most profitable analysts and subscribe to them, receiving notifications 
              about new information, the creators of the blog can make the subscription fee.
            </p>
            <p>Example of an investment idea:<br>
              <a href="https://coinmarketcap.com/currencies/dydx/" target="_blank" rel="noopener noreferrer">DYDX</a> has launched a testnet IOS application, in testnet you need to buy at least 50$ of their tokens, a lot of people 
              will be motivated to go to the testnet and buy their tokens, because people were paid from 5000 to 15 000$ for the 
              last testnet, it means that other people now will fulfill the testnet and buy lots of tokens with a sense of missed 
              profit. The price should go up, we should buy token in range 1-1.2, we wait 1.3-1.5 .
            </p>

            <h4 id="rotation-of-referral-links" @click="copyLink('rotation-of-referral-links')">2.1.11 Rotation of referral links</h4>
            <p>The ability to sell or redeem space and insert own referral link to the event.  
                If a user adds a project with an event on the site, he can leave his referral link to the event project, it will always remain on the site (first come, first served), but his link will not be the only one, we will introduce a system of rotation links within 24 hours.  In the button, you can add 4 links that will replace each other every 6 hours (or every hour, 1 link out of 4 - 6 hours a day)  
              <ul>
                <li>
                  the 1st place is assigned to the user who added the project (the user can sell this place, for tokens, or leave 
                  a link and recruit referrals)
                </li>
                <li>
                  the 2nd place is always for the site catcheck, we can add your link or sell space
                </li>
                <li>
                  the 3rd is free seat for sale - (method of sale, auction for 24 hours)
                </li>
                <li>
                  the 4th place is free for sale - (method of sale, auction for 24 hours)
                </li>
              </ul> 
              Owner of the 3rd or the 4th place may be the user who added the project if he has a high rating account.
            </p>

            <h4 id="notification-system" @click="copyLink('notification-system')">2.1.12 Notification system</h4>
            <p>We will have a configurable notification system of new events through the Telegram bot and push notifications 
              for users. Users will choose what events they want to receive. For example, adding new Game projects, adding new 
              glim forms, or a list of tokens whose growth in social networks exceeded 20% over the last 24 hours, or the top 
              of the fastest-growing tokens every 24 hours.
            </p>

            <h4 id="ai-bigdata" @click="copyLink('ai-bigdata')">2.1.13 AI BigData</h4>
            <p>Collection and analysis of current data 
              (<a href="https://en.wikipedia.org/wiki/Big_data" target="_blank" rel="noopener noreferrer">Big Data</a>) 
              which will be used by artificial intelligence to make a prediction about the likely behavior of each individual 
              project. An assistant that will show with what probability a particular project will succeed (and by how much) or fail.
            </p>

            <h4 id="otc-market" @click="copyLink('otc-market')">2.1.14 OTC market, CATCHECK is a guarantor</h4>

            <h4 id="section-for-job-seekers" @click="copyLink('section-for-job-seekers')">2.1.15 Section for job seekers</h4>

            <h4 id="influencer-section" @click="copyLink('influencer-section')">2.1.16 Influencer section (collection of the base)</h4>

            <h4 id="elements-of-a-social-network-for-users-to-communicate" @click="copyLink('elements-of-a-social-network-for-users-to-communicate')">2.1.17 Elements of a social network for users to communicate</h4>

            <h4 id="inbuilt-mini-games" @click="copyLink('inbuilt-mini-games')">2.1.18 Inbuilt mini-games</h4>
            <p>
              Sea battle, checkers, chess and others. You have to pay tokens for the game or get tokens for watching ads, playing 
              against AI or against people, tournaments. NFT avatars let you play without site commission. Games will give traffic, 
              and extra spending tokens by users.
            </p>

            <h4 id="lottery" @click="copyLink('lottery')">2.1.19 Lottery</h4>

            <h4 id="faucets-for-points" @click="copyLink('faucets-for-points')">2.1.20 Faucets for points</h4>
            <p>
              This is still useless traffic (games, faucets, lotteries) but it is also important, the one who came for free money 
              today, in a year or 10 years will be solvent and will remember our site and projects on it.
            </p>

            <h4 id="crypto-school" @click="copyLink('crypto-school')">2.1.21 Crypto School</h4>
            <br>
            <br>
            <p>Also we plan many other developments on catcheck that are really required by the market and users of crypto.</p>
            <br>
            <q-separator class="qSeparator" inset />
            
            <h3 id="catchlabs" @click="copyLink('catchlabs')"><span class="orangeColor">2.2 CATCHLABS</span></h3>
            <p>We gathered a team of analysts, economists, programmers, employees of funds, there are experts in the 
              DEFI and GAMEFI industry.
            </p>
            <p>Now we have 2 games and one large DEFI project on incubation, and also we periodically advise some projects. 
              We have agreements with funds to help the joint projects, we are gaining speed and looking for strategic 
              partnerships that will be really useful for us and our future projects.
            </p>

            <h4>How can our labs help any project?</h4>

            <h4 id="advertisement" @click="copyLink('advertisement')">2.2.1 Advertisement</h4>
            <p>In promoted blocks and banner advertisement.</p>

            <h4 id="database-of-influencers" @click="copyLink('database-of-influencers')">2.2.2 Database of Influencers</h4>
            <p>Database of verified Influencers, who work with CATCHLABS and who are potentially ready to work for allocation 
              (if the project is good enough), the total base of subscribers more than 10 million and is constantly growing, 
              we have a very strict selection of those who we work with, we care about quality, not quantity, only 5% of the 
              Influencers we considered got into our database. We work only with the largest languages by marketcap: English, 
              Spanish, Chinese, French, Japanese, German, Korean, Arabic, Portuguese, Turkish.
            </p>

            <h4 id="marketing-database" @click="copyLink('marketing-database')">2.2.3 Marketing database</h4>
            <p>Influencers, media outlets that work only for money, and we have statistics on the efficiency, in a word, 
              the database profitable purchase of advertising.
            </p>

            <h4 id="gaming-guild" @click="copyLink('gaming-guild')">2.2.4 Gaming guild</h4>
            <p>We have our own gaming guild, and we are working on partnerships with other guilds.</p>

            <h4 id="marketing-team" @click="copyLink('marketing-team')">2.2.5 Marketing Team</h4>
            <p>We have gathered a marketing team of 10 people with interesting promotion strategies, as well as with an 
              understanding of the cryptocurrency market and knowledge of profitable places to buy advertising exactly for 
              crypto projects.
            </p>
            <a class="flex" href="http://catcheck.org/catchlabs#block2" target="_blank" rel="noopener noreferrer">
              <img style="margin: 20px auto" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fcatchlabs.webp?alt=media&token=f35280c2-b04b-463b-bd10-91787b49d3e5" alt="catchlabs" />
            </a>
            <br>
            <q-separator class="qSeparator" inset />
            
            <h3 id="catchpad" @click="copyLink('catchpad')"><span class="orangeColor">2.3 CATCHPAD</span></h3>
            <p>Is in the priority development plans, after catcheck. The launchpad will work on several networks: ETH, BSC, POLYGON, 
              SOLANA, AVAX, FANTOM
            </p>
            <p>We are preparing to make the first ever WAX Launchpad with cliffs and token vesting, there are working tested smart 
              contracts that no one has done before, and soon we will launch one of our incubated KKG projects 
              <a href="https://towersmash.com/" target="_blank" rel="noopener noreferrer">https://towersmash.com</a> on WAX for 
              details in telegram: <a href="https://t.me/pavelsilka" target="_blank" rel="noopener noreferrer">@PavelSilka</a>
            </p>
            <p>And we are also considering the implementation of NEAR, STARKNET, COSMOS and other innovative networks.</p>
          </q-card-section>
        </q-card>

    <!-- Research of the market potential -->
        <q-card class="q-mt-xl" id="research-of-the-market-potential">
          <q-card-section>
            <h2 @click="copyLink('research-of-the-market-potential')">3. Research of the market potential</h2>
            <q-separator class="qSeparator" inset />
            <p>At the end of 2021, cryptocurrency was used by 2.8% of the population of the world, so last year this 
              figure grew by almost 300% - more details here 
              <a class="wordWrapBreak" href="https://crypto.com/research/2021-crypto-market-sizing-report-2022-forecast/" target="_blank" rel="noopener noreferrer">https://crypto.com/research/2021-crypto-market-sizing-report-2022-forecast/</a> 
            </p>
            <p>Many well-known analysts believe that this trend will continue and in the next 10 years this figure will increase 
              by more than 1000% and accordingly the potential users of our website will also become ten times more. We 
              conservatively estimate that if all of the 2.8% knew about catcheck.org today, then the traffic of the site would 
              be 100k-300k people per day considering the figures of the remotely similar sites.
            </p>
            <p>In the next 10 years as the cryptocurrency industry and users grow, we want to get traffic of 1mln -3mln users per day.</p>
            <p>The popularization of cryptocurrencies is evidenced by:</p>
            <ul>
              <li>The unfolding of the legal framework</li>
              <li>The first tokenized IPOs</li>
              <li>The release of synthetic assets (shares) by pledging CEX and DEX exchanges</li>
              <li>The emergence of the first projects that will issue tokenized shares <a href="https://www.soma.finance/" target="_blank" rel="noopener noreferrer">https://www.soma.finance</a></li>
              <li>Investment in cryptocurrency by giants like: TESLA, SEQUOIA CAPITAL, MICRO STRATEGY, SQUARE, THE MOTLEY FOOL and other funds 
                <a class="wordWrapBreak" href="https://www.rbc.ru/crypto/news/5edfd1409a7947454fbc0cfa" target="_blank" rel="noopener noreferrer">https://www.rbc.ru/crypto/news/5edfd1409a7947454fbc0cfa</a>,
                And there are more and more people willing to invest in cryptocurrencies
                <a class="wordWrapBreak" href="https://minfin.com.ua/amp/2022/03/26/82690494/" target="_blank" rel="noopener noreferrer">https://minfin.com.ua/amp/2022/03/26/82690494/</a>.</li>
            </ul>
            <p>Also we can see the widespread verification of crypto-users in the U.S., it shows that institutions are going to take over this market.</p>
            <p>The capitalization of the stock market is 94 trillion, and the capitalization of cryptocurrencies is only 2 trillion +-, although 
              besides the stock market there are many applications of blockchain technology, we have room to grow.
            </p>
          </q-card-section>
        </q-card>

    <!-- Analysis of successful projects -->
        <q-card class="q-mt-xl" id="analysis-of-successful-projects">
          <q-card-section>
            <h2 @click="copyLink('analysis-of-successful-projects')">4. Analysis of successful projects</h2>
            <q-separator class="qSeparator" inset />
            <h3>Factors affecting the growth of crypto projects and why CATCHECK will grow.</h3>
            <p>A project is successful and growing if:</p>
            <ol>
              <li>
                If the project is in trends, and right now the trends are:
                <ul type="disc">
                  <li><a href="https://en.wikipedia.org/wiki/The_DAO_(organization)" target="_blank" rel="noopener noreferrer">DAO</a> and 
                  <a href="https://en.wikipedia.org/wiki/Web3" target="_blank" rel="noopener noreferrer">Web 3.0</a>, as statistics show one of the trends in 2022</li>
                  <li>Games, <a href="https://en.wikipedia.org/wiki/Metaverse" target="_blank" rel="noopener noreferrer">metaverses</a> and 
                  <a href="https://en.wikipedia.org/wiki/Non-fungible_token" target="_blank" rel="noopener noreferrer">NFT</a>, trend in 2021</li>
                  <li><a href="https://medium.datadriveninvestor.com/what-is-a-crypto-launchpad-and-how-does-it-work-49e837bb3e3" target="_blank" rel="noopener noreferrer">Lunchpads</a> (a 2021 trend)</li>
                  <li> <a href="https://en.wikipedia.org/wiki/Decentralized_finance" target="_blank" rel="noopener noreferrer">DEFI</a> trend 2020</li>
                </ul>
                <p>One of the many products in <router-link to="/whitepaper#ecosystem">the CATCHECK ecosystem</router-link> is the DAO elements, 
                as well as Launchpad with its <router-link to="/catchlabs">incubation division CATCHLABS</router-link>, 
                also DEFI products and NFT avatars are in the plans.
                </p>
              </li>
              <li>
                If the project solves the urgent problems of the market better than others, a prime example is SOLANA, BSC and others.
                <h4>Problems:</h4>
                <ol>
                  <li>All crypto projects and their events (presales, whitelists, airdrops, testnets, ambassador programs, staking, referral programs) 
                    are spread over different sites, there is no single database of project events, and each new event is not tied to the project, 
                    it is often covered as a separate new story.
                  </li>
                  <li>Most users do not have enough knowledge and experience to fully evaluate the project or event, which ultimately leads to the 
                    fact that they invest in skam projects, or spend time on an obviously useless event where there is almost no chance to make money.
                  </li>
                </ol>
                <h4>Solutions:</h4>
                <ol>
                  <li>All projects and their events (whitelists, airdrops, testnets, ambassador programs) with the set of filters and necessary 
                    statistics are in one place,  and all the events are tied to the same project.
                  </li>
                  <li>
                    There is an overview for every project written by experienced analysts.
                  </li>
                </ol>
                <h4>Idea of implementation:</h4>
                <p class="q-ml-lg">Users will add and update the information on <router-link to="/">https://catcheck.org/</router-link> for 
                rewards in CATCH tokens, launchpad tickets, and for the opportunity to add their referral link. And moderators coordinate 
                for the same CATCH tokens.
                </p>
                <p>Our problem, of course, is not at the level of SOLANA, but it exists and no one has solved it yet.</p>
              </li>
              <li>
                <p>The project grows if it creates new products with a great idea based on the needs of market participants, a good 
                example is UNISWAP with liquidity and trend DEFI projects.
                </p>
                <p>The idea behind catcheck involves 3 products:</p>
                <ol>
                  <li>All the necessary information and all the necessary tools for a successful presale or project search for 
                    an investor or an influencer or a tester, on one SITE, we get a RUNNER for regular customers and users.
                  </li>
                  <li>Our GLEAM-like Event Form (in development, will be ready soon)</li>
                  <li>
                    CATCHLABS and CATCHPAD incubation and preparation of really strong projects , our goal is to build really 
                    innovative fundamental products , which we will promote with all our website traffic (and other ways 
                    <router-link to="/catchlabs">https://catcheck.org/catchlabs</router-link>) 
                    and make tokens grow on our and partner lunchpads , with subsequent support of all our incubated projects as 
                    they mature.
                  </li>
                </ol>
              </li>
              <br>
              <li><p>If the project has good user coverage</p>
                <p>CATCHECK is basically a case of regular users and great coverage not only for CATCHECK itself and its CATCH token,
                  but also for projects incubated or added to CATCHPAD.
                </p>
              </li>
              <br>
              <li><p>Strong team</p>
                <p>Our team consists of professionals</p>
              </li>
            </ol>
          </q-card-section>
        </q-card>

      <!-- Team -->
        <q-card class="q-mt-xl" id="team">
          <q-card-section>
            <h2 @click="copyLink('team')">5. Team</h2>
            <q-separator class="qSeparator" inset />

                <div class="row q-my-md">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center justify-center">
                    <div class="q-ma-md">
                      <q-avatar class="shadow-5" size="330px">
                      <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fpatric.jpg?alt=media&token=6cea5194-b967-40a0-a78e-01363c14ae6a" alt="СEO co-founder Pavel Pylayeu" />
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center">
                    <h3>СEO co-founder Pavel Pylayeu ( pseudonym Patrick Silka )</h3>
                    <div class="text-purple q-gutter-md" style="font-size: 2em">
                      <a href="https://t.me/pavelsilka" target="_blank">
                        <q-icon color="blue" name="fab fa-telegram-plane" />
                      </a>
                    </div>
                    <div>
                    <p>Employee of <a href="http://idoresearch.ventures/" target="_blank" rel="noopener noreferrer">http://idoresearch.ventures/</a><br>
                    Cryptoanalyst<br>
                    Cryptoinvestor<br>
                    Business strategist<br>
                    Crypto Influencer (hobby) <a href="https://t.me/cryptoanalizator" target="_blank" rel="noopener noreferrer">https://t.me/cryptoanalizator</a><br>
                    <a href="https://www.youtube.com/channel/UC8o9VyOz4PYiQawtSqYR23g" target="_blank" rel="noopener noreferrer">youtube.com</a></p>
                    <p>Internet marketing specialist (SEO promotion, collection of key phrases, building site's tree (semantic core), clear 
                      understanding of SEO promotion on YouTube, analysis of target audience market and competitive environment, contextual 
                      advertising). Development(statement of terms of reference) and conversion testing of landingpages and sales funnels 
                      for any business and crypto project.
                    </p>
                    <p>
                    Background:<br>
                    Business manager<br>
                    Experience in different business spheres<br>
                    CATCHECK is what gives me the power to work 24/7 and not get tired, I found myself in this project..... who owns the traffic, owns the world
                    </p>
                    </div>
                  </div>
                </div>


                <div class="row q-my-md">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center justify-center">
                    <div class="q-ma-md">
                      <q-avatar class="shadow-5" size="330px">
                      <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fdzmiter.webp?alt=media&token=8fa9ddca-5b28-4962-93e2-3df49d36581e" alt="CTO co-founder Dzmiter" />
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center">
                    <h3>CTO co-founder Dzmiter Abramenia (Chief Technical Office)</h3>
                    <p>JavaScript Developer (Vue.js, Node.js, Quasar, Webpack, Bootstrap, NPM, SQL, NoSQL, REST API)<br>
                      Blockchain Developer (Solidity, Web3.js)<br>
                      DevOps Engineer (AWS, Digital Ocean, Heroku, Firebase, Nginx, Linux)<br>
                      Internet marketer (SEO-promotion, market analysis and competitive environment, contextual advertising Google Ads and Yandex Direct, 
                      web analytics Google Analytics and Yandex Metrika, creating and promoting video content YouTube, working with marketplace Yandex 
                      Market, Onliner.by, Deal.by)
                    </p>
                    <p>Background:<br>
                    Experience in a leading position (director), people management, negotiation and contracting. Experience in interviewing, 
                    hiring and firing employees. Experience in running his own small business.
                    </p>
                  </div>
                </div>

                <div class="row q-my-md">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center justify-center">
                    <div class="q-ma-md">
                      <q-avatar class="shadow-5" size="330px">
                      <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2FKonstantin.webp?alt=media&token=8e7ff3fc-a7d6-413f-937e-a2a72aad048a" alt="CFO co-founder Konstantin" />
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center">
                    <h3>CFO co-founder Konstantin Kalinin (Chief Financial Officer)</h3>
                    <p>Chief Analyst at <a href="https://digiu.ai/" target="_blank" rel="noopener noreferrer">https://digiu.ai</a> responsible 
                    for capital management of the company and partners.<br>
                    Building the business processes of the analytical department.<br>
                    Advanced study of defi mechanisms ( higher mathematics | theory of probability | predictive analytics).<br>
                    Development and testing of investment strategies for DEFI and crypto startups Selection of projects for found 
                    <a href="https://digiu.ai/" target="_blank" rel="noopener noreferrer">https://digiu.ai</a><br>
                    Successful portfolio and venture capital investor with five years of experience.
                    </p>
                    <p>
                      Background:<br>
                      Businessman, manager with over 10 years of experience.<br>
                      Experience in various areas of business:
                      <ul>
                        <li>organizing from the ground up</li>
                        <li>team development at different stages</li>
                        <li>production management</li>
                      </ul>
                    </p>
                  </div>
                </div>

            <div class="row q-my-md">
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center justify-center">
                    <div class="q-ma-md">
                      <q-avatar class="shadow-5" size="330px">
                      <img src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2FNAZAR-SOFRONOV.jpg?alt=media&token=6b978594-69ab-482a-bfb2-561f9b25ffc3" alt="Acting COO Nazar Safronov" />
                      </q-avatar>
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-6 row items-center">
                    <h3>Acting COO Nazar Safronov</h3>
                    <p>COO of <a href="https://towersmash.com/" target="_blank" rel="noopener noreferrer">https://towersmash.com</a><br>
                      Cryptanalyst<br>
                      Adviser<br>
                      Organization and construction of work processes in CATCHECK<br>
                    </p>
                    <p>
                      Background:<br>
                      Co-owner and manager of a small business.<br>
                      Diverse business experience: from founding a business and organizing a team/staff, to establishing 
                      collaborations, marketing, and sales.<br>
                    </p>
                  </div>
                </div>
            <q-separator class="qSeparator" inset />
            <p>FOR ALL QUESTIONS write to CEO <a href="https://t.me/pavelsilka" target="_blank" rel="noopener noreferrer">@PavelSilka</a></p>
          </q-card-section>
        </q-card>

      <!-- Tokenomics -->
        <q-card class="q-mt-xl" id="tokenomics">
          <q-card-section>
            <h2 @click="copyLink('tokenomics')">6. Tokenomics</h2>
            <q-separator class="qSeparator" inset />
            <h3 id="token-distribution" @click="copyLink('token-distribution')">6.1 Token distribution</h3>
            <strong>Token Supply 100 000 000</strong><br>
            <strong>Project Valuation $16 000 000</strong><br>
            <strong>Initial market cap $376 000</strong><br>
            <strong>Public raise $640 000</strong><br><br>
            <div class="row">
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">Token distribution
                <ul>
                  <li>Seed — 5%</li>
                  <li>Private — 15%</li>
                  <li>Community — 1%</li>
                  <li>Public round — 3%</li>
                  <li>Ecosystem — 33%</li>
                  <li>Liquidity —  18%</li>
                  <li>Reward points — 4%</li>
                  <li>Team — 14%</li>
                  <li>Advisors —7% </li>
                </ul>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">Token release schedule
                <ul>
                  <li>SEED — TGE 6%, cliff 4m than linear 20m</li>
                  <li>Private —  9% TGE, cliff 4m, than linear 14m</li>
                  <li>Сommunity — 10% TGE, than linear 10%</li>
                  <li>IDO — 10% TGE, than linear 10%</li>
                  <li>Liquidity — 20% TGE, than linear 5%</li>
                  <li>Team — cliff 11m, than quarterly vesting</li>
                  <li>Advisors — cliff 8m, than quarterly vesting</li>
                  <li>Ecosystem — the 10%, than linear 2.5%</li>
                  <li>Reward points —  4% TGE, than linear 8%</li>
                </ul>
              </div>
            </div>
            <div class="flex">
                <img style="margin: 20px auto" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Ftokenomics.png?alt=media&token=80186782-e172-4221-b7f6-6daaa6ab1913" alt="tokenomics catcheck" />
            </div>
            <p>Tokenomics can be changed before PRIVATE ROUND</p>

            <h3 id="internal-economy" @click="copyLink('internal-economy')">6.2 Internal economy</h3>
            <h4>Economics on profit from the sale of services</h4>
            <p>Project owner buys services on the site advertising, auditing, gleam form. User buys or stakes tokens for rating, 
            referral links, launchpad tickets and all other products.</p>
            <blockquote>
              <strong>Important: when buying services and products on the site, prices for services or products will be regulated by supply 
              and demand, for the comfort of users, prices will be tied to stablecoins, when paying with stablecoins, automatic 
              conversion and distribution takes place.  Part of the received CATCH tokens is burned, and part goes into liquidity, 
              the rest is distributed for the needs of the project (see below). The lack of inflation and demand will give a growing, 
              sustainable token.</strong>
            </blockquote>

            <h4>Incomes</h4>
            <p>For <strong>52.5%</strong> of received stablecoins, the smart contract <strong>redeems CATCH tokens from the market</strong> distributing tokens as follows:
            <ul>
              <li>30%  (CATCH) goes to pay for the work of users and moderators</li>
              <li>10% (CATCH) burning</li>
              <li>5% (CATCH) distribution among token holders</li>
              <li>2.5% (CATCH ) liquidity</li>
              <li>5% (CATCH) insurance bank for the project (treasury)</li>
            </ul>
            </p>
            <p><strong>The rest 47,5% stablecoins</strong> of smart-contract will be distributed the following way:
            <ul>
              <li>15% (stablecoins) team</li>
              <li>10% (stablecoins) voting bank: users decide which project to invest in by voting. We choose 10 projects that are worth 
                investing in, we announce a poll on the site and in Telegram, the project that wins the vote gets  funds, and the possible 
                future income goes to the burning and distribution to holders who vote. This is excellent marketing for our project as a whole.
              </li>
              <li>10% (stabelcoins) budgeting for the labs fund (stabelcoins)</li>
              <li>5% (stabelcoins) donation</li>
              <li>5% (+stablecoins) insurance bank for the project (treasury)</li>
              <li>2.5% (streetcoins) liquidity</li>
            </ul>
            </p>
            <h3 id="hard-cap" @click="copyLink('hard-cap')">6.3 Hard cap</h3>
            <blockquote>
              <strong>The exact amount of fundraising will be known after negotiations with funds and after we determine all the backers 
              on board and create a landing page, see roadmap .</strong>
            </blockquote>
            <p>We are planning 10 000+ growing traffic to public sale and 3mln$ hardcap (with such hardcap, you can count on famous funds) 
              here is the most probable tokenomics 
              <a class="wordWrapBreak" href="https://docs.google.com/spreadsheets/d/1G4By7-TnjAGScoHN4rAMvLh0B7OOMvGJdK_2G9SfJTg" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/1G4By7-TnjAGScoHN4rAMvLh0B7OOMvGJdK_2G9SfJTg</a>
            </p>
            <p>Where are those traffic numbers and fundraising coming from? Read our competitor analysis and marketing strategy.</p>
            <p>By the way:<br>
              Binance bought coinmarketcap for $400M <a class="wordWrapBreak" href="https://crypto-digest.net/news/318-birzha-binance-kupila-servis-coinmarketcap.html" target="_blank" rel="noopener noreferrer">https://crypto-digest.net/news/318-birzha-binance-kupila-servis-coinmarketcap.html</a><br>
              In 2020 coinmarketcap traffic at peaks was 1.5mln per day, Binance valued the site at $400M, 400M : 1.5M users = 266 times more in $ than traffic.<br> 
              By the way, coinmarketcap had over 6 million users in the last year.<br>
            </p>
            <p>We want to raise $3m with growing traffic of 10 000+ people. 10 000 X 266 = 2 660 000 $, and to increase traffic to the 
              site up to 100k people per day in the next 2 years (we should take into account that the catcheck is a story about pre sales 
              and pre-listing projects promotion, and it is many times stronger monetized, in addition, we will have token, launchpad, 
              lots of services and products, exclusivity, convenience and the market need, and the most important number in the next 10 years 
              is quite achievable, multiply by 266).
            </p>
          </q-card-section>
        </q-card>

      <!-- Analysis of similar sites -->
        <q-card class="q-mt-xl" id="analysis-of-similar-sites">
          <q-card-section>
              <h2 @click="copyLink('analysis-of-similar-sites')">7. Analysis of similar sites</h2>
            <q-separator class="qSeparator" inset />
            <h3>Comparison table</h3>
            <a class="wordWrapBreak" href="https://docs.google.com/spreadsheets/d/1cbA6iwIQK06W4B7zrOMh7U5yvtwc1SyFygj42DtUuo0" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/1cbA6iwIQK06W4B7zrOMh7U5yvtwc1SyFygj42DtUuo0</a>
            <a href="https://docs.google.com/spreadsheets/d/1cbA6iwIQK06W4B7zrOMh7U5yvtwc1SyFygj42DtUuo0" target="_blank" rel="noopener noreferrer">
              <img class="q-my-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fcomparison-table.webp?alt=media&token=6b1b6753-1417-43d1-b2f9-3c7835d75d15" alt="comparison table" />
            </a>
            <p>We collected and analyzed more than 100 information sites about cryptocurrencies. By the way, we have not found any 
              projects with similar functionality like catcheck and their own token with use cases similar to CATCH.
            </p>
            <p>The research shows that the income only from selling ads on such sites is on average about $0.5 per user per day.</p>
            <a class="wordWrapBreak" href="https://docs.google.com/spreadsheets/d/19pIAY4Vm5Ouq9PQEq_XeI0cH9TXb1UIXttuKdMhIc5U" target="_blank" rel="noopener noreferrer">https://docs.google.com/spreadsheets/d/19pIAY4Vm5Ouq9PQEq_XeI0cH9TXb1UIXttuKdMhIc5U</a>
            <a href="https://docs.google.com/spreadsheets/d/19pIAY4Vm5Ouq9PQEq_XeI0cH9TXb1UIXttuKdMhIc5U" target="_blank" rel="noopener noreferrer">
              <img class="q-my-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fsite-income-table.webp?alt=media&token=0def7290-fcf3-4865-b150-83c19fecbbef" alt="site income table" />
            </a>
            <p>Some of the sites in our study above do not sell advertising.</p>
            <p>Thanks to experience in advertising projects, our marketing department has come to the conclusion that the monetization of 
              1 user in case of fundraising for your own project is from $2 to $5 per person per day, it all depends on the project itself 
              and the conversion, which may vary because of product, project event, giveaways, website, whitepaper, teaser, team, backers 
              (funds), trend, tokenomics and other things, in a word the funnel.
            </p>
            <p>With 10,000+ users per day we can raise $20,000 - $50,000 for our projects per day or $7.3M per year, not including 
             <router-link to="/catchlabs">CATCHLABS</router-link> income from the venture capital fund, adviser tokens, and 15+ site services.
            </p>
          </q-card-section>
        </q-card>

      <!-- Marketing and traffic, site statistics -->
        <q-card class="q-mt-xl" id="marketing-and-traffic-site-statistics">
          <q-card-section>
              <h2 @click="copyLink('marketing-and-traffic-site-statistics')">8. Marketing and traffic, site statistics</h2>
            <q-separator class="qSeparator" inset />
            <p>We do not want to spend money on the purchase of advertising, because it is ineffective, so we will focus on 
              SEO promotion, and then we will buy advertising with a funnel of quality information about projects and events, 
              as well as the motivation to promote CATCHECK through video ambassador, testnet site, referral program.
            </p>
            <ol>
              <li>Quality articles about projects, buying backlinks, SEO promotion and organic traffic, writing high-quality articles 
                in English on the semantic core
              </li>
              <li>YouTube video channel on English, Spanish, German, Chinese.The plan of all the videos: an overview of the project 
                on the site itself <router-link to="/">https://catcheck.org</router-link>, look through the article and project events, 
                at the end after analyzing the project, we show how to search for the top projects on the site, and talk about testnet 
                and earn tokens catch, referral and bounty ambassador video campaign, look for popular queries. The main focus is on 
                long-term popular queries from the semantic core of the site Shooting videos on articles from the semantic core.
              </li>
              <li>Collaboration with the projects, which added to the site and wrote the article, in the "Patrners", "News" section of the site</li>
              <li>Suggestion to add a vote for the project owner in his task in Gleam form, Whitelist or Airdrop of another project about our site.</li>
              <li>Remarketing, before issuing a token, part of the money received from advertising, we spend on buying advertising.</li>
              <li>Buying advertising on incubated projects, under whitelist on our own gleam form.</li>
              <li>Buying ads from video bloggers who will be reviewing <router-link to="/">catcheck.org</router-link></li>
              <li>Shilling, gathering a team of shillers and quality promotion in Discord chats, Telegram, comments on videos promotion, 
                comments to the top, boosting reddit accounts and posts about catcheck projects.
              </li>
              <li>Facebook and instagram targeting - casting the official video teaser funnel about catcheck.org. Create a few A,B,C,D,E, videos looking 
                for the best conversion rate.</li>
              <li>Buying ads from video-bloggers from our bases with a review of the site features and our testnet, video bounty company and 
               <router-link to="/referral">lifelong referral program</router-link></li>
              <li>Creation of the project's branch on <a href="https://bitcointalk.org/" target="_blank" rel="noopener noreferrer">bitcointalk</a>.</li>
              <li>The purchase of advertising in telegram channels, discord and twitter under the guise of normal telegram channel with the 
                analysis of projects. As a result, advertising will cost 3-6 times cheaper (advertising of any project is 3-6 times more 
                expensive than a public influencer, we masquerade as a public <a href="https://t.me/catcheck_org" target="_blank" rel="noopener noreferrer">https://t.me/catcheck_org</a>).
              </li>
              <li>Mass advertising for the lottery of Whitelist spots before the public sale of CATCH tokens.</li>
              <li>Voting bank. Users decide by voting what projects to invest in. We have an amount from income, we choose 10 worthy projects and 
                we announce voting on the site. Only for people with rating, who work on the site. Rating can also be obtained for staking of 
                CATCH token. Project that wins voting gets investment, and possible future income is distributed among token 
                holders. Drawing of part of token of project that won voting, among those voting on site and who connected a wallet.</li>
              <li>Our "Event" form will soon be ready and will bring dozens of thousands of traffic. We have worked a little on the growth 
                of users, recorded a few videos and made posts in Russian telegram channels as part of the testing, at that time the 
                site was very rough, but eventually there are still regular users. Traffic is settled on the site, people come back for 
                information, the information is updated poorly in test mode, now we are working on fixing and identifying bugs.
              </li>
            </ol>
              <div class="flex">
                <img style="margin: 20px auto" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fmetrica.webp?alt=media&token=2fa8b174-8be8-4fec-8fd0-585fd9d2817c" alt="site metric" />
              </div>
              <p>Bounce rate is very good only 12.4% <br> 
                And the user time spent on the site is on average 4:19 <br>
                Excellent depth 1.83<br>
              </p>
              <p>There are pretty good indicators, considering that the site is only 30% of what is planned, and information on 90% of 
                the projects is missing and slowly updated, while we primarily fix bugs and bring to mind the current features of the site.
              </p>
              <p>% settling and adding the site to bookmarks pretty big about 65.6% +-(from 100 people who have visited the site, 65 become 
                regular users and returned to the site (which is still not working properly).
              </p>
              <a href="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fshare-of-new-users.webp?alt=media&token=a91fd1f0-e2b3-4d7c-8954-4748d7771a9b" target="_blank" rel="noopener noreferrer">
              <img class="q-mb-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fshare-of-new-users.webp?alt=media&token=a91fd1f0-e2b3-4d7c-8954-4748d7771a9b" alt="share of new users" />
              </a>
              <a href="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fshare-of-new-users-to-regular.webp?alt=media&token=35daf71d-9535-4919-a6db-d60a07c4dda3" target="_blank" rel="noopener noreferrer">
              <img class="q-my-md" src="https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesWhitepaper%2Fshare-of-new-users-to-regular.webp?alt=media&token=35daf71d-9535-4919-a6db-d60a07c4dda3" alt="share of new users to regular" />
              </a>
          </q-card-section>
        </q-card>

      <!-- Motivation to buy and hold tokens after listing -->
        <q-card class="q-mt-xl" id="motivation-to-buy-and-hold-tokens-after-listing">
          <q-card-section>
            <h2 @click="copyLink('motivation-to-buy-and-hold-tokens-after-listing')">9. Motivation to buy and hold tokens after listing</h2>
            <q-separator class="qSeparator" inset />
            <ul>
              <li>staking % (included in tokenomics)</li>
              <li>staking of liquidity pools % ( included in the tokenomics)</li>
              <li>increasing rating and more earnings by CATCH site users</li>
              <li>gaining lunchpad tickets from staking</li>
              <li>receiving % of income from services on the site among token holders</li>
              <li>purchasing services with the smart contract of a CATCH token redeemed by the project owners</li>
              <li>waiting for roadmap events, new products, CEX listings</li>
              <li>deficit of token and growth of token, due to liquidity burning and replenishment</li>
              <li>no inflation (limited number of tokens) </li>
            </ul>
          </q-card-section>
        </q-card>

      <!-- Roadmap -->
        <q-card class="q-mt-xl" id="roadmap">
          <q-card-section>
            <h2 @click="copyLink('roadmap')">10. Roadmap</h2>
            <q-separator class="qSeparator" inset />

            <div class="q-px-lg q-pb-md">
              <q-timeline color="orange">

                <q-timeline-entry
                  @click="copyLink('q3-2021')"
                  id="q3-2021"
                  title="Q3 2021"
                  subtitle="July - September, 2021"
                  icon="done_all"
                >
                  <div>
                    <ul type="disc">
                      <li>analysis of the market, problems and needs of users</li>
                      <li>formation of the idea and concept of the project</li>
                      <li>assembling a small team</li>
                      <li>registration of the domain catcheck.org and start of development</li>
                      <li>project advising and incubation</li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('q4-2021')"
                  id="q4-2021"
                  title="Q4 2021"
                  subtitle="October - December, 2021"
                  icon="done_all"
                >
                  <div>
                    <ul type="disc">
                      <li>assembling the backbone of the CATCHLABS team</li>
                      <li>development of the site and unrecorded user needs during development</li>
                      <li>advising and incubation of 2 projects by the LABS department</li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('q1-2022')"
                  id="q1-2022"
                  title="Q1 2022"
                  subtitle="January - March, 2022"
                  icon="done_all"
                >
                  <div>
                    <ul type="disc">
                      <li>launching a closed testnet on the catcheck site and filling the site</li>
                      <li>revamping the structure of the site to make active events more visible. The development and successful 
                        testing of smart contracts for cliffs and vesting on WAX in collaboration with towersmash team, for the 
                        launch of the first ever WAX built-in launchpad on CATCHPAD
                      </li>
                      <li>advising and incubation of 3 projects by the LABS department</li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('q2-2022')"
                  id="q2-2022"
                  title="Q2 2022"
                  subtitle="April - June, 2022"
                  icon="img:/icons/catcheck-logo.svg"
                  color="white"
                >
                  <div>
                    <ul type="disc">
                      <li>launching the open <router-link to="/testnet">testnet</router-link> 
                      (in development), video <router-link to="/faq#bounty-program">bounty campaign</router-link> and 
                      <router-link to="/referral">referral program</router-link> (in development)</li>
                      <li>first articles on the site</li>
                      <li>site traffic 100+</li>
                      <li>strategic partnerships with investors</li>
                      <li>raising SEED ROUND - $150K</li>
                      <li>hiring: Moderators, analysts, copywriters, video editors, translators, developers and other necessary people in the team</li>
                      <li>increase the quality content on the site, buy links, promotion on SEO</li>
                      <li>adding blocks of statistics and information to the coin</li>
                      <li>launch YouTube channels in several languages</li>
                      <li>development and adding a form of events</li>
                      <li>registration of legal entity in United Arab Emirates</li>
                      <li>increase traffic from 1000 to 5000 users per day</li>
                      <li>first Strategic Partnerships with Angels and Advisors</li>
                      <li>raising SEED ROUND for $350K</li>
                      <li>launching on CATCHPAD the first WAX blockchain project on the whitelist 
                       <a href="https://towersmash.com/" target="_blank" rel="noopener noreferrer">https://towersmash.com</a>, without 
                       token at the beginning (CATCH)
                      </li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('q3-2022')"
                  id="q3-2022"
                  title="Q3 2022"
                  subtitle="July - September, 2022"
                  color="grey"
                >
                  <div>
                    <ul type="disc">
                      <li>adding a statistics column and social network filters</li>
                      <li>add Event form</li>
                      <li>development of the Launchpad with CATCH token</li>
                      <li>adding user rating</li>
                      <li>emoji and filters adding</li>
                      <li>adding the block of invest ideas</li>
                      <li>research and work on user-friendly site features</li>
                      <li>development of new design of the site</li>
                      <li>translation of the site into top languages according to marketplace English, Spanish, Japanese, German, Chinese</li>
                      <li>creating and linking smart contract and CATCH token to existing website and launchpad</li>
                      <li>strategic partnerships, KYC verification</li>
                      <li>creating a landing page similar to this whitepaper with the addition of a list of backers, open team for everyone</li>
                      <li>community round</li>
                      <li>increasing traffic up to 5000+ users</li>
                      <li>Raising PRIVATE ROUND FROM STRATEGIC PARTNER BACKERS(funds)</li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('q4-2022')"
                  id="q4-2022"
                  title="Q4 2022"
                  subtitle="October - December, 2022"
                  color="grey"
                >
                  <div>
                    <ul type="disc">
                      <li>lottery whitelist spot via our event form (the aim is to teach people to use the site and make them regular users)</li>
                      <li>public sale</li>
                      <li>launching the first IDOs on CATCHPAD using native token</li>
                      <li>development of mini games</li>
                      <li>development of NFT marketplace</li>
                      <li>development of CATCH app for playmarket and appstore</li>
                      <li>CEX listing</li>
                    </ul>
                  </div>
                </q-timeline-entry>

                <q-timeline-entry
                  @click="copyLink('plans-for-2023-2025')"
                  id="plans-for-2023-2025"
                  subtitle="Plans for 2023 - 2025"
                  color="grey"
                >
                  <div>
                    <ul type="disc">
                      <li>DEFI products development, own DEX exchange</li>
                      <li>development of own LYNX multicurrency wallet, synchronization with DEX exchange</li>
                      <li>launch of mini game</li>
                      <li>launch of NFT marketplace</li>
                      <li>NFT collection of avatars</li>
                      <li>launch CATCH app</li>
                      <li>launch DEX exchange</li>
                      <li>launch Multi-cryptocurrency NFT user-friendly wallet similar to metamask with integration into DEX exchange, 
                        with built-in dDEX swap, stake, Pool, launchpad, crosschain bridges, credit
                      </li>
                      <li>wallet integration with VISA</li>
                      <li>wallet integration with online stores</li>
                    </ul>                   
                  </div>
                </q-timeline-entry>
                <q-timeline-entry
                  color="white"
                >
                </q-timeline-entry>
              </q-timeline>
              <p>CATCH token will not have any hidden fees embedded in the smart contract, the token will support multicurrency, so 
                      our token and stablecoin can be presented as a means of saving and payment.
              </p>
            </div>
          </q-card-section>
        </q-card>

      <!-- Offer for investors of SEED ROUND 1 -->
<!--         <q-card class="q-mt-xl" id="offer-for-investors-of-seed-round-1">
          <q-card-section>
            <h2 @click="copyLink('offer-for-investors-of-seed-round-1')">Offer for investors of SEED ROUND 1</h2>
            <q-separator class="qSeparator" inset />
            <h4>Early investors of seed round will receive:</h4>
            <ol>
              <li>discount that will give 1.6X of the public sale price</li>
              <li>access to the closed CATCH VENTURES ELITE chat, where we will give the opportunity to buy tokens with us at the pre-sale 
                SEED-PRIVATE stages, in all of our incubated and promoted CATCHLABS and CATCHPAD projects, as well as projects of our 
                partner funds and launchpads, which we will also promote through our website and conduct IDO of partner projects on the 
                CATCHPAD launchpad
              </li>
            </ol>
            <p>CATCH VENTURES ELITE includes people who can strategically help CATCHECK and all incubated or new projects added to the 
              launchpad not only with money, but also with networking, very big funds, skills, and any other help.
            </p>
            <p>As there is a private channel CATCH VENTURES PRIVATE, it gets people who can help projects with money only.</p>
            <h4>Prospects for CATCHLABS:</h4>
            <p>Right now CATCHLABS has 3 projects in incubation: <br>
              2 games and a very large and unique DEFI project (we have not even engaged targeted search and marketing in this 
              direction + in the future our catcheck site will supply us with projects for incubation, like a conveyor)
            </p>
            <p>More about incubated projects:</p>
            <ol>
              <li><a href="https://towersmash.com/" target="_blank" rel="noopener noreferrer">towersmash.com</a> taking into account developed (smart contracts on vesting and cliffs, successfully tested) 
                the first lunchpad on WAX, interesting gameplay and token use cases are in competently stretched economy, we can say 
                that such level projects don't exist on WAX, taking into account the uniqueness of the project and the idea of already 
                tested smart contracts first launchpad, we hope for project to get support from good funds, possibly from WAX itself
              </li>
              <li>It is too early to announce 2 other projects, but for sure, they are high-quality and unlike anything else: the game and DEFI project.</li>
              <li>We are negotiating with a very interesting projects on allocation in SEED rounds in exchange for our various help right now.</li>
              <li>We are also advising a unique game . This project has all chances to get on DAO MAKER</li>
            </ol>
            <p>And you have all chances to get into early sales of these and all incubated and promoted projects by buying CATCH token.</p>
            <p>An important moment, the whole above described roadmap and tokenomics can change, after the strategic partnerships with 
              backers and new angel investors, there are people interested in the project with very good strategic connections, but we do 
              not want to negotiate yet, without decent traffic on the site. Just the size of the traffic will depend on the size of the 
              hardcap of the project, we want to pick up the optimal size of fundraising, our goal is to make X and keep them, in case of 
              failure, we risk our reputation, otherwise, who needs a launchpad and incubator with their experts who could not promote 
              even themselves.
            </p>
            <blockquote>
              <strong>WARNING</strong> the public sale of token may be postponed if the market will fall heavily, we will look for the most 
                profitable points for PUBLIC SALE and listings on exchanges for X
            </blockquote>
            <p>This is what most strong projects do. <br>
              This is the best strategy in a falling market, to postpone the PUBLIC SALE dates and dive into product development and 
              features of the project, waiting for a new market growth and the right time for public sale (the CATCH tokens of the 
              main smart contract will be paid to everyone immediately after the smart contract development, look at the roadmap). 
              Timing directly depends on market behavior, the presented ROADMAP is designed for an adequate market not lower than 
              $30,000 per bitcoin.  In any case, we will strive to multiply the money invested in us under any circumstances.
            </p>
            <h4>CATCH YOUR CHANCE</h4>
            <p>To participate in seed round catcheck fill out and sign up on the whitelist 
              <a class="wordWrapBreak" href="https://docs.google.com/forms/d/e/1FAIpQLSfphegcaxVV3beh1TyiGJluIKB5Y3iykU09ZMeSC8ud30upGQ/viewform" target="_blank" rel="noopener noreferrer">https://docs.google.com/forms/d/e/1FAIpQLSfphegcaxVV3beh1TyiGJluIKB5Y3iykU09ZMeSC8ud30upGQ/viewform</a>
            </p>
            <h4>FOR ALL QUESTIONS write to CEO <a href="https://t.me/pavelsilka" target="_blank" rel="noopener noreferrer">@PavelSilka</a></h4>
            <p>SEED ROUND will be held on the site <a href="https://www.xdao.app/" target="_blank" rel="noopener noreferrer">XDAO</a><br>
              1,500,000 tokens will be sold at a price of $0.1 for an amount of $150K . Each buyer will sign a SAFT contract.
            </p>
          </q-card-section>
        </q-card> -->

      </div>
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
        <q-card class="q-pa-lg float-block">
          <q-scroll-area style="height: 670px; max-width: 500px;">
          <div>
          <router-link to="/whitepaper#about">1. About</router-link>
            <router-link class="q-ml-md" to="/whitepaper#general-overview">1.1 General overview</router-link><br>

          <router-link to="/whitepaper#ecosystem">2. Ecosystem</router-link>
            <router-link class="q-ml-md" to="/whitepaper#catcheck">2.1 Catcheck</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#read-more-about-the-products">2.1.1 Read more about the products</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#right-now-at-catcheck-we-are-working-on">2.1.2 Right now at catcheck we are working on</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#filter-with-emoji-for-projects">2.1.3 Filter with emoji for projects</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#the-coin-section">2.1.4 The coin section</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#dao-found">2.1.5 DAO Found</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#dao-voting">2.1.6 DAO Voting</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#dao-ranking">2.1.7 DAO Ranking</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#nft-avatars">2.1.8 NFT avatars</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#cryptocurrency-events-calendar">2.1.9 Cryptocurrency events calendar</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#investment-ideas">2.1.10 Investment ideas</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#rotation-of-referral-links">2.1.11 Rotation of referral links</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#notification-system">2.1.12 Notification system</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#ai-bigdata">2.1.13 AI BigData</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#otc-market">2.1.14 OTC market</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#section-for-job-seekers">2.1.15 Section for job seekers</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#influencer-section">2.1.16 Influencer section</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#elements-of-a-social-network-for-users-to-communicate">2.1.17 Elements of a social network for users to communicate</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#inbuilt-mini-games">2.1.18 Inbuilt mini-game</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#lottery">2.1.19 Lottery</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#faucets-for-points">2.1.20 Faucets for points</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#crypto-school">2.1.21 Crypto School</router-link>

            <router-link class="q-ml-md" to="/whitepaper#catchlabs">2.1 Catchlabs</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#advertisement">2.2.1 Advertisement</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#database-of-influencers">2.2.2 Database of Influencers</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#marketing-database">2.2.3 Marketing database</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#gaming-guild">2.2.4 Gaming guild</router-link>
              <router-link class="menuLeftMargin" to="/whitepaper#marketing-team">2.2.5 Marketing Team</router-link>

            <router-link class="q-ml-md" to="/whitepaper#catchpad">2.1 Catchpad</router-link><br>

          <router-link to="/whitepaper#research-of-the-market-potential">3. Research of the market potential</router-link><br>

          <router-link to="/whitepaper#analysis-of-successful-projects">4. Analysis of successful projects</router-link><br>

          <router-link to="/whitepaper#team">5. Team</router-link><br>

          <router-link to="/whitepaper#tokenomics">6. Tokenomics</router-link>
            <router-link class="q-ml-md" to="/whitepaper#token-distribution">6.1 Token distribution</router-link>
            <router-link class="q-ml-md" to="/whitepaper#internal-economy">6.2 Internal economy</router-link>
            <router-link class="q-ml-md" to="/whitepaper#hard-cap">6.3 Hard cap</router-link><br>

          <router-link to="/whitepaper#analysis-of-similar-sites">7. Analysis of similar sites</router-link><br>

          <router-link to="/whitepaper#marketing-and-traffic-site-statistics">8. Marketing and traffic, site statistics</router-link><br>

          <router-link to="/whitepaper#motivation-to-buy-and-hold-tokens-after-listing">9. Motivation to buy and hold tokens after listing</router-link><br>

          <router-link to="/whitepaper#roadmap">10. Roadmap</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q3-2021">Q3 2021</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q4-2021">Q4 2021</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q1-2022">Q1 2022</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q2-2022">Q2 2022</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q3-2022">Q3 2022</router-link>
            <router-link class="q-ml-md" to="/whitepaper#q4-2022">Q4 2022</router-link>
            <router-link class="q-ml-md" to="/whitepaper#plans-for-2023-2025">Plans for 2023 - 2025</router-link><br>

          <!-- <router-link to="/whitepaper#offer-for-investors-of-seed-round-1">Offer for investors of SEED ROUND 1</router-link> -->
          </div>
          </q-scroll-area>
        </q-card>
      </div>
    </div>

  </div>

</template>

<script>
import { createMetaMixin } from 'quasar'

const metaData = {
  // sets document title
  title: 'Whitepaper of Catcheck.org',
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  titleTemplate: title => `${title}`,

  // meta tags
  meta: {
    description: { name: 'description', content: '' },
  }
}

export default {  

  methods: {
    async copyLink(link) {
            await navigator.clipboard.writeText(`https://catcheck.org/whitepaper#${link}`)
            .then(() => {
                this.$q.notify({
                  position: 'top-right', 
                  message: `Copy link https://catcheck.org/whitepaper#${link}`, 
                  color: 'green',
                  icon: 'content_copy'
                  })
            })
            .catch((error) => {
                this.$q.notify({position: 'top-right', message: `${error}`, color: 'red'})
            })
        }
  },
  mixins: [
    createMetaMixin(metaData)
  ]

}
</script>



<style lang="sass" scoped>
a 
  text-decoration: none
  font-weight: 500

h1
    font-size: 3rem
    font-weight: 400
    line-height: 3.7rem

h2
    font-size: 1.8rem
    font-weight: 400
    line-height: 2rem
    margin-top: 10px
    margin-bottom: 0px
    padding-top:10px

h3
    font-size: 1.4rem
    line-height: 2rem
    padding-top:10px
  
h4
    font-size: 1.1rem
    line-height: 2rem
    font-weight: 500
    margin-bottom: 5px
    margin-top: 2px
    padding-top: 10px

blockquote 
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

.qSeparator
    margin-top: 10px
    margin-bottom: 20px
    max-width: 600px

img
    max-width: 100%

.container
  body.screen--xl &
    padding: 50px
  body.screen--lg &
    padding: 50px
  body.screen--md &
    padding: 30px
  body.screen--sm &
    padding: 10px
  body.screen--xs &
    padding: 0

.q-card
  body.screen--xl &
    margin: 30px 10px
  body.screen--lg &
    margin: 25px 10px
  body.screen--md &
    margin: 17px 8px
  body.screen--sm &
    margin: 15px 8px
  body.screen--xs &
    margin: 12px 8px

.q-card__section--vert
  body.screen--xl &
    padding-left: 70px
    padding-right: 70px
  body.screen--lg &
    padding-left: 60px
    padding-right: 60px
  body.screen--md &
    padding-left: 35px
    padding-right: 35px
  body.screen--sm &
    padding-left: 20px
    padding-right: 20px
  body.screen--xs &
    padding-left: 15px
    padding-right: 10px


  .btnHeight
    height: 15px
    margin-top: 22px
    margin-left: 10px

  .fabText a
    color: black


  .q-fab__actions--up
    left: -150%!important
    margin-left: -28px


.float-block
  position: sticky
  top: 80px

.float-block a
  display: block

.orangeColor
  color: rgb(255, 153, 0)

.menuLeftMargin
  margin-left: 40px

.wordWrapBreak
    word-wrap: break-word
</style>