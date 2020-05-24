$(function(){
  function buildHTML(message){
    if (message.image) {
      var current_user = `<img src=${message.image}>`
    } else {
      var current_user = ''
    }
    var html = `<div class="post">
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
                    ${current_user}
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
      $('.submit-btn').attr('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました')
      $('.submit-btn').attr('disabled', false);
    })
  })
});