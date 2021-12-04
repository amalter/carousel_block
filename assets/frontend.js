var sliders = document.querySelectorAll('.uwkc-carousel');

sliders.forEach( function (slide, i) {
  var settings = carousel_settings[i];
  //slider settings and defaults
  var slide_count = settings && settings.slide_count ? settings.slide_count : 1;
  var auto_play = settings && settings.auto_play ? true : false;
  var edge_padding = settings && settings.edge_padding ? settings.edge_padding : 0;
  var set_mode = settings && settings.set_mode ? settings.set_mode : 'carousel';
  var set_axis = settings && settings.set_axis ? settings.set_axis : 'horizontal';
  var set_gutter = settings && settings.set_gutter ? 10 : 0;
  var show_arrows = settings && settings.show_arrows ? true : false;
  var auto_height = settings && settings.auto_height ? true : false;

  var slider = tns({
    container: slide,
    controls: show_arrows,
    controlsPosition: 'bottom',
    controlsText: ['&#10094;', '&#10095;' ],
    navPosition: 'bottom',
    autoplay: auto_play,
    autoplayPosition: 'top',
    autoplayText: ['<span class="stop-start">&#9654;</span>','<span class="stop-start">&#10074;&#10074;</span>'],
    edgePadding: edge_padding,
    items: slide_count,
    slideBy: 'page',
    mode: set_mode,
    axis: set_axis, 
    gutter: set_gutter,
    arrowKeys: true,
    autoHeight: auto_height    
  });
});




