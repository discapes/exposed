<script lang="ts">
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebase.client';
</script>

<button on:click={() => signOut(auth)}>Sign out</button>
