import { auth } from './firebase.client';

export const rpc = async (path: string, args?: Record<string, any>) => {
	await fetch('/' + path, {
		method: 'POST',
		body: JSON.stringify({ authorization: await auth.currentUser?.getIdToken(), ...args })
	});
};

export function time(d: Date) {
	return (
		d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
	);
}
