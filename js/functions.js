$(document).ready(function(){
 loginDrop();
 sortTable();
 activePage()
 formValid();
 formDrop();
 shelfStatus();
 updateShelf();
//  realVerify();
});

function loginDrop(){
  $('#login-trigger').click(function(){
    $(this).toggleClass('inactive');
    $(this).next('#login-content').slideToggle();          
  });
  $('#login p').click(function(){
    $('#logout').slideToggle();
  });
}

function sortTable(){
  $('.allbooks').click(function(){
    $('tr').show();
  });
  $('.read').click(function(){
    $('tr').show();
    $('table').find('tr').each(function(){
      $('tr:contains("Currently Reading"), tr:contains("To-Read")').hide();
    }); 
  });
  $('.reading').click(function(){
    $('table').find('tr').each(function(){
      $('tr').not(':first-of-type').hide();
      $('tr:contains("Reading")').show();
    });
  });
  $('.toread').click(function(){
    $('table').find('tr').each(function(){
      $('tr').not(':first-of-type').hide();
      $('tr:contains("To-Read")').show();
    });
  });
}

function activePage(){
  var url = window.location.pathname;
  var link = url.substr(url.lastIndexOf('/') + 1);
  $('.navLinks a').each(function(){
    if($(this).attr('href') == link){
      $(this).addClass('active');}
  });
}

function formValid(){
  $('.register').validate({
    rules: {
      firstName: "required",
      lastName: "required",
      userName: "required",
      email: {
        required: true,
        email: true
      }
    }
  });
}

function formDrop(){
  $('#addBook').css('display', 'none');
  $('#addBook').click(function(){
    $(this).toggleClass('active');
    $(this).next('#login-content').slideToggle();          
  });
  $('#bookLink').click(function(){
    $('#addBook').slideToggle();
  });
}

function shelfStatus(){
  $('.shelf').one('click',(function(){
    $(this).html('<form><select name="status" class="status"><option value="0"></option><option value="1">Read</option><option value="2">Reading</option><option value="3">To-Read</option></select></form>');
    }));
}

function updateShelf(){
  $('.shelf').change(function(){
    var status = $('.status').val();
    var bookId = $(this).siblings(":hidden").html();
    $.ajax({
      type: "POST",
      url: 'updateStatus.php',
      data: {status, bookId},
      success: function(){
        location.reload();
      }
    })
  });
}

function realVerify(){
  grecaptcha.ready(function() {
    grecaptcha.execute('6LcJxp8UAAAAAHGGzsAiabWgKa3V1Yp2JG2TU3NN', {action: 'homepage'}).then(function(token) {
      var response = document.getElementById('recaptchaResponse');
      response.value = token;
    });
  });
}