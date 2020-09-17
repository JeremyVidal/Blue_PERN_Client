let APIURL = "";

// console.log(window.location.hostname);
switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:3025";
    break;

  case "tl-my-mediacollection-client.herokuapp.com":
    APIURL = "https://tl-my-mediacollection.herokuapp.com";
}
export default APIURL;