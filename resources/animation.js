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
  } else if (event.indexh == 28) {
    animateFlow();
  } else if (event.indexh == 34) {
    animateFlowPartition();
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

function animateFlow() {
  console.log("animateFlow");
  var s = Snap("#flow-diagram");

  var fileStreamArrow = s.select("#fileStreamArrow");
  var fromEnumerable = s.select("#fromEnumerable");
  var producerLabel = s.select("#producerLabel");
  var mapArrow1 = s.select("#mapArrow1");
  var mapArrow2 = s.select("#mapArrow2");
  var mapArrow3 = s.select("#mapArrow3");
  var flatmap1 = s.select("#flatmap1");
  var flatmap2 = s.select("#flatmap2");
  var flatmap3 = s.select("#flatmap3");
  var producerConsumerLabel = s.select("#producerConsumerLabel");
  var reduceArrow = s.select("#reduceArrow");
  var reduce1 = s.select("#reduce1");
  var reduce2 = s.select("#reduce2");
  var reduce3 = s.select("#reduce3");
  var consumerLabel = s.select("#consumerLabel");

  fileStreamArrow.attr({opacity: 0});
  fromEnumerable.attr({opacity: 0});
  producerLabel.attr({opacity: 0});
  mapArrow1.attr({opacity: 0});
  mapArrow2.attr({opacity: 0});
  mapArrow3.attr({opacity: 0});
  flatmap1.attr({opacity: 0});
  flatmap2.attr({opacity: 0});
  flatmap3.attr({opacity: 0});
  producerConsumerLabel.attr({opacity: 0});
  reduceArrow.attr({opacity: 0});
  reduce1.attr({opacity: 0});
  reduce2.attr({opacity: 0});
  reduce3.attr({opacity: 0});
  consumerLabel.attr({opacity: 0});

  showAfter(fileStreamArrow, 2000);
  showAfter(fromEnumerable, 2000);
  showAfter(mapArrow1, 5000);
  showAfter(mapArrow2, 5000);
  showAfter(mapArrow3, 5000);
  showAfter(flatmap1, 5000);
  showAfter(flatmap2, 5000);
  showAfter(flatmap3, 5000);
  showAfter(reduceArrow, 10000);
  showAfter(reduce1, 10000);
  showAfter(reduce2, 10000);
  showAfter(reduce3, 10000);
  showAfter(producerLabel, 15000);
  showAfter(producerConsumerLabel, 17000);
  showAfter(consumerLabel, 19000);
}

function animateFlowPartition() {
  console.log("animateFlowPartition");
  var s = Snap("#know-your-data");

  var arrow1 = s.select("#arrow1");
  var arrow2 = s.select("#arrow2");
  var arrow3 = s.select("#arrow3");
  var mappers = s.select("#mappers");
  var mapArrow = s.select("#mapArrow");
  var reduce1 = s.select("#reduce1");
  var reduce2 = s.select("#reduce2");
  var reduce3 = s.select("#reduce3");
  var reduceArrow = s.select("#reduceArrow");
  var output = s.select("#output");

  arrow1.attr({opacity: 0});
  arrow2.attr({opacity: 0});
  arrow3.attr({opacity: 0});
  mapArrow.attr({opacity: 0});
  reduceArrow.attr({opacity: 0});
  output.attr({opacity: 0});
  reduce1.attr({fill: "#add9e4", stroke: "#74a7cb"});
  reduce2.attr({fill: "#add9e4", stroke: "#74a7cb"})

  showAfter(arrow1, 10000);
  showAfter(arrow2, 10000);
  showAfter(arrow3, 10000);
  showAfter(mapArrow, 15000);
  showAfter(reduceArrow, 20000);
  showAfter(output, 20000);

  var redTimeout1 = setTimeout(function() {
    reduce1.attr({fill: "#de8787", stroke: "#b81729"});
  }, 25000);
  window.animationTimeouts.push(redTimeout1);

  var redTimeout2 = setTimeout(function() {
    reduce2.attr({fill: "#de8787", stroke: "#b81729"});
  }, 25000);
  window.animationTimeouts.push(redTimeout2);

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
