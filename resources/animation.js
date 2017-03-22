Reveal.addEventListener('fragmentshown', function(event){
  console.log("fragmentshown", event);
  if (event.fragment.id === "animated-flow-text") {
    console.log("showing flow text, hiding genstage text");
    document.getElementById("animated-genstage-text").className = "hidden";
    document.getElementById("animated-flow-text").className = "";
  }

  if (event.fragment.id === "basic-flow-1") {
    console.log("showing fromEnumerable");
    showSVGElements("#flow-diagram", ["#fileStreamArrow", "#fromEnumerable"])
  }

  if (event.fragment.id === "basic-flow-2") {
    console.log("showing mapping");
    showSVGElements("#flow-diagram", ["#mapArrow1", "#mapArrow2", "#mapArrow3", "#flatmap1", "#flatmap2", "#flatmap3"]);
  }

  if (event.fragment.id === "basic-flow-3") {
    console.log("showing reducing");
    showSVGElements("#flow-diagram", ["#reduceArrow", "#reduce1", "#reduce2", "#reduce3"]);
  }

  if (event.fragment.id === "basic-flow-4") {
    console.log("showing labels");
    showSVGElements("#flow-diagram", ["#producerLabel", "#producerConsumerLabel", "#consumerLabel"]);
  }

  if (event.fragment.id === "know-data-1") {
    console.log("showing stream arrows");
    showSVGElements("#know-your-data", ["#arrow1", "#arrow2", "#arrow3"]);
  }

  if (event.fragment.id === "know-data-2") {
    console.log("showing map arrows");
    showSVGElements("#know-your-data", ["#mapArrow", "#reduceArrow", "#output"]);
  }

  if (event.fragment.id === "know-data-3") {
    console.log("turning processes red");
    reddenSVGElements("#know-your-data", ["#reduce1", "#reduce2"]);
  }
});

function showSVGElements(svg, elements) {
  var s = Snap(svg);

  for (var i = 0; i < elements.length; i++) {
    var element = s.select(elements[i]);
    element.attr({opacity: 1});
  }
}

function reddenSVGElements(svg, elements) {
  var s = Snap(svg);

  for (var i = 0; i < elements.length; i++) {
    var element = s.select(elements[i]);
    element.attr({fill: "#de8787", stroke: "#b81729"});
  }
}

Reveal.addEventListener('fragmenthidden', function(event){
  console.log("fragmenthidden", event);
});

Reveal.addEventListener('slidechanged', function(event){
  if (window.animationTimeouts){
    for(var i = 0; i < window.animationTimeouts.length; i++){
      tid = window.animationTimeouts.pop();
      clearTimeout(tid);
    }
  } else {
    window.animationTimeouts = [];
  }

  // Get slide information to trigger animation
  var slide = Reveal.getCurrentSlide();
  var slidename = slide.dataset.html;

  var animations = {
    "slides/gold-decryption.html": animateGoldDecryption,
    "slides/backpressure.html": animateNoBackpressure,
    "slides/backpressure-2.html": animateBackpressure,
    "slides/basic-flow-diagram.html": animateFlow,
    "slides/know-your-data.html": animateFlowPartition
  }

  var animation = animations[slidename];
  if (animation) {
    animation(event);
  }
});

function animateGoldDecryption(){
  var s = Snap("#gold-decryption");

  var goldMarker = s.select("#goldMarker");

  goldMarker.attr({opacity: 0});

  for (var i = 1; i < 8; i++) {
    var file = s.select("#encryptedFile"+i);
    file.attr({fill: "#74a7cb"}); // reset to blue
    var color = i == 7 ? "#d4aa00" : "#b81729";
    changeColorAfter(file, color, 2000 * i);
  }

  showAfter(goldMarker, 14000);
}

function changeColorAfter(element, color, delay) {
  var closure = function(){
    element.attr({fill: color});
  }
  window.animationTimeouts.push(setTimeout(closure, delay));
}

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

function animateFlow(event) {
  console.log("animateFlow", event.previousSlide ? event.previousSlide.className : "");

  // Don't need to build if going backwards
  if (event.previousSlide && event.previousSlide.className == "future") {
    // Also remove the "fragment" class from the fragments
    document.getElementById("basic-flow-1").className = "hidden";
    document.getElementById("basic-flow-2").className = "hidden";
    document.getElementById("basic-flow-3").className = "hidden";
    document.getElementById("basic-flow-4").className = "hidden";
    return;
  } else {
    document.getElementById("basic-flow-1").className = "fragment hidden";
    document.getElementById("basic-flow-2").className = "fragment hidden";
    document.getElementById("basic-flow-3").className = "fragment hidden";
    document.getElementById("basic-flow-4").className = "fragment hidden";
  }

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

  /* // Animation is controlled through fragment events
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
  showAfter(consumerLabel, 19000); //*/
}

function animateFlowPartition(event) {
  console.log("animateFlowPartition", event.previousSlide ? event.previousSlide.className : "");

  // Don't need to build if going backwards
  if (event.previousSlide && event.previousSlide.className == "future") {
    // Also remove the "fragment" class from the fragments
    document.getElementById("know-data-1").className = "hidden";
    document.getElementById("know-data-2").className = "hidden";
    document.getElementById("know-data-3").className = "hidden";
    return;
  } else {
    document.getElementById("know-data-1").className = "fragment hidden";
    document.getElementById("know-data-2").className = "fragment hidden";
    document.getElementById("know-data-3").className = "fragment hidden";
  }

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

  /*
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
  window.animationTimeouts.push(redTimeout2); //*/

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
