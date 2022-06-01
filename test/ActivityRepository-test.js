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
    expect(activity1.displayMilesWalked(1, "2019/06/15", userData)).to.equal(2.9);
    expect(activity1.displayMilesWalked(8, "2019/06/15", userData)).to.equal(8.6);
  });
 
});
