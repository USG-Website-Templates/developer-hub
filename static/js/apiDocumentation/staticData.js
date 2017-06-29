(function () {
  'use strict';

  function staticDataStore() {
    function get() {
      return ramlCode.data;
    }

    function set(parent, key, value) {
      if (!parent) {
        parent = 'default';
      }

      if (!ramlCode.data[parent]) {
        ramlCode.data[parent] = {};
        ramlCode.data[parent][key] = value;
      } else {
        ramlCode.data[parent][key] = value;
      }
    }

    function dataFactory() {
    }

    dataFactory.prototype.get = get;
    dataFactory.prototype.set = set;

    return new dataFactory
  }

  ramlCode.methods['staticDataStore'] = staticDataStore();

  ramlCode.methods.staticDataStore.set(
    'staticApiDescriptions', '"Treasury Report On Receivables"', "The Treasury's Report on Receivables and Debt Collection Activities (TROR) is the federal government's primary means for collecting data on the status of non-tax receivables (delinquent and" +
    " non-delinquent debt) owed to the United States."
  );
  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"Treasury Offset Program"', "The Fiscal Service helps maximize delinquent debt recovery efforts on behalf of state and federal agencies through the Treasury Offset Program (TOP).");
  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Debt to the Penny"', "Debt to the Penny is the total public debt outstanding reported daily. The debt to the penny is made up of intragovernmental holdings and debt held by the public, including securities issued by the U.S. Treasury. U.S. Treasury securities primarily consist of marketable Treasury securities (bills, notes and bonds), savings bonds and special securities issued to state and local governments.");
  ramlCode.methods.staticDataStore.set(
    'staticApiDescriptions', '"OD-Gold Reserve"', "The Status Report of U.S. Government Gold Reserve (Gold Report): Reflects gold bullion and gold coins owned by the federal government.  The report summarizes the fine troy ounces and the book value of gold held by various facilities and identifies the value of gold coins and bullion on display at Federal Reserve banks; coins and bullion in reserve at the Federal Reserve Bank of New York; and gold" +
    " held by U.S. Mint facilities."
  );
  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-FIP Rates and Prices"', "The daily pricing file provides current market prices for investments (short, buy, or mean), redemptions (cover, sell, or bid) and end of day portfolio valuations.");
  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-SLGS Statistics"', "Current Month Balances for Securities Outstanding and Principal Outstanding for SLGS. Monthly SLGS Statistics Elements.");
  ramlCode.methods.staticDataStore.set(
    'staticApiDescriptions', '"OD-Debt Outstanding"', "Annual Debt Outstanding" +
    " from 1790 to the most complete fiscal year."
  );
  ramlCode.methods.staticDataStore.set(
    'staticApiDescriptions', '"OD-Exchange Rates"', "This report provides  exchange rate information  under Section 613 of Public Law 87-195 (codified at 22 USC 2363(b)) which gives the Secretary of the Treasury sole authority to establish the exchange rates for all foreign currencies or credits reported by all agencies of the government. The primary purpose is to ensure that foreign currency reports prepared by agencies are consistent with regularly published Treasury foreign currency reports regarding amounts stated in foreign currency units and U.S. dollar equivalents. This covers all foreign currencies in which the U.S. government has an interest, including receipts and disbursements, accrued revenues and expenditures, authorizations, obligations, receivables and payables, refunds, and similar" +
    " reverse transaction items."
  );
  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"Open Data"', "The Bureau of the Fiscal Service's vision is to help transform financial management in the Federal Government. Fiscal Service's vision aligns with Office of Management and Budget (OMB) guidance for Open Data. The Open Data listing supports this effort by presenting government financial data to the public in a human searchable and machine readable format.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"accounting"', "The Bureau of the Fiscal Service (Fiscal Service) has the critical responsibility of maintaining the federal government’s set of accounts and serving the repository of information about the financial position of the United States government. The bureau closely monitors the government’s monetary assets and liabilities at all times through its oversight of central accounting and reporting systems.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Average Interest Rates"', "The files listed below illustrate the Average Interest Rates for marketable and non-marketable securities over a two-year period for comparative purposes. Select the time period you are interested in to view the rates. Note: Average Interest Rates are calculated on the total unmatured interest-bearing debt. The average interest rates for total marketable, total non-marketable and total interest-bearing debt do not include the U.S. Treasury Inflation-Protected Securities.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Interest Expense"', "The Interest Expense on the Debt Outstanding includes the monthly interest for: 1) U.S. Treasury notes and bonds 2) Foreign and domestic series certificates of indebtedness, notes and bonds 3) Savings bonds 4) Government Account Series (GAS) 5) State and Local Government series (SLGs) and other special purpose securities. Amortized discount or premium on bills, notes and bonds is also included in the monthly interest expense.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Qualified Tax"', "Section 54A of the Internal Revenue Code (IRC) provides rules for the issuance and use of qualified tax credit bonds including new clean renewable energy bonds, qualified energy conservation bonds, qualified zone academy bonds, and qualified school construction bonds.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Balance Sheets"', "The balance sheets show the Government's assets, liabilities, and net position. When combined with stewardship information, this information presents a more comprehensive understanding of the Government's financial position. The net position for earmarked funds is shown separately.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Gift Contributions"', "The fiscal year to date information includes total gifts received for the months of October through September. For years 1996 and 1997, monthly data is not available.");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"OD-Unemployment Trust Fund Quarter Yields"', 'Quarterly yields from 1999 to the present.');

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"debt"', "");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"Revenue"', "Revenue Collections Management (CIR)");

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"Revenue Collections Management"', 'The Fiscal Service administers the world’s largest government funds collections system through a network of more than 10,000 financial institutions. The bureau collects federal revenues, such as individual and corporate income tax deposits, customs duties, fees for government service, fines, and loan repayments.');

  ramlCode.methods.staticDataStore.set('staticApiDescriptions', '"Data Registry"', "The purpose of the Fiscal Service Data Registry is to promote the common identification, use and sharing of data/information across the federal government. The registry contains information about definitions, authoritative sources, data types, formats and uses of common data. Responsibility for establishing and maintaining the Fiscal Service Data Registry and data-related standards falls under the Fiscal Service Enterprise Architecture Team.");

  ramlCode.methods.staticDataStore.set(
    'staticOffLineData', 'prodOffLineData',
    {
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/tfm/top/federal_collections.raml": 'federal_collections_tfm.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/tfm/top/state_programs.raml": 'state_programs_tfm.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/state_programs.raml": 'state_programs.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/top/federal_collections.raml": 'federal_collections.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_delinquent_debt.raml": 'analytics_delinquent_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_delinquent_debt_vs_receivables.raml": 'analytics_delinquent_debt_vs_receivables.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_receivable_accruals_additional_receivables.raml": 'analytics_receivable_accruals_additional_receivables.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/cnc_debt.raml": 'cnc_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/collections_on_delinquent_debt.raml": 'collections_on_delinquent_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/credit_bureau_reporting.raml": 'credit_bureau_reporting.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/referral_to_top.raml": 'referral_to_top.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/1099-c.raml": '1099-c.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/delinquent_debt.raml": 'delinquent_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/two_years_delinquent.raml": 'two_years_delinquent.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_write_off.raml": 'analytics_write_off.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_collections_vs_receivables.raml": 'analytics_collections_vs_receivables.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_collections_on_receivables.raml": 'analytics_collections_on_receivables.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_collection_delinquent_debt.raml": 'analytics_collection_delinquent_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_cnc_debt.raml": 'analytics_cnc_debt.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_referral_to_treasury.raml": 'analytics_referral_to_treasury.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/analytics_delinquent_debt_age.raml": 'analytics_delinquent_debt_age.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/debt/tror/data_act_compliance.raml": 'data_act_compliance.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_to_penny.raml": 'debt_to_penny.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/gold_reserve.raml": 'gold_reserve.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/exchange_rates.raml": 'exchange_rates.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/debt_outstanding.raml": 'debt_outstanding.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/slgs_statistics.raml": 'slgs_statistics.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/fip_rates_prices.raml": 'fip_rates_prices.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/qualified_tax.raml": 'qualified_tax.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/avg_interest_rates.raml": 'avg_interest_rates.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/utf_qtr_yields.raml": 'utf_qtr_yields.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/balance_sheets.raml": 'balance_sheets.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/interest_cost_fund.raml": 'interest_cost_fund.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/interest_expense.raml": 'interest_expense.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/gift_contributions.raml": 'gift_contributions.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/title_xii.raml": 'title_xii.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/interest_uninvested.raml": 'interest_uninvested.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/statement_net_cost.raml": 'statement_net_cost.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/accounting/od/record_setting_auction.raml": 'record_setting_auction.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/revenue/rcm.raml": 'rcm.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/value_domain.raml": 'value_domain.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/situational_metadata.raml": 'situational_metadata.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/business_rules.raml": 'business_rules.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/fmr_enum_values.raml": 'fmr_enum_values.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/fmr_situational_metadata.raml": 'fmr_situational_metadata.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/reference/data_registry/fmr_data_elements.raml": 'fmr_data_elements.raml',
      "https://api.transparency.treasury.gov/services/api/fiscal_service/v1/payments/jfics/jfics_congress_report.raml": 'jfics_congress_report.raml'
    }
  );
})();