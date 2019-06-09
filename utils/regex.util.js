/* eslint-disable no-useless-escape */
const regexValidation = (regex, value) => regex.test(value);

const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const nameRegex = /^[a-zA-Z\\s]+$/;
const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
const profileUrlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;

export {
  regexValidation,
  nameRegex,
  emailRegex,
  panRegex,
  profileUrlRegex,
  addressRegex,
};
