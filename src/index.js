import { visit } from 'unist-util-visit';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';

const slugs = GithubSlugger();

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
