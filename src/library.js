var glob = require("glob")
const mm2 = require('music-metadata');

let pathsDB = {};
idCount = 0;

const libraryPath = "C:/music"

function addMusic(folder) {
    glob(folder + "/**/*.{flac, mp3}", function (er, files) {
        for (x of files) {
            pathsDB[idCount] = x;
            idCount++;
        }
        populateList();
    });
}

function populateList() {
    for (const key in pathsDB) {
        mm2.parseFile(pathsDB[key])
            .then(metadata => {
                $("#songsTable tbody").append(
                    "<tr>" +
                    "<th scope='row'>" + metadata.common.title + "</th>" +
                    "<td>" + metadata.common.artist + "</td>" +
                    "<td>" + metadata.common.album + "</td>" +
                    "<td>" + metadata.common.genre + "</td>" +
                    "<td>" + metadata.common.year + "</td>" +
                    "<input type=\"hidden\" value=\"" + key + "\" />" +
                    "</tr>"
                );
            })
            .catch(err => {
                console.error(err.message);
            });
    }
    if ("0" in pathsDB) {
        setTrack(pathsDB[0]);
    }
}


$("#songsTable").on("click", "tbody tr", function () {
    setTrack(pathsDB[$(this).find("input").val()])
})


addMusic(libraryPath);
