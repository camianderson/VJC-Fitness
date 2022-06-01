import { expect } from 'chai';
import HydrationRepository from '../src/HydrationRepository';
import  hydrationData  from '../src/data/sampleData-hydration';
import Hydration from '../src/Hydration';

describe('Hydration Repository', () => {
  let water;
  beforeEach(() => {
    water = new HydrationRepository(hydrationData);
  })
    it('should be a function', function () {
      expect(HydrationRepository).to.be.a('function');
    });
    it('should have users', function () {
        expect(water.hydration[0]).is.instanceOf(Hydration);
    });
    it('should display average water intake of all time', function () {
        expect(water.displayAllTimeAvgOunces(1)).to.equal(62);
    });
    it('should display daily water intake', function () {
        expect(water.displayDailyAvgOunces(1, "2019/06/15")).to.equal(37);
    });
    it('should display weekly water intake', function () {
        expect(water.displayWeekWaterIntake(1, "2019/06/20")).to.deep.equal([87]);
    });
    it('should display water by date', function () {
        expect(water.displayWaterByDate(1, "2019/06/20")).to.deep.equal(['2019/06/20']);
    });
})
