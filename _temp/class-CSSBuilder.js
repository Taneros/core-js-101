class CSSBuilder {
  constructor() {
    this.stringifyArr = [];
    this.order = [];
    this.orderInfo = {
      element: 100000,
      id: 10000,
      class: 1000,
      attribute: 100,
      pseudoClass: 10,
      pseudoElement: 1,
    };
    this.elArr = [];
    this.idArr = [];
    this.clArr = [];
    this.attrArr = [];
    this.psClArr = [];
    this.psElArr = [];
  }

  element(value) {
    this.stringifyArr.push(value);
    this.elArr.push(value);
    this.checkMoreThanOnce(this.elArr);
    this.order.push(this.orderInfo.element);
    this.checkOrder(this.orderInfo.element);
    return this; // ?
  }

  id(value) {
    this.stringifyArr.push(`#${value}`);
    this.idArr.push(`#${value}`);
    this.order.push(this.orderInfo.id);
    this.checkMoreThanOnce(this.idArr);
    this.checkOrder(this.orderInfo.id);
    return this;
  }

  class(value) {
    this.stringifyArr.push(`.${value}`);
    this.clArr.push(`.${value}`);
    this.order.push(this.orderInfo.class);
    this.checkOrder(this.orderInfo.class);
    return this;
  }

  attr(value) {
    this.stringifyArr.push(`[${value}]`);
    this.attrArr.push(`[${value}]`);
    this.order.push(this.orderInfo.attribute);
    this.checkOrder(this.orderInfo.attribute);
    return this;
  }

  pseudoClass(value) {
    this.stringifyArr.push(`:${value}`);
    this.psClArr.push(`:${value}`);
    this.order.push(this.orderInfo.pseudoClass);
    this.checkOrder(this.orderInfo.pseudoClass);
    return this;
  }

  pseudoElement(value) {
    this.stringifyArr.push(`::${value}`);
    this.psElArr.push(`::${value}`);
    this.order.push(this.orderInfo.pseudoElement);
    this.checkMoreThanOnce(this.psElArr);
    this.checkOrder(this.orderInfo.pseudoElement);
    return this;
  }

  stringify() {
    return this.stringifyArr.join('');
  }

  checkMoreThanOnce(obj) {
    if (obj.length > 1) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    return this;
  }

  checkOrder(selector) {
    if (this.order !== 0 && selector > this.order[this.order.length - 2]) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    return this;
  }

  combine(selector1, combinator, selector2) {
    this.stringifyArr.push(selector1.stringify());
    this.stringifyArr.push(` ${combinator} `);
    this.stringifyArr.push(selector2.stringify());
    return this;
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CSSBuilder().element(value);
  },

  id(value) {
    return new CSSBuilder().id(value);
  },

  class(value) {
    return new CSSBuilder().class(value);
  },

  attr(value) {
    return new CSSBuilder().attr(value);
  },

  pseudoClass(value) {
    return new CSSBuilder().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CSSBuilder().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    return new CSSBuilder().combine(selector1, combinator, selector2);
  },
  stringify() {
    return new CSSBuilder().stringify();
  },
};

const builder = cssSelectorBuilder;

// builder.element('div')
// builder.stringify()

// builder.element('div').stringify() // ?
// builder.element('div').id('id').stringify() // ?
// builder.element('div').id('id').class('yello').stringify() // ?
// builder.element('div').id('id').class('yello').pseudoClass('pseudoclass').stringify(); // ?
// builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() //?

// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?
// builder.combine(builder.element('p').pseudoClass('focus'), '>', builder.element('a').attr('href$=".png"')).stringify() //?
// builder.combine(builder.element('p').id('introduction'), '~', builder.element('img').attr('href$=".png"')).stringify() //?

// builder.element('table').element('div') //?
// builder.id('id1').id('id2'); //?
// builder.pseudoElement('after').pseudoElement('before')

// builder.element('a').class('class1').stringify(); //?
// builder.element('a').class('class1').class('class2').stringify(); //?

// *** MORE THAN ONCE ***
// builder.element('div').element('a'); //?
// builder.id('div').id('a'); //?
// builder.pseudoElement('div').pseudoElement('a'); //?

// *** NO ERROR;
// builder.class('draggable').class('animated'); //?
// builder.attr('href').attr('title') //?
// builder.pseudoClass('invalid').pseudoClass('focus'); //?

// *** CHECK ORDER ***

// builder.id('id').element('div'); //?
// builder.class('main').id('id'); //?
// builder.attr('href').class('download-link') //?
// builder.pseudoClass('hover').attr('title') //?
// builder.pseudoElement('after').pseudoClass('valid') //?
// builder.pseudoElement('after').id('id') //?

builder.pseudoElement('after').id('hey'); //?
