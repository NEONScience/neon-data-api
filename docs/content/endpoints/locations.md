# Locations Endpoint

## Locations

The `/locations` endpoint provides more detailed information about 
[where NEON collects data](https://www.neonscience.org/about/about/spatiotemporal-design) 
than the `/sites` endpoint. A location is any discrete place or 
administrative region in the NEON system, ranging from our huge ecoregions 
(domains) to single data collection points. Location information may consist of 
geographic coordinates (latitude, longitude, elevation, etc.), plot size, 
and other positional information. There are more than 150,000 locations in the 
NEON system. [REALM](https://data.neonscience.org/api/v0/locations/REALM) 
is the top of the location hierarchy, and contains all of 
the domain names as "locationChildren". Each domain, in turn, contains all of 
its site codes. Each site contains towers, measurement plots, observation spots, 
and more. By traversing this hierarchy of locations, information about any 
point in the NEON system is available.

An example of this hierarchy is as follows: REALM contains 20 Domains, one of 
which is Domain 14 (Desert Southwest). D14 has three sites, one of which is the 
Santa Rita Experimental Range site (SRER). SRER has a single meteorology tower 
named TOWER104454 with numerous sensors, each at a named location. SRER also 
has nine mammal trapping grids, one of which is SRER_002.mammalGrid.mam. Each 
grid has numerous trapping locations. Examples of individual locations include 
[Domain 02](https://data.neonscience.org/api/v0/locations/D02), or the 
[Central Plains Experimental Range, Plot 11, mammal collection point A10](https://data.neonscience.org/api/v0/locations/CPER_011.mammalGrid.mam.A10), 
or [Niwot Ridge Mountain Research Station Megapit MP1](https://data.neonscience.org/api/v0/locations/MEGAPT100984). 
Note that location names are case-sensitive.

The `/locations/sites` endpoint takes no arguments, and provides a list of all 
sites and their location information.

The `/locations/{locationName}` endpoint can be used to deliver location 
information for any given named location ID. Some named locations may be moved 
over the course of the Observatory. Optional parameters for this endpoint 
include whether or not the response should contain the location's history or 
position within a broader hierarchy. The locationType parameter may be 
populated with one of many values, including TOWER, HUT, MEGAPIT, and others. 
A full list of available locationTypes will be made available soon.


<a name="paths"></a>
## Paths

<a name="get_locations_sites"></a>
### GET `/locations/sites`

#### Description
Get information about the site-level locations.


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of locations|[Response 200](#get_locations_sites_response-200)|
|**default**|General error|[error](#error)|

<a name="get_locations_sites_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**|< [location](#location) > array|


#### Produces

* `application/json`


#### Tags

* Locations
* Sites


<a name="get_locations-locationname"></a>
### GET `/locations/{locationName}`

#### Description
Get information about a location.


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**locationName**  <br>*required*|Location to get|string|
|**Query**|**hierarchy**  <br>*optional*|Option to obtain location hierarchy information|boolean|
|**Query**|**history**  <br>*optional*|Option to obtain location history information|boolean|
|**Query**|**locationType**  <br>*optional*|"When obtaining location hierarchy, specify a type of descendant to query for. For example, to obtain the location hierarchy for all towers at location CPER, utilize: /CPER?hierarchy=true&locationType=TOWER"|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Single location|[Response 200](#get_locations-locationname_response-200)|
|**400**|Location(s) not found|[Response 400](#get_locations-locationname_response-400)|
|**default**|General error|[error](#error)|

<a name="get_locations-locationname_response-200"></a>
**Response 200**

|Name|Schema|
|---|---|
|**data**|[location](#location)|

<a name="get_locations-locationname_response-400"></a>
**Response 400**

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|< [error](#error) > array|


#### Produces

* `application/json`


#### Tags

* Locations



<a name="definitions"></a>
## Definitions

<a name="location"></a>
### location

|Name|Description|Schema|
|---|---|---|
|**alphaOrientation**  <br>*optional*|The angle (in degrees) at which the sensor is facing relative to true North.|number (double)|
|**betaOrientation**  <br>*optional*|Beta orientation for the location.|number (double)|
|**domainCode**  <br>*optional*|Three character domain abbreviation (D01, D02, etc) for the domain this site is in|string|
|**gammaOrientation**  <br>*optional*|Gamma orientation for the location.|number (double)|
|**locationChildHierarchy**  <br>*optional*|When querying for the hierarchy, the location's set of immediate children and associated hierarchy|< [locationChildHierarchy](#locationchildhierarchy) > array|
|**locationChildren**  <br>*optional*|A list of names of locations within this location.|< string > array|
|**locationChildrenUrls**  <br>*optional*|A list of URLs to request location data for the children of this location.|< string > array|
|**locationDecimalLatitude**  <br>*optional*|Decimal latitude for the location.|number (double)|
|**locationDecimalLongitude**  <br>*optional*|Decimal longitude for the location.|number (double)|
|**locationDescription**  <br>*optional*|A description of the location.|string|
|**locationElevation**  <br>*optional*|Elevation for the location.|number (double)|
|**locationHistory**  <br>*optional*||< [locationHistory](#locationhistory) > array|
|**locationName**  <br>*optional*|Name of the location|string|
|**locationParent**  <br>*optional*|Name of the location that this location is in.|string|
|**locationParentHierarchy**  <br>*optional*|When querying for the hierarchy, the location's parent hierarchy|[locationParentHierarchy](#locationparenthierarchy)|
|**locationParentUrl**  <br>*optional*|URL to request location data for the parent of this location.|string|
|**locationPolygon**  <br>*optional*||[locationPolygon](#location-locationpolygon)|
|**locationProperties**  <br>*optional*|List of properties associated with the location.  Contents vary based on the type of location.|< [locationProperties](#location-locationproperties) > array|
|**locationType**  <br>*optional*||string|
|**locationUtmEasting**  <br>*optional*|The Universal Transverse Mercator easting.|number (double)|
|**locationUtmHemisphere**  <br>*optional*|The single character Universal Transverse Mercator hemisphere.|string|
|**locationUtmNorthing**  <br>*optional*|The Universal Transverse Mercator northing.|number (double)|
|**locationUtmZone**  <br>*optional*|The integer Universal Transverse Mercator zone.|number (int)|
|**siteCode**  <br>*optional*|Four character code for the site|string|
|**xOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, east (positive values) or west (negative values) relative to where the geolocation point was taken.|number (double)|
|**yOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, north (positive values) or south (negative values) relative to where the geolocation point was taken.|number (double)|
|**zOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to where the geolocation point was taken.|number (double)|

<a name="location-locationpolygon"></a>
**locationPolygon**

|Name|Description|Schema|
|---|---|---|
|**coordinates**  <br>*optional*|A list of vertices that define the closed structure for the polygon|< [coordinates](#location-coordinates) > array|

<a name="location-coordinates"></a>
**coordinates**

|Name|Description|Schema|
|---|---|---|
|**elevation**  <br>*optional*|Elevation for the polygon coordinate.|number (double)|
|**latitude**  <br>*optional*|Decimal latitude for the polygon coordinate.|number (double)|
|**longitude**  <br>*optional*|Decimal longitude for the polygon coordinate.|number (double)|

<a name="location-locationproperties"></a>
**locationProperties**

|Name|Description|Schema|
|---|---|---|
|**locationPropertyName**  <br>*optional*||string|
|**locationPropertyValue**  <br>*optional*|Can be a string or a number|string|


<a name="locationchildhierarchy"></a>
### locationChildHierarchy

|Name|Description|Schema|
|---|---|---|
|**locationChildHierarchy**  <br>*optional*|The location's child hierarchy|< object > array|
|**locationDescription**  <br>*optional*|A description of the location.|string|
|**locationName**  <br>*optional*|Name of the location|string|


<a name="locationhistory"></a>
### locationHistory

|Name|Description|Schema|
|---|---|---|
|**alphaOrientation**  <br>*optional*|The angle (in degrees) at which the sensor is facing relative to true North.|number (double)|
|**betaOrientation**  <br>*optional*|Beta orientation for the location.|number (double)|
|**gammaOrientation**  <br>*optional*|Gamma orientation for the location.|number (double)|
|**locationDecimalLatitude**  <br>*optional*|Decimal latitude for the location.|number (double)|
|**locationDecimalLongitude**  <br>*optional*|Decimal longitude for the location.|number (double)|
|**locationElevation**  <br>*optional*|Elevation for the location.|number (double)|
|**locationPolygon**  <br>*optional*||[locationPolygon](#locationhistory-locationpolygon)|
|**locationProperties**  <br>*optional*|List of properties associated with the location.  Contents vary based on the type of location.|< [locationProperties](#locationhistory-locationproperties) > array|
|**locationUtmEasting**  <br>*optional*|The Universal Transverse Mercator easting.|number (double)|
|**locationUtmHemisphere**  <br>*optional*|The single character Universal Transverse Mercator hemisphere.|string|
|**locationUtmNorthing**  <br>*optional*|The Universal Transverse Mercator northing.|number (double)|
|**locationUtmZone**  <br>*optional*|The integer Universal Transverse Mercator zone.|number (int)|
|**xOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, east (positive values) or west (negative values) relative to where the geolocation point was taken.|number (double)|
|**yOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, north (positive values) or south (negative values) relative to where the geolocation point was taken.|number (double)|
|**zOffset**  <br>*optional*|Cartesian offsets of a sensor, in meters, up (positive values) or down (negative values) relative to where the geolocation point was taken.|number (double)|

<a name="locationhistory-locationpolygon"></a>
**locationPolygon**

|Name|Description|Schema|
|---|---|---|
|**coordinates**  <br>*optional*|A list of vertices that define the closed structure for the polygon|< [coordinates](#locationhistory-coordinates) > array|

<a name="locationhistory-coordinates"></a>
**coordinates**

|Name|Description|Schema|
|---|---|---|
|**elevation**  <br>*optional*|Elevation for the polygon coordinate.|number (double)|
|**latitude**  <br>*optional*|Decimal latitude for the polygon coordinate.|number (double)|
|**longitude**  <br>*optional*|Decimal longitude for the polygon coordinate.|number (double)|

<a name="locationhistory-locationproperties"></a>
**locationProperties**

|Name|Description|Schema|
|---|---|---|
|**locationPropertyName**  <br>*optional*||string|
|**locationPropertyValue**  <br>*optional*|Can be a string or a number|string|


<a name="locationparenthierarchy"></a>
### locationParentHierarchy

|Name|Description|Schema|
|---|---|---|
|**locationName**  <br>*optional*|Name of the location|string|
|**locationParent**  <br>*optional*|Name of the location that this location is in.|string|
|**locationParentHierarchy**  <br>*optional*|The location's parent hierarchy|object|
|**locationParentUrl**  <br>*optional*|URL to request location data for the parent of this location.|string|

<a name="error"></a>
### error

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<a name="securityscheme"></a>
## API Tokens

<a name="x-api-token"></a>
### X-API-Token
*Type* : apiKey  
*Name* : X-API-Token  
*In* : HEADER


<br />
