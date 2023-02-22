<script lang="ts">
	import { user } from '$lib/firebase.client';
	import DeleteAccount from './DeleteAccount.svelte';
	import Login from './Login.svelte';
	import Logout from './Logout.svelte';
</script>

<div class="center flex flex-col gap-3">
	<h1>Account</h1>
	{#if $user}
		Logged in as
		<div class="flex gap-5">
			<img src={$user.photoURL} class="w-16 h-16 object-cover rounded-full" />
			<div class="flex flex-col">
				<div class="text-xl">{$user.displayName}</div>
				<div class="opacity-70">{$user.email}</div>
			</div>
		</div>
		<Logout />
		<DeleteAccount />
	{:else if $user === undefined}
		Loading user...
	{:else}
		<Login />
	{/if}
</div>

<style>
	.shoutbox {
		@apply flex flex-col gap-3;
	}
	.shoutbox p {
		@apply bg-stone-600 p-2;
	}
</style>
