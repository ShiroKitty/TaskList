const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, ipcMain} = electron;
// const app = electron.app;
// const NewWindow = electron.BrowserWindow

const tMenu = electron.Menu

let main;
let add;

app.on('ready', function(){

    //console.log("it's working!")
    main = new BrowserWindow({
        width: 400,
        height:600
    })

    main.loadURL(`file://${__dirname}/main.html`)

    const menu = tMenu.buildFromTemplate(myMenu);
    tMenu.setApplicationMenu(menu);    

    main.on('closed', _=>{
        console.log('main window closed')
        main = null
        app.quit();
    });
});
//displays add window
function addWindow(){
    add = new BrowserWindow({
        width: 300,
        height:200,
        title: 'Add Item'
    })

    add.loadURL(`file://${__dirname}/addWindow.html`)

    const menu = tMenu.buildFromTemplate(myMenu);
    tMenu.setApplicationMenu(menu);    

    main.on('closed', _=>{
        console.log('add window closed')
        add = null
    });
}

//catch item
ipcMain.on('addItem', function(event, item){
    console.log(item)
    main.webContents.send('addItem', item)
    add.close()
});



/*****************
 * Menu Template *
 *****************/
const myMenu = [
    {
        label: 'File',
        submenu: [
            { 
                label: 'Open',
                click(){
                    var json = require('json-file');
                    json.read
                }
            },
            { 
                label: 'Save',
                click(){
                    
                    var x = Document.GetElementById("programList");

                }
            },
            { 
                label : 'Exit',
                role: 'close'
            },
            
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {
                label: 'Add',
                click(){
                    console.log('menu: add');
                    addWindow();
                },
                accelerator: 'ctrl + n'
            },
            {
                label: 'Clear',
                click(){
                    console.log('menu: clear');
                    main.webContents.send('clearItems');
                }
            }
        ]
    },
    {
        label : 'Developer',
        click : function(item, focusedWindow) {
            focusedWindow.toggleDevTools()
        },
        accelerator: 'ctrl+i'
    }
]

