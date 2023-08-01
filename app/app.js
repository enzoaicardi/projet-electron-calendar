"use strict";

const { app, BrowserWindow } = require('electron');
const windowMain = require('./windows/main.js');
const handlers = require('./handlers/handler.js')

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {

  handlers.eventHandler();

  windowMain();

  app.on('activate', function () {
    // MacOS specificity
    if (BrowserWindow.getAllWindows().length === 0) windowMain();
  })

})

// No auto-quit on MacOS
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.