import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let choosenDate = null;

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  spanEl: document.querySelector('.value'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    choosenDate = selectedDates[0];
    console.log(choosenDate.getDate());
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
};

// refs.days.textContent = choosenDate.getDay();

const DELAY = 1000;

refs.startBtn.disabled = true;

flatpickr(refs.inputEl, options);

function onClickStartBtn() {
  setInterval(() => {
    const endDate = choosenDate - options.defaultDate;
    const afterConvert = convertMs(endDate);
    refs.days.textContent = options.defaultDate.getDay();
    refs.hours.textContent = options.defaultDate.getHours();
    refs.minutes.textContent = options.defaultDate.getMinutes();
    refs.seconds.textContent = options.defaultDate.getSeconds();
  }, DELAY);
}

refs.startBtn.addEventListener('click', onClickStartBtn);
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
