//preload code
$(window).on('load', function() {
    $('.preloader').fadeOut(1000);
});

// Go to head button
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}


//cursor move
$(document).ready(function() {
    let $cursor = $('#magnifier');

    // تحديث موضع المؤشر
    $(document).mousemove(function(e) {
        $cursor.css({
            left: e.clientX + 'px',
            top: e.clientY + 'px'
        });
    });

    // تكبير المؤشر عند التمرير فوق الروابط
    $('a').mouseenter(function() {
        $cursor.addClass('cursor-large');
        $cursor.css("opacity", "0.5");
    }).mouseleave(function() {
        $cursor.removeClass('cursor-large');
        $cursor.css("opacity", "1");
    });
});


// menu for inner page
function toggleMenu() {
    let menu = document.getElementById("menu");
    let fa1=document.getElementById('fa1');
    let fa2=document.getElementById('fa2');
    let botton=document.getElementById('main-button');
    if (menu.classList.contains("open")) {
        menu.classList.remove("open");
        fa1.style.display='block';
        fa2.style.display='none';
        botton.style.background='none';
        setTimeout(function() {
            menu.style.display = "none";
        }, 500); // نفس مدة الانتقال في CSS
    } else {
        menu.style.display = "block";
        fa2.style.display='block';
        fa1.style.display='none';
        botton.style.background='#000000';
        setTimeout(function() {
            menu.classList.add("open");
        }, 0); // بدون تأخير، لتمكين الانتقال
    }
}

// إغلاق القائمة عند النقر في أي مكان خارجها
document.addEventListener('click', function(event) {
    let menu = document.getElementById("menu");
    let button = document.querySelector('.toggle-button');
    let botton=document.getElementById('main-button');
    let fa1=document.getElementById('fa1');
    let fa2=document.getElementById('fa2');
    if (!button.contains(event.target) && !menu.contains(event.target)) {
        if (menu.classList.contains("open")) {
            menu.classList.remove("open");
            fa1.style.display='block';
            fa2.style.display='none';
            botton.style.background='none';
            setTimeout(function() {
                menu.style.display = "none";
            }, 500); // نفس مدة الانتقال في CSS
        }
    }
});


(function () {
    "use strict";

    // Vertical veiws_slider object
    const vertical_veiws_slider = {

        // Slide class name
        veiws_slider_class: ".veiws_slider",

        // Show slide
        show_slide: function (slide_id, context_item) {
            const slide_container = context_item.closest(this.veiws_slider_class).querySelector(".veiws_slides");
            if (slide_container) {
                const veiws_slides = slide_container.querySelectorAll(".slide");
                if (veiws_slides && veiws_slides[slide_id]) {

                    // Scroll to active slide
                    slide_container.scrollTo({
                        top: veiws_slides[slide_id].offsetTop,
                        behavior: "smooth"
                    });


                    // Set active context item
                    const active_context_item = context_item.closest(".slide_navigation").querySelector(".active");
                    if (active_context_item) {
                        active_context_item.classList.remove("active");
                    }

                    context_item.classList.add("active");
                }
            }
        },

        // Initialize slide
        init_veiws_slider: function (veiws_slider) {

            const navigation_items = veiws_slider.querySelectorAll(".slide_navigation a");

            if (navigation_items) {
                Object.keys(navigation_items).forEach(function (key) {
                    navigation_items[key].onclick = function (e) {
                        e.preventDefault();

                        vertical_veiws_slider.show_slide(key, navigation_items[key]);
                    };
                });
            }

        },

        // Initialize veiws_sliders
        init: function () {

            // Iterate over each veiws_slider
            document.querySelectorAll(this.veiws_slider_class).forEach((veiws_slider) => this.init_veiws_slider(veiws_slider));

        }
    };

    // Initialize veiws_sliders
    vertical_veiws_slider.init();
}());