// copy...
function CopyUrl($this){
  var querySelector = $this.next().attr("id");
  var emailLink = document.querySelector("#"+querySelector);

  if (navigator.clipboard) {
    var myText = emailLink.textContent;
    navigator.clipboard.writeText(myText).then(function() {
      // Do something to indicate the copy succeeded
    }).catch(function() {
      // Do something to indicate the copy failed
    });
  } else {
    // Here's where you put the fallback code for older browsers.
  }
}
