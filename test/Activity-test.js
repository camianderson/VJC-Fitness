import { expect } from 'chai';
import Activity from '../src/Activity';
import activityData from '../src/data/sampleData-activity';

describe('Activity', () => {
    let activity1;
    let activity2;
    beforeEach(() => {
      activity1 = new Activity(activityData[0]);
      activity2 = new Activity(activityData[7])
    })
      it('should be a function', function () {
        expect(Activity).to.be.a('function');
      });
      it('should be able to get activity data by id', function(){
        expect(activity1.id).to.be.a('number');
        expect(activity1.id).to.equal(1);
        expect(activity2.id).to.equal(8);
      });
      it('should be able to get activity data by date', function(){
        expect(activity1.date).to.be.a('string');
        expect(activity1.date).to.equal('2019/06/15');
        expect(activity2.date).to.equal('2019/06/15');
        
      });
      it('should be able to get number of steps', function(){
        expect(activity1.numSteps).to.be.a('number');
        expect(activity1.numSteps).to.equal(3577);
        expect(activity2.numSteps).to.equal(10333);
      });
      it('should be able to get minutes active', function(){
        expect(activity1.minutesActive).to.be.a('number');
        expect(activity1.minutesActive).to.equal(140);
        expect(activity2.minutesActive).to.equal(114);
      });
      it('should be able to get flights of stairs', function(){
        expect(activity1.flightsOfStairs).to.be.a('number');
        expect(activity1.flightsOfStairs).to.equal(16);
        expect(activity2.flightsOfStairs).to.equal(31);
      });
  })