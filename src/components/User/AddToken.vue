<template>
  <div class="q-pa-md">
    <div class="q-gutter-md ">
      <q-card class="shadow">
      <h4 class="q-pt-lg q-pl-lg q-my-md">Add Token</h4>
        <q-form
        @submit="downImage"
        class="q-gutter-md row flex flex-center" style="min-width: 300px"
        >
<!-- name -->
        <q-input
            class="minWidthInput"
            filled
            type="text"
            v-model="name"
            label="Name"
            hint="Token Name"
            :rules="[val => (!!val && /^[?!,.a-zA-Z0-9\s]+$/.test(val)) || 'Field is required latin characters']"
        >
          <template v-slot:append>
            <q-icon name="fas fa-user" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- symbol -->
        <q-input
            class="minWidthInput"
            filled
            type="text"
            v-model="symbol"
            label="Symbol"
            hint="Token Symbol"
            :rules="[val => (!!val && /^[?!,.a-zA-Z0-9\s]+$/.test(val)) || 'Field is required latin characters']"
        >
          <template v-slot:append>
            <q-icon name="fas fa-font" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- website -->
        <q-input
            class="minWidthInput"
            filled
            type="website"
            v-model="website"
            label="Site"
            hint="Site URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fas fa-globe" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- telegram -->
        <q-input
            class="minWidthInput"
            filled
            type="telegram"
            v-model="telegram"
            label="Telegram"
            hint="Telegram URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-telegram-plane" style="font-size: 1.1em;" color="primary" />
          </template>
        </q-input>
<!-- twitter -->
        <q-input
            class="minWidthInput"
            filled
            type="twitter"
            v-model="twitter"
            label="https://twitter.com/name"
            hint="Twitter URL https://..."
            :rules="[value => value.length == 0 || value.includes('https://twitter.com/') || value.includes('http://twitter.com/') || 'Must contain https://twitter.com/...']"
        >
          <template v-slot:append>
            <q-icon name="fab fa-twitter" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- discord -->
        <q-input
            class="minWidthInput"
            filled
            type="discord"
            v-model="discord"
            label="Discord"
            hint="Discord URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-discord" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- youtube -->
        <q-input
            class="minWidthInput"
            filled
            type="youtube"
            v-model="youtube"
            label="YouTube"
            hint="YouTube URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-youtube" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- twitch -->
        <q-input
            class="minWidthInput"
            filled
            type="twitch"
            v-model="twitch"
            label="Twitch"
            hint="Twitch URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-twitch" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- facebook -->
        <q-input
            class="minWidthInput"
            filled
            type="facebook"
            v-model="facebook"
            label="Facebook"
            hint="Facebook URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-facebook-square" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- instagram -->
        <q-input
            class="minWidthInput"
            filled
            type="instagram"
            v-model="instagram"
            label="Instagram"
            hint="Instagram URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-instagram-square" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- linkedin -->
        <q-input
            class="minWidthInput"
            filled
            type="linkedin"
            v-model="linkedin"
            label="Linkedin"
            hint="Linkedin URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-linkedin-in" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- github -->
        <q-input
            class="minWidthInput"
            filled
            type="github"
            v-model="github"
            label="Github"
            hint="Github URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-github-alt" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- reddit -->
        <q-input
            class="minWidthInput"
            filled
            type="reddit"
            v-model="reddit"
            label="Reddit"
            hint="Reddit URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-reddit-alien" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- medium -->
        <q-input
            class="minWidthInput"
            filled
            type="medium"
            v-model="medium"
            label="Medium"
            hint="Medium URL https://..."
        >
          <template v-slot:append>
            <q-icon name="fab fa-medium-m" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- address -->
        <q-input
            class="minWidthInput"
            filled
            type="text"
            v-model="address"
            label="Address"
            hint="Token Address"
        >
          <template v-slot:append>
            <q-icon name="fas fa-map-marker-alt" style="font-size: 1em;" color="primary" />
          </template>
        </q-input>
<!-- file -->
        <q-file
          class="minWidthInput"
          @change="convertImage"
          v-model="file"
          filled bottom-slots
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
            <span class="textColorObligatoryField">* obligatory field</span>
          </template>
        </q-file>

        <img
        v-if="imageUrl"
        loading="lazy"
        style="height: 50px; width: 50px"
        spinner-color="grey-4"
        :src="`${imageUrl}`"
        />
<!-- Launch -->
        <q-input
            class="minWidthInput"
            v-model="dateLaunch"
            filled
            type="date"
            hint="Token Launch"
        />
<!-- Referral Token -->
        <q-select
            class="minWidthInput"
            v-model="referralToken"
            :options="['NoN', 'fixed', 'percent']"
            hint="Referral Token"
        />
<!-- WhiteList -->
        <q-select
            class="minWidthInput"
            v-model="whiteList"
            :options="['NoN', 'TOKEN', 'NFT']"
            hint="WhiteList"
        />
<!-- Airdrop -->
        <q-select
            class="minWidthInput"
            v-model="airdrop"
            :options="['NoN','TOKEN', 'NFT']"
            hint="AirDrop"
        />
<!-- Bounty -->
        <q-select
            class="minWidthInput"
            v-model="bounty"
            :options="['NoN','FREE', 'AMBASSADOR', 'ALLOCATION']"
            hint="Bounty"
        />
<!-- selectToken -->
        <q-select 
            class="minWidthInput"
            v-model="selectToken"
            hint="Token Chain"
            :options="['BSC', 'ETH', 'Solana', 'Polkadot', 'Avalanche', 'Terra', 'Tron', 'Fantom', 'Heco', 'MATIC', 'other']"
        />
<!-- selectTestnet -->
        <q-select 
            class="minWidthInput"
            v-model="selectTestnet"
            hint="Testnet"
            :options="['NoN', 'NODE', 'CHAIN', 'SWAP', 'GAME', 'APP', 'SITE', 'OTHER']"
        />
<!-- category -->
        <q-select
            class="minWidthInput"
            v-model="category"
            hint="Token Category"
            :options="['game', 'DEFI', 'NFT', 'gambling', 'exchanges', 'marketplaces', 'social', 'launchpad', 'chain', 'multi', 'other']"
        />
<!-- staking -->
        <q-input
          class="widthStaking q-my-md"
          v-model="staking"
          filled

          hint="Integers and floating point numbers (separator point, e.g. 5.5)"
          label="Staking percentage"
          :rules="[val => (/^[.0-9\s]+$/.test(val)) || 'Integers and floating point numbers (separator point, e.g. 5.5)']"
        />
<!-- textarea -->
        <q-input
          class="widthTextarea q-my-md"
          v-model="text"
          filled
          type="textarea"
          hint="Token Description"
          label="Description"
          :rules="[val => !!val || 'Only in Latin letters']"
        />

      <q-card class="q-ma-md" v-if="!($store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder' || $store.getters.role == 'Trainee')">
        <div class="q-pa-md">
            <p>Do you own the token and want to add a Bounty / Airdrop / WhiteList event?</p>
        </div>
        <q-toggle
        v-model="toggleOwnerToken"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        />
        {{ toggleOwnerToken ? 'Yes' : 'No' }}
        <div class="q-ma-md" v-if="toggleOwnerToken" style="max-width: 500px">
          <div class="q-pa-sm">Confirm that you are the owner of the token.
            Submit the post on your official twitter:</div>
          <q-card class="q-pa-md q-ma-md">
            <div>We have posted our token on the site https://catcheck/#{{ name.toLowerCase().trim().replace(/[^a-z0-9]/g,'')}} #catcheck
            </div>
          </q-card>
          <q-input
            style="max-width: 500px"
            class="q-ma-md"
            color="grey-3"
            label-color="primary"
            outlined
            v-model="linkPostTwitterOwnerToken"
            label="Add link to post"
          >
            <template v-slot:append>
              <q-icon name="fab fa-twitter" color="primary" />
            </template>
          </q-input>
        </div>
      </q-card>

      <q-card class="q-ma-md">
        <div class="q-pa-md">
            <p>Bounty / Airdrop / WhiteList are already passing! Do you want to add your referral link?</p>
        </div>
        <q-toggle
        v-model="toggleEnterYouLink"
        checked-icon="check"
        color="primary"
        unchecked-icon="clear"
        />
        {{ toggleEnterYouLink ? 'Yes' : 'No' }}
        <div class="q-ma-md" v-if="toggleEnterYouLink" style="max-width: 500px">

          <div v-if="referralToken !== 'NoN'">
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              color="white"
              label-color="primary"
              outlined
              v-model="addLinkReferralToken"
              label="Add link to Referral"
            >
              <template v-slot:append>
                <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
              </template>
            </q-input>

            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionReferralToken"
              outlined
              type="textarea"
              hint="Description Referral"
              label="Description Referral"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>

          <p v-else>To add a referral token link, select the referral category. Currently NoN</p>

          <div v-if="bounty !== 'NoN'">
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              color="white"
              label-color="primary"
              outlined
              v-model="addLinkReferralBounty"
              label="Add link to Bounty"
            >
              <template v-slot:append>
                <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
              </template>
            </q-input>

            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionBounty"
              outlined
              type="textarea"
              hint="Description Bounty"
              label="Description Bounty"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>

          <p v-else>To add a Bounty referral link, select the Bounty category. Currently NoN</p>

          <div v-if="airdrop !== 'NoN'">
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              color="grey-3"
              label-color="primary"
              outlined
              v-model="addLinkReferralAirdrop"
              label="Add link to AirDrop"
            >
              <template v-slot:append>
                <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
              </template>
            </q-input>
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionAirdrop"
              outlined
              type="textarea"
              hint="Description AirDrop"
              label="Description AirDrop"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>
          <p v-else>To add a Airdrop referral link, select the Airdrop category. Currently NoN</p>

          <div v-if="whiteList !== 'NoN'">
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              color="grey-3"
              label-color="primary"
              outlined
              v-model="addLinkReferralWhitelist"
              label="Add link to WhiteList"
            >
              <template v-slot:append>
                <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
              </template>
            </q-input>
            <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionWhitelist"
              outlined
              type="textarea"
              hint="Description WhiteList"
              label="Description WhiteList"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>
          <p v-else>To add a WhiteList referral link, select the WhiteList category. Currently NoN</p>

          <div v-if="selectTestnet !== 'NoN'">
          <q-input
            style="max-width: 500px"
            class="q-ma-md"
            color="grey-3"
            label-color="primary"
            outlined
            v-model="addLinkReferralTestnet"
            label="Add link to Testnet"
          >
            <template v-slot:append>
              <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
            </template>
          </q-input>
          <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionTestnet"
              outlined
              type="textarea"
              hint="Description Testnet"
              label="Description Testnet"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>
          <p v-else>To add a Testnet referral link, select the Testnet category. Currently NoN</p>

          <div v-if="staking > 0">
          <q-input
            style="max-width: 500px"
            class="q-ma-md"
            color="grey-3"
            label-color="primary"
            outlined
            v-model="addLinkStaking"
            label="Add link to Staking"
          >
            <template v-slot:append>
              <q-icon name="fas fa-link" color="primary" style="font-size: 0.8em;"/>
            </template>
          </q-input>
          <q-input
              style="max-width: 500px"
              class="q-ma-md"
              v-model="descriptionStaking"
              outlined
              type="textarea"
              hint="Description Staking"
              label="Description Staking"
              :rules="[val => !!val || 'Only in Latin letters']"
            />
          </div>
          <p v-else>To add a Staking referral link. Currently 0</p>
        </div>
      </q-card>

        <div class="minWidthInput q-pa-md">
            <q-btn 
            label="Submit" 
            type="submit" 
            icon-right="send" 
            color="primary"
            :loading="submitting"
            :disable=" name == '' || symbol == '' || file == null || (staking == 0 ? false : !(/^[.0-9\s]+$/.test(staking)))  || disableButton" />
      <!-- <q-btn 
            label="Submit" 
            type="submit" 
            icon-right="send" 
            color="primary"
            :loading="submitting"
            :disable="(name == '' 
            || symbol == '' 
            || file == null 
            || 
              (
              text == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(text))) 
              || (descriptionReferralToken == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(descriptionReferralToken)))
              || (descriptionBounty == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(descriptionBounty)))
              || (descriptionAirdrop == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(descriptionAirdrop)))
              || (descriptionWhitelist == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(descriptionWhitelist)))
              || (descriptionTestnet == '' ? false : !(/^[?!,.a-zA-Z0-9\s]+$/.test(descriptionTestnet)))
              ) 
            || disableButton"
            /> -->
        </div>

        
        </q-form>
      </q-card>
    </div>
</div>

</template>



<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDatabase, set, ref as databaseRef } from "firebase/database"
import { getStorage, uploadBytesResumable, ref, getDownloadURL } from "firebase/storage"



export default {

  data() {
    return {
        id: '',
        name: '',
        symbol: '',
        img: '',
        file: null,
        votes: 0,
        address: '',
        airdrop: 'NoN',
        bounty: 'NoN',
        tokens: [],
        chain: '',
        selectToken: 'BSC',
        selectTestnet: 'NoN',
        addTokenTime: Date.now(),
        referralToken: 'NoN',
        whiteList: 'NoN',
        category: 'game',
        website: '',
        telegram: '',
        twitter: '',
        discord: '',
        youtube: '',
        twitch: '',
        facebook: '',
        instagram: '',
        linkedin: '',
        github: '',
        reddit: '',
        medium: '',
        text: '',
        date: '',
        dateLaunch: '',
        ownerToken: this.$store.getters.uid,
        public: false,
        toggleOwnerToken: false,
        toggleEnterYouLink: false,
        linkPostTwitterOwnerToken: '',
        tokenPublishedUser: this.$store.getters.uid,
        addLinkReferralToken: '',
        addLinkReferralBounty: '',
        addLinkReferralAirdrop: '',
        addLinkReferralWhitelist: '',
        addLinkReferralTestnet: '',
        addLinkStaking: '',
        submitting: false,
        disableButton: false,
        descriptionReferralToken: '',
        descriptionBounty: '',
        descriptionAirdrop: '',
        descriptionWhitelist: '',
        descriptionTestnet: '',
        descriptionStaking: '',
        imageUrl: '',
        staking: 0
      }
    },
      
  methods: {
    twitterCheckURL() {
      const functions = getFunctions()
      const twitterCheckURL = httpsCallable(functions,'twitterCheckURL')
      twitterCheckURL(this.twitter).then(result => {
        console.log("result", result)
        console.log("result.data.data", result.data.data)
        console.log("result.data.data.id", result.data.data.id)
        console.log("result.data.data.name", result.data.data.name)
        this.twitterId = result.data.data.id
        this.createToken()
      }).catch(err => {
        this.$q.notify({message: `Invalid twitter link ${this.twitter}`, color: 'red'})
        this.submitting = false
        this.disableButton = false
        return err
      })
    },
    convertImage(e) {
            
      const width = 50;
      const height = 50;
      const fileName = this.name;
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
            })
          this.file = fileImg
          this.imageUrl = reader.result
          }, 'image/webp', 1);
        }
        reader.onerror = error => console.log(error)
      }  
    },
    downImage() {
      this.submitting = true
      this.disableButton = true
      const storage = getStorage();

      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'imagesToken/' + this.name.toLowerCase().trim().replace(/[^a-z0-9]/g,'') + '.webp');
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
          }).then(() => {
            if(this.twitter !== '') {
              this.twitterCheckURL()
            } else {
              this.createToken()
            }
          })
        }
      )     
    },
    async createToken() {
      if(this.$store.getters.role == 'Moderator' || this.$store.getters.role == 'Admin' || this.$store.getters.role == 'Founder') {
          try {
            let dataLaunchTimestamp = ''
            if(this.dateLaunch == '') {
              dataLaunchTimestamp = 'NoN'
            } else {
              dataLaunchTimestamp = Date.parse(this.dateLaunch)
            }
            const response = await fetch('https://catcheckorg-34caf-default-rtdb.firebaseio.com/token.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              symbol: this.symbol,
              imgUrl: this.img,
              votes: this.votes,
              address: this.address,
              airdrop: this.airdrop,
              bounty: this.bounty,
              chain: this.selectToken,
              addTokenTime: this.addTokenTime,
              category: this.category,
              website: this.website,
              telegram: this.telegram,
              twitter: {twitterLink: this.twitter, twitterId: this.twitterId},
              discord: this.discord,
              youtube: this.youtube,
              twitch: this.twitch,
              facebook: this.facebook,
              instagram: this.instagram,
              linkedin: this.linkedin,
              github: this.github,
              reddit: this.reddit,
              medium: this.medium,
              text: this.text,
              dateLaunch: dataLaunchTimestamp,
              whiteList: this.whiteList,
              tokenPublishedUser: this.tokenPublishedUser,
              public: true,
              addLinkReferralToken: this.addLinkReferralToken,
              addLinkReferralBounty: this.addLinkReferralBounty,
              addLinkReferralAirdrop: this.addLinkReferralAirdrop,
              addLinkReferralWhitelist: this.addLinkReferralWhitelist,
              addLinkReferralTestnet: this.addLinkReferralTestnet,
              testnet: this.selectTestnet,
              topEvents: "",
              descriptionReferralToken: this.descriptionReferralToken,
              descriptionBounty: this.descriptionBounty,
              descriptionAirdrop: this.descriptionAirdrop,
              descriptionWhitelist: this.descriptionWhitelist,
              descriptionTestnet: this.descriptionTestnet,
              referralToken: this.referralToken,
              staking: this.staking
              
            })
          })
          const firebaseData = await response.json()
          this.tokens.push({
            id: firebaseData.name,
            name: this.name,
            symbol: this.name,
            text: this.name
          });

          const db = getDatabase();
            set(databaseRef(db, 'users/' + this.tokenPublishedUser + '/votes/' + firebaseData.name), {
              value: 100,
              time: Date.now() - 86400000
            }).then(() => {
              this.name = ""
              this.symbol = ""
              this.img = ""
              this.file = null
              this.votes = ""
              this.address = ""
              this.airdrop = 'NoN'
              this.bounty = 'NoN'
              this.selectToken = 'BSC'
              this.addTokenTime = ""
              this.category = "game"
              this.website = ""
              this.telegram = ""
              this.twitter = ""
              this.discord = ""
              this.youtube = ""
              this.twitch = ""
              this.facebook = ""
              this.instagram = ""
              this.linkedin = ""
              this.github = ""
              this.reddit = ""
              this.medium = ""
              this.text = ""
              this.dateLaunch = ""
              this.whiteList = "NoN"
              this.tokenPublishedUser = ""
              this.addLinkReferralBounty = ""
              this.addLinkReferralAirdrop = ""
              this.addLinkReferralWhitelist = ""
              this.addLinkReferralTestnet = ""
              this.selectTestnet = "NoN"
              this.topEvents = ""
              this.descriptionBounty = ""
              this.descriptionAirdrop = ""
              this.descriptionWhitelist = ""
              this.descriptionTestnet = ""
              this.toggleEnterYouLink = false
              this.submitting = false
              this.disableButton = false,
              this.referralToken = "",
              this.staking = null
              this.$q.notify({message: `Thank you. Token ${this.name} has been published.`, color: 'green'})
            })
        } catch {
          this.submitting = false
          this.disableButton = false
          this.$q.notify({message: 'Sorry. An error has occurred.', color: 'red'})
        }
      } else {
        
          try {
              let dataLaunchTimestamp = ''
              if(this.dateLaunch == '') {
                dataLaunchTimestamp = 'NoN'
              } else {
                dataLaunchTimestamp = Date.parse(this.dateLaunch)
              }
            const response = await fetch('https://catcheckorg-34caf-default-rtdb.firebaseio.com/token.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              symbol: this.symbol,
              imgUrl: this.img,
              votes: this.votes,
              address: this.address,
              airdrop: this.airdrop,
              bounty: this.bounty,
              chain: this.selectToken,
              addTokenTime: this.addTokenTime,
              category: this.category,
              website: this.website,
              telegram: this.telegram,
              twitter: {twitterLink: this.twitter, twitterId: this.twitterId},
              discord: this.discord,
              youtube: this.youtube,
              twitch: this.twitch,
              facebook: this.facebook,
              instagram: this.instagram,
              linkedin: this.linkedin,
              github: this.github,
              reddit: this.reddit,
              medium: this.medium,
              text: this.text,
              testnet: this.selectTestnet,
              dateLaunch: dataLaunchTimestamp,
              whiteList: this.whiteList,
              ownerToken: this.ownerToken,
              linkPostTwitterOwnerToken: this.linkPostTwitterOwnerToken,
              tokenPublishedUser: this.tokenPublishedUser,
              public: false,
              addLinkReferralToken: this.addLinkReferralToken,
              addLinkReferralBounty: this.addLinkReferralBounty,
              addLinkReferralAirdrop: this.addLinkReferralAirdrop,
              addLinkReferralWhitelist: this.addLinkReferralWhitelist,
              addLinkReferralTestnet: this.addLinkReferralTestnet,
              topEvents: "",
              descriptionReferralToken: this.descriptionReferralToken,
              descriptionBounty: this.descriptionBounty,
              descriptionAirdrop: this.descriptionAirdrop,
              descriptionWhitelist: this.descriptionWhitelist,
              descriptionTestnet: this.descriptionTestnet,
              revision: 'check',
              referralToken: this.referralToken,
              staking: this.staking
            })
          })
          const firebaseData = await response.json()
          console.log('firebaseData User', firebaseData.name)
          this.tokens.push({
            id: firebaseData.name,
            name: this.name,
            symbol: this.name,
            text: this.name
          })

            const db = getDatabase();
            set(databaseRef(db, 'users/' + this.ownerToken + '/votes/' + firebaseData.name), {
              value: 50,
              time: Date.now()
            }).then(() => {
              this.name = ""
              this.symbol = ""
              this.img = ""
              this.file = null
              this.votes = ""
              this.address = ""
              this.airdrop = 'NoN'
              this.bounty = 'NoN'
              this.selectToken = 'BSC'
              this.addTokenTime = ""
              this.category = "game"
              this.website = ""
              this.telegram = ""
              this.twitter = ""
              this.discord = ""
              this.youtube = ""
              this.twitch = ""
              this.facebook = ""
              this.instagram = ""
              this.linkedin = ""
              this.github = ""
              this.reddit = ""
              this.medium = ""
              this.text = ""
              this.dateLaunch = ""
              this.whiteList = "NoN"
              this.tokenPublishedUser = ""
              this.addLinkReferralBounty = ""
              this.addLinkReferralAirdrop = ""
              this.addLinkReferralWhitelist = ""
              this.addLinkReferralTestnet = ""
              this.selectTestnet = "NoN"
              this.topEvents = ""
              this.descriptionBounty = ""
              this.descriptionAirdrop = ""
              this.descriptionWhitelist = ""
              this.descriptionTestnet = ""
              this.toggleOwnerToken = false
              this.submitting = false
              this.disableButton = false
              this.referralToken = ""
              this.staking = null
              this.$q.notify({message: 'Thank you. Your token has been sent for moderation and will be published soon.', color: 'green'})
              })
        } catch {
          this.submitting = false
          this.disableButton = false
          this.$q.notify({message: 'Sorry. An error has occurred.', color: 'red'})
        }
      }
    },
  }
}


</script>

<style scoped lang="sass">
.minWidthInput
  width: 300px

.widthTextarea
  width: 400px

.textColorObligatoryField
  color: red

.widthStaking
  width: 185px
</style>