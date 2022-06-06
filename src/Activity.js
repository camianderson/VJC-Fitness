class Activity {
    constructor(userActivityData) {
        this.id = userActivityData.userID;
        this.date = userActivityData.date;
        this.numSteps = userActivityData.numSteps;
        this.minutesActive = userActivityData.minutesActive;
        this.flightsOfStairs = userActivityData.flightsOfStairs;
    }
}

export default Activity;