console.log('main js live for real');

function airTablePeople() {
  console.log('airTablePeopleFunction');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8081/',
    dataType: 'json',
    success: function (data) {
      console.log('data', data.responseText);
    }
  });
}

function testDataCall() {
  console.log('testDataCallFunction');
  $.ajax({
    type: 'GET',
    url: 'http://localhost:8081/testDataCall',
    dataType: 'json',
    success: function (data) {
      console.log('data', data.responseText);
    }
  });
}
