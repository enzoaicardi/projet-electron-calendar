const { dialog } = require('electron');
const fs = require('fs');

const exportEvent = (event, datas) => {

    let icsContent = eventFormatICS(datas);

    dialog.showSaveDialog(null, {
        title: 'Export event',
        defaultPath: 'evenement.ics',
        filters: [{name: 'fichier ics', extensions: ['ics']}]
    })
    .then(res => {

        if(res.canceled) return;

        fs.writeFile(res.filePath, icsContent, (err) => {

            let message, type;

            if (err) {
                message = 'Une erreur s\'est produite lors de la création du fichier' + err.message
                type = 'error'
            } else {
                message = 'Votre événement a bien été exporté'
                type = 'info'
            }

            dialog.showMessageBox(null, {
                title: "Event export",
                message: message,
                type: type,
                buttons: ["ok"]
            });

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

module.exports = exportEvent;