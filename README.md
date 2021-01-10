# Economic Analysis for Splunk

## Introduction
### Welcome to Economic Analysis for Splunk!

The goal of this application is to provide users of Splunk easy access to public economic data.

The first and primary data source this application utilizes is FRED®, which is the Federal Reserve Economic Database. It is a widely used source of economic data and has a wealth of information. There are hundreds of data sources available from this repository this application uses many, which include the following:

- Board of Governors of the Federal Reserve System (US)
- U.S. Department of the Treasury
- U.S. Bureau of Economic Analysis
- U.S. Bureau of Labor Statistics
- U.S. Bureau of Transportation Statistics
- National Bureau of Economic Research
- U.S. Census Bureau
- S&P Dow Jones Indices LLC
- NASDAQ OMX Group


"This product uses the FRED® API but is not endorsed or certified by the Federal Reserve Bank of St. Louis."
https://fred.stlouisfed.org/docs/api/terms_of_use.html

The FRED Add-On for Splunk provides the functionality to index FRED data and make available to this application. The default data sources will populate the prebuilt dashboards, but additional data sources can be added and additional dashboards created.

Other data sources may be added to this application in the future based on the availability of additional applicable add-ons.

## Prerequisites
FRED® Add-On for Splunk

## Architecture/Installation

The application consists of primarily searches and views and is typically only installed on a search head.

| Component       | Supported   | Required   |
| :---            |    :----:   |  ---:      |
| Search Head     | Yes         | Yes        |
| Indexer         | Yes         | No         |
| Heavy Forwarder | Yes         | No         |
| Forwarder       | No          | No         |


### Data Overview
A fundamental aspect of this application to understand is how the data is organized. The FRED® Add-On for Splunk installs a kvstore list called FRED_Default_List. This list is used to store the FRED series ID's for which we want to retrieve data. When the default list is populated initially using the initial setup page in the FRED® Add-On for Splunk and the default list input is configured. The FRED® Add-On for Splunk will begin to download all of the FRED data series in the list. The default data is used to populate the dashboards in this application.

### Index Setup
The index referenced in this app is configured in the `mts_econ_indexes` macro and is configured to use the index fred_data by default. The installation and configuration instructions for the FRED® Add-On for Splunk recommend creating the fred_data index before configuration. If a different index name was used for the FRED data then update the `mts_econ_indexes` macro accordingly.



## Application Overview
The default page of the application is the economic overview shown below. Each panel displays the latest value and trailing twelve month trend for the FRED series specified. The latest date collected for each series is displayed.

![Economic Overview](/app/appserver/static/economic_overview_view.png)

The category menu toggles the value categories and each panel links to the detail drilldown for that category. Each category drill down will contain the high level current values from the over view page. The page will also contain a series comparison line chart which can be modified to include the desired series in the category. The page also has two detail panels which can select any series from the category. These panels show the series information from the list, a timechart, range gauge, and summary statistics. An example category drilldown is shown below.

![Category Drilldown](/app/appserver/static/category_drilldown_example_view.png)
![Category Drilldown](/app/appserver/static/category_drilldown_exampleb_view.png)

The default series list can also be used to show detail on any data series. To get to the default list click default-->FRED Default List in the application menu, as shown below.

![Category Drilldown](/app/appserver/static/help_fred_default_list_menulink01.png)

The default list management view is then displayed, as shown below. The list can be filtered by category and frequency using the dropdown lists.

![Category Drilldown](/app/appserver/static/help_fred_default_list_view01.png)

The series detail dashboard below is shown by clicking on the FredID of any series.

![Category Drilldown](/app/appserver/static/series_drilldown_example_view.png)

## Change History
<table>
<tr><td>Version</td><td>Changes</td></tr>

<tr><td>0.1.0</td>
<td>Initial Release
</td></tr>
<tr><td>0.1.1</td>
<td>Update app.conf naming and spelling issue
</td></tr>
<tr><td>0.1.2</td>
<td>
<ul>
<li>Removed panels for series ID's GOLDAMGBD228NLBM & SLVPRUSD from dashboards<br>
   <ul>
      <li>they are no longer available via the FRED API
   </ul>
</td></tr>

</table>