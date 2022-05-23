<template>

<div v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'">
      
            <q-card class="q-ma-md q-pa-sm flex justify-around">
                <div>
                    <pre>
                        <code>
                        &lt;div class="youtube"&gt;
                        ...
                        &lt;/div&gt;
                        </code>
                        <code>
                        &lt;img src="..."&gt;

                        </code>
                    </pre>
                </div>
                <div>
                    <div class="youtube">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/3nehZ4A0iH8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </q-card>
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensModerator" :key="token.id">
        <h4 v-if="token.revision == 'check'" class="headerRed q-ma-sm q-px-lg">Check</h4>
        <h4 v-if="token.revision == 'revision'" class="headerRed q-ma-sm q-px-lg">Sent for revision</h4>
        <h4 v-if="token.revision == 'corrected'" class="headerRed q-ma-sm q-px-lg">Corrected</h4>
        <div class="row flex">
        <q-card-section key="ownerToken" class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Owner Token:&nbsp;</span>
            {{ token.tokenPublishedUser }}
        </q-card-section>
<!-- Button IMG -->
        <q-card-section class="text-center q-pa-sm">
            
            <img
            loading="lazy"
            style="height: 50px; width: 50px"
            spinner-color="grey-4"
            :src="`${token.imgUrl}`"
            class="cursor-pointer"
            />
            <q-popup-edit v-model="token.file">
                <span class="bold">IMG:</span>
                    <q-file
                        class="minWidthInput"
                        @change="convertImageU(token.name)"
                        v-model="file"
                        filled
                        bottom-slots
                        label="Image"
                        counter
                    >
                    <template v-slot:prepend>
                        <q-icon name="far fa-image" color="primary" @click.stop class="cursor-pointer" />
                    </template>
                    <template v-slot:append>
                        <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
                    </template>

                    <template v-slot:hint>
                        Download Token Image
                    </template>
                    </q-file>
                <q-btn @click="downImage(token.id)" :loading="submitting" :disable="disableButton" icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- Button Public Token -->
        <q-card-section v-if="token.public === false">
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicToken(uid, token.id)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="confirmDeleteToken(token.id, token.name, token.imgUrl)"
                >Delete</q-btn>
            </div>
        </q-card-section>
<!-- Suitable for Allocation -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <q-checkbox left-label @click="editSuitableForAllocation(token.suitableForAllocation, token.id)" v-model="token.suitableForAllocation" label="Suitable for Allocation" />
        </q-card-section>
<!-- Suitable for LABS -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <q-checkbox left-label @click="editSuitableForLABS(token.suitableForLABS, token.id)" v-model="token.suitableForLABS" label="Suitable for LABS" />
        </q-card-section>
<!-- Promoted -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">

            <q-checkbox left-label @click="editPromoted(token.promoted, token.id)" v-model="token.promoted" label="Add Promoted" />
        </q-card-section>
<!-- TOP Events -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Top Events:&nbsp;</span>
            {{ token.topEvents }}
            <q-popup-edit v-model="token.topEvents">
                <span class="bold">Top Events:</span>
                <q-select v-model="token.topEvents" :options="['', 'topEvents']" dense />
                <q-btn @click="editTopEvents(token.topEvents, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- name -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Name:&nbsp;</span>
            {{ token.name }}   
            <q-popup-edit v-model="token.name">
                <span class="bold">Name:</span>
                <q-input dense v-model="token.name" />
                <q-btn @click="editTokenName(token.name, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- symbol -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Symbol:&nbsp;</span>
            {{ token.symbol }}
            <q-popup-edit v-model="token.symbol">
                <span class="bold">Symbol: </span>
                <q-input dense v-model="token.symbol" />
                <q-btn @click="editTokenSymbol(token.symbol, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- chain -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Chain:&nbsp;</span>
            {{ token.chain }}
            <q-popup-edit v-model="token.chain">
                <span class="bold">Chain:</span>
                <q-select v-model="token.chain" :options="['BSC', 'ETH', 'Solana', 'Polkadot', 'Avalanche', 'Terra', 'Tron', 'Fantom', 'Heco', 'MATIC', 'other']" dense />
                <q-btn @click="editTokenChain(token.chain, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- category -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Category:&nbsp;</span>
            {{ token.category }}
            <q-popup-edit v-model="token.category">
                <span class="bold">Category:</span>
                <q-select v-model="token.category" :options="['game', 'social', 'DEFI', 'NFT', 'gambling', 'exchanges', 'marketplaces', 'launchpad', 'other']" dense />
                <q-btn @click="editTokenCategory(token.category, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- presale -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Presale:&nbsp;</span>
            {{ token.dateLaunch == 'NoN' ? 'NoN' : `${new Intl.DateTimeFormat('en-En').format(new Date(token.dateLaunch))}`}}
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">   
                    <q-date class="q-ma-md" v-model="dateLaunch"/>
                    <div class="row items-center justify-start q-gutter-sm q-ma-md">
                        <q-btn @click="editTokenDateLaunch(Date.parse(dateLaunch), token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                        <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    </div>
                </q-popup-proxy>
        </q-card-section>
<!-- whiteList -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">WhiteList:&nbsp;</span>
            {{ token.whiteList }}
            <q-popup-edit v-model="token.whiteList">
                <span class="bold">WhiteList:</span>
                <q-select v-model="token.whiteList" :options="['NoN', 'TOKEN', 'NFT']" dense />
                <q-btn @click="editTokenWhiteList(token.whiteList, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- airdrop -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Airdrop:&nbsp;</span>
            {{ token.airdrop }}
            <q-popup-edit v-model="token.airdrop">
                <span class="bold">Airdrop:</span>
                <q-select v-model="token.airdrop" :options="['NoN','TOKEN', 'NFT']" dense />
                <q-btn @click="editTokenAirdrop(token.airdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- bounty -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Bounty:&nbsp;</span>
            {{ token.bounty }}
            <q-popup-edit v-model="token.bounty">
                <span class="bold">Bounty:</span>
                <q-select v-model="token.bounty" :options="['NoN','FREE', 'AMBASSADOR', 'ALLOCATION']" dense />
                <q-btn @click="editTokenBounty(token.bounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- testnet -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Testnet:&nbsp;</span>
            {{ token.testnet }}
            <q-popup-edit v-model="token.testnet">
                <span class="bold">Testnet:</span>
                <q-select v-model="token.testnet" :options="['NoN', 'NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']" dense />
                <q-btn @click="editTokenTestnet(token.testnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- address -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Address:&nbsp;</span>
            {{ token.address }}
            <q-popup-edit v-model="token.address">
                <span class="bold">Address:</span>
                <q-input v-model="token.address" dense />
                <q-btn @click="editTokenAddress(token.address, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- website -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Website:&nbsp;</span>
            {{ token.website }}
            <q-popup-edit v-model="token.website">
                <span class="bold">Website:</span>  
                <q-input
                    v-model="token.website"
                    dense
                    hint="Site URL https://..."
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                    >
                    <a :href="`${token.website}`" v-if="token.website" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenWebsite(token.website, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- telegram -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Telegram:&nbsp;</span>
            {{ token.telegram }}
            <q-popup-edit v-model="token.telegram">
                <span class="bold">Telegram:</span>
                <q-input
                v-model="token.telegram"
                dense 
                hint="Site URL https://t.me/..."
                :rules="[value => value.includes('https://t.me/') || value.includes('http://t.me/') || 'Must contain https://t.me/.. or http://t.me/..']"
                >
                    <a :href="`${token.telegram}`" v-if="token.telegram" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenTelegram(token.telegram, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- twitter -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Twitter:&nbsp;</span>
            {{ token.twitter.twitterLink }}
            <q-popup-edit v-model="token.twitter">
                <span class="bold">Twitter:</span>
                <q-input
                v-model="token.twitter.twitterLink"
                dense
                hint="Site URL https://twitter.com/..."
                :rules="[value => value.includes('https://twitter.com/') || value.includes('http://twitter.com/') || 'Must contain https://twitter.com/...']"
                >
                    <a :href="`${token.twitter.twitterLink}`" v-if="token.twitter.twitterLink" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenTwitter(token.twitter.twitterLink, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- discord -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Discord:&nbsp;</span>
            {{ token.discord }}
            <q-popup-edit v-model="token.discord">
                <span class="bold">Discord:</span>
                <q-input
                v-model="token.discord"
                dense
                hint="Site URL https://discord.com/..."
                :rules="[value => value.includes('https://discord.com/') || value.includes('http://discord.com/') || 'Must contain https://discord.com/...']"
                >
                    <a :href="`${token.discord}`" v-if="token.discord" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenDiscord(token.discord, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- facebook -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Facebook:&nbsp;</span>
            {{ token.facebook }}
            <q-popup-edit v-model="token.facebook">
                <span class="bold">Facebook:</span>
                <q-input
                v-model="token.facebook"
                dense
                hint="Site URL https://facebook.com/..."
                :rules="[value => value.includes('https://facebook.com/') || value.includes('http://facebook.com/') || value.includes('https://www.facebook.com/') || value.includes('http://www.facebook.com/') || 'Must contain https://facebook.com/...']"
                >
                    <a :href="`${token.facebook}`" v-if="token.facebook" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenFacebook(token.facebook, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- instagram -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Instagram:&nbsp;</span>
            {{ token.instagram }}
            <q-popup-edit v-model="token.instagram">
                <span class="bold">Instagram:</span>
                <q-input
                v-model="token.instagram"
                dense
                hint="Site URL https://instagram.com/..."
                :rules="[value => value.includes('https://instagram.com/') || value.includes('http://instagram.com/') || value.includes('https://www.instagram.com/') || value.includes('http://www.instagram.com/') || 'Must contain https://instagram.com/...']"
                >
                    <a :href="`${token.instagram}`" v-if="token.instagram" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenInstagram(token.instagram, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- linkedin -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Linkedin:&nbsp;</span>
            {{ token.linkedin }}
            <q-popup-edit v-model="token.linkedin">
                <span class="bold">Linkedin:</span>
                <q-input
                v-model="token.linkedin"
                dense
                hint="Site URL https://linkedin.com/..."
                :rules="[value => value.includes('https://linkedin.com/') || value.includes('http://linkedin.com/') || value.includes('https://www.linkedin.com/') || value.includes('http://www.linkedin.com/') || 'Must contain https://linkedin.com/...']"
                >
                    <a :href="`${token.linkedin}`" v-if="token.linkedin" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenLinkedin(token.linkedin, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- Github -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Github:&nbsp;</span>
            {{ token.github }}
            <q-popup-edit v-model="token.github">
                <span class="bold">Github:</span>
                <q-input
                v-model="token.github"
                dense
                hint="Site URL https://github.com/..."
                :rules="[value => value.includes('https://github.com/') || value.includes('http://github.com/') || value.includes('https://www.github.com/') || value.includes('http://www.github.com/') || 'Must contain https://github.com/...']"
                >
                    <a :href="`${token.github}`" v-if="token.github" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenGithub(token.github, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- Medium -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Medium:&nbsp;</span>
            {{ token.medium }}
            <q-popup-edit v-model="token.medium">
                <span class="bold">Medium:</span>
                <q-input
                v-model="token.medium"
                dense
                hint="Site URL https://medium.com/..."
                :rules="[value => value.includes('https://medium.com/') || value.includes('http://medium.com/') || 'Must contain https://medium.com/...']"
                >
                    <a :href="`${token.medium}`" v-if="token.medium" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenMedium(token.medium, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- Reddit -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Reddit:&nbsp;</span>
            {{ token.reddit }}
            <q-popup-edit v-model="token.reddit">
                <span class="bold">Reddit:</span>
                <q-input
                v-model="token.reddit"
                dense
                hint="Site URL https://reddit.com/..."
                :rules="[value => value.includes('https://reddit.com/') || value.includes('http://reddit.com/') || value.includes('https://www.reddit.com/') || value.includes('http://www.reddit.com/') || 'Must contain https://reddit.com/...']"
                >
                    <a :href="`${token.reddit}`" v-if="token.reddit" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenReddit(token.reddit, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>   
<!-- Twitch -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Twitch:&nbsp;</span>
            {{ token.twitch }}
            <q-popup-edit v-model="token.twitch">
                <span class="bold">Twitch:</span>
                <q-input
                v-model="token.twitch"
                dense
                hint="Site URL https://twitch.tv/..."
                :rules="[value => value.includes('https://twitch.tv/') || value.includes('http://twitch.tv/') || value.includes('https://www.twitch.tv/') || value.includes('http://www.twitch.tv/') || 'Must contain https://twitch.tv/...']"
                >
                    <a :href="`${token.twitch}`" v-if="token.twitch" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenTwitch(token.twitch, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
<!-- youtube -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Youtube:&nbsp;</span>
            {{ token.youtube }}
            <q-popup-edit v-model="token.youtube">
                <span class="bold">Youtube:</span>
                <q-input
                v-model="token.youtube"
                dense
                :rules="[value => value.includes('https://youtube.com/') || value.includes('http://youtube.com/') || value.includes('https://www.youtube.com/') || value.includes('http://www.youtube.com/') || value.includes('https://youtu.be/') || 'Must contain https://youtube.com/...']"
                >
                    <a :href="`${token.youtube}`" v-if="token.youtube" target="_blank" class="iconLinkWebsiteTextDecoration">
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
                </q-input>
                <q-btn @click="editTokenYoutube(token.youtube, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
            </q-popup-edit>
        </q-card-section>
        </div>
<!-- description -->
        <q-card-section class="box-shadow q-pa-md q-ma-sm">
            <span class="bold">Description:&nbsp;</span>
           
            <p v-html="token.text"></p>
            <q-popup-edit v-model="token.text">
                <span class="bold">Description:</span>

                <q-editor
                    class="q-my-lg"
                    v-model="token.text"
                    ref="editorRef"
                    :definitions="{
                        photo: {
                            label: 'Image',
                            icon: 'photo',
                            cmd: 'insertImage',
                            param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                        },
                        viewsource: {
                            label: 'html'
                        },
                        quote: {
                            icon: 'priority_high',
                            tip: 'Warning'
                        }
                    }"
                    :toolbar="[
                        [
                            { 
                                label: $q.lang.editor.align,
                                icon: $q.iconSet.editor.align,
                                fixedLabel: true,
                                options: ['left', 'center', 'right', 'justify']
                            }
                        ],
                        ['photo', 'link'],
                        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                        [{
                            label: $q.lang.editor.formatting,
                            icon: $q.iconSet.editor.formatting,
                            list: 'no-icons',
                            options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                        }],
                        ['quote', 'unordered', 'ordered'],
                        ['undo', 'redo'],
                        [{
                            label: $q.lang.editor.fontSize,
                            icon: $q.iconSet.editor.fontSize,
                            fixedLabel: true,
                            fixedIcon: true,
                            list: 'no-icons',
                            options: [
                            'size-1',
                            'size-2',
                            'size-3',
                            'size-4',
                            'size-5',
                            'size-6',
                            'size-7'
                            ]
                        }],
                        ['viewsource']
                    ]">


<!--                         <template v-slot:photo>
                            <q-btn-dropdown
                            icon="photo"
                            dense no-caps
                            ref="tokenRef"
                            no-wrap
                            unelevated
                            color="white"
                            text-color="primary"
                            label="Image"
                            size="sm"
                            >
                            <q-list dense class="minWidthPhotoInput flex q-ma-sm">
                                    <q-input dense autofocus class="minWidthPhotoInput" />
                                <q-btn label="add" @click="add('https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/imagesPost%2Fimage-1648140554919.webp?alt=media&token=311b8cef-6fda-49c7-908b-c0a94aaf5abc')" color="primary" />
                            </q-list>
                            
                            </q-btn-dropdown>
                        </template> -->
                </q-editor>
                <q-btn @click="editTokenDescription(token.text, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                <a class="q-ma-xs" href="/upload" target="_blank">
                    <q-btn label="Upload Img" target=_blank color="primary" />
                </a>
                
            </q-popup-edit>
          
              
        </q-card-section>

<!-- Referral Bounty -->
        <div class="q-py-md row flex" v-if="token.bounty !== 'NoN'">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Bounty:&nbsp;</span>
                {{ token.addLinkReferralBounty }}
                <q-popup-edit v-model="token.addLinkReferralBounty">
                    <span class="bold">Referral Bounty:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralBounty"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralBounty}`" v-if="token.addLinkReferralBounty" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralBounty(token.addLinkReferralBounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkReferralBounty" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Bounty:&nbsp;</span>
                <a :href="`${token.addLinkReferralBounty}`" v-if="token.addLinkReferralBounty" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralBounty}}
                </a>
            </q-card-section>

            <q-card-section v-if="token.bounty" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Bounty type:&nbsp;</span>
                {{ token.bounty }}
                <q-popup-edit v-model="token.bounty">
                    <span class="bold">Bounty type:</span>
                    <q-select v-model="token.bounty" :options="['FREE', 'AMBASSADOR', 'ALLOCATION']" dense />
                    <q-btn @click="editBountyType(token.bounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionBounty" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Bounty:&nbsp;</span>         
                <p v-html="token.descriptionBounty"></p>
                <q-popup-edit v-model="token.descriptionBounty">
                    <span class="bold">Description Bounty:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionBounty"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editBountyDescription(token.descriptionBounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>
<!-- Referral Airdrop -->
        <div class="q-py-md row flex" v-if="token.airdrop !== 'NoN'">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Airdrop:&nbsp;</span>
                {{ token.addLinkReferralAirdrop }}
                <q-popup-edit v-model="token.addLinkReferralAirdrop">
                    <span class="bold">Referral Airdrop:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralAirdrop"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralAirdrop}`" v-if="token.addLinkReferralAirdrop" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralAirdrop(token.addLinkReferralAirdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkReferralAirdrop" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Airdrop:&nbsp;</span>
                <a :href="`${token.addLinkReferralAirdrop}`" v-if="token.addLinkReferralAirdrop" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralAirdrop}}
                </a>
            </q-card-section>

            <q-card-section  class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Airdrop type:&nbsp;</span>
                {{ token.airdrop }}
                <q-popup-edit v-model="token.airdrop">
                    <span class="bold">Airdrop type:</span>
                    <q-select v-model="token.airdrop" :options="['TOKEN', 'NFT']" dense />
                    <q-btn @click="editAirdropType(token.airdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionAirdrop" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Airdrop:&nbsp;</span>         
                <p v-html="token.descriptionAirdrop"></p>
                <q-popup-edit v-model="token.descriptionAirdrop">
                    <span class="bold">Description Airdrop:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionAirdrop"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editAirdropDescription(token.descriptionAirdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>
<!-- Referral Whitelist -->
        <div class="q-py-md row flex" v-if="token.whiteList !== 'NoN'">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Whitelist:&nbsp;</span>
                {{ token.addLinkReferralWhitelist }}
                <q-popup-edit v-model="token.addLinkReferralWhitelist">
                    <span class="bold">Referral Whitelist:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralWhitelist"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralWhitelist}`" v-if="token.addLinkReferralWhitelist" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralWhitelist(token.addLinkReferralWhitelist, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkReferralWhitelist" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Whitelist:&nbsp;</span>
                <a :href="`${token.addLinkReferralWhitelist}`" v-if="token.addLinkReferralWhitelist" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralWhitelist}}
                </a>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Whitelist type:&nbsp;</span>
                {{ token.whiteList }}
                <q-popup-edit v-model="token.whiteList">
                    <span class="bold">Whitelist type:</span>
                    <q-select v-model="token.whiteList" :options="['TOKEN', 'NFT']" dense />
                    <q-btn @click="editWhitelistType(token.whiteList, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionWhitelist" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Whitelist:&nbsp;</span>         
                <p v-html="token.descriptionWhitelist"></p>
                <q-popup-edit v-model="token.descriptionWhitelist">
                    <span class="bold">Description Whitelist:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionWhitelist"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editWhitelistDescription(token.descriptionWhitelist, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>
<!-- Referral Testnet -->
        <div class="q-py-md row flex" v-if="token.testnet !== 'NoN'">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Testnet:&nbsp;</span>
                {{ token.addLinkReferralTestnet }}
                <q-popup-edit v-model="token.addLinkReferralTestnet">
                    <span class="bold">Referral Testnet:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralTestnet"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralTestnet}`" v-if="token.addLinkReferralTestnet" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralTestnet(token.addLinkReferralTestnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkReferralTestnet" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Testnet:&nbsp;</span>
                <a :href="`${token.addLinkReferralTestnet}`" v-if="token.addLinkReferralTestnet" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralTestnet}}
                </a>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Testnet type:&nbsp;</span>
                {{ token.testnet }}
                <q-popup-edit v-model="token.testnet">
                    <span class="bold">Testnet type:</span>
                    <q-select v-model="token.testnet" :options="['NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']" dense />
                    <q-btn @click="editTestnetType(token.testnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionTestnet" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Testnet:&nbsp;</span>         
                <p v-html="token.descriptionTestnet"></p>
                <q-popup-edit v-model="token.descriptionTestnet">
                    <span class="bold">Description:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionTestnet"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editTestnetDescription(token.descriptionTestnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>
<!-- Referral Token -->
        <div class="q-py-md row flex" v-if="token.referralToken !== 'NoN'">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token:&nbsp;</span>
                {{ token.addLinkReferralToken }}
                <q-popup-edit v-model="token.addLinkReferralToken">
                    <span class="bold">Referral Token:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralToken"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralToken}`" v-if="token.addLinkReferralToken" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralToken(token.addLinkReferralToken, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkReferralToken" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token:&nbsp;</span>
                <a :href="`${token.addLinkReferralToken}`" v-if="token.addLinkReferralToken" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkReferralToken}}
                </a>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token type:&nbsp;</span>
                {{ token.referralToken }}
                <q-popup-edit v-model="token.referralToken">
                    <span class="bold">Referral Token type:</span>
                    <q-select v-model="token.referralToken" :options="['fixed', 'percent']" dense />
                    <q-btn @click="editReferralTokenType(token.referralToken, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionReferralToken" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Token:&nbsp;</span>         
                <p v-html="token.descriptionReferralToken"></p>
                <q-popup-edit v-model="token.descriptionReferralToken">
                    <span class="bold">Description Referral Token:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionReferralToken"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editReferralTokenDescription(token.descriptionReferralToken, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>
<!-- Staking -->
        <div class="q-py-md row flex" v-if="token.staking !== 0">
            <q-card-section v-if="$store.getters.role == 'Founder'" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Staking:&nbsp;</span>
                {{ token.addLinkStaking }}
                <q-popup-edit v-model="token.addLinkStaking">
                    <span class="bold">Staking:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkStaking"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkStaking}`" v-if="token.addLinkStaking" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralStaking(token.addLinkStaking, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-else-if="token.addLinkStaking" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Staking:&nbsp;</span>
                <a :href="`${token.addLinkStaking}`" v-if="token.addLinkStaking" target="_blank" class="iconLinkWebsiteTextDecoration">
                    {{token.addLinkStaking}}
                </a>
            </q-card-section>

            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Staking:&nbsp;</span>
                {{ token.staking }} %
                <q-popup-edit v-model="token.staking">
                    <span class="bold">Staking:</span>

                    <q-input
                    class="widthStaking q-my-md"
                    v-model="token.staking"
                    type="number"
                    filled
                    hint="Integers and floating point numbers (separator point, e.g. 5.5)"
                    label="Staking percentage"
                    :rules="[val => (/^[.0-9\s]+$/.test(val)) || 'Integers and floating point numbers (separator point, e.g. 5.5)']"
                    />

                    <q-btn @click="editStaking(token.staking, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

            <q-card-section v-if="token.descriptionStaking" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description Staking:&nbsp;</span>         
                <p v-html="token.descriptionStaking"></p>
                <q-popup-edit v-model="token.descriptionStaking">
                    <span class="bold">Description Referral Staking:</span>

                    <q-editor
                        class="q-my-lg"
                        v-model="token.descriptionStaking"
                        ref="editorRef"
                        :definitions="{
                            photo: {
                                label: 'Image',
                                icon: 'photo',
                                cmd: 'insertImage',
                                param: `https://firebasestorage.googleapis.com/v0/b/catcheckorg-34caf.appspot.com/o/images.jpg?alt=media&token=79f1d970-94fe-4951-9424-18b9aab446ad`
                            },
                            viewsource: {
                                label: 'html'
                            },
                            quote: {
                                icon: 'priority_high',
                                tip: 'Warning'
                            }
                        }"
                        :toolbar="[
                            [
                                { 
                                    label: $q.lang.editor.align,
                                    icon: $q.iconSet.editor.align,
                                    fixedLabel: true,
                                    options: ['left', 'center', 'right', 'justify']
                                }
                            ],
                            ['photo', 'link'],
                            ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript', 'hr'],
                            [{
                                label: $q.lang.editor.formatting,
                                icon: $q.iconSet.editor.formatting,
                                list: 'no-icons',
                                options: ['p', 'h2', 'h3', 'h4', 'h5', 'h6']
                            }],
                            ['quote', 'unordered', 'ordered'],
                            ['undo', 'redo'],
                            [{
                                label: $q.lang.editor.fontSize,
                                icon: $q.iconSet.editor.fontSize,
                                fixedLabel: true,
                                fixedIcon: true,
                                list: 'no-icons',
                                options: [
                                'size-1',
                                'size-2',
                                'size-3',
                                'size-4',
                                'size-5',
                                'size-6',
                                'size-7'
                                ]
                            }],
                            ['viewsource']
                        ]">
                    </q-editor>
                    <q-btn @click="editStakingDescription(token.descriptionStaking, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    <a class="q-ma-xs" href="/upload" target="_blank">
                        <q-btn label="Upload Img" target=_blank color="primary" />
                    </a>
                    
                </q-popup-edit>
            </q-card-section>
        </div>

        <div class="row flex">
<!-- Comment -->
        <q-card-section v-if="token.revision == 'corrected'" class="widthTextarea">
            <h5 class="bold">Token author's comment: </h5>
            {{token.commentUser}}
        </q-card-section>
        <q-card-section>
            <q-input
                class="widthTextarea q-my-md"
                v-model="commentModeration"
                filled
                type="textarea"
                hint="Comment"
                label="Reason for rejection"
            />
        </q-card-section>
<!-- Button For Revision -->
        <q-card-section v-if="token.public === false">
            <div style="display: inline">
                <q-btn
                class="q-mt-lg"
                color="green"
                @click="forRevision(uid, token.id)"
                >For Revision</q-btn>
            </div>
        </q-card-section>
        </div>
    </q-card>



</div>

<div v-for="token in tokensUser" :key="token.id">
    <q-card class="q-ma-md" v-if="token.public == false">
        <div class="q-ma-md q-pa-sm" >
        <h4 v-if="token.revision == 'corrected' || token.revision == 'check'" class="q-pt-lg q-pl-lg q-my-md headerRed">Moderation</h4>
        <h4 v-if="token.revision == 'revision'" class="headerRed q-ma-sm q-px-lg">Sent for revision</h4>
        <h4 v-if="token.revision == 'public'" class="headerGreen q-ma-sm q-px-lg">Published !</h4>
        <div class="row flex">
            
        <!-- Comment -->
            <q-card-section v-if="token.commentModeration" class="widthTextarea">
                <h5 class="bold">Rejection reason: </h5>
                {{token.commentModeration}}

            </q-card-section>
            <q-card-section v-if="token.commentModeration">
                <h5 class="bold">Reply to moderator: </h5>
                <q-input
                    class="widthTextarea q-my-md comment"
                    v-model="commentUser"
                    filled
                    type="textarea"
                    hint="Comment"
                    label="What has been fixed"
                >
                </q-input>
            </q-card-section>
<!-- Button For Revision -->
            <q-card-section v-if="token.commentModeration">
                <div style="display: inline">
                    <q-btn
                    class="q-mt-lg"
                    color="green"
                    @click="sendForModeration(uid, token.id)"
                    >Send again for moderation</q-btn>
                </div>
            </q-card-section>
        </div>
        <div class="row flex">
<!-- Button IMG -->
            <q-card-section class="text-center q-pa-sm">
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
                <q-popup-edit v-model="token.file">
                    <span class="bold">IMG:</span>
                        <q-file
                            class="minWidthInput"
                            @change="convertImageU(token.name)"
                            v-model="file"
                            filled
                            bottom-slots
                            label="Image"
                            counter
                        >
                        <template v-slot:prepend>
                            <q-icon name="far fa-image" color="primary" @click.stop class="cursor-pointer" />
                        </template>
                        <template v-slot:append>
                            <q-icon name="close" @click.stop="file = null" class="cursor-pointer" />
                        </template>

                        <template v-slot:hint>
                            Download Token Image
                        </template>
                        </q-file>
                    <q-btn @click="downImage(token.id)" :loading="submitting" :disable="disableButton" icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- Button Delete -->
            <q-card-section>
                <div style="display: inline">
                    <q-btn
                    class="button-margin"
                    color="primary"
                    @click="confirmDeleteToken(token.id, token.name, token.imgUrl)"
                    >Delete</q-btn>
                </div>
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
                <q-popup-edit v-model="token.name">
                    <span class="bold">Name:</span>
                    <q-input dense v-model="token.name" />
                    <q-btn @click="editTokenName(token.name, token.id)" icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- symbol -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Symbol:&nbsp;</span>
                {{ token.symbol }}
                <q-popup-edit v-model="token.symbol">
                    <span class="bold">Symbol: </span>
                    <q-input dense v-model="token.symbol" />
                    <q-btn @click="editTokenSymbol(token.symbol, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- chain -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Chain:&nbsp;</span>
                {{ token.chain }}
                <q-popup-edit v-model="token.chain">
                    <span class="bold">Chain:</span>
                    <q-select v-model="token.chain" :options="['BSC', 'ETH', 'Solana', 'Polkadot', 'Avalanche', 'Terra', 'Tron', 'Fantom', 'Heco', 'MATIC', 'other']" dense />
                    <q-btn @click="editTokenChain(token.chain, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- category -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Category:&nbsp;</span>
                {{ token.category }}
                <q-popup-edit v-model="token.category">
                    <span class="bold">Category:</span>
                    <q-select v-model="token.category" :options="['game', 'social', 'DEFI', 'NFT', 'gambling', 'exchanges', 'marketplaces', 'launchpad', 'other']" dense />
                    <q-btn @click="editTokenCategory(token.category, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- referral token -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token:&nbsp;</span>
                {{ token.referralToken }}
                <q-popup-edit v-model="token.referralToken">
                    <span class="bold">Referral Token:</span>
                    <q-select v-model="token.referralToken" :options="['NoN', 'fixed', 'percent']" dense />
                    <q-btn @click="editReferralToken(token.referralToken, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- presale -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale:&nbsp;</span>
                {{ token.dateLaunch == 'NoN' ? 'NoN' : `${new Intl.DateTimeFormat('en-En').format(new Date(token.dateLaunch))}`}}
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">   
                    <q-date class="q-ma-md" v-model="dateLaunch"/>
                    <div class="row items-center justify-start q-gutter-sm q-ma-md">
                        <q-btn @click="editTokenDateLaunch(Date.parse(dateLaunch), token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                        <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                    </div>
                </q-popup-proxy>
            </q-card-section>
<!-- whiteList -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">WhiteList:&nbsp;</span>
                {{ token.whiteList }}
                <q-popup-edit v-model="token.whiteList">
                    <span class="bold">WhiteList:</span>
                    <q-select v-model="token.whiteList" :options="['NoN', 'TOKEN', 'NFT']" dense />
                    <q-btn @click="editTokenWhiteList(token.whiteList, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- airdrop -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Airdrop:&nbsp;</span>
                {{ token.airdrop }}
                <q-popup-edit v-model="token.airdrop">
                    <span class="bold">Airdrop:</span>
                    <q-select v-model="token.airdrop" :options="['NoN','TOKEN', 'NFT']" dense />
                    <q-btn @click="editTokenAirdrop(token.airdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- bounty -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Bounty:&nbsp;</span>
                {{ token.bounty }}
                <q-popup-edit v-model="token.bounty">
                    <span class="bold">Bounty:</span>
                    <q-select v-model="token.bounty" :options="['NoN','FREE', 'AMBASSADOR', 'ALLOCATION']" dense />
                    <q-btn @click="editTokenBounty(token.bounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- testnet -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Testnet:&nbsp;</span>
                {{ token.testnet }}
                <q-popup-edit v-model="token.testnet">
                    <span class="bold">Testnet:</span>
                    <q-select v-model="token.testnet" :options="['NoN', 'NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']" dense />
                    <q-btn @click="editTokenTestnet(token.testnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- address -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Address:&nbsp;</span>
                {{ token.address }}
                <q-popup-edit v-model="token.address">
                    <span class="bold">Address:</span>
                    <q-input v-model="token.address" dense />
                    <q-btn @click="editTokenAddress(token.address, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- website -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Website:&nbsp;</span>
                {{ token.website }}
                <q-popup-edit v-model="token.website">
                    <span class="bold">Website:</span>  
                    <q-input
                        v-model="token.website"
                        dense
                        hint="Site URL https://..."
                        :rules="[value => value.includes('https://') || value.includes('http://') || 'The address must contain https:// or http://']"
                        >
                        <a :href="`${token.website}`" v-if="token.website" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenWebsite(token.website, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- telegram -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Telegram:&nbsp;</span>
                {{ token.telegram }}
                <q-popup-edit v-model="token.telegram">
                    <span class="bold">Telegram:</span>
                    <q-input
                    v-model="token.telegram"
                    dense 
                    hint="Site URL https://t.me/..."
                    :rules="[value => value.includes('https://t.me/') || value.includes('http://t.me/') || 'Must contain https://t.me/.. or http://t.me/..']"
                    >
                        <a :href="`${token.telegram}`" v-if="token.telegram" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenTelegram(token.telegram, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- twitter -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Twitter:&nbsp;</span>
                {{ token.twitter.twitterLink }}
                <q-popup-edit v-model="token.twitter.twitterLink">
                    <span class="bold">Twitter:</span>
                    <q-input
                    v-model="token.twitter.twitterLink"
                    dense
                    hint="Site URL https://twitter.com/..."
                    :rules="[value => value.includes('https://twitter.com/') || value.includes('http://twitter.com/') || 'Must contain https://twitter.com/...']"
                    >
                        <a :href="`${token.twitter.twitterLink}`" v-if="token.twitter.twitterLink" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenTwitter(token.twitter.twitterLink, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- discord -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Discord:&nbsp;</span>
                {{ token.discord }}
                <q-popup-edit v-model="token.discord">
                    <span class="bold">Discord:</span>
                    <q-input
                    v-model="token.discord"
                    dense
                    hint="Site URL https://discord.com/..."
                    :rules="[value => value.includes('https://discord.com/') || value.includes('http://discord.com/') || 'Must contain https://discord.com/...']"
                    >
                        <a :href="`${token.discord}`" v-if="token.discord" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenDiscord(token.discord, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- facebook -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Facebook:&nbsp;</span>
                {{ token.facebook }}
                <q-popup-edit v-model="token.facebook">
                    <span class="bold">Facebook:</span>
                    <q-input
                    v-model="token.facebook"
                    dense
                    hint="Site URL https://facebook.com/..."
                    :rules="[value => value.includes('https://facebook.com/') || value.includes('http://facebook.com/') || value.includes('https://www.facebook.com/') || value.includes('http://www.facebook.com/') || 'Must contain https://facebook.com/...']"
                    >
                        <a :href="`${token.facebook}`" v-if="token.facebook" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenFacebook(token.facebook, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- instagram -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Instagram:&nbsp;</span>
                {{ token.instagram }}
                <q-popup-edit v-model="token.instagram">
                    <span class="bold">Instagram:</span>
                    <q-input
                    v-model="token.instagram"
                    dense
                    hint="Site URL https://instagram.com/..."
                    :rules="[value => value.includes('https://instagram.com/') || value.includes('http://instagram.com/') || value.includes('https://www.instagram.com/') || value.includes('http://www.instagram.com/') || 'Must contain https://instagram.com/...']"
                    >
                        <a :href="`${token.instagram}`" v-if="token.instagram" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenInstagram(token.instagram, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- linkedin -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Linkedin:&nbsp;</span>
                {{ token.linkedin }}
                <q-popup-edit v-model="token.linkedin">
                    <span class="bold">Linkedin:</span>
                    <q-input
                    v-model="token.linkedin"
                    dense
                    hint="Site URL https://linkedin.com/..."
                    :rules="[value => value.includes('https://linkedin.com/') || value.includes('http://linkedin.com/') || value.includes('https://www.linkedin.com/') || value.includes('http://www.linkedin.com/') || 'Must contain https://linkedin.com/...']"
                    >
                        <a :href="`${token.linkedin}`" v-if="token.linkedin" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenLinkedin(token.linkedin, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- linkedin -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Github:&nbsp;</span>
                {{ token.github }}
                <q-popup-edit v-model="token.github">
                    <span class="bold">Github:</span>
                    <q-input
                    v-model="token.github"
                    dense
                    hint="Site URL https://github.com/..."
                    :rules="[value => value.includes('https://github.com/') || value.includes('http://github.com/') || value.includes('https://www.github.com/') || value.includes('http://www.github.com/') || 'Must contain https://github.com/...']"
                    >
                        <a :href="`${token.github}`" v-if="token.github" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenGithub(token.github, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- medium -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Medium:&nbsp;</span>
                {{ token.medium }}
                <q-popup-edit v-model="token.medium">
                    <span class="bold">Medium:</span>
                    <q-input
                    v-model="token.medium"
                    dense
                    hint="Site URL https://medium.com/..."
                    :rules="[value => value.includes('https://medium.com/') || value.includes('http://medium.com/') || 'Must contain https://medium.com/...']"
                    >
                        <a :href="`${token.medium}`" v-if="token.medium" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenMedium(token.medium, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- reddit -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Reddit:&nbsp;</span>
                {{ token.reddit }}
                <q-popup-edit v-model="token.reddit">
                    <span class="bold">Reddit:</span>
                    <q-input
                    v-model="token.reddit"
                    dense
                    hint="Site URL https://reddit.com/..."
                    :rules="[value => value.includes('https://reddit.com/') || value.includes('http://reddit.com/') || value.includes('https://www.reddit.com/') || value.includes('http://www.reddit.com/') || 'Must contain https://reddit.com/...']"
                    >
                        <a :href="`${token.reddit}`" v-if="token.reddit" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenReddit(token.reddit, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>   
<!-- twitch -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Twitch:&nbsp;</span>
                {{ token.twitch }}
                <q-popup-edit v-model="token.twitch">
                    <span class="bold">Twitch:</span>
                    <q-input
                    v-model="token.twitch"
                    dense
                    hint="Site URL https://twitch.tv/..."
                    :rules="[value => value.includes('https://twitch.tv/') || value.includes('http://twitch.tv/') || value.includes('https://www.twitch.tv/') || value.includes('http://www.twitch.tv/') || 'Must contain https://twitch.tv/...']"
                    >
                        <a :href="`${token.twitch}`" v-if="token.twitch" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenTwitch(token.twitch, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
<!-- youtube -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Youtube:&nbsp;</span>
                {{ token.youtube }}
                <q-popup-edit v-model="token.youtube">
                    <span class="bold">Youtube:</span>
                    <q-input
                    v-model="token.youtube"
                    dense
                    :rules="[value => value.includes('https://youtube.com/') || value.includes('http://youtube.com/') || value.includes('https://www.youtube.com/') || value.includes('http://www.youtube.com/') || value.includes('https://youtu.be/') || 'Must contain https://youtube.com/...']"
                    >
                        <a :href="`${token.youtube}`" v-if="token.youtube" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editTokenYoutube(token.youtube, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
            </div>
<!-- description -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p v-html="token.text"></p>
                <q-popup-edit v-model="token.text">
                    <span class="bold">Description:</span>
                    <q-input v-model="token.text" type="textarea" dense />
                    <q-btn @click="editTokenDescription(token.text, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
            <div class="row flex">
<!-- Referral Bounty -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Bounty:&nbsp;</span>
                {{ token.addLinkReferralBounty }}
                <q-popup-edit v-model="token.addLinkReferralBounty">
                    <span class="bold">Referral Bounty:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralBounty"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralBounty}`" v-if="token.addLinkReferralBounty" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralBounty(token.addLinkReferralBounty, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

<!-- Referral Airdrop -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Airdrop:&nbsp;</span>
                {{ token.addLinkReferralAirdrop }}
                <q-popup-edit v-model="token.addLinkReferralAirdrop">
                    <span class="bold">Referral Airdrop:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralAirdrop"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralAirdrop}`" v-if="token.addLinkReferralAirdrop" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralAirdrop(token.addLinkReferralAirdrop, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

<!-- Referral Whitelist -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Whitelist:&nbsp;</span>
                {{ token.addLinkReferralWhitelist }}
                <q-popup-edit v-model="token.addLinkReferralWhitelist">
                    <span class="bold">Referral Whitelist:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralWhitelist"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralWhitelist}`" v-if="token.addLinkReferralWhitelist" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralWhitelist(token.addLinkReferralWhitelist, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>

<!-- Referral Testnet -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Testnet:&nbsp;</span>
                {{ token.addLinkReferralTestnet }}
                <q-popup-edit v-model="token.addLinkReferralTestnet">
                    <span class="bold">Referral Testnet:</span>
                    <q-input
                    class="minWidthPopupInput"
                    v-model="token.addLinkReferralTestnet"
                    dense
                    :rules="[value => value.includes('https://') || value.includes('http://') || 'Must contain https://...']"
                    >
                        <a :href="`${token.addLinkReferralTestnet}`" v-if="token.addLinkReferralTestnet" target="_blank" class="iconLinkWebsiteTextDecoration">
                            <q-icon name="launch" color="primary" size="sm" />
                        </a>
                    </q-input>
                    <q-btn @click="editAddLinkReferralTestnet(token.addLinkReferralTestnet, token.id)" v-close-popup icon-right="save" label="Save" color="green" class="q-ma-xs"/>
                    <q-btn v-close-popup class="q-ma-xs" icon-right="close" label="Close"  color="red"/>
                </q-popup-edit>
            </q-card-section>
            </div>
        </div>
    </q-card>
</div>


<div v-for="token in tokensUser" :key="token.id">
    <q-card class="q-ma-md"  v-if="token.public == true">
        <div class="q-ma-md q-pa-sm">
        <h4 v-if="token.revision == 'corrected' || token.revision == 'check'" class="q-pt-lg q-pl-lg q-my-md headerRed">Moderation</h4>
        <h4 v-if="token.revision == 'revision'" class="headerRed q-ma-sm q-px-lg">Sent for revision</h4>
        <h4 v-if="token.revision == 'public'" class="headerGreen q-ma-sm q-px-lg">Published !</h4>
        <div class="row flex">
<!-- IMG -->
            <q-card-section class="text-center q-pa-sm">               
                <img
                loading="lazy"
                style="height: 50px; width: 50px"
                spinner-color="grey-4"
                :src="`${token.imgUrl}`"
                class="cursor-pointer"
                />
            </q-card-section>
<!-- name -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Name:&nbsp;</span>
                {{ token.name }}
            </q-card-section>
<!-- symbol -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Symbol:&nbsp;</span>
                {{ token.symbol }}
            </q-card-section>
<!-- chain -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Chain:&nbsp;</span>
                {{ token.chain }}
            </q-card-section>
<!-- category -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Category:&nbsp;</span>
                {{ token.category }}
            </q-card-section>
<!-- referral token -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token:&nbsp;</span>
                {{ token.referralToken }}
            </q-card-section>
<!-- presale -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Presale:&nbsp;</span>
                {{ token.dateLaunch == 'NoN' ? 'NoN' : `${new Intl.DateTimeFormat('en-En').format(new Date(token.dateLaunch))}`}}
            </q-card-section>
<!-- whiteList -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">WhiteList:&nbsp;</span>
                {{ token.whiteList }}
            </q-card-section>
<!-- airdrop -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Airdrop:&nbsp;</span>
                {{ token.airdrop }}
            </q-card-section>
<!-- bounty -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Bounty:&nbsp;</span>
                {{ token.bounty }}
            </q-card-section>
<!-- testnet -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Testnet:&nbsp;</span>
                {{ token.testnet }}
            </q-card-section>
<!-- address -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Address:&nbsp;</span>
                {{ token.address }}
            </q-card-section>
<!-- website -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Website:&nbsp;</span>
                {{ token.website }}
            </q-card-section>
<!-- telegram -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Telegram:&nbsp;</span>
                {{ token.telegram }}
            </q-card-section>
<!-- twitter -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Twitter:&nbsp;</span>
                {{ token.twitter.twitterLink }}
            </q-card-section>
<!-- discord -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Discord:&nbsp;</span>
                {{ token.discord }}
            </q-card-section>
<!-- facebook -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Facebook:&nbsp;</span>
                {{ token.facebook }}
            </q-card-section>
<!-- instagram -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Instagram:&nbsp;</span>
                {{ token.instagram }}
            </q-card-section>
<!-- linkedin -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Linkedin:&nbsp;</span>
                {{ token.linkedin }}
            </q-card-section>
<!-- linkedin -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Github:&nbsp;</span>
                {{ token.github }}
            </q-card-section>
<!-- medium -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Medium:&nbsp;</span>
                {{ token.medium }}
            </q-card-section>
<!-- reddit -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Reddit:&nbsp;</span>
                {{ token.reddit }}
            </q-card-section>   
<!-- twitch -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Twitch:&nbsp;</span>
                {{ token.twitch }}
            </q-card-section>
<!-- youtube -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Youtube:&nbsp;</span>
                {{ token.youtube }}
            </q-card-section>
</div>
<!-- description -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p v-html="token.text"></p>
            </q-card-section>
        
<div class="row flex">
<!-- Referral Bounty -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Bounty:&nbsp;</span>
                {{ token.addLinkReferralBounty }}
            </q-card-section>

<!-- Referral Airdrop -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Airdrop:&nbsp;</span>
                {{ token.addLinkReferralAirdrop }}
            </q-card-section>

<!-- Referral Whitelist -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Whitelist:&nbsp;</span>
                {{ token.addLinkReferralWhitelist }}
            </q-card-section>

<!-- Referral Testnet -->
            <q-card-section class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Testnet:&nbsp;</span>
                {{ token.addLinkReferralTestnet }}
            </q-card-section>
            </div>
        </div>
    </q-card>
</div>
</template>


<script>
import 'firebase/compat/auth';
import { getStorage, ref as storageReference, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getDatabase, ref, onValue, set, update, remove} from "firebase/database";
import { getFunctions, httpsCallable } from "firebase/functions";


 const columns = [
  { name: 'imgUrl', align: 'center', label: 'IMG', field: 'imgUrl'},
  // { name: 'promising', align: 'center', label: 'PROMISING', field: 'promising', sortable: true },
  { name: 'name', required: true, label: 'NAME', align: 'center', field: row => row.name, format: val => `${val}`, sortable: true},
  { name: 'symbol', align: 'center', label: 'SYMBOL', field: 'symbol' },
  { name: 'chain', align: 'center', label: 'CHAIN', field: 'chain' },
  { name: 'category', align: 'center', label: 'CATEGORY', field: 'category' },
  { name: 'presale', align: 'center', label: 'PRESALE', field: 'dateLaunch', sortable: true},
  { name: 'whiteList', align: 'center', label: 'WHITELIST', field: 'whiteList', sortable: true },
  { name: 'airdrop', align: 'center', label: 'AIRDROP', field: 'airdrop', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'bounty', align: 'center', label: 'BOUNTY', field: 'bounty', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'testnet', align: 'center', label: 'TESTNET', field: 'testnet'},
  { name: 'address', align: 'center', label: 'ADDRESS', field: 'address'},

]


export default {
    
  data () {
    return {
      user: '',
      email: '',
      accountMetamask: '',
      chainId: '',
      photoUrl: '',
      tokens: [],
      suitableForAllocation: false,
      suitableForLABS: false,
      promoted: false,
      tokenVerificationTime: '',
      topEvents: '',
      columns,
      dateLaunch: '',
      presale: '',
      file: null,
      name: '',
      img: '',
      submitting: false,
      disableButton: false,
      addLinkReferralBounty: '',
      addLinkReferralAirdrop: '',
      addLinkReferralWhitelist: '',
      addLinkReferralTestnet: '',
      dataUser: [],
      commentModeration: '',
      commentUser: '',
      addTokenTime: Date.now(),
      spinnerLoading: false,
      model: null,
      editorRef: null,
      tokenRef: null,
      editor: 'Customize it.',
      UploadImg: 'Upload Img'
    }
  },
  methods: {
    // add (name) {
    //     console.log('name', name)
    //     const edit = this.$refs.editor
    //     console.log('edit', edit)
    //     edit.caret.restore()
    //     edit.runCmd('insertHTML', `<img src="${name}"/>`)
    //     edit.focus()
    //   },
    publicToken(uid, tokenId) {
        const db = getDatabase()
        update(ref(db, 'token/' + tokenId), {
            public: true,
            revision: 'public'
        }, this.addPointsPublisher(uid, tokenId))
        .then(() => {
            this.$q.notify({message: 'Toket published', color: 'green'})
        }).catch(error => {
            this.$q.notify({message: error, color: 'red'})
        }) 
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
    confirmDeleteToken (tokenId, tokenName, imgUrl) {
      this.$q.dialog({
        title: 'Attention!',
        message: `Are you sure you want to delete the token ${tokenName}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteToken(tokenId, tokenName, imgUrl)
      })
    },
    deleteToken (tokenId, tokenName, imgUrl) {
      this.loading = true
      const db = getDatabase()
      const storage = getStorage()
      const desertRef = storageReference(storage, imgUrl)
        this.deleteVote(tokenId)
        remove(ref(db, "token/" + tokenId))
        .then(() => {
            this.loading = false
            deleteObject(desertRef)
            .then(() => {
            console.log('File deleted successfully', imgUrl)
            }).catch((error) => {
                this.$q.notify({message: `Ошибка удаления картинки${error}`, color: 'red'})
            })
            this.$q.notify({message: `${tokenName} token successfully deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `Ошибка удаления токена${error}`, color: 'red'}) 
        })
    },
    sendForModeration(uid, tokenId) {
        const db = getDatabase()
        update(ref(db, 'token/' + tokenId), {
            revision: 'corrected',
            commentUser: this.commentUser
        }, this.addPointsPublisher(uid, tokenId))
        .then(() => {
            this.$q.notify({message: `Token sent for moderation`, color: 'green'})
        }).catch(error => {
            this.$q.notify({message: error, color: 'red'})
        })
    },
    forRevision(uid, tokenId) {
        if(this.comment == '') {
            this.$q.notify({message: 'Write the reason for refusal', color: 'red'})
        } else {
            const db = getDatabase()
            update(ref(db, 'token/' + tokenId), {
                revision: 'revision',
                commentModeration: this.commentModeration
            })
            .then(() => {
                this.$q.notify({message: `Token sent for revision`, color: 'green'})
            }).catch(error => {
                this.$q.notify({message: error, color: 'red'})
            })
        }
    },
    deleteVote(tokenId) {
      const db = getDatabase()
        remove(ref(db, "users/" + this.uid + '/votes/' + tokenId))
    },
    addPointsPublisher(uid, tokenId) {
        const db = getDatabase();
            set(ref(db, 'users/' + uid + '/votes/' + tokenId), {
            value: 50,
            time: Date.now() - 86400000
        });
    },
    loadToken() {
        this.$q.loading.show()
        const db = getDatabase()
        const tokensRef = ref(db, 'token/')
        new Promise((resolve, reject) => {
            onValue(tokensRef, (snapshot) => {
            resolve(snapshot.val())
            const data = snapshot.val()
            this.tokens = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...data[key]
                    }
                })
            //this.loadDataUser()
            })
        })
    },

/*    loadDataUser() {
        const db = getDatabase()
        const tokensRef = ref(db, `users/${this.uid}/`)

        new Promise((resolve, reject) => {
            onValue(tokensRef, (snapshot) => {
            resolve(snapshot.val())
            const data = snapshot.val()
            this.dataUser = Object.keys(data).map(key => {
                    return {
                        id: key,
                        ...data[key]
                    }
                })
            })
        }).then(() => this.deleteUndefineVotes()) 
    },
     deleteUndefineVotes() {
        const resultTokens = this.tokensAll.map(tokens => tokens.id)
        console.log('resultTokens', resultTokens)
        const resultdataUser = this.dataUser.map(tokens => tokens.id)
        console.log('resultdataUser', resultdataUser)
        //const result = this.dataUser.filter((token) => this.tokensAll.some(testnet => token.id != testnet.id))
        const result = this.dataUser.filter(v => !this.tokensAll.some(v2 => v.id == v2.id))
        console.log('result', result)
    }, */
    editTokenImage (id) {
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            imgUrl : this.img
        })
        .then(() => {
            this.submitting = false
            this.disableButton = false
            this.$q.notify({message: `Token image saved`, color: 'green'}) 
        })
        .catch((error) => {
            this.submitting = false
            this.disableButton = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenName (name, id) {
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            name : name
        })
        .then(() => {
            this.$q.notify({message: `Saved name ${name}`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenSymbol (symbol, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            symbol : symbol
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved symbol ${symbol}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editSuitableForAllocation (suitableForAllocation, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            suitableForAllocation : suitableForAllocation
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved "Suitable For Allocation"`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editSuitableForLABS (suitableForLABS, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            suitableForLABS : suitableForLABS
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved "Promoted"`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editPromoted (promoted, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            promoted : promoted
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved "Suitable For LABS"`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTopEvents (topEvents, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            topEvents : topEvents
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved TOP Events`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenChain (chain, id) {
    console.log('hello', chain, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            chain : chain
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved chain ${chain}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editReferralToken (referralToken, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            referralToken : referralToken
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved referral Token ${referralToken}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenCategory (category, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            category : category
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved category ${category}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenDateLaunch (dateLaunch, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            dateLaunch : dateLaunch
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved presale`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenWhiteList (whiteList, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            whiteList : whiteList
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved whiteList ${whiteList}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenAirdrop (airdrop, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            airdrop : airdrop
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved airdrop ${airdrop}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenBounty (bounty, id) {
    console.log('hello', bounty, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            bounty : bounty
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved bounty ${bounty}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenTestnet (testnet, id) {
    console.log('hello', testnet, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            testnet : testnet
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved testnet ${testnet}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenAddress (address, id) {
    console.log('hello', address, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            address : address
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved address ${address}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenWebsite (website, id) {
    console.log('hello', website, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            website : website
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved website ${website}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenTelegram (telegram, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            telegram : telegram
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved telegram ${telegram}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenTwitter (twitter, id) {
      this.loading = true

      const functions = getFunctions()
      const twitterCheckURL = httpsCallable(functions,'twitterCheckURL')
      twitterCheckURL(twitter).then(result => {
        console.log("result", result)
        console.log("TokenModeration result.data.data", result.data.data)
        console.log("TokenModeration result.data.data.id", result.data.data.id)
        console.log("TokenModeration result.data.data.name", result.data.data.name)
        const twitterId = result.data.data.id
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            twitter : {twitterLink: twitter, twitterId}
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved twitter ${twitter}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
      }).catch(err => {
        this.$q.notify({message: `Invalid twitter link ${this.twitter}`, color: 'red'})
        this.loading = false
        return err
      })


      
    },
    editTokenDiscord (discord, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            discord : discord
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved discord ${discord}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenFacebook (facebook, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            facebook : facebook
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved facebook ${facebook}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenInstagram (instagram, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            instagram : instagram
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved instagram ${instagram}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenLinkedin (linkedin, id) { 
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            linkedin : linkedin
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved linkedin ${linkedin}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenGithub (github, id) { 
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            github : github
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved github ${github}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenMedium (medium, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            medium : medium
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved medium ${medium}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenReddit (reddit, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            reddit : reddit
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved reddit ${reddit}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenTwitch (twitch, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            twitch : twitch
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved twitch ${twitch}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenYoutube (youtube, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            youtube : youtube
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved youtube ${youtube}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTokenDescription (text, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            text : text
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralBounty(addLinkReferralBounty, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkReferralBounty : addLinkReferralBounty
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkReferralBounty}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editBountyType (bounty, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            bounty : bounty
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved bounty ${bounty}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editBountyDescription (bounty, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionBounty : bounty
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Bounty description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralAirdrop(addLinkReferralAirdrop, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkReferralAirdrop : addLinkReferralAirdrop
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkReferralAirdrop}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAirdropType (airdrop, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            airdrop : airdrop
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved airdrop ${airdrop}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAirdropDescription (airdrop, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionAirdrop : airdrop
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Airdrop description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralWhitelist(addLinkReferralWhitelist, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkReferralWhitelist : addLinkReferralWhitelist
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkReferralWhitelist}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editWhitelistType (whitelist, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            whiteList : whitelist
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved whitelist ${whitelist}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editWhitelistDescription (whitelist, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionWhitelist : whitelist
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Whitelist description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralTestnet(addLinkReferralTestnet, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkReferralTestnet : addLinkReferralTestnet
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkReferralTestnet}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTestnetType (testnet, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            testnet : testnet
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved testnet ${testnet}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editTestnetDescription (description, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionTestnet : description
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Testnet description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralToken(addLinkReferralToken, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkReferralToken : addLinkReferralToken
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkReferralToken}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editReferralTokenType (referralToken, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            referralToken : referralToken
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Token Type ${referralToken}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editReferralTokenDescription (descriptionReferralToken, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionReferralToken : descriptionReferralToken
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Token description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editAddLinkReferralStaking(addLinkStaking, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            addLinkStaking : addLinkStaking
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Link ${addLinkStaking}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editStaking (staking, id) {
        console.log(staking, id)
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            staking : staking
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved staking ${staking}`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    editStakingDescription (descriptionStaking, id) {
      this.loading = true
      const db = getDatabase()
        update(ref(db, "token/" + id), {
            descriptionStaking : descriptionStaking
        })
        .then(() => {
            this.loading = false
            this.$q.notify({message: `Saved Referral Staking description`, color: 'green'}) 
        })
        .catch((error) => {
            this.loading = false
            console.log(error)
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    convertImageU(name) {  
        const width = 50;
        const height = 50;
        const fileName = name;
        const reader = new FileReader();

        reader.readAsDataURL(this.file);
        reader.onload = event => {
            const img = new Image();

            img.src = event.target.result;
            img.onload = () => {
            const elem = document.createElement('canvas');
            elem.width = width;
            elem.height = height;
            const ctx = elem.getContext('2d');
            // img.width и img.height будет содержать оригинальные размеры
            ctx.drawImage(img, 0, 0, width, height);
            ctx.canvas.toBlob((blob) => {
                const fileImg = new File([blob], fileName, {
                type: 'image/webp',
                lastModified: Date.now()
                });
            this.file = fileImg
            this.name = fileName
            }, 'image/webp', 1);
            };
            reader.onerror = error => console.log(error)
        };
    },
    downImage(id) {
      this.submitting = true
      this.disableButton = true
      const storage = getStorage();
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = storageReference(storage, 'imagesToken/' + this.name.toLowerCase().trim().replace(/[^a-z0-9]/g,'') + '.webp');
      const uploadTask = uploadBytesResumable(storageRef, this.file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            this.img = downloadURL
          }).then(() => this.editTokenImage (id))
        }
      )
    },
    uploadImg () {
        this.$q.notify({
        message: 'Saved your text to local storage',
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done'
        })
        console.log('uploadImg')
    },
},
    computed: {
        uid() {
                return this.$store.getters.uid
            },
        tokensUser() {
            return this.tokens.filter(token => token.tokenPublishedUser == this.uid)
        },
        tokensModerator() {
            return this.tokens.filter(token => token.public == false)
        }
  },
    watch: {
        tokens(value) {
            if(value) {
                this.$q.loading.hide()
            }
        }
    },
    mounted() {
    this.loadToken()
  }
}
</script>

<style scoped lang="sass">

.minWidthPopupInput
    min-width: 300px

.minWidthPhotoInput
    min-width: 600px

.widthBlockEditToken
    width: 100px
    overflow: hidden
    text-overflow: ellipsis

.bg-primary
    background-color: primary

.timer__items 
  display: flex
  font-size: 18px

.timer__item 
  position: relative
  min-width: 40px
  margin-left: 10px
  margin-right: 10px
  padding-bottom: 15px
  text-align: center

.timer__item::before 
  content: attr(data-title)
  display: block
  position: absolute
  left: 50%
  bottom: 0
  transform: translateX(-50%)
  font-size: 14px

.timer__item:not(:last-child)::after 
  content: ':'
  position: absolute
  right: -15px

.timer_container
    width: 220px

.iconLinkWebsiteTextDecoration
    text-decoration: none

.box-shadow 
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
    border-radius: 4px
    vertical-align: top
    background: #fff
    position: relative

.widthTextarea
  width: 400px

.headerRed
    color: red

.headerGreen
    color: green

.linkButtonDisplayBlock
    display: block
    text-decoration: none

.spinnerCenter
    margin-left: 45%
    margin-top: 45%

.center
  display: block
  margin-left: auto
  margin-right: auto
  width: 50%

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
</style>