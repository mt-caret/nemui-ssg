#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');
const R = require('ramda');
const argv = require('minimist')(process.argv.slice(2));
const moment = require('moment');
const mkdirp = require('mkdirp');

if (argv._.length !== 2 || argv.help) {
  console.error(`
usage: new.js document_type slug [--dry-run] [modifications ...]
  `);
  process.exit();
}

const template_name = argv._[0];
const slug = argv._[1];
const reserved = ['_', 'dry-run'];
const modifications = R.reduce((obj, property_name) => (
  R.dissoc(property_name, obj)
), argv, reserved);
const now = moment();

const config = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
const template = R.merge(config.templates[template_name], {
  date: now.format(config.date_format),
  document_type: template_name,
});

const result_object = R.merge(template, modifications);
const output = `---\n${yaml.safeDump(result_object)}---`;
if (argv['dry-run']) {
  console.log(output);
} else {
  const dir = `src/${now.format('YYYY/MM/DD')}/`;
  const path = `${dir}${slug}.md`;
  if (fs.existsSync(path)) {
    console.error(`File '${path}' already exists! Exiting...`);
    process.exit();
  }
  mkdirp.sync(dir);
  fs.writeFileSync(path, output);
  console.log(`New ${template_name} created at '${path}'.`);
}
