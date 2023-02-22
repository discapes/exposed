<script lang="ts">
	import { GithubAuthProvider, signInWithRedirect } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';

	const provider = new GithubAuthProvider();
</script>

<button on:click={() => signInWithRedirect(auth, provider)}>Sign in with GitHub</button>
