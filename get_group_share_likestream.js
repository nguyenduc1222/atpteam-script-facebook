function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var index = 0;

while(true) {
var listwpv = document.getElementsByClassName('_wpv');

for (;index < listwpv.length; index++) {
    var wpv = listwpv[index];
    if (wpv.getAttribute('href')) {
        var href = wpv.getAttribute('href');
        var regex = /\/groups\/(\d+)\//;
        var match = href.match(regex);
        if (match) {
            var idGroup = href.match(regex)[1];
            console.log(idGroup);
        }
    } 
}
window.scrollTo(0,document.getElementById('repost_view_dialog').offsetHeight);
await sleep(2000);
}
