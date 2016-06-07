'use strict'

ramlCode.data.workingOffline = true;

ramlCode.methods.startRamlDocumentor = function(){
	var base;

	function callback(response){
		var baseData = ramlCode.methods.baseMasterObj.buildBaseArray(response),
			unflattenData = ramlCode.methods.baseMasterObj.unflatten(baseData);

		ramlCode.methods.recurseStuff(unflattenData);
	}

	if(ramlCode.data.workingOffline){
		console.log('static data');
		ramlCode.methods.getRaml('./static/js/apiDocumentation/ramlFiles/ramlApi.raml', callback);
	} else{
		base = '';
		console.log('live using ', base);
		// starter url
		// we dont want to commit this url to github
		ramlCode.methods.getRaml(base, callback);
	}
}

ramlCode.methods.recurseStuff = function(output){
	var ramlDiv,
		html;

	html = ramlCode.methods.recurseTreeStarter(output, '');

	ramlDiv = document.querySelectorAll('.raml-tree');

	ramlDiv[0].innerHTML = html;

	ramlCode.methods.addEventsToDomElements();

	ramlCode.methods.startAsyncGetRequestsForFields();
}

ramlCode.methods.openApiUrl = function(event){
	if(event.target.dataset.absUrl){
		window.open(event.target.dataset.absUrl);
	}
}

ramlCode.methods.toggleExpandAllCollapseAll = function(event){
	ramlCode.methods.toggleAllCheckboxes(event.target.dataset.expandCollapseType);
}

ramlCode.methods.toggleAllCheckboxes = function(toggleType){
	var checkboxes, 
		i,
		checkbox,
		checked;

	checked = (toggleType === 'expand') ? true: false;

	checkboxes = document.getElementsByClassName('expand-collapse-checkbox');
	for (i=0; i < checkboxes.length; i++){
		checkbox = checkboxes[i];
		checkbox.checked = checked;
	}
}

ramlCode.methods.addEventsToDomElements = function(){
	var tryItOutButtons,
		// ramlButtons,
		expandCollapse,
		i,
		button,
		link;

	tryItOutButtons = document.getElementsByClassName('try-it-out-button');
	expandCollapse = document.getElementsByClassName('expand-collapse');

	for (i=0; i < tryItOutButtons.length; i++){
		button = tryItOutButtons[i];
		button.removeEventListener('click', ramlCode.methods.openApiUrl, false);
		button.addEventListener('click', ramlCode.methods.openApiUrl, false);
	}

	for (i=0; i < expandCollapse.length; i++){
		link = expandCollapse[i];
		link.removeEventListener('click', ramlCode.methods.toggleExpandAllCollapseAll, false);
		link.addEventListener('click', ramlCode.methods.toggleExpandAllCollapseAll, false);
	}
}

ramlCode.methods.toggleLoader = function(divElement, toggleOn){
	var i,
		childNode,
		childNodes;

	if (toggleOn){
		divElement.classList.add('loader-container');
		divElement.innerHTML += '<div class="loader"><span>{status:</span><span> Loading}</span></div>';
	} else{
		divElement.classList.remove('loader-container');
		childNodes = divElement.getElementsByClassName('loader');
		for (i=0; i < childNodes.length; i++){
			childNode = childNodes[i];
			divElement.removeChild(childNode);
		}
	}
}

ramlCode.methods.startAsyncGetRequestsForFields = function(){
	var endpointContainers,
		url,
		i;

	// find elements by class
	endpointContainers = document.getElementsByClassName('endpoint-container');
	// iterate them
	for (i=0; i < endpointContainers.length; i++){
		var endpointContainer = endpointContainers[i];
		
		// turn on loader
		ramlCode.methods.toggleLoader(endpointContainer, true);
		url = endpointContainer.dataset.ramlUrl;

		function ElemStore(elem){
			var element; 

			if (elem){
				element = elem;
			}

			function set(element){
				element = element;
			}

			function callback(response){
				ramlCode.methods.openRamlUrlCallback(response, element);
			}

			return {
				set: set,
				callback: callback
			}
		}

		function callbackFactory() {};

		callbackFactory.prototype.storeElem = ElemStore;

		var newCallbackFn = new callbackFactory();
		// start asysc on each element
		if (ramlCode.data.workingOffline){
			url = './static/js/apiDocumentation/ramlFiles/' + ramlCode.data.staticOffLineData.prodOffLineData[url];
			ramlCode.methods.getRaml(url, newCallbackFn.storeElem(endpointContainer).callback);

		} else{
			ramlCode.methods.getRaml(url, newCallbackFn.storeElem(endpointContainer).callback);
		}
		
	}
}

ramlCode.methods.openRamlUrlCallback = function(response, element){
	var baseData = ramlCode.methods.baseMasterObj.buildBaseArray(response),
		unflattenData = ramlCode.methods.baseMasterObj.unflatten(baseData),
		html,
		foundItSchema,
		fountItQueryParameters,
		elementParent,
		elementParameterTable;

	// find fields and add them to the response
	foundItSchema = ramlCode.methods.findNode('schema', unflattenData[5]);
	fountItQueryParameters = ramlCode.methods.findNode('queryParameters', unflattenData[5]);

	if (foundItSchema){
		ramlCode.methods.buildFieldTable(foundItSchema.value.properties, element);
	}

	if (fountItQueryParameters){
		// need to find the parameter table element
		elementParent = element.parentElement.parentElement;
		elementParameterTable = elementParent.querySelectorAll('dd > div.parameter-definition-container');

		ramlCode.methods.buildParameterTable(fountItQueryParameters, elementParameterTable);
	}

	ramlCode.methods.checkDescriptionLibrary();
	// ramlCode.methods.addEventsToCopyElements(element.dataset.ramlUrl);

	ramlCode.methods.toggleLoader(element);
}	

ramlCode.methods.buildFieldTable = function(obj, elem){
	// convert to array, 
	// sort alphabetically
	// build html
	// insert into element
	var key,
		holder = [],
		html = '<table class="available-fields-table">',
		subList = '';

	for (key in obj){
		obj[key].key = key;
		holder.push(obj[key]);
	}

	html += '<thead><tr><th>Field</th><th>Description</th><th>Type</th><th>Format</th></tr></thead>';

	holder.sort(function(a,b){
		if (a.description > b.description){
			return 1;
		} 
		if (a.description < b.description){
			return -1;
		}
		return 0;
	}).forEach(function(row){
		html += '<tr>';
		html += '<td>' + row.key + '</td>';
		html += '<td>' + row.description + '</td>';
		html += '<td>' + row.type + '</td>';
		html += '<td>' + row.format + '</td>';
		html += '</r>';
	});

	html += '</table>';

	elem.innerHTML += html;
}	

ramlCode.methods.buildParameterTable = function(obj, elem){
	var key,
		html = '<table class="parameter-definition-table">',
		i,
		param,
		holder = [],
		paramObj = {},
		propKeys,
		rowObj;

	// reorgainize data
	for (i=0; i < obj.children.length; i++){
		param = obj.children[i];
		paramObj[param.key] = {'paramName': param.key};

		param.children.forEach(function(row){
			paramObj[param.key][row.key] = row.value;
		}) 
	}

	propKeys = Object.keys(paramObj);

	//sort data
	propKeys.sort(function(a,b){
		if (a > b){
			return 1;
		}
		if (a < b){
			return -1;
		}
		return 0;

	}).forEach(function(prop){
		rowObj = paramObj[prop];
		html += '<tr><td>' + rowObj.paramName + '</td></tr>';
		html += '<tr><td><dl>';
		html += '<dt>' + rowObj.description + '</dt><dd>';
		html += '<br><strong>Display Name</strong>: ' +  rowObj.displayName;
		html += '<br><strong>Type</strong>: ' + rowObj.type;
		html += '<br><strong>Required</strong>: ' + rowObj.required;
		html += '<br><strong>Default</strong>: ' + ((rowObj.default) ? rowObj.default: 'None');
		html += '<br><strong>Example</strong>: ' + rowObj.example;
		html += '</dd></dl></td></tr>';
	})

	html += '</html>';

	elem[0].innerHTML += html;
}

ramlCode.methods.findNode = function(id, currentNode) {
    var i,
        currentChild,
        result;

    if (id == currentNode.key) {
        return currentNode;
    } else {
        for (i = 0; i < currentNode.children.length; i++) {
            currentChild = currentNode.children[i];

            // Search in the current child
            result = ramlCode.methods.findNode(id, currentChild);

            // Return the result if the node has been found
            if (result !== false) {
                return result;
            }
        }
        // The node has not been found and we have no more options
        return false;
    }
}

ramlCode.methods.checkDescriptionLibrary = function(){
	// select all the descriptions
	// iterate them
	// see if there are any matches in our description library
	// update description

	var descriptions,
		i,
		desc,
		descVal,
		statLib,
		descSubSelection,
		descKey,
		staticDescLookup;

	staticDescLookup = ramlCode.methods.staticDataStore.get();

	if (!staticDescLookup.staticApiDescriptions){
		return ;
	}

	descriptions = document.querySelectorAll('[data-key="description"]');

	for (i=0; i < descriptions.length; i++){
		desc = descriptions[i];
		descSubSelection = desc.querySelectorAll('dd');
		descKey = descSubSelection[0].innerHTML;


		if (staticDescLookup.staticApiDescriptions[descKey]){
			descSubSelection[0].innerHTML = staticDescLookup.staticApiDescriptions[descKey];
		}
	}
}
