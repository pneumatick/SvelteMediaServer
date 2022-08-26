<script>
    import { videoList } from './stores.js';
    import { selectVideo } from './eventListeners.js';

    let videos = ['Placeholder A', 'Placeholder B', 'Placeholder C'];
    let url = 'http://localhost:8080/videos';

    videoList.subscribe(value => {
        videos = value;
    });

    // Get the list of videos from the server.
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(listFromServer => {
            videoList.set(listFromServer);
        })
        .catch(error => {
            console.log(error.message);
        });
</script>

<h2>Videos:</h2>
<div id="video-list">
    {#each videos as video}
        <a href='/watch?path={video}' on:click={selectVideo}>
            <p>{video}</p>
        </a>
    {/each}
</div>

<style>
    h2, div {
        position: absolute;
        width: 300px;
        right: 10px;
        text-align: left;
    }

    h2 {
        top: 0;
        height: 10%;
        padding-right: 5px;
    }

    div {
        height: 90%;
        top: 55px;
        overflow: auto;
        background-color: rgb(170, 163, 163);
    }
</style>