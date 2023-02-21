import { initializeApp, cert } from 'firebase-admin/app';
import { Firestore, getFirestore } from 'firebase-admin/firestore';
import { Auth, getAuth } from 'firebase-admin/auth';
import { SERVICE_ACCOUNT_EMAIL, SERVICE_ACCOUNT_KEY } from '$env/static/private';
import { building } from '$app/environment';

if (!building) {
	initializeApp(
		{
			credential: cert({
				projectId: 'so-me-22719',
				clientEmail: SERVICE_ACCOUNT_EMAIL,
				privateKey: SERVICE_ACCOUNT_KEY
			})
		},
		'so-me'
	);
}

export const db: Firestore = <Firestore>(!building && getFirestore());
export const auth: Auth = <Auth>(!building && getAuth());
