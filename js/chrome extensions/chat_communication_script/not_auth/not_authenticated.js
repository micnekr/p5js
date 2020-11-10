const host = "https://localhost:8124/"

$(document).ready(function() {
  const $errorMessage = $(".errorMessage").hide();
  $("#form").submit((evt) => {
    evt.preventDefault();
    $.post(host + "login/", {
      username: $("#username").val(),
      password: $("#password").val(),
    }, function(data) {
      // TODO: add data to storage, redirect
      chrome.browserAction.setPopup({
        popup: "chat/chat.html"
      });
      window.close();
    }).fail((xhr) => {
      $("#password").val("");
      let code = xhr.status;
      let text = xhr.responseText || ("Unknown error. Error code: " + code);
      $errorMessage.fadeIn().html(text);
    })
  })
}) // end ready