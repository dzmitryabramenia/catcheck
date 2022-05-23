<template>
    <div class="flex flex-center bg-primary">
    <!-- Add Trainee -->
        <q-card v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
        class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Add Trainee</h5>
                </div>
            
            <q-form
            @submit="onSubmitAddTrainee"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="addTrainee"
                label="Email"
                hint="Add Trainee"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    <!-- Add Moderator -->
        <q-card v-if="$store.getters.role == 'Admin' || $store.getters.role == 'Founder'" class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Add Moderator</h5>
                </div>
            
            <q-form
            @submit="onSubmitAddModerator"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="addModerator"
                label="Email"
                hint="Add Moderator"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    <!-- Add Admin -->
        <q-card v-if="$store.getters.role == 'Founder'"
        class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Add Admin</h5>
                </div>
            
            <q-form
            @submit="onSubmitAddAdmin"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="addAdmin"
                label="Email"
                hint="Add Admin"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    <!-- Add Founder -->
        <q-card v-if="$store.getters.role == 'Founder'"
        class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Add Founder</h5>
                </div>
            
            <q-form
            @submit="onSubmitAddFounder"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="addFounder"
                label="Email"
                hint="Add Founder"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    <!-- Add Owner Token -->
        <q-card v-if="$store.getters.role == 'Moderator' || $store.getters.role == 'Admin' || $store.getters.role == 'Founder'"
            class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Add Owner Token</h5>
                </div>
            
            <q-form
            @submit="onSubmitAddOwnerToken"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="addOwnerToken"
                label="Email"
                hint="Add Owner Token"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    <!-- Add Delete Employee -->
        <q-card v-if="$store.getters.role == 'Founder'"
        class="q-ma-md widthBlockAddRole">
            <div class="q-pa-md">
                <div class="q-pa-sm">
                    <h5 class="q-ma-sm">Delete Employee</h5>
                </div>
            
            <q-form
            @submit="onSubmitDeleteEmployeer"
            @reset="onReset"
            class="q-gutter-md"
            >
            <q-input
                filled
                v-model="deleteEmployeer"
                label="Email"
                hint="Delete Employee"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
            />

            <div>
                <q-btn label="Submit" type="submit" color="primary"/>
                <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
            </q-form>
            </div>
        </q-card>
    </div>
</template>

<script>
import { getFunctions, httpsCallable } from "firebase/functions";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getStorage, ref as storageReference, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { getDatabase, ref, onValue, set, update, remove} from "firebase/database";

export default {
  data () {
    return {
      addTrainee: null,
      addAdmin: null,
      addModerator: null,
      addFounder: null,
      addOwnerToken: null,
      deleteEmployeer: null,
    }
  },
  methods: {
    onSubmitAddTrainee () {
        const functions = getFunctions();
        const addTraineeRole = httpsCallable(functions, 'addTraineeRole')
        addTraineeRole({ email: this.addTrainee }).then(result => {
            console.log(result)
            this.$q.notify({message: `Success! ${this.addTrainee} has been made an Trainee`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onSubmitAddAdmin () {
        const functions = getFunctions();
        const addAdminRole = httpsCallable(functions, 'addAdminRole')
        addAdminRole({ email: this.addAdmin }).then(result => {
            this.$q.notify({message: `Success! ${this.addAdmin} has been made an Admin`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onSubmitAddModerator () {
        const functions = getFunctions();
        const addModeratorRole = httpsCallable(functions, 'addModeratorRole')
        addModeratorRole({ email: this.addModerator }).then(result => {
            this.$q.notify({message: `Success! ${this.addModerator} has been made an Moderator`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onSubmitAddFounder () {
        const functions = getFunctions();
        const addFounderRole = httpsCallable(functions, 'addFounderRole')
        addFounderRole({ email: this.addFounder }).then(result => {
            this.$q.notify({message: `Success! ${this.addFounder} has been made an Founder`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onSubmitAddOwnerToken () {
        const functions = getFunctions();
        const addOwnerTokenRole = httpsCallable(functions, 'addOwnerTokenRole')
        addOwnerTokenRole({ email: this.addOwnerToken }).then(result => {
            this.$q.notify({message: `Success! ${this.addOwnerToken} has been made an Owner Token`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onSubmitDeleteEmployeer () {
        const functions = getFunctions();
        const deleteEmployeer = httpsCallable(functions, 'deleteEmployeer')
        deleteEmployeer({ email: this.deleteEmployeer }).then(result => {
            this.$q.notify({message: `Success! ${this.deleteEmployeer} has been made an Delete Employeer`, color: 'green'}) 
        }).catch(err => {
        return err
        })
    },
    onReset () {
        this.addTrainee = null,
        this.addAdmin = null,
        this.addModerator = null,
        this.addFounder = null,
        this.addOwnerToken = null,
        this.deleteEmployeer = null
    }
  }
}
</script>

<style scoped lang="sass">


.widthBlockAddRole
    width: 400px

</style>