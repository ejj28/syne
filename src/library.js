var glob = require("glob")
const mm2 = require('music-metadata');

let pathsDB = {};
idCount = 0;



function loadFromBar() {
    addMusic($("#pathBar").val())
}

function addMusic(folder) {
    glob(folder + "/**/*.{flac, mp3}", function (er, files) {
        idCount = 0;
        pathsDB = {};
        for (x of files) {
            pathsDB[idCount] = x;
            idCount++;
        }
        populateList();
    });
}

function populateList() {
    $("#songsTable tbody").empty();
    for (const key in pathsDB) {
        mm2.parseFile(pathsDB[key])
            .then(metadata => {
                
                $("#songsTable tbody").append(
                    "<tr>" +
                    "<th scope='row'>" + "<img class=\"listAlbumArt\" src=data:" + metadata.common.picture[0].format + ";base64," + metadata.common.picture[0].data.toString('base64') + ">" + metadata.common.title + "</th>" +
                    "<td class=\"align-middle\">" + metadata.common.artist + "</td>" +
                    "<td class=\"align-middle\">" + metadata.common.album + "</td>" +
                    "<td class=\"align-middle\">" + metadata.common.genre + "</td>" +
                    "<td class=\"align-middle\">" + metadata.common.year + "</td>" +
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



