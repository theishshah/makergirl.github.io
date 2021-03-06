var score = 0;
var counter = 1;
var rotation = 0;
var lastImageCounter = 23;
var startTime;
var endTime;
var itemValue;
var isFlipped;

var imageDir = '/public/img/game/';
var preDir = '/public/img/game/pre/';
var postDir = '/public/img/game/post/';

imagDir = preDir;

// 20 degrees
var rotationDegrees = [
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 22.5, 67.5,
  22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5, 22.5, 67.5
]

// 20 flips
var flipOptions = [
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
  1, 0, 1, 0, 1, 0, 1, 0, 1, 0
]

// 20 items
var imgOptions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var rotationIndex, flipIndex, imgIndex;

var results = [];

// Randomize animals and degrees
// Timer won't start until trial 3
// Show indication if they're correct on the first 2
// The degree rotation should 2 per item in the list
// 16 inverted, 16 mirror
// Different animals for pre and post
// Add description for cat
// Frequency should normalized


// 21, 21 for pre and post repeat for 32
// double check randomization
// second set of instructions were too Look
// change the color the button
// feedback mechanism for the demo
// right before the example, show the right version

// 32 test items!!!

// Initial
// var initialSource =  $('.test-image').attr('src');
// if(initialSource == 'public/img/1.jpg') {
//   $('.test-image').css('transform', 'rotate(' + 22.5 + 'deg)');
// }


// Prime Number Checker
// function isPrime(number) {
//     var start = 2;
//     while (start <= Math.sqrt(number)) {
//         if (number % start++ < 1) return false;
//     }
//     return number > 1;
// }

if(counter == 1) {
  $('.test-image').css({
    'transform' : 'rotate(' + (360 - 22.5) + 'deg)'
  });
}

// API Access
function forResponse(url, callback) {
  $.ajax({
    url : url,
    cache : false,
    success : callback,
    error : function(err) {
      console.log(err);
    },
    dataType : 'jsonp'
  });
}

function endpointForResponse(url, callback) {
  forResponse("http://198.199.83.108:8081/api/" + url, callback);
}

// Next Item Selector
function nextItem() {
  counter += 1;

  // Test is done
  if(counter >= lastImageCounter) {
    counter = lastImageCounter;

    $('#game-title').html('Good Job!')
    $('#test-body').html('<center><img src="/public/img/game/100.png" class="img-responsive"/><a href="/"><br><button type="button" class="btn btn-lg btn-o btn-w btn-dark">Done</button></a></center>');

    console.log(results);
    endpointForResponse("activity?activityData=" + results, function(json) {
      console.log(json.result);
    });
  }

  if(counter == 3) {
    $('#test-container').html(`
      <div>
        <p>Now that you understand the game let’s do some more. Remember, <b>SAME</b> means it’s the exact same picture, only rotated, <b>MIRROR IMAGE</b> means it’s a mirror image of the first picture. You’re now going to see many other animals. For each animal you have to decide if the two pictures are the same or mirror image. Use the mouse to move to the buttons of either SAME or MIRROR IMAGE. When you finish each animal, a new animal will appear. You cannot change your mind about your choices. Try to work as fast as you can. You may see the same animals again, but think carefully and quickly each time if the pictures are the same or different.</p>

        <p>Click <b>START</b> to begin the game.</p>

      </div>

      <div class="row">
        <div class="col-md-12">
          <center>
            <button id="start-test" type="button" class="btn btn-lg btn-o btn-w btn-dark" onclick="startTest()">Start</button>
          </center>
        </div>
      </div>

      <div class="row"></div>
    `);

    startTime = new Date();
  }

  if(counter > 2) {
    rotationIndex = Math.floor((Math.random() * (rotationDegrees.length - 1)) + 0);
    flipIndex = Math.floor((Math.random() * (flipOptions.length - 1)) + 0);
    imgIndex = Math.floor((Math.random() * (imgOptions.length - 1)) + 0);

    // console.log(imgOptions);
    // console.log(imgIndex);
    // console.log("imgIndex: " + imgOptions[imgIndex]);

    $('.control-image').attr('src', imageDir + imgOptions[imgIndex] + '.jpg');
    $('.test-image').attr('src', imageDir + imgOptions[imgIndex] + '.jpg');

    if(flipOptions[flipIndex] == 1) {
      rotation = 0;
      isFlipped = true;

      $('.test-image').css({
        'transform' : 'rotate(' + (360 - rotationDegrees[rotationIndex]) + 'deg) scaleX(-1)',
        'filter': 'flipH'
      });

    } else {
      $('.test-image').removeClass('flip');

      $('.test-image').css({
        'transform' : 'rotate(' + (360 - rotationDegrees[rotationIndex]) + 'deg)'
      });

      isFlipped = false;
    }

    rotationDegrees.splice(rotationIndex, 1);
    flipOptions.splice(flipIndex, 1);
    imgOptions.splice(imgIndex, 1);

    // console.log('rotationIndex: ' + rotationIndex);
    // console.log('Removed: ' + rotationDegrees[rotationIndex]);
    // console.log('Array: ');
    // console.log(rotationDegrees);
    //
    // console.log('flipIndex: ' + flipIndex);
    // console.log('Removed: ' + flipOptions[flipIndex]);
    // console.log('Array: ');
    // console.log(flipOptions);

    $('#instructions').html('');
  } else {
    $('.control-image').attr('src', imageDir + counter + '.jpg');
    $('.test-image').attr('src', imageDir + counter + '.jpg');

    $('#instructions').html(`<p>Let's try one more. Are these the same or different?</p><p>Remember, <b>SAME</b> means it’s the same image, just rotated, <b>MIRROR IMAGE</b> means it's as if the animal is looking in the mirror.</p>`);
    $('#wrong-message').html(`Actually, those are mirror images. Do you see how the different cats look in different directions?`);
    $('.test-image').css({
      'transform' : 'rotate(' + (360 - 67.5) + 'deg) scaleX(-1)',
      'filter': 'flipH'
    });

    if(surveyType == 'post') {
      imageDir = postDir;
    }
  }


  // console.log("counter: " + counter);
}

function clickSame() {
  if(counter > 2) {
    if(rotation == 0) {
      score += 10;
      itemValue = true;
    } else {
      itemValue = false;
    }

    endTime = new Date();
    // console.log(endTime - startTime);

    results.push(JSON.stringify({
      'id' : counter,
      'currentTime' : endTime,
      'elapsedTime' : endTime - startTime,
      'surveyType' : surveyType,
      'rotationIndex' :  rotationIndex,
      'rotationDegree' : rotationDegrees[rotationIndex],
      'flipIndex' :  flipIndex,
      'flipOption' : flipOptions[flipIndex],
      'imgIndex' : imgIndex,
      'imgOption' : imgOptions[imgIndex],
      'clickOption' : 'same',
      'isCorrect' : itemValue,
      'isFlipped' : isFlipped,
      'rotationValue' : rotation
    }, null, 3));

    nextItem();
  } else {
    if(counter == 1) {
      score += 10;
      $('#correct').modal('show');

      nextItem();
    } else if (counter == 2) {
      $('#wrong').modal('show');
    }
  }
}

function clickDiff() {
  if(counter > 2) {
    if(rotation != 0) {
      score += 10;
      itemValue = true;
    } else {
      itemValue = false;
    }

    endTime = new Date();
    // console.log(endTime - startTime);

    results.push(JSON.stringify({
      'id' : counter,
      'currentTime' : endTime,
      'elapsedTime' : endTime - startTime,
      'surveyType' : surveyType,
      'rotationIndex' :  rotationIndex,
      'rotationDegree' : rotationDegrees[rotationIndex],
      'flipIndex' :  flipIndex,
      'flipOption' : flipOptions[flipIndex],
      'imgIndex' : imgIndex,
      'imgOption' : imgOptions[imgIndex],
      'clickOption' : 'different',
      'isCorrect' : itemValue,
      'isFlipped' : isFlipped,
      'rotationValue' : rotation
    }, null, 3));

    nextItem();
  } else {
    if(counter == 1) {
      $('#wrong').modal('show');
    } else if (counter == 2) {
      score += 10;
      $('#correct').modal('show');

      nextItem();
    }
  }
}


function startTest() {
  $('#activity-instructions').hide();
  $('#activity-test').show();

  if(surveyType == 'post') {
    counter = 3;
    startTime = new Date();
    imageDir = postDir;
  }

  $('#test-container').html(`
    <div class="row">
      <div class="col-md-6">
        <center>
          <img class="control-image" src="` + imageDir + `3.jpg"/>
          <br>
          <!-- <button type="button" class="btn btn-lg btn-o btn-w btn-dark click" onclick="clickSame()">Same</button> -->
        </center>
      </div>
      <div class="col-md-6">
        <center>
          <img class="test-image" src="` + imageDir + `3.jpg"/>
          <br>
          <!-- <button type="button" class="btn btn-lg btn-o btn-w btn-dark click" onclick="clickDiff()">Different</button> -->
        </center>
      </div>
    </div>

    <div class="row">
      <center>
        <button type="button" class="btn btn-lg btn-w btn-o btn-w btn-dark click" onclick="clickSame()">Same</button>
        <br><br>
        <button type="button" class="btn btn-lg btn-w btn-o btn-w btn-dark click" onclick="clickDiff()">Mirror Image</button>
      </center>
    </div>

    <div class="row"></div>
  `);
}

// Interactions
$(function () {
  $('#birthday').datetimepicker({
    format: 'MM//DD/YYYY'
 });
});

$('.emoji').each(function() {
  $(this).html(twemoji.parse($(this).html()));
});

function submitSurvey() {
  $('#activity-survey').hide();
  $('#activity-splash').show();

  var surveyData = $('#activity-survey').serializeArray();
  var currentTime = new Date();
  // console.log(surveyData);

  results.push(JSON.stringify({
    'surveyType' : surveyType,
    'survey' : surveyData,
    'currentTime' : currentTime
  }, null, 3))

  return false;
}

function showInstructions() {
  $('#activity-splash').hide();
  $('#activity-instructions').show();

  if(surveyType == 'post') {
    $('#instructions-container').html(`
      <div>
        <p>Remember the game we played at the beginning of the session? Well now we’re going to play that again, but this time you’re going to see different animals. Remember, <b>SAME</b> means it’s the same image, just rotated, <b>MIRROR IMAGE</b> means it’s as if the animal is looking in the mirror.</p>

        <p>Click <b>START</b> when you're ready!</p>
      </div>

      <div class="row">
        <div class="col-md-12">
          <center>
            <button id="start-test" type="button" class="btn btn-lg btn-o btn-w btn-dark" onclick="startTest()">Start</button>
          </center>
        </div>
      </div>

      <div class="row"></div>
    `);
  }
}

function startDemo() {
  $('#activity-instructions').hide();
  $('#activity-test').show();
}
