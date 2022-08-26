import { fileName} from './stores.js';
import { videoPlayer, videoSource } from './VideoPlayer.svelte';

// Event listener for selecting a new video from the list
export function selectVideo(event) {
    let file = event.target.textContent;
    let path = `watch?path=${file}`;
    videoSource.src = path;
    videoPlayer.load();

    // Change the value of the fileName variable in the store
    fileName.set(file);

    event.preventDefault();
}