import './css/styles.css';
import './images/water.png';
import './images/sleep.png';
import './images/activity.png';
import './images/profile-image.png';
import './images/water-glass.png';
import './images/sleeping.png';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepository';
import SleepRepository from './SleepRepository';
import ActivityRepository from './ActivityRepository';
import {displayWeeklySleepChart, displayWeeklyWaterChart, displayWeeklyStairsChart, displayWeeklyStepsChart, displayWeeklyMinutesActiveChart} from './Charts.js';
import {getData} from './apiCalls';
import datepicker from 'js-datepicker';
import dateFormat from 'dateformat'
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
var waterChart = new Chart("waterChart", {type: "bar"})
var sleepChart = new Chart("sleepChart", {type: "bar"})
var stairsChart = new Chart("activityStairsChart", {type: "bar"})
// var stepsChart = new Chart("activityStepsChart", {type: "bar"})
// var minutesActiveChart = new Chart("activityMinutesChart", {type: "bar"})

// ****** querySelectors ******
var welcomeUser = document.querySelector('.welcome-user');
var userInfo = document.querySelector('.user-info');
var avgDisplayBoxWater = document.querySelector('#averageGoalWater');
var avgDisplayBoxSleep = document.querySelector('#averageGoalSleep');
var waterButton = document.querySelector('#water-button');
var sleepButton = document.querySelector('#sleep-button');
var activityButton = document.querySelector('#activity-button');
var dailyResultWater = document.getElementById('user-ounce-for-day-result');
var dailyResultSleep = document.getElementById('user-hours-for-day-result');
// var dailyResultActivity = document.getElementById('user-activity-for-day-result');
var displayStepsBox = document.getElementById('stepsBox')
var displayMinutesBox = document.getElementById('minutesBox')
var displayMilesBox = document.getElementById('milesBox')
var displayStairsBox = document.getElementById('stairsBox')
var waterContainer = document.querySelector('#waterContainer');
var sleepContainer = document.querySelector('#sleepContainer');
var activityContainer = document.querySelector('#activityContainer');
var waterSubmitButton = document.querySelector('#waterSubmitButton');
var sleepSubmitButton = document.querySelector('#sleepSubmitButton');
var activitySubmitButton = document.querySelector('#activitySubmitButton');

// ****** event listeners ******
window.addEventListener('load', loadData);
waterButton.addEventListener('click', displayWaterData);
sleepButton.addEventListener('click', displaySleepData);
activityButton.addEventListener('click', displayActivityData);
waterSubmitButton.addEventListener('click', getWaterInput);
sleepSubmitButton.addEventListener('click', getSleepInput);
activitySubmitButton.addEventListener('click', getActivityInput);


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
        generateDataOnChange(userRepository, hydrationRepository)
        displayWaterDataByDate(userRepository, hydrationRepository)
        displaySleepDataByDate(sleepRepository)
        displayActivityDataByDate(activityRepository)
    })
}

function generateDataOnChange(userRepository, hydrationRepository, sleepRepository, activityRepository) {
  document.getElementById('userDropDown').onchange = () => {
      chooseUser(userRepository, hydrationRepository, sleepRepository, activityRepository );
  }
}

function displayWaterDataByDate(userRepository, hydrationRepository) {
  displayDropDownInfo(userRepository.users);
  datepicker('#date-picker-water', {
      // minDate: new Date(2019, 5, 15),
      // maxDate: new Date(2020, 0, 22),
      startDate: new Date(2020, 0, 22),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, "yyyy/mm/dd")
          input.value = newDate
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, "yyyy/mm/dd");
          displayWaterData(userId, formattedDate, hydrationRepository)
      }
  })
}

function displaySleepDataByDate(sleepRepository) {
  datepicker('#date-picker-sleep', {
      // minDate: new Date(2019, 5, 15),
      // maxDate: new Date(2020, 0, 22),
      startDate: new Date(2020, 0, 22),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, "yyyy/mm/dd")
          input.value = newDate
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, "yyyy/mm/dd");
          try{
          displaySleepData(userId, formattedDate, sleepRepository)}
          catch{}
      }
  })
}

function displayActivityDataByDate(activityRepository) {
  datepicker('#date-picker-activity', {
    //   minDate: new Date(2019, 5, 15),
    //   maxDate: new Date(2020, 0, 22),
      startDate: new Date(2020, 0, 22),
      formatter: (input, date, _instance) => {
          const newDate = dateFormat(date, "yyyy/mm/dd")
          input.value = newDate
      },
      onSelect: (_instance, date) => {
          var selection = document.getElementById('userDropDown');
          var userId = parseInt(selection.options[selection.selectedIndex].value);
          const formattedDate = dateFormat(date, "yyyy/mm/dd");
        //   try{
          displayActivityData(userId, formattedDate, activityRepository)}
        //   catch{}
    //   }
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
    })
}

function chooseUser(userRepository, hydrationRepository, sleepRepository, activityRepository) {
    clearData();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var user = userRepository.getUser(userId);
    
    displayUserInfo(user, userRepository);
    displayActivityData(userId, '2020/01/21', activityRepository);
    displaySleepData(userId, '2020/01/22', sleepRepository);
    displayWaterData(userId, '2020/01/22', hydrationRepository);
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

function displayWaterData(userId, formattedDate, hydrationRepository) {
    waterContainer.classList.remove("hidden");
    activityContainer.classList.add("hidden");
    sleepContainer.classList.add("hidden");
    const userOuncesForDate = hydrationRepository.displayDailyAvgOunces(userId, formattedDate)
    const ouncesIntake = hydrationRepository.displayWeekWaterIntake(userId, formattedDate)
    const dateIntake = hydrationRepository.displayWaterByDate(userId, formattedDate)
    dailyResultWater.innerText = `\nOn This Date: \n${userOuncesForDate}oz
                                  \nAll-Time Daily Water Intake Average: 
                                  ${hydrationRepository.displayAllTimeAvgOunces(userId)}oz`
    displayWeeklyWaterChart(waterChart, dateIntake, ouncesIntake)
}

function displaySleepData(userId, formattedDate, sleepRepository) {
    waterContainer.classList.add("hidden");
    activityContainer.classList.add("hidden");
    sleepContainer.classList.remove("hidden");
    try{
        const dailySleepHours = sleepRepository.displayDailySleepHours(userId, formattedDate)
        const dailyQualityOfSleep = sleepRepository.displaySleepQualityByDate(userId, formattedDate)
        dailyResultSleep.innerText = `Hours Slept: ${dailySleepHours}\n
                                    Quality of Sleep: ${dailyQualityOfSleep} hours\n
                                    Average Sleep Qualty of All Time: \n${sleepRepository.displayUserSleepQualityAllTime(userId)} hours
                                    \nAverage Hours of Sleep of All Time: \n${sleepRepository.displayUserHoursSleepAllTime(userId)}`
        const dateSleep = sleepRepository.displaySleepWeek(userId, formattedDate)
        const sHours = sleepRepository.displayWeekSleepHours(userId, formattedDate)
        const sqHours = sleepRepository.displayWeekSleepQualityHours(userId, formattedDate)
        displayWeeklySleepChart(sleepChart, dateSleep, sHours, sqHours)
    }
    catch{}
}

function displayActivityData(userId, formattedDate, activityRepository) {
    waterContainer.classList.add("hidden");
    sleepContainer.classList.add("hidden");
    activityContainer.classList.remove("hidden");
    displayStepsOnDashboard(userId, formattedDate);
    displayMinutesActiveOnDashboard(userId, formattedDate);
    displayMilesOnDashboard(userId, formattedDate);
    displayStairsClimbedOnDashboard(userId, formattedDate);
    // console.log(activityRepository)
    const dateActivity = activityRepository.displayWeeklyActivity(userId, formattedDate);
    const stairsData = activityRepository.displayWeeklyStairs(userId, formattedDate);
    const stepsData = activityRepository.displayWeeklySteps(userId, formattedDate);
    const minutesData = activityRepository.displayWeeklyMinutesActive(userId, formattedDate);
    displayWeeklyStairsChart(stairsChart, dateActivity, stairsData);
    // displayWeeklyStepsChart(stepsChart, dateActivity, stepsData);
    // displayWeeklyMinutesActiveChart(minutesActiveChart, dateActivity, minutesData);
}

function displayStepsOnDashboard(userId, formattedDate) {
  const dailyStepsPerDate = activityRepository.displayStepsWalkedByDay(userId, formattedDate);
  const averageStepsAllUsers = activityRepository.displayAvgStepsForAllUsers(formattedDate);
  displayStepsBox.innerText = `Daily Steps: ${dailyStepsPerDate} \n Average Steps For All Users \n${averageStepsAllUsers}`
}

function displayMinutesActiveOnDashboard(userId, formattedDate) {
  const dailyMinutesActive = activityRepository.displayMinutesActiveByDay(userId, formattedDate);
  const averageMinutesActive = activityRepository.displayAvgMinutesActiveForAllUsers(formattedDate);
  displayMinutesBox.innerText = `Daily Minutes Active: ${dailyMinutesActive} \n Average Minutes Active For All Users \n${averageMinutesActive}`
}

function displayMilesOnDashboard(userId, formattedDate) {
  const dailyMilesWalked = activityRepository.displayMilesWalkedByDay(userId, formattedDate, userData);
  displayMilesBox.innerText = `Daily Miles Walked: ${dailyMilesWalked}`
}

function displayStairsClimbedOnDashboard(userId, formattedDate) {
  const dailyStairsClimbed = activityRepository.displayStairsClimbedByDay(userId, formattedDate);
  const averageFlightsOfStairs = activityRepository.displayAvgStairsClimbedForAllUsers(formattedDate);
  displayStairsBox.innerText = `Daily Stairs Climbed: ${dailyStairsClimbed} \n Average Stairs Climbed For All Users \n${averageFlightsOfStairs}`
}

function clearData(){
    // waterChart.clear();
    // sleepChart.clear();
    dailyResultWater.innerText = `On This Date:
                                  \nAll-Time Daily Water Intake Average:`;
    dailyResultSleep.innerText = `Hours Slept:
                                \nQuality of Sleep:
                                \nAverage Sleep Qualty of All Time:
                                \nAverage Hours of Sleep of All Time:`;
}

function getWaterInput(){
    event.preventDefault();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var date = document.getElementById('waterDate').value;
    var ounces = document.getElementById('waterOunces').value;
    clearForm();
    return { userID: userId, date: date , numOunces: ounces };
}

function getSleepInput(){
    event.preventDefault();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var date = document.getElementById('sleepDate').value;
    var hoursOfSleep = document.getElementById('hoursOfSleep').value;
    var qualityHoursOfSleep = document.getElementById('qualityHoursOfSleep').value;
    clearForm();
    return {
        userID: userId,
        date: date,
        hoursSlept: hoursOfSleep,
        sleepQuality: qualityHoursOfSleep
        };
}

function getActivityInput(){
    event.preventDefault();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var date = document.getElementById('activityDate').value;
    var numberOfSteps = document.getElementById('numberOfSteps').value;
    var minutesActive = document.getElementById('minutesActive').value;
    var flightsOfStairs = document.getElementById('flightsOfStairs').value;
    clearForm();
    return {
        "userID": userId,
        "date": date,
        "numSteps": numberOfSteps,
        "minutesActive": minutesActive,
        "flightsOfStairs": flightsOfStairs
        };
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