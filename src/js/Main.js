
var scenes=[];
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
var cols;
var stageTransitionTime = 1000;
var menuTransitionTime = 600;

document.write("<script src='js/Scene.js' type='text/javascript' charset='UTF-8'></script>");


$(document).ready
(
    function()
    {
    	$.ajax(
    		{
    			type: "GET",
    	        url: "xml/content.xml",
    	        dataType: "xml",
    	        success: xmlParser
    		}
    	);

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
    cols = $(xml).find("scenes").attr('cols');
    console.log("cols = "+cols);
    $(xml).find("scene").each(function (i,elem) {
    	
    	var scene = new Scene($(this));
    	scenes.push(scene);
    	 
    });
    
    init();
 
}


function init()
{
	var self=this;
	var stageHeight = $('#stage').height();
	var stageWidth = $('#stage').width();

	console.log("init");
	
	$('#stage').append('<div class="character"></div>');
	$('#stage').append('<ul id="scenes"></ul>');
	
	

	//layout scenes
	$(scenes).each(function (i,elem) {
		 //place the scenes

		 $('#scenes').append('\
		 	<li class="scene" id="scene_'+elem.id+'">\
		 		<div class="scene_content">\
		 			<div class="controls">\
		 				<div class="story_btn" id="story_btn_'+elem.id+'"></div>\
		 				<div class="choose_btn" id="choose_btn_'+elem.id+'"></div>\
		 			</div>\
		 			<div class="question"><div class="close" id="choose_close_'+elem.id+'"></div>'+elem.question+'<ul></ul></div>\
		 			<div class="story"><div class="close" id="story_close_'+elem.id+'"></div><p>'+elem.title+'</p><p>'+elem.story+'</p></div>\
		 			<img src="images/'+elem.id+'/'+elem.background+'">\
		 		</div>\
		 	</li>'
		 );
		 $(elem.answers).each(function (a,ans) {
		 	//place the answers
		 	$('#scene_'+elem.id+' > .scene_content > .question ul').append('<li class="answer" id="answer_'+elem.id+'_'+a+'">'+ans.text+'</li>');

		 	//set dimensions of question
		 	//$('#scene_'+elem.id+' > .scene_content > .question').css({"width":stageWidth/2+"px","height":stageHeight/2+"px"})

		 	//answer click
		 	$('#answer_'+elem.id+'_'+a).on('click', function(e) {
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
	 	 //choose close click
		 $('#choose_close_'+elem.id).on('click', function(e) {
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
		 $('#story_close_'+elem.id).on('click', function(e) {
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
		 $('#choose_btn_'+elem.id).on('click', function(e) {
		 	console.log(" choose click ");
    		self.showQuestion(elem.id);
			
		});
		 //story click
		 $('#story_btn_'+elem.id).on('click', function(e) {
		 	console.log(" choose click ");
    		self.showStory(elem.id);
			
		});
	 });

	//set the transition style
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

	

	adjustLayout();
	goToScene(scenes[0].id);
	
}

function goToScene(id)
{
	console.log("go to scene = "+id);
	var scene; 
	//get scene object
	$(scenes).each(function (i,elem) {
		if(elem.id == id){
			scene = elem;
			return false;
		}
	});
	$(".character").addClass("rock_animation");
	
	//have to set delay to match at least the time for transitions in css, probably a little bit longer in case they want to look at the stage first
	setTimeout(function(){
		showStory(scene.id);
		$(".character").removeClass("rock_animation");
	}, stageTransitionTime );
	

	var stageX = ($("#scenes").position().left);
	var stageY = ($("#scenes").position().top);

	var sceneX = $("#scene_"+id).position().left;
	var sceneY = $("#scene_"+id).position().top;

	var destX = stageX-sceneX;
	var destY = stageY-sceneY;

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
}

function showStory(id)
{
	console.log("show story id = "+id);
	$('#scene_'+id+' > .scene_content > .story').css({"display":"inline","z-index":"100"});
	setTimeout(function(){
		$('#scene_'+id+' > .scene_content > .story').css({
    	"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(0px) translateZ(0px)"
		});
		$('.controls').hide();
	},100);
	
}

function showQuestion(id)
{
	$('#scene_'+id+' > .scene_content > .question').css({"display":"inline"});
	setTimeout(function(){
		$('#scene_'+id+' > .scene_content > .question').css({
    	"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(0px) translateZ(0px)"
		});
		$('.controls').hide();
	},100);
}

function adjustLayout()
{
	var stageHeight = $('#stage').height();
	var stageWidth = $('#stage').width();

	$('.scene').css({"width":stageWidth+"px","height":stageHeight+"px"});
	$('#scenes').css({"width":(cols*stageWidth)+"px"});


}