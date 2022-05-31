import Hydration from '../src/Hydration';

class HydrationRepository {
    constructor(data) {
      this.hydration = data.map((userObj) => { return new Hydration(userObj) });
    }

    displayAllTimeAvgOunces(id) {
        const userAqua = this.hydration.filter((user) => {
            return user.id === id;
        })
        const average = userAqua.reduce((sum, person) => {
            sum += person.ounces
            return sum
        }, 0)
        return Math.round(average/userAqua.length);
    }

    displayDailyAvgOunces(id, date) {
        const userByDay = this.hydration.filter((user) => {
            return user.id === id;
        })
        const waterByDay = userByDay.find((user) => {
            return user.date === date;
        }).ounces
        return waterByDay;
    }

    displayWeekWaterIntake(id, date){
        const filteredFluidById = this.hydration.filter((user) => {
            return user.id === id;
        });
        const index = filteredFluidById.findIndex(data => {
          return data.date === date
        })
        const week = filteredFluidById.slice((index - 6) , (index + 1))
          .map(data => {
            return data.ounces
        })
        return week;
    }

    displayWaterByDate(id, date) {
        const dateWaterIntake = this.hydration.filter((user) => {
            return user.id === id;
        });
        const index = dateWaterIntake.findIndex(data => {
            return data.date === date
        })
        const weekDate = dateWaterIntake.slice((index - 6) , (index + 1))
          .map(data => {
            return data.date
        })
        return weekDate;
    }
}

export default HydrationRepository;
