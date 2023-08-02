const { BrowserWindow } = require("electron");
const path = require('path')

function windowEvent(id){

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/preload.js')
        }
    })

    // window.webContents.openDevTools()
    window.loadURL('file://'+__dirname+'/../views/templates/event.html' + (id ? ('?id=' + id) : ''))

}

module.exports = windowEvent;