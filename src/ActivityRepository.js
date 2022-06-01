import Activity from "./Activity";


class ActivityRepository {
    constructor(data) {
        this.activity = data.map((userObj) => { return new Activity(userObj) });
    }

displayMilesWalkedByDay(id, date, userData) {
    const findUserStride = userData.find(user => {
        return user.id === id
    }).strideLength
    const userStepsByDay = this.activity.filter((user) => {
        return user.id === id;
    })
    const stepsPerDay = userStepsByDay.find((user) => {
        return user.date === date;
    }).numSteps
    let average = stepsPerDay * findUserStride / 5280
    return parseFloat(average.toFixed(1))
}

displayMinutesActiveByDay(id, date) {
    const userActivity = this.activity.filter((user) => {
        return user.id === id;
    })
    const activityByDate = userActivity.find(user => {
        return user.date === date;
    }).minutesActive
    return activityByDate
}

// For a user, how many minutes active did they average for a given week (7 days)?
displayAvgMinutesActiveByWeek(id, date) {
    const activity = this.activity.filter((user) => {
        return user.id === id;
    });
    const index = activity.findIndex(data => {
        return data.date === date
    })
    const minutesActiveForReal = activity.slice((index - 6) , (index + 1))
      .map(data => {
        return data.minutesActive
    })
    const average = minutesActiveForReal.reduce((sum, minute) => {
        sum += minute
        return sum
    }, 0)
    return parseInt(average / 7);
}

// For a user, did they reach their step goal for a given day (specified by a date)?
    displayStepGoalComparison(id, date, userData) {
        const userStepGoal = userData.find(user => {
            return user.id === id
        }).dailyStepGoal
        const userActivities = this.activity.filter((user) => {
            return user.id === id;
        })
        const stepsPerDay = userActivities.find((user) => {
            return user.date === date;
        }).numSteps
        if(stepsPerDay >= userStepGoal){
            return "You reached your daily step goal"
        } else {
            return "You didn't reach your daily step goal"
        }
    }



// For a user, find all the days where they exceeded their step goal
// For a user, find their all-time stair climbing record
// For all users, what is the average number of:
// stairs climbed for a specified date
// steps taken for a specific date
// minutes active for a specific date
}






export default ActivityRepository;