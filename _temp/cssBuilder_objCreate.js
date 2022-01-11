const cssSelectorBuilder = {
  stringify() {
    return this.stringifyArr.join('');
  },

  moreThanOnce: [0, 0, 0],

  checkMoreThanOnce(obj, idx) {
    const newObj = obj;
    newObj.moreThanOnce[idx] += 1;
    if (newObj.moreThanOnce.includes(2)) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
  },

  // errorTextMoreThanOnce: 'Element, id and pseudo-element should not occur more then one time inside the selector',

  element(value) {
    const elObj = Object.create(this);
    elObj.stringifyArr = this.stringifyArr || [];
    elObj.stringifyArr.push(value);
    elObj.checkMoreThanOnce(elObj, 0);
    return elObj;
  },

  id(value) {
    const idObj = Object.create(this);
    idObj.stringifyArr = this.stringifyArr || [];
    idObj.stringifyArr.push(`#${value}`);
    idObj.checkMoreThanOnce(idObj, 1);
    return idObj;
  },

  class(value) {
    const clObj = Object.create(this);
    clObj.stringifyArr = this.stringifyArr || [];
    clObj.stringifyArr.push(`.${value}`);
    return clObj;
  },

  attr(value) {
    const attrObj = Object.create(this);
    attrObj.stringifyArr = this.stringifyArr || [];
    attrObj.stringifyArr.push(`[${value}]`);
    return attrObj;
  },

  pseudoClass(value) {
    const psObj = Object.create(this);
    psObj.stringifyArr = this.stringifyArr || [];
    psObj.stringifyArr.push(`:${value}`);
    return psObj;
  },

  pseudoElement(value) {
    const psElObj = Object.create(this);
    psElObj.stringifyArr = this.stringifyArr || [];
    psElObj.stringifyArr.push(`::${value}`);
    psElObj.checkMoreThanOnce(psElObj, 2);
    return psElObj;
  },

  combine(selector1, combinator, selector2) {
    const combObj = Object.create(this);
    combObj.combine = `${selector1.stringify()} ${combinator} ${selector2.stringify()}`;
    combObj.stringifyArr = this.stringifyArr || [];
    combObj.stringifyArr.push(combObj.combine);
    return combObj;
  },
};

const builder = cssSelectorBuilder;

// builder.element('div')//?
// builder.stringify() //?

// builder.element('div').stringify(); // ?
// builder.element('div').id('id').stringify(); // ?
// builder.element('div').id('id').class('yello').stringify(); // ?
// builder.element('div').id('id').class('yello').pseudoClass('pseudoclass').stringify(); // ?

// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?
// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?
// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?
// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?

// builder.element('a').class('class1'); //?
// builder.element('a').class('class1').class('class2').stringify(); //?

builder.element('div').element('a').moreThanOnce; //?
builder.id('div').id('a').moreThanOnce; //?
builder.pseudoElement('div').pseudoElement('a').moreThanOnce; //?
