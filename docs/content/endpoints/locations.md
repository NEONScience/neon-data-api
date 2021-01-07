# Locations Endpoint

The `/locations` endpoint provides more detailed information about [where NEON collects data](https://www.neonscience.org/about/design) than the `/sites` endpoint. A "named location", truncated to "location" here, is any discrete place or administrative region in the NEON system, ranging from our huge ecoregions (domains) to single data collection points. Location information may consist of geographic coordinates (latitude, longitude, elevation, etc.), plot size, and other positional information. There are more than 150,000 locations in the NEON system. 

[REALM](https://data.neonscience.org/api/v0/locations/REALM) is the top of the location hierarchy, and contains all of the domain names as "locationChildren". Each domain, in turn, contains one or more field sites. Each site contains towers, measurement plots, observation spots, and more. By traversing this hierarchy of locations, information about any data collection point in the NEON system is available.

An example of this hierarchy is as follows: REALM contains 20 Domains, one of which is [Domain 14 (Desert Southwest)](https://data.neonscience.org/api/v0/locations/D14). D14 has three field sites, one of which is the [Santa Rita Experimental Range site (SRER)](https://data.neonscience.org/api/v0/locations/SRER). SRER has a single meteorology tower named [TOWER104454](https://data.neonscience.org/api/v0/locations/TOWER104454) with numerous sensors, each at a named location. SRER also has nine mammal trapping grids, one of which is [SRER_002.mammalGrid.mam](https://data.neonscience.org/api/v0/locations/SRER_002.mammalGrid.mam). Each grid has numerous trapping locations. Note that location names are case-sensitive.

The `/locations/sites` endpoint takes no arguments, and provides a list of all sites and their location information.

The `/locations/{locationName}` endpoint can be used to deliver location information for any given named location ID. Some named locations may be moved over the course of the Observatory. Optional parameters for this endpoint include whether or not the response should contain the location's history or position within a broader hierarchy. The locationType parameter may be populated with one of many values, including TOWER, HUT, MEGAPIT, and others.


<a name="paths"></a>
## **Paths**

<a name="get_locations_sites"></a>
### GET `/locations/sites`

#### **Description**
Get information about the site-level locations.


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of locations|[Response 200](#get_location_sites_success_200)|
|**default**|General error|[error](#error)|

<h5 id="get_location_sites_success_200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[[location](#location)]|


#### **Produces**

* `application/json`


#### **Tags**

* Locations
* Sites


<a name="get_locations-locationname"></a>
### GET `/locations/{locationName}`

#### **Description**
Get information about a location.


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**locationName**  <br>*required*|Location to get|string|
|**Query**|**hierarchy**  <br>*optional*|Option to obtain location hierarchy information|boolean|
|**Query**|**history**  <br>*optional*|Option to obtain location history information|boolean|
|**Query**|**locationType**  <br>*optional*|"When obtaining location hierarchy, specify a type of descendant to query for. For example, to obtain the location hierarchy for all towers at location CPER, utilize: /CPER?hierarchy=true&locationType=TOWER"|string|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single location|[Response 200](#get_locations-locationname_response-200)|
|**400**|Location(s) not found|[Response 400](#get_locations-locationname_response-400)|
|**default**|General error|[error](#error)|

<h5 id="get_locations-locationname_response-200">Response 200</h5>

|Name|Schema|
|---|---|
|**data**|[location](#location)|

<h5 id="get_locations-locationname_response-400">Response 200</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Locations



<a name="definitions"></a>
## **Definitions**

<a name="location"></a>
### **location**

|Name|Description|Schema|
|---|---|---|
|**locationName**  <br>*optional*|Name of the location|string|
|**locationDescription**  <br>*optional*|A description of the location|string|
|**locationType**  <br>*optional*|Type of the location|string|
|**domainCode**  <br>*optional*|Three character domain abbreviation (D01, D02, etc) for the domain the location is in|string|
|**siteCode**  <br>*optional*|Four character code for a field site|string|
|**locationDecimalLatitude**  <br>*optional*|Decimal latitude for the location (WGS 84)|number (double)|
|**locationDecimalLongitude**  <br>*optional*|Decimal longitude for the location (WGS 84)|number (double)|
|**locationElevation**  <br>*optional*|Elevation for the location in meters|number (double)|
|**locationUtmEasting**  <br>*optional*|The Universal Transverse Mercator easting|number (double)|
|**locationUtmNorthing**  <br>*optional*|The Universal Transverse Mercator northing|number (double)|
|**locationUtmHemisphere**  <br>*optional*|The single character Universal Transverse Mercator hemisphere|string|
|**locationUtmZone**  <br>*optional*|The Universal Transverse Mercator zone|number (int)|
|**alphaOrientation**  <br>*optional*|The angle (in degrees) at which a sensor is facing relative to true North|number (double)|
|**betaOrientation**  <br>*optional*|Beta orientation for the location|number (double)|
|**gammaOrientation**  <br>*optional*|Gamma orientation for the location|number (double)|
|**xOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, east (positive values) or west (negative values) relative to where the geolocation point was taken.|number (double)|
|**yOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, north (positive values) or south (negative values) relative to where the geolocation point was taken.|number (double)|
|**zOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to where the geolocation point was taken.|number (double)|
|**offsetLocation**  <br>*optional*|The named location used as a reference point. Offsets are relative to this location.|[location](#location)|
|**activePeriods**  <br>*optional*|List of active periods for the location|[[activePeriod](#activeperiod)]|
|**locationPolygon**  <br>*optional*||[locationPolygon](#locationpolygon)|
|**locationProperties**  <br>*optional*|List of properties associated with the location.  Contents vary based on the type of location.|[[locationProperties](#locationproperties)]|
|**locationHistory**  <br>*optional*||[[locationHistory](#locationhistory)]|
|**locationParent**  <br>*optional*|Name of the location that this location is in|string|
|**locationParentUrl**  <br>*optional*|URL to request location data for the parent of this location|string|
|**locationParentHierarchy**  <br>*optional*|When querying for the hierarchy, the location's parent hierarchy|[locationParentHierarchy](#locationparenthierarchy)|
|**locationChildren**  <br>*optional*|A list of names of locations within this location|[string]|
|**locationChildrenUrls**  <br>*optional*|A list of URLs to request location data for the children of this location|[string]|
|**locationChildHierarchy**  <br>*optional*|When querying for the hierarchy, the location's set of immediate children and associated hierarchy|[[locationChildHierarchy](#locationchildhierarchy)]|

<a name="activeperiod"></a>
### **activePeriod**

|Name|Description|Schema|
|---|---|---|
|**activatedDate**  <br>*optional*|The activation date for the time period|string|
|**deactivatedDate**  <br>*optional*|The deactivation date for the time period|string|

<a name="locationpolygon"></a>
### **locationPolygon**

|Name|Description|Schema|
|---|---|---|
|**coordinates**  <br>*optional*|A list of vertices that define the closed structure for the polygon|[[coordinates](#coordinates)]|

<a name="coordinates"></a>
### **coordinates**

|Name|Description|Schema|
|---|---|---|
|**latitude**  <br>*optional*|Decimal latitude for the polygon coordinate|number (double)|
|**longitude**  <br>*optional*|Decimal longitude for the polygon coordinate|number (double)|
|**elevation**  <br>*optional*|Elevation for the polygon coordinate|number (double)|

<a name="locationproperties"></a>
### **locationProperties**

|Name|Description|Schema|
|---|---|---|
|**locationPropertyName**  <br>*optional*|An additional property for the location, described by its name|string|
|**locationPropertyValue**  <br>*optional*|The value of the additional property; can be a string or a number|string|


<a name="locationhistory"></a>
### **locationHistory**

|Name|Description|Schema|
|---|---|---|
|**current**|Indicates if this is the current set of coordinates or spatial position for this location name|boolean|
|**locationStartDate**|The start date and time for this location|string (date-time)|
|**locationEndDate**  <br>*optional*|The end date and time for this location|string (date-time)|
|**locationDecimalLatitude**  <br>*optional*|Decimal latitude for the location|number (double)|
|**locationDecimalLongitude**  <br>*optional*|Decimal longitude for the location|number (double)|
|**locationElevation**  <br>*optional*|Elevation for the location|number (double)|
|**locationUtmEasting**  <br>*optional*|The Universal Transverse Mercator easting|number (double)|
|**locationUtmNorthing**  <br>*optional*|The Universal Transverse Mercator northing|number (double)|
|**locationUtmHemisphere**  <br>*optional*|The single character Universal Transverse Mercator hemisphere|string|
|**locationUtmZone**  <br>*optional*|The integer Universal Transverse Mercator zone|number (int)|
|**alphaOrientation**  <br>*optional*|The angle (in degrees) at which the sensor is facing relative to true North|number (double)|
|**betaOrientation**  <br>*optional*|Beta orientation for the location.|number (double)|
|**gammaOrientation**  <br>*optional*|Gamma orientation for the location.|number (double)|
|**xOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, east (positive values) or west (negative values) relative to where the geolocation point was taken.|number (double)|
|**yOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, north (positive values) or south (negative values) relative to where the geolocation point was taken.|number (double)|
|**zOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to where the geolocation point was taken.|number (double)|
|**locationPolygon**  <br>*optional*||[locationPolygon](#locationpolygon)|
|**locationProperties**  <br>*optional*|List of properties associated with the location.  Contents vary based on the type of location.|[[locationProperties](#locationproperties)]|


<a name="locationparenthierarchy"></a>
### **locationParentHierarchy**

|Name|Description|Schema|
|---|---|---|
|**locationName**  <br>*optional*|Name of the location|string|
|**locationType**  <br>*optional*|Type of the location|string|
|**locationParent**  <br>*optional*|Name of the location that this location is in|string|
|**locationParentHierarchy**  <br>*optional*|The location's parent hierarchy|object|
|**locationParentUrl**  <br>*optional*|URL to request location data for the parent of this location|string|

<a name="locationchildhierarchy"></a>
### **locationChildHierarchy**

|Name|Description|Schema|
|---|---|---|
|**locationChildHierarchy**  <br>*optional*|The location's child hierarchy|[object]|
|**locationDescription**  <br>*optional*|A description of the location|string|
|**locationName**  <br>*optional*|Name of the location|string|
|**locationType**  <br>*optional*|Type of the location|string|

<a name="error"></a>
### **error**

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />
