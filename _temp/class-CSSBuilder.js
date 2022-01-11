class CSSBuilder {
  constructor() {
    this.stringifyArr = [];
    this.order = [0, 0, 0, 0, 0, 0];
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
    this.order[0] += 1;
    this.checkOrder(0);
    return this; // ?
  }

  id(value) {
    this.stringifyArr.push(`#${value}`);
    this.idArr.push(`#${value}`); //?
    this.order[1] = +1;
    this.checkMoreThanOnce(this.idArr);
    this.checkOrder(1);
    return this;
  }

  class(value) {
    this.stringifyArr.push(`.${value}`);
    this.clArr.push(`.${value}`);
    this.order[2] = +1;
    this.checkOrder(2);
    return this;
  }

  attr(value) {
    this.stringifyArr.push(`[${value}]`);
    this.attrArr.push(`[${value}]`);
    this.order[3] = +1;
    this.checkOrder(3);
    return this;
  }

  pseudoClass(value) {
    this.stringifyArr.push(`:${value}`);
    this.psClArr.push(`:${value}`);
    this.order[4] = +1;
    this.checkOrder(4);
    return this;
  }

  pseudoElement(value) {
    this.stringifyArr.push(`::${value}`);
    this.psElArr.push(`::${value}`);
    this.order[5] = +1;
    this.checkMoreThanOnce(this.psElArr);
    this.checkOrder(5);
    return this;
  }

  stringify() {
    return this.stringifyArr.join('');
  }

  checkMoreThanOnce(obj) {
    if (obj.length > 1) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    return this;
  }

  checkOrder(idx) {
    if (idx) {
      const num = this.order.slice(0, idx).reduce((acc, el) => acc + el);
      if (num === 0 && this.stringifyArr.length > 1) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    } else if (idx === 0) {
      const num = this.order.slice(1).reduce((acc, el) => acc + el);
      if (num > 0 && this.stringifyArr.length > 1) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
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
//
// builder.combine(builder.element('p').id('id'), '>', builder.element('a').class('class')).stringify(); // ?
// builder.combine(builder.element('p').pseudoClass('focus'), '>', builder.element('a').attr('href$=".png"')).stringify() //?
// builder.combine(builder.element('p').id('introduction'), '~', builder.element('img').attr('href$=".png"')).stringify() //?

// builder.element('table').element('div')
// builder.id('id1').id('id2'); //?
// builder.pseudoElement('after').pseudoElement('before')

// builder.element('a').class('class1'); //?
// builder.element('a').class('class1').class('class2').stringify(); //?

// builder.element('div').element('a').moreThanOnce //?
// builder.id('div').id('a').moreThanOnce; //?
// builder.pseudoElement('div').pseudoElement('a').moreThanOnce //?

// builder.class('draggable').class('animated');
// builder.attr('href').attr('title')
builder.pseudoClass('invalid').pseudoClass('focus');

// *** CHECK ORDER ***

// builder.id('id').element('div'); //?
// builder.class('main').id('id'); //?
// builder.attr('href').class('download-link') //?
// builder.pseudoClass('hover').attr('title') //?
// builder.pseudoElement('after').pseudoClass('valid') //?
// builder.pseudoElement('after').id('id') //?
// builder.id('id').pseudoElement('after').stringify(); //?
