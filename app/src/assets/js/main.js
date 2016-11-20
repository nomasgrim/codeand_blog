console.log('main js live for real');

function airTablePeople() {
  console.log('airTablePeopleFunction');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8081/getPeople',
    dataType: 'json',
    success: function (records) {
      console.log('data', records);
      records.forEach(function (record) {
        $( ".people" ).append( "<p>" + record + "</p>" );
      })
    }
  });
}
