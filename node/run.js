const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

ramlCode = {
  data: {
    staticApiDescriptions: {},
    staticRaml: {},
    staticOffLineData: {}
  },
  methods: {}
};

ramlCode.methods.getRaml = require('./substituteGet').localHttp;
const ramlToJs = require('../static/js/apiDocumentation/raml_to_js');
const ramlDocumentor = require('../static/js/apiDocumentation/ramlDocumentor');
const recurseTree = require('../static/js/apiDocumentation/recurseTree');
const staticData = require('../static/js/apiDocumentation/staticData');
let $html;

var base;

function callback(response) {
  var baseData = ramlCode.methods.baseMasterObj.buildBaseArray(response),
    unflattenData = ramlCode.methods.baseMasterObj.unflatten(baseData);

  //ramlCode.methods.recurseStuff(unflattenData);
  html = ramlCode.methods.recurseTreeStarter(unflattenData, '');
  $html = cheerio.load(html);
  $html('.endpoint-container').each(function(i, elm) {
    const _url = $html(this).attr('data-raml-url');
    const url = './static/js/apiDocumentation/ramlFiles/' + ramlCode.data.staticOffLineData.prodOffLineData[_url];

    const cb = function (response, element) {
      subRamlCallback(response, element, _url);
    };

    ramlCode.methods.getRaml(url, cb);
  });
}

function subRamlCallback(response, element, filePath) {
  var baseData = ramlCode.methods.baseMasterObj.buildBaseArray(response),
    unflattenData = ramlCode.methods.baseMasterObj.unflatten(baseData),
    foundItSchema,
    fountItQueryParameters,
    htmlTable;

  // find fields and add them to the response
  foundItSchema = ramlCode.methods.findNode('schema', unflattenData[5]);
  fountItQueryParameters = ramlCode.methods.findNode('queryParameters', unflattenData[5]);

  if (foundItSchema) {
    htmlTable = ramlCode.methods.fieldTableHtml(foundItSchema.value.properties);
    writeFile(htmlTable, filePath )
  }
}

function writeFile(content, fileName) {
  const _fn = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  const fn = _fn.replace('https___api_transparency_treasury_gov_services_api_fiscal_service_v1_', '');
  const fp = path.join('./htmlTableOutput', fn) + '.html';

  fs.writeFile(fp, content, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log(fp, "The file was saved!");
  });
}

if (ramlCode.data.workingOffline) {
  console.log('static data');
  ramlCode.methods.getRaml('./static/js/apiDocumentation/ramlFiles/cloudRamlApi.raml', callback);
} else {
  // we dont want to commit dev urls to github

  base = 'https://api.transparency.treasury.gov/services/api/docs/api.raml';
  console.log('live using ', base);
  // starter url
  ramlCode.methods.getRaml(base, callback);
}