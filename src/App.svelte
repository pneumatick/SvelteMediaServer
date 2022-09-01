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
	<div class="video-container">
		<VideoPlayer />
		<h1><span>Watching: {fileNameValue}</span></h1>
	</div>
	<VideoList />
</main>