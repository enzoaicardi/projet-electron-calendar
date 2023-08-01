const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('calendar', {
    openEvent: (id) => ipcRenderer.invoke('openEvent', id),
    getEvent: (id) => ipcRenderer.invoke('getEvent', id),
    addEvent: (id) => ipcRenderer.invoke('addEvent', id),
    updateEvent: (id) => ipcRenderer.invoke('updateEvent', id),
    deleteEvent: (id) => ipcRenderer.invoke('deleteEvent', id)
})