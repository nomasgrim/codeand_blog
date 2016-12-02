### Objective
> create and develop a custom blog using FrontEnd stack.

#### Technologies
* Gulp
* Angular 2.0 @TO DO
* Jade
* Stylus
* Airtable

#### Creative
in creative folder

#### setup
##### Step 1
clone repo

##### Step 2
be in the root directory then run:
``` npm install ```
> installs all needed node_modules

##### Step 3
``` gulp build ```
> compiles pug and stylus into htdocs to be servable to the browser

##### Step 4
In root create environmentVars.js file add add your AirTable Api key to it. Example below:
```
var environmentVars = {
  apiKey: 'REPLACE_WITH_YOUR_API_KEY',
  database: 'REPLACE_WITH_YOUR_DATABASE'
};

module.exports = environmentVars;

```

##### Step 5
``` npm develop ```
> this will run gulp watch and start node server on `localhost:8080`

TODO: Since we switched from BrowserSync, we need to add gulp-live-reload to open 
webpage on start and reload browser after gulp watch runs.

#### Resources
* [BrowserSync](https://browsersync.io/docs/gulp)
* [Pug](https://pugjs.org/api/getting-started.html)
* [Stylus](http://stylus-lang.com/)
