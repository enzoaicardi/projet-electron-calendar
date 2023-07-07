const { BrowserWindow } = require('electron');

function windowMain(){

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        /* not used now
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        */
    })

    window.loadFile('./app/views/templates/index.html')
}

module.exports = windowMain;