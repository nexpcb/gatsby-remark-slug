"use strict";

const visit = require('unist-util-visit');

const slugs = require('github-slugger')();

const toString = require('mdast-util-to-string');

module.exports = ({
  markdownAST
}, pluginOptions = {}) => {
  slugs.reset();
  visit(markdownAST, 'heading', node => {
    const headingTag = `h${node.depth}`;
    const headingText = toString(node);
    const headingSlug = slugs.slug(headingText);
    node.type = 'html';
    node.value = `<${headingTag} id="${headingSlug}">${headingText}</${headingTag}>`;
  });
  return markdownAST;
};