//dont be pleb!
//git gud
var backgroundSound = new Audio("/sounds/background.mp3");
var scanBtn = $("#scan");
var blipX = 0;
var blipY = 0;
var quadrant = 0;
var blip = $("#blip");
var output = [];


var userScore = 0;
var userClick = [];
var launchDefense = $("#fire");
var reset = $("#reset");



var mq1 = $("#mq1");
var mq2 = $("#mq2");
var mq3 = $("#mq3");
var mq4 = $("#mq4");


mq1.click(function(event){
	userClick.push(1);
	console.log(userClick);
});

mq2.click(function(event){
	userClick.push(2);
	console.log(userClick);
});

mq3.click(function(event){
	userClick.push(3);
	console.log(userClick);
});

mq4.click(function(event){
	userClick.push(4);
	console.log(userClick);
});
//----------------------------experimental---------------------

function playback(){
	//iterate across the output array
	//animate each blip for a second
	//move to next blip and animate for a second
	//last blip stays on the screen
	var i = 0;
	var intervalId = setInterval(function(){
		if (i < output.length) {
			
			blipX = output[i].x;
			blipY = output[i].y;

			blip.css({
				left: blipX, 
				top: blipY,
				display: "block"

			});
			i++;

		} else {
			clearInterval(intervalId);
		}
	}, 2500);
}


//------------------------------------------------
//COMPUTER
scanBtn.click(function(event){

	var sonarPing = new Audio("/sounds/sonarping.wav");
	sonarPing.play();
	setTimeout(function(){
		sonarPing.play()
	}, 1500);

	blipX = Math.floor(Math.random() * 600) +1;
	console.log(blipX);

	blipY = Math.floor(Math.random() * 830) +1;
	console.log(blipY);

	if (blipX < 305 && blipY <= 403){
		quadrant = 1;
	} else if(blipX > 305 && blipY <= 403){
		quadrant = 2;
	}else if(blipX > 305 && blipY >= 403){
		quadrant = 3;
	}else if(blipX < 305 && blipY >= 403){
		quadrant = 4;
	}

	//randomly get new blip location
	//push blip location to array

	var newBlip = {};
	newBlip.y = blipY;
	newBlip.x = blipX;
	newBlip.quadrant = quadrant


	output.push(newBlip);

	playback()

	userClick = []
});


//-----------------------------------------------------------
// SCORE KEEPER

function arraysAreSame(){
	var quadrants = [];
	output.forEach(function(blip){
		quadrants.push(blip.quadrant);
	});

	if(userClick.toString() == quadrants.toString()){
		return true;
	}
}

launchDefense.click(function(){
	if(arraysAreSame()){
	console.log("you're winning");
} else {
	console.log("base destroyed");
	lose();
}
});

reset.click(function(){
	output = [];
	userClick = [];
	quadrants = [];
	backgroundSound.volume = 1;
	blip.css({
		display: "none"
	});
})

//use theme from battlefield 1942 for background music
function startupSound(){
	

	backgroundSound.play();
}

function lose(){
	var video = $("#video");
	backgroundSound.volume = 0;
	video.html('<video id="end" autoplay><source src="/videos/endbomb.mp4" type="video/mp4"></video>');
	setTimeout(function(){
		video.html('');
	}, 20000);
} 
startupSound();




























