$(function(){
  function buildHTML(message){
    if (message.image) {
      var imageSet = `<img src=${message.image}>`
    } else {
      var imageSet = ''
    }
    var html = `<div class="post" data-post-id=${message.id}>
                  <div class="post__info">
                    <div class="post__info__name">
                      ${message.user_name}
                    </div>
                    <div class="post__info__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="post__comment">
                    <p class="post__comment__body">
                      ${message.body}
                    </p>
                    ${imageSet}
                  </div>
                </div>`
    return html
  };

  $('#new_message').on('submit' , function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight });
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
    })
    .always(function(){
      $('.submit-btn').attr('disabled', false);
    })
  })

  var reloadMessages = function(){
    var last_message_id = $('.post:last').data('post-id');
    $.ajax({
      url: 'api/messages',
      type: 'get',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      if (messages.length !== 0){
        var insertHTML = '';
        $.each(messages, function(i, message){
        insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML)
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight });
      }
    })
    .fail(function(){
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);
  }
});