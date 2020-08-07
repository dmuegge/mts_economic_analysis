require(["jquery", 
"underscore", 
"splunkjs/mvc", 
"util/console",
'splunkjs/mvc/simplexml/ready!'], function ( $, _, mvc, console) {

  



  function setToken(name, value) {
    console.log("Setting Token %o=%o", name, value);
    var defaultTokenModel = mvc.Components.get("default");
    if (defaultTokenModel) {
      defaultTokenModel.set(name, value);
    }
    var submittedTokenModel = mvc.Components.get("submitted");
    if (submittedTokenModel) {
      submittedTokenModel.set(name, value);
    }
    updateLayoutWidth();
  }

  function updateLayoutWidth() {
    // Code from custom layout width
    $("[id*=setWidth]").each(function() {
      var match = /setWidth_(\d+(?:_\d+)?)/.exec($(this).attr('id'));
      if (match[1]) {
          $(this).closest(".dashboard-cell").css('width', match[1].replace("_", ".") + '%');
      }
    });
    // Force visualizations (esp. charts) to be redrawn with their new size
    $(window).trigger('resize');
  }

  $(document).ready(function () { 
    
    updateLayoutWidth();
        
  });


  $(window).load(function () {
    
    //updateLayoutWidth();

  });

  $(".dashboard-body").on(
    "click",
    "[data-set-token],[data-unset-token],[data-token-json]",
    function (e) {
      e.preventDefault();
      var target = $(e.currentTarget);
      var setTokenName = target.data("set-token");
      if (setTokenName) {
        setToken(setTokenName, target.data("value"));
      }
      var unsetTokenName = target.data("unset-token");
      if (unsetTokenName) {
        setToken(unsetTokenName, undefined);
      }
      var tokenJson = target.data("token-json");
      if (tokenJson) {
        try {
          if (_.isObject(tokenJson)) {
            _(tokenJson).each(function (value, key) {
              if (value == null) {
                // Unset the token
                setToken(key, undefined);


                
                
              } else {
                  setToken(key, value);
                  
              }
            });
          }
          
        } catch (e) {
          console.warn("Cannot parse token JSON: ", e);
        }
      }
      //updateLayoutWidth();
    }
  );



});
