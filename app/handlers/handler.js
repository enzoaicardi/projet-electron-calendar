const { ipcMain, dialog } = require('electron');
const EventsData = require('../datas/events');
const windowEvent = require('../windows/event');
const importEvent = require('./import');
const exportEvent = require('./export');

function eventHandler(mainWindow){

    ipcMain.handle('openEvent', (event, id) => {
        windowEvent(id);
    })

    ipcMain.handle('getAllEvents', (event) => {
        return EventsData.getAll();
    })

    ipcMain.handle('getEvent', (event, id) => {
        return EventsData.get(id);
    })

    ipcMain.handle('getEvents', (event, date_start, date_end) => {
        return EventsData.getFromTo(date_start, date_end);
    })

    ipcMain.handle('addEvent', (event, datas) => {

        let res = EventsData.add(...datas);
        mainWindow.webContents.send('eventUpdate');

        dialog.showMessageBox(null, {
            title: "Event added",
            message: "L'évènement a bien été ajouté",
            type: "info",
            buttons: ["ok"]
        });

        return res;

    })

    ipcMain.handle('updateEvent', (event, datas) => {

        EventsData.update(...datas);
        mainWindow.webContents.send('eventUpdate');

        dialog.showMessageBox(null, {
            title: "Event updated",
            message: "L'évènement a bien été modifié",
            type: "info",
            buttons: ["ok"]
        });

    })

    ipcMain.handle('deleteEvent', (event, id) => {

        EventsData.delete(id);
        mainWindow.webContents.send('eventUpdate');

        dialog.showMessageBox(null, {
            title: "Event deleted",
            message: "L'évènement a bien été supprimé",
            type: "info",
            buttons: ["ok"]
        }).then(res => {
            event.sender.close();
        });

    })

    ipcMain.handle('exportEvent', exportEvent)
    ipcMain.handle('importEvent', importEvent)

}

exports.eventHandler = eventHandler;