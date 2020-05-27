$(function(){
  function addUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`;
    $('#user-search-result').append(html);
  }
  function addNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>`;
    $('#user-search-result').append(html);
  }
  function addMember(userId, userName){
    var html = `<div class='chat-group-user clearfix' id ='$${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'> 
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html);
  }

  $('#user-search-field').on('keyup' , function(e){
    e.preventDefault();
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
      .done(function(users){
        $('#user-search-result').empty();
        if(users.length !== 0){
          users.forEach(function(user){
            addUser(user);
          });
        }else if(input.length == 0){
          return false;
        }else{
          addNoUser();
        }
      })
      .fail(function(){
        alert('通信エラーです。ユーザーが表示できません。');
      });
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    var userId = $(this).attr('data-user-id');
    var userName = $(this).attr('data-user-name');
    $(this)
      .parent()
      .remove();
    addMember(userId, userName);
  });
  $(document).on('click','.chat-group-user__btn--remove', function(){
    $(this)
      .parent()
      .remove();
  });
});