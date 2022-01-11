const cssSelectorBuilder = {
  stringify_: [],
  element_: null,
  id_: null,
  class_: null,
  attr_: null,
  pseudoClass_: null,
  pseudoElement_: null,
  combinator_: [],
  stringify() {
    return this.stringify_.join('');
  },

  element(value) {
    this.element_ = `${value}`;
    if (!this.combinator_.length) this.stringify_.push(this.element_);
    else if (this.combinator_.length) {
      this.stringify_.push(this.combinator_);
      this.stringify_.push(this.element_);
    }
    return this;
  },

  id(value) {
    this.id_ = `${value}`;
    this.stringify_.push(this.id_);
    return this;
  },

  class(value) {
    this.class_ = `.${value}`;
    this.stringify_.push(this.class_);
    return this;
  },

  attr(value) {
    this.attr_ = `[${value}]`;
    if (!this.combinator_.length) this.stringify_.push(this.attr_);
    else if (this.combinator_.length) {
      this.stringify_.push(this.combinator_);
      this.stringify_.push(this.attr_);
    }
    return this;
  },

  pseudoClass(value) {
    this.pseudoClass_ = `:${value}`;
    if (!this.combinator_.length) this.stringify_.push(this.pseudoClass_);
    else if (this.combinator_.length) {
      this.stringify_.push(this.combinator_);
      this.stringify_.push(this.pseudoClass_);
    }
    return this;
  },

  pseudoElement(value) {
    this.pseudoElement_ = `::${value}`;
    this.stringify_.push(this.pseudoElement_);
    return this;
  },

  combine(selector1, combinator, selector2) {
    this.combinator_.push(` ${combinator} `);
    this.combinator_; // ?
    return this;
  },
};

const builder = cssSelectorBuilder;

// builder.stringify()
// builder.element('div').stringify() //?
// builder.element('div').id('#hello').stringify() //?
// builder.element('div').id('#hello').class('yello').stringify() //?
// builder.element('div').id('#hello').class('yello').attr('href$=".png"').stringify() //?
// builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify() //?
// builder.element('p').pseudoClass('first-of-type').pseudoElement('first-letter').stringify() //?

builder.combine(builder.element('p').pseudoClass('focus'), '>', builder.element('a').attr('href$=".png"')).stringify();
// 'p:focus > a[href$=".png"]'
// builder.id('#my').stringify() //?
