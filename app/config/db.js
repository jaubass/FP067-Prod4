import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCnToeV7j7Z8PQoJcY0NNBpG6hiB8GboIY",
    authDomain: "frontend-5088a.firebaseapp.com",
    projectId: "frontend-5088a",
    storageBucket: "frontend-5088a.appspot.com",
    messagingSenderId: "417204717894",
    appId: "1:417204717894:web:2c5f8e35bdc24eb13f3d47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);





// TEST
// https://stackoverflow.com/questions/71345649/how-to-use-ref-once-with-firebase-9
// Ver la respuesta: de Frank van Puffelen (https://stackoverflow.com/a/71345673)
// (Empleado de Google Cloud)
//     * Parece que `once` ya no es el método preferido.
//     * Hemos usado getDocs y mostrado lar respuesta por la consola de expo.

import { collection, getDocs } from "firebase/firestore"; // TEST
async function testDB() {
    console.log("TESTING DB");
    const querySnapshot = await getDocs(collection(db, "data"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().ciudad}`);
    });
    console.log("TESTING DB END");
}

testDB(); // TEST
