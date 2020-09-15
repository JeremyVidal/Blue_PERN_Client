let APIURL = "";

switch (window.location.hostname){
    case "localhost" || "127.0.0.1":

    APIURL = "https://localhost:3025";
    break;

    case "tl-my-mediacollection.herokuapp.com":

    APIURL = "https://tl-my-mediacollection.herokuapp.com/"
}
export default APIURL;