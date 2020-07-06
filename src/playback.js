var howler = require('howler');
const mm = require('music-metadata');
const util = require('util');
 
mm.parseFile('src/test.flac')
  .then( metadata => {
    console.log(util.inspect(metadata.common, { showHidden: false, depth: null }));
    $("#controlBarAlbumArt").attr("src",`data:${metadata.common.picture[0].format};base64,${metadata.common.picture[0].data.toString('base64')}`);
    $("#controlBarTitle").text(metadata.common.title)
    $("#controlBarArtist").text(metadata.common.artist)
  })
  .catch( err => {
    console.error(err.message);
  });


var sound = new howler.Howl({
    src: ['test.flac']
  });

var isPlaying = false;

//$("#seekBar").bootstrapSlider('option',{min: 0, max: Math.round(sound.duration())});

$('#playpause').click(() => {
    console.log("click")
    console.log(Math.round(sound.duration()))
    console.log(Math.round(sound.seek()))
    if (!isPlaying) {
        sound.play();
        isPlaying = true;
    } else {
        sound.pause();
        isPlaying = false;
    }
});

/*setInterval(() => {
    updateBar();
}, 250);
*/
function updateBar() {
    $("#seekBar").bootstrapSlider('value',Math.round(sound.seek()));
}