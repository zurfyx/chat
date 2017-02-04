/* eslint-disable import/prefer-default-export */

import validator from 'validator';

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
