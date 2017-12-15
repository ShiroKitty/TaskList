var app = require('electron').remote
var dialog = app.dialog
var fs = require('fs')
var json = require('json-file');

document.getElementById('saveBtn').addEventListener('click', save)
document.getElementById('openBtn').addEventListener('click', open)

//function to save list
function save(){
    var outList = [];
    
    dialog.showSaveDialog((filename) =>{
        if (filename == undefined){
            alert("Error: Please enter a file name")
            return;
        }
        
        var tasks = document.getElementById('taskList');
        var task = tasks.getElementsByTagName('li');

        for(var i = 0; i < task.length; i++){
            outList.push(task[i].innerHTML);
        }
        
        fs.writeFile(filename, JSON.stringify(outList));
    })
}

function open(){
    var openList = [];
    dialog.showOpenDialog((filenames) => {
        if (filenames === undefined){
            alert("Error: No files selected")
            return;
        }
        readFile(filenames[0], openList)
    })
}

function readFile(path, openList){
    fs.readFile(path, 'utf-8', (err, data) =>{
        if (err){
            alert("Error loading file")
            return;
        }
        openList = JSON.parse(data);

        var taskList = document.getElementById('taskList');
        taskList.innerHTML = null;
        for(var i = 0; i < openList.length; i++){
            var task = document.createElement('li');
            var tasks = document.createTextNode(openList[i]);
            task.appendChild(tasks);
            taskList.appendChild(task);
        }
    });
}