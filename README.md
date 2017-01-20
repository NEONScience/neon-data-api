# neon-data-api

NEON's data API is currently under development (v0); this is a forum to share ideas and code.

The API documentation is hosted at http://data.neonscience.org/data-api.  The API delivers data product and location information in JSON format, and data in CSV format.

Please feel free to give the API a whirl and give us feedback via this repository’s Issues section. We may not be able to accommodate all requests, but we're very interested in what you think the most important capabilities of a NEON API would be and what you would use it for. If you dive into writing a script or building an application, share it as an example! And of course also let us know if you run into any bugs. Just note that the API may change rapidly without notice during development, so you won’t want to build anything critical with it.

There are a couple of small examples of using the API:

Python 3: http://nbviewer.jupyter.org/gist/jzollerneon/3d0519e1f26db80b755cc865ef218d58

Javascript: http://bl.ocks.org/jzollerneon/9700c4908bebbd5b5e546c0cd4decc4c

There is also an R package, [nneo](https://github.com/ropenscilabs/nneo), in development by [Scott Chamberlin](https://github.com/sckott) with [rOpenSci](https://github.com/ropenscilabs): https://github.com/ropenscilabs/nneo


**2017-01-17 update**:

We have been migrating our back end code to a new platform, and we're almost done!  Now, we can start putting in some changes to the API that have been pending for a while:

* In a few days, some /products responses will have a new "keyword" list, with words related to specific data products.
* In a few weeks, some /products responses will have a related data products section, showing parent, child, and related data products.
* In a few weeks, /data file endpoints will start to change!  Currently, when using /data/&lt;product&gt;/&lt;site&gt;/&lt;month&gt;, a list of URL's is returned as /data/&lt;product&gt;/&lt;site&gt;/&lt;month&gt;/&lt;filename&gt;.  Starting with a few new data products, the list of URL's returned will have a form similar to **/s3.battelleecology.org/&lt;random string&gt;/&lt;filename&gt;**.  These new direct file URL's will also _expire_ after some time.  Some design decisions are still pending, so we'll post details as soon as we can.
