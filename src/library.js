var glob = require("glob")
const mm2 = require('music-metadata'); 

// options is optional
glob("music/*.{flac, mp3}", function (er, files) {
    for (x of files) {
        mm2.parseFile(x)
        .then(metadata => {
            $("#songsTable tbody").append(
                "<tr>" +
                    "<th scope='row'>" + metadata.common.title + "</th>" +
                    "<td>" + metadata.common.artist + "</td>" +
                    "<td>" + metadata.common.album + "</td>" +
                    "<td>" + metadata.common.genre + "</td>" +
                    "<td>" + metadata.common.year + "</td>" +
                "</tr>"
            );
        })
    .catch(err => {
        console.error(err.message);
    });
        
    }
});
