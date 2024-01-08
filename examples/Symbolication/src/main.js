import Altruist from "altruist-sdk-web";

Firebird.init({
  app_key: "YOUR_APP_KEY",
  app_version: "1.0",
  url: "https://your.domain.firebird",
  debug: true
});

//track sessions automatically
Firebird.track_sessions();

//track pageviews automatically
Firebird.track_pageview();

//track any clicks to webpages automatically
Firebird.track_clicks();

//track link clicks automatically
Firebird.track_links();

//track form submissions automatically
Firebird.track_forms();

//track javascript errors
Firebird.track_errors();

//let's cause some errors
function cause_error(){
    undefined_function();
}

window.onload = function() {
  document.getElementById("handled_error").onclick = function handled_error(){
      Firebird.add_log('Pressed handled button'); 
      try {
          cause_error();
      } catch(err){
          Firebird.log_error(err)
      }
  };

  document.getElementById("unhandled_error").onclick = function unhandled_error(){
      Firebird.add_log('Pressed unhandled button'); 
      cause_error();
  };
}
