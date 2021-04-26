var global;
export {
    global,
    handleClientLoad
};
chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    let init = {
        method: 'GET',
        async: true,
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        'contentType': 'json'
    };
    fetch(
            'https://www.googleapis.com/gmail/v1/users/me/profile?',
            init)
        .then((response) => response.json())
        .then(function(data) {
            console.log(data);
            console.log(data.emailAddress);
            global = data.emailAddress;
        });
    appendValues();
});

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
    console.log("succsessully");
}

function initClient() {
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '947005021816-8dpsbm6icimgo5qujl3ihh92q8jbn11n.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyCnOUhyWNSAASHKevvFltlLlZwnx7O31Jo';

    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/spreadsheets";
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function() {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function appendValues() {
    let spreadsheet = '1KJABE6ZF-0N02lYt2NgD7YRJwer6QB7tNvQZp21Ys6Y';
    let r = 'members';
    let valueInput = 'RAW';
    handleClientLoad();
    console.log("test");
    var values = [
        [
            "kdsaksa", "jasdaks"
        ],
        "dasdd", "dadsa"
    ];
    // [START_EXCLUDE silent]
    // values = _values;
    // [END_EXCLUDE]
    var body = {
        values: values
    };
    gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: spreadsheet,
        range: r,
        valueInputOption: valueInput,
        resource: body
    }).then((response) => {
        var result = response.result;
        console.log(`${result.updates.updatedCells} cells appended.`)
            // [START_EXCLUDE silent]
        callback(response);
        // [END_EXCLUDE]
    });
    // [END sheets_append_values]
}