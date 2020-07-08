$(document).ready(onReady);

function onReady() {
  getMusicData();
  $('.js-add').on('click', clickAddMusic);
  $('.js-musicTableBody').on('click', '.js-btn-delete', clickDeleteMusic);
}

//
// EVENT HANDLERS
// ------------------------------

function clickAddMusic() {
  let payloadObject = {
    artist: $('.js-artist').val(),
    track: $('.js-track').val(),
    rank: $('.js-rank').val(),
    published: $('.js-published').val()
  };

  postMusicData(payloadObject);
}

function clickDeleteMusic() {
  const id = $(this).data('idSong');
  deleteSong(id);
}

//
// AJAX Server API Requests
// ------------------------------

// get artist data from the server
function getMusicData() {
  $("#musicTableBody").empty();
  $.ajax({
    type: 'GET',
    url: '/api/music'
  }).then(function (response) {
    console.log("server response:", response);
    // append data to the DOM
    render(response);
  });
}

function postMusicData(musicData) {
  $.ajax({
    type: 'POST',
    url: '/api/music',
    data: musicData
  }).then( function (response) {
    clearForm();
    getMusicData();
  });
}

function deleteSong(songId) {
  $.ajax({
    type: 'DELETE',
    url: `/api/music/${songId}`
  })
  .then((response) => {
    getMusicData();
  })
  .catch((err) => {
    console.log('err: ', err);
    alert('Stuff broke!!!');
  })
}

//
// DOM Manipulation
// ------------------------------

function clearForm() {
  $('.js-artist').val('');
  $('.js-track').val('');
  $('.js-rank').val('');
  $('.js-published').val('');
}

function render(musicLibrary) {
  $('.js-musicTableBody').empty();
  for (let i = 0; i < musicLibrary.length; i++) {
    const musicItem = musicLibrary[i];
    $('.js-musicTableBody').append(`
      <tr>
        <td>${musicItem.artist}</td>
        <td>${musicItem.track}</td>
        <td>${musicItem.rank}</td>
        <td>${musicItem.published}</td>
        <td>
          <button data-id-song="${musicItem.id}" class="js-btn-delete">
            DELETE
          </button>
        </td>
      </tr>
    `);
  }
}