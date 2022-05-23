<template>
  <q-layout view="hHh Lpr lff" class="bg-body">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title class="flex">
          <router-link to="/">
            <q-avatar>
              <q-icon name="img:/icons/catcheck-logo.svg" size="31px" />
            </q-avatar>
          </router-link>
          <q-btn dense to="/" class="q-mx-xs menuLinkRight">CATCHECK</q-btn>
          <q-btn dense v-if="$q.screen.gt.xs" to="/catchlabs" class="q-mx-xs menuLinkRight">CATCHLABS</q-btn>
          <q-btn dense v-if="$q.screen.gt.xs" to="/" class="q-mx-xs menuLinkRight">CATCHPAD</q-btn>
          <q-btn dense v-if="$q.screen.gt.xs" to="/about" class="q-mx-xs menuLinkRight">ABOUT</q-btn>
          <q-btn dense v-if="$q.screen.gt.xs" label="FAQ" class="q-mx-xs menuLinkRight">
            <q-menu persistent auto-close>
              <q-list style="min-width: 100px">
                <q-item clickable to="/faq#how-to-make-money-on-the-catcheck">
                  <q-item-section>How to make money on the catcheck</q-item-section>
                </q-item>
                <q-item clickable to="/faq#what-is-catcheck">
                  <q-item-section >What is catcheck</q-item-section>
                </q-item>
                <q-item clickable to="/faq#for-project-founders">
                  <q-item-section>For project founders</q-item-section>
                </q-item>
                <q-item clickable to="/faq#how-to-use-the-web-site">
                  <q-item-section>How to use the web-site</q-item-section>
                </q-item>
                <q-item clickable to="/faq#testnet">
                  <q-item-section>Testnet</q-item-section>
                </q-item>
                <q-item clickable to="/faq#how-to-add-token">
                  <q-item-section>How to add token</q-item-section>
                </q-item>
                <q-item clickable to="/faq#how-to-add-token-event">
                  <q-item-section>How to add token event</q-item-section>
                </q-item>
                <q-item clickable to="/faq#how-to-report-that-the-token-event-has-ended">
                  <q-item-section>How to report that the token event has ended</q-item-section>
                </q-item>
                <q-item clickable to="/faq#bounty-program">
                  <q-item-section>Bounty program</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-if="$q.screen.gt.xs" dense to="/faq#how-to-make-money-on-the-catcheck" text-color="yellow-12" class="q-mx-xs menuLinkRight">HOW TO EARN</q-btn>
        </q-toolbar-title>

        <q-toolbar-title class="flex flex-center" v-if="$q.screen.lt.sm">
          <a href="https://twitter.com/catcheck_org" class="socialIcon q-ml-sm" target="_blank">
            <q-icon name="fab fa-twitter" style="font-size: 1.1rem"/>
          </a>
          <a href="https://t.me/catcheck_org" class="socialIcon q-mx-sm" target="_blank">
            <q-icon name="fab fa-telegram-plane" style="font-size: 1.1rem"/>
          </a>
          <a href="https://discord.gg/S7fVnY6snN" class="socialIcon q-mx-sm" target="_blank">
            <q-icon name="fab fa-discord" style="font-size: 1.1rem" />
          </a>
          <div>
            <q-avatar v-if="$store.getters.uid" size="25px" class="q-ml-md">
              <img :src="`${$store.getters.photoUrl}`">
              <q-menu>
                <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">{{$store.getters.user}}</div>
                    <div class="q-mb-md">{{$store.getters.email}}</div>
                    <q-btn
                      v-if="$store.getters.email"
                      class="q-ma-sm buttonWidth"
                      size="md"
                      label="Logout"
                      @click="this.$store.dispatch('logout')"
                      color="primary"
                    />
                    <router-link :to = "`/`" style="text-decoration: none;">
                    <q-btn
                        class="q-ma-sm buttonWidth"
                        size="md"
                        label="Home"
                        color="primary"
                    />
                    </router-link>
                    <q-btn
                      to="user"
                      v-if="$store.getters.email"
                      class="q-ma-sm buttonWidth"
                      size="md"
                      label="Profile"
                      color="primary"
                    />
                    
                    <q-btn 
                      color="primary" 
                      v-else
                      class="q-ma-sm buttonWidth"
                      label="Profile"
                      @click="this.$store.dispatch('google')" 
                    />

                    <q-btn dense
                      class="q-ma-sm buttonWidth"
                      label="Referral"
                      color="primary"
                      to="/referral"
                    />
 
                    <q-list style="min-width: 230px">
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabTokenModeration')">
                        <q-item-section>Token Moderation</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">3</q-avatar> -->
                      </q-item>
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabPresaleModeration')">
                        <q-item-section>Presale Moderation</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">4</q-avatar> -->
                      </q-item>
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabAddModerator')">
                        <q-item-section>Add Moderator</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
                      </q-item>
                      <q-item to="/user" @click="$store.commit('tabAddToken')">
                        <q-item-section>Add Token</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">3</q-avatar> -->
                      </q-item>
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabLinkIsNotValid')">
                        <q-item-section>Link Is Not Valid</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">4</q-avatar> -->
                      </q-item>
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabEventsModerator')">
                        <q-item-section>Events on Мoderation</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
                      </q-item>
                      <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabEventsForm')">
                        <q-item-section>Events Form</q-item-section>
                        <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
                      </q-item>
                    </q-list>
                  </div>

                </div>
              </q-menu>
            </q-avatar>
            <q-icon v-else name="login" size="25px" class="q-ml-md" @click="this.$store.dispatch('google')" />
          </div>
        </q-toolbar-title>

      

    <div v-if="$q.screen.gt.sm">
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        label="Referral program"
        text-color="yellow-12"
        to="/referral"
      />
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        to="testnet"
        label="Testnet"
        text-color="yellow-12"
      />
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        to="bounty"
        label="Bounty"
        text-color="yellow-12"
      />
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        to="https://catcheck.org/faq#bounty-program"
        label="Ambassador"
        text-color="yellow-12"
      />
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        to="user"
        v-if="$store.getters.uid"
        label="Add token"
        text-color="yellow-12"
        @click="$store.commit('tabAddToken')"
      />
      <q-btn dense
        class="q-mx-xs menuLinkRight"
        to="https://catcheck.org/whitepaper"
        label="Whitepaper"
        text-color="yellow-12"
      />


    <q-avatar v-if="$store.getters.uid" class="q-px-md cursor-pointer" size="30px">
      <img :src="`${$store.getters.photoUrl}`">
      <q-menu>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-h6 q-mb-md">{{$store.getters.user}}</div>
            <div class="q-mb-md">{{$store.getters.email}}</div>
            <q-separator inset class="q-mx-lg" />
            <q-list style="min-width: 230px">
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabTokenModeration')">
                <q-item-section>Token Moderation</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">3</q-avatar> -->
              </q-item>
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabPresaleModeration')">
                <q-item-section>Presale Moderation</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">4</q-avatar> -->
              </q-item>
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabAddModerator')">
                <q-item-section>Add Moderator</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
              </q-item>
              <q-item to="/user" @click="$store.commit('tabAddToken')">
                <q-item-section>Add Token</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">3</q-avatar> -->
              </q-item>
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabLinkIsNotValid')">
                <q-item-section>Link Is Not Valid</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">4</q-avatar> -->
              </q-item>
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabEventsModerator')">
                <q-item-section>Events on Мoderation</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
              </q-item>
              <q-item v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" to="/user" @click="$store.commit('tabEventsForm')">
                <q-item-section>Events Form</q-item-section>
                <!-- <q-avatar size="sm" color="red" class="q-ma-xs" text-color="white">2</q-avatar> -->
              </q-item>
              <q-item to="/referral">
                <q-item-section>Referral program</q-item-section>
              </q-item>
            </q-list>
          </div>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="column items-center">
            <q-avatar size="72px" class="q-mb-sm">
              <img cursor :src="`${$store.getters.photoUrl}`">
            </q-avatar>

            <q-btn
              v-if="$store.getters.email"
              class="q-ma-sm buttonWidth"
              size="md"
              label="Logout"
              @click="this.$store.dispatch('logout')"
              color="primary"
            />
            <router-link :to = "`/`" style="text-decoration: none;">
            <q-btn
                class="q-ma-sm buttonWidth"
                size="md"
                label="Home"
                color="primary"
            />
            </router-link>
            <q-btn
              to="user"
              v-if="$store.getters.email"
              class="q-ma-sm buttonWidth"
              size="md"
              label="Profile"
              color="primary"
            />
            
            <q-btn 
              color="primary" 
              v-else
              size="md"
              class="q-ma-sm buttonWidth"
              label="Profile"
              @click="this.$store.dispatch('google')" 
            />
            <q-btn
              to="testnet"
              class="q-ma-sm buttonWidth"
              label="Testnet"
              color="yellow-12"
              text-color="primary"
            />
            <q-btn
              class="q-ma-sm buttonWidth"
              label="Metamask"
              @click="eth_requestAccounts"
              color="primary"
            />
          </div>
        </div>
      </q-menu>
    </q-avatar>
    <span v-if="$store.getters.uid" class="q-px-lg">My points: 
      <q-spinner-ios
      style="min-width: 33px;"
      v-if="!pointsUser"
      color="white"
      size="1.7em"
      />
      <span else class="text-weight-bold">{{pointsUser == true ? 0 : pointsUser }}</span>
    </span>
    <q-btn
      color="primary" 
      v-else
      size="md"
      class="q-ma-xs"
      label="Login"
      @click="this.$store.dispatch('google')" 
    />


      </div>
      </q-toolbar>
    </q-header>

<q-drawer
      v-model="leftDrawerOpen" 

      bordered
    >
    <q-scroll-area class="fit">
      <q-list>
        <q-list :style="$store.getters.uid ? 'margin-top: 140px;' : 'margin-top: 10px;'">
          <q-expansion-item
            v-if="$store.getters.uid"
            :duration="500"
            expand-separator
            icon="fas fa-user-tie"
            label="Profile"
            model-value
          >
          <q-separator inset />
            <q-card class="q-py-md">
              <q-item
                v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" 
                :class="($store.getters.tabSelect === 'TokenModeration' && this.$route.path === '/user') ? 'my-menu-link' : ''"
                to="/user"
                @click="$store.commit('tabTokenModeration')"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Token Moderation
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
                :class="($store.getters.tabSelect === 'PresaleModeration' && this.$route.path === '/user') ? 'my-menu-link' : ''"
                to="/user"
                @click="$store.commit('tabPresaleModeration')"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Presale Moderation
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
                :class="($store.getters.tabSelect === 'AddModerator' && this.$route.path === '/user') ? 'my-menu-link' : ''"
                to="/user"
                @click="$store.commit('tabAddModerator')"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Add Moderator
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item :class="($store.getters.tabSelect === 'AddToken' && this.$route.path === '/user') ? 'my-menu-link' : ''" to="/user" @click="$store.commit('tabAddToken')" class="q-ml-sx q-py-sm">
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Add Token
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>   
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'" 
                :class="($store.getters.tabSelect === 'LinkIsNotValid' && this.$route.path === '/user') ? 'my-menu-link' : ''" 
                to="/user" 
                @click="$store.commit('tabLinkIsNotValid')" 
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Link Is Not Valid
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
                :class="($store.getters.tabSelect === 'EventsModerator' && this.$route.path === '/user') ? 'my-menu-link' : ''"
                to="/user"
                @click="$store.commit('tabEventsModerator')"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Events on Мoderation
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
              v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
              :class="($store.getters.tabSelect === 'EventsForm' && this.$route.path === '/user') ? 'my-menu-link' : ''"
              to="/user"
              @click="$store.commit('tabEventsForm')"
              class="q-ml-sx q-py-sm">
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Events Form
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item 
              :class="this.$route.path === '/referral' ? 'my-menu-link' : ''" 
              to="/referral"
              class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Referral program
                      <!-- <q-avatar size="sm" color="red" class="q-ml-md" text-color="white">2</q-avatar> -->
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-card>
          </q-expansion-item>
        </q-list>

        <q-list>
          <q-expansion-item
            :duration="500"
            expand-separator
            icon="fas fa-question"
            label="FAQ"
            model-value
          >
          <q-separator inset />
            <q-card class="q-py-md">
              <q-item
                :class="(this.$route.path === '/faq#how-to-make-money-on-the-catcheck') ? 'my-menu-link' : ''"
                to="/faq#how-to-make-money-on-the-catcheck"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      How to make money on the catcheck
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :class="(this.$route.path === '/faq#what-is-catcheck') ? 'my-menu-link' : ''"
                to="/faq#what-is-catcheck"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      What is catcheck
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :class="(this.$route.path === '/faq#for-project-founders') ? 'my-menu-link' : ''"
                to="/faq#for-project-founders"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      For project founders
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item 
              :class="(this.$route.path === '/faq#how-to-use-the-web-site') ? 'my-menu-link' : ''" 
              to="/faq#how-to-use-the-web-site" 
              class="q-ml-sx q-py-sm">
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      How to use the web-site
                    </div>   
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :class="(this.$route.path === '/faq#testnet') ? 'my-menu-link' : ''" 
                to="/faq#testnet" 
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Testnet
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                :class="(this.$route.path === '/faq#how-to-add-token') ? 'my-menu-link' : ''"
                to="/faq#how-to-add-token"
                class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      How to add token
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
              :class="(this.$route.path === '/faq#how-to-add-token-event') ? 'my-menu-link' : ''"
              to="/faq#how-to-add-token-event"
              @click="$store.commit('tabEventsForm')"
              class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      How to add token event
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item 
              :class="(this.$route.path === '/faq#how-to-report-that-the-token-event-has-ended') ? 'my-menu-link' : ''" 
              to="/faq#how-to-report-that-the-token-event-has-ended"
              class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      How to report that the token event has ended
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item 
              :class="(this.$route.path === '/faq#bounty-program') ? 'my-menu-link' : ''" 
              to="/faq#bounty-program"
              class="q-ml-sx q-py-sm"
              >
                <q-item-section>
                  <q-item-label>
                    <div class="row justify-between items-center q-ml-lg q-mr-sm">
                      Bounty program
                    </div>
                  </q-item-label>
                </q-item-section>
              </q-item>

            </q-card>
          </q-expansion-item>
        </q-list>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <div v-if="$store.getters.uid" class="absolute-top bg-body" style="height: 130px">     
          <div class="absolute-bottom bg-transparent bg-body">            
            <q-item clickable v-ripple>
              <q-item-section side>
                <q-avatar size="50px">
                  <img :src="`${$store.getters.photoUrl}`">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label class="q-py-xs">{{$store.getters.user}}</q-item-label>
                <q-item-label class="q-py-xs"><span class="text-weight-bold">{{$store.getters.email}}</span></q-item-label>
                <q-item-label class="q-py-xs">My points: 
                  <q-spinner-dots
                    style="min-width: 38px;"
                    v-if="!pointsUser"
                    color="primary"
                    size="1.7em"
                  />
                  <span else class="text-weight-bold">{{pointsUser == true ? 0 : pointsUser }}</span>
                </q-item-label>
                <q-item-label v-if="$store.getters.role" class="q-py-xs">Status: <span class="text-weight-bold">{{$store.getters.role}}</span></q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-list>
</q-scroll-area>


        
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
     <q-footer class="primary text-white">
      <q-toolbar>
        <q-toolbar-title class="flex flex-center">
          <a href="https://twitter.com/catcheck_org" class="socialIcon q-mx-md" target="_blank">
            <q-icon name="fab fa-twitter"/>
          </a>
          <a href="https://t.me/catcheck_org" class="socialIcon q-mx-md" target="_blank">
            <q-icon name="fab fa-telegram-plane" style="font-size: 1.5rem"/>
          </a>
          <a href="https://discord.gg/S7fVnY6snN" class="socialIcon q-mx-md" target="_blank">
            <q-icon name="fab fa-discord"/>
          </a>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>

</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'


const linksList = [

  {
    title: 'Cat Check',
    icon: 'fas fa-flag',
    link: 'https://catcheck.org'
  },
    {
    title: 'Catch Labs',
    icon: 'fas fa-flask',
    link: '/catchlabs'
  },
    {
    title: 'Catch Pad',
    icon: 'fas fa-cogs',
    link: '/'
  },
    {
    title: 'About',
    icon: 'fas fa-file-alt',
    link: '/about'
  }
 /*    {
    title: 'Ecosystem',
    caption: '',
    icon: 'fas fa-recycle',
    link: '/'
  },
    {
    title: 'Roadmap',
    caption: '',
    icon: 'fas fa-sitemap',
    link: '/'
  },
    {
    title: 'Tokenomics',
    caption: '',
    icon: 'fas fa-chart-pie',
    link: '/'
  },
    {
    title: 'Partners',
    caption: '',
    icon: 'fas fa-handshake',
    link: '/'
  },
    {
    title: 'Team',
    caption: '',
    icon: 'fas fa-users',
    link: '/'
  },
    {
    title: 'Pitch',
    caption: '',
    icon: 'fas fa-file-image',
    link: '/'
  },
    {
    title: 'Docs',
    caption: '',
    icon: 'fas fa-copy',
    link: '/'
  } */
];

import { defineComponent, ref } from 'vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      expansionItem: '',
      drawer: false,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted() {

    if (this.$q.localStorage.getItem('leftDrawerOpen')) {
      this.leftDrawerOpen = this.$q.localStorage.getItem('leftDrawerOpen')
    }

  },
  watch: {
    leftDrawerOpen(newleftDrawerOpen) {
      this.$q.localStorage.set('leftDrawerOpen', newleftDrawerOpen)
    }
  },
  created() {
    this.$store.dispatch('authentication')
    this.$store.dispatch('loadToken')
  },
  computed: {
    pointsUser() {
      return this.$store.getters.pointsUser
    },
  }
})
</script>

<style lang="sass">

.bg-body
  background-color: #f1f2f3

.socialIcon
  color: white
  text-decoration: none


.betaRed
  color: red

.menuLinkRight
  color: #fff
  text-decoration: none

.menuLinkRightGray
  color: #777
  text-decoration: none
  font-size: 16px

.my-menu-link
  color: black
  background: #ff0

.buttonWidth
  width: 114px
</style>