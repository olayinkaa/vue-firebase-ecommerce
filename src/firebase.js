import firebase from '@firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-auth'
import 'firebase/storage'
  // Initialize Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAY0dYuSq7nxY0Bz0lL26Dw-3hpYoPVwsY",
    authDomain: "vuefire-ecommerce.firebaseapp.com",
    databaseURL: "https://vuefire-ecommerce.firebaseio.com",
    projectId: "vuefire-ecommerce",
    storageBucket: "",
    messagingSenderId: "767464492528",
    appId: "1:767464492528:web:5566365f32158f98"
  };
  
const fb = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {fb,db}