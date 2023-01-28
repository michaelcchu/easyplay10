import SoundGenerator from '/modules/SoundGenerator.js';
import SheetMusicDisplay from '/modules/SheetMusicDisplay.js';

start.addEventListener("click", begin);

document.querySelector(".side-panel-toggle").addEventListener("click", () => {
    document.querySelector(".wrapper").classList.toggle("side-panel-close");
});

const badKeys = ["Alt","Arrow","Audio","Enter","Home","Launch","Meta","Play",
    "Tab"];

let activePress = null; let press;

function begin() {
    document.querySelector(".splash").classList.toggle("splash-toggle");
}

function key(e) { 
    function down(e) {
        const strPress = "" + press;
        if (!badKeys.some(badKey => strPress.includes(badKey))
            && !e.repeat && (document.activeElement.nodeName !== 'INPUT') 
            && (press != activePress)) {
                SheetMusicDisplay.goToNextNote();
                const note = SheetMusicDisplay.getCurrentNote();            
                if (note) {                
                    SoundGenerator.startPlaying(note, activePress);
                    activePress = press;
                }
        }
    }
    
    function up() {
        if (press === activePress) {
            SoundGenerator.stopPlaying();
            activePress = null;
        }
    }

    if (e.type.includes("key")) {press = e.key;} 
    else {press = e.changedTouches[0].identifier;}
    if (["keydown","touchstart"].includes(e.type)) {down(e);} else {up();}
}

const containerEventTypes = ["touchstart","touchend"];
for (const et of containerEventTypes) {container.addEventListener(et, key);}
const docEventTypes = ["keydown","keyup"];
for (const et of docEventTypes) {document.addEventListener(et, key);}