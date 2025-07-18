/*-----------------------------------------------------------------------------------
    
    Template Name: Sasly - Multipurpose Landing Page HTML Template
    URI: site.com 
    Description: Sasly is a flexible and professional Multipurpose HTML template, ideal for a variety of landing page needs including SaaS, software, fintech, Ai, E-learning, creative agencies, consulting services, software subscriptions, web applications, and digital marketing websites. Designed with all the essential elements to create an impactful landing page or corporate site, Sasly covers every detail to suit your business needs. We have included best practices of web development and you can create a great website layout based on Bootstrap or Grid 1320px.
    Author: Pixelfit
    Author URI: https://themeforest.net/user/pixelfit
    Version: 1.0 
    
-----------------------------------------------------------------------------------*/

(function($) {
    'use strict';

    //===== Slick slider js

    $('.hero-content').animatedHeadline({
        animationType: 'rotate-1'
    });

    if ($('.testimonial-slider').length) {
        $('.testimonial-slider').slick({
            speed: 8000,
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: false,
            cssEase: 'linear',
            slidesToShow: 1,
            draggable:false,
            focusOnSelect:false,
            pauseOnFocus:false,
            pauseOnHover:false,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            initialSlide: 1,
            arrows: false,
            breakpoints: {
                992: {
                    slidesPerView: 4,
                },
                768: {
                    slidesPerView: 3,
                },
                576: {
                    slidesPerView: 2,
                },
            },
        });
    }
    if ($('.testimonial-slider-rtl').length) {
        $('.testimonial-slider-rtl').slick({
            speed: 8000,
            autoplay: true,
            autoplaySpeed: 0,
            centerMode: false,
            cssEase: 'linear',
            draggable:false,
            focusOnSelect:false,
            pauseOnFocus:false,
            pauseOnHover:false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            infinite: true,
            initialSlide: 1,
            arrows: false,
            buttons: false,
            rtl:true
        });
    }

    if ($('.company-slider').length) {
        $('.company-slider').slick({
            dots: false,
            arrows: false,
            infinite: true,
            speed: 6000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            slidesToShow: 7,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="far fa-arrow-left"></i></div>',
            nextArrow: '<div class="next"><i class="far fa-arrow-right"></i></div>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 6,
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4,
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }

    //====== Sticky Header 
    
    $(document).ready(function () {
        function initStickyHeader(headerSelector) {
            const header = $(headerSelector);
            let lastScroll = 0;
    
            $(window).on('scroll', function () {
                const currentScroll = $(this).scrollTop();
                if (currentScroll > 200) {
                    if (currentScroll < lastScroll) {
                        if (!header.hasClass('sticky')) {
                            header.addClass('sticky');
                        }
                    } else {
                        header.removeClass('sticky');
                    }
                } else if (currentScroll === 0) {
                    header.removeClass('sticky');
                }
                lastScroll = currentScroll;
            });
        }
        initStickyHeader('.header-area');
    });

})(window.jQuery);