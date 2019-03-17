const { isEmpty } = require('./common');
const ServiceEnum = require('../enums/service').default;
const { ValidationError } = require('../errors/Errors');

module.exports = function validateRegisterInput(data) {
  const errors = {};


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

  if (!isEmpty(data.time)) {
    if (!isValidDate(data.time)) {
      errors.time = ServiceEnum.errors.timeIncorrect;
    }
  }
  
  if (!isEmpty(errors)) {
    throw new ValidationError('Errors during validation of input fields', errors);
  }

};