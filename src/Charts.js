
export function displayWeeklySleepChart(chart, date, sHours, sqHours) {
    if(chart != null){
        chart.destroy()
    }
    var barColors = ['steelblue', 'steelblue', 'steelblue', 'steelblue', 'steelblue', 'steelblue', 'steelblue'];
    var barColors2 = ['cadetblue', 'cadetblue', 'cadetblue', 'cadetblue', 'cadetblue', 'cadetblue', 'cadetblue'];
    const data = {
        labels: date,
        datasets: [{
            label: 'Sleep Hours',
            backgroundColor: barColors,
            data: sHours
        },
        {
            label: 'Sleep Quality',
            backgroundColor: barColors2,
            data: sqHours
        }]
    }
    const config = {
        type: 'bar',
        data: data,
        options: {
            sqHours,
            sHours,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: 'Sleep Hours & Sleep Quality Per Day'
            }
        }
    }

    var chart = new Chart("sleepChart", config)
}

export function displayWeeklyWaterChart(chart, date, ounces) {
    var barColors = ["steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue",];
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


export function displayWeeklyStairsChart(chart, date, weeklyStairs) {
    var barColors = ["steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue",];
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
    var barColors = ["steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue",];
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
    var barColors = ["steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue", "steelblue",];
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