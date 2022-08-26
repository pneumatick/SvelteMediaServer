const videoList = document.querySelector('#video-list');
const videoPlayer = document.querySelector('#video-player');
const videoSource = document.querySelector('#video-source');

function selectVideo(event) {
    event.preventDefault();

    let file = event.target.textContent;
    let path = `watch?path=${file}`;
    videoSource.src = path;
    videoPlayer.load();
}

function getVideoList() {
    let videos = [];

    videos = fetch('http://localhost:8080/videos')
        .then(response => {
            return response.json();
        })
        .then(data => {
            videos = data;
            console.log(videos);

            videos.forEach(video => {
                let newPara = document.createElement('p');
                let newLink = document.createElement('a');
                newLink.textContent = video;
                newLink.href = '';
                newLink.addEventListener('click', selectVideo);
                newPara.appendChild(newLink);
                videoList.appendChild(newPara);
            });
        })
        .catch(error => {
            console.log(error.message);
        });
}

getVideoList();