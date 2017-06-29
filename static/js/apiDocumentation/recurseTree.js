'use strict';
ramlCode.methods.recurseTreeStarter = function (arr, path) {
  var html = '',
      endpointLookup = {},
      baseUri,
      absUrl,
      validatedUrl,
      ramlUrl;

  recurseTree(arr, path);

  function recurseTree(arr, path) {
    var i,
        obj,
        urlPiece,
        tempPathArr,
        rowKey,
        rowId,
        rowValue,
        rowParentId,
        rowLevel,
        moreChildren,
        dtAttributes,
        labelAttributes,
        expandCollapseIcons,
        storage = [],
        notGetOrIs;

    html += '<ul>';

    for (i = 0; i < arr.length; i++) {
      // order of these statements is very important in this recursive function
      // please take care to maintain order

      urlPiece = false;
      obj = arr[i];

      moreChildren = (obj.children.length > 0) ? true : false;

      if (obj.key === 'is') {
        storage.push(obj);
        continue;
      }

      if (obj.key === 'baseUri') {
        baseUri = obj.value;
        baseUri = baseUri.replace(':33510', '');
      }

      if (obj.key[0] === '/' || obj.key === 'baseUri') {
        urlPiece = true;

        if (obj.key !== 'baseUri') {
          path = path + obj.key;
          endpointLookup[obj.key] = path;
        }
      }

      rowKey = (obj.key) ? ' data-key="' + obj.key + '"' : '';
      rowId = (obj.id) ? ' data-id="' + obj.id + '"' : '';
      rowParentId = (obj.parentid) ? ' data-parentid="' + obj.parentid + '"' : '';
      rowValue = (obj.value) ? ' data-row-value="' + obj.value + '"' : '';
      rowLevel = (obj.level) ? ' data-level="' + obj.level + '"' : '';

      dtAttributes = (urlPiece) ? ' class="part-of-url" data-icon="&#x002b" aria-hidden="hidden"' : ' class="not-part-of-url"';
      labelAttributes = (moreChildren) ? ' for="input-' + obj.id + '"' : '';
      expandCollapseIcons = (moreChildren) ? '<i class="fa fa-plus expand" aria-hidden="true"></i>' +
      '<i class="fa fa-minus collapse" aria-hidden="true"></i>' : '';

      // we know get is always the last property
      if (obj.key == 'get') {
        storage.push(obj);
        endpointConstruction();
        html += '</ul>';
      } else {
        html += '<li>';

        if (moreChildren) {
          // show hide levels with children
          html += '<input type="checkbox" class="expand-collapse-checkbox" hidden id="input-' + obj.id + '">';
        }
        //store stuff until we are done with this
        getDescriptionList();

        if (moreChildren) {
          recurseTree(obj.children, path);
        }

        if (i + 1 === arr.length) {
          // end of child array
          html += '</ul>';
        }

        html += '</li>';

        tempPathArr = path.split('/');

        if ('/' + tempPathArr[(tempPathArr.length - 1)] === ( obj.key)) {
          path = path.replace(obj.key, '');
        }
      }
    }

    function getDescriptionList() {
      html += '<dl ' + rowKey + rowId + rowParentId + rowValue + rowLevel + '>';

      if (obj.key) {
        html += '<dt' + dtAttributes + '>';
        html += '<label ' + labelAttributes + '>';
        html += expandCollapseIcons + ' ' + obj.key;
        html += '</label>';
        html += (urlPiece) ? '<a href="#page_top" class="back-to-top-link">Top</a>' : '';
        html += '</dt>';
      }

      if (obj.value) {
        html += '<dd>' + obj.value + '</dd>';
      }

      html += '</dl>';
    }

    function buildStoredProps(storage) {
      var response,
          implementationNotes = '<li><dl>',
          listOperations = '<li><dl>';

      listOperations += '<input type="checkbox" class="expand-collapse-checkbox operations" id="input-operations-' + obj.id + '"checked hidden>';
      listOperations += '<dt class="operations-heading">Operations <label for="input-operations-' + obj.id + '">show/hide operations</label> </dt>';
      listOperations += '<dd><table class="list-operations-table"><tbody>';

      storage.forEach(function (storedItem) {
        if (storedItem.key == 'get') {
          // dont judge - minimum viable product
          storedItem.children.forEach(function (child) {// responses
            if (child.key === 'responses') {
              listOperations += '<tr><td>' + storedItem.key + '</td></tr>';
              listOperations += '<tr><td><dl>';

              child.children.forEach(function (grandChild) {// http code
                listOperations += '<dt>response: ' + grandChild.key + '</dt>';

                grandChild.children.forEach(function (greatGrandChild) { // body
                  if (greatGrandChild.key === 'body') {

                    greatGrandChild.children.forEach(function (greatGreatGrandChild) {
                      listOperations += '<dd>' + greatGreatGrandChild.key + '</dd>';

                    })
                  }
                })
              });
              listOperations += '</dl></td></tr>';
            }
          })
        }
        // if post, delete, update, etc.
      });

      implementationNotes += '</dl></li>';
      listOperations += '</tbody></table></dd></dl></li>';

      storage.length = 0;

      response = implementationNotes + listOperations;

      return response;
    }

    function endpointConstruction() {
      // we add some extra tables to the dom here
      var newBase = baseUri.toString();
      if (newBase.indexOf('https') === -1 && newBase.indexOf('http') === -1) {
        newBase = 'https://' + newBase;
      }
      absUrl = newBase + path.toString();
      validatedUrl = urlValidatorFn(absUrl);
      ramlUrl = validatedUrl + '.raml';
      // add stored items first
      html += buildStoredProps(storage);

      html += '<li class="list-item-for-endpoint">';
      html += '<dl>';
      html += '<dt class="not-part-of-url">Base Endpoint<span class="button try-it-out-button" data-abs-url="' + absUrl + '"> <i class="fa fa-external-link" aria-hidden="true"></i> Try It Out!</span></dt>';
      html += '<dd><div class="url-copy-container">';
      html += '<div class="pre-container"><pre><span>' + absUrl + '</span></pre></div>';
      html += '</div></dd>';
      html += '<input type="checkbox" class="expand-collapse-checkbox available-fields" id="input-available-fields-' + obj.id + '"checked hidden>';
      html += '<dt class="available-fields-heading">Available Fields ';
      html += '<label for="input-available-fields-' + obj.id + '">show/hide fields</label>';
      html += '</dt>';
      html += '<dd><div class="endpoint-container" data-raml-url="' + ramlUrl + '"></div></dd>';
      html += '<input type="checkbox" class="expand-collapse-checkbox parameter-definition" id="input-parameter-definition-' + obj.id + '"checked hidden>';
      html += '<dt class="parameter-definition-heading">Query Parameters ';
      html += '<label for="input-parameter-definition-' + obj.id + '">show/hide parameters</label>';
      html += '<dd><div class="parameter-definition-container"></div></dd>';
      html += '</dl>';
      html += '</li>';
    }

    function urlValidatorFn(url) {
      return url;
    }
  }

  return html;
}