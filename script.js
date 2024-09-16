$(document).ready(function () {

  // Sticky header
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1) {
      $(".header-area").addClass("sticky");
    } else {
      $(".header-area").removeClass("sticky");
    }

    // Update the active section in the header
    updateActiveSection();
  });

  // Smooth scroll on clicking the header menu links
  $(".header ul li a").click(function (e) {
    e.preventDefault();

    var target = $(this).attr("href");

    if ($(target).hasClass("active-section")) {
      return;
    }

    if (target === "#home") {
      $("html, body").animate(
        {
          scrollTop: 0
        },
        500
      );
    } else {
      var offset = $(target).offset().top - 40;

      $("html, body").animate(
        {
          scrollTop: offset
        },
        500
      );
    }

    $(".header ul li a").removeClass("active");
    $(this).addClass("active");
  });

  // Hamburger menu functionality
  $('.menu_icon').click(function () {
    console.log("Hiii");
    
    $('.navbar').toggleClass('active'); // Toggle the 'active' class on the navbar
    $(this).toggleClass('open'); // Optionally, toggle a class on the hamburger icon to animate it
  });

  // Initial content revealing js
  ScrollReveal({
    distance: "100px",
    duration: 2000,
    delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
    origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
    origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
    origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
    origin: "bottom"
  });

  // Contact form submission via email
  function emailSend() {
    let form = document.getElementById('form');
    var userName = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    let subject = document.getElementById('subject').value;

    var messageBody = "Name: " + userName +
      "<br/> Phone: " + phone +
      "<br/> Email: " + email;

    Email.send({
      SecureToken : "f6b65b1d-9236-4e74-bea7-db2de16e7f8c ",
      To: 'himanshukumarray448@gmail.com',
      From: "himanshukumarray448@gmail.com",
      Subject: subject,
      Body: messageBody
    }).then(
      message => {
        if (message == 'OK') {
          swal("Successful", "Your message has been sent!", "success");
        } else {
          swal("Error", "There was an issue sending your message!", "error");
        }
      }
    );
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    emailSend();
  });

});

// Function to update active section in the header based on scroll position
function updateActiveSection() {
  var scrollPosition = $(window).scrollTop();

  // Checking if scroll position is at the top of the page
  if (scrollPosition === 0) {
    $(".header ul li a").removeClass("active");
    $(".header ul li a[href='#home']").addClass("active");
    return;
  }

  // Iterate through each section and update the active class in the header
  $("section").each(function () {
    var target = $(this).attr("id");
    var offset = $(this).offset().top;
    var height = $(this).outerHeight();

    if (
      scrollPosition >= offset - 40 &&
      scrollPosition < offset + height - 40
    ) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#" + target + "']").addClass("active");
    }
  });
}