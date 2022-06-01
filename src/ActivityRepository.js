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

    displayStairClimbingRecord(id){
        const userActivities = this.activity.filter((user) => {
            return user.id === id;
        })
        const arrayStairClimbingData = userActivities.map((activity) => {
            return activity.flightsOfStairs;
        })
        const sortedStairClimbingData = arrayStairClimbingData.sort((lower, higher) => {
           return higher - lower;
        })
        return sortedStairClimbingData[0];
    }

    displayAvgStairsClimbedForAllUsers(date){
        const userActivities = this.activity.filter((user) => {
            return user.date === date;
        })
        const totalFlightsOfStairs = userActivities.reduce((sum, activity) => {
            sum += activity.flightsOfStairs
            return sum;
        }, 0)
        return parseInt(totalFlightsOfStairs/userActivities.length)
    }

    displayAvgStepsForAllUsers(date){
        const userActivities = this.activity.filter((user) => {
            return user.date === date;
        })
        const totalSteps = userActivities.reduce((sum, activity) => {
            sum += activity.numSteps
            return sum;
        }, 0)
        return parseInt(totalSteps/userActivities.length)
    }

    displayAvgMinutesActiveForAllUsers(date){
        const userActivities = this.activity.filter((user) => {
            return user.date === date;
        })
        const totalMinutesActive = userActivities.reduce((sum, activity) => {
            sum += activity.minutesActive
            return sum;
        }, 0)
        return parseInt(totalMinutesActive/userActivities.length)
    }
}



export default ActivityRepository;