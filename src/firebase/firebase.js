import firebase from 'firebase';

let config = {
    apiKey: "AIzaSyAIYQGiQcSjZBw9LQ9LcR1yh8uDWtsMfgs",
    authDomain: "data-492da.firebaseapp.com",
    databaseURL: "https://data-492da.firebaseio.com",
    projectId: "data-492da",
    storageBucket: "data-492da.appspot.com",
    messagingSenderId: "381903672681",
    appId: "1:381903672681:web:813cffbc63da30d11f99f8",
    measurementId: "G-CD4W02BEZ7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
} else {
    firebase.app();
}

export default firebase;
