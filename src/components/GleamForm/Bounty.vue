<template>


                <q-form
                @submit="writeBounty"
                class="q-gutter-md row flex flex-center" style="min-width: 300px"
                > 
                <div class="col-xs-12 col-sm-4">


                    <q-date v-model="startsBounty" subtitle="Starts Bounty"/>

                    
                    <q-date v-model="endsBounty" subtitle="Ends Bounty"/>

                 
                </div>
                <div class="col-xs-12 col-sm-4">

                      <q-input
                        class="minWidthInput"
                        filled
                        type="text"
                        v-model="name"
                        label="Name"
                        hint="Token Name"
                        :rules="[val => !!val || 'Field is required']"
                    />

                </div>
                <div class="col-xs-12 col-sm-4 q-px-lg bounty-max-width">

                      <q-input
                        class="minWidthInput"
                        filled
                        type="text"
                        v-model="name"
                        label="Name"
                        hint="Token Name"
                        :rules="[val => !!val || 'Field is required']"
                    />
                  
                </div>
                </q-form> 

</template>

<style scoped lang="sass">
.minWidthInput
  min-width: 300px


.twitterBlue
  color: rgb(29, 155, 240)

.facebookColor
  color: #4267B2

.youtubeRed
  color: #ff0000

</style>