import webpack from 'webpack';
import validate from 'webpack-validator';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
//import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import glob from 'glob';
import fs from 'fs';
import yaml from 'js-yaml';
import fm from 'front-matter';
import RSS from 'rss';

function convert_path(markdown_path) {
  return markdown_path.replace(/^src\//, '').replace(/md$/, 'html');
}

function generate_html_plugin(markdown_path) {
  const output = convert_path(markdown_path);
  return new HtmlWebpackPlugin({
    inject: 'head',
    filename: output,
    template: markdown_path,
  });
}

const markdown_paths = glob.sync('src/**/*.md').reverse();
const html_plugins = markdown_paths.map(generate_html_plugin);
const blog_config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
const post_list = markdown_paths
  .filter(p => p !== 'src/index.md')
  .map((p) => {
    const result = {
      path: convert_path(p),
      data() {
        return fm(fs.readFileSync(p, 'utf-8'));
      },
    };
    return result;
  });

const blog_root = path.join(blog_config.base_url, blog_config.relative_root);
function resolve_to_url(relative_path) {
  return path.join(blog_root, relative_path);
}

Promise.resolve(new RSS({
  title: blog_config.blog_title,
  description: blog_config.description,
  feed_url: path.join(blog_root, './atom.xml'),
  site_url: blog_root,
}))
.then((feed) => {
  post_list.slice(0, blog_config.limit).forEach((post) => {
    const { attributes: metadata, body: content } = post.data();
    feed.item({
      title: metadata.title,
      description: metadata.description || content,
      url: resolve_to_url(post.path),
      categories: metadata.categories,
      date: metadata.date,
    });
  });
  fs.writeFile('dist/atom.xml', feed.xml(), 'utf8', (err) => {
    if (err) throw err;
  });
})
.catch((err) => { console.log(err); });

const config = {
  entry: {
    'js/app': path.resolve(__dirname, './src/js/app.js'),
  },
  output: {
    publicPath: blog_config.relative_root,
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.md$/, loader: 'html-loader!nemui-loader!front-matter-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=10000' },
    ],
  },
  plugins: [
    ...html_plugins,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ],
  resolveLoader: {
    alias: {
      'nemui-loader': path.resolve(__dirname, './nemui-loader'),
    },
  },
  nemuiLoader: {
    blog_config,
    post_list,
    template_path: './src/templates/',
  },
};

//if (process.env.NODE_ENV === 'production') {
//  config.plugins.push(new FaviconsWebpackPlugin({
//      logo: path.resolve(__dirname, 'src/img/favicon.png'),
//  }));
//}

module.exports = validate(config, {
  schemaExtension: validate.Joi.object({
    nemuiLoader: validate.Joi.any(),
  }),
});
