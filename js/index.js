const listIcon = document.getElementById('listIcon');
const listView = document.getElementById('listView'); 

listIcon.onclick = () => {
    listView.classList.remove('nah');
}

// pre-init --
// --
player = {
    holding: false,
    hand: document.getElementById('hand'),
    // init
    init: function() {
    },
    // hold and reveal item iterface
    use: function(dbKey, dbEntry) {
        if (this.holding) {
            this.drop();
        }
        const elem = document.createElement('div');
        elem.classList.add('layerPart');
        elem.classList.add('layerNormal');
        elem.innerHTML = dbKey;
        elem.onclick = this.drop.bind(this);
        this.hand.appendChild(elem);
        this.holding = {
            elem,
            db: [dbKey, dbEntry],
            name: dbKey,
            ondrop: dbEntry.ondrop || function(){},
            slider: dbEntry.onslide || function(){},
        };
        if (dbEntry.onhold) {
            dbEntry.onhold(elem);
        }
        if (dbEntry.onslide) {
            sliderVal.innerHTML = dbEntry.onslide(myRange.value);
        }
    },
    // drop held item
    drop: function() {
        if (this.holding) {
            this.holding.elem.remove();
            this.holding.ondrop();
            this.holding = false;
        }
    },
    // on slider change
    slider: function(val) {
        if (!this.holding) {
            return val;
        }

        return this.holding.slider(val);
    }
};

// init --
// --

// init player
player.init();

// init slider
const myRange = document.getElementById('myRange');
const sliderVal = document.getElementById('sliderVal');
myRange.oninput = function() {
    sliderVal.innerHTML = player.slider(this.value);
}

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

// close - exit and show
function close(what) {
    document.getElementById(what).classList.add('nah');
}
function show(what) {
    document.getElementById(what).classList.remove('nah');
}
const exits = document.getElementsByClassName('exit');
Array.prototype.forEach.call(exits, exit => {
    exit.onclick = () => {
        close(exit.dataset.what);
    };
});

// hand - use
function getHandHTML(dbKey, dbEntry) {
    const elem = document.createElement('span');
    elem.classList.add('hand-use');
    elem.classList.add('midIcon');
    elem.innerHTML = '✋';

    // click action
    elem.onclick = function() {
        player.use(dbKey, dbEntry);
        close('listView');
    };

    return elem;
}

// info display
const db = {
    '🛒': {top: '??', main: 'Looks kind of like a cart...'},
    '🍩': {top: 'Donut', main: 'A tasty looking ring-shaped snak.'},
    '🕰️': {
        top: 'Clock', main: 'Allows time adjustment.', use: true,
        onhold: function() {
            show('ctrl-slider');
        },
        ondrop: function() {
            close('ctrl-slider');
        },
        onslide: function(val) {
            // return time HH:MM
            const perc = val / 100;
            const h = Math.floor(24 * perc);
            const m = Math.floor(((24 * perc) - h) * 60);

            return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
        }
    }
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
        infoMain.appendChild(getHandHTML(dbKey, dbEntry));
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

