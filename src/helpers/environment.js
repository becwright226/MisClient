let APIURL ='';

switch (window.location.hostname) {
    //
    case 'localhost' || '127.0.0.1':
        //
    APIURL = 'http://localhost:2260';
    break;

    case "misenplas-gpir.herokuapp.com":

    APIURL= 'https://misenplas-gpir.herokuapp.com'

}

export default APIURL;