Reveal.addEventListener('slidechanged', function(event){
  if (window.animationTimeouts){
      for(var i = 0; i < window.animationTimeouts.length; i++){
        tid = window.animationTimeouts.pop();
        clearTimeout(tid);
      }
    } else {
      window.animationTimeouts = [];
    }

  if (event.indexh == 4) {
    animateNoBackpressure();
  } else if (event.indexh == 5) {
    animateBackpressure();
  }
});

function animateNoBackpressure(){
  var s = Snap("#no-backpressure");

  blink(s.select("#supplyArrow", 9));

  for (var i = 0; i < 9; i++) {
    var m = s.select("#mailbox" + (i + 1))
    m.attr({opacity: 0});

    showAfter(m, 1000 + (1000 * i));
  }
}

function animateBackpressure() {
  console.log("animateBackpressure");
  var s = Snap("#backpressure");

  var sArrow = s.select("#supplyArrow");
  var dArrow = s.select("#demandArrow");
  var m1 = s.select("#mailbox1");

  sArrow.attr({opacity: 0});
  dArrow.attr({opacity: 0});
  m1.attr({opacity: 0});

  for (var i = 0; i < 6; i++){
    // Show the demand arrow first and have it stay longest
    fadeAfter(dArrow, 1, 400 + (10000 * i));
    fadeAfter(sArrow, 1, 4000 + (10000 * i));
    showAfter(m1, 6000 + (10000 * i));
    if (i < 8) {
      fadeAfter(dArrow, 0, 3800 + (10000 * i));
      fadeAfter(sArrow, 0, 6000 + (10000 * i));
      hideAfter(m1, 9000 + (10000 * i));
    }
  }
}

function blink(element, times) {
  element.attr({opacity: 0});

  for (var i = 0; i < 9; i++) {
    showAfter(element, 1000 * (i + 1));
    if (i < 8) {
      hideAfter(element, 500 + (1000 * (i + 1)));
    }
  }

}

function fadeAfter(element, opacity, delay) {
  var closure = function(){
    element.animate({opacity: opacity}, 300);
  }
  window.animationTimeouts.push(setTimeout(closure, delay));
}

function showAfter(element, delay) {
  closure = generateClosure(element);
  window.animationTimeouts.push(setTimeout(closure, delay));
}

function hideAfter(element, delay) {
  var closure = function(){
    element.attr({opacity: 0});
  }
  window.animationTimeouts.push(setTimeout(closure, delay));
}

function generateClosure(element) {
  return function(){
    element.attr({opacity: 1});
  }
}
