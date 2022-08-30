<script>
	import VideoPlayer from './VideoPlayer.svelte';
	import VideoList from './videoList.svelte';
	import { fileName } from './stores.js';

	let fileNameValue;
	fileName.subscribe(value => {
		fileNameValue = value;
	});
</script>

<main>
	<VideoPlayer />
	<h1><span>Watching: {fileNameValue}</span></h1>
	<VideoList />
</main>