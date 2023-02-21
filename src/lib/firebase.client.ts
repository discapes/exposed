// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { writable } from 'svelte/store';
import type { ResolveFn } from 'vite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDxoFrPI7699sIjBGzl8Jp6pqluDTawm9k',
	authDomain: 'so-me-22719.firebaseapp.com',
	projectId: 'so-me-22719',
	storageBucket: 'so-me-22719.appspot.com',
	messagingSenderId: '497031276124',
	appId: '1:497031276124:web:397e7b188827788f892899',
	measurementId: 'G-VPYNL8GRHF'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const db = getFirestore(app);

export const auth = getAuth(app);
export const user = writable<User | null | undefined>(undefined); // undefined to mean loading (we can use ! in typescript)

let resolveUser: (value: User | null) => void;
export const userPromise = new Promise<User | null>((res) => (resolveUser = res));

onAuthStateChanged(auth, (newUser) => {
	// await reloadUserdata();
	user.set(newUser);
	resolveUser(newUser);
});

// export const userData = writable<UserData | null | undefined>(undefined);

// export async function reloadUserdata() {
// 	if (auth.currentUser) await getUserdata(auth.currentUser).then((data) => userData.set(data));
// 	else userData.set(null);
// }
