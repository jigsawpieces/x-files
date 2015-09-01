$(document).ready(function(){

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var getEpisode = function(){

    var episode_range = {"1":[0,23],"2":[1,25],"3":[1,24],"4":[1,24],"5":[1,20],"6":[1,22],"7":[1,22],"8":[1,21],"9":[1,20]};
    var episodes = [];
    var monster_of_the_week = {"1":[2,4,5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22],"2":[2,3,7,9,11,12,13,14,15,18,19,20,21,22,23,24],"3":[3,4,5,6,7,8,11,12,13,14,17,18,19,20,21,22],"4":[2,3,4,5,6,8,11,12,13,16,19,20,22],"5":[4,6,8,9,10,11,12,16,17,18,19],"6":[2,3,6,7,8,9,13,14,15,16,17,18,21],"7":[1,2,5,6,7,8,9,12,13,14,16,17,18,19,20,21],"8":[3,4,5,6,7,9,10,12,13,17],"9":[3,4,5,6,7,9,12,13,14,16,18]}

    var seasonNumbers = $(".season-selector input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();

    var storyType = $(".story-selector input:checkbox:checked").map(function(){
      return $(this).val();
    }).get();

    var randomSeason = seasonNumbers[getRandomInt(0, seasonNumbers.length - 1)];

    for (i = episode_range[randomSeason][0]; i <= episode_range[randomSeason][1]; i++) {
      // if monster is selected AND episode is in monster array
      if ($.inArray("monster", storyType) !== -1 && $.inArray(i, monster_of_the_week[randomSeason]) !== -1) {
        episodes.push(i);
      }
      // if arc is selected AND episode is NOT in monster array
      if ($.inArray("arc", storyType) !== -1 && $.inArray(i, monster_of_the_week[randomSeason]) == -1) {
        episodes.push(i);
      }
    }

    var randomEpisode = episodes[getRandomInt(0, episodes.length - 1)];

    $.getJSON("http://api.themoviedb.org/3/tv/4087/season/" + randomSeason + "/episode/" + randomEpisode + "?api_key=2c3636cf1675a0d71d704bf0712c6843", function(json) {
      $('.info-wrapper').html('<div class="info"><h1>'+ json['name'] + '</h1> <p>'+ json['overview'] + '</p> <p>Season: ' + json['season_number'] +' Episode: ' + json['episode_number'] +'</p></div>');
    });

  }

  $('button').click(getEpisode);

});
