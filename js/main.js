window.onload = function () {

  // init controller
  // const controller = new ScrollMagic.Controller();

  // create a scene
  // new ScrollMagic.Scene({
  //   duration: 100, // the scene should last for a scroll distance of 100px
  //   offset: 50, // start this scene after scrolling for 50px
  // })
  //   .setPin('#my-sticky-element') // pins the element for the the scene's duration
  //   .addTo(controller); // assign the scene to the controller

}

document.addEventListener('DOMContentLoaded', function () {
  const dateSpan = document.querySelector('.echo-date');
  if (dateSpan) {
    dateSpan.textContent = new Date().getFullYear();
  }
});