$(window).scroll(function () {
  if ($(this).scrollTop() > 100) {
    $('.header').addClass("move");
    $('.logo').addClass("move");
  }
  else {
    $('.header').removeClass("move");
    $('.logo').removeClass("move");
  }
  if ($(this).scrollTop() > 200) {
    $('.bmw').css({
      'transition': "0s"
    });
    $('.audi').css({
      'transition': "0s"
    });
  }

  $('.bmw').css({
    'top': ($(this).scrollTop() * 1.3) + "px",
  });
  $('.audi').css({
    'top': ($(this).scrollTop() * 1.3) + "px",
  });
  if ($(this).scrollTop() < 100) {
    $('.bmw').css({
      'transition': "0.3s",
      'top': "-350px"
    });
    $('.audi').css({
      'transition': "0.3s",
      'top': "-350px"
    });
  }
  $('.roud').css({
    'top': -($(this).scrollTop() / 5) + "px",
  });
 
  if ($(this).scrollTop() > window.innerWidth/2+100) {
    $('.bmw').css({
      'opacity': "0"
    });
    $('.audi').css({
      'opacity': "1"
    });
  } else {
    $('.bmw').css({
      'opacity': "1"
    });
    $('.audi').css({
      'opacity': "0"
    });
  }
  if ($(this).scrollTop() > window.innerWidth/2+250) {
    $('.car-box-text div:last-child').css({
      'margin-left': "90px",
      'transition': "0.4s",
    }); 
    $('.car-box-text div:first-child').css({
      'margin-right': "100px",
      'transition': "0.4s",
    }); 
  }else{
    $('.car-box-text div:last-child').css({
      'margin-left': "5px",
      'transition': "0.4s",
    }); 
    $('.car-box-text div:first-child').css({
      'margin-right': "5px",
      'transition': "0.4s",
    }); 
  }
  if($(this).scrollTop() > window.innerWidth/2+550){
    $('.car-box-text div:last-child').css({
      'margin-left': "5px",
      'transition': "0.4s",
    }); 
    $('.car-box-text div:first-child').css({
      'margin-right': "5px",
      'transition': "0.4s",
    }); 
  } 
  if ($(this).scrollTop() > 100) {
    
  }
});
var header = $(".classinitial"); 