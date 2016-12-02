console.log('main js live for real');

/**
 * Function that will hit AirTable API to return data from People DB
 */
function getAirTableData() {
  $.ajax({
    type: 'GET',
    url: '/getPeople',
    dataType: 'json',
    success: function (records) {
      console.log('airTableRecords', records);
      displayAirTableData(records);
    }
  });
}

/**
 * Display AirTable Data on page
 * @param records
 */
function displayAirTableData (records) {
  records.forEach(function (record) {
    console.log('record', record);
    $( "[data-air-table-object]" ).append(
      "<div>" +
      "<span>" + record.fields.Name + "</span>" +
      "<img src=" + record.fields.Pic[0].thumbnails.small.url + ">" +
      "</div>"
    );
  })
}
