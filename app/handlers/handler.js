const { ipcMain, BrowserWindow, dialog } = require('electron');
const path = require('path');
const EventsData = require('../datas/events');

function eventHandler(){

    ipcMain.handle('openEvent', (event, id) => {
        
        const window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preloads/preload.js')
            }
        })

        window.webContents.openDevTools()
        window.loadURL('file://'+__dirname+'/../views/templates/event.html' + (id ? ('?id=' + id) : ''))

    })

    ipcMain.handle('getEvent', (event, id) => {
        return EventsData.get(id);
    })

    ipcMain.handle('addEvent', (event, datas) => {

        let res = EventsData.add(...datas);

        dialog.showMessageBox(null, {
            title: "Event added",
            message: "L'évenemment a bien été ajouté",
            type: "info",
            buttons: ["ok"]
        });

        return res;

    })

    ipcMain.handle('updateEvent', (event, datas) => {

        EventsData.update(...datas);

        dialog.showMessageBox(null, {
            title: "Event updated",
            message: "L'évenemment a bien été modifié",
            type: "info",
            buttons: ["ok"]
        });

    })

    ipcMain.handle('deleteEvent', (event, id) => {

        EventsData.delete(id);

        dialog.showMessageBox(null, {
            title: "Event deleted",
            message: "L'évenemment a bien été supprimé",
            type: "info",
            buttons: ["ok"]
        }).then(res => {
            event.sender.close();
        });

    })

}

exports.eventHandler = eventHandler;