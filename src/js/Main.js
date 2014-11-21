
var scenes=[];
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
var cols;

document.write("<script src='js/Scene.js' type='text/javascript' charset='UTF-8'></script>");


$(document).ready
(
    function()
    {
      //init();
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

	//layout scenes
	$(scenes).each(function (i,elem) {
		 //place the scenes
		 $('#stage').append('<ul id="scenes"></ul>')
		 $('#scenes').append('\
		 	<li class="scene" id="scene_'+elem.id+'">\
		 		<div class="scene_content">\
		 			<div class="controls">\
		 				<div class="choose_btn" id="choose_btn_'+elem.id+'"></div>\
		 				<div class="story_btn" id="story_btn_'+elem.id+'"></div>\
		 			</div>\
		 			<div class="question"><div class="close"></div>'+elem.question+'<ul></ul></div>\
		 			<div class="story"><div class="close"></div><p>'+elem.title+'</p><p>'+elem.story+'</p></div>\
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
				},600);
    			
			});

	 	 });
	 	 //close click
		 $('.close').on('click', function(e) {
		 	console.log(" close click ");
    		
    		
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
			},600);
			
    		
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

	
	//have to set delay to match at least the time for transitions in css, probably a little bit longer in case they want to look at the stage first
	setTimeout(function(){
		showStory(scene.id);
	}, 1000);
	

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
	$('#scene_'+id+' > .scene_content > .story').css({"display":"inline"});
	setTimeout(function(){
		$('#scene_'+id+' > .scene_content > .story').css({
    	"webkitTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"MozTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"msTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"OTransform":"translateX(0px) translateY(0px) translateZ(0px)",
    	"transform":"translateX(0px) translateY(0px) translateZ(0px)"
		});
		$('.controls').hide();
	},0);
	
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
	},0);
}

function adjustLayout()
{
	var stageHeight = $('#stage').height();
	var stageWidth = $('#stage').width();

	$('.scene').css({"width":stageWidth+"px","height":stageHeight+"px"});
	$('#scenes').css({"width":(cols*stageWidth)+"px"});


}