import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
const firebaseConfig = { 
  apiKey : process.env.API_KEY_FIREBASE , 
  authDomain : process.env.AUTH_DOMAIN_FIREBASE , 
  databaseURL : process.env.DATA_BASE_URL_FIREBASE , 
  projectId : process.env.PROJECT_ID_FIREBASE , 
  storageBucket : process.env.STORAGE_BUCKET_FIREBASE , 
  messagingSenderId : process.env.MESSAGING_SENDER_ID_FIREBASE , 
  appId : process.env.APP_ID_FIREBASE , 
  measurementId : process.env.MEASUREMENT_ID_FIREBASE 
};
firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

export default firebase
