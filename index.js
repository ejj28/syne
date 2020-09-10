const { app, BrowserWindow, ipcRenderer } = require('electron')
const ipc = require('electron').ipcMain;


function createWindow () {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')
}

app.whenReady().then(createWindow)

const client = require('discord-rich-presence')('753412037551587380');
 
client.updatePresence({
  state: 'Idling',
  //details: '',
  //startTimestamp: 0,
  //endTimestamp: 0,
  largeImageKey: 'discord-cover-01',
  //smallImageKey: '',
  instance: true,
});

ipc.on('updateTrack', (event, args) => {
  client.updatePresence({
    state: args[1],
    details: args[0],
    //startTimestamp: 0,
    //endTimestamp: 0,
    largeImageKey: 'discord-cover-01',
    //smallImageKey: '',
    instance: true,
  });
});