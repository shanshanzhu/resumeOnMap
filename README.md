#Resume On Map

[![alt tag](https://raw2.github.com/shanshanzhu/resumeOnMap/master/client/img/screenShot.png)](http://shanshanzhu.github.io)

A full stack webapp to allow user to type in public linkedin profile
page and visulize their work experience and education on Google MAP API

### Master Branch

```
git clone //add the repo link here
npm install 
grunt dev
```

- Run the above code to start your local server:

- Type in the public linkedin profile page;(the url must be accessible to public)

- Visualize the user's resume on map

### singlePage Branch
Source code for http://shanshanzhu.github.io
Remove Server side code and use personal data array(injected at scripts/router.js)

### Technical Stacks
Backbone/RequireJS/JQuery/Underscore
Grunt/Express/Node

### Major update
2013.1.24
Final wrap up.

2013.1.20
Major feature complete
To be deployed.

2013.1.6
[complete] the user can upload any linkedin publice profile linke (such as www.linkedin.com/pub/shanshan-zhu/34/886/53/ and information on the webpage can be converted to JSON objects on the server side. Also on the server side, the experience/education data is sorted according to the start date(year, or month-year) and pushed into an array, before being sent back to client side. 

[complete] With fake geolocation data, the marker can be rendered sequentially on map.
[partially complete] The text/job description can show up one letter by one letter

[complete] Set up server/backbone/requireJS/GoogleMap initial load.

