import mongoose from 'mongoose';

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
    .filter((key) => permittedSet.has(key))
    .forEach((key) => newValues[key] = values[key]);
  return newValues;
}

export function isId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}