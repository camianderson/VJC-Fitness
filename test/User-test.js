import { expect } from 'chai';
import User from '../src/User';
import  userData  from '../src/data/sampleData-user';

describe('User', () => {
  let newUser;
  let newUser1;
  beforeEach(() => {
    newUser = new User(userData[0]);
    newUser1 = new User(userData[1]);
  })
    it('should be a function', function () {
      expect(User).to.be.a('function');
    });
    it('should instanciate a new user', function(){
        expect(newUser).to.instanceOf(User);
    });
    it('should have an id', function(){
      expect(newUser.id).to.equal(1);
      expect(newUser1.id).to.equal(2);
    })
    it('should have a name', function(){
        expect(newUser.name).to.equal('Luisa Hane');
        expect(newUser1.name).to.equal('Jarvis Considine');
    })
    it('should have an address', function(){
        expect(newUser.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
        expect(newUser1.address).to.equal('30086 Kathryn Port, Ciceroland NE 07273');
    })
    it('should have an email', function(){
        expect(newUser.email).to.equal('Diana.Hayes1@hotmail.com');
        expect(newUser1.email).to.equal('Dimitri.Bechtelar11@gmail.com');

    })
    it('should have a stride length', function(){
        expect(newUser.strideLength).to.equal(4.3);
        expect(newUser1.strideLength).to.equal(4.5);
    })
    it('should have a daily step goal', function(){
        expect(newUser.dailyStepGoal).to.equal(10000);
        expect(newUser1.dailyStepGoal).to.equal(5000);
    })
    it('should have friends', function(){
        expect(newUser.friends).to.deep.equal([16, 4, 8]);
        expect(newUser1.friends).to.deep.equal([9, 18, 24, 19]);
    })
    it('should be able to return user\'s first name', function(){
        expect(newUser.returnFirstName()).to.equal('Luisa');
    })

});
