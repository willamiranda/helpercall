import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'



const firebaseConfig = {
    apiKey: "AIzaSyBAcPqmqdQu2AZzd1pedg-xgs65e9b3iRU",
    authDomain: "tktsch-c7279.firebaseapp.com",
    projectId: "tktsch-c7279",
    storageBucket: "tktsch-c7279.appspot.com",
    messagingSenderId: "141441690586",
    appId: "1:141441690586:web:9c1e5effedd2875f0b6ee3",
    measurementId: "G-JEXZ47BKNX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

//const firebaseApp = initiaLizeApp(firebaseConfig);

const auth = firebaseApp.auth()
const db = firebaseApp.firestore();
const storage = firebaseApp.storage();

export { auth, db, storage };
