<script lang="ts">
	import { db } from '$lib/firebase.client';
	import { randomQuestion } from '$lib/questions';
	import { arrayUnion, doc, increment, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

	let game: {
		players: string[];
	};
	let admin: boolean;
	let answered = false;

	$: if (
		admin &&
		game.votes &&
		Object.values(game.votes).reduce((prev, curr) => prev + curr, 0) == game.players.length
	) {
		updateDoc(doc(db, 'games/' + game.num), {
			active: false
		});
	}

	$: if (game && !game.active) answered = false;

	function createGame() {
		const username = prompt('Your name?');
		if (!username?.length) return;
		const num = Math.floor(Math.random() * 9999);
		onSnapshot(doc(db, 'games/' + num), (obj) => {
			game = obj.data();
			admin = true;
		});
		setDoc(doc(db, 'games/' + num), {
			players: [username],
			num
		});
	}
	function joinGame() {
		const num = +prompt('Game number?')!;
		const username = prompt('Your name?')!;
		if (isNaN(num) || !username.length) return;
		onSnapshot(doc(db, 'games/' + num), (obj) => {
			game = obj.data();
		});
		updateDoc(doc(db, 'games/' + num), {
			players: arrayUnion(username)
		});
	}
	function startGame() {
		updateDoc(doc(db, 'games/' + game.num), {
			active: true,
			question: randomQuestion(),
			votes: null
		});
	}
	function vote(thing: string) {
		updateDoc(doc(db, 'games/' + game.num), {
			['votes.' + thing]: increment(1)
		});
		answered = true;
	}
</script>

<div class="grow flex flex-col justify-center items-center gap-5 p-5">
	{#if game}
		<span>Game code is {game.num}</span>
		<span
			>Players: {game.players.length > 1
				? game.players.slice(0, -1).join(', ') + ' and ' + game.players.at(-1)
				: game.players[0]}</span
		>
		{#if game.active}
			<span>Q: {game.question}</span>
			{#if answered}
				<span>Answered...</span>
			{:else}
				{#each game.players as player}
					<button on:click={() => vote(player)}>Vote {player}</button>
				{/each}
			{/if}
		{:else if game.votes}
			<span>Q: {game.question}</span>
			<span>Answers:</span>
			<pre>{JSON.stringify(game.votes, null, 2)}</pre>
		{:else}
			Waiting for game to start...
		{/if}

		{#if admin}
			{#if !game.active}
				<button on:click={startGame}>{game.votes ? 'Next question' : 'Start game'}</button>
			{/if}
		{/if}
	{:else}
		<button on:click={createGame}>Create game</button>
		<button on:click={joinGame}>Join game</button>
	{/if}
</div>
