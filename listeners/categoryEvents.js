const { v4: uuidv4 } = require('uuid');
const Category = require('../classes/Category.js');
const { Modification, Field } = Category;
const userService = require('../services/userService.js');
const categoryService = require('../services/categoryService.js');
const navigationService = require('../services/navigationService.js');


/**
 * Creates a category
 * @param {*} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function createCategory(props, event, api) {
  const user = await userService.getUser(api);
  let category = new Category();
  category.name = user.navigation.state.categoryName;
  category._refs.push(user._id);
  category = await categoryService.createCategory(api, category);
  user.navigation.state.modal = undefined;
  user.navigation.state.categoryName = undefined;
  await navigationService.pushState(api, user, {
    page: 'editCategory',
    category: category._id
  });
}

/**
 * Sets a property value of the current category
 * @param {{categoryId: number, property: string}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function setCategoryProperty(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  let modification = category.modifications.find(m => m.property == props.property);
  if (category[props.property] != event.value) {
    if (!modification) {
      modification = new Modification(props.property);
      category.modifications.push(modification);
    }
    modification.data = event.value;
  }
  else if (modification)
    category.modifications.splice(category.modifications.indexOf(modification), 1);
  return categoryService.updateCategory(api, category);
}

/**
 * Add a field to the current category
 * @param {{categoryId: number}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function addCategoryField(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  category.modifications.push(new Modification('fields', new Field(), 'add', uuidv4()));
  return categoryService.updateCategory(api, category);
}

/**
 * Remove a field from the current category
 * @param {{categoryId: number, fieldId: string}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function removeCategoryField(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  const pos = category.modifications.findIndex(m => m.property == 'fields' && m.action == 'add' && m.id == props.fieldId);
  if (pos != -1) {
    category.modifications.splice(pos, 1);
    return categoryService.updateCategory(api, category);
  }
}
/**
 * Set the name of a field of the current category
 * @param {{categoryId: number, fieldId: string}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function setCategoryFieldName(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  const modification = category.modifications.find(m => m.property == 'fields' && m.action == 'add' && m.id == props.fieldId);
  if (modification) {
    modification.data.name = event.value;
    return categoryService.updateCategory(api, category);
  }
}

/**
 * Set the name of a field of the current category
 * @param {{categoryId: number, fieldId: string}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function setCategoryFieldUnit(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  const modification = category.modifications.find(m => m.property == 'fields' && m.action == 'add' && m.id == props.fieldId);
  if (modification) {
    modification.data.unit = props.unit;
    return categoryService.updateCategory(api, category);
  }
}


/**
 * Save the current category modifications
 * @param {{categoryId: number}} props
 * @param {*} event
 * @param {*} api
 * @returns 
 */
async function saveCategory(props, event, api) {
  const category = await categoryService.getCategory(api, props.categoryId);
  let errors = checkCategory(category);
  if (errors.length > 0) {
    console.error('Errors', errors);
    category.errors = errors;
  }
  else {
    // apply all modifications
    console.log('Save modifications', category.modifications);
    category.modifications.forEach(m => {
      switch (m.property) {
        case 'name':
        case 'description':
          category[m.property] = m.data;
          break;
        case 'fields':
          switch (m.action) {
            case 'add':
              const f = m.data;
              f.id = category.fields.length;
              category.fields.push(f);
              break;
            default:
              throw new Error(`Not managed action '${m.action}' on fields`);
          }
          break;
        default:
          throw new Error(`Not managed modification on property '${m.property}'`);
      }
    });
    category.ready = true;
    category.modifications = [];
    category.errors = [];
  }
  await categoryService.updateCategory(api, category);
  return navigationService.popState(api);
}

function checkCategory(category) {
  console.log('modifications', category.modifications);
  let errors = [];
  let name = category.name;
  let modification = category.modifications.find(m => m.property == 'name');
  if (modification)
    name = modification.data;
  if (!name)
    errors.push({ message: "The category must have a name", target: "name" });

  if (category.fields.length + category.modifications.filter(m => m.action == 'add' && m.property == 'fields').length == 0)
    errors.push({ message: "The category must have at least one field", target: "fields" });
  errors.push.apply(errors, category.modifications.filter(m => m.action == 'add' && m.property == 'fields').flatMap(checkField));
  return errors;
}

function checkField(field, pos) {
  let errors = [];
  if (!field.data.name)
    errors.push({ message: "The field must have a name", target: `fields.${field.id}.name` });
  return errors;
}

module.exports = {
  createCategory,
  setCategoryProperty,
  addCategoryField,
  removeCategoryField,
  setCategoryFieldName,
  setCategoryFieldUnit,
  saveCategory
}