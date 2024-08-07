// sheets.js
function gapiLoaded() {
  gapi.load('client:auth2', initializeGapiClient);
}

function initializeGapiClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES,
  }).then(() => {
    gapi.auth2.getAuthInstance().signIn();
  });
}

function readSheetData(spreadsheetId, range) {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetId,
    range: range,
  }).then(response => {
    const data = response.result.values;
    console.log(data);
  });
}

function writeSheetData(spreadsheetId, range, values) {
  const params = {
    spreadsheetId: spreadsheetId,
    range: range,
    valueInputOption: 'RAW',
  };
  const valueRangeBody = {
    range: range,
    values: values,
  };

  gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody).then(response => {
    console.log(response);
  });
}
