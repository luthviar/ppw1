//1. Mengganti Tema Keseluruhan
var flag_theme = false;
document.getElementById('theme').onclick = function () {
	if(window.flag_theme) {
		document.getElementById('main_css').href ='css/style.css';
		document.getElementById('menu_css').href ='css/cssmenu.css';
		document.getElementById('slider_css').href ='css/style-slider.css';
		window.flag_theme = false;
	} else {
		document.getElementById('main_css').href = 'css/style2.css';
		document.getElementById('menu_css').href ='css/cssmenu2.css';
		document.getElementById('slider_css').href ='css/style-slider.css';
		window.flag_theme = true;
	}
};
//---- End Of Mengganti Tema Keseluruhan



//2. Dropdown JS
var timeout	= 450;
var closetimer	= 0;
var ddmenuitem	= 0;

function mopen(id) {	
	mcancelclosetime();

	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';

}

function mclose() {
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}


function mclosetime() {
	closetimer = window.setTimeout(mclose, timeout);
}


function mcancelclosetime() {
	if(closetimer)
	{
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

document.onclick = mclose; 
// ---- End Of Dropdown JS



//3. Timestamp
var RUNNINGOUT_IDLE = 30; //in seconds
var _secCounter = 0;
document.onclick = function() {
    _secCounter = 0;
};
document.onmousemove = function() {
    _secCounter = 0;
};
document.onkeypress = function() {
    _secCounter = 0;
};
window.setInterval(CheckIdleTime, 1000);

function CheckIdleTime() {
    _secCounter++;
    var objPan = document.getElementById("SecondsUntilExpire");
    if (objPan)
        objPan.innerHTML = (RUNNINGOUT_IDLE - _secCounter) + "";
    if (_secCounter >= RUNNINGOUT_IDLE) {
        alert("Perhatian! Anda sudah membiarkan page ini selama 30 detik");
    }
}
// ---- End Of Timestamp


//4. comment append OLD
// function commentAppend(){
// 	var name = document.getElementById("fullName");
// 	var email = document.getElementById("email");
// 	var comment = document.getElementById("commentUser");
// 	var result = document.getElementById("showComment");
	
// 	result.innerHTML +=  "<b>" + name.value +"</b>" + " (" + email.value + ") "+"<br>" + commentUser.value + "<br>" + "<br>" +"<hr>";
// }
//end of comment append


// 4. Comment Append + LocalStorage (NEW)
$('#postmore').click( function() {
   // var vDescription = $('#description').val();
   var vFullName = $('#fullName').val();
   var vEmail = $('#email').val();
   var vCommentUser = $('#commentUser').val();

  if(($('#fullName').val() == '') | ($('#email').val() == '') | ($('#commentUser').val() == '')) {
    $('#alert').html("<strong>Warning!</strong> You left the input empty");
    $('#alert').fadeIn().delay(1000).fadeOut();
    return false;
   }
   $('#newComment').append("<li><input id='check' name='check' type='checkbox'/>"  +" | " + vFullName +" | " + vEmail + " | "+ vCommentUser +"</li><br><br>");
   $('#form')[0].reset();
   var post = $('#newComment').html();
   localStorage.setItem('newComment', post);
   return false;
});

if(localStorage.getItem('newComment')) {
$('#newComment').html(localStorage.getItem('newComment'));
}

$('#clear').click( function() {
window.localStorage.clear();
location.reload();
return false;
});

// --- End of Comment + LocalStorage


// 5. Image Slider + Bonusnya
// source from : http://www.codepen.io 
// hanya satu function, yaitu pada slider saja
// lalu di dalam function ini, memiliki banyak function seperti :
// createBullets, manageControls, autoSlide, changeSlides, navigateLeft, navigateRight
$(document).ready(function() {
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 5000,
      $pagination = $(".slider-pagi");
  
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $("<li class='slider-pagi__elem'></li>");
      $li.addClass("slider-pagi__elem-"+i).data("page", i);
      if (!i) $li.addClass("active");
      $pagination.append($li);
    }
  };
  
  createBullets();
  
  function manageControls() {
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    curSlide = $(this).data("page");
    changeSlides();
  });
	 
		function slideSwitch()  {
        var $active = $('#slideshow a.active');
        if ( $active.length == 0 ) $active = $('#slideshow a:last');
        var $next =  $active.next().length ? $active.next()
        : $('#slideshow a:first');

        $active.addClass('last-active');

        $next.css({opacity: 0.0})
        .addClass('active')
        .animate({opacity: 1.0}, 1000, function()
        {
            $active.removeClass('active last-active');
        });
		}
});
// ---- End of Slider


// 6. Load XML table data
function loadXMLDoc() {
  
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      myFunction(xmlhttp);
    }
  }

  xmlhttp.open("GET", "xml/cd_catalog.xml", true);
  xmlhttp.send();
}


function myFunction(xml) {
  
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");

  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  
  document.getElementById("demo").innerHTML = table;
}
//-- end of Load XML


//7. Proses Load More
$(document).ready(function() {
  var iterator = 0;   
  $(".more_post").click(function() {

    $.ajax({
      url: "json/more_post.txt",
      datatype: "text",
      success: function(data) {
        var posts = JSON.parse(data);
        var post;
        if(iterator < 12) {
          for(var i = iterator; i < iterator+4; i++)  {
            post += "<hr> <div class='homes'> <h3>"+ i + "</h3>";
            post += "Date : " + posts.posts[i].date + "<br>";
            post += "Title : " + posts.posts[i].title + "<br>";
            post += "Author : " + posts.posts[i].author + "<br>";
            post += posts.posts[i].content;
            console.log(i);
          }
          $("#postajax").append(post);
          iterator += 4;
        }
      }
    });
  });
});
//--- End Of Load More