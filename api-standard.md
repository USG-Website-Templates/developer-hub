---
layout: default
title: API Stamdard
nav: api-standard
---


# API Standard for Fiscal Service

### 1. Overview
	
This guide documents the framework used to develop APIs for Fiscal Service.  The framework should be used by the Bureau of the Fiscal Service for all public-facing APIs.  This provides consistency to the public user and allows APIs to be consolidated into a common portal. This version (v.1) contains elements that are still under development and may be subject to change as Fiscal Service continues to evaluate use of APIs.

### 2. API Framework

The API framework is used to define the layout of the URL, input parameters, and the response.  The framework defined within this document provides a consistent experience for the Fiscal Service API user.

### 2.1 URL Layout and Taxonomy
The URLs should be formatted with all characters in lower case and separated by underscores (e.g. fiscal_service).  All endpoints will be singular case.  All requests will be HTTP GET requests.  The URL of an API is broken down into the following components:

Organization: The organization component of the API URL reflects the bureau that is creating the API.

`(e.g. https://api.transparency.treasury.gov/services/api/fiscal_service)`

Version: Integer version number for the release of the API.  This is only changed when a revision will affect the underlying behavior of the request/response.Backward compatible changes will not result in a new version number.  APIs may incorporate a ‘default version’ that automatically uses the newest version of the API if none is specified.

`(e.g. https://api.transparency.treasury.gov/services/api/fiscal_service/v1)`

Subject Area: The subject area represents the business area within the organization for the API.  The subject areas, as defined for the API,  for the Fiscal Service are:

1. 	debt
2. 	payments
3.	collections
4.	accounting
5.	securities
	
`(e.g. https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt)`

Topic/Sub Topic: After the subject area the API endpoint can end with a topic or have a number of sub topics.  The topic references the specific set of data within the hierarchy that the user is looking to query.

`(e.g. https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror)`

or 

`https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_collection_delinquent_debt)`

### 2.2 Input Parameters

API input parameters are designed with the end user in mind.  They are structured for consistency across APIs.  The parameters are separated into the following:  fields, filter, sorting, query (future release), pretty print (future release), format, and pagination.

### 2.2.1 Fields

1.	Definition:  Field parameter accepts a comma separated list of field names that the user wants to be returned in the response.
2. 	Parameter: fields=
3.	Accepts: Valid field name
4.	Required:  No
5.	Default Value: Default to all fields if not provided
6. 	Example: 
[https://api.transparency.treasury.gov/services/api/.../delinquent_debt?fields=funding_type_id,delinquency_rate_amount,debt_by_category_count](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/delinquent_debt?fields=funding_type_id,delinquency_rate_amount,debt_by_category_count).


### 2.2.2 Filters

1.	Definition: Filter is used to apply logic criteria to each field if necessary. 
2. 	Parameter: fields=
3.	Accepts: Valid comma separated list of fields and filter criteria. 
	1.	Filter criteria is as follows:
		1.	lt = less than
		2.	gt = greater than:
		3.	lte = less than or equal to
		4.	gte = greater than or equal to
		5.	eq = equal to
		6.	in = in
			1.	Usage
				1.	filter=reporting_fiscal_year:in:(2007,2008,2009,2010)
		7.	Required:  No
		8.	Default Value: Default to all fields and all data if not provided
		9.	Example of Request including Filter Properties:
			[https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/delinquent_debt?filter=funding_type_id:eq:202](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/delinquent_debt?filter=funding_type_id:eq:202).
			
### 2.2.3 Sorting

1.	Definition:  Field parameter accepts a comma separated list of field names for how the user wants to sort the response.
2.	Parameter: sort=
	1.	– will be used to do descending sort.
	2.	Accepts: Valid fields name
	3.	Required:  No
	4.	Default Value: Default sort will be controlled by the API
	5.	Example: [https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?sort=funding_type_id](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?sort=funding_type_id).

### 2.2.4 Pretty Print (Planned for Future Release)

1.	Definition:  Pretty print will put carriage returns in the json response so that it can be 		easily read by a human.
2.	Parameter: pretty_print
3.	Accepts: yes/no
4.	Required:  No
5.	Default Value: Default to no response is not pretty print
6.	Example: [https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?pretty_print=yes](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?pretty_print=yes).

### 2.2.5 Format

1.	Definition:  Format is used to define the output method for the response.
2.	Parameter: format=
3.	Accepts: xml, json, csv
4.	Required:  No
5.	Default Value: Default to json
6.	Example: [https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?format=json](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?format=json). 

### 2.2.6 Pagination (limit/offset)

1.	Definition:  Limit will set the number of rows that are returned in a request and offset will set the starting point of the pagination.
2.	Parameter: offset=0,limit=100
3.	Accepts: Both accept an integer
4.	Required:  No
5.	Default Value: Default to offset of 0 and limit of 100
6.	Example: [https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?limit=100&offset=100](https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?limit=100&offset=100).

### 2.2.7 Query (Planned for Future Release) 

1.	Definition:  Query parameter is a free form text search in all of the fields of the response.
2.	Parameter: q=
3.	Required:  No
4.	Accepts: Text
5.	Default Value: Default to no query, all rows will be returned.

*	Example: https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?q=tror

### 2.3 Response

The response will be formatted according to the format input parameter specified above and will be json, xml or csv.  The response will be utf-8 and will have gzip support. 

Response Example:

<pre>
	{
		"data": [{
			"field": "value",
			"field": "value",
			"field": "value",
			"field": "value",
			"field": "value"
		}],
		"meta": {
			"count": "1",
			"labels": {
				"field": "Field Name In Title Case",
				"field": "Field Name In Title Case",
				"field": "Field Name In Title Case",
				"field": "Field Name In Title Case",
				"field": "Field Name In Title Case"
			}
		}
	}
</pre>

### 2.3.1 Granularity

Response will be constructed to include a single granularity that can be rolled up using a data grouping (i.e. sum, avg, max, min).

### 2.3.2 Datatypes

All fields in a response will be treated as strings and enclosed in double quotes.

### 2.3.3 Response Codes

The following response codes may be returned:

1.	200 OK:  Response to a successful GET.
2.	304 Not Modified:  Cached response.
3.	400 Bad Request:  Request was malformed.
4.	403 Forbidden:  API Key is not valid.
5.	404 Not Found: When a non-existent resource is requested.
6.	405 Method Not Allowed:  Attempting anything other than a GET.
7.	429 Too Many Requests:  Failed due to rate limiting.

### 2.3.4 Envelope

The response will default to json and will include an envelope by default.	

Example:
<pre>
	{
		… response data …
	}
</pre>

### 2.3.5 Meta Object

The meta object provides metadata around the result payload.  The object will contain the following:

1.	count:  Record count for the response.
2.	labels:  Mapping from result field to logical field names.


### 2.3.6 Data Object

It is the section of the response where the actual data will be returned. 

### 2.3.7 Error Object

If something goes wrong during the process of creating the API response, an error object will be returned to the user.  The object will contain the following information:

1.	title:   The error message
2.	detail:  The error description

Example response:

<pre>
	{
		"error": "Error Name",
		"message": "Explanation – if available"
	}
</pre>

### 2.3.8 Pagination Header

The pagination header will contain the Link: header

1.	Definition:  The pagination header will contain a link header that, as specified in RFC 5988, 6585,  allowing user to navigate pagination just using the API
2.	Header:
	1.	Link: ```<url first>```; rel=”first”, ```<url prev>```; rel=”prev”; ```<url  next>```;rel=”next”;```<url last>```;rel=”last”

### 2.4 API Documentation (RAML)

Summary listing of all available API endpoints: 

*	services/api/docs/api.raml

Detail endpoint documentation with json schema (works for any endpoint with .raml): 

*	services/api/fiscal_service/v1/debt/top/state_programs.raml

Treasury Securities:

*	[http://www.treasurydirect.gov/webapis/webapisecurities.htm](http://www.treasurydirect.gov/webapis/webapisecurities.htm).

Debt Information:

*	[http://www.treasurydirect.gov/webapis/webapisdebt.htm](http://www.treasurydirect.gov/webapis/webapisdebt.htm).	


# Appendices - Glossary

Included is a list of acronyms, design patterns and developer tools commonly referred to in this document.

**API:** Application Program Interface. Programming Interfaces that enable software to interact with other software through exposed functionality.

**API Key:** An authorization code passed into an API request using a parameter to identify the requester. 

**Authentication:** Identifying the user of the API. 

**Cache:** A collection of responses that are reused by the client to improve performance.

**CSV:** comma-separated values. A file type that stores tabular data (numbers and text) in plain text. Each line of the file is a data record. Each record consists of one or more fields, separated by commas. 

**GET:** The HTTP method for getting resources from a RESTful API

**GZIP:**  GNU Zip. A file format and a software application used for file compression and decompression.

**HTTP:** Hypertext Transfer Protocol is how websites and APIs communicate over the internet.

**JSON:**  Javascript Object Notation is a data format commonly used for APIs requests  parameters and responses.

**Meta:** An underlying definition or description.

**Metadata:** Summarizes basic information about data, which can make finding and working with particular instances of data easier. 

**Parameter:**  An argument sent to the API which helps define the request and expected response. 

**Python:** A high-level general-purpose programming language.

**RAML:** RESTful API Modeling Language. Used to describe RESTful APIs

**REST:**  Representational state transfer is an architectural pattern for interacting with resources via HTTP methods.

**URL:** Uniform Resource Locator. Used to reference an address to a resource on the Internet. 

**Web service:** Web Service is used to describe an API that is accessible over the internet through HTTP.

**XML:**  Extensible markup language is a format that is used to describe documents and data.

**YAML:**  Human-readable data serialization format designed for human readability and interaction with scripting language such as Perl and Python. 
