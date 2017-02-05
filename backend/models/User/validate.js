import validator from 'validator';

export function isUsername(value) {
  const validateLength = validator.isLength(value, { min: 5, max: 20 });
  const validateCharacters = validator.isAlphanumeric(value);
  const errorMessage = 'Username must consist of only alphanumeric values with a length between 5 and 20 characters.';
  return [validateLength && validateCharacters, errorMessage];
}

export function isPassword(value) {
  const errorMessage = 'Password must have a minimum of 4 characters.';
  return [validator.isLength(value, { min: 4 }), errorMessage];
}
