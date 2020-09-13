const { app, BrowserWindow } = require('electron')
const url = require('url');
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 650,
    minWidth: 1100,
    minHeight: 650,
    center: true,
    title: 'Sistema de catalogagem de computadores',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/www/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  mainWindow.setMenu(null);
  
  mainWindow.on('closed', function () {
    mainWindow = null;
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

app.on('activate', function () {
  if (mainWindow === null) createWindow();
})