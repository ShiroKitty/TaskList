console.log('ipc rendering')
const electron = require('electron')
const {ipcRenderer} = electron
const ul = document.querySelector('ul')

//adds item to list
ipcRenderer.on('addItem', function(event, item){
    ul.className = 'collection';
    console.log('item added')
    const li = document.createElement('li')
    const newItem = document.createTextNode(item)
    li.className = 'customLi';
    li.appendChild(newItem)
    ul.appendChild(li)
});

//clears items
ipcRenderer.on('clearItems', function(){
    console.log('clearing items')
    ul.innerHTML = '';
});

//removes an item
ul.addEventListener('dblclick', removeItem)

function removeItem(event){
    console.log('item removed')
    event.target.remove();
}