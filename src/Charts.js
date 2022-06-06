export function displayWeeklyWaterChart(chart, date, ounces) {
    var barColors = "steelblue";
    chart.data.labels = date;
    chart.data.datasets = [{
        label: "Ounces Consumed Per Date",
        fill: false,
        backgroundColor: barColors,
        data: ounces
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}

export function displayWeeklySleepHoursChart(chart, date, sHours) {
    var barColors = "steelblue";
    chart.data.labels = date;
    chart.data.datasets = [{
        label: 'Hours of Sleep Per Day',
        fill: false,
        backgroundColor: barColors,
        data: sHours
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}

export function displayWeeklySleepQualityChart(chart, date, sqHours) {
    var barColors = 'cadetblue';
    chart.data.labels = date;
    chart.data.datasets = [{
        label: 'Hours of Quality Sleep Per Day',
        fill: false,
        backgroundColor: barColors,
        data: sqHours
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}

export function displayWeeklyStairsChart(chart, date, weeklyStairs) {
    var barColors = "steelblue";
    chart.data.labels = date;
    chart.data.datasets = [{
        label: "Weekly Stairs Climbed",
        fill: false,
        backgroundColor: barColors,
        data: weeklyStairs
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}

export function displayWeeklyStepsChart(chart, date, numSteps) {
    var barColors = "cadetblue";
    chart.data.labels = date;
    chart.data.datasets = [{
        label: "Weekly Steps Walked",
        fill: false,
        backgroundColor: barColors,
        data: numSteps
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}

export function displayWeeklyMinutesActiveChart(chart, date, minutesActive) {
    var barColors = "LightSeaGreen";
    chart.data.labels = date;
    chart.data.datasets = [{
        label: "Weekly Minutes Active",
        fill: false,
        backgroundColor: barColors,
        data: minutesActive
    }]
    chart.options = {
        legend: {
            display: false
        },
        title: {
            display: true
        }
    }
    chart.update()
}