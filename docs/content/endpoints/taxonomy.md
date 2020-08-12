# Taxonomy Endpoint

The `/taxonomy` endpoint provides acess to NEON's taxon lists for major 
groupings such as plants, algae, beetles, and small mammals. Taxon lists are 
compiled from a variety of published sources, and are primarily used by field 
staff to constrain data entry to verified scientific names and known geographic 
ranges. For more information, visit the [Taxonomic Lists](https://data.neonscience.org/apps/taxon) 
webpage. Note that the offset and limit parameters currently have default values of 100; 
you may wish to use an offset value of 0 and adjust the limit value to support 
larger recordsets. Also note that the scientificname parameter only 
supports exact, not fuzzy, string matching. 

<a name="paths"></a>
## **Paths**

<a name="get_taxonomy"></a>
### GET `/taxonomy`

#### **Description**
Get taxonomic lists.


#### **Parameters**

|Type|Name|Description|Schema|
|---|---|---|---|
|**Query**|**taxonTypeCode**  <br>*optional*|Taxon type code to get. Must not be used in conjunction with a taxon rank query parameter.|enum (ALGAE, BEETLE, BIRD, FISH, HERPETOLOGY, MACROINVERTEBRATE, MOSQUITO, MOSQUITO_PATHOGENS, SMALL_MAMMAL, PLANT, TICK)|
|**Query**|**kingdom**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**division**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**phylum**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**class**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**order**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**family**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**genus**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**scientificname**  <br>*optional*|The taxon rank to get. Must not be used in conjunction with taxon type code.|string|
|**Query**|**offset**  <br>*optional*|The number of items to skip before starting to collect the result set|integer|
|**Query**|**limit**  <br>*optional*|The number of items to limit the result set to|integer|
|**Query**|**verbose**  <br>*optional*|Get verbose result set|boolean|
|**Query**|**stream**  <br>*optional*|Option to obtain the result as a stream. Utilize for large requests.|boolean|


#### **Responses**

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|List of taxonomic information|[Response 200](#get_taxon_response-200)|
|**400**|Taxonomic data does not exist for specified query|[Response 400](#get_taxon_response-200)|
|**default**|General error|[error](#error)|

<h5 id="get_taxon_response-200">Response 200</h5>

|Name|Description|Schema|
|---|---|---|
|**count**|The number of results in the current paged response|integer|
|**total**|The total number of results for the query|integer|
|**prev**|Link to the previous page of results when available|string (uri)|
|**next**|Link to the next page of results when available|string (uri)|
|**data**|The list of taxonomic data|[[taxonomy](#taxonomy)]|

<h5 id="get_taxon_response-400">Response 400</h5>

|Name|Schema|
|---|---|
|**errors**  <br>*optional*|[[error](#error)]|


#### **Produces**

* `application/json`


#### **Tags**

* Taxonomy


<a name="definitions"></a>
## **Definitions**

<a name="taxonomy"></a>
### **taxonomy**

|Name|Description|Schema|
|---|---|---|
|**taxonTypeCode**|NEON taxonomic grouping|string|
|**taxonID**|NEON taxonomic code|string|
|**acceptedTaxonID**|Accepted taxonomic code from the authoritative source (dwc:nameAccordingToID)|string|
|**dwc:scientificName**|Scientific name, associated with the taxonID.  This is the name of the lowest level taxonomic rank that can be determined.  http://rs.tdwg.org/dwc/terms/scientificName|string|
|**dwc:scientificNameAuthorship**|The authorship information for the scientificName formatted according to the conventions of the applicable nomenclaturalCode.  http://rs.tdwg.org/dwc/terms/scientificNameAuthorship|string|
|**dwc:taxonRank**|The lowest level taxonomic rank that can be determined for the individual or specimen.  http://rs.tdwg.org/dwc/terms/taxonRank|string|
|**dwc:vernacularName**|A common or vernacular name. http://rs.tdwg.org/dwc/terms/vernacularName|string|
|**taxonProtocolCategory**  <br>*optional*|NEON protocol-specific categorization of the taxon|string|
|**dwc:nameAccordingToID**|An identifier for the source in which the specific taxon concept circumscription is defined or implied.  http://rs.tdwg.org/dwc/terms/nameAccordingToID|string|
|**dwc:nameAccordingToTitle**  <br>*optional*|The reference to the source in which the specific taxon concept circumscription is defined or implied.  http://tdwg.github.io/dwc/terms/nameAccordingTo|string|
|**dwc:kingdom**|The scientific name of the kingdom in which the taxon is classified.  http://rs.tdwg.org/dwc/terms/kingdom|string|
|**gbif:subkingdom**  <br>*optional*|The scientific name of the subkingdom in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subkingdom|string|
|**gbif:infrakingdom**  <br>*optional*|The scientific name of the infrakingdom in which the taxon is classified|string|
|**gbif:superdivision**  <br>*optional*|The scientific name of the superdivision in which the taxon is classified|string|
|**gbif:division**  <br>*optional*|The scientific name of the division in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/phylum|string|
|**gbif:subdivision**  <br>*optional*|The scientific name of the subdivision in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subphylum|string|
|**gbif:infradivision**  <br>*optional*|The scientific name of the infradivision in which the taxon is classified|string|
|**gbif:parvdivision**  <br>*optional*|The scientific name of the parvdivision in which the taxon is classified|string|
|**gbif:superphylum**  <br>*optional*|The scientific name of the superphylum in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/superphylum|string|
|**dwc:phylum**|The scientific name of the phylum or division in which the taxon is classified.  http://rs.tdwg.org/dwc/terms/phylum|string|
|**gbif:subphylum**  <br>*optional*|The scientific name of the subphylum in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subphylum|string|
|**gbif:infraphylum**  <br>*optional*|The scientific name of the infraphylum in which the taxon is classified|string|
|**gbif:superclass**  <br>*optional*|The scientific name of the superclass in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/superclass|string|
|**dwc:class**|The scientific name of the class in which the taxon is classified.  http://rs.tdwg.org/dwc/terms/class|string|
|**gbif:subclass**  <br>*optional*|The scientific name of the subclass in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subclass|string|
|**gbif:infraclass**  <br>*optional*|The scientific name of the infraclass in which the taxon is classified|string|
|**gbif:superorder**  <br>*optional*|The scientific name of the superorder in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/superorder|string|
|**dwc:order**|The scientific name of the order in which the taxon is classified.  http://rs.tdwg.org/dwc/terms/order|string|
|**gbif:suborder**  <br>*optional*|The scientific name of the suborder in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/suborder|string|
|**gbif:infraorder**  <br>*optional*|The scientific name of the infraorder in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/infraorder|string|
|**gbif:section**  <br>*optional*|The scientific name of the section in which the organism is classified.  http://rs.gbif.org/vocabulary/gbif/rank/section|string|
|**gbif:subsection**  <br>*optional*|The scientific name of the subsection in which the organism is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subsection|string|
|**gbif:superfamily**  <br>*optional*|The scientific name of the superfamily in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/superfamily|string|
|**dwc:family**|The scientific name of the family in which the taxon is classified.  http://rs.tdwg.org/dwc/terms/family|string|
|**gbif:subfamily**  <br>*optional*|The scientific name of the subfamily in which the organism is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subfamily|string|
|**gbif:tribe**  <br>*optional*|The scientific name of the tribe in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/tribe|string|
|**gbif:subtribe**  <br>*optional*|The scientific name of the subtribe in which the taxon is classified.  http://rs.gbif.org/vocabulary/gbif/rank/subtribe|string|
|**dwc:genus**|The scientific name of the genus in which the organism is classified.  http://rs.tdwg.org/dwc/terms/genus|string|
|**dwc:subgenus**  <br>*optional*|The scientific name of the subgenus in which the taxon is classified.  Values should include the genus to avoid homonym confusion.  http://rs.tdwg.org/dwc/terms/subgenus|string|
|**gbif:subspecies**|The subspecies (infraspecific name below the rank of infraspecific epithet) of the scientific name applied to the taxon.  http://rs.gbif.org/vocabulary/gbif/rank/subspecies|string|
|**gbif:variety**|The variety (infraspecific name below the rank of infraspecific epithet) of the scientific name applied to the taxon.  http://rs.gbif.org/vocabulary/gbif/rank/variety|string|
|**gbif:subvariety**  <br>*optional*|The subvariety (infraspecific name below the rank of variety) of the scientific name applied to the taxon.  http://rs.gbif.org/vocabulary/gbif/rank/subvariety|string|
|**gbif:form**  <br>*optional*|The form (infraspecific name below the rank of infraspecific epithet) of the scientific name applied to the taxon.  http://rs.gbif.org/vocabulary/gbif/rank/form|string|
|**gbif:subform**  <br>*optional*|The subform (infraspecific name below the rank of form) of the scientific name applied to the taxon.  http://rs.gbif.org/vocabulary/gbif/rank/subform|string|
|**speciesGroup**  <br>*optional*|The unofficial species group into which the taxon is categorized|string|
|**dwc:specificEpithet**  <br>*optional*|The specific epithet (second part of the species name) of the scientific name applied to the taxon.  http://rs.tdwg.org/dwc/terms/specificEpithet|string|
|**dwc:infraspecificEpithet**  <br>*optional*|The infraspecific epithet (scientific name below the rank of species) of the scientific name applied to the taxon.  http://rs.tdwg.org/dwc/terms/infraspecificEpithet|string|


<a name="error"></a>
### **error**

|Name|Schema|
|---|---|
|**detail**  <br>*optional*|string|
|**status**  <br>*optional*|number (int)|


<br />
