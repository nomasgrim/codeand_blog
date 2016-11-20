console.log('main js live for real');

function airTablePeople() {
  console.log('airTablePeopleFunction');
  $.ajax({
    type: 'GET',
    url: '/getPeople',
    dataType: 'json',
    success: function (records) {
      console.log('data', records);
      records.forEach(function (record) {
        $( ".people" ).append( "<p>" + record + "</p>" );
      })
    }
  });
}
