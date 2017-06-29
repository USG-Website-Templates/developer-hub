---
layout: default
title: explore
nav: explore
---

## Access & Path   <a id="page_top"></a>

Each API below can be accessed through a base path, which should be added to the beginning of each call. The base access path for the FIR APIs is:

`https://api.transparency.treasury.gov/services/api/v1/`

The Individual requests are appended to the path, as in:

`https://api.transparency.treasury.gov/services/api/v1/registry/list?apiKey=DEMOKEY`  

The APIs available on transparency.treasury.gov include:

<!-- *	[Treasury Report on Receivables (TROR)](#tror) -->
<!-- *	[Treasury Offset Program (TOP)](#top) -->
*	[Revenue Collections Management (CIR)](#cir)
*	[Data Registry](#data)
<!-- * [Debt to Penny](#penny) -->
<!-- * [Gold Reserve](#gold) -->

<!-- <div id="tror" class="pageAnchor"></div>

##### Treasury Report on Receivables <a></a>


The Treasury's Report on Receivables and Debt Collection Activities (TROR) is the federal government’s primary means for collecting data on the status of non-tax receivables (delinquent and non-delinquent debt) owed to the United States.

###### Download TROR Data
Returns the TROR data set in CSV, JSON or XML format.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?pretty_print=no&limit=100&offset=0&apiKey=demoKey&format=csv`

Request Parameters

| Parameter | Format | Description |
| ------------- | -------------| -------------|
| apiKey | string | Your developer API key. |
| responseFormat | string | Format to receive the result content. Allowed values are json and xml, Default value is json. |

Constraints

* There are no business rule constraints for this service.

Output

* Output from this function is a JSON, XML or CSV file with the following example CSV data:
* <a target='blank' href='https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror?limit=100&apiKey=demoKey&format=csv'>Try it Out!</a>

Examples

* The following example would return the dataset in CSV format:
* `../debt/tror?limit=100&apiKey=demoKey&format=csv`

###### Query TROR Data
Returns selected TROR data.

Access Path

* Provides access to the Collections on Delinquent Debt data:
  * `../tror/collectionsondelinquentdebt`

* Provides access to Outstanding Receivables Data:
  * `../tror/Outstandingreceivables`

* Provides access to New Receivables data:
  * `../tror/newreceivables`

* Provides access to Collections on Receivables data:
  * `../tror/collectionsonreceivables`

* Provides access to Outstanding Delinquent Debt data:
  * `../tror/outstandingdelinquentdebt`

* Provides access to Delinquent Debt Greater Than and Less Than One Year data:
  * `../tror/delinquentdebtyear`

* Provides access to Delinquent Debt by Age data:
  * `../tror/delinquentdebtbyage`

Request Parameters

| Parameter | Format | Description |
| ------------- | -------------| -------------|
| apiKey | string | Your developer API key. |
| fiscalYear | integer | Selects data for a single fiscal year. Optional, default value is all years, if parameter not provided.|
|Quarter| integer| Selects data for a single fiscal quarter. Allowed values are 1, 2, 3 and 4. Optional, default value is all quarters, if parameter not provided.|
|receivableType| integer| Selects type of receivable data to return. Allowed values are: |
|  | |1 - All receivable types (above, no value = all)|
|  | |2 - Administrative Receivables|
|  | |3 - Direct Loans|
|  | |4 - Defaulted Guaranteed Loans|
|  | |Optional, default value is 1- all receivable types.|
| responseFormat | string | Format to receive the result content. Allowed values are json, xml and csv. |

Constraints

* There are no business rule constraints for this service.

Outputs

* Output from this function is a JSON, XML or CSV file. No example output available.

Examples

* The following example would return the Collections on Delinquent Debt data in XML format:
  * `../collectionsondelinquentdebt?apiKey=DEMO_KEY&responseFormat=xml`
* The following example would return the Outstanding Receivables data for all quarters of fiscal year 2012 in JSON format:
  * `../outstandingreceivables?apiKey=DEMO_KEY&fiscalYear=2012&responseFormat=json`
* The following example would return the Delinquent Debt by Age dataset for fiscal quarter 3 for all years in CSV format:
  * `../delinquentdebtbyage?apiKey=DEMO_KEY&fiscalQuarter=3&responseFormat=csv`

[Top](#page_top) -->

<!-- <div id="top" class="pageAnchor"></div>

##### Treasury Offset Program (TOP) <a></a>

The Bureau of the Fiscal Service helps maximize delinquent debt recovery efforts on behalf of the states and federal agencies through the Treasury Offset Program (TOP).

###### Download TOP Data
Returns the TOP data set in comma separated value (CSV) format.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/state_programs?apiKey=DEMOKEY&format=csv`
* `GET https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/federal_collections?apiKey=DEMOKEY&format=csv`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |

Constraints

* There are no business rule constraints for this service.

Output

* <a target='blank' href='https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/state_programs?apiKey=DEMOKEY&format=csv'>Try it Out! - State Programs</a>
* <a target='blank' href='https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/federal_collections?apiKey=DEMOKEY&format=csv'>Try it Out! - Federal Collections</a>

Examples

* The following example would return the dataset:
  * '../services/api/fiscal_service/v1/debt/top/federal_collections?apiKey=DEMOKEY&format=csv'



[Top](#page_top) -->

<div id="cir" class="pageAnchor"></div>

##### Revenue Collections Management (CIR) <a></a>

The Bureau of the Fiscal Service administers the world’s largest government funds collections system through a network of more than 10,000 financial institutions. The bureau collects federal revenues, such as individual and corporate income tax deposits, customs duties, fees for government service, fines, and loan repayments.

###### Query the CIR data

Returns the Revenue Collections Management CIR data in available formats.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/v1/cir/results`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |
| StartYear | No | First Available Year | YYYY | Starting fiscal year for the data to return (>=) in YYYY format. |
| EndYear | No | Most Recent Available Year | YYYY | Ending fiscal year for the data to return (>=) in YYYY format. |
| responseFormat | No | json | string | Format to receive the result content.  Allowed values are json and xml, Default value is json. |

Constraints

* The following constraints are applied to API requests.
  * EndYear must be greater than or equal to StartYear of the return result will be empty.

Output

* Output from this function is a JSON or XML file. Example JSON output:
  * <a target='blank' href='https://api.transparency.treasury.gov/services/api/v1/cir/results?apiKey=DEMOKEY'>Try it Out!</a>

Examples

* The following example would return the dataset in json format:
  * `..cir/results?apiKey=DEMO_KEY&responseFormat=json`

* The following example would return data for the years 2007 through 2011 inclusive, in xml format:
  * `..cir/results?apiKey=DEMO_KEY&StartYear=2007&EndYear=2011?responseFormat=xml`
  
[Top](#page_top)

<div id="data" class="pageAnchor"></div>

##### Data Registry <a></a>

The purpose of the Fiscal Service Data Registry is to promote the common identification, use and sharing of data/information across the federal government. The registry contains information about definitions, authoritative sources, data types, formats and uses of common data. Responsibility for establishing and maintaining the Fiscal Service Data Registry and data-related standards falls under the Fiscal Service Enterprise Architecture Team.

###### List Data Registry Elements
Returns the list of Data Registry elements.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/v1/registry/list`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |

Constraints

* There are no business rule constraints for this service.

Output

* Output from this function is a JSON file. Example JSON output:
  * <a target='blank' href='https://api.transparency.treasury.gov/services/api/v1/registry/list?apiKey=DEMOKEY'>Try it Out!</a>

Examples

* The following example would return the single instance details:
  * Output from this function is a JSON or XML file. Example JSON output:  
    * `../registry/list`


###### Situational
Get the situational metadata associated with a content element.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/v1/registry/situational`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |
| admin_id | Yes | | string | Administrative ID of the element to retrieve from the list data registry elements call.  Changes on data load. |

Constraints

* There are no business rule constraints for this service.

Output

* The following output uses a sample admin_id value:
  * <a target='blank' href='https://api.transparency.treasury.gov/services/api/v1/registry/situational?apiKey=DEMOKEY&admin_id=31877'>Try it Out!</a>

Examples

* The following example would return the single instance details:
  * `../registry/situational?apiKey=DEMO_KEY&admin_id=ABC123`

###### Business Rule
Get the business rules metadata associated with a content element.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/v1/registry/businessrule`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |
| admin_id | Yes | | string | Administrative ID of the element to retrieve from the list data registry elements call.  Changes on data load. |

Constraints

* There are no business rule constraints for this service.

Output

* The following output uses a sample admin_id value:
  * <a target='blank' href='https://api.transparency.treasury.gov/services/api/v1/registry/businessrule?apiKey=DEMOKEY&admin_id=31877'>Try it Out!</a>


Examples

* The following example would return the single instance details:
  * `../registry/businessrule?apiKey=DEMO_KEY&admin_id=ABC123`

[Top](#page_top)

<!-- <div id="penny" class="pageAnchor"></div>

##### Debt to the Penny<a></a>

Debt to the Penny is the total public debt to the public reported daily. Public debt is made up as public debt securities issued by the U.S. Treasury. U.S. Treasury securities primarily consist of marketable Treasury securities (bills, notes and bonds), savings bonds and special securities issued to state and local governments.

###### List Debt to the Penny
Returns the list of Debt to the Penny elements.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_penny`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |

Constraints

* There are no business rule constraints for this service.

Output

* <a target='blank' href='https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_penny?apiKey=DEMOKEY'>Try it Out!</a>

Examples

* The following example would return the single instance details:
  * `../do/debt_to_penny`


[Top](#page_top)

<div id="gold" class="pageAnchor"></div>

##### Status Report of U.S. Government Gold Reserve<a></a>

The Status Report of U.S. Government Gold Reserve (Gold Report) reflects gold bullion and gold coins owned by the federal government. The report summarizes the fine troy ounces and the book value of gold held by various facilities as well as identifies the value of gold coins and bullion on display at Federal Reserve banks; coins and bullion in reserve at the Federal Reserve Bank of New York and gold held by U.S. Mint facilities.

###### Status Report of U.S. Government Gold Reserve
Returns the list of Status Report of U.S. Government Gold Reserve elements.

Access Path

* `GET https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/gold_reserve`

Request Parameters

| Parameter  | Required |  Default | Format | Description |
| ------------- | -------------| ------------- | -------------| -------------|
| apiKey | Yes | | string | Your developer API key. |

Constraints

* There are no business rule constraints for this service.

Output

* <a target='blank' href='https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/gold_reserve?apiKey=DEMOKEY'>Try it Out!</a>

Examples

* The following example would return the single instance details:
  * `../od/gold_reserve`


[Top](#page_top) -->
