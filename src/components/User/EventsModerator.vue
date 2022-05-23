<template> 
<h4 v-if="(tokensEventsWitelistModerator.length == 0) && (tokensEventsAirdropModerator.length == 0) && (tokensEventsBountyModerator.length == 0) && (tokensEventsTestnetModerator.length == 0)" class="q-mx-lg">No events to check</h4>
<div v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'">

<!-- Events Referral Token Moderator -->    
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsReferralTokenModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Referral Token Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkReferralTokenModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token Link:&nbsp;</span>
                    <a :href="`${token.addLinkReferralTokenModeration}`" v-if="token.addLinkReferralTokenModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkReferralTokenModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkReferralTokenModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Token:&nbsp;</span>
                {{ token.referralTokenModeration }}
            </q-card-section>
<!-- Button Public Link Referral Token -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralTokenModeration(token.id, token.referralTokenModeration, token.addLinkReferralTokenModeration, token.descriptionReferralTokenModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralTokenModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
            <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
            </a>        
<!-- telegram -->
            <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
            </a>
<!-- twitter -->
            <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
            </a>
<!-- discord -->
            <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
            </a>
<!-- facebook -->
            <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
            </a>
<!-- instagram -->
            <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
            </a>
<!-- medium -->
            <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
            </a>
<!-- reddit -->
            <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
            </a>
<!-- twitch -->
            <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
            </a>
<!-- youtube -->
            <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
            </a>
<!-- linkedin -->
            <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
            </a>
<!-- github -->
            <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
            </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionReferralTokenModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionReferralTokenModeration }}</p>
            </q-card-section>
    </q-card>

<!-- Events Witelist Moderator -->    
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsWitelistModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Witelist Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkReferralWhitelistModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Link Whitelist:&nbsp;</span>
                    <a :href="`${token.addLinkReferralWhitelistModeration}`" v-if="token.addLinkReferralWhitelistModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkReferralWhitelistModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkReferralWhitelistModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Whitelist Event:&nbsp;</span>
                {{ token.whiteListModeration }}
            </q-card-section>
<!-- Button Public Link Referral Whitelist -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralWhitelistModeration(token.id, token.whiteListModeration, token.addLinkReferralWhitelistModeration, token.descriptionWhiteListModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralWhitelistModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
            <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
            </a>        
<!-- telegram -->
            <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
            </a>
<!-- twitter -->
            <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
            </a>
<!-- discord -->
            <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
            </a>
<!-- facebook -->
            <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
            </a>
<!-- instagram -->
            <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
            </a>
<!-- medium -->
            <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
            </a>
<!-- reddit -->
            <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
            </a>
<!-- twitch -->
            <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
            </a>
<!-- youtube -->
            <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
            </a>
<!-- linkedin -->
            <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
            </a>
<!-- github -->
            <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
            </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionWhiteListModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionWhiteListModeration }}</p>
            </q-card-section>
    </q-card>

<!-- Events Airdrop Moderator -->
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsAirdropModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Airdrop Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkReferralAirdropModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Link Airdrop:&nbsp;</span>
                    <a :href="`${token.addLinkReferralAirdropModeration}`" v-if="token.addLinkReferralAirdropModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkReferralAirdropModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkReferralAirdropModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Airdrop Event:&nbsp;</span>
                {{ token.airdropModeration }}
            </q-card-section>
<!-- Button Public Link Referral Airdrop -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralAirdropModeration(token.id, token.airdropModeration, token.addLinkReferralAirdropModeration, token.descriptionAirdropModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralAirdropModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
                <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
                </a>        
<!-- telegram -->
                <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                </a>
<!-- twitter -->
                <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
                </a>
<!-- discord -->
                <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
                </a>
<!-- facebook -->
                <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
                </a>
<!-- instagram -->
                <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
                </a>
<!-- medium -->
                <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
                </a>
<!-- reddit -->
                <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                </a>
<!-- twitch -->
                <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
                </a>
<!-- youtube -->
                <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
                </a>
<!-- linkedin -->
                <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                </a>
<!-- github -->
                <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
                </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionAirdropModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionAirdropModeration }}</p>
            </q-card-section>
    </q-card>

<!-- Events Bounty Moderator -->
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsBountyModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Bounty Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkReferralBountyModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Link Bounty:&nbsp;</span>
                    <a :href="`${token.addLinkReferralBountyModeration}`" v-if="token.addLinkReferralBountyModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkReferralBountyModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkReferralBountyModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Bounty Event:&nbsp;</span>
                {{ token.bountyModeration }}
            </q-card-section>
<!-- Button Public Link Referral Bounty -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralBountyModeration(token.id, token.bountyModeration, token.addLinkReferralBountyModeration, token.descriptionBountyModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralBountyModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
                <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
                </a>        
<!-- telegram -->
                <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                </a>
<!-- twitter -->
                <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
                </a>
<!-- discord -->
                <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
                </a>
<!-- facebook -->
                <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
                </a>
<!-- instagram -->
                <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
                </a>
<!-- medium -->
                <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
                </a>
<!-- reddit -->
                <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                </a>
<!-- twitch -->
                <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
                </a>
<!-- youtube -->
                <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
                </a>
<!-- linkedin -->
                <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                </a>
<!-- github -->
                <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
                </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionBountyModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionBountyModeration }}</p>
            </q-card-section>   
    </q-card>

<!-- Events Testnet Moderator -->
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsTestnetModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Testnet Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkReferralTestnetModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Link Testnet:&nbsp;</span>
                    <a :href="`${token.addLinkReferralTestnetModeration}`" v-if="token.addLinkReferralTestnetModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkReferralTestnetModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkReferralTestnetModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Testnet Event:&nbsp;</span>
                {{ token.testnetModeration }}
            </q-card-section>
<!-- Button Public Link Referral Testnet -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralTestnetModeration(token.id, token.testnetModeration, token.addLinkReferralTestnetModeration, token.descriptionTestnetModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralTestnetModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
                <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
                </a>        
<!-- telegram -->
                <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                </a>
<!-- twitter -->
                <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
                </a>
<!-- discord -->
                <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
                </a>
<!-- facebook -->
                <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
                </a>
<!-- instagram -->
                <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
                </a>
<!-- medium -->
                <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
                </a>
<!-- reddit -->
                <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                </a>
<!-- twitch -->
                <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
                </a>
<!-- youtube -->
                <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
                </a>
<!-- linkedin -->
                <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                </a>
<!-- github -->
                <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
                </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionTestnetModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionTestnetModeration }}</p>
            </q-card-section>   
    </q-card>

<!-- Events Staking Moderator -->
    <q-card class="q-ma-md q-pa-sm" v-for="token in tokensEventsStakingModerator" :key="token.id">
        <h4 class="headerRed q-ma-sm q-px-lg">Event Staking Moderation</h4>
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
<!-- link -->
            <q-card-section v-if="token.addLinkStakingModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Referral Link Staking:&nbsp;</span>
                    <a :href="`${token.addLinkStakingModeration}`" v-if="token.addLinkStakingModeration" target="_blank" class="iconLinkWebsiteTextDecoration">
                        {{token.addLinkStakingModeration}}
                        <q-icon name="launch" color="primary" size="sm" />
                    </a>
            </q-card-section>
<!-- Event -->
            <q-card-section v-if="token.addLinkStakingModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Staking Event:&nbsp;</span>
                {{ token.stakingModeration }}
            </q-card-section>
<!-- Button Public Link Referral Staking -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="green"
                @click="publicAddLinkReferralStakingModeration(token.id, token.stakingModeration, token.addLinkStakingModeration, token.descriptionStakingModeration)"
                >Public</q-btn>
            </div>
        </q-card-section>
<!-- Button Delete -->
        <q-card-section>
            <div style="display: inline">
                <q-btn
                class="button-margin"
                color="primary"
                @click="deleteLinkReferralStakingModeration(token.id)"
                >Delete</q-btn>
            </div>
        </q-card-section>
        </div>

        <q-card-section class="q-ma-md q-pa-md row flex">
<!-- website -->
                <a class="linkButtonDisplayBlock" v-if="token.website" :href="`${token.website}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fas fa-globe" label="Website" />
                </a>        
<!-- telegram -->
                <a class="linkButtonDisplayBlock" v-if="token.telegram" :href="`${token.telegram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-telegram-plane" label="Telegram" />
                </a>
<!-- twitter -->
                <a class="linkButtonDisplayBlock" v-if="token.twitter" :href="`${token.twitter}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitter" label="Twitter" />
                </a>
<!-- discord -->
                <a class="linkButtonDisplayBlock" v-if="token.discord" :href="`${token.discord}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-discord" label="Discord" />
                </a>
<!-- facebook -->
                <a class="linkButtonDisplayBlock" v-if="token.facebook" :href="`${token.facebook}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-facebook-f" label="Facebook" />
                </a>
<!-- instagram -->
                <a class="linkButtonDisplayBlock" v-if="token.instagram" :href="`${token.instagram}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-instagram" label="Instagram" />
                </a>
<!-- medium -->
                <a class="linkButtonDisplayBlock" v-if="token.medium" :href="`${token.medium}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-medium-m" label="Medium" />
                </a>
<!-- reddit -->
                <a class="linkButtonDisplayBlock" v-if="token.reddit" :href="`${token.reddit}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-reddit-alien" label="Reddit" />
                </a>
<!-- twitch -->
                <a class="linkButtonDisplayBlock" v-if="token.twitch" :href="`${token.twitch}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-twitch" label="Twitch" />
                </a>
<!-- youtube -->
                <a class="linkButtonDisplayBlock" v-if="token.youtube" :href="`${token.youtube}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-youtube" label="Youtube" />
                </a>
<!-- linkedin -->
                <a class="linkButtonDisplayBlock" v-if="token.linkedin" :href="`${token.linkedin}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-linkedin-in" label="Linkedin" />
                </a>
<!-- github -->
                <a class="linkButtonDisplayBlock" v-if="token.github" :href="`${token.github}`" target="_blank" rel="nofollow">
                    <q-btn class="q-mx-sm q-my-md" color="primary" icon="fab fa-github-alt" label="Github" />
                </a>
        </q-card-section>
<!-- Description -->
            <q-card-section v-if="token.descriptionStakingModeration" class="box-shadow q-pa-md q-ma-sm">
                <span class="bold">Description:&nbsp;</span>
                <p>{{ token.descriptionStakingModeration }}</p>
            </q-card-section>   
    </q-card>
</div>
</template>

<script>
import { getDatabase, ref, onValue, update} from "firebase/database";


export default {
    
  data () {
    return {
      tokens: [],
      addTokenTime: Date.now(),
    }
  },
  methods: {
    loadToken() {
        const db = getDatabase()
        const tokensRef = ref(db, 'token/')
        onValue(tokensRef, (snapshot) => {
        const data = snapshot.val()
        this.tokens = Object.keys(data).map(key => {
                return {
                    id: key,
                    ...data[key]
                }
            })
        })
    },
    publicAddLinkReferralTokenModeration(id, referralTokenModeration, addLinkReferralTokenModeration, descriptionReferralTokenModeration) {
        
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            referralToken: referralTokenModeration,
            referralTokenModeration: '',
            addLinkReferralToken : addLinkReferralTokenModeration,
            descriptionReferralTokenModeration: '',
            descriptionReferralToken: descriptionReferralTokenModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralTokenModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            referralTokenModeration: '',
            descriptionReferralTokenModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Whitelist referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicAddLinkReferralWhitelistModeration(id, whiteListModeration, addLinkReferralWhitelistModeration, descriptionWhiteListModeration) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            whiteList: whiteListModeration,
            whiteListModeration: '',
            addLinkReferralWhitelist : addLinkReferralWhitelistModeration,
            descriptionWhiteListModeration: '',
            descriptionWhitelist: descriptionWhiteListModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Whitelist referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralWhitelistModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            whiteListModeration: '',
            descriptionWhiteListModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Whitelist referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicAddLinkReferralAirdropModeration(id, airdropModeration, addLinkReferralAirdropModeration, descriptionAirdropModeration) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            airdrop: airdropModeration,
            airdropModeration: '',
            addLinkReferralAirdrop : addLinkReferralAirdropModeration,
            descriptionAirdropModeration: '',
            descriptionAirdrop: descriptionAirdropModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Airdrop referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralAirdropModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            airdropModeration: '',
            descriptionAirdropModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Airdrop referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicAddLinkReferralBountyModeration(id, bountyModeration, addLinkReferralBountyModeration, descriptionBountyModeration) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            bounty: bountyModeration,
            bountyModeration: '',
            addLinkReferralBounty : addLinkReferralBountyModeration,
            descriptionBountyModeration: '',
            descriptionBounty: descriptionBountyModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Bounty referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralBountyModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            bountyModeration: '',
            descriptionBountyModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Bounty referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicAddLinkReferralTestnetModeration(id, testnetModeration, addLinkReferralTestnetModeration, descriptionTestnetModeration) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            testnet: testnetModeration,
            testnetModeration: '',
            addLinkReferralTestnet : addLinkReferralTestnetModeration,
            descriptionTestnetModeration: '',
            descriptionTestnet: descriptionTestnetModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Testnet referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralTestnetModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            testnetModeration: '',
            descriptionTestnetModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Testnet referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    publicAddLinkReferralStakingModeration(id, stakingModeration, addLinkStakingModeration, descriptionStakingModeration) {
        
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            staking: stakingModeration,
            stakingModeration: 0,
            addLinkStaking : addLinkStakingModeration,
            descriptionStakingModeration: '',
            descriptionStaking: descriptionStakingModeration,
            addTokenTime: this.addTokenTime
        })
        .then(() => {
            this.$q.notify({message: `Staking referral link published`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
    deleteLinkReferralStakingModeration(id) {
        const db = getDatabase()
        update(ref(db, "token/" + id), {
            stakingModeration: 0,
            descriptionStakingModeration: '',
        })
        .then(() => {
            this.$q.notify({message: `Staking referral link deleted`, color: 'green'}) 
        })
        .catch((error) => {
            this.$q.notify({message: `${error}`, color: 'red'}) 
        })
    },
  },
  computed: {
    tokensEventsReferralTokenModerator() {
        return this.tokens.filter(token => token.referralTokenModeration == 'fixed' || token.referralTokenModeration == 'percent')
    },
    tokensEventsWitelistModerator() {
        return this.tokens.filter(token => token.whiteListModeration == 'NFT' || token.whiteListModeration == 'TOKEN')
    },
    tokensEventsAirdropModerator() {
        return this.tokens.filter(token => token.airdropModeration == 'NFT' || token.airdropModeration == 'TOKEN')
    },
    tokensEventsBountyModerator() {
        return this.tokens.filter(token => token.bountyModeration == 'FREE' || token.bountyModeration == 'AMBASSADOR' || token.bountyModeration == 'ALLOCATION')
    },
    tokensEventsTestnetModerator() {
        return this.tokens.filter(token => token.testnetModeration == 'NODE' || token.testnetModeration == 'CHAIN' || token.testnetModeration == 'SWAP' || token.testnetModeration == 'GAME' || token.testnetModeration == 'APP' || token.testnetModeration == 'SITE' || token.testnetModeration == 'OTHER')
    },
    tokensEventsStakingModerator() {
        return this.tokens.filter(token => token.stakingModeration !== 0 && token.stakingModeration !== undefined)
    },
  },
  mounted() {
    this.loadToken()
  }
}
</script>

<style scoped lang="sass">
.box-shadow 
    box-shadow: 0 1px 5px rgb(0 0 0 / 20%), 0 2px 2px rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 12%)
    border-radius: 4px
    vertical-align: top
    background: #fff
    position: relative
</style>