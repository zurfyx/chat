import validator from 'validator';

export function isUsername(value) {
  const validateLength = validator.isLength(value, { min: 5, max: 20 });
  const validateCharacters = validator.isAlphanumeric(value);
  return validateLength && validateCharacters;
}

export function isPassword(value) {
  return validator.isLength(value, { min: 4 });
}
