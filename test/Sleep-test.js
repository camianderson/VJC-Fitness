import { expect } from 'chai';
import Sleep from '../src/Sleep';
import  sleepData  from '../src/data/sampleData-sleep';

describe('Sleep', () => {
  let sleep;
  beforeEach(() => {
    sleep = new Sleep(sleepData[0]);
  })
    it('should be a function', function () {
      expect(Sleep).to.be.a('function');
    });
    it('should instanciate a new user', function(){
        expect(sleep).to.instanceOf(Sleep);
    });
    it('should have id, date, hours slept, and sleep quality', function(){
        expect(sleep.id).to.equal(1);
        expect(sleep.date).to.equal('2019/06/15');
        expect(sleep.hoursSlept).to.equal(6.1);
        expect(sleep.sleepQuality).to.equal(2.2);
    })
    it('Sleep id should be a number', function(){
        expect(sleep.id).to.be.a('number');
    });
    it('Sleep date should be a string', function(){
        expect(sleep.date).to.be.a('string');
    });
    it('Hours slept should be a number', function(){
        expect(sleep.hoursSlept).to.be.a('number');
    });
    it('Sleep quality should be a number', function(){
        expect(sleep.sleepQuality).to.be.a('number');
    });
});
