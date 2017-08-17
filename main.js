/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

//create variables
let searchForArtist = document.querySelector("#searchForArtist");
let showMe = document.querySelector("#showMe");
let resultsSection = document.querySelector("#resultsSection");

//when an item is typed into the search box, send item to end of url to fetch
let findMe = "";
showMe.addEventListener("click", function (event){
event.preventDefault();
  findMe = searchForArtist.value
  console.log(findMe);
      fetch("https://itunes.apple.com/search?term="+findMe)
          .then(
          	function convertFromJson(data){
  			return data.json();
  		})
          .then(function(data){
          console.log(data);

    let music = "";

	for (let i = 0; i < data.results.length; i++){
		console.log(data.results[i].collectionName);
		music += `
		<div class="results"> 
			<section class="songInfo">${data.results[i].trackName},
			${data.results[i].collectionName},
			${data.results[i].artistName},
			<button type="button" class="play-now" onclick="playSong('${data.results[i].previewUrl}')" value="${data.results[i].previewUrl}">Play</button>
			</section>
			<img class="albumCover" src="${data.results[i].artworkUrl100}">
		</div>`;
		
	}
	document.querySelector("#resultsSection").innerHTML = music;
	})
     
  });

function playSong(previewUrl) {
  let songPlayer = document.querySelector("audio.music-player");
songPlayer.src = previewUrl;
};

