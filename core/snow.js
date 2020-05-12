// Backgound image from Windows Glaciers panoramic theme
// Perito Moreno Glacier, Los Glaciares National Park, Patagonia, Argentina

// Animation based on Diaco's particle demos
// https://codepen.io/MAW/pen/KdmwMb
// https://codepen.io/MAW/pen/pvyoQL
// https://codepen.io/MAW/pen/MYywaw

//var baseURL = "../img/";

var w = window.innerWidth;
var h = window.innerHeight;
//var globalSnow;
var rad = Math.PI / 180;

var size = { x: 1920, y: 980 };

var total = 600;
var snowflakes = [];

var linear = Linear.easeNone;
var sine = Sine.easeInOut;

var resize = debounce(resizeScene, 100);

var sprites = new PIXI.ParticleContainer(total, {
  scale: true,
  position: true,
  rotation: false,
  uvs: false,
  alpha: false
});

var app = new PIXI.Application(w, h, {
  view: document.querySelector("canvas"),
  backgroundColor: 0xEB1E28,
  autoStart: false
});

var loader = new PIXI.loaders.Loader()
  .add("snowflake", "img/snowFlake.svg") 
  .load(initSnow);

var stage = app.stage;
// var glacier = new PIXI.Sprite();

stage.alpha = 0;
// stage.addChild(glacier);
stage.addChild(sprites);

//
// INIT
// ===========================================================================
function initSnow(loader, assets) {
  console.log("snow")
  // glacier.texture = assets.glacier.texture; 

  for (var i = 0; i < total; i++) {

    var snowflake = new PIXI.Sprite.from('img/snowFlake.svg');

    snowflake.anchor.set(0.5);
    snowflake.scale.set(random(0.15, 0.45));
        
    snowflakes.push(snowflake);
    sprites.addChild(snowflake);
  }

  window.addEventListener("resize", resize);
  resize();
  
  app.start();
  
  TweenLite.to(stage, 0.5, { alpha: 1, delay: 0.25 });
}

//
// ANIMATE SNOWFLAKE
// ===========================================================================
function animateSnowflake(snowflake) {
  
  TweenMax.to(snowflake, random(1, 10), { x: "-=200", repeat: 2, yoyo: true, ease: sine });
  TweenMax.to(snowflake, random(1, 8), { y: h + 100, ease: linear, repeat: 2, delay: -15 });
}

//
// RESIZE SCENE
// ===========================================================================
function resizeScene() {

  w = window.innerWidth;
  h = window.innerHeight;
  
  var ratio = Math.max(w / size.x, h / size.y);

  app.renderer.resize(w, h);

  // glacier.scale.set(ratio);

  for (var i = 0; i < total; i++) {

    var snowflake = snowflakes[i];

    TweenLite.killTweensOf(snowflake);

    var x = random(-200, w + 200);
    var y = random(-200, -150);

    snowflake.position.set(x, y);
    window.globalSnow = snowflake;
    //console.log(globalSnow);
    animateSnowflake(snowflake);
  } 
}

//
// DEBOUNCE
// ===========================================================================
function debounce(callback, time) {
  var timeout;
  return function() {
    clearTimeout(timeout); 
    timeout = setTimeout(callback, time);
  };
}

//
// RANDOM
// ===========================================================================
function random(min, max) {

  if (max == null) { max = min; min = 0; }
  if (min > max) { var tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}