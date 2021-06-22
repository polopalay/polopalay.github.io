import firebase from './firebase';

const auth = firebase.auth();

export function onUserStateChange(action) {
    auth.onAuthStateChanged((user) => action(user));
}

export function loginWithGoogle(action) {
    let provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(rs => action(rs))
}

export function signOut(action) {
    auth.signOut().then(rs => action(rs))
}

