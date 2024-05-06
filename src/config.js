let API = "https://skyapi.viften.elkok.dk/api/"

const host = window.location.hostname;

switch (host) {
    case "localhost":
    case "127.0.0.1":
        API = "http://localhost:888/api/"
        break;
}


export default {
    API,
}