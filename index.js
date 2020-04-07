let body = document.querySelector('body');

let text_area = document.createElement('textarea');
text_area.autofocus = 'true';
body.append(text_area);
text_area.className = 'text_area';


let keyboard_area = document.createElement('div');
body.append(keyboard_area);
keyboard_area.className = 'keyboard_area';


const keysEn = ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace',
    'Tab', "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", `\\`, 'DEL',
    'CapsLock', "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", 'Enter',
    "Shift", "z", "x", "c", "v", "b", "n", "m", "&#8218", ".", "/", '↑', "shift",
    "Ctrl", "Win", "Alt", "&nbsp", "Alt", "←", "↓", "→", "Ctrl"
];

const keysRu = ['ё', '1', "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", 'Backspace', 
    'Tab', "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", `\\`, 'DEL', 
    'CapsLock', "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", 'Enter',
    "Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", '↑', "shift", 
    "Ctrl", "Win", "Alt", "&nbsp", "Alt", "←", "↓", "→", "Ctrl" ];



let lang = localStorage.clear() || keysEn; 


function writekeys(lang) {
    let out = '';
    for (let i = 0; i < lang.length; i++) {
        out += `<div class="key" data="${lang[i]}">${lang[i]}</div>`
    }
    document.querySelector(".keyboard_area").innerHTML = out;

    document.querySelector('.key[data="Backspace"]').classList.add('long_key');
    document.querySelector('.key[data="Tab"]').classList.add('tab_key');
    document.querySelector('.key[data="CapsLock"]').classList.add('long_key');
    document.querySelector('.key[data="Enter"]').classList.add('enter_key');
    document.querySelector('.key[data="Shift"]').classList.add('long_key');
    document.querySelector('.key[data="shift"]').classList.add('enter_key');
    document.querySelector(".key:nth-child(59)").classList.add('space_key');
}

writekeys(lang);


document.addEventListener('keydown', (evt) => controlLang(evt));
function controlLang(evt) {  
    let key = event.key;
    if (key === 'Shift') {
        if (event.altKey) {
            changeLang();
            writekeys(lang);
            continueF();
        } 
    }
}

continueF();
function continueF (){
    document.onkeydown = (event) => {
        document.querySelector(`.keyboard_area .key[data="${event.key}"]`).classList.add('active');
        document.onkeyup = (event) => {
            document.querySelector(`.keyboard_area .key[data="${event.key}"]`).classList.remove('active');
        }
    }
        
    document.querySelectorAll('.keyboard_area .key').forEach(element => {
        element.onmousedown = function () {
            this.classList.add('active');
        }
        element.onmouseup = function () {
            this.classList.remove('active');
        }    
    })
    let buttons = document.querySelectorAll('.key');
    
    
    
    for (let i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click",clickKey);
    }
    
    
    function clickKey(i){
        let clickedKey = i.target.innerText;
    
        if(clickedKey !== "Backspace" && clickedKey !=="Enter" && clickedKey !=="Tab" && clickedKey !==" " && clickedKey !=="DEL"
        && clickedKey !=="←" && clickedKey !=="↓" && clickedKey !=="→" && clickedKey !=="↑" && clickedKey !=="Ctrl" && clickedKey !=="Win"
        && clickedKey !=="Alt"){
            text_area.value += clickedKey;
        } else if (clickedKey === "Backspace"){
            getBackspace();
        } else if (clickedKey === "Enter"){
            getEnter();
        } else if (clickedKey === "Tab"){
            getTab();
        } else if (clickedKey === " "){
            getSpace();
        } else if (clickedKey === "DEL"){
            getDel();
        } else if (clickedKey === "↓"){
            getDown();
        }  else if (clickedKey === "←"){
            getLeft();
        }  else if (clickedKey === "→"){
            getRight();
        }  else if (clickedKey === "↑"){
            getUp();
        } 
    }
    
    
    let currentPos;
    
    function getBackspace () {
        let str = text_area.value;
        text_area.value = str.slice(0,-1);  
    }
    function getEnter (){
        let str = text_area.value;
        text_area.value = str+'\n';
    }
    function getTab (){
        let str = text_area.value;
        text_area.value = str+'    ';
    }
    function getSpace (){
        let str = text_area.value;
        text_area.value = str+' ';
    }
    function getDel () {
        let delText = [];
        currentPos = text_area.selectionStart;
        text_area.value.split('').forEach((char, index) => {
            if (index != currentPos) {
                delText.push(char);
            }
        });
        text_area.value = delText.join('');
        text_area.selectionStart = text_area.selectionEnd = currentPos;
    }
    function getLeft (){
        currentPos = text_area.selectionStart;
        text_area.selectionStart = text_area.selectionEnd = currentPos - 1;
    }
    function getRight (){
        currentPos = text_area.selectionStart;
        text_area.selectionStart = text_area.selectionEnd = currentPos + 1;
    } 
}

let changeLang = () => {
    if (lang == keysEn) {
      lang = keysRu;
    } else if (lang == keysRu) {
        lang = keysEn;
    } 
    localStorage.lang = lang;
  };

  let clue = document.createElement('div');
  body.append(clue);
  clue.className = 'clue';
  clue.innerHTML = '<p>Windows.</p><p>Переключение языка:</p><p>"Alt" + "Shift"</p>';
