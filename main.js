
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('path')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true' 
app.on("ready",()=>{
  const mainWindow = new BrowserWindow({
		width: 655,
		height: 500,
		webPreferences: {	
			nodeIntegration: true,
			contextIsolation: false,
		}
	//   titleBarStyle:"hiddenInset"
  })
	ipcMain.on("download",(params,params2)=>{
		// console.log(params, params2);
		mainWindow.webContents.downloadURL(params2)
	})
  
 //Menu.setApplicationMenu(null)
  mainWindow.loadFile("./renderer/index.html") 
})
