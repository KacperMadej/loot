const listIcon = document.getElementById('listIcon');
const listView = document.getElementById('listView'); 

listIcon.onclick = () => {
    listView.classList.remove('nah');
}

// close - exit
function close(what) {
    document.getElementById(what).classList.add('nah');
}
const exits = document.getElementsByClassName('exit');
Array.prototype.forEach.call(exits, exit => {
    exit.onclick = () => {
        close(exit.dataset.what);
    };
});

// info display
const db = {
    '🛒': {top: '??', main: 'Looks kind of like a cart...'},
    '🍩': {top: 'Donut', main: 'A tasty looking ring-shaped snak.'}
};
const info = document.getElementById('info');
const infoTop = document.getElementById('info-top');
const infoMain = document.getElementById('info-main');
function showInfo(dbKey) {
    const dbEntry = db[dbKey] || {
        top: '???',
        main: 'Unknown'
    };
    info.classList.remove('nah');
    
    infoTop.innerHTML = `<span class="bold-text">ITEM NAME:</span><br/>
    <span>${dbEntry.top}</span>`;

    infoMain.innerHTML = `<span>${dbEntry.main}</span>`;
}

// item slection
const midIcons = document.getElementsByClassName('midIcon');
let currentIcon;
Array.prototype.forEach.call(midIcons, icon => {
    icon.onclick = () => {
        currentIcon && currentIcon.classList.remove('selected-item');
        icon.classList.add('selected-item');
        currentIcon = icon;
        showInfo(icon.innerHTML);
    };
});

