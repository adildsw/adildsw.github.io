$(document).ready(function() {
  var count = Math.floor((Math.random() * 10) + 1);
  var reveal = false;
  var items = [
    "assets/apple.png",
    "assets/cat.png",
    "assets/dog.png",
    "assets/elephant.png",
    "assets/leaf.png"
  ];
  var imgdir = items[Math.floor(Math.random() * items.length)];

  $.fn.generateItem = function(count, imgdir, reveal) {
    var row1 = Math.floor(count/2);
    var row2 = Math.ceil(count/2);

    $("#counter-number").empty();
    $("#counter-images").empty();

    var row1div = document.createElement("div");
    row1div.className = "row";

    var row2div = document.createElement("div");
    row2div.className = "row";

    for(var i = 0; i < row1; i++) {
      var coldiv = document.createElement("div");
      coldiv.className = "col";

      var img = document.createElement("img");
      img.className = "img-fluid";
      img.src = imgdir;

      coldiv.append(img);
      row1div.append(coldiv);
    }

    for(var i = 0; i < row2; i++) {
      var coldiv = document.createElement("div");
      coldiv.className = "col";

      var img = document.createElement("img");
      img.className = "img-fluid";
      img.src = imgdir;

      coldiv.append(img);
      row2div.append(coldiv);
    }

    $("#counter-images").append(row1div);
    if(row2 > 0) {
      $("#counter-images").append(row2div);
    }

    var img = document.createElement("img");
    img.className = "img-fluid";
    if(reveal) {
      img.src = "assets/" + count.toString() + ".png";
    }
    else {
      img.src = "assets/question.png";
    }

    $("#counter-number").append(img);
  }

  $.fn.generateItem(count, "assets/elephant.png", false);

  $(document).on("keypress", function(e) {
    if(e.which >= 48 && e.which <= 57) { // Selecting 1-10 elements
      count = e.which - 48;
      count = (count == 0) ? 10 : count;
      reveal = false;
      imgdir = items[Math.floor(Math.random() * items.length)];
    }
    else if(e.which == 32) { // Pressing SPACE to reveal number
      reveal = true;
    }
    else if(e.which == 13) { // Loading a random number of elements
      var new_count;
      do {
        new_count = Math.floor((Math.random() * 10) + 1);
      }while(new_count == count);

      count = new_count;
      reveal = false;
      imgdir = items[Math.floor(Math.random() * items.length)];
    }
    $.fn.generateItem(count, imgdir, reveal);
  })
})
