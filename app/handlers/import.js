const { dialog } = require('electron');
const fs = require('fs');

const importEvent = (event) => {

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

}

function UTCFormatICS(date){
    let year = date.slice(0, 4);
    let month = date.slice(4, 6);
    let day = date.slice(6, 8);
    return new Date(year + '-' + month + '-' + day).getTime();
}

module.exports = importEvent;