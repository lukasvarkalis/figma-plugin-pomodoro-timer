<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
  import { onDestroy } from 'svelte';

	const DEFAULT_TIME = 1500;

	$: state = 'idle';
	let interval, totalTime = DEFAULT_TIME;
	$: minutes = Math.floor(totalTime / 60);
	$: seconds = totalTime - 60 * minutes;

	function clearAppInterval() {
		if (interval) {
			clearInterval(interval);
		}
	}

	function handleClick() {
		if (state === 'idle') {
			state = 'started';

			interval = setInterval(() => {
				totalTime -= 1;
			}, 1000);
		} else if (state === 'started') {
			state = 'idle';

			clearAppInterval();
		} else {
			state = 'idle';
			totalTime = DEFAULT_TIME;
		}
	}

	onDestroy(() => {
		clearAppInterval();
	})

	$: {
		if (totalTime === 0) {
			state = 'finished';

			parent.postMessage({ pluginMessage: { 
			'type': 'timer-finished', 
			} }, '*');

			clearAppInterval();

			setTimeout(() => {
				state = 'idle';
				totalTime = DEFAULT_TIME;
			}, 10000);
		}
	}

</script>


<div class="wrapper p-xxsmall">
	<p class="align-center">{minutes}:{seconds <= 9 ? '0' + seconds : seconds}</p>
	<div class="p-xxsmal ">
		<button class="button button__{state === 'idle' ? 'primary' : 'secondary'}" on:click={handleClick}>
			{#if state === 'idle'}
				🍅 START
			{:else if state === 'started'}
				PAUSE
			{:else}
				COMPLETE
			{/if}
		</button>
	</div>

</div>

<style global lang="css">

	.align-center {
		text-align: center;
		color: var(--figma-color-text);
	}

	.button{
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--figma-color-bg-brand);
    color: var(--figma-color-text-onbrand);
		border-radius: var(--border-radius-large);
		font-family: var(--font-stack);
    font-size: var(--font-size-large);
    font-weight: var(--font-weight-medium);
    letter-spacing: var(--font-letter-spacing-neg-small);
    line-height: var(--font-line-height);
    height: var(--size-medium);
    padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
    text-decoration: none;
    outline: none;
		cursor: pointer;
    border: 2px solid transparent;
	}
	
	.button__primary {
		background-color: var(--figma-color-bg-brand);
    color: var(--figma-color-text-onbrand);
	}

	.button__secondary {
		background-color: var(--figma-color-bg-secondary);
		color: var(--figma-color-bg-brand);
	}

</style>