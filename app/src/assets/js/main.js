console.log('main js live for real');

var Airtable = require('airtable');

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: 'keyDrK9mmPrxhVaUW'
});
var base = Airtable.base('appbLOgSXFJxYYuzo');


base('People').select({
  // Selecting the first 3 records in All Contacts:
  maxRecords: 4,
  view: "All Contacts"
}).eachPage(function page(records, fetchNextPage) {

  // This function (`page`) will get called for each page of records.

  records.forEach(function(record) {
    console.log('Retrieved ', record.get('Name'));
  });

  // To fetch the next page of records, call `fetchNextPage`.
  // If there are more records, `page` will get called again.
  // If there are no more records, `done` will get called.
  fetchNextPage();

}, function done(error) {
  if (error) {
    console.log(error);
  }
});


