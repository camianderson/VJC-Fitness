import './css/styles.css';
import './images/water.png';
import './images/sleep.png';
import './images/activity.png';
import './images/profile-image.png';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
import ActivityRepository from './ActivityRepository';
import {displayWeeklyWaterChart, displayWeeklySleepHoursChart, displayWeeklySleepQualityChart, displayWeeklyStairsChart, displayWeeklyStepsChart, displayWeeklyMinutesActiveChart} from './Charts.js';
import {getData} from './apiCalls';
import datepicker from 'js-datepicker';
import dateFormat from 'dateformat';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// ****** Global Variables ******
var userData;
var userHydrationData;
var userSleepData;
var userActivityData;
var userRepository;
var hydrationRepository;
var sleepRepository;
var activityRepository;
var waterChart = new Chart('waterChart', {type: 'bar'});
var sleepHoursChart = new Chart('sleepHoursChart', {type: 'bar'});
var sleepQualityChart = new Chart('sleepQualityChart', {type: 'bar'});
var stairsChart = new Chart('activityStairsChart', {type: 'bar'});
var stepsChart = new Chart('activityStepsChart', {type: 'bar'});
var minutesActiveChart = new Chart('activityMinutesChart', {type: 'bar'});

// ****** querySelectors ******
var welcomeUser = document.querySelector('.welcome-user');
var userInfo = document.querySelector('.user-info');
var waterButton = document.querySelector('#water-button');
var sleepButton = document.querySelector('#sleep-button');
var activityButton = document.querySelector('#activity-button');
var dailyResultWater = document.getElementById('user-ounce-for-day-result');
var dailyResultSleep = document.getElementById('user-hours-for-day-result');
var displayStepsBox = document.getElementById('stepsBox');
var displayMinutesBox = document.getElementById('minutesBox');
var displayMilesBox = document.getElementById('milesBox');
var displayStairsBox = document.getElementById('stairsBox');
var waterContainer = document.querySelector('#waterContainer');
var sleepContainer = document.querySelector('#sleepContainer');
var activityContainer = document.querySelector('#activityContainer');
var waterInputSubmitButton = document.getElementById('waterSubmitButton');
var sleepInputSubmitButton = document.getElementById('sleepSubmitButton');
var activityInputSubmitButton = document.getElementById('activitySubmitButton');

// ****** event listeners ******
window.addEventListener('load', loadData);
waterButton.addEventListener('click', showWaterBox);
sleepButton.addEventListener('click', showSleepBox);
activityButton.addEventListener('click', showActivityBox);


waterInputSubmitButton.addEventListener('submit', (e) => {
    e.preventDefault();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var date = document.getElementById('waterDate').value;
    var ounces = document.getElementById('waterOunces').value;
    var dateObj = new Date(date);
    clearForm();
    var newWaterData = {
        userID: userId,
        date: dateFormat(dateObj, 'yyyy/mm/dd'),
        numOunces: parseFloat(ounces)
    };
    postData('http://localhost:3001/api/v1/hydration');
});

sleepInputSubmitButton.addEventListener('submit', (e) => {
  e.preventDefault();
  var selection = document.getElementById('userDropDown');
  var userId = parseInt(selection.options[selection.selectedIndex].value);
  var date = document.getElementById('sleepDate').value;
  var hoursOfSleep = document.getElementById('hoursOfSleep').value;
  var qualityHoursOfSleep = document.getElementById('qualityHoursOfSleep').value;
  var dateObj = new Date(date);
  clearForm();
  var newSleepData = {
      userID: userId,
      date: dateFormat(dateObj, 'yyyy/mm/dd'),
      hoursSlept: parseFloat(hoursOfSleep),
      sleepQuality: parseFloat(qualityHoursOfSleep)
      };
  postData('http://localhost:3001/api/v1/sleep', newSleepData);
});

activityInputSubmitButton.addEventListener('submit', (e) => {
    e.preventDefault();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var date = document.getElementById('activityDate').value;
    var numberOfSteps = document.getElementById('numberOfSteps').value;
    var minutesActive = document.getElementById('minutesActive').value;
    var flightsOfStairs = document.getElementById('flightsOfStairs').value;
    var dateObj = new Date(date);
    clearForm();
    var newActivityData = {
        userID: userId,
        date: dateFormat(dateObj, 'yyyy/mm/dd'),
        numSteps: parseFloat(numberOfSteps),
        minutesActive: parseFloat(minutesActive),
        flightsOfStairs: parseFloat(flightsOfStairs)
        };
    postData('http://localhost:3001/api/v1/activity', newActivityData);
})

// ****** fetch GET ******
function loadData () {
    Promise.all([getData('users'), getData('hydration'), getData('sleep'), getData('activity')]).then(data => {
        userData = data[0].userData;
        userHydrationData = data[1].hydrationData;
        userSleepData = data[2].sleepData;
        userActivityData = data[3].activityData;
        userRepository = new UserRepository(userData);
        hydrationRepository = new HydrationRepository(userHydrationData);
        sleepRepository = new SleepRepository(userSleepData);
        activityRepository = new ActivityRepository(userActivityData);
        generateDataOnChange(userRepository, hydrationRepository, sleepRepository, activityRepository);
        displayWaterDataByDate(userRepository, hydrationRepository);
        displaySleepDataByDate(sleepRepository);
        displayActivityDataByDate(activityRepository);
    });
}

// ****** fetch POST ******
function postData (url, newData) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(newData),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('please fill in all the fields');
    } else {
      response.json();
    }
  });
}

function generateDataOnChange(userRepository, hydrationRepository, sleepRepository, activityRepository) {
  document.getElementById('userDropDown').onchange = () => {
      chooseUser(userRepository, hydrationRepository, sleepRepository, activityRepository);
  }
}

function displayWaterDataByDate(userRepository, hydrationRepository) {
  displayDropDownInfo(userRepository.users);
  datepicker('#date-picker-water', {
      startDate: new Date(2020, 0, 21),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, 'yyyy/mm/dd');
          input.value = newDate;
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, 'yyyy/mm/dd');
          displayWaterData(userId, formattedDate, hydrationRepository);
      }
  });
}

function displaySleepDataByDate(sleepRepository) {
  datepicker('#date-picker-sleep', {
      startDate: new Date(2020, 0, 21),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, 'yyyy/mm/dd');
          input.value = newDate;
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, 'yyyy/mm/dd');
          try{
          displaySleepData(userId, formattedDate, sleepRepository)}
          catch{}
      }
  });
}

function displayActivityDataByDate(activityRepository) {
  datepicker('#date-picker-activity', {
      startDate: new Date(2020, 0, 21),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, 'yyyy/mm/dd');
          input.value = newDate;
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, 'yyyy/mm/dd');
          displayActivityData(userId, formattedDate, activityRepository)}
  })
}

function displayDropDownInfo(users) {
    let userDropDown = document.getElementById('userDropDown');
    users.forEach(user => {
        let userOptions = document.createElement('OPTION');
        let userText = document.createTextNode(user.name);
        userOptions.appendChild(userText);
        userOptions.setAttribute('value', user.id);
        userDropDown.insertBefore(userOptions, userDropDown.lastChild);
    });
}

function chooseUser(userRepository, hydrationRepository, sleepRepository, activityRepository) {
    clearData();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var user = userRepository.getUser(userId);

    displayUserInfo(user, userRepository);
    displayActivityData(userId, '2020/01/21', activityRepository);
    displaySleepData(userId, '2020/01/21', sleepRepository);
    displayWaterData(userId, '2020/01/21', hydrationRepository);
};

function displayUserInfo(user, userRepository) {
    welcomeUser.innerText = `Welcome, ${user.returnFirstName()}!`;
    userInfo.innerHTML =
        `Address: ${user.address}<br>
        E-mail: ${user.email}<br>
        <br>
        Stride Length: ${user.strideLength}<br>
        Daily Step Goal: ${user.dailyStepGoal}<br>
        Average Users Step Goal: ${userRepository.displayAverageStepGoal()}`
};

function showWaterBox() {
    waterContainer.classList.remove('hidden');
    activityContainer.classList.add('hidden');
    sleepContainer.classList.add('hidden');
}

function displayWaterData(userId, formattedDate, hydrationRepository) {
    const userOuncesForDate = hydrationRepository.displayDailyAvgOunces(userId, formattedDate);
    const ouncesIntake = hydrationRepository.displayWeekWaterIntake(userId, formattedDate);
    const dateIntake = hydrationRepository.displayWaterByDate(userId, formattedDate);
    dailyResultWater.innerText = `\nWater Intake: \n${userOuncesForDate}oz
                                  \nDaily Intake Average\n(All-Time)
                                  ${hydrationRepository.displayAllTimeAvgOunces(userId)}oz`
    displayWeeklyWaterChart(waterChart, dateIntake, ouncesIntake);
}

function showSleepBox() {
    waterContainer.classList.add('hidden');
    activityContainer.classList.add('hidden');
    sleepContainer.classList.remove('hidden');
}

function displaySleepData(userId, formattedDate, sleepRepository) {
    try{
        const dailySleepHours = sleepRepository.displayDailySleepHours(userId, formattedDate);
        const dailyQualityOfSleep = sleepRepository.displaySleepQualityByDate(userId, formattedDate);
        dailyResultSleep.innerText = `Hours Slept ${dailySleepHours}
                                    Quality Hours of Sleep ${dailyQualityOfSleep}
                                    \nAverage Hours (All-Time) \n${sleepRepository.displayUserHoursSleepAllTime(userId)}
                                    Average Qualty Hours(All-Time) \n${sleepRepository.displayUserSleepQualityAllTime(userId)}`
        const dateSleep = sleepRepository.displaySleepWeek(userId, formattedDate);
        const sHours = sleepRepository.displayWeekSleepHours(userId, formattedDate);
        const sqHours = sleepRepository.displayWeekSleepQualityHours(userId, formattedDate);
        displayWeeklySleepHoursChart(sleepHoursChart, dateSleep, sHours);
        displayWeeklySleepQualityChart(sleepQualityChart, dateSleep, sqHours);
    }
    catch{}
}

function showActivityBox() {
    waterContainer.classList.add('hidden');
    activityContainer.classList.remove('hidden');
    sleepContainer.classList.add('hidden');
}

function displayActivityData(userId, formattedDate, activityRepository) {
    displayStepsOnDashboard(userId, formattedDate);
    displayMinutesActiveOnDashboard(userId, formattedDate);
    displayMilesOnDashboard(userId, formattedDate);
    displayStairsClimbedOnDashboard(userId, formattedDate);
    const dateActivity = activityRepository.displayWeeklyActivity(userId, formattedDate);
    const stairsData = activityRepository.displayWeeklyStairs(userId, formattedDate);
    const stepsData = activityRepository.displayWeeklySteps(userId, formattedDate);
    const minutesData = activityRepository.displayWeeklyMinutesActive(userId, formattedDate);
    displayWeeklyStairsChart(stairsChart, dateActivity, stairsData);
    displayWeeklyStepsChart(stepsChart, dateActivity, stepsData);
    displayWeeklyMinutesActiveChart(minutesActiveChart, dateActivity, minutesData);
}

function displayStepsOnDashboard(userId, formattedDate) {
  const dailyStepsPerDate = activityRepository.displayStepsWalkedByDay(userId, formattedDate);
  const averageStepsAllUsers = activityRepository.displayAvgStepsForAllUsers(formattedDate);
  displayStepsBox.innerText = `Your Steps Count\n${dailyStepsPerDate}\n
                              All Users Average\n(All-Time)\n${averageStepsAllUsers}`
}

function displayMinutesActiveOnDashboard(userId, formattedDate) {
  const dailyMinutesActive = activityRepository.displayMinutesActiveByDay(userId, formattedDate);
  const averageMinutesActive = activityRepository.displayAvgMinutesActiveForAllUsers(formattedDate);
  displayMinutesBox.innerText = `Your Minutes Active\n${dailyMinutesActive}
                                All Users Average\n(All-Time)\n${averageMinutesActive}`
}

function displayMilesOnDashboard(userId, formattedDate) {
  const dailyMilesWalked = activityRepository.displayMilesWalkedByDay(userId, formattedDate, userData);
  displayMilesBox.innerText = `Your Miles Walked\n${dailyMilesWalked}`
}

function displayStairsClimbedOnDashboard(userId, formattedDate) {
  const dailyStairsClimbed = activityRepository.displayStairsClimbedByDay(userId, formattedDate);
  const averageFlightsOfStairs = activityRepository.displayAvgStairsClimbedForAllUsers(formattedDate);
  displayStairsBox.innerText = `Your Stairs Climbed\n${dailyStairsClimbed}
                                All Users Average\n(All-Time)\n${averageFlightsOfStairs}`
}

function clearData(){
    dailyResultWater.innerText = '';
    dailyResultSleep.innerText = '';
}

function clearForm(){
    document.getElementById('waterDate').value = '';
    document.getElementById('waterOunces').value = '';
    document.getElementById('sleepDate').value = '';
    document.getElementById('hoursOfSleep').value = '';
    document.getElementById('qualityHoursOfSleep').value = '';
    document.getElementById('activityDate').value = '';
    document.getElementById('numberOfSteps').value = '';
    document.getElementById('minutesActive').value = '';
    document.getElementById('flightsOfStairs').value = '';
}