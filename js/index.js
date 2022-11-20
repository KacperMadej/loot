const listIcon = document.getElementById('listIcon');
const listView = document.getElementById('listView'); 

listIcon.onclick = () => {
    listView.classList.remove('nah');
}

// pre-init --
// --
player = {
    holding: false,
    use: function(dbEntry) {
        //TODO
    }
};

// init --
// --

// populate invetory
const listItems = document.getElementById('listItems');

const invSets = [{
    name: 'w57',
    items: ['🧮', '🛒', '🍩', '⛑️']
},{
    name: 'w58',
    items: ['🕰️']
}];

invSets.forEach((iSet, i) => {
    const setName = iSet.name;

    // push separator
    const elem = document.createElement('span');
    elem.classList.add('iconSeparator');
    elem.innerHTML = setName;
    listItems.appendChild(elem);

    // push items
    iSet.items.forEach((it) => {
        const elem = document.createElement('span');
        elem.classList.add('midIcon');
        elem.classList.add('setName');
        elem.innerHTML = it;
        listItems.appendChild(elem);
    });
});

// active --
// --

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

// hand - use
function getHandHTML(dbEntry) {
    const elem = document.createElement('span');
    elem.classList.add('hand-use');
    elem.classList.add('midIcon');
    elem.innerHTML = '✋';

    // click action
    elem.onclick = function() {
        player.use(dbEntry);
    };

    return elem;
}

// info display
const db = {
    '🛒': {top: '??', main: 'Looks kind of like a cart...'},
    '🍩': {top: 'Donut', main: 'A tasty looking ring-shaped snak.'},
    '🕰️': {top: 'Clock', main: 'Allows time adjustment.', use: true}
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

    if (dbEntry.use) {
        // add hand icon
        infoMain.innerHTML += '<br/>';
        infoMain.appendChild(getHandHTML(dbEntry));
    }
}
function hideInfo() {
    info.classList.add('nah');
}

// item slection
const midIcons = document.getElementsByClassName('midIcon');
let currentIcon;
Array.prototype.forEach.call(midIcons, icon => {
    icon.onclick = () => {
        currentIcon && currentIcon.classList.remove('selected-item');
        if (icon === currentIcon) {
            // deselect
            hideInfo();
            currentIcon = null;
        } else {
            // select
            icon.classList.add('selected-item');
            currentIcon = icon;
            showInfo(icon.innerHTML);
        }
    };
});

