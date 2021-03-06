// Copyright (c) 2015 Bitcamp

var BASE_STAR_SIZE = 12;
var STAR_LOCATIONS = [[120,320],
                      [120,775],
                      [400,475],
                      [525,225],
                      [805,850],
                      [930,340],
                      [1200,200],
                      [1325,800],
                      [1525,350],
                      [1825,580],
                      [1975,175],
                      [2050,750]];
var ADJUST_X = 2180;
var ADJUST_Y = 980;

$(document).ready(
  function () {
    drawSky();
    fixLogs();
  }
);

// Hides logs if device screen is too short to display properly.
// Render logs properly on iOS.
window.addEventListener("resize", function(){fixLogs();setTimeout(drawSky, 200);}, false);
function fixLogs() {
  var height = $(window).height();
  var width = $(window).width();
  var aspect_ratio = width * 1.0 / height * 1.0;
  console.log(height);
  if( (width > 1080 && height < 625)
    || (width > 720 && height < 580)
    || (width > 480 && height < 505)
    || (width > 360 && height < 445)) {
    $('.logs').hide();
  } else {
    $('.logs').show();
  }

  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  
  $('.logs').css('bottom', height * .195);
  $('footer').css('height', height * 0.2);
  $('.sky').css('height', height * 0.8);
  $('#sky-canvas').css('height', height * 0.8);
  $('.signup-container').css('bottom', height * 0.52);
  $('.date-container').css('bottom', height * 0.62);
}

function getPixelRatio(canvasContext) {
  devicePixelRatio = window.devicePixelRatio || 1;
  backingStoreRatio = canvasContext.webkitBackingStorePixelRatio ||
    canvasContext.mozBackingStorePixelRatio ||
    canvasContext.msBackingStorePixelRatio ||
    canvasContext.oBackingStorePixelRatio ||
    canvasContext.backingStorePixelRatio || 1;
  return devicePixelRatio / backingStoreRatio; 
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawSky() {
  var canvasDom = $('#sky-canvas');
  var canvas = canvasDom[0];
  var context = canvas.getContext('2d');

  // Increase canvas size to make it HiDPI, so that lines are sharp
  var renderedHeight = canvasDom.height();
  var renderedWidth = canvasDom.width();
  var pixel_ratio = getPixelRatio(context); 

  canvas.height = renderedHeight * pixel_ratio;
  canvas.width = renderedWidth * pixel_ratio;
  
  var adjust_x_ratio = canvas.width/ADJUST_X;
  var adjust_y_ratio = canvas.height/ADJUST_Y;

  // Loop over star coordinates to generate and draw rectangles for stars
  // 
  context.fillStyle = '#FFFFFF';
  STAR_LOCATIONS.forEach(
    function(element, index, array){
      var x = element[0] + getRandomInt(-30, 30);
      var y = element[1] + getRandomInt(-30, 30);
      context.fillRect(
        x * adjust_x_ratio,
        y * adjust_y_ratio,
        BASE_STAR_SIZE * adjust_x_ratio,
        BASE_STAR_SIZE * adjust_x_ratio
      );
    }
  );

}
