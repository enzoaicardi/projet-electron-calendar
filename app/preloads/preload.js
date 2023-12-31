const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('calendar', {
    openEvent: (id) => ipcRenderer.invoke('openEvent', id),
    getEvent: (id) => ipcRenderer.invoke('getEvent', id),
    getEvents: (date_start, date_end) => ipcRenderer.invoke('getEvents', date_start, date_end),
    addEvent: (id) => ipcRenderer.invoke('addEvent', id),
    updateEvent: (id) => ipcRenderer.invoke('updateEvent', id),
    deleteEvent: (id) => ipcRenderer.invoke('deleteEvent', id),
    exportEvent: (datas) => ipcRenderer.invoke('exportEvent', datas),
    importEvent: () => ipcRenderer.invoke('importEvent'),
    handleEventUpdate: (callback) => ipcRenderer.on('eventUpdate', callback),
    handleEventImported: (callback) => ipcRenderer.on('eventImported', callback)
})