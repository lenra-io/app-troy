const { v4: uuidv4 } = require('uuid');
const Category = require('../classes/Category.js');
const Try = require('../classes/Try.js');
const { Field } = Category;
const categoryService = require('../services/categoryService.js');
const navigationService = require('../services/navigationService.js');
const tryService = require('../services/tryService.js');
const userService = require('../services/userService.js');
// const utils = require('./utils');

// /**
//  * @param {Data} data 
//  * @param {*} props
//  * @param {*} event
//  * @returns 
//  */
// module.exports = (data, props, event) => {
//   let action = props.action;
//   switch (action) {
//     case "selectTemplate":
//       return selectTemplate(data, props, event);
//     case "setValue":
//       data.tries[props.try].values[props.field] = event.value;
//       return data;
//     case "new":
//       return create(data, props, event);
//     case "edit":
//       return edit(data, props, event);
//     case "save":
//       return save(data, props, event);
//     default:
//       throw new Error("Undefined Try action " + action);
//   }
// }



function selectTemplate(data, props, event) {
  // return utils.pushState(data, {
  //   page: "createTry"
  // });
}

/**
 * Creates a try from a category or a previous try
 * @param {{categoryId: number, tryId: number}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function createTry(props, event, api) {
  const usersPromise = userService.getUser(api);
  let category;
  let newTry = new Try();
  if (props.try) {
    const fromTry = await tryService.getTry(api, props.try);
    category = await tryService.getTryCategory(api, fromTry._id);
    newTry = new Try();
    newTry.values = [...fromTry.values];
  }
  else {
    category = await categoryService.getCategory(api, props.category);
    newTry.values = [].fill("", 0, category.fields.length);
  }
  const user = await usersPromise;
  newTry._refs.push(user._id, category._id);
  newTry = await tryService.createTry(api, newTry);
  user.navigation.state = {
    page: "editTry",
    try: newTry._id
  };
  return userService.updateUser(api, user);
}

/**
 * Sets a try filed value
 * @param {{try: number, field: number}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function setTryField(props, event, api) {
  const currentTry = await tryService.getTry(api, props.try);
  currentTry.values[props.field] = event.value;
  return tryService.updateTry(api, currentTry);
}

/**
 * @param {{tryId: number}} props 
 * @param {*} event 
 * @param {*} api 
 * @returns 
 */
async function saveTry(props, event, api) {
  const currentTry = await tryService.getTry(api, props.tryId);
  let errors = checkTry(currentTry, tryService.getTryCategory(api, currentTry._id));

  if (errors.length > 0) currentTry.errors = errors;
  currentTry.ready = errors.length == 0;

  return tryService.updateTry(api, currentTry);
}

/**
 * @param {Try} currentTry 
 * @param {Category} category 
 * @returns 
 */
function checkTry(currentTry, category) {
  return category.fields
    .flatMap((field, pos) => checkField(field, pos, currentTry.values[pos]));
}

/**
 * 
 * @param {Field} field 
 * @param {number} pos 
 * @param {string} value 
 * @returns 
 */
function checkField(field, pos, value) {
  let errors = [];
  if (!value)
    errors.push({ message: `The field ${field.name} must be defined`, target: `values.${pos}` });
  return errors;
}

module.exports = {
  createTry,
  setTryField,
  saveTry
}