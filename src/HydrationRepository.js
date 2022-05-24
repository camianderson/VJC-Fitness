import Hydration from '../src/Hydration';

class HydrationRepository {
    constructor(data) {
      this.users = data.map((userObj) => { return new Hydration(userObj) });
    }

    displayAllTimeAvgOunces(id) {
        const userAqua = this.users.filter((user) => {
            return user.id === id;
        })
        const average = userAqua.reduce((sum, person) => {
            sum += person.ounces
            return sum
        }, 0)
        return Math.round(average/userAqua.length);
    }

    displayDailyAvgOunces(id, date) {
        const userByDay = this.users.filter((user) => {
            return user.id === id;
        })
        const waterByDay = userByDay.find((user) => {
            return user.date === date;
        }).ounces
        return waterByDay;
    }

    displayWeekWaterIntake(id, date){
        const filteredFluidById = this.users.filter((user) => {
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
        const dateWaterIntake = this.users.filter((user) => {
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

      displayWeeklyWaterChart(chart, date, ounces) {
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
}

export default HydrationRepository;
