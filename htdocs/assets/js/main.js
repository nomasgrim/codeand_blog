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
        console.log('record', record);
        $( ".people" ).append(
          "<div>" +
          "<span>" + record.fields.Name + "</span>" +
            "<img style='width:50px;height:50px;' src=" + record.fields.Pic[0].url + ">" +
          "</div>"
        );
      })
    }
  });
}
