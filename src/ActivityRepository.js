import Activity from "./Activity";


class ActivityRepository {
    constructor(data) {
        this.activity = data.map((userObj) => { return new Activity(userObj) });
    }

// For a specific day (specified by a date), return the miles a user has walked 
// based on their number of steps (use their strideLength to help calculate this)
// numSteps * strideLength / 5280
displayMilesWalked(id, date, userData) {
    const findUserStride = userData.find(user => {
        return user.id === id
    }).strideLength

    const userStepsByDay = this.activity.filter((user) => {
        return user.id === id;
    })
    const stepsPerDay = userStepsByDay.find((user) => {
        return user.date === date;
    }).numSteps

    // average the users steps
    let average = stepsPerDay * findUserStride / 5280
    return parseFloat(average.toFixed(1))
}

    

// For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?
// For a user, how many minutes active did they average for a given week (7 days)?
// For a user, did they reach their step goal for a given day (specified by a date)?
// For a user, find all the days where they exceeded their step goal
// For a user, find their all-time stair climbing record
// For all users, what is the average number of:
// stairs climbed for a specified date
// steps taken for a specific date
// minutes active for a specific date
}






export default ActivityRepository;