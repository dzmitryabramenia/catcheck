<template>
<div class="flex justify-between">
    <h5 class="q-ma-lg">Promoted</h5>
    <div class="flex flex-center q-pa-sm">              
        <q-btn
            class="q-ma-xs"
            to="/catchlabs"
            label="PROJECTS ADVISING"
            color="primary"
            icon-right="fas fa-rocket"
        />
    </div>
</div>

          <q-table
            class="my-sticky-header-column-table"
            dense
            :rows="tokensPromoted"
            :columns="columnsFilter"
            row-key="name"
            :visible-columns="visibleColumns"
            :separator="separator"
            v-model:pagination="initialPagination"
            :filter="filter"
          >


          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
               {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">

            <q-tr
            :props="props"
            :id="`${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}`"
            v-if="props.row.public == true"
              >
<!-- Expand Promoted -->
              <q-td auto-width>                
                  <q-btn
                    size="sm"
                    color="primary"
                    round
                    dense
                    @click="props.expand = !props.expand, tab = 'coin', props.expand ? twitterStatistics(props.row.id) : false"
                    :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  />
              </q-td>
<!-- Img Promoted -->
              <q-td class="text-center" v-if="columnsFilterImg">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"                 
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                <img
                loading="lazy"
                class="iconToken"
                spinner-color="grey-4"
                :src="`${props.row.imgUrl}`"
                :alt="`${props.row.name} coin`"
                />
                </router-link>
              </q-td>
<!-- Name Promoted -->
              <q-td class="text-center" style="white-space: break-spaces"> 
                <q-tooltip v-if="showTooltips && props.row.topEvents" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                TOP Events - are potentially the most profitable events of the project according to our analysts
                </q-tooltip>
                <q-badge v-if="props.row.topEvents" color="yellow-12" text-color="black" label="TOP Events"/>
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                  {{ props.row.name }}
                </router-link>
              </q-td>
<!-- Symbol Promoted -->
              <q-td class="text-center" v-if="columnsFilterSymbol">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"     
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                {{ props.row.symbol }}
                </router-link>
              </q-td>
<!-- Chain Promoted -->              
              <q-td class="text-center" v-if="columnsFilterChain">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                  <div>
                    <q-icon class="iconChain" v-if="props.row.chain == 'Solana'" alt="blockchain Solana (SOL)" name="img:icons/solana-sol-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'ETH'" alt="blockchain Ethereum (ETH)" name="img:icons/ethereum-eth-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'BSC'" alt="blockchain Binance (BSC)" name="img:icons/bnb-bnb-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Avalanche'" alt="blockchain Avalanche (AVAX)" name="img:icons/avalanche-avax-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Polkadot'" alt="blockchain Polkadot (DOT)" name="img:icons/polkadot-new-dot-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Terra'" alt="blockchain Terra (LUNA)" name="img:icons/terra-luna-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'MATIC'" alt="blockchain Polygon (MATIC)" name="img:icons/polygon-matic-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Tron'" alt="blockchain Tron (TRX)" name="img:icons/tron-trx-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Fantom'" alt="blockchain Fantom (FTM)" name="img:icons/fantom-ftm-logo.svg" />
                  </div>
                {{ props.row.chain }}
                </router-link>
              </q-td>
<!-- Category Promoted -->
              <q-td class="text-center" v-if="columnsFilterCategory">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                {{ props.row.category }}
                
                </router-link>
              </q-td>
<!-- Twitter Promoted -->
              <q-td class="text-center" v-if="columnsFilterTwitter">
                <div class="row justify-center">
                  <div>
                    <q-icon class="iconChain" v-if="props.row.twitter.twitterVerified" alt="Twitter verified" style="padding-right: 10px;" name="img:icons/twitter-verified-badge.svg" size="1.6em" />
                    <q-tooltip v-if="showTooltips && props.row.twitter.twitterVerified" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                      Verified
                    </q-tooltip>
                  </div>
                  <div>
                    <q-icon class="iconChain" v-if="props.row.twitter.twitterFollowersCount" @mouseover="twitterStatistics(props.row.id)" alt="Twitter statistics" name="fab fa-twitter" style="color: #00acee;" size="1.6em" />
                    <q-tooltip class="bg-white text-black shadow-4 textTooltipTweeter" v-if="showTooltips && props.row.twitter.twitterFollowersCount" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                      <div class="flex" style="overflow: hidden">
                        <div class="q-ma-md" style="line-height: 2.2;">
                          Name: <b>{{props.row.twitter.twitterName}}</b><br>
                          Username: <b>@{{props.row.twitter.twitterUsername}}</b><br>
                          Registration: <b>{{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(props.row.twitter.twitterCreatedAt))}}</b><br>
                          Followers Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount)}}</b><br>
                          Following Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowingCount)}}</b><br>
                          Tweet Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterTweetCount)}}</b>
                        </div>
                        <div id="chart" class="q-ma-none q-pa-none">
                          <apexchart type="area" height="250" :options="chartMinOptions" :series="series"></apexchart>
                        </div>
                      </div>
                      
                    </q-tooltip>
                  </div>
                </div>
                <div v-if="props.row.twitter.twitterFollowersCount" class="flex justify-center">
                  <div>{{ new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount) }}</div>
                  <div v-if="props.row.twitter.twitterPercentage1Day > 0"><q-icon name="arrow_drop_up" color="green" size="1.5rem" /><span class="textGreen">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day)}}%</span></div>
                  <div v-else-if="props.row.twitter.twitterPercentage1Day < 0"><q-icon name="arrow_drop_down" color="red" size="1.5rem" /><span class="textRed">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day).replace(/[^,0-9]/g,'')}}%</span></div>
                  <div v-else-if="props.row.twitter.twitterPercentage1Day" class="q-pl-sm"><span class="textGray">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day)}}%</span></div>
                </div>
                <div v-if="props.row.twitter.twitterFollowersCount == undefined">
                  <q-btn
                    v-if='props.row.twitter.twitterLink == ""'
                    class="q-ma-xs twitterButtonWidth"
                    size="md"
                    label="ADD TWITTER"
                    color="primary"
                    outline
                  />
                  <q-btn
                  disabled
                  v-if="props.row.twitter.twitterLink !== ''"
                  class="q-ma-xs twitterButtonWidth"
                  size="md"
                  label="ADDED"
                  color="primary"
                >
                </q-btn>

                  <q-popup-edit v-model="twitterAddLink">
                    <p class="bold q-pt-md">Twitter:</p>

                    <q-input
                        class="minWidthInput"
                        filled
                        type="twitter"
                        v-model="twitterAddLink"
                        label="https://twitter.com/name"
                        hint="Twitter URL https://..."
                        :rules="[value => value.length == 0 || value.includes('https://twitter.com/') || value.includes('http://twitter.com/') || 'Must contain https://twitter.com/...']"
                    >
                      <template v-slot:append>
                        <q-icon name="fab fa-twitter" style="font-size: 1em;" color="primary" />
                      </template>
                    </q-input>

                    <q-btn 
                      @click="twitterPushLink(props.row.id)"
                      icon-right="send"
                      :disabled="twitterAddLink == '' || !(twitterAddLink.includes('https://twitter.com/') || twitterAddLink.includes('http://twitter.com/') || disableButton)"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </div>
              </q-td>
<!-- Presale Promoted -->
              <q-td class="text-center" v-if="columnsFilterPresale">

                <q-btn
                  disabled
                  v-if="props.row.dateLaunchModerationStartPresale !== '' && props.row.dateLaunchModerationStartPresale !== undefined"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>
                <q-btn
                    v-if="props.row.dateLaunch !== 'NoN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label="props.row.dateLaunchString"                   
                    color="primary"
                >
                    {{ props.row.dateLaunch == 'NoN' ? 'NoN' :  new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'numeric',
                                      year: 'numeric',
                                }).format(new Date(props.row.dateLaunch)) }}
                </q-btn>

                <q-btn
                    v-if="props.row.dateLaunch == 'NoN' && (props.row.dateLaunchModerationStartPresale == undefined || props.row.dateLaunchModerationStartPresale == '')"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    label="ADD LAUNCH"
                    color="primary"
                    outline
                >
                  <q-popup-proxy @before-show="'2019/03/01'" cover transition-show="scale" transition-hide="scale">
                    <q-date class="q-ma-md" subtitle="Start Presale" v-model="dateLaunchModerationStartPresale" :options="optionsStartPresale" />
                    <q-date class="q-ma-md" subtitle="End Presale" v-model="dateLaunchModerationEndPresale" :options="optionsEndPresale" />

                    <div class="row items-center justify-between q-gutter-sm q-mx-md">
                      <div class="full-width">
                      <q-input bottom-slots v-model="linkToPresale1" label="Add a link to Presale" :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale2 = !expandlinkToPresale2"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale2 ? 'remove' : 'add'"
                          />                   
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale2" bottom-slots v-model="linkToPresale2" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale3 = !expandlinkToPresale3"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale3 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale3" bottom-slots v-model="linkToPresale3" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale4 = !expandlinkToPresale4"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale4 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale4" bottom-slots v-model="linkToPresale4" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale5 = !expandlinkToPresale5"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale5 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale5" bottom-slots v-model="linkToPresale5" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale6 = !expandlinkToPresale6"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale6 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale6" bottom-slots v-model="linkToPresale6" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale7 = !expandlinkToPresale7"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale7 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale7" bottom-slots v-model="linkToPresale7" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale8 = !expandlinkToPresale8"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale8 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale8" bottom-slots v-model="linkToPresale8" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale9 = !expandlinkToPresale9"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale9 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale9" bottom-slots v-model="linkToPresale9" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale10 = !expandlinkToPresale10"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale10 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale10" bottom-slots v-model="linkToPresale10" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale10 = false"
                          round
                          dense
                          flat
                          icon="remove"
                          />
                        </template>
                      </q-input>
                      </div>
                    </div>

                    <div class="row items-center justify-between q-gutter-sm">
                      <div class="q-pa-md text-bold">Presale {{ props.row.name }}</div>
                      <div>
                        
                      <q-btn 
                        @click="dateLaunchModerationPresale(Date.parse(dateLaunchModerationStartPresale), Date.parse(dateLaunchModerationEndPresale), props.row.id,)"
                        :disabled="linkToPresale1.length <= 15"
                        icon-right="send"
                        label="Send"
                        color="green" 
                        class="q-ma-md"
                        :loading="submitting"
                      />
                      
                      <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                      </div>

                    </div>
                  </q-popup-proxy>
                </q-btn>
              </q-td>
<!-- WhiteList Promoted -->
              <q-td class="text-center" v-if="columnsFilterWhitelist">

                <q-btn
                  disabled
                  v-if="props.row.whiteListModeration == 'NFT' || props.row.whiteListModeration == 'TOKEN'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.whiteList == 'NoN' && (props.row.descriptionWhiteListModeration == undefined || props.row.descriptionWhiteListModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="whiteListModeration">
                    <p class="bold q-pt-md">WhiteList:</p>

                    <q-input
                    v-model="addLinkReferralWhitelistModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="whiteListModeration" 
                      :options="['TOKEN', 'NFT']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('TOKEN') || value.includes('NFT') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use at least 200 Latin characters']"
                                  
            
                    label="Description"
                    v-model="descriptionWhiteListModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenWhiteList(addLinkReferralWhitelistModeration, whiteListModeration, props.row.id, descriptionWhiteListModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralWhitelistModeration == '' || whiteListModeration == '' || descriptionWhiteListModeration.length <= 200"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'whitelist'"
                    v-if="props.row.whiteList == 'TOKEN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'whitelist' && props.expand ? 'WHITELIST' : 'TOKEN'"
                    :color=" tab == 'whitelist' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'whitelist' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'whitelist'"
                    v-if="props.row.whiteList == 'NFT'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'whitelist' && props.expand ? 'WHITELIST' : 'NFT'"
                    :color=" tab == 'whitelist' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'whitelist' && props.expand ? 'primary' : 'white'"
                />
              </q-td>
<!-- Airdrop Promoted -->
              <q-td class="text-center" v-if="columnsFilterAirdrop">
                <q-btn
                  disabled
                  v-if="props.row.airdropModeration == 'NFT' || props.row.airdropModeration == 'TOKEN'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.airdrop == 'NoN' && (props.row.descriptionAirdropModeration == undefined || props.row.descriptionAirdropModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="airdropModeration">
                    <p class="bold q-pt-md">Airdrop:</p>

                    <q-input
                    v-model="addLinkReferralAirdropModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="airdropModeration" 
                      :options="['TOKEN', 'NFT']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('TOKEN') || value.includes('NFT') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input 
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']" 
                    label="Description" 
                    v-model="descriptionAirdropModeration" 
                    type="textarea" 
                    dense
                    autogrow
                    counter
                    >
                    
                    <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>



                    <q-btn 
                      @click="editTokenAirdrop(addLinkReferralAirdropModeration, airdropModeration, props.row.id, descriptionAirdropModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralAirdropModeration == '' || airdropModeration == '' || descriptionAirdropModeration.length <= 200"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'airdrop'"
                    v-if="props.row.airdrop == 'TOKEN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'airdrop' && props.expand ? 'AIRDROP' : 'TOKEN'"
                    :color=" tab == 'airdrop' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'airdrop' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'airdrop'"
                    v-if="props.row.airdrop == 'NFT'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'airdrop' && props.expand ? 'AIRDROP' : 'NFT'"
                    :color=" tab == 'airdrop' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'airdrop' && props.expand ? 'primary' : 'white'"
                />
              </q-td>
<!-- Bounty Promoted -->
              <q-td class="text-center" v-if="columnsFilterBounty">
                <q-btn
                  disabled
                  v-if="props.row.bountyModeration == 'FREE' || props.row.bountyModeration == 'AMBASSADOR' || props.row.bountyModeration == 'ALLOCATION'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.bounty == 'NoN' && (props.row.descriptionBountyModeration == undefined || props.row.descriptionBountyModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="bountyModeration">
                    <p class="bold q-pt-md">Bounty:</p>

                    <q-input
                    v-model="addLinkReferralBountyModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="bountyModeration" 
                      :options="['FREE', 'AMBASSADOR', 'ALLOCATION']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('FREE') || value.includes('AMBASSADOR') || value.includes('ALLOCATION') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionBountyModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenBounty(addLinkReferralBountyModeration, bountyModeration, props.row.id, descriptionBountyModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralBountyModeration == '' || bountyModeration == '' || descriptionBountyModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>


                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'FREE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'FREE'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'AMBASSADOR'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'AMBASSADOR'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'ALLOCATION'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'ALLOCATION'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Testnet Promoted -->
              <q-td class="text-center" v-if="columnsFilterTestnet">
                <q-btn
                  disabled
                  v-if="props.row.testnetModeration == 'NODE' || props.row.testnetModeration == 'CHAIN' || props.row.testnetModeration == 'SWAP' || props.row.testnetModeration == 'GAME' || props.row.testnetModeration == 'APP' || props.row.testnetModeration == 'SITE' || props.row.testnetModeration == 'OTHER'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.testnet == 'NoN' && (props.row.descriptionTestnetModeration == undefined || props.row.descriptionTestnetModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="testnetModeration">
                    <p class="bold q-pt-md">Testnet:</p>

                    <q-input
                    v-model="addLinkReferralTestnetModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.length >= 20 || value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="testnetModeration" 
                      :options="['NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('NODE') || value.includes('CHAIN') || value.includes('SWAP') || value.includes('GAME') || value.includes('APP') || value.includes('SITE') || value.includes('OTHER') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionTestnetModeration"
                    type="textarea"
                    dense
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenTestnet(addLinkReferralTestnetModeration, testnetModeration, props.row.id, descriptionTestnetModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralTestnetModeration == '' || testnetModeration == '' || descriptionTestnetModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'NODE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'NODE'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'CHAIN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'CHAIN'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'SWAP'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'SWAP'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'GAME'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'GAME'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'APP'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'APP'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'SITE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'SITE'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'OTHER'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'OTHER'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Referral Token Promoted -->
              <q-td class="text-center" v-if="columnsFilterReferralToken">
                <q-btn
                  disabled
                  v-if="props.row.referralTokenModeration == 'fixed' || props.row.referralTokenModeration == 'percent'"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.referralToken == 'NoN' && (props.row.referralTokenModeration == undefined || props.row.referralTokenModeration == '')"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="ADD REFERRAL"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="referralTokenModeration">
                    <p class="bold q-pt-md">Referral:</p>

                    <q-input
                    v-model="addLinkReferralTokenModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="referralTokenModeration" 
                      :options="['fixed', 'percent']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('fixed') || value.includes('percent') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionReferralTokenModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editReferralToken(addLinkReferralTokenModeration, referralTokenModeration, props.row.id, descriptionReferralTokenModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralTokenModeration == '' || referralTokenModeration == '' || descriptionReferralTokenModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'referralToken'"
                    v-if="props.row.referralToken == 'fixed'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'referralToken' && props.expand ? 'REFERRAL' : 'FIXED'"
                    :color=" tab == 'referralToken' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'referralToken' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'referralToken'"
                    v-if="props.row.referralToken == 'percent'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'referralToken' && props.expand ? 'REFERRAL' : 'PERCENT'"
                    :color=" tab == 'referralToken' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'referralToken' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Staking Promoted -->
              <q-td class="text-center" v-if="columnsFilterStaking">

                <q-btn
                  disabled
                  v-if="props.row.stakingModeration"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                
                </q-btn>

                <q-btn
                  v-if="props.row.staking === 0 && (props.row.stakingModeration === 0 || props.row.stakingModeration === undefined)"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="ADD STAKING"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="stakingModeration" style="min-width: 320px;">
                    <p class="bold q-pt-md">staking:</p>

                    <q-input
                    v-model="addLinkStakingModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>
                    
                      <q-input 
                      class="q-mb-lg"
                      v-model="stakingModeration"
                      hint="Integers and floating point numbers (separator point, e.g. 5.5)"
                      label="Staking percentage"
                      :rules="[val => (!!val && /^[.0-9\s]+$/.test(val)) || 'Integers and floating point numbers (separator point, e.g. 5.5)']"
                      />

                    <q-input
                    :rules="[val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionStakingModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editStaking(addLinkStakingModeration, stakingModeration, props.row.id, descriptionStakingModeration)"
                      icon-right="send"
                      :disabled="addLinkStakingModeration == '' || stakingModeration == '' || descriptionStakingModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'staking'"
                    v-if="props.row.staking > 0"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'staking' && props.expand ? 'STAKING' : `${props.row.staking} %`"
                    :color=" tab == 'staking' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'staking' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Votes Promoted -->
              <q-td class="text-center">
                <div style="display: inline">
                  <q-btn
                      :disabled="disabledButtonVotes(dataVotesUser[props.row.id])"
                      :loading="submitting"
                      class="button-margin"
                      color="yellow-12"
                      text-color="primary"
                      icon="keyboard_arrow_up"
                      @click.stop="couterVotes(props.row.id, props.row.votes)"
                    >&nbsp;{{ props.row.votes }}
                  </q-btn>
                </div>
              </q-td>
<!-- Private Button -->          
              <q-td class="text-center" v-if="props.row.public && ($store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder')">
                <div style="display: inline">
                  <q-btn
                      class="button-margin"
                      color="primary"
                      label="private"
                      @click.stop="privateToken(props.row.id)"
                    >
                  </q-btn>
                </div>
              </q-td>
            </q-tr>
<!-- Token dropdown information Promoted -->
            <q-tr v-if="props.row.public == true" v-show="
              `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` 
              == 
              this.$router.currentRoute._value.hash.replace(/[#]\s/gi, ' ') 
              ? !props.expand 
              : props.expand"
              :props="props"
            >             
              <q-td colspan="100%">
                <div class="row">
                  <q-card style="width: 100%">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="bg-primary text-white shadow-2"
                      active-color="primary"
                      indicator-color="yellow-12"
                      active-bg-color="yellow-12"
                      align="justify"
                      inline-label
                      :breakpoint="0"
                    >
                      <q-tab name="coin" label="Coin" icon="toll"/>
                      <q-tab v-if="props.row.addLinkReferralWhitelist" name="whitelist" icon="wysiwyg" label="Whitelist" />
                      <q-tab v-if="props.row.addLinkReferralAirdrop" name="airdrop" icon="redeem" label="Airdrop" />
                      <q-tab v-if="props.row.addLinkReferralBounty" name="bounty" icon="cake" label="Bounty" />
                      <q-tab v-if="props.row.addLinkReferralTestnet" name="testnet" icon="miscellaneous_services" label="Testnet" />
                      <q-tab v-if="props.row.addLinkReferralToken" name="referralToken" icon="people" label="Referral" />
                      <q-tab v-if="props.row.addLinkStaking" name="staking" icon="fas fa-coins" label="Staking" />
                      <!-- <q-tab name="graph" label="Graph" />
                      <q-tab name="chat" label="Chat" /> -->
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
<!-- Tab Coin -->
                      <q-tab-panel name="coin">
                          <div class="col-3">
                            <div class="row">
                            <div class="col-xs-12 col-sm-4">
                            <q-card class="widthCoin q-ma-sm q-pa-md">
                                <router-link
                                  class="linkButtonDisplayBlock"
                                  target="_blank"
                                  
                                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                                >
                                  <q-btn class="q-ma-xs" color="primary" icon-right="open_in_new" label="Open token page" />
                                </router-link>
                                <div class="q-pa-sm">
                                  <strong>Token address:</strong>
                                  <br>  {{ props.row.address }}
                                </div>
                                <div class="q-pa-sm">
                                  <strong>Token added:</strong>
                                  <br> 
                                  {{ props.row.dateLaunch == 'NoN' ? 'NoN' :  new Intl.DateTimeFormat('en-En', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                  }).format(new Date(props.row.addTokenTime)) }}
                                </div>
                                <div class="q-pa-sm" v-if="props.row.dateLaunch !== 'NoN'">
                                  <strong>Token Launch:</strong>
                                  <br>
                                  {{ props.row.dateLaunch == 'NoN' ? 'NoN' : new Intl.DateTimeFormat('en-En', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                  }).format(new Date(props.row.dateLaunch)) }}
                                </div>
                                <div class="q-pa-sm" v-if="props.row.dateLaunchEnd !== 'NoN'">
                                  <strong>Token Launch End:</strong>
                                  <br>
                                  {{ props.row.dateLaunchEnd == undefined ? '' : new Intl.DateTimeFormat('en-En', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric'
                                  }).format(new Date(props.row.dateLaunchEnd)) }}
                                </div>
                                
                                <div class="q-pa-sm" style="line-height: 2.2;">
                                  <strong>Twitter:</strong><br>
                                  Name: {{props.row.twitter.twitterName}}<br>
                                  Username: @{{props.row.twitter.twitterUsername}}<br>
                                  Registration: {{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(props.row.twitter.twitterCreatedAt))}}<br>
                                  Followers Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount)}}<br>
                                  Following Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowingCount)}}<br>
                                  Tweet Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterTweetCount)}}
                                </div>

                            </q-card>
                            <q-card class="widthCoin q-ma-sm q-pa-md flex flex-center justify-between"> 
                              <a class="linkButtonDisplayBlock" v-if="props.row.website" :href="`${props.row.website}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fas fa-globe" label="Website" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.telegram" :href="`${props.row.telegram}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.twitter.twitterLink" :href="`${props.row.twitter.twitterLink}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-twitter" label="Twitter" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.discord" :href="`${props.row.discord}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-discord" label="Discord" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.youtube" :href="`${props.row.youtube}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-youtube" label="YouTube" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.twitch" :href="`${props.row.twitch}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-twitch" label="Twitch" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.facebook" :href="`${props.row.facebook}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-facebook-square" label="Facebook" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.instagram" :href="`${props.row.instagram}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-instagram" label="Instagram" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.reddit" :href="`${props.row.reddit}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.medium" :href="`${props.row.medium}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-medium-m" label="Medium" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.linkedin" :href="`${props.row.linkedin}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.github" :href="`${props.row.github}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-github-alt" label="Github" />
                              </a>
                            </q-card>
                           </div>

                            <div class="col-xs-12 col-sm-8 maxWidthCardText">
                            <q-card class="q-ma-sm q-pa-md "><strong>Description: </strong>
                              <q-card-section v-if="props.row.text">
                                <div class="descriptionToken" v-html="props.row.text"></div>
                              </q-card-section>
                            </q-card>
                            </div>
                            </div>
                          </div>
                      </q-tab-panel>
<!-- Tab Referral -->
                      <q-tab-panel v-if="props.row.addLinkReferralToken" name="referralToken">
                        <div class="col-3">
                          <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Referral</p>
                              <a :href="`${props.row.addLinkReferralToken}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Referral" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'referralToken')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingReferralTokenLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingReferralTokenLink == true"
                              />
                              </p>
                            </div>
                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Referral: </strong>
                                <q-card-section v-if="props.row.descriptionReferralToken">
                                  <div class="descriptionToken" v-html="props.row.descriptionReferralToken"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Whitelist -->
                      <q-tab-panel v-if="props.row.addLinkReferralWhitelist" name="whitelist">
                        <div class="col-3">
                          <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Whitelist</p>
                              <a :href="`${props.row.addLinkReferralWhitelist}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Whitelist" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'whitelist')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingWhitelistLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingWhitelistLink == true"
                              />
                              </p>
                            </div>
                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Whitelist: </strong>
                                <q-card-section v-if="props.row.descriptionWhitelist">
                                  <div class="descriptionToken" v-html="props.row.descriptionWhitelist"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Airdrop -->
                      <q-tab-panel v-if="props.row.addLinkReferralAirdrop" name="airdrop">
                        <div class="col-3">
                          <div class="row">

                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Airdrop</p>
                              <a :href="`${props.row.addLinkReferralAirdrop}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Airdrop" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'airdrop')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingAirdropLink == true ? 'Moderation' : 'Report & Earn'"  
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingAirdropLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Airdrop: </strong>
                                <q-card-section v-if="props.row.descriptionAirdrop">
                                  <div class="descriptionToken" v-html="props.row.descriptionAirdrop"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Bounty -->
                      <q-tab-panel v-if="props.row.addLinkReferralBounty" name="bounty">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Bounty</p>
                              <a :href="`${props.row.addLinkReferralBounty}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Bounty" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'bounty')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingBountyLink == true ? 'Moderation' : 'Report & Earn'"  
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingBountyLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Bounty: </strong>
                                <q-card-section v-if="props.row.descriptionBounty">
                                  <div class="descriptionToken" v-html="props.row.descriptionBounty"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Testnet -->
                      <q-tab-panel v-if="props.row.addLinkReferralTestnet" name="testnet">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Testnet</p>
                              <a :href="`${props.row.addLinkReferralTestnet}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Testnet" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'testnet')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingTestnetLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingTestnetLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Testnet: </strong>
                                <q-card-section v-if="props.row.descriptionTestnet">
                                  <div class="descriptionToken" v-html="props.row.descriptionTestnet"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Staking -->
                      <q-tab-panel v-if="props.row.addLinkStaking" name="staking">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Staking {{props.row.staking}} %</p>
                              <a :href="`${props.row.addLinkStaking}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Staking" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'staking')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingStakingLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingStakingLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Staking: </strong>
                                <q-card-section v-if="props.row.descriptionStaking">
                                  <div class="descriptionToken" v-html="props.row.descriptionStaking"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
                </div>
              </q-td>             
            </q-tr>
          </template>                    
        </q-table>


<q-separator inset />
    <div class="bg-body">
<!-- Filters -->
          <div class="q-py-sm">

              <div class="flex organicBlock">
                <q-toggle v-model="filtersTokens" label="Filters" class="q-mb-sx" />
                <q-toggle v-model="showTooltips" label="Show Tooltips" class="q-mb-sx" />
              </div>

            
            <q-slide-transition>
              
            <div v-show="filtersTokens" class="flex flex-center">
              <q-card class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
                <q-tooltip v-if="showTooltips" anchor="top middle" self="bottom middle" :offset="[10, 1]">
                    TOP Events - are potentially the most profitable events of the project according to our analysts
                  </q-tooltip>

                <div class="q-mx-sm">
                  <p class="pCheckbox">TOP Events</p>
                </div>
                <div>
                  <q-icon name="fas fa-trophy" size="25px" style="color: #ccc" />
                  <q-checkbox v-model="topEventsCheckbox" val="topEvents" color="primary" />
                </div>
              </q-card>
              <q-card class="col-xs-12 col-md-6 q-pl-md q-pr-sm q-py-sx q-mx-sx q-ma-sm flex flex-center">
                <div class="widthDaySelect">

                  <q-select
                  dense
                  borderless
                  v-model="daySelect"
                  :options="daySelectForm"
                  >
                  
                  </q-select>
                  <q-tooltip v-if="showTooltips" anchor="top middle" self="bottom middle" :offset="[10, 2]">
                    Filter by the date the token or event was added
                  </q-tooltip>
                </div>
              </q-card>
            <div class="q-mx-sx">
              <q-card v-if="columnsFilterCategory" class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
                <div>
                  <p class="pCheckbox">Category:</p>
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="game" label="GAMES" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="NFT" label="NFT" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="marketplaces" label="MARKETPLACES" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="DEFI" label="DEFI" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="launchpad" label="LAUNCHPAD" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="exchanges" label="EXCHANGES" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="gambling" label="GAMBLING" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="social" label="SOCIAL" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="chain" label="CHAIN" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="multi" label="MULTI" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="categoryCheckbox" val="other" label="OTHER" color="primary" />
                </div>
              </q-card>
            </div>
            <q-card v-if="columnsFilterWhitelist" class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
              <div>
                <p class="pCheckbox">Whitelist:</p>
              </div>
              <div>
                <q-checkbox v-model="whitelistCheckbox" val="NoN" label="NoN" color="primary" />
              </div>
              <div>
                <q-checkbox v-model="whitelistCheckbox" val="NFT" label="NFT" color="primary" />
              </div>
              <div>
                <q-checkbox v-model="whitelistCheckbox" val="TOKEN" label="TOKEN" color="primary" />
              </div>
            </q-card>

            <q-card v-if="columnsFilterAirdrop" class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
              <div>
                <p class="pCheckbox">Airdrop:</p>
              </div>
              <div>
                <q-checkbox v-model="airdropCheckbox" val="NoN" label="NoN" color="primary" />
              </div>
              <div>
                <q-checkbox v-model="airdropCheckbox" val="NFT" label="NFT" color="primary" />
              </div>
              <div>
                <q-checkbox v-model="airdropCheckbox" val="TOKEN" label="TOKEN" color="primary" />
              </div>
            </q-card>
            <div class="q-mx-sx">
              <q-card v-if="columnsFilterBounty" class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
                <div>
                  <p class="pCheckbox">Bounty:</p>
                </div>
                <div>
                  <q-checkbox v-model="bountyCheckbox" val="NoN" label="NoN" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="bountyCheckbox" val="FREE" label="FREE" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="bountyCheckbox" val="AMBASSADOR" label="AMBASSADOR" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="bountyCheckbox" val="ALLOCATION" label="ALLOCATION" color="primary" />
                </div>
              </q-card>
            </div>
            <div class="q-mx-sx">
              <q-card v-if="columnsFilterTestnet" class="col-xs-12 col-md-6 q-px-md q-py-sx q-mx-sx q-ma-sm flex flex-center">
                <div>
                  <p class="pCheckbox">Testnet:</p>
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="NoN" label="NoN" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="NODE" label="NODE" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="CHAIN" label="CHAIN" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="SWAP" label="SWAP" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="GAME" label="GAME" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="APP" label="APP" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="SITE" label="SITE" color="primary" />
                </div>
                <div>
                  <q-checkbox v-model="testnetCheckbox" val="OTHER" label="OTHER" color="primary" />
                </div>
              </q-card>
            </div>
            </div> 
            </q-slide-transition>           
          </div>


          <div v-if="tokens.length == 0">
            <SkeletonTableTokens />
          </div>

          <q-table
            v-else
            class="my-sticky-header-column-table"
            dense
            :rows="filterTable"
            :columns="columnsFilter"
            row-key="name"
            :visible-columns="visibleColumns"
            :separator="separator"
            v-model:pagination="initialPagination"
            :filter="filter"
          >


          <template v-slot:top="props">
            <div v-if="$q.screen.gt.xs" class="col">
              <q-toggle v-model="visibleColumns" val="imgUrl" label="img" />
              <q-toggle v-model="visibleColumns" val="symbol" label="symbol" />
              <q-toggle v-model="visibleColumns" val="chain" label="chain" />
              <q-toggle v-model="visibleColumns" val="category" label="category" />
              <q-toggle v-model="visibleColumns" val="twitter" label="twitter" />
              <q-toggle v-model="visibleColumns" val="presale" label="presale" />
              <q-toggle v-model="visibleColumns" val="whiteList" label="whitelist" />
              <q-toggle v-model="visibleColumns" val="airdrop" label="airdrop" />
              <q-toggle v-model="visibleColumns" val="bounty" label="bounty" />
              <q-toggle v-model="visibleColumns" val="testnet" label="testnet" />
              <q-toggle v-model="visibleColumns" val="referralToken" label="referral" />
              <q-toggle v-model="visibleColumns" val="staking" label="staking" />
            </div>

            <q-select
              v-else
              v-model="visibleColumns"
              multiple
              borderless
              :display-value="$q.lang.table.columns"
              emit-value
              map-options
              :options="columns"
              label="hide / show columns"
              option-value="name"
              style="width: 147px"
              >
              
                <template v-slot:after-options>
                  <q-card-actions align="right">
                    <q-btn class="q-mx-md" v-close-popup label="Close" color="primary" />
                  </q-card-actions>
                </template>

                <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
                  <q-item v-bind="itemProps">
                    <q-item-section>
                      <q-item-label v-html="opt.label" />
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>

<!--           <q-select
              dense
              filled
              v-model="daySelect"
              :options="options"
              label="launch in days"
              style="min-width: 126px"
            />

            <q-btn icon="event" label="presale" color="primary" class="q-ma-md">
              <q-popup-proxy @before-show="model" cover transition-show="scale" transition-hide="scale">
                <q-date v-model="model" range mask="YYYY-MM-DD">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="Reset" color="primary" flat @click="resetData" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-btn> -->

            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-btn
              v-if="$q.screen.gt.xs"
              flat round dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              class="q-ml-md"
            />
          </template>


          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th auto-width />
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
               {{ col.label }}
              </q-th>
            </q-tr>
          </template>

          <template v-slot:body="props">

            <q-tr
              :props="props"
              :id="`${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}`"
              v-if="props.row.public == true"
            >

              <q-td auto-width>
                
                  <q-btn
                    size="sm"
                    color="primary"
                    round
                    dense
                    @click="props.expand = !props.expand, tab = 'coin', props.expand ? twitterStatistics(props.row.id) : false"
                    :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
                  />
              </q-td>
              
              <q-td class="text-center" v-if="columnsFilterImg">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"                 
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                <img
                loading="lazy"
                class="iconToken"
                spinner-color="grey-4"
                :src="`${props.row.imgUrl}`"
                :alt="`${props.row.name} coin`"
                />
                </router-link>
              </q-td>

              <q-td class="text-center" style="white-space: break-spaces">
                
                <q-tooltip v-if="showTooltips && props.row.topEvents" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                TOP Events - are potentially the most profitable events of the project according to our analysts
                </q-tooltip>
                <q-badge v-if="props.row.topEvents" color="yellow-12" text-color="black" label="TOP Events"/>
                
                <router-link
                
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                  <div >
                    {{ props.row.name }}
                  </div>
                  
                </router-link>
              </q-td>
              <q-td class="text-center" v-if="columnsFilterSymbol">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"     
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                {{ props.row.symbol }}<br>
                </router-link>
              </q-td>
              <q-td class="text-center" v-if="columnsFilterChain">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                
                  <div>
                    <q-icon class="iconChain" v-if="props.row.chain == 'Solana'" alt="blockchain Solana (SOL)" name="img:icons/solana-sol-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'ETH'" alt="blockchain Ethereum (ETH)" name="img:icons/ethereum-eth-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'BSC'" alt="blockchain Binance (BSC)" name="img:icons/bnb-bnb-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Avalanche'" alt="blockchain Avalanche (AVAX)" name="img:icons/avalanche-avax-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Polkadot'" alt="blockchain Polkadot (DOT)" name="img:icons/polkadot-new-dot-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Terra'" alt="blockchain Terra (LUNA)" name="img:icons/terra-luna-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'MATIC'" alt="blockchain Polygon (MATIC)" name="img:icons/polygon-matic-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Tron'" alt="blockchain Tron (TRX)" name="img:icons/tron-trx-logo.svg" />
                    <q-icon class="iconChain" v-if="props.row.chain == 'Fantom'" alt="blockchain Fantom (FTM)" name="img:icons/fantom-ftm-logo.svg" />
                  </div>
                {{ props.row.chain }}
                </router-link>
              </q-td>
<!-- Category -->               
              <q-td class="text-center" v-if="columnsFilterCategory">
                <router-link
                  class="linkButtonDisplayBlock"
                  target="_blank"
                  :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                  >
                {{ props.row.category }}
                </router-link>
              </q-td>
<!-- Twitter -->              
              <q-td class="text-center" v-if="columnsFilterTwitter">
                <div class="row justify-center">
                  <div>
                    <q-icon class="iconChain" v-if="props.row.twitter.twitterVerified" alt="Twitter verified" style="padding-right: 10px;" name="img:icons/twitter-verified-badge.svg" size="1.6em" />
                    <q-tooltip v-if="showTooltips && props.row.twitter.twitterVerified" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                      Verified
                    </q-tooltip>
                  </div>
                  <div>
                    <q-icon class="iconChain" v-if="props.row.twitter.twitterFollowersCount" @mouseover="twitterStatistics(props.row.id)" alt="Twitter statistics" name="fab fa-twitter" style="color: #00acee;" size="1.6em" />
                    <q-tooltip class="bg-white text-black shadow-4 textTooltipTweeter" v-if="showTooltips && props.row.twitter.twitterFollowersCount" anchor="top middle" self="bottom middle" :offset="[10, 0]">
                      <div class="flex" style="overflow: hidden">
                        <div class="q-ma-md" style="line-height: 2.2;">
                          Name: <b>{{props.row.twitter.twitterName}}</b><br>
                          Username: <b>@{{props.row.twitter.twitterUsername}}</b><br>
                          Registration: <b>{{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(props.row.twitter.twitterCreatedAt))}}</b><br>
                          Followers Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount)}}</b><br>
                          Following Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowingCount)}}</b><br>
                          Tweet Count: <b>{{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterTweetCount)}}</b>
                        </div>
                        <div id="chart" class="q-ma-none q-pa-none">
                          <apexchart type="area" height="250" :options="chartMinOptions" :series="series"></apexchart>
                        </div>
                      </div>
                      
                    </q-tooltip>
                  </div>
                </div>
                <div v-if="props.row.twitter.twitterFollowersCount" class="flex justify-center">
                  <div>{{ new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount) }}</div>
                  <div v-if="props.row.twitter.twitterPercentage1Day > 0"><q-icon name="arrow_drop_up" color="green" size="1.5rem" /><span class="textGreen">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day)}}%</span></div>
                  <div v-else-if="props.row.twitter.twitterPercentage1Day < 0"><q-icon name="arrow_drop_down" color="red" size="1.5rem" /><span class="textRed">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day).replace(/[^,0-9]/g,'')}}%</span></div>
                  <div v-else-if="props.row.twitter.twitterPercentage1Day" class="q-pl-sm"><span class="textGray">{{ new Intl.NumberFormat('ru-RU', { maximumSignificantDigits: 2 }).format(props.row.twitter.twitterPercentage1Day)}}%</span></div>
                </div>
                <div v-if="props.row.twitter.twitterFollowersCount == undefined">
                  <q-btn
                    v-if='props.row.twitter.twitterLink == ""'
                    class="q-ma-xs twitterButtonWidth"
                    size="md"
                    label="ADD TWITTER"
                    color="primary"
                    outline
                  />
                  <q-btn
                  disabled
                  v-if="props.row.twitter.twitterLink !== ''"
                  class="q-ma-xs twitterButtonWidth"
                  size="md"
                  label="ADDED"
                  color="primary"
                >
                </q-btn>

                  <q-popup-edit v-model="twitterAddLink">
                    <p class="bold q-pt-md">Twitter:</p>

                    <q-input
                        class="minWidthInput"
                        filled
                        type="twitter"
                        v-model="twitterAddLink"
                        label="https://twitter.com/name"
                        hint="Twitter URL https://..."
                        :rules="[value => value.length == 0 || value.includes('https://twitter.com/') || value.includes('http://twitter.com/') || 'Must contain https://twitter.com/...']"
                    >
                      <template v-slot:append>
                        <q-icon name="fab fa-twitter" style="font-size: 1em;" color="primary" />
                      </template>
                    </q-input>

                    <q-btn 
                      @click="twitterPushLink(props.row.id)"
                      icon-right="send"
                      :disabled="twitterAddLink == '' || !(twitterAddLink.includes('https://twitter.com/') || twitterAddLink.includes('http://twitter.com/') || disableButton)"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </div>
              </q-td>
<!-- Presale -->
              <q-td class="text-center" v-if="columnsFilterPresale">

                <q-btn
                  disabled
                  v-if="props.row.dateLaunchModerationStartPresale !== '' && props.row.dateLaunchModerationStartPresale !== undefined"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>
                <q-btn
                    v-if="props.row.dateLaunch !== 'NoN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label="props.row.dateLaunchString"                   
                    color="primary"
                >
                  <q-tooltip v-if="showTooltips" anchor="top middle" self="bottom middle" :offset="[10, 1]">
                    {{ props.row.dateLaunch == 'NoN' ? 'NoN' :  new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                }).format(new Date(props.row.dateLaunch)) }}
                  </q-tooltip>
                </q-btn>

                <q-btn
                    v-if="props.row.dateLaunch == 'NoN' && (props.row.dateLaunchModerationStartPresale == undefined || props.row.dateLaunchModerationStartPresale == '')"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    label="ADD LAUNCH"
                    color="primary"
                    outline
                >
                  <q-popup-proxy @before-show="'2019/03/01'" cover transition-show="scale" transition-hide="scale">
                    <q-date class="q-ma-md" subtitle="Start Presale" v-model="dateLaunchModerationStartPresale" :options="optionsStartPresale" />
                    <q-date class="q-ma-md" subtitle="End Presale" v-model="dateLaunchModerationEndPresale" :options="optionsEndPresale" />

                    <div class="row items-center justify-between q-gutter-sm q-mx-md">
                      <div class="full-width">
                      <q-input bottom-slots v-model="linkToPresale1" label="Add a link to Presale" :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale2 = !expandlinkToPresale2"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale2 ? 'remove' : 'add'"
                          />                   
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale2" bottom-slots v-model="linkToPresale2" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale3 = !expandlinkToPresale3"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale3 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale3" bottom-slots v-model="linkToPresale3" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale4 = !expandlinkToPresale4"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale4 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale4" bottom-slots v-model="linkToPresale4" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale5 = !expandlinkToPresale5"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale5 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale5" bottom-slots v-model="linkToPresale5" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale6 = !expandlinkToPresale6"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale6 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale6" bottom-slots v-model="linkToPresale6" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale7 = !expandlinkToPresale7"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale7 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale7" bottom-slots v-model="linkToPresale7" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale8 = !expandlinkToPresale8"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale8 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale8" bottom-slots v-model="linkToPresale8" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale9 = !expandlinkToPresale9"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale9 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale9" bottom-slots v-model="linkToPresale9" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale10 = !expandlinkToPresale10"
                          round
                          dense
                          flat
                          :icon="expandlinkToPresale10 ? 'remove' : 'add'"
                          />
                        </template>
                      </q-input>

                      <q-input v-if="expandlinkToPresale10" bottom-slots v-model="linkToPresale10" label="Add a link to Presale" dense>
                        <template v-slot:hint>
                          https://...
                        </template>
                        <template v-slot:append>
                          <q-btn
                          @click="expandlinkToPresale10 = false"
                          round
                          dense
                          flat
                          icon="remove"
                          />
                        </template>
                      </q-input>
                      </div>
                    </div>

                    <div class="row items-center justify-between q-gutter-sm">
                      <div class="q-pa-md text-bold">Presale {{ props.row.name }}</div>
                      <div>
                        
                      <q-btn 
                        @click="dateLaunchModerationPresale(Date.parse(dateLaunchModerationStartPresale), Date.parse(dateLaunchModerationEndPresale), props.row.id,)"
                        :disabled="linkToPresale1.length <= 15"
                        icon-right="send"
                        label="Send"
                        color="green" 
                        class="q-ma-md"
                        :loading="submitting"
                      />
                      
                      <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                      </div>

                    </div>
                  </q-popup-proxy>
                </q-btn>
              </q-td>
<!-- WhiteList -->
              <q-td class="text-center" v-if="columnsFilterWhitelist">

                <q-btn
                  disabled
                  v-if="props.row.whiteListModeration == 'NFT' || props.row.whiteListModeration == 'TOKEN'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.whiteList == 'NoN' && (props.row.descriptionWhiteListModeration == undefined || props.row.descriptionWhiteListModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="whiteListModeration">
                    <p class="bold q-pt-md">WhiteList:</p>

                    <q-input
                    v-model="addLinkReferralWhitelistModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="whiteListModeration" 
                      :options="['TOKEN', 'NFT']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('TOKEN') || value.includes('NFT') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use at least 200 Latin characters']"
                                  
            
                    label="Description"
                    v-model="descriptionWhiteListModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenWhiteList(addLinkReferralWhitelistModeration, whiteListModeration, props.row.id, descriptionWhiteListModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralWhitelistModeration == '' || whiteListModeration == '' || descriptionWhiteListModeration.length <= 200"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'whitelist'"
                    v-if="props.row.whiteList == 'TOKEN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'whitelist' && props.expand ? 'WHITELIST' : 'TOKEN'"
                    :color=" tab == 'whitelist' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'whitelist' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'whitelist'"
                    v-if="props.row.whiteList == 'NFT'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'whitelist' && props.expand ? 'WHITELIST' : 'NFT'"
                    :color=" tab == 'whitelist' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'whitelist' && props.expand ? 'primary' : 'white'"
                />
              </q-td>
<!-- Airdrop -->
              <q-td class="text-center" v-if="columnsFilterAirdrop">
                <q-btn
                  disabled
                  v-if="props.row.airdropModeration == 'NFT' || props.row.airdropModeration == 'TOKEN'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.airdrop == 'NoN' && (props.row.descriptionAirdropModeration == undefined || props.row.descriptionAirdropModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="airdropModeration">
                    <p class="bold q-pt-md">Airdrop:</p>

                    <q-input
                    v-model="addLinkReferralAirdropModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="airdropModeration" 
                      :options="['TOKEN', 'NFT']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('TOKEN') || value.includes('NFT') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input 
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']" 
                    label="Description" 
                    v-model="descriptionAirdropModeration" 
                    type="textarea" 
                    dense
                    autogrow
                    counter
                    >
                    
                    <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>



                    <q-btn 
                      @click="editTokenAirdrop(addLinkReferralAirdropModeration, airdropModeration, props.row.id, descriptionAirdropModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralAirdropModeration == '' || airdropModeration == '' || descriptionAirdropModeration.length <= 200"
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'airdrop'"
                    v-if="props.row.airdrop == 'TOKEN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'airdrop' && props.expand ? 'AIRDROP' : 'TOKEN'"
                    :color=" tab == 'airdrop' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'airdrop' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'airdrop'"
                    v-if="props.row.airdrop == 'NFT'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'airdrop' && props.expand ? 'AIRDROP' : 'NFT'"
                    :color=" tab == 'airdrop' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'airdrop' && props.expand ? 'primary' : 'white'"
                />
              </q-td>
<!-- Bounty -->
              <q-td class="text-center" v-if="columnsFilterBounty">
                <q-btn
                  disabled
                  v-if="props.row.bountyModeration == 'FREE' || props.row.bountyModeration == 'AMBASSADOR' || props.row.bountyModeration == 'ALLOCATION'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.bounty == 'NoN' && (props.row.descriptionBountyModeration == undefined || props.row.descriptionBountyModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="bountyModeration">
                    <p class="bold q-pt-md">Bounty:</p>

                    <q-input
                    v-model="addLinkReferralBountyModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="bountyModeration" 
                      :options="['FREE', 'AMBASSADOR', 'ALLOCATION']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('FREE') || value.includes('AMBASSADOR') || value.includes('ALLOCATION') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionBountyModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenBounty(addLinkReferralBountyModeration, bountyModeration, props.row.id, descriptionBountyModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralBountyModeration == '' || bountyModeration == '' || descriptionBountyModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>


                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'FREE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'FREE'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'AMBASSADOR'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'AMBASSADOR'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'bounty'"
                    v-if="props.row.bounty == 'ALLOCATION'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'bounty' && props.expand ? 'BOUNTY' : 'ALLOCATION'"
                    :color=" tab == 'bounty' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'bounty' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Testnet -->
              <q-td class="text-center" v-if="columnsFilterTestnet">
                <q-btn
                  disabled
                  v-if="props.row.testnetModeration == 'NODE' || props.row.testnetModeration == 'CHAIN' || props.row.testnetModeration == 'SWAP' || props.row.testnetModeration == 'GAME' || props.row.testnetModeration == 'APP' || props.row.testnetModeration == 'SITE' || props.row.testnetModeration == 'OTHER'"
                  class="q-ma-xs"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.testnet == 'NoN' && (props.row.descriptionTestnetModeration == undefined || props.row.descriptionTestnetModeration == '')"
                  class="q-ma-xs"
                  size="md"
                  label="ADD & EARN"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="testnetModeration">
                    <p class="bold q-pt-md">Testnet:</p>

                    <q-input
                    v-model="addLinkReferralTestnetModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.length >= 20 || value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="testnetModeration" 
                      :options="['NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('NODE') || value.includes('CHAIN') || value.includes('SWAP') || value.includes('GAME') || value.includes('APP') || value.includes('SITE') || value.includes('OTHER') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[ val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionTestnetModeration"
                    type="textarea"
                    dense
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editTokenTestnet(addLinkReferralTestnetModeration, testnetModeration, props.row.id, descriptionTestnetModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralTestnetModeration == '' || testnetModeration == '' || descriptionTestnetModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'NODE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'NODE'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'CHAIN'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'CHAIN'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'SWAP'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'SWAP'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'GAME'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'GAME'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'APP'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'APP'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'SITE'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'SITE'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'testnet'"
                    v-if="props.row.testnet == 'OTHER'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'testnet' && props.expand ? 'TESTNET' : 'OTHER'"
                    :color=" tab == 'testnet' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'testnet' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Referral Token -->
              <q-td class="text-center" v-if="columnsFilterReferralToken">
                <q-btn
                  disabled
                  v-if="props.row.referralTokenModeration == 'fixed' || props.row.referralTokenModeration == 'percent'"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                </q-btn>

                <q-btn
                  v-if="props.row.referralToken == 'NoN' && (props.row.referralTokenModeration == undefined || props.row.referralTokenModeration == '')"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="ADD REFERRAL"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="referralTokenModeration">
                    <p class="bold q-pt-md">Referral:</p>

                    <q-input
                    v-model="addLinkReferralTokenModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-select 
                      v-model="referralTokenModeration" 
                      :options="['fixed', 'percent']" 
                      dense
                      label="Choose type"
                      behavior="menu"
                      :rules="[value => value.includes('fixed') || value.includes('percent') || 'Choose type']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-check" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-select>

                    <q-input
                    :rules="[val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionReferralTokenModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editReferralToken(addLinkReferralTokenModeration, referralTokenModeration, props.row.id, descriptionReferralTokenModeration)"
                      icon-right="send"
                      :disabled="addLinkReferralTokenModeration == '' || referralTokenModeration == '' || descriptionReferralTokenModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'referralToken'"
                    v-if="props.row.referralToken == 'fixed'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'referralToken' && props.expand ? 'REFERRAL' : 'FIXED'"
                    :color=" tab == 'referralToken' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'referralToken' && props.expand ? 'primary' : 'white'"
                />

                <q-btn
                   @click="props.expand = !props.expand, tab = 'referralToken'"
                    v-if="props.row.referralToken == 'percent'"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'referralToken' && props.expand ? 'REFERRAL' : 'PERCENT'"
                    :color=" tab == 'referralToken' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'referralToken' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Staking -->
              <q-td class="text-center" v-if="columnsFilterStaking">

                <q-btn
                  disabled
                  v-if="props.row.stakingModeration"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="MODERATION"
                  color="primary"
                >
                
                </q-btn>

                <q-btn
                  v-if="props.row.staking === 0 && (props.row.stakingModeration === 0 || props.row.stakingModeration === undefined)"
                  class="q-ma-xs buttonWidth"
                  size="md"
                  label="ADD STAKING"
                  color="primary"
                  outline
                >

                  <q-popup-edit v-model="stakingModeration" style="min-width: 320px;">
                    <p class="bold q-pt-md">staking:</p>

                    <q-input
                    v-model="addLinkStakingModeration"
                    dense
                    placeholder="Referral Link https://site.com/..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-link" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>
                    
                      <q-input 
                      class="q-mb-lg"
                      v-model="stakingModeration"
                      hint="Integers and floating point numbers (separator point, e.g. 5.5)"
                      label="Staking percentage"
                      :rules="[val => (!!val && /^[.0-9\s]+$/.test(val)) || 'Integers and floating point numbers (separator point, e.g. 5.5)']"
                      />

                    <q-input
                    :rules="[val => val.length >= 200 || 'Please use minimum 200 latin characters']"
                    label="Description"
                    v-model="descriptionStakingModeration"
                    type="textarea"
                    dense
                    autogrow
                    counter
                    >
                      <template v-slot:prepend>
                        <q-icon class="q-pa-xs" name="fas fa-pen" color="grey-5" style="font-size: 0.8em;"/>
                      </template>
                    </q-input>

                    <q-btn 
                      @click="editStaking(addLinkStakingModeration, stakingModeration, props.row.id, descriptionStakingModeration)"
                      icon-right="send"
                      :disabled="addLinkStakingModeration == '' || stakingModeration == '' || descriptionStakingModeration.length <= 200 "
                      label="Send" 
                      color="green" 
                      class="q-ma-md"
                      :loading="submitting"
                      v-close-popup
                    />
                    <q-btn v-close-popup class="q-ma-md" icon-right="close" label="Close"  color="red"/>
                  </q-popup-edit>
                </q-btn>

                <q-btn
                   @click="props.expand = !props.expand, tab = 'staking'"
                    v-if="props.row.staking > 0"
                    class="q-ma-xs buttonWidth"
                    size="md"
                    :label=" tab == 'staking' && props.expand ? 'STAKING' : `${props.row.staking} %`"
                    :color=" tab == 'staking' && props.expand ? 'yellow-12' : 'primary'"
                    :text-color=" tab == 'staking' && props.expand ? 'primary' : 'white'"
                />

              </q-td>
<!-- Votes -->
              <q-td class="text-center">
                <div style="display: inline">
                  <q-btn
                      :disabled="disabledButtonVotes(dataVotesUser[props.row.id])"
                      :loading="submitting"
                      class="button-margin"
                      color="yellow-12"
                      text-color="primary"
                      icon="keyboard_arrow_up"
                      @click.stop="couterVotes(props.row.id, props.row.votes)"
                    >&nbsp;{{ props.row.votes }}
                  </q-btn>
                </div>
              </q-td>
<!-- Private Button -->          
              <q-td class="text-center" v-if="props.row.public && ($store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder')">
                <div style="display: inline">
                  <q-btn
                      class="button-margin"
                      color="primary"
                      label="private"
                      @click.stop="privateToken(props.row.id)"
                    >
                  </q-btn>
                </div>
              </q-td>
            </q-tr>
<!-- Token dropdown information -->
            <q-tr 
              v-if="props.row.public == true" 
              v-show="
              `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` 
              == 
              this.$router.currentRoute._value.hash.replace(/[#]\s/gi, ' ') 
              ? !props.expand 
              : props.expand"
              :props="props"
            >   
                    
              <q-td colspan="100%">
                <q-intersection>
                <div class="row">
                  <q-card style="width: 100%">
                    <q-tabs
                      v-model="tab"
                      dense
                      class="bg-primary text-white shadow-2"
                      active-color="primary"
                      indicator-color="yellow-12"
                      active-bg-color="yellow-12"
                      align="justify"
                      inline-label
                      :breakpoint="0"
                    >
                      <q-tab name="coin" label="Coin" icon="toll"/>
                      <q-tab v-if="props.row.addLinkReferralWhitelist" name="whitelist" icon="wysiwyg" label="Whitelist" />
                      <q-tab v-if="props.row.addLinkReferralAirdrop" name="airdrop" icon="redeem" label="Airdrop" />
                      <q-tab v-if="props.row.addLinkReferralBounty" name="bounty" icon="cake" label="Bounty" />
                      <q-tab v-if="props.row.addLinkReferralTestnet" name="testnet" icon="miscellaneous_services" label="Testnet" />
                      <q-tab v-if="props.row.addLinkReferralToken" name="referralToken" icon="people" label="Referral" />
                      <q-tab v-if="props.row.addLinkStaking" name="staking" icon="fas fa-coins" label="Staking" />
                      <!-- <q-tab name="graph" label="Graph" />
                      <q-tab name="chat" label="Chat" /> -->
                    </q-tabs>

                    <q-separator />

                    <q-tab-panels v-model="tab" animated>
<!-- Tab Coin -->
                      <q-tab-panel name="coin">
                          <div class="col-3">
                            <div class="row">
                            <div class="col-xs-12 col-sm-4">
                            <q-card class="widthCoin q-ma-sm q-pa-md">
                              <router-link
                                class="linkButtonDisplayBlock"
                                target="_blank"
                                
                                :to="{ name: 'token', params: { token: `${(props.row.name).toLowerCase().trim().replace(/[^a-z0-9]/g,'')}` }}"             
                                >
                                <q-btn class="q-ma-xs" color="primary" icon-right="open_in_new" label="Open" />
                              </router-link>
                              <div class="q-pa-sm">
                                <strong>Token address:</strong>
                                <br>  {{ props.row.address }}
                              </div>
                              <div class="q-pa-sm">
                                <strong>Token added:</strong>
                                <br> 
                                {{ props.row.dateLaunch == 'NoN' ? 'NoN' :  new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                }).format(new Date(props.row.addTokenTime)) }}
                              </div>
                              <div class="q-pa-sm" v-if="props.row.dateLaunch !== 'NoN'">
                                <strong>Token Launch:</strong>
                                <br>
                                {{ props.row.dateLaunch == 'NoN' ? 'NoN' : new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric'
                                }).format(new Date(props.row.dateLaunch)) }}
                              </div>
                              <div class="q-pa-sm" v-if="props.row.dateLaunchEnd !== 'NoN'">
                                <strong>Token Launch End:</strong>
                                <br>
                                {{ props.row.dateLaunchEnd == undefined ? '' : new Intl.DateTimeFormat('en-En', {
                                      day: '2-digit',
                                      month: 'long',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: 'numeric'
                                }).format(new Date(props.row.dateLaunchEnd)) }}
                              </div>
                              <div v-if="props.row.twitter.twitterName" class="q-pa-sm" style="line-height: 2.2;">
                                  <strong>Twitter:</strong><br>
                                  Name: {{props.row.twitter.twitterName}}<br>
                                  Username: @{{props.row.twitter.twitterUsername}}<br>
                                  <!-- Registration: {{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(props.row.twitter.twitterCreatedAt))}}<br> -->
                                  Followers Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowersCount)}}<br>
                                  Following Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterFollowingCount)}}<br>
                                  Tweet Count: {{new Intl.NumberFormat('ru-RU').format(props.row.twitter.twitterTweetCount)}}
                                </div>
                            </q-card>
                            <q-card class="widthCoin q-ma-sm q-pa-md flex flex-center justify-between"> 
                              <a class="linkButtonDisplayBlock" v-if="props.row.website" :href="`${props.row.website}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fas fa-globe" label="Website" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.telegram" :href="`${props.row.telegram}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.twitter.twitterLink" :href="`${props.row.twitter.twitterLink}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-twitter" label="Twitter" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.discord" :href="`${props.row.discord}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-discord" label="Discord" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.youtube" :href="`${props.row.youtube}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-youtube" label="YouTube" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.twitch" :href="`${props.row.twitch}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-twitch" label="Twitch" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.facebook" :href="`${props.row.facebook}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-facebook-square" label="Facebook" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.instagram" :href="`${props.row.instagram}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-instagram" label="Instagram" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.reddit" :href="`${props.row.reddit}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.medium" :href="`${props.row.medium}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-medium-m" label="Medium" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.linkedin" :href="`${props.row.linkedin}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                              </a>

                              <a class="linkButtonDisplayBlock" v-if="props.row.github" :href="`${props.row.github}`" target="_blank" rel="nofollow">
                                <q-btn class="q-ma-xs widthButtonSocialNetworks" color="primary" icon="fab fa-github-alt" label="Github" />
                              </a>
                            </q-card>
  
                           </div>

                            <div class="col-xs-12 col-sm-8 maxWidthCardText">
                            <q-card class="q-ma-sm q-pa-md "><strong>Description: </strong>
                              <q-card-section v-if="props.row.text">
                                <div class="descriptionToken" v-html="props.row.text"></div>
                              </q-card-section>
                            </q-card>
                            </div>
                            </div>
                          </div>
                      </q-tab-panel>
<!-- Tab Referral -->
                      <q-tab-panel v-if="props.row.addLinkReferralToken" name="referralToken">
                        <div class="col-3">
                          <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Referral</p>
                              <a :href="`${props.row.addLinkReferralToken}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Referral" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'referralToken')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingReferralTokenLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingReferralTokenLink == true"
                              />
                              </p>
                            </div>
                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Referral: </strong>
                                <q-card-section v-if="props.row.descriptionReferralToken">
                                  <div class="descriptionToken" v-html="props.row.descriptionReferralToken"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Whitelist -->
                      <q-tab-panel v-if="props.row.addLinkReferralWhitelist" name="whitelist">
                        <div class="col-3">
                          <div class="row">
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Whitelist</p>
                              <a :href="`${props.row.addLinkReferralWhitelist}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Whitelist" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'whitelist')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingWhitelistLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingWhitelistLink == true"
                              />
                              </p>
                            </div>
                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Whitelist: </strong>
                                <q-card-section v-if="props.row.descriptionWhitelist">
                                  <div class="descriptionToken" v-html="props.row.descriptionWhitelist"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Airdrop -->
                      <q-tab-panel v-if="props.row.addLinkReferralAirdrop" name="airdrop">
                        <div class="col-3">
                          <div class="row">

                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Airdrop</p>
                              <a :href="`${props.row.addLinkReferralAirdrop}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Airdrop" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'airdrop')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingAirdropLink == true ? 'Moderation' : 'Report & Earn'"  
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingAirdropLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Airdrop: </strong>
                                <q-card-section v-if="props.row.descriptionAirdrop">
                                  <div class="descriptionToken" v-html="props.row.descriptionAirdrop"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Bounty -->
                      <q-tab-panel v-if="props.row.addLinkReferralBounty" name="bounty">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Bounty</p>
                              <a :href="`${props.row.addLinkReferralBounty}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Bounty" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'bounty')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingBountyLink == true ? 'Moderation' : 'Report & Earn'"  
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingBountyLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Bounty: </strong>
                                <q-card-section v-if="props.row.descriptionBounty">
                                  <div class="descriptionToken" v-html="props.row.descriptionBounty"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Testnet -->
                      <q-tab-panel v-if="props.row.addLinkReferralTestnet" name="testnet">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Testnet</p>
                              <a :href="`${props.row.addLinkReferralTestnet}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Testnet" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'testnet')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingTestnetLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingTestnetLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Testnet: </strong>
                                <q-card-section v-if="props.row.descriptionTestnet">
                                  <div class="descriptionToken" v-html="props.row.descriptionTestnet"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
<!-- Tab Staking -->
                      <q-tab-panel v-if="props.row.addLinkStaking" name="staking">
                        <div class="col-3">
                          <div class="row">
                            
                            <div class="col-xs-12 col-sm-6">
                              <p class="fontSizeEvents q-mx-md">Staking {{props.row.staking}} %</p>
                              <a :href="`${props.row.addLinkStaking}`" target="_blank" rel="nofollow">
                              <q-btn 
                                icon-right="send"
                                label="Open Staking" 
                                color="primary" 
                                class="q-ma-md"
                              />
                              </a>
                              
                              <p>Event ended?
                              <q-btn
                                outline
                                @click="confirmDeclareNotWorkingEventLink(props.row.id, 'staking')"
                                icon-right="support"
                                :label="props.row.declareNotWorkingStakingLink == true ? 'Moderation' : 'Report & Earn'" 
                                color="primary" 
                                class="q-ma-md"
                                :loading="submitting"
                                :disabled="props.row.declareNotWorkingStakingLink == true"
                              />
                              </p>
                            </div>

                            <div class="col-xs-12 col-sm-6 maxWidthCardText">
                              <q-card class="q-ma-sm q-pa-md "><strong>Description Staking: </strong>
                                <q-card-section v-if="props.row.descriptionStaking">
                                  <div class="descriptionToken" v-html="props.row.descriptionStaking"></div>
                                </q-card-section>
                              </q-card>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </q-card>
                </div>
                </q-intersection>
              </q-td>  
                         
            </q-tr>
          </template>                    
        </q-table>
    </div>
    
</template>



<script>
import axios from 'axios'
import { getDatabase, ref, child, get, set, update, onValue } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { createMetaMixin } from 'quasar'
import { getFunctions, httpsCallable } from "firebase/functions";
//import VueTradingView from './vue-trading-view.vue';
//import TwitterApi from 'twitter-api-v2'
import { date } from 'quasar'
import SkeletonTableTokens from './TableTokens/SkeletonTableTokens.vue'
import VueApexCharts from "vue3-apexcharts"


const columns = [
  { name: 'imgUrl', align: 'center', label: 'IMG', field: 'imgUrl'},
  // { name: 'promising', align: 'center', label: 'PROMISING', field: 'promising', sortable: true },
  { name: 'name', required: true, label: 'NAME', align: 'center', field: row => row.name, format: val => `${val}`, sort: true},
  { name: 'symbol', align: 'center', label: 'SYMBOL', field: 'symbol' },
  { name: 'chain', align: 'center', label: 'CHAIN', field: 'chain', sortable: true },
  { name: 'category', align: 'center', label: 'CATEGORY', field: 'category', sortable: true },
  { name: 'twitter', align: 'center', label: 'TWITTER', field: 'twitter'},
  { name: 'presale', align: 'center', label: 'PRESALE', field: 'dateLaunch', sortable: true},
  { name: 'whiteList', align: 'center', label: 'WHITELIST', field: 'whiteList', sortable: true },
  { name: 'airdrop', align: 'center', label: 'AIRDROP', field: 'airdrop', sortable: true},
  { name: 'bounty', align: 'center', label: 'BOUNTY', field: 'bounty', sortable: true},
  { name: 'testnet', align: 'center', label: 'TESTNET', field: 'testnet', sortable: true },
  { name: 'referralToken', align: 'center', label: 'REFERRAL', field: 'referralToken', sortable: true },
  { name: 'staking', align: 'center', label: 'STAKING', field: 'staking', sortable: true },
  { name: 'percentsUp', align: 'center', label: 'VOTES', field: 'percentsUp', sortable: true, sort: (a, b) => a.votes - b.votes},
  { name: 'public', align: 'center', label: 'HIDE', field: 'public'}
]


export default {
  name: 'TableTokens',
  name: 'HelloWorld',

  data() {
    return {
      id: '',
      name: '',
      symbol: '',
      img: '',
      percentsUp: 0,
      percentsDown: 0,
      votes: 0,
      address: '',
      result: [],
      chain: '',
      selectToken: 'BSC',
      addTokenTime: Date.now(),
      tab: 'coin',
      text: '',
      twitterAddLink: '',
      isOpen: false,
      hidePastLaunch: false,
      search: '',
      categoryCheckbox: [],
      whitelistCheckbox: [],
      bountyCheckbox: [],
      testnetCheckbox: [],
      columns,
      visibleColumns: [ 'imgUrl', 'whiteList', 'chain', 'symbol', 'category', 'twitter', 'referralToken', 'bounty', 'presale', 'airdrop', 'testnet', 'percentsUp', 'public', 'staking' ],
      separator: 'horizontal',
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 100
      },
      model: { from: '', to: '' },
      daySelect: 'Added days ago',
      daySelectForm: [
        'All days', '1 day ago', '2 days ago', '3 days ago', '4 days ago', '5 days ago', '6 days ago', '7 days ago', '8 days ago', '9 days ago', '10 days ago', '11 days ago', '12 days ago', '13 days ago', '14 days ago'
      ],
      topEventsCheckbox: [],
      airdropCheckbox: [],
      submitting: false,
      disableButton: false,
      filtersTokens: true,
      showTooltips: false,
      stakingModeration: 0,
      addLinkStakingModeration: '',
      descriptionStakingModeration: '',
      referralTokenModeration: '',
      addLinkReferralTokenModeration: '', 
      descriptionReferralTokenModeration: '',
      whiteListModeration: '',
      addLinkReferralWhitelistModeration: '',
      descriptionWhiteListModeration: '',
      airdropModeration: '',
      addLinkReferralAirdropModeration: '',
      descriptionAirdropModeration: '',
      bountyModeration: '',
      addLinkReferralBountyModeration: '',
      descriptionBountyModeration: '',
      testnetModeration: '',
      addLinkReferralTestnetModeration: '',
      descriptionTestnetModeration: '',
      dateLaunchModerationStartPresale: `${new Date().getUTCFullYear()}/${("0" + ((new Date()).getMonth() + 1)).slice(-2)}/${("0" + ((new Date()).getDate())).slice(-2)}`,
      optionsStartPresale(dateLaunchModerationStartPresale) {return dateLaunchModerationStartPresale >= `${new Date().getUTCFullYear()}/${("0" + ((new Date()).getMonth() + 1)).slice(-2)}/${("0" + ((new Date()).getDate())).slice(-2)}`},
      dateLaunchModerationEndPresale: `${new Date().getUTCFullYear()}/${("0" + ((new Date()).getMonth() + 1)).slice(-2)}/${("0" + ((new Date()).getDate())).slice(-2)}`,
      optionsEndPresale(dateLaunchModerationEndPresale) {return dateLaunchModerationEndPresale >= `${new Date().getUTCFullYear()}/${("0" + ((new Date()).getMonth() + 1)).slice(-2)}/${("0" + ((new Date()).getDate())).slice(-2)}`},
      linkToPresale1: '',
      linkToPresale2: '',
      linkToPresale3: '',
      linkToPresale4: '',
      linkToPresale5: '',
      linkToPresale6: '',
      linkToPresale7: '',
      linkToPresale8: '',
      linkToPresale9: '',
      linkToPresale10: '',
      expandlinkToPresale2: false,
      expandlinkToPresale3: false,
      expandlinkToPresale4: false,
      expandlinkToPresale5: false,
      expandlinkToPresale6: false,
      expandlinkToPresale7: false,
      expandlinkToPresale8: false,
      expandlinkToPresale9: false,
      expandlinkToPresale10: false,
      expandlinkToPresale11: false,
      current: 5,
      series: [{
              name: "Followers",
              data: []
          }],
      chartMinOptions: {
            chart: {
              height: 250,
              type: 'area',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
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
  props: {
    msg: String
  },
  mounted() {
    
    if (this.$q.localStorage.getItem('visibleColumns')) {
      this.visibleColumns = this.$q.localStorage.getItem('visibleColumns')
    }
    if (this.$q.localStorage.getItem('topEventsCheckbox')) {
      this.topEventsCheckbox = this.$q.localStorage.getItem('topEventsCheckbox')
    }
    if (this.$q.localStorage.getItem('categoryCheckbox')) {
      this.categoryCheckbox = this.$q.localStorage.getItem('categoryCheckbox')
    }
    if (this.$q.localStorage.getItem('whitelistCheckbox')) {
      this.whitelistCheckbox = this.$q.localStorage.getItem('whitelistCheckbox')
    }
    if (this.$q.localStorage.getItem('airdropCheckbox')) {
      this.airdropCheckbox = this.$q.localStorage.getItem('airdropCheckbox')
    }
    if (this.$q.localStorage.getItem('bountyCheckbox')) {
      this.bountyCheckbox = this.$q.localStorage.getItem('bountyCheckbox')
    }
    if (this.$q.localStorage.getItem('testnetCheckbox')) {
      this.testnetCheckbox = this.$q.localStorage.getItem('testnetCheckbox')
    }
    if (this.$q.localStorage.getItem('filtersTokens')) {
      this.filtersTokens = this.$q.localStorage.getItem('filtersTokens')
    }
    if (this.$q.localStorage.getItem('daySelect')) {
      this.daySelect = this.$q.localStorage.getItem('daySelect')
    }
    if (this.$q.localStorage.getItem('showTooltips')) {
      this.showTooltips = this.$q.localStorage.getItem('showTooltips')
    }
  },
  watch: {
    visibleColumns(newVisibleColumns) {
      this.$q.localStorage.set('visibleColumns', newVisibleColumns)
    },
    topEventsCheckbox(newtopEventsCheckbox) {
      this.$q.localStorage.set('topEventsCheckbox', newtopEventsCheckbox)
    },
    categoryCheckbox(newcategoryCheckbox) {
      this.$q.localStorage.set('categoryCheckbox', newcategoryCheckbox)
    },
    whitelistCheckbox(newwhitelistCheckbox) {
      this.$q.localStorage.set('whitelistCheckbox', newwhitelistCheckbox)
    },
    airdropCheckbox(newairdropCheckbox) {
      this.$q.localStorage.set('airdropCheckbox', newairdropCheckbox)
    },
    bountyCheckbox(newbountyCheckbox) {
      this.$q.localStorage.set('bountyCheckbox', newbountyCheckbox)
    },
    testnetCheckbox(newtestnetCheckbox) {
      this.$q.localStorage.set('testnetCheckbox', newtestnetCheckbox)
    },
    filtersTokens(newfiltersTokens) {
      this.$q.localStorage.set('filtersTokens', newfiltersTokens)
    },
    daySelect(newdaySelect) {
      this.$q.localStorage.set('daySelect', newdaySelect)
    },
    showTooltips(newshowTooltips) {
      this.$q.localStorage.set('showTooltips', newshowTooltips)
    }
  },
  methods: {
    couterVotes(id, votes) {
      this.submitting = true
        if (this.user) {

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
    resetData () {
      this.model = ''
    },
    currencyFilter(value) {
      return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
    },
    privateToken(tokenId) {
      const db = getDatabase()
      update(ref(db, 'token/' + tokenId), {
          public: false,
      })
      .then(() => {
          this.$q.notify({message: 'Toket prived', color: 'green'})
      }).catch(error => {
          this.$q.notify({message: error, color: 'red'})
      })  
    },
    editStaking(addLinkStakingModeration, stakingModeration, id, descriptionStakingModeration) {
      this.loading = true

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            stakingModeration : stakingModeration,
            addLinkStakingModeration: addLinkStakingModeration,
            descriptionStakingModeration: descriptionStakingModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editReferralToken(addLinkReferralTokenModeration, referralTokenModeration, id, descriptionReferralTokenModeration) {
      this.loading = true
      console.log(addLinkReferralTokenModeration, referralTokenModeration, id)

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            referralTokenModeration : referralTokenModeration,
            addLinkReferralTokenModeration: addLinkReferralTokenModeration,
            descriptionReferralTokenModeration: descriptionReferralTokenModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenWhiteList (addLinkReferralWhitelistModeration, whiteListModeration, id, descriptionWhiteListModeration) {
      this.loading = true
      console.log(addLinkReferralWhitelistModeration, whiteListModeration, id)

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            whiteListModeration : whiteListModeration,
            addLinkReferralWhitelistModeration: addLinkReferralWhitelistModeration,
            descriptionWhiteListModeration: descriptionWhiteListModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenAirdrop (addLinkReferralAirdropModeration, airdropModeration, id, descriptionAirdropModeration) {
      this.loading = true
      console.log(addLinkReferralAirdropModeration, airdropModeration, id)

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            airdropModeration : airdropModeration,
            addLinkReferralAirdropModeration: addLinkReferralAirdropModeration,
            descriptionAirdropModeration: descriptionAirdropModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenBounty (addLinkReferralBountyModeration, bountyModeration, id, descriptionBountyModeration) {
      this.loading = true
      console.log(addLinkReferralBountyModeration, bountyModeration, id)

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            bountyModeration : bountyModeration,
            addLinkReferralBountyModeration: addLinkReferralBountyModeration,
            descriptionBountyModeration: descriptionBountyModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenTestnet (addLinkReferralTestnetModeration, testnetModeration, id, descriptionTestnetModeration) {
      this.loading = true
      console.log(addLinkReferralTestnetModeration, testnetModeration, id)

      const db = getDatabase()
        update(ref(db, "token/" + id), {
            testnetModeration : testnetModeration,
            addLinkReferralTestnetModeration: addLinkReferralTestnetModeration,
            descriptionTestnetModeration: descriptionTestnetModeration
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
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

       if(event == 'referralToken') {
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
    dateLaunchModerationPresale (
      dateLaunchModerationStartPresale, 
      dateLaunchModerationEndPresale, 
      id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
          dateLaunchModerationStartPresale : dateLaunchModerationStartPresale,
          dateLaunchModerationEndPresale: dateLaunchModerationEndPresale,
          linkToPresale1: this.linkToPresale1,
          linkToPresale2: this.linkToPresale2,
          linkToPresale3: this.linkToPresale3,
          linkToPresale4: this.linkToPresale4,
          linkToPresale5: this.linkToPresale5,
          linkToPresale6: this.linkToPresale6,
          linkToPresale7: this.linkToPresale7,
          linkToPresale8: this.linkToPresale8,
          linkToPresale9: this.linkToPresale9,
          linkToPresale10: this.linkToPresale10
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Sent for moderation`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    eth_requestAccounts() {
      ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleAccountsChanged)
        .catch((error) => {
          if (error.code === 4001) {
            // EIP-1193 userRejectedRequest error
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
    },
    twitterPushLink(id) {
      this.submitting = true
      this.disableButton = true
      const functions = getFunctions()
      const twitterCheckURL = httpsCallable(functions,'twitterCheckURL')
      twitterCheckURL(this.twitterAddLink).then(result => {

        const twitterId = result.data.data.id
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            twitter : {twitterLink: this.twitterAddLink, twitterId}
        })
        .then(() => {
            this.submitting = false
            this.disableButton = false
            this.$q.notify({message: `Saved twitter ${this.twitterAddLink}`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.disableButton = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
      }).catch(err => {
        this.$q.notify({message: `Invalid twitter link ${this.twitterAddLink}`, color: 'red'})
        this.submitting = false
        this.disableButton = false
        return err
      })
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

      this.chartMinOptions = {
        xaxis: {
              categories: f
            }
      }
    },
  },
  computed: {
    tokens() {
      return this.$store.getters.tokens
    },
    tokensPromoted() {
      return this.$store.getters.tokens.filter(i => i.promoted == true)
    },
    user() {
      return this.$store.getters.user
    },
    userId() {
      return this.$store.getters.uid
    },
    filterTableCheckbox() {
      if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length && this.bountyCheckbox.length && this.testnetCheckbox.length) {
// 5 whitelist category events airdrop bounty
      console.log('5 whitelist category events airdrop bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => bounty.some(v5 => testnet.some(v6 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.category == v6.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.whiteList == v6.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.topEvents == v6.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.bounty == v6.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop && v.airdrop == v6.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet && v.testnet == v6.testnet))))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length && this.bountyCheckbox.length) {
// 5.0 events category whitelist airdrop bounty
      console.log('5.0 events category whitelist airdrop bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => bounty.some(v5 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop)))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.testnetCheckbox.length && this.airdropCheckbox.length && this.bountyCheckbox.length) {
// 5.1 testnet category whitelist airdrop bounty
      console.log('5.1 testnet category whitelist airdrop bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => whitelist.some(v2 => testnet.some(v3 => airdrop.some(v4 => bounty.some(v5 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop)))))

      } else if (this.whitelistCheckbox.length && this.testnetCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length && this.bountyCheckbox.length) {
// 5.2 events testnet whitelist airdrop bounty
      console.log('5.2 events testnet whitelist airdrop bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return testnet.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => bounty.some(v5 => v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop)))))

      } else if (this.testnetCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length && this.bountyCheckbox.length) {
// 5.3 events category testnet airdrop bounty
      console.log('5.3 events category testnet airdrop bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => testnet.some(v2 => events.some(v3 => airdrop.some(v4 => bounty.some(v5 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop)))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.testnetCheckbox.length && this.bountyCheckbox.length) {
// 5.4 events category whitelist testnet bounty
      console.log('5.4 events category whitelist testnet bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => testnet.some(v4 => bounty.some(v5 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.bounty == v5.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet)))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length && this.testnetCheckbox.length) {
// 5.5 events category whitelist airdrop testnet
      console.log('5.5 events category whitelist airdrop testnet')
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => testnet.some(v5 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.category == v5.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.whiteList == v5.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.topEvents == v5.topEvents && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.testnet == v5.testnet && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.airdrop == v5.airdrop)))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.testnetCheckbox.length) {
// 4.0 events category whitelist testnet
      console.log('4.0 events category whitelist testnet')
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => testnet.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 4.1 whitelist category events bounty
      console.log('4.1 whitelist category events bounty')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => bounty.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.bountyCheckbox.length && this.airdropCheckbox.length) {
// 4.2 whitelist category bounty airdrop
      console.log('4.2 whitelist category bounty airdrop')
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      //return category.filter(v => whitelist.some(v2 => events.some(v3 => v.category == v2.category && v.category == v3.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents) ))
      return category.filter(v => whitelist.some(v2 => bounty.some(v3 => airdrop.some(v4 => v.category == v2.category &&v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.whitelistCheckbox.length && this.bountyCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length) {
// 4.3 whitelist bounty events airdrop
      console.log('4.3 whitelist bounty events airdrop')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return bounty.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.bountyCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length) {
// 4.4 bounty category events airdrop
      console.log('4.4 bounty category events airdrop')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => bounty.some(v2 => events.some(v3 => airdrop.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length) {
// 4.5 events category whitelist airdrop
      console.log('4.5 events category whitelist airdrop')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => whitelist.some(v2 => events.some(v3 => airdrop.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.testnetCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length) {
// 4.6 events category airdrop testnet
      console.log('4.6 events category airdrop testnet')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return category.filter(v => testnet.some(v2 => events.some(v3 => airdrop.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.testnetCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 4.7 events category bounty testnet
      console.log('4.7 events category bounty testnet')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      return category.filter(v => testnet.some(v2 => events.some(v3 => bounty.some(v4 => v.category == v2.category && v.category == v3.category && v.category == v4.category && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty))))

      } else if (this.testnetCheckbox.length && this.whitelistCheckbox.length && this.topEventsCheckbox.length && this.airdropCheckbox.length) {
// 4.8 events whitelist airdrop testnet
      console.log('4.8 events whitelist airdrop testnet')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const whiteList = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      return whiteList.filter(v => testnet.some(v2 => events.some(v3 => airdrop.some(v4 => v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.testnetCheckbox.length && this.whitelistCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 4.9 events whitelist bounty testnet
      console.log('4.9 events whitelist bounty testnet')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const whiteList = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      return whiteList.filter(v => testnet.some(v2 => events.some(v3 => bounty.some(v4 => v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty))))

      } else if (this.testnetCheckbox.length && this.airdropCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 4.10 events airdrop bounty testnet
      console.log('4.10 events airdrop bounty testnet')
      const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
      const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      return airdrop.filter(v => testnet.some(v2 => events.some(v3 => bounty.some(v4 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.topEvents == v4.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty))))

      } else if (this.testnetCheckbox.length && this.airdropCheckbox.length && this.categoryCheckbox.length && this.whitelistCheckbox.length) {
// 4.11 category whitelist airdrop testnet
        console.log('4.11 category whitelist airdrop testnet')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const whiteList = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return airdrop.filter(v => testnet.some(v2 => category.some(v3 => whiteList.some(v4 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.category == v2.category && v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList))))

      } else if (this.testnetCheckbox.length && this.bountyCheckbox.length && this.categoryCheckbox.length && this.whitelistCheckbox.length) {
// 4.12 category whitelist bounty testnet
        console.log('4.12 category whitelist bounty testnet')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const whiteList = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return bounty.filter(v => testnet.some(v2 => category.some(v3 => whiteList.some(v4 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.category == v2.category && v.category == v3.category && v.category == v4.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList))))

      } else if (this.testnetCheckbox.length && this.bountyCheckbox.length && this.categoryCheckbox.length &&this.airdropCheckbox.length) {
// 4.13 category airdrop bounty testnet
        console.log('4.13 category airdrop bounty testnet')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return bounty.filter(v => testnet.some(v2 => category.some(v3 => airdrop.some(v4 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.category == v2.category && v.category == v3.category && v.category == v4.category && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else if (this.testnetCheckbox.length && this.bountyCheckbox.length && this.whitelistCheckbox.length && this.airdropCheckbox.length) {
// 4.14 whitelist airdrop bounty testnet
        console.log('4.14 whitelist airdrop bounty testnet')
        const whiteList = this.tokens.filter((token) => this.categoryCheckbox.some(whitelist => token.whiteList == whitelist))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return bounty.filter(v => testnet.some(v2 => whiteList.some(v3 => airdrop.some(v4 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.bounty == v4.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet && v.testnet == v4.testnet && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.whiteList == v4.whiteList && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.airdrop == v4.airdrop))))

      } else  if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length) {
// 3.0 whitelist category events
        console.log('3.0 whitelist category events')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return category.filter(v => whitelist.some(v2 => events.some(v3 => v.category == v2.category && v.category == v3.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents) ))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.airdropCheckbox.length) {
// 3.1 whitelist category airdrop
        console.log('3.1 whitelist category airdrop')
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return category.filter(v => whitelist.some(v2 => airdrop.some(v3 => v.category == v2.category && v.category == v3.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop) ))
      
      } else if (this.whitelistCheckbox.length && this.airdropCheckbox.length && this.topEventsCheckbox.length) {
// 3.2 whitelist events airdrop
        console.log('3.2 whitelist events airdrop')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return airdrop.filter(v => whitelist.some(v2 => events.some(v3 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents) ))

      } else  if (this.airdropCheckbox.length && this.categoryCheckbox.length && this.topEventsCheckbox.length) {
// 3.3 airdrop category events
        console.log('3.3 airdrop category events')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return category.filter(v => airdrop.some(v2 => events.some(v3 => v.category == v2.category && v.category == v3.category && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.topEvents == v2.topEvents && v.topEvents == v3.topEvents) ))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.bountyCheckbox.length) {
// 3.4 whitelist category bounty
        console.log('3.4 whitelist category bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return category.filter(v => whitelist.some(v2 => bounty.some(v3 => v.category == v2.category && v.category == v3.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.bounty == v2.bounty && v.bounty == v3.bounty)))

      } else if (this.whitelistCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 3.5 events whitelist bounty
        console.log('3.5 events whitelist bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return events.filter(v => whitelist.some(v2 => bounty.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.bounty == v2.bounty && v.bounty == v3.bounty)))

      } else if (this.categoryCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 3.6 events category bounty
        console.log('3.6 events category bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        return events.filter(v => category.some(v2 => bounty.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.category == v2.category && v.category == v3.category && v.bounty == v2.bounty && v.bounty == v3.bounty)))

      } else if (this.airdropCheckbox.length && this.whitelistCheckbox.length && this.bountyCheckbox.length) {
// 3.7 airdrop whitelist bounty
        console.log('3.7 airdrop whitelist bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return airdrop.filter(v => whitelist.some(v2 => bounty.some(v3 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.bounty == v2.bounty && v.bounty == v3.bounty)))

      } else if (this.airdropCheckbox.length && this.topEventsCheckbox.length && this.bountyCheckbox.length) {
// 3.8 airdrop events bounty
        console.log('3.8 airdrop events bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return events.filter(v => airdrop.some(v2 => bounty.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.bounty == v2.bounty && v.bounty == v3.bounty)))

      } else if (this.airdropCheckbox.length && this.categoryCheckbox.length && this.bountyCheckbox.length) {
// 3.9 airdrop category bounty
        console.log('3.9 airdrop category bounty')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        return airdrop.filter(v => category.some(v2 => bounty.some(v3 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.category == v2.category && v.category == v3.category && v.bounty == v2.bounty && v.bounty == v3.bounty)))



      } else if (this.topEventsCheckbox.length && this.categoryCheckbox.length && this.testnetCheckbox.length) {
// 3.10 events category testnet
        console.log('3.10 events category testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(events => token.topEvents == events))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        return events.filter(v => category.some(v2 => testnet.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.category == v2.category && v.category == v3.category && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.whitelistCheckbox.length && this.topEventsCheckbox.length && this.testnetCheckbox.length) {
// 3.11 events whitelist testnet
        console.log('3.11 events whitelist testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return events.filter(v => whitelist.some(v2 => testnet.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.airdropCheckbox.length && this.topEventsCheckbox.length && this.testnetCheckbox.length) {
// 3.12 events airdrop testnet
        console.log('3.12 events airdrop testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return events.filter(v => airdrop.some(v2 => testnet.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.bountyCheckbox.length && this.topEventsCheckbox.length && this.testnetCheckbox.length) {
// 3.13 events bounty testnet
        console.log('3.13 events bounty testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return events.filter(v => bounty.some(v2 => testnet.some(v3 => v.topEvents == v2.topEvents && v.topEvents == v3.topEvents && v.bounty == v2.bounty && v.bounty == v3.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet)))


      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length && this.testnetCheckbox.length) {
// 3.14 category whitelist testnet
        console.log('3.14 category whitelist testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return category.filter(v => whitelist.some(v2 => testnet.some(v3 => v.category == v2.category && v.category == v3.category && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.airdropCheckbox.length && this.categoryCheckbox.length && this.testnetCheckbox.length) {
// 3.15 category airdrop testnet
        console.log('3.15 category airdrop testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return category.filter(v => airdrop.some(v2 => testnet.some(v3 => v.category == v2.category && v.category == v3.category && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.bountyCheckbox.length && this.categoryCheckbox.length && this.testnetCheckbox.length) {
// 3.16 category bounty testnet
        console.log('3.16 category bounty testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return category.filter(v => bounty.some(v2 => testnet.some(v3 => v.category == v2.category && v.category == v3.category && v.bounty == v2.bounty && v.bounty == v3.bounty && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.whitelistCheckbox.length && this.airdropCheckbox.length && this.testnetCheckbox.length) {
// 3.17 whitelist airdrop testnet
        console.log('3.17 whitelist airdrop testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return airdrop.filter(v => whitelist.some(v2 => testnet.some(v3 => v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.whitelistCheckbox.length && this.bountyCheckbox.length && this.testnetCheckbox.length) {
// 3.18 whitelist bounty testnet
        console.log('3.18 whitelist bounty testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return bounty.filter(v => whitelist.some(v2 => testnet.some(v3 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.whiteList == v2.whiteList && v.whiteList == v3.whiteList && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.airdropCheckbox.length && this.bountyCheckbox.length && this.testnetCheckbox.length) {
// 3.19 airdrop bounty testnet
        console.log('3.19 airdrop bounty testnet')
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return bounty.filter(v => airdrop.some(v2 => testnet.some(v3 => v.bounty == v2.bounty && v.bounty == v3.bounty && v.airdrop == v2.airdrop && v.airdrop == v3.airdrop && v.testnet == v2.testnet && v.testnet == v3.testnet)))

      } else if (this.whitelistCheckbox.length && this.categoryCheckbox.length) {
// 2.0 whitelist category
        console.log('2.1 whitelist category')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return category.filter(v => whitelist.some(v2 => v.category == v2.category && v.whiteList == v2.whiteList))

      } else if (this.whitelistCheckbox.length && this.topEventsCheckbox.length) {
// 2.1 events whitelist
        console.log('2.2 events whitelist')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return events.filter(v => whitelist.some(v2 => v.topEvents == v2.topEvents && v.whiteList == v2.whiteList))

      } else if (this.categoryCheckbox.length && this.topEventsCheckbox.length) {
// 2.2 events category
        console.log('2.3 events category')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        return events.filter(v => category.some(v2 => v.topEvents == v2.topEvents && v.category == v2.category))

      } else if (this.airdropCheckbox.length && this.whitelistCheckbox.length) {
// 2.3 airdrop whitelist
        console.log('2.4 airdrop whitelist')
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        return airdrop.filter(v => whitelist.some(v2 => v.airdrop == v2.airdrop && v.whiteList == v2.whiteList))

      } else if (this.airdropCheckbox.length && this.topEventsCheckbox.length) {
// 2.4 airdrop events
        console.log('2.5 airdrop events')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        return events.filter(v => airdrop.some(v2 => v.topEvents == v2.topEvents && v.airdrop == v2.airdrop))

      } else if (this.airdropCheckbox.length && this.categoryCheckbox.length) {
// 2.5 airdrop category
        console.log('2.6 airdrop category')
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        return airdrop.filter(v => category.some(v2 => v.airdrop == v2.airdrop && v.category == v2.category))

      } else if (this.bountyCheckbox.length && this.topEventsCheckbox.length) {
// 2.6 bounty events
        console.log('2.7 bounty events')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return events.filter(v => bounty.some(v2 => v.topEvents == v2.topEvents && v.bounty == v2.bounty))

      } else if (this.bountyCheckbox.length && this.airdropCheckbox.length) {
// 2.7 bounty airdrop
        console.log('2.8 bounty airdrop')
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return airdrop.filter(v => bounty.some(v2 => v.airdrop == v2.airdrop && v.bounty == v2.bounty))

      } else if (this.bountyCheckbox.length && this.whitelistCheckbox.length) {
// 2.8 bounty whitelist
        console.log('2.9 bounty whitelist')
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return whitelist.filter(v => bounty.some(v2 => v.whiteList == v2.whiteList && v.bounty == v2.bounty))

      } else if (this.bountyCheckbox.length && this.categoryCheckbox.length) {
// 2.9 bounty category
        console.log('2.10 bounty category')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        return category.filter(v => bounty.some(v2 => v.category == v2.category && v.bounty == v2.bounty))

      } else if (this.testnetCheckbox.length && this.topEventsCheckbox.length) {
// 2.10 events testnet
        console.log('2.10 events testnet')
        const events = this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        return events.filter(v => testnet.some(v2 => v.topEvents == v2.topEvents && v.testnet == v2.testnet))

      } else if (this.testnetCheckbox.length && this.categoryCheckbox.length) {
// 2.11 category testnet
        console.log('2.11 category testnet')
        const category = this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        return category.filter(v => testnet.some(v2 => v.category == v2.category && v.testnet == v2.testnet))

      } else if (this.testnetCheckbox.length && this.whitelistCheckbox.length) {
// 2.12 whitelist testnet
        console.log('2.12 whitelist testnet')
        const whitelist = this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        return whitelist.filter(v => testnet.some(v2 => v.whiteList == v2.whiteList && v.testnet == v2.testnet))

      } else if (this.testnetCheckbox.length && this.airdropCheckbox.length) {
// 2.13 airdrop testnet
        console.log('2.13 airdrop testnet')
        const airdrop = this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        return airdrop.filter(v => testnet.some(v2 => v.airdrop == v2.airdrop && v.testnet == v2.testnet))

      } else if (this.testnetCheckbox.length && this.bountyCheckbox.length) {
// 2.14 bounty testnet
        console.log('2.14 bounty testnet')
        const bounty = this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
        const testnet = this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
        return bounty.filter(v => testnet.some(v2 => v.bounty == v2.bounty && v.testnet == v2.testnet))


      } else if (this.bountyCheckbox.length) {
// 1.0 bounty       
          console.log('1.0 bounty')
          return this.tokens.filter((token) => this.bountyCheckbox.some(bounty => token.bounty == bounty))
      } else if (this.topEventsCheckbox.length) {
// 1.1 topEvents
          console.log('1.1 topEvents')
          return this.tokens.filter((token) => this.topEventsCheckbox.some(topEvents => token.topEvents == topEvents))
      } else if (this.airdropCheckbox.length) {
// 1.2 airdrop
          console.log('1.2 airdrop')
          return this.tokens.filter((token) => this.airdropCheckbox.some(airdrop => token.airdrop == airdrop))
      } else if (this.whitelistCheckbox.length) {
// 1.3 whitelist
          console.log('1.3 whitelist')
          return this.tokens.filter((token) => this.whitelistCheckbox.some(whitelist => token.whiteList == whitelist))
      } else if (this.categoryCheckbox.length) {
// 1.4 category
        console.log('1.4 category')
          return this.tokens.filter((token) => this.categoryCheckbox.some(category => token.category == category))
      } else if (this.testnetCheckbox.length) {
// 1.5 testnet
        console.log('1.5 testnet')
          return this.tokens.filter((token) => this.testnetCheckbox.some(testnet => token.testnet == testnet))
// 1.6 tokens
      } else {
        return this.tokens
      } 
    },
    pointsUser() {
      return this.$store.getters.pointsUser
    },
    columnsFilter() {
      if(this.$store.getters.role === 'Moderator' || this.$store.getters.role === 'Admin' || this.$store.getters.role === 'Founder') {
       return this.columns
      } else {
        return this.columns.filter(i => i.name !== 'public')
      }
    },
    columnsFilterImg() {
       return this.visibleColumns.find(i => i == 'imgUrl')
    },
    columnsFilterSymbol() {
       return this.visibleColumns.find(i => i == 'symbol')
    },
    columnsFilterChain() {
       return this.visibleColumns.find(i => i == 'chain')
    },
    columnsFilterCategory() {
       return this.visibleColumns.find(i => i == 'category')
    },
    columnsFilterTwitter() {
      return this.visibleColumns.find(i => i == 'twitter')
    },
    columnsFilterPresale() {
      return this.visibleColumns.find(i => i == 'presale')
    },
    columnsFilterWhitelist() {
      return this.visibleColumns.find(i => i == 'whiteList')
    },
    columnsFilterAirdrop() {
      return this.visibleColumns.find(i => i == 'airdrop')
    },
    columnsFilterBounty() {
      return this.visibleColumns.find(i => i == 'bounty')
    },
    columnsFilterTestnet() {
      return this.visibleColumns.find(i => i == 'testnet')
    },
    columnsFilterReferralToken() {
       return this.visibleColumns.find(i => i == 'referralToken')
    },
    columnsFilterStaking() {
       return this.visibleColumns.find(i => i == 'staking')
    },
    filterTable() {
      return this.daySelectFilter.map(i => {
        if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 1 }), date.addToDate(Date.now(), { days: 1 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'Today'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 2 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'Tomorrow'})

        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 3 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 2 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 4 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 3 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 5 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 4 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 6 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 5 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 7 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 6 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 8 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 7 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 9 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 8 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 10 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 9 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 11 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 10 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 12 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 11 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 13 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 12 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 14 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 13 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 15 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 14 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 16 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 15 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 17 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 16 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 18 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 17 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 19 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 18 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 20 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 19 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 21 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 20 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 22 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 21 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 23 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 22 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 24 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 23 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 25 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 24 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 26 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 25 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 27 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 26 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 28 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 27 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 29 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 28 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 30 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 29 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { days: 31 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 30 days'})

        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 2 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 1 month'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 3 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 2 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 4 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 3 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 5 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 4 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 6 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 5 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 7 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 6 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 8 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 7 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 9 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 8 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 10 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 9 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 11 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 10 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { month: 12 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 11 months'})

        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 2 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 1 year'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 3 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 2 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 4 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 3 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 5 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 4 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 6 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 5 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 7 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 6 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 8 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 7 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 9 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 8 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 10 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 9 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 0 }), date.addToDate(Date.now(), { years: 11 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'In 10 years'})

        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 2 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: 'Yesterday'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 3 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '2 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 4 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '3 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 5 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '4 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 6 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '5 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 7 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '6 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 8 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '7 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 9 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '8 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 10 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '9 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 11 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '10 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 12 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '11 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 13 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '12 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 14 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '13 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 15 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '14 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 16 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '15 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 17 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '16 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 18 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '17 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 19 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '18 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 20 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '19 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 21 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '20 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 22 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '21 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 23 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '22 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 24 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '23 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 25 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '24 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 26 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '25 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 27 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '26 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 28 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '27 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 29 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '28 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 30 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '29 days'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { days: 31 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '30 days'})
        
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 2 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '1 month'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 3 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '2 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 4 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '3 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 5 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '4 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 6 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '5 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 7 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '6 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 8 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '7 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 9 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '8 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 10 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '9 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 11 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '10 months'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { month: 12 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '11 months'})

        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 2 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '1 year'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 3 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '2 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 4 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '3 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 5 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '4 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 6 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '5 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 7 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '6 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 8 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '7 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 9 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '8 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 9 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '9 years'})
        } else if (date.isBetweenDates(i.dateLaunch, date.subtractFromDate(Date.now(), { years: 10 }), date.addToDate(Date.now(), { days: 0 }), { onlyDate: true })) {
          return ({...i, dateLaunchString: '10 years'})
        } else {
          return ({...i, dateLaunchString: new Date(i.dateLaunch).getDate() + '/' + (new Date(i.dateLaunch).getMonth()+1) + '/' + new Date(i.dateLaunch).getFullYear()})
        }
      }
      
      )
    },

    daySelectFilter() {
      if(this.daySelect == '1 day ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - 86400000)
      } else if(this.daySelect == '2 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 2))
      } else if(this.daySelect == '3 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 3))
      } else if(this.daySelect == '4 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 4))
      } else if(this.daySelect == '5 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 5))
      } else if(this.daySelect == '6 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 6))
      } else if(this.daySelect == '7 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 7))
      } else if(this.daySelect == '8 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 8))
      } else if(this.daySelect == '9 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 9))
      } else if(this.daySelect == '10 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 10))
      } else if(this.daySelect == '11 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 11))
      } else if(this.daySelect == '12 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 12))
      } else if(this.daySelect == '13 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 13))
      } else if(this.daySelect == '14 days ago') {
        return this.filterTableCheckbox.filter(i => i.addTokenTime > Date.now() - (86400000 * 14))
      } else {
        return this.filterTableCheckbox
      }
    },
    dataVotesUser() {
      return this.$store.getters.dataVotesUser
    }
  },
  components: {
    SkeletonTableTokens, apexchart: VueApexCharts
  }
}
</script>


<style lang="sass">
.bg-body
  background-color: #f1f2f3

.my-card
  padding: 10px 0
  border-bottom: 1px solid #ccc
  
.button-margin
  margin: 5px

.my-sticky-header-column-table
  /* height or max-height is important */
  height: 100%

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #fff !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
  
  .bounty-max-width
    max-width: 400px

  .widthCoin
    width: 345px
  
  .maxWidthCardText
    white-space: normal
    max-width: 100%

  a
    text-decoration: none

.linkButtonDisplayBlock
    display: block
    color: #000

.pCheckbox
  margin: 0
  font-size: 1.1rem
  font-weight: bold

.buttonWidth
  width: 114px

.fontSizeEvents
  font-size: 1.3rem

.q-date__header-link
  opacity: 1

.q-date__header-subtitle
  font-size: 17px
  color: yellow

.widthButtonSocialNetworks
  width: 148px

.widthDaySelect
  width: 132px

  

  iframe
    width: 100%

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

h5 
  margin-top: 5px
  matgin-bottom: 0px

.q-toggle
  height: 55px

.organicBlock
  height: 55px
.scrollDescription
  height: 600px

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

img 
    max-width: 100%
    height: auto

.iconToken
    height: 50px
    max-width: 50px

.iconChain
    height: 23px
    width: 23px

.q-table--dense .q-table td 
    padding: 4px 4px

.textGreen
  color: green

.textRed
  color: red

.textGray
  color: #5e5e5e

.textTooltipTweeter
  font-size: 0.9rem

.twitterButtonWidth
  width: 114px
</style>