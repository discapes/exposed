<script lang="ts">
	import '../app.less';
</script>

<svelte:head>
	<title>Shoutbox</title>
</svelte:head>

<div class="min-h-screen min-w-full inline-flex flex-col text-stone-50">
	<main class="grow bg-stone-700 flex flex-col">
		<slot />
	</main>
	<div class="p-3 text-center bg-stone-800">
		©
		{new Date().getFullYear()}
		Miika Tuominen
	</div>
</div>
