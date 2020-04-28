$(document).ready(function() {
  var colors = [
    "#39CCCC",
    "#3D9970",
    "#7FDBFF"
  ];
  $("body").css("background-color",
                colors[Math.floor(Math.random() * colors.length)]);
})
