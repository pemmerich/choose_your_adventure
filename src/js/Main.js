
var scenes=[];
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));

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
	setScrollerHeight();
	console.log("Viewport Width = "+viewportWidth);
	console.log("Viewport Height = "+viewportHeight);
	//update survey container size
	//survey.sizeContent();

});

function xmlParser(xml) {
	 var self=this;
    
 
    $(xml).find("scene").each(function (i,elem) {
    	
    	var scene = new Scene($(this));
    	scenes.push(scene);
    	 
    });
    
    init();
 
}


function init()
{
	var self=this;
	
	//layout scenes
	$(scenes).each(function (i,elem) {
		 //place the scenes
		 $('#stage').append('<ul id="scenes"></ul>')
		 $('#scenes').append('<li class="scene" id="scene_'+elem.id+'">  <div class="scene_content"> <div class="question">'+elem.question+'</div>  <img src="images/'+elem.id+'/'+elem.background+'">  </div>  </li>');
		 $(elem.answers).each(function (a,ans) {
		 	//place the answers
		 	$('#scene_'+elem.id+' > .scene_content > .question').append('<li class="answer" id="answer_'+elem.id+'_'+a+'">'+ans.text+'</li>');
		 
	 	 });
	 });
	
	

	


	
}

