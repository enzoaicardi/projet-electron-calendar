const { BrowserWindow } = require('electron');
const path = require('path')

function windowMain(){
    
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/preload.js')
        }
    })

    // window.webContents.openDevTools()
    window.loadFile('./app/views/templates/index.html')
}

module.exports = windowMain;