
var scenes=[];
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
var cols;
var stageTransitionTime = 1000;
var menuTransitionTime = 600;
var stageHeight;
var stageWidth;
var curSceneID;

document.write("<script src='js/Scene.js' type='text/javascript' charset='UTF-8'></script>");


$(document).ready
(
    function()
    {
    	init();

    }
);


$(window).resize(function() {
	var viewportWidth = $(window).width();
	var viewportHeight = $(window).height();
	
	adjustLayout();

	console.log("Viewport Width = "+viewportWidth);
	console.log("Viewport Height = "+viewportHeight);
	//update survey container size
	//survey.sizeContent();

});

function xmlParser(xml) {
	var self=this;
	/*
    cols = $(xml).find("scenes").attr('cols');
    cols++;
    */
    cols=0;
    console.log("cols = "+cols);
    $(xml).find("scene").each(function (i,elem) {
    	cols++;
    	var scene = new Scene($(this));
    	scenes.push(scene);
    	 
    });
    
    //init();
    layoutScenes();
 
}


function init()
{
	var self=this;
	stageHeight = $('#stage').height();
	stageWidth = $('#stage').width();

	console.log("init");
	
	$('#stage').append('\
		<div class="character" id="main_character"></div>\
		<div class="controls">\
		 	<div class="story_btn"><img src="images/story_icon.png" width="44px" height="44px"/></div>\
		 	<div class="choose_btn"><img src="images/next_icon.png" width="44px" height="44px"/></div>\
		</div>\
		<div class="question">\
			<div class="close" id="choose_close"></div>\
			<p></p>\
			<ul></ul>\
		</div>\
		<div class="story">\
			<div class="close" id="story_close"></div>\
			<p id="story_title"></p>\
			<p id="story_copy"></p>\
		</div>\
	');

	$('#stage').append('<ul id="scenes"></ul>');
	//add start screen
	$('#scenes').append('\
		<li class="scene" id="start_screen">\
		 	<div class="scene_content">\
		 		<img src="images/start_screen_bg.jpg">\
		 	</div>\
		 </li>\
	');
	$('#start_screen > .scene_content').append('\
		 \
		 <div id="characters">\
		 <div class="character" id="character_one"></div>\
		 <div class="character" id="character_two"></div>\
		 <div class="character" id="character_three"></div>\
		 </div>\
	');

	//choose close click
	$('.character').on('click', function(e) {
		characterClick(e);	
	});

	//initially hide character
	$('#main_character').addClass("fadeout");
	$('#main_character').css({"display":"none"});
	
	//set the transition style
	$('#main_character').css({
    	"-webkit-transition":"opacity "+menuTransitionTime+"ms ease-out",
    	"-ms-transition":"opacity "+menuTransitionTime+"ms ease-out",
    	"transition":"opacity "+menuTransitionTime+"ms ease-out"
	});

	$('#characters').css({
    	"-webkit-transition":"opacity "+menuTransitionTime+"ms ease-out",
    	"-ms-transition":"opacity "+menuTransitionTime+"ms ease-out",
    	"transition":"opacity "+menuTransitionTime+"ms ease-out"
	});

	$('#scenes').css({
    	"-webkit-transition":"-webkit-transform "+stageTransitionTime+"ms ease-out",
    	"-ms-transition":"-ms-transform "+stageTransitionTime+"ms ease-out",
    	"transition":"transform "+stageTransitionTime+"ms ease-out"
	});

	$('.story').css({
    	"-webkit-transition":"-webkit-transform "+menuTransitionTime+"ms ease-out",
    	"-ms-transition":"-ms-transform "+menuTransitionTime+"ms ease-out",
    	"transition":"transform "+menuTransitionTime+"ms ease-out"
	});

	$('.question').css({
    	"-webkit-transition":"-webkit-transform "+menuTransitionTime+"ms ease-out",
    	"-ms-transition":"-ms-transform "+menuTransitionTime+"ms ease-out",
    	"transition":"transform "+menuTransitionTime+"ms ease-out"
	});



	//initially hide all the questions and stories
	$('.question').css({"display":"none"});
	$('.question').css({
    	"webkitTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)"
	});
	
	$('.story').css({"display":"none"});
	$('.story').css({
    	"webkitTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)"
	});

	
	setTimeout(function(){
		adjustLayout();
	},100);
	adjustLayout();
	//goToScene(scenes[0].id);
	
}

function characterClick(e)
{
	var id = $(e.target).attr("id");
	console.log("character click "+id);
	loadStory(id);
}

function loadStory(id)
{
	//set character image
	$("#main_character").css({"background-image":"url('images/"+id+".png')"});
	

	$.ajax(
   		{
			type: "GET",
			//url: "xml/"+id+".xml",
			url: "xml/character_one.xml",
	   	    dataType: "xml",
  	        success: xmlParser
 		}
 	);
}

function layoutScenes()
{

	//first scene id
	var firstID = scenes[0].id;
	console.log("Layout Scenes first scene = "+firstID);

	//layout scenes
	$(scenes).each(function (i,elem) {
		 //place the scenes

		 $('#scenes').append('\
		 	<li class="scene" id="scene_'+elem.id+'">\
		 		<div class="scene_content">\
		 			<img src="'+elem.background+'">\
		 		</div>\
		 	</li>'
		 );
		 
	 	 
	 });

		//choose close click
		 $('#choose_close').on('click', function(e) {
		 	console.log(" choose close click ");
			$(e.target).parent().css({
    			"webkitTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"MozTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"msTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"OTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"transform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)"
			});
			setTimeout(function(){
				$(e.target).parent().css({"display":"none"});
				$('.controls').show();
			},menuTransitionTime );
		});
		 //story close click
		 $('#story_close').on('click', function(e) {
		 	console.log(" story close click ");
			$(e.target).parent().css({
    			"webkitTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"MozTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"msTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"OTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"transform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)"
			});
			setTimeout(function(){
				$(e.target).parent().css({"display":"none"});
				$('.controls').show();
				//self.showQuestion(elem.id);
			},menuTransitionTime );
		});
		 //choose click
		 $('.choose_btn').on('click', function(e) {
		 	console.log(" choose click ");
    		self.showQuestion(curSceneID);
			
		});
		 //story click
		 $('.story_btn').on('click', function(e) {
		 	console.log(" story click ");
    		self.showStory(curSceneID);
			
		});

		 //hide characters selection
		 $("#characters").addClass("fadeout");
		 //show main character
		 $('#main_character').css({"display":"inline"});
		 
		 setTimeout(function(){
		 	//show main character
		 	$("#main_character").removeClass("fadeout");
		 	setTimeout(function(){
		 		$("#main_character").addClass("fadein");
		 		setTimeout(function(){
		 			goToScene(firstID);
		 		}, menuTransitionTime );
		 	},10);
		 }, menuTransitionTime );

		adjustLayout(); 
}

function goToScene(id)
{
	console.log("go to scene = "+id);
	var scene = getSceneForID(id); 
	
	var stageX = ($("#scenes").position().left);
	var stageY = ($("#scenes").position().top);

	var sceneX = $("#scene_"+id).position().left;
	var sceneY = $("#scene_"+id).position().top;

	var destX = stageX-sceneX;
	var destY = stageY-sceneY;

	if(destX > stageX){
		$("#main_character").addClass("rock_animation_left");
	}else{
		$("#main_character").addClass("rock_animation_right");
	}
	
	//have to set delay to match at least the time for transitions in css, probably a little bit longer in case they want to look at the stage first
	setTimeout(function(){
		showStory(scene.id);
		$("#main_character").removeClass("rock_animation_left");
		$("#main_character").removeClass("rock_animation_right");
		if(destX > stageX){
			$("#main_character").addClass("flip_horizontal");
		}else{
			$("#main_character").removeClass("flip_horizontal");
		}
	}, stageTransitionTime );
	



	console.log(" stageX = "+stageX+" stageY = "+stageY+" sceneX = "+sceneX+" sceneY = "+sceneY+" destX = "+destX+" destY = "+destY);
	/*
	$('#scenes').css({
    	"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(0px) translateZ(0px)"
	});
	*/

	$('#scenes').css({
    	"webkitTransform":"translateX("+destX+"px) translateY("+destY+"px) translateZ(0px)",
    	"MozTransform":"translateX("+destX+"px) translateY("+destY+"px) translateZ(0px)",
    	"msTransform":"translateX("+destX+"px) translateY("+destY+"px) translateZ(0px)",
    	"OTransform":"translateX("+destX+"px) translateY("+destY+"px) translateZ(0px)",
    	"transform":"translateX("+destX+"px) translateY("+destY+"px) translateZ(0px)"
	});

	curSceneID = id;
}

function showStory(id)
{
	console.log("show story id = "+id);

	var scene = getSceneForID(id); 

	console.log("scene id = "+scene.id);

	$('#story_title').html(scene.title);
	$('#story_copy').html(scene.story);

	$('#stage > .story').css({"display":"inline","z-index":"100"});
	setTimeout(function(){
		$('#stage > .story').css({
    		"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"transform":"translateX(0px) translateY(0px) translateZ(0px)"
		});
		$('.controls').hide();
		//play sound
		playSound(scene.storyAudio);
	},100);
	
}

function showQuestion(id)
{
	console.log("show question");

	var scene = getSceneForID(id); 
	$('#stage > .question ul').empty();
	$('#stage > .question p').html(scene.question);

	$(scene.answers).each(function (a,ans) {
		//place the answers
		$('#stage > .question ul').append('<li class="answer" id="answer_'+scene.id+'_'+a+'">'+ans.text+'</li>');


		//answer click
		$('#answer_'+scene.id+'_'+a).on('click', function(e) {
		 	console.log(" answer click ");
    		$(e.target).parent().parent().css({
    			"webkitTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"MozTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"msTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"OTransform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)",
    			"transform":"translateX(0px) translateY(-"+stageHeight+"px) translateZ(0px)"
			});
			setTimeout(function(){
				$(e.target).parent().parent().css({"display":"none"});
				self.goToScene(ans.target);
			},menuTransitionTime );
    			
		});

	});

	$('#stage > .question').css({"display":"inline"});
	setTimeout(function(){
		$('#stage > .question').css({
    		"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    		"transform":"translateX(0px) translateY(0px) translateZ(0px)"
		});
		$('.controls').hide();

		playSound(scene.questionAudio);

	},100);
}

function getSceneForID(id)
{
	//get scene object
	var scene;
	$(scenes).each(function (i,elem) {
		if(elem.id == id){
			scene = elem;
			return false;
		}
	});
	return scene;
}

function playSound(sound)
{
	console.log("play sound "+sound);

	var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', sound);
        //audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.play();
        audioElement = null;
}

function adjustLayout()
{
	stageHeight = $('#stage').height();
	stageWidth = $('#stage').width();

	$( ".character" ).each(function( index ) {
  		var characterWidth = $(this).width();
		var characterHeight = $(this).height();

		if(characterWidth > characterHeight){
			$(this).css({"background-size":"auto 100%"});
		}else{
			
			$(this).css({"background-size":"100% auto"});
		}
	});

	


	$('.scene').css({"width":stageWidth+"px","height":stageHeight+"px"});
	$('#scenes').css({"width":(cols*stageWidth)+"px"});


}