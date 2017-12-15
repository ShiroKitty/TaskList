var app = require('electron').remote
var dialog = app.dialog
var fs = require('fs')

document.getElementById('saveBtn').addEventListener('click', save)
document.getElementById('openBtn').addEventListener('click', open)

function save(){
    dialog.showSaveDialog((filename) =>{
        if (filename === undefined){
            alert("Error: Please enter a file name")
            return;
        }

        var content = document.getElementById('getThis').value

        fs.writeFile(filename, content, (err) =>{
            if (err) console.log(err)
            alert("File saved")
        })
    })
}

function open(){
    dialog.showOpenDialog((filenames) => {
        if (filenames === undefined){
            alert("Error: No files selected")
            return;
        }
        readFile(filenames[0])
    })
}

function readFile(path){
    fs.readFile(path, 'utf-8', (err, data) =>{
        if (err){
            alert("Error loading file")
            return;
        }
        var textArea = document.getElementById('output')
        textArea.value = data
    });
}