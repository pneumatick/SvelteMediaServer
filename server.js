const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const nodeDir = require('node-dir');

const app = express();
const PORT = process.env.PORT || 8080;
const CHUNK_SIZE = 10 ** 6;

app.use(morgan('dev'));
app.use(cors());
app.use(express.static('./public'));

// Route for serving a background image
app.get('/backgrounds/:file', (req, res) => {
    let filePath = path.join(__dirname, `backgrounds/${req.params.file}`);
    let file = fs.readFileSync(filePath);
    res.send(file);
});

// Route for getting the list of videos
app.get('/videos', (req, res) => {
    let videos = [];
    let files = nodeDir.files('./videos', { sync: true });

    files.forEach(file => {
        let video = file.replace('videos\\', '');
        video = video.replace(/\\/g, '/');
        videos.push(video);
    });

    res.send(videos);
});

// Route for watching a specific video
app.get('/watch', (req, res, next) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send('Missing range header!');
    }
    else {
        const videoPath = path.join(__dirname, `videos/${req.query.path}`);
        const videoSize = fs.statSync(videoPath).size;
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});