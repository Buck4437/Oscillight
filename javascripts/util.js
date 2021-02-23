"use strict";

// Number formatting

function toSci(num, dpSci = 2, dpNorm = 2) {
    if (typeof num === "number") num = new Decimal(num)
    if(num.lt(1000)) {
        return toFixedTrunc(num.toNumber(), dpNorm)
    }
    return toFixedTrunc(num.mantissa, dpSci) + "e" + num.exponent
}

// Used for sci formatting
// Ask stackoverflow
function toFixedTrunc(x, n) {
  const v = (typeof x === 'string' ? x : x.toString()).split('.');
  if (n <= 0) return v[0];
  let f = v[1] || '';
  if (f.length > n) return `${v[0]}.${f.substr(0,n)}`;
  while (f.length < n) f += '0';
  return `${v[0]}.${f}`
}

// Formula

Math.radian = deg => deg / 180 * Math.PI;

// File management

function copyText(text){
    //source: https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript

    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    try{
        document.execCommand('copy');
        console.log("Auto-copy successful");
    } catch(e){
        console.log("Auto-copy unsuccessful");
        prompt("Failed to Auto-copy. Please copy manually:", text);
    }
    document.body.removeChild(el);
}

// Themeing

var themes = ["Light", "Dark"];

function getTheme() {
    let data = localStorage.getItem(SAVE_NAME);
    if (data === null) {
        return 0
    }

    let theme = Number(JSON.parse(data).settings.theme);
    if (isNaN(theme) || theme >= themes.length) {
        return 0;
    }
    return theme;
}

function loadTheme() {
    let theme = getTheme();
    setTheme(theme);
    return theme;
}

function setTheme(index) {
    for (let theme of themes) {
        document.body.classList.remove(theme.toLowerCase() + "-theme");
    }
    document.body.classList.add(themes[index].toLowerCase() + "-theme");
}

function getCssVar(name) {
    return getComputedStyle(document.body).getPropertyValue(name);
}

// Validation

function isValidSave(save){
    try {
        JSON.parse(window.atob(save))
        return true
    }
    catch (e){
        return false
    }
}


function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function isNumber(val) {
    return typeof val === 'number' && isFinite(val)
}