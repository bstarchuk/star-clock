const localizationList = document.querySelector('#localization-list');
const changeLocalizationBtn = document.querySelector('.changeLocalizationBtn');
const modalWindow = document.querySelector('.modal');

const NUMBER_KEYS = {
    0: [1, 1, 1, 1, 1, 1, 0],
    1: [0, 0, 1, 1, 0, 0, 0],
    2: [1, 1, 0, 1, 1, 0, 1],
    3: [0, 1, 1, 1, 1, 0, 1],
    4: [0, 0, 1, 1, 0, 1, 1],
    5: [0, 1, 1, 0, 1, 1, 1],
    6: [1, 1, 1, 0, 1, 1, 1],
    7: [0, 0, 1, 1, 1, 0, 0],
    8: [1, 1, 1, 1, 1, 1, 1],
    9: [0, 1, 1, 1, 1, 1, 1],
};

const UTC_VALUES = [
    "UTC-12",
    "UTC-11",
    "UTC-10",
    "UTC-9:30",
    "UTC-9",
    "UTC-8",
    "UTC-7",
    "UTC-6",
    "UTC-5",
    "UTC-4",
    "UTC-3:30",
    "UTC-3",
    "UTC-2",
    "UTC-1",
    "UTC+0",
    "UTC+1",
    "UTC+2",
    "UTC+3",
    "UTC+3:30",
    "UTC+4",
    "UTC+4:30",
    "UTC+5",
    "UTC+5:30",
    "UTC+5:45",
    "UTC+6",
    "UTC+6:30",
    "UTC+7",
    "UTC+8",
    "UTC+8:45",
    "UTC+9",
    "UTC+9:30",
    "UTC+10",
    "UTC+10:30",
    "UTC+11",
    "UTC+11:30",
    "UTC+12",
    "UTC+12:45",
    "UTC+13",
    "UTC+14"
]

const utcDif = -new Date().getTimezoneOffset();

let interval = startClock(utcDif * 60000);

for (const child of localizationList.children) {
    const childTimeArr = child.value.split(':');

    if (childTimeArr.length === 1 && +childTimeArr[0] === utcDif / 60) {
        child.selected = true;
    } else if (+childTimeArr[1] === utcDif % 60) {
        child.selected = true;
    }
}

localizationList.addEventListener('change', (elem) => {
    clearInterval(interval);

    let numbersArr = elem.target.value.split(':');
    let hour = +numbersArr[0] * 3600000;
    let min = numbersArr.length === 1 ? 0 : +numbersArr[1] * 60000;

    interval = startClock(hour + min);
});

changeLocalizationBtn.addEventListener('click', () => {
    if (modalWindow.style.display === 'none') {
        modalWindow.style.display = 'block';
    } else {
        modalWindow.style.display = 'none';
    }
});

addEventListener("load", setUTC);

function startClock(utc) {
    return setInterval(() => {
        const date = new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + utc);

        setTime(date.getFullYear(), 'year');
        setTime(date.getMonth() + 1, 'month');
        setTime(date.getDate(), 'day');
        setTime(date.getHours(), 'hour');
        setTime(date.getMinutes(), 'min');
        setTime(date.getSeconds(), 'sec');
    }, 100);
}

function setTime(time, type) {
    let timeStr = time.toString();
    let numbers = timeStr.length === 1 ? 0 + timeStr : timeStr;

    numbers.split('').forEach((mainElem, i) => {
        clearNums(`.number.${type}.n${i}`);
        NUMBER_KEYS[mainElem].forEach((innerElem, j) => {
            if (innerElem) {
                let section = document.querySelector(`.number.${type}.n${i}.s${j}`);
                section.setAttribute("fill", "#66FCF1");
            }
        });
    });
}

function clearNums(className) {
    let sections = document.querySelectorAll(className);

    sections.forEach((elem) => {
        elem.setAttribute("fill", "#12161C");
    })
}

function setUTC() {
    UTC_VALUES.forEach(elem => {
        localizationList.innerHTML += `<option value="${elem.slice(3)}">${elem}</option>`;
    });
}
