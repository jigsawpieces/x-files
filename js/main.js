$(document).ready(function(){

   var getEpisode = function(){

		var seasonNumbers = $("input:checkbox:checked").map(function(){
  		return $(this).val();
    }).get();
	
 		var randomSeason = seasonNumbers[Math.floor(Math.random()*seasonNumbers.length)];
 		var randomEpisode = 1 + Math.floor(Math.random() * 25);

      $.getJSON("https://api.themoviedb.org/3/tv/4087/season/" + randomSeason + "/episode/" + randomEpisode + "?api_key=2c3636cf1675a0d71d704bf0712c6843", function(json) {
       	//console.log(json);
       	$('.info-wrapper').html('<div class="info"><h1>'+ json['name'] + '</h1> <p>'+ json['overview'] + '</p> <p>Season: ' + json['season_number'] +' Episode: ' + json['episode_number'] +'</p></div>');

       });
   }

   $('button').click(getEpisode);


});