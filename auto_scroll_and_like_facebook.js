setInterval(function() { window.scrollTo(0,document.body.scrollHeight); }, 60000);
var countLike = 0;
var countLikeClick = 0;
setInterval(function() { if(!document.getElementsByClassName("_6a-y _3l2t  _18vj")[countLike].classList.contains("_3_16") ) {  console.log('check post ' + countLike); console.log('I was like ' + countLikeClick);  document.getElementsByClassName("_6a-y _3l2t  _18vj")[countLike].click(); countLikeClick++; } var _r = Math.floor(Math.random() * Math.floor(2)); countLike = countLike + 1 + _r; }, 15000);

