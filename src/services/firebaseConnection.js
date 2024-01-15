import { initiaLizeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBAcPqmqdQu2AZzd1pedg-xgs65e9b3iRU",
    authDomain: "tktsch-c7279.firebaseapp.com",
    projectId: "tktsch-c7279",
    storageBucket: "tktsch-c7279.appspot.com",
    messagingSenderId: "141441690586",
    appId: "1:141441690586:web:9c1e5effedd2875f0b6ee3",
    measurementId: "G-JEXZ47BKNX"
};

const firebaseApp = initiaLizeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };