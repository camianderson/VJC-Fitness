import Sleep from '../src/Sleep';

class SleepRepository{
    constructor(data) {
        this.sleep = data.map((userObj) => { return new Sleep(userObj) });
    }

    displayUserHoursSleepAllTime(id) {
        const userSleep = this.sleep.filter((user) => {
            return user.id === id;
        })
        const average = userSleep.reduce((sum, person) => {
            sum += person.hoursSlept;
            return sum;
        }, 0)
        const number = (average/userSleep.length).toFixed(1);
        return parseFloat(number);
    }

    displayUserSleepQualityAllTime(id) {
        const userSleep = this.sleep.filter((user) => {
            return user.id === id;
        })
        const average = userSleep.reduce((sum, person) => {
            sum += person.sleepQuality;
            return sum;
        }, 0)
        const number = (average/userSleep.length).toFixed(1);
        return parseFloat(number);
    }

    displayDailySleepHours(id, date) {
        const userSleep = this.sleep.filter((user) => {
            return user.id === id;
        })
        const userSleepByDay = userSleep.find((user) => {
            return user.date === date;
        }).hoursSlept
        return userSleepByDay;
    }

    displaySleepQualityByDate(id, date) {
        const userSleep = this.sleep.filter((user) => {
            return user.id === id;
        })
        const userSleepQualityByDay = userSleep.find((user) => {
            return user.date === date;
        }).sleepQuality
        return userSleepQualityByDay;
    }

    displayWeekSleepHours(id, date) {
        const dateSleepHours = this.sleep.filter((user) => {
            return user.id === id;
        });
        const index = dateSleepHours.findIndex(data => {
            return data.date === date;
        })
        const weekDate = dateSleepHours.slice((index - 6) , (index + 1))
        .map(data => {
            return data.hoursSlept;
        })
        return weekDate;
    }

    displayWeekSleepQualityHours(id, date) {
        const dateSleepQualityHours = this.sleep.filter((user) => {
            return user.id === id;
        });
        const index = dateSleepQualityHours.findIndex(data => {
            return data.date === date;
        })
        const weekDate = dateSleepQualityHours.slice((index - 6) , (index + 1))
        .map(data => {
            return data.sleepQuality;
        })
        return weekDate;
    }

    displayAverageSleepQualityAllUser() {
        const average = this.sleep.reduce((sum, person) => {
            sum += person.sleepQuality;
            return sum;
        }, 0)
        const number = (average/this.sleep.length).toFixed(1);
        return parseFloat(number);
    }

    displaySleepWeek(id, date) {
        const dateSleep = this.sleep.filter((user) => {
            return user.id === id;
        });
        const index = dateSleep.findIndex(data => {
            return data.date === date;
        })
        const weekDate = dateSleep.slice((index - 6) , (index + 1))
          .map(data => {
            return data.date;
        })
        return weekDate;
    }
};

export default SleepRepository;
