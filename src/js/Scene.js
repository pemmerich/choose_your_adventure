//set up section, question, answer classes
function Scene(xml)
{
  console.log("new scene xml = "+xml);
  var self = this;
  self.id=xml.attr("id");
  self.title=xml.find("title").text();
  self.background=xml.find("background").text();
  self.question = xml.find("question").text();
  self.answers = [];
  self.story = xml.find("story").text();
  self.storyAudio = xml.find("story").attr("audio");
  self.questionAudio = xml.find("question").attr("audio");
  $(xml).find("answer").each(function (i,elem) {

    	var text = $(this).text();
    	var target = $(this).attr("target");
    	var answer = {text:text,target:target};
    	self.answers.push(answer);
    	 
    });
  self.init();
}

Scene.prototype = {
		
		init:function()
		{
			var self = this;
			console.log(" init scene = "+self.title);

			
		}

};