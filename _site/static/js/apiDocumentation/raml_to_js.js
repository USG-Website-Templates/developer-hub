'use strict';
ramlCode.methods.baseMasterObj = (function () {
  function get() {
    this.uniqueId += 1;
    return this.uniqueId;
  }

  function uniqueIdFactory() {
    this.uniqueId = -1;
    this.recentLevelIds = {0: 0};
  }

  uniqueIdFactory.prototype.get = get;

  var idFactory = new uniqueIdFactory();

  // this function returns a flattened array, one item for each line in raml document
  // it is dirty, but so is parsing text in the UI
  function buildBaseArray(rawData) {
    var i,
        startBuilding,
        output = [],
        thisLinePreSpaces,
        thisLine,
        arr,
        lineList,
        thisKey,
        thisValue,
        ramlArray = rawData.split("\n"),
        level,
        appJson,
        readyToConcatLines,
        concatJsonString = '',
        schemaLevel,
        trimmedString,
        schemaRow;

    for (i = 0; i < ramlArray.length; i++) {

      var thisLine = ramlArray[i].toString(),
          newRow,
          uniqueId = idFactory.get();

      if (!thisLine) {
        continue
      }

      if (startBuilding) {
        thisLinePreSpaces = thisLine.match(/^\s*/)[0].length;
        level = (thisLinePreSpaces === 0) ? 1 : (thisLinePreSpaces / 2) + 1;
        thisLine = thisLine.replace(/\r?\n|\r/g, '');
        arr = thisLine.split(':');
        lineList = arr.splice(0, 1);
        lineList.push(arr.join(':'));
        thisKey = lineList[0].trim();
        thisValue = lineList[1].trim();
        idFactory.recentLevelIds[level] = uniqueId;
        newRow = {
          id: uniqueId,
          parentid: idFactory.recentLevelIds[level - 1],
          level: level,
          key: thisKey,
          value: thisValue,
          children: null
        };

        if (thisKey === 'application/json') {
          appJson = true;
        }

        if (level < schemaLevel) {
          // push the json string / finsished parsing json
          schemaRow.value = JSON.parse(concatJsonString);
          output.push(schemaRow);
          appJson = false;
          readyToConcatLines = false;
          schemaLevel = null;
          schemaRow = null;
        }

        if (appJson && readyToConcatLines) {
          trimmedString = thisLine.trim();

          if (trimmedString === "}") {
            if (concatJsonString[concatJsonString.length - 1] === ',') {
              concatJsonString = concatJsonString.substring(0, concatJsonString.length - 1);
            }
          }

          concatJsonString += trimmedString;
        } else if (thisKey === 'schema' && thisValue === '|') {
          readyToConcatLines = true;
          schemaLevel = level;
          schemaRow = newRow;

        }
        else {
          output.push(newRow);
        }
      }

      if (thisLine.match(/---/g)) {
        startBuilding = true;
        output.push({
          id: uniqueId,
          parentid: idFactory.recentLevelIds[0],
          children: null,
          key: 'RESTful API Modeling Language (RAML)',
          value: '<pre>/services/api/docs/api.raml</pre>'
        });
      }
    }

    return output
  }

  function unflatten(arr) {
    var tree = [],
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {

      arrElem = arr[i];
      if (!arrElem.key && !arrElem.value) {
        continue
      }
      mappedArr[arrElem.id] = arrElem;
      mappedArr[arrElem.id]['children'] = [];
    }

    for (var id in mappedArr) {
      if (mappedArr.hasOwnProperty(id)) {
        mappedElem = mappedArr[id];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parentid) {

          mappedArr[mappedElem['parentid']]['children'].push(mappedElem);
        }
        // If the element is at the root level, add it to first level elements array.
        else {
          tree.push(mappedElem);
        }
      }
    }
    return tree;
  }

  function flatten(data) {
    var result = {};

    function recurse(cur, prop) {
      if (Object(cur) !== cur) {
        result[prop] = cur;
      } else if (Array.isArray(cur)) {
        for (var i = 0, l = cur.length; i < l; i++) {
          recurse(cur[i], prop + "[" + i + "]");
          if (l == 0) {
            result[prop] = [];
          }
        }
      } else {
        var isEmpty = true;
        for (var p in cur) {
          isEmpty = false;
          recurse(cur[p], prop ? prop + "." + p : p);
        }
        if (isEmpty && prop) {
          result[prop] = {};
        }
      }
    }

    recurse(data, "");
    return result;
  }

  return {
    buildBaseArray: buildBaseArray,
    unflatten: unflatten,
    flatten: flatten
  }
})();