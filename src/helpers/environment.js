let APIURL ='';

switch (window.location.hostname) {
    //
    case 'localhost' || '127.0.0.1':
        //
    APIURL = 'http://localhost:2260';
    break;

    case "misenplas.herokuapp.com":

    APIURL= 'https://misenplas.herokuapp.com'

}

export default APIURL;