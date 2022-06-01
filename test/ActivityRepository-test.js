import { expect } from 'chai';
import Activity from '../src/Activity';
import ActivityRepository from '../src/ActivityRepository';
import  activityData  from '../src/data/sampleData-activity';
import  userData  from '../src/data/sampleData-user';

describe('Activity Repository', () => {
  let activity1;
  beforeEach(() => {
    activity1 = new ActivityRepository(activityData);
  })
  it('should be a function', function () {
    expect(ActivityRepository).to.be.a('function');
  });
  it('should have activity', function () {
    expect(activity1.activity[0]).is.instanceOf(Activity);
  });
  it('should display miles walked per day', function () {
    expect(activity1.displayMilesWalkedByDay(1, "2019/06/15", userData)).to.equal(2.9);
    expect(activity1.displayMilesWalkedByDay(8, "2019/06/15", userData)).to.equal(8.6);
  });
  it('should display minutes active by date', function () {
    expect(activity1.displayMinutesActiveByDay(1, "2019/06/15")).to.equal(140);
    expect(activity1.displayMinutesActiveByDay(8, "2019/06/15")).to.equal(114);
  });
  it('should display average minutes active per week', function () {
    expect(activity1.displayAvgMinutesActiveByWeek(1, "2019/06/21")).to.equal(159);
  });
  it('should display if the user was able to reach their daily step goal', function () {
    expect(activity1.displayStepGoalComparison(1, "2019/06/21", userData)).to.equal("You didn't reach your daily step goal");
    expect(activity1.displayStepGoalComparison(1, "2019/06/20", userData)).to.equal("You reached your daily step goal");
    expect(activity1.displayStepGoalComparison(8, "2019/06/15", userData)).to.equal("You reached your daily step goal");
  });
  it('should display user all-time stair climbing record', function () {
    expect(activity1.displayStairClimbingRecord(1)).to.equal(33);
  });
  it('should display all users average stairs climbed for a specified date', function () {
    expect(activity1.displayAvgStairsClimbedForAllUsers("2019/06/15")).to.equal(29);
  });
})