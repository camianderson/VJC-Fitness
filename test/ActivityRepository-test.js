import { expect } from 'chai';
import Activity from '../src/Activity';
import ActivityRepository from '../src/ActivityRepository';
import  activityData  from '../src/data/sampleData-activity';
import  userData  from '../src/data/sampleData-user';

describe('Activity Repository', () => {
  let activity1;
  beforeEach(() => {
    activity1 = new ActivityRepository(activityData);
  });
  it('should be a function', function () {
    expect(ActivityRepository).to.be.a('function');
  });
  it('should have activity', function () {
    expect(activity1.activity[0]).is.instanceOf(Activity);
  });
  it('should display steps walked per day', function () {
    expect(activity1.displayStepsWalkedByDay(1, "2019/06/15")).to.equal(3577);
    expect(activity1.displayStepsWalkedByDay(8, "2019/06/15")).to.equal(10333);
  });
  it('should display stairs climbed per day', function () {
    expect(activity1.displayStairsClimbedByDay(1, "2019/06/15")).to.equal(16);
    expect(activity1.displayStairsClimbedByDay(8, "2019/06/15")).to.equal(31);
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
    expect(activity1.displayStairClimbingRecord(2)).to.equal(25);
  });
  it('should display all users average stairs climbed for a specified date', function () {
    expect(activity1.displayAvgStairsClimbedForAllUsers("2019/06/15")).to.equal(27);
  });
  it('should display all users average steps for a specified date', function () {
    expect(activity1.displayAvgStepsForAllUsers("2019/06/15")).to.equal(7241);
  });
  it('should display all users average minutes active for a specified date', function () {
    expect(activity1.displayAvgMinutesActiveForAllUsers("2019/06/15")).to.equal(111);
  });
  it('should display weekly activity', function(){
    expect(activity1.displayWeeklyActivity(1, '2019/06/21')).to.be.a('array');
    expect(activity1.displayWeeklyActivity(1, '2019/06/21')).to.deep.equal(['2019/06/15', '2019/06/16', '2019/06/17', '2019/06/18', '2019/06/19', '2019/06/20', '2019/06/21']);
    expect(activity1.displayWeeklyActivity(2, '2019/06/21')).to.deep.equal(['2019/06/15', '2019/06/16', '2019/06/17', '2019/06/18', '2019/06/19', '2019/06/20', '2019/06/21']);
  });
  it('should display weekly stairs climbed', function(){
    expect(activity1.displayWeeklyStairs(1, '2019/06/21')).to.be.a('array');
    expect(activity1.displayWeeklyStairs(1, '2019/06/21')).to.deep.equal([16, 10, 33, 32, 13, 18, 5]);
    expect(activity1.displayWeeklyStairs(2, '2019/06/21')).to.deep.equal([18, 5, 25, 23, 12, 15, 10]);
  });
  it('should display weekly step count', function(){
    expect(activity1.displayWeeklySteps(1, '2019/06/21')).to.be.a('array');
    expect(activity1.displayWeeklySteps(1, '2019/06/21')).to.deep.equal([3577, 4294, 7402, 3486, 11374, 14810, 2634]);
    expect(activity1.displayWeeklySteps(2, '2019/06/21')).to.deep.equal([7895, 2589, 2365, 8956, 5896, 9563, 8569]);
  });
  it('should display weekly minutes active', function(){
    expect(activity1.displayWeeklyMinutesActive(1, '2019/06/21')).to.be.a('array');
    expect(activity1.displayWeeklyMinutesActive(1, '2019/06/21')).to.deep.equal([140, 138, 116, 114, 213, 287, 107]);
    expect(activity1.displayWeeklyMinutesActive(2, '2019/06/21')).to.deep.equal([156, 56, 89, 150, 205, 125, 89]);
  });
})