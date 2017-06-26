var songs	= ["a","b","c","d","e","f",
			   "g","h","i","j","k","l",
			   "m","n","o","p","q","r"];
var artist	=["Swarshsh","Swwhhwar","Swhwhwar","Swhhwwar","Swhwhwar","Swawwhr",
			  "Swawhwwr","Swwhwhar","Swhwhwwar","Swwhwar","Swhwhwar","Swhhwar",
			  "Swwhwahr","Swhhwwar","Swaahahr","wwhSwar","Swwhwhar","Sqlqlwar",];
var pic		=["a","b","arjit","d","e","f",
			  "g","h","i","j","k","l",
			  "m","n","o","p","q","r"];	

var songTitle 		= document.getElementById('songTitle');
var songSlider 		= document.getElementById('songSlider');
var currentTime 	= document.getElementById('currentTime');
var duration 		= document.getElementById('duration');
var volumeSlider 	= document.getElementById('volumeSlider');
var nextSongTitle 	= document.getElementById('nextSongTitle');

var song = new Audio();
var currentSong=0;//it is the unique index for each of the song.


window.onload =multiplyNode(document.querySelector('#MusicBlock'),songs.length, true);//whenever the window loads, the songs starts to play

function multiplyNode(node, count, deep) {

copy=node.cloneNode(deep);
for (var i=0, copy; i <(count); i++) {
	
var str="loadSong("+i+")";//gives the index of the song
var img_src="img/"+pic[i]+".jpg";//gives the picture of the song
var song_name=songs[i];//name of the song
var artist_name=artist[i];//name of the artist
var btn_class="col-md-4 glyphicon glyphicon-play play";

copy.innerHTML="<div class='col-md-2'><a href='#' class='thumbnail text-center'><img src='"+img_src+"'width='500px' height='500px'/><div class='row'><p>Artist: "+artist_name+"<br>Song: "+song_name+"</p><button class='"+btn_class+"' onclick='"+str+"'></button><button class='col-md-4 glyphicon glyphicon-heart heart'></button><button class='col-md-4 glyphicon glyphicon-comment message'></button></div></a>";	
node.appendChild(copy.cloneNode(true));}
}


function loadSong () {
	currentSong=arguments[0];
	song.src ="./songs/" + songs[currentSong]+ ".mp3";
	songTitle.innerHTML	= "<b>Playing: </b>"+songs[currentSong];
	nextSongTitle.innerHTML = "<b>Next: </b>"+songs[(currentSong + 1)% songs.length];
	song.playbackRate = 1;
	song.volume = volumeSlider.value;
	song.play();
	setTimeout(showDuration, 1000);
	setInterval(updateSongSlider, 1000);
}



function updateSongSlider () {
	var c = Math.round(song.currentTime);
	songSlider.value = c;
	currentTime.textContent = convertTime(c);
	if(song.ended){
		next();
	}
}

function convertTime (secs) {
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	return (min + ":" + sec);
}

function showDuration () {
	var d = Math.floor(song.duration);
	songSlider.setAttribute("max", d);
	duration.textContent = convertTime(d);
}

function playOrPauseSong (img) {
	song.playbackRate = 1;
	if(song.paused){
		song.play();
		img.src = "images/pause.png";
	}else{
		song.pause();
		img.src = "images/play.png";
	}
}

function next(){
	currentSong =((currentSong + 1)% songs.length);
	loadSong(currentSong);
}

function previous () {
	currentSong--;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	loadSong(currentSong);
}

function seekSong () {
	song.currentTime = songSlider.value;
	currentTime.textContent = convertTime(song.currentTime);
}


function showVolume()
{
	var x = document.getElementById('myDIV');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}