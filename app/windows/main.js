const { BrowserWindow } = require('electron');
const path = require('path')

function windowMain(){
    
    const window = new BrowserWindow({
        width: 1200,
        height: 1000,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/preload.js')
        }
    })

    // window.webContents.openDevTools()
    window.loadFile('./app/views/templates/index.html')

    return window;
}

module.exports = windowMain;