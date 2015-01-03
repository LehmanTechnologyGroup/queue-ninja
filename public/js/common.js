var Header = Header || {};

(function(header) {
  header = {
    init : function() {
      $('#sign_up_link').click(function(e) {
        $('#sign_up_modal').lightbox_me({
          centered : true,
        });
        e.preventDefault();
      });
    },
  };
})(Header);

$(document).ready(function() {
  Header.init();
});