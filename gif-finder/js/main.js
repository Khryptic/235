    // 1
    window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
	
    // 2
    let displayTerm = "";
  
    // 3
  function searchButtonClicked(){
    console.log("searchButtonClicked() called");
      
      //1
      const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

      //2
      //Giphy API key
      //I got a new key for myself, just to be sure it works
      let GIPHY_KEY = "G2mafnBTguOTQ2T1UG6FW9Ukx9ogQ7IH";
      
      //3
      //Making a url string using the API key
      let url = GIPHY_URL;
      url += "api_key=" + GIPHY_KEY;

      //4
      //Get the search term
      let term = document.querySelector("#searchterm").value;
      displayTerm = term;

      //5
      //Remove any extra spaces
      term = term.trim();
      
      //6
      //Encode the term
      term = encodeURIComponent(term);

      //7
      //Handle the case of no entered term by *term*inating the function
      if (term.length < 1) return;

      //8
      //Add (append) the search term to the URL
      url += "&q=" + term;

      //9
      //Add the user-selected amount of gifs to the url
      let limit = document.querySelector("#limit").value;
      url += "&limit=" + limit;

      //10
      //Updating the UI
      document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b><br>";

      //11
      //Check out the complete URL in the console
      console.log(url);

      //12
      //Request the data from the URL
      getData(url);


  }

  //GetData from URL
  function getData(url){
      //1
      //Make an XHR object
      let xhr = new XMLHttpRequest();

      //2
      //Set the onload event handler
      xhr.onload = dataLoaded;

      //3
      //Set the onerror event handler
      xhr.onerror = dataError;

      //4
      //Open the XHR connection to request the URL data
      xhr.open("GET", url);
      xhr.send();
  }
  
  //Callback Functions
  function dataLoaded(e){
      //5
      //The e.target is the XHR object
      let xhr = e.target;

      //6
      //xhr-responseText is the JSON file with the data from the URL
      console.log(xhr.responseText);

      //7
      //Convert the text into a Javascript object that can be parsed
      let obj = JSON.parse(xhr.responseText);

      //8
      //SHould there be no results, print out a message saying so, and terminate the function
      if (!obj.data || obj.data.length == 0) {
          document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
          return;
      }

      //9 Start making an HTML string for the user to see
      let results = obj.data
      console.log("results.length = " + results.length);
      let bigString = "";

      //10
      //Iterate through the results array
      for (let i = 0; i < results.length ; i++) {
      let result = results[i];

      //11
      //Get the URL to the current GIF
      let smallURL = result.images.fixed_width_downsampled.url;
      if (!smallURL) smallURL = "images/no-image-found.png";

      let rating = "N/A";
      if(result.rating){
        rating = result.rating.toUpperCase();
      }

      //12
      //Get the Giphy webpage URL
      let url = result.url;

      //13
      //Make a div for each result to hold them (ES6 String Templating)
      let line = `<div class='result'><img src='${smallURL}' title= '${result.id}' />`;
      line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span>
      <br><span>Rating: ${rating}</span></div>`;
      
      //Another way to do it above, just in case
      //var line = "<div class-'result'>";
      //    line += "<image src='";
      //    line += smallURL;
      //    line += "' title= '";
      //    line += result.id;
      //    line += "' />";
      //
      //    line += "<span><a target='_blank' href='" + url + "'>View on Giphy</a></span>";
      //    line += "</div>";
      
      //15
      // Add the new div to bigString and iterate
      bigString += line;
      }

      //16
      // Show the completed URL to the user
      document.querySelector("#content").innerHTML = bigString;

      //17
      //Update the status
      document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
  }

  function dataError(e){
      console.log("An error occurred");
  }
