const path = require('path');
const highlight = require('highlight.js');
const pug = require('pug');
const d = require('pug-dependency')('src/templates/**/*.pug');
const loaderUtils = require('loader-utils');


const md = require('markdown-it')({
  html: true,
  highlight: function _highlight(str, lang) {
    if (lang && highlight.getLanguage(lang)) {
      return highlight.highlight(lang, str).value;
    }
    return '';
  },
}).use(require('markdown-it-footnote'));

module.exports = function nemui(json_string) {
  const loader_config = loaderUtils.getLoaderConfig(this, 'nemuiLoader');
  const json = JSON.parse(json_string);
  const metadata = json.attributes || {};
//  const callback = this.async();

  const template_path = path.resolve(loader_config.template_path, `${metadata.document_type}.pug`);

  const self = this;

  d.file_changed(template_path);
  this.addDependency(template_path);
  this.cacheable();
  d.find_dependencies(template_path).forEach((dep) => {
    self.addDependency(dep);
  });

  const locals = {
    metadata,
    content: md.render(json.body),
    config: loader_config.blog_config,
    post_list: loader_config.post_list,
    path_join: path.join,
  };
  return pug.renderFile(template_path, locals);
};

