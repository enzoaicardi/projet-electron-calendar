const { ipcMain, BrowserWindow, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const EventsData = require('../datas/events');

function eventHandler(mainWindow){

    ipcMain.handle('openEvent', (event, id) => {
        
        const window = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, '../preloads/preload.js')
            }
        })

        // window.webContents.openDevTools()
        window.loadURL('file://'+__dirname+'/../views/templates/event.html' + (id ? ('?id=' + id) : ''))

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

    ipcMain.handle('exportEvent', (event, datas) => {

        let icsContent = eventFormatICS(datas);
    
        dialog.showSaveDialog(null, {
            title: 'Export event',
            defaultPath: 'evenement.ics',
            filters: [{name: 'fichier ics', extensions: ['ics']}]
        })
        .then(res => {
            if(res.canceled) return;
            fs.writeFile(res.filePath, icsContent, (err) => {
                if (err) {
                  alert('Une erreur s\'est produite lors de la création du fichier' + err.message);
                  return
                }
                alert('Votre événement a bien été exporté' + err.message);
            })
        })
        
        
    })

    ipcMain.handle('importEvent', (event) => {

        dialog.showOpenDialog(null, {
            title: 'Import event',
            filters: [{name: 'ICalendar', extensions: ['ics']}],
            properties: ['openFile']
        })
        .then(res => {
            if(res.canceled) return;
            let filePath = res.filePaths[0];

            fs.readFile(filePath, 'utf-8', (err, icsContent) => {
                if (err) {
                  alert('Une erreur s\'est produite lors de l\'import du fichier' + err.message);
                  return
                }

                let eventLines = icsContent.match(/BEGIN:VEVENT\n(.*?)\nEND:VEVENT/s)[1].split('\n');
                let datas = {color: '#6666ff'};

                for(let line of eventLines){

                    if(line.startsWith('SUMMARY:')) datas.name = line.substring(8);
                    else if(line.startsWith('DESCRIPTION:')) datas.description = line.substring(12);
                    else if(line.startsWith('X-COLOR:')) datas.color = line.substring(8);
                    
                    else{
                        let match;

                        match = line.match(/^DTSTART;.*?:(.*)/);

                        if(match && match[0]){
                            datas.date_start = match[1] ? UTCFormatICS(match[1]) : '';
                            continue;
                        }

                        match = line.match(/^DTEND;.*?:(.*)/);

                        if(match && match[0]){
                            datas.date_end = match[1] ? UTCFormatICS(match[1]) : '';
                            continue;
                        }

                    }

                }

                event.sender.send('eventImported', datas);

            })
        })

    })

}

function eventFormatICS(datas){

    return (
        "BEGIN:VCALENDAR\n" +
        "CALSCALE:GREGORIAN\n" +
        "METHOD:PUBLISH\n" +
        "PRODID:-//Test Cal//EN\n" +
        "VERSION:2.0\n" +
        "BEGIN:VEVENT\n" +
        "UID:test-1\n" +
        "DTSTART;VALUE=DATE:" +
        dateFormatICS(datas.date_start) +
        "\n" +
        "DTEND;VALUE=DATE:" +
        dateFormatICS(datas.date_end) +
        "\n" +
        "SUMMARY:" +
        datas.name +
        "\n" +
        "DESCRIPTION:" +
        datas.description +
        "\n" +
        "X-COLOR:" +
        datas.color +
        "\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR"
    );

}

function dateFormatICS(date){
    return new Date(date).toISOString()
        .split("T")[0]
        .split("-")
        .join("");
}

function UTCFormatICS(date){
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);
    return new Date(year + '-' + month + '-' + day).getTime();
}

exports.eventHandler = eventHandler;