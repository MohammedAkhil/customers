/* eslint-disable no-useless-escape */
import { isValidDate } from '../utils/date.util';
import {
  regexValidation,
  nameRegex,
  panRegex,
  emailRegex,
  profileUrlRegex,
  addressRegex,
} from '../utils/regex.util';

export const getUserValidation = user => {
  return {
    firstName: () => regexValidation(nameRegex, user.firstName),
    lastName: () => regexValidation(nameRegex, user.lastName),
    fatherName: () => regexValidation(nameRegex, user.fatherName),
    panNumber: () => regexValidation(panRegex, user.panNumber),
    dateOfBirth: () => isValidDate(user.dateOfBirth),
    email: () => regexValidation(emailRegex, user.email),
    profileImage: () => regexValidation(profileUrlRegex, user.profileImage),
    address: () => regexValidation(addressRegex, user.address),
    gender: () =>
      user.gender.toLowerCase() === 'male' ||
      user.gender.toLowerCase() === 'female',
  };
};
