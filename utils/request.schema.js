export const getUserValidation = {
  firstName: user =>
    wrap(regexValidation(nameRegex), user.firstName, 'firstName'),
  lastName: user => wrap(regexValidation(nameRegex), user.lastName, 'lastName'),
  fatherName: user =>
    wrap(regexValidation(nameRegex), user.fatherName, 'fatherName'),
  panNumber: user =>
    wrap(regexValidation(panRegex), user.panNumber, 'panNumber'),
  dob: user => wrap(regexValidation(dobRegex), user.dateOfBirth, 'dateOfBirth'),
};

const regexValidation = regex => value => regex.test(value);

const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const nameRegex = /^[a-zA-Z\\s]+$/;
const dobRegex = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

const wrap = (validationFunction, param, paramKey) =>
  new Promise((resolve, reject) => {
    if (validationFunction(param)) {
      resolve(true);
    } else {
      reject(
        new Error(
          JSON.stringify({
            param: paramKey,
            value: param,
          }),
        ),
      );
    }
  });
