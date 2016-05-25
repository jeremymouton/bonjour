$(document).ready( function() {

  /*
   * Nav collapse
   *
   */
  $('[data-nav-collapse]').click( function(e) {
    e.preventDefault();
    var target = $(this).data('nav-collapse');
    $(target).toggleClass('is-active');
  });

});
