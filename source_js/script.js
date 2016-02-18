/*
Javascript code source/references:
Smooth Scrolling: Implemented a much simpler version of this: http://stackoverflow.com/questions/4198041/jquery-smooth-scroll-to-an-anchor
Resizing Nav bar: http://www.w3schools.com/jsref/met_element_setattribute.asp
 */

var sections = document.getElementsByTagName('section');
var menuLinks = document.getElementsByClassName('scroll');
var body = document.getElementsByTagName("body")[0];
var nav = document.getElementsByTagName("nav")[0];

var carouselItems = $('#carousel').children('li');
var currentItem = 0; // Current item the carousel shows.

var modal = document.getElementById('modal');
var modalContent1 = document.getElementById('modal-content1');
var modalContent2 = document.getElementById('modal-content2');
var modalContent3 = document.getElementById('modal-content3');
/*
var divs = document.getElementsByTagName('div');
for(var i=0; i<divs.length; i++) {

  divs[i].addEventListener("click", highlightThis);

  divs[i].addEventListener("click", highlightThis, true);
  divs[i].addEventListener("click", highlightThis, false);
}

function highlightThis(event) {
    //event.stopPropagation();

    var backgroundColor = this.style.backgroundColor;
    this.style.backgroundColor='yellow';
    alert(this.className);
    this.style.backgroundColor=backgroundColor;
}*/

// Smooth scrolling to a section when clicking the menu links.
function smoothScrolling() {
    $(".scroll").click(function(event){
        event.preventDefault(); //Prevent the default event of instant scroll

        var dest = $(this.hash).offset().top;
        $('html,body').animate({scrollTop:dest}, 800);
    });
}

// Carousel for image slides.
function carousel() {
    var speed = 400;
    carouselItems.fadeOut(speed).eq(currentItem).fadeIn(speed);
}

// Indicates the position in the document by focusing the menu link.
function positionIndicator() {
    var top = $('#navbar').offset().top;
    var bottom = top + $('#navbar').height();
    var section = null;

    for( var i = 0; i < sections.length; i++ ) {
        if( bottom >= $('#' + sections[i].id).offset().top ) {
            section = sections[i];
        }
    }
    if( section == null ) {
        section = body;
        nav.setAttribute("class", "large");
    } else {
        if( top >= $('#' + section.id).offset().top )
            nav.setAttribute("class", "small");
    }

    for( var i = 0; i < menuLinks.length; i++ ) {
        if( menuLinks[i].name == section.id ) {
            menuLinks[i].focus();
        }
    }
}

function movePrev() {
    currentItem--;
    if( currentItem < 0 ) {
        currentItem = carouselItems.length - 1;
    }
    carousel();
}

function moveNext() {
    currentItem++;
    if( currentItem > carouselItems.length - 1 ) {
        currentItem = 0;
    }
    carousel();
}

// Run when the document is ready.
$(function() {
    smoothScrolling();

    $("#prev").click(function() {
        movePrev();
    })
    $("#next").click(function() {
        moveNext();
    })
    moveNext();

    $("#modal-button1").click(function() {
        modal.style.display = "block";
        modalContent1.style.display = "block";
    })
    $("#modal-button2").click(function() {
        modal.style.display = "block";
        modalContent2.style.display = "block";
    })
    $("#modal-button3").click(function() {
        modal.style.display = "block";
        modalContent3.style.display = "block";
    })
});

// Run when the user is scrolling.
$( document ).scroll( function() {
    positionIndicator();
});

window.onclick = function(event) {
   if( event.target == modal ) {
       modal.style.display = "none";
       modalContent1.style.display = "none";
       modalContent2.style.display = "none";
       modalContent3.style.display = "none";
   }
};