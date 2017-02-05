/* eslint-disable import/prefer-default-export */

import validator from 'validator';

/**
 * Creates a new object that only contains permitted keys.
 * That is very useful to process PATCH requests, when we are often expecting
 * few changed values.
 * @param permitted Set of permitted values (i.e. Set(title, name)).
 * @param values User values (i.e. { title: 'hello world', unwanted_value: 1}).
 */
export function filterPermittedKeys(permitted, values) {
  if (!Array.isArray(permitted) || typeof values !== 'object') return {};

  const newValues = {};
  const permittedSet = new Set(permitted);
  Object.keys(values)
    .filter(key => permittedSet.has(key))
    .forEach((key) => { newValues[key] = values[key]; });
  return newValues;
}

/**
 * Normalize email.
 * Since we are using OAuth login too, we'll try to mimick other sites like GitHub.
 */
export function normalizeEmail(email) {
  return validator.normalizeEmail(email, {
    all_lowercase: true,
    gmail_lowercase: true,
    gmail_remove_dots: false,
    gmail_remove_subaddress: false,
    gmail_convert_googlemaildotcom: false,
    outlookdotcom_lowercase: true,
    outlookdotcom_remove_subaddress: false,
    yahoo_lowercase: true,
    yahoo_remove_subaddress: false,
    icloud_lowercase: true,
    icloud_remove_subaddress: false,
  });
}
