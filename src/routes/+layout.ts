import { userPromise } from '$lib/firebase.client';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = () => {
	return {
		user: userPromise
	};
};
