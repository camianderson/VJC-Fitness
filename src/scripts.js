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
import {userDataList, userHydrationList, userSleepList} from './apiCalls';
import datepicker from 'js-datepicker';
import dateFormat from 'dateformat'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// ****** Global Variables ******
var userData;
var userHydrationData;
var userSleepData;
var userRepository;
var hydrationRepository;
var sleepRepository;
var waterChart = new Chart("waterChart", {type: "bar"})
var sleepChart = new Chart("sleepChart", {type: "bar"})

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
var waterContainer = document.querySelector('#waterContainer');
var sleepContainer = document.querySelector('#sleepContainer');


// ****** event listeners ******
window.addEventListener('load', loadData);
waterButton.addEventListener('click', waterDataDisplay);
sleepButton.addEventListener('click', sleepDataDisplay);
activityButton.addEventListener('click', activityDataDisplay);


function loadData () {
    Promise.all([userDataList(), userHydrationList(), userSleepList()]).then(data => {
        userData = data[0].userData
        userHydrationData = data[1].hydrationData
        userSleepData = data[2].sleepData
        userRepository = new UserRepository(userData);
        hydrationRepository = new HydrationRepository(userHydrationData);
        sleepRepository = new SleepRepository(userSleepData);
        document.getElementById('userDropDown').onchange = () => {
            chooseUser(userRepository, hydrationRepository);
        };
        var users = userRepository.users
        displayDropDownInfo(users);
        datepicker('#date-picker-water', {
            minDate: new Date(2019, 5, 15),
            maxDate: new Date(2020, 0, 22),
            startDate: new Date(2020, 0, 22),
            formatter: (input, date, _instance) => {
                const newDate = dateFormat(date, "yyyy/mm/dd")
                input.value = newDate
            },
            onSelect: (_instance, date) => {
                var selection = document.getElementById('userDropDown');
                var userId = parseInt(selection.options[selection.selectedIndex].value);
                const formattedDate = dateFormat(date, "yyyy/mm/dd");
                waterDataDisplay(userId, formattedDate, hydrationRepository)
            }
        })

        datepicker('#date-picker-sleep', {
            minDate: new Date(2019, 5, 15),
            maxDate: new Date(2020, 0, 22),
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
                sleepDataDisplay(userId, formattedDate, sleepRepository)}
                catch{}
            }
        })
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

function chooseUser(userRepository) {
    clearData();
    var selection = document.getElementById('userDropDown');
    var userId = parseInt(selection.options[selection.selectedIndex].value);
    var user = userRepository.getUser(userId)
    displayUserInfo(user, userRepository);
};

function displayUserInfo(user, userRepository, hydrationRepository) {
    welcomeUser.innerText = `Welcome, ${user.returnFirstName()}!`;
    userInfo.innerHTML =
        `Address: ${user.address}<br>
        E-mail: ${user.email}<br>
        <br>
        Stride Length: ${user.strideLength}<br>
        Daily Step Goal: ${user.dailyStepGoal}<br>
        Average Users Step Goal: ${userRepository.averageStepGoal()}`
};

function waterDataDisplay(userId, formattedDate, hydrationRepository) {
    waterContainer.classList.remove("hidden");
    sleepContainer.classList.add("hidden");
    const userOuncesForDate = hydrationRepository.displayDailyAvgOunces(userId, formattedDate)
    const ouncesIntake = hydrationRepository.displayWeekWaterIntake(userId, formattedDate)
    const dateIntake = hydrationRepository.displayWaterByDate(userId, formattedDate)
    dailyResultWater.innerText = `\nOn This Date: \n${userOuncesForDate}oz`
    hydrationRepository.displayWeeklyWaterChart(waterChart, dateIntake, ouncesIntake)
    avgDisplayBoxWater.innerText = `All-Time Daily Water Intake Average: ${hydrationRepository.displayAllTimeAvgOunces(userId)}oz`
}

function sleepDataDisplay(userId1, formattedDate1, sleepRepository) {
    waterContainer.classList.add("hidden");
    sleepContainer.classList.remove("hidden");
    try{
        const dailySleepHours = sleepRepository.displayDailySleepHours(userId1, formattedDate1)
        const dailyQualityOfSleep = sleepRepository.displaySleepQualityByDate(userId1, formattedDate1)
        dailyResultSleep.innerText = `Hours Slept: ${dailySleepHours}
                                    Quality of Sleep: ${dailyQualityOfSleep}`
        const dateSleep = sleepRepository.displaySleepWeek(userId1, formattedDate1)
        const sHours = sleepRepository.displayWeekSleepHours(userId1, formattedDate1)
        const sqHours = sleepRepository.displayWeekSleepQualityHours(userId1, formattedDate1)
        sleepRepository.displayWeeklySleepChart(sleepChart, dateSleep, sHours, sqHours)
        avgDisplayBoxSleep.innerText = `Average Sleep Qualty of All Time: \n${sleepRepository.displayUserSleepQualityAllTime(userId1)}
                                        \nAverage Hours of Sleep of All Time: \n${sleepRepository.displayUserHoursSleepAllTime(userId1)}`
    }
    catch{}
}

function activityDataDisplay() {
  window.alert('Activity Data Coming Soon!')
}

function clearData(){
    waterChart.clear();
    sleepChart.clear();
    dailyResultWater.innerText = '';
    avgDisplayBoxWater.innerText = `All-Time Daily Water Intake Average:`;
    dailyResultSleep.innerText = '';
    avgDisplayBoxSleep.innerText = `Average Sleep Qualty of All Time:
                                    \nAverage Hours of Sleep of All Time:`;

}
