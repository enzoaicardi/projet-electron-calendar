const { BrowserWindow, Menu } = require("electron");
const path = require('path');
const importEvent = require("../handlers/import");

function windowEvent(id){

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../preloads/preload.js')
        }
    })

    const windowEventMenu = Menu.buildFromTemplate([
        {
            label: "Import",
            submenu: [
                {
                    label: "Importer un fichier ICS",
                    click: () => importEvent({sender: window})
                }
            ]
        }
    ]);

    // window.webContents.openDevTools()
    window.setMenu(windowEventMenu)
    window.loadURL('file://'+__dirname+'/../views/templates/event.html' + (id ? ('?id=' + id) : ''))

}

module.exports = windowEvent;