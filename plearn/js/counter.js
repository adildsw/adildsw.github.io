$(document).ready(function() {
  var count = Math.floor((Math.random() * 10) + 1);
  var items = [
    "assets/apple.png",
    "assets/cat.png",
    "assets/dog.png",
    "assets/elephant.png",
    "assets/leaf.png"
  ];
  var imgdir = items[Math.floor(Math.random() * items.length)];


  /*
  * Function for Generating Items on the Screen
  *
  * $.fn.generateItem: function takes three arguments "count" and "imgdir" to
  * generate image on the screen.
  *
  * Arguments
  * count: (int) states the number of items to be displayed.
  * imgdir: (string) states the image location of the item to be displayed.
  *
  */
  $.fn.generateItem = function(count, imgdir) {
    // Clearing previous content
    $("#counter-number").empty();
    $("#counter-images").empty();

    // Distributing items between two rows
    var row1 = Math.floor(count/2);
    var row2 = Math.ceil(count/2);

    var row1div = document.createElement("div");
    var row2div = document.createElement("div");
    row1div.className = "row";
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
    $("#counter-images").append(row2div);

    // Displaying question mark
    var img = document.createElement("img");
    img.className = "img-fluid";
    img.src = "assets/question.png";
    $("#counter-number").append(img);
  }


  /*
  * Function to Reveal Number of Displayed Item
  *
  * $.fn.revealNumber: takes 0 arguments, displays the number of items that are
  * displayed on the screen.
  *
  */
  $.fn.revealNumber = function() {
    var img = document.createElement("img");
    img.className = "img-fluid ";
    img.src = "assets/" + count.toString() + ".png";
    $("#counter-number").empty();
    $("#counter-number").append(img);
  }


  /*
  * Function to Generate a New Random Count
  *
  * $.fn.nextCount: takes 0 arguments, returns random count value separate
  * from the previous coubt value.
  *
  */
  $.fn.nextCount = function() {
    var nextCount;
    do {
      nextCount = Math.floor((Math.random() * 10) + 1);
    } while(nextCount == count);
    return nextCount;
  }


  /*
  * Function to Generate a New (if available) Random Imgdir
  *
  * $.fn.nextImgdir: takes 0 arguments, returns random imgdir value separate
  * from the previous imgdir value (if available).
  *
  */
  $.fn.nextImgdir = function() {
    var nextImgdir;
    do {
      nextImgdir = items[Math.floor(Math.random() * items.length)];
    } while(nextImgdir == imgdir && items.length > 1);
    return nextImgdir;
  }


  /*
  * Keypress Event for Controlling Items on Screen
  *
  * Key Events
  * 0-9: Displays corresponding number of random items (0 = 10 items).
  * Space: Reveals the number of items generated.
  * Enter: Generates and display a random number of items on the screen.
  *
  */
  $(document).on("keypress", function(e) {
    if(e.which >= 48 && e.which <= 57) { // Selecting 1-10 elements
      count = ((e.which - 48) == 0) ? 10 : (e.which - 48);
      imgdir = $.fn.nextImgdir();
      $.fn.generateItem(count, imgdir);
    }
    else if(e.which == 32) { // Pressing SPACE to reveal number
      $.fn.revealNumber();
    }
    else if(e.which == 13) { // Pressing Enter to generate random items
      count = $.fn.nextCount();
      imgdir = $.fn.nextImgdir();
      $.fn.generateItem(count, imgdir);
    }
  })


  // Mouse Click Event to Display a Random Number of Items on the Screen
  $("#main").on("click", function() {
    count = $.fn.nextCount();
    imgdir = $.fn.nextImgdir();
    $.fn.generateItem(count, imgdir);
  })


  // Displaying Info Modal on Load
  $("#info_modal").modal('show');


  // Display Random Number of Items on Load
  $.fn.generateItem(count, imgdir);
})
