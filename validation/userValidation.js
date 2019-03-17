const { isEmpty } = require('./common');
const UserEnum = require('../enums/user').default;
const { ValidationError } = require('../errors/Errors');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  if (isEmpty(data.name)) {
    console.log('empty name!');
    errors.name = UserEnum.error.nameEmpty;   
  }
  
  if (isEmpty(data.city)) {
    console.log('empty city!');
    errors.city = UserEnum.error.cityEmpty;
  }
/*
  if (isEmpty(data.title)) {
    console.log('empty title!');
    errors.title = ServiceEnum.error.titleEmpty;
  }

  if (isEmpty(data.description)) {
    console.log('empty description!');
    errors.description = ServiceEnum.error.descriptionEmpty;
  }

  if (isEmpty(data.time)) {
    console.log('empty time!');
    errors.time = ServiceEnum.error.timeEmpty;
  }
*/
  
  if (!isEmpty(errors)) {
    throw new ValidationError('Errors during validation of input fields', errors);
  }

};