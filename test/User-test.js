import { expect } from 'chai';
import User from '../src/User';
import  userData  from '../src/data/sampleData-user';

describe('User', () => {
  let newUser;
  beforeEach(() => {
    newUser = new User(userData[0]);
  })
    it('should be a function', function () {
      expect(User).to.be.a('function');
    });
    it('should instanciate a new user', function(){
        expect(newUser).to.instanceOf(User);
    });
    it('should be able to return user\'s first name', function(){
        expect(newUser.returnFirstName()).to.equal('Luisa');
    })
});
