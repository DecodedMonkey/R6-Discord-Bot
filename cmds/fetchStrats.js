const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const GoogleAuth = require('google-auth-library');
const jsonfile = require('jsonfile');
const prefix = process.env.BOT_PREFIX;

module.exports.run = async (bot, msg) => {
    // If modifying these scopes, delete your previously saved credentials
    // at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
    let SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    let TOKEN_DIR = './.credentials/';
    let TOKEN_PATH = TOKEN_DIR + 'credentials.json';

    // Load client secrets from a local file.
    fs.readFile('client_secret.json', function processClientSecrets(err, content) {
        if (err) {
            console.log('Error loading client secret file: ' + err);
            return;
        }
        // Authorize a client with the loaded credentials, then call the
        // Google Sheets API.
        authorize(JSON.parse(content), updateStratsJSONFile);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     *
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     * @returns {none} none
     */
    function authorize(credentials, callback) {
        let clientSecret = credentials.installed.client_secret;
        let clientId = credentials.installed.client_id;
        let redirectUrl = credentials.installed.redirect_uris[0];
        let auth = new GoogleAuth();
        let oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, function (err, token) {
            if (err) {
                getNewToken(oauth2Client, callback);
            } else {
                oauth2Client.credentials = JSON.parse(token);
                callback(oauth2Client);
            }
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     *
     * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback to call with the authorized client.
     * @returns {none} none
     */
    function getNewToken(oauth2Client, callback) {
        let authUrl = oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: SCOPES
        });
        msg.channel.send('Bot not authorized! Please contact Administrator');
        console.log('Authorize this app by visiting this url: ', authUrl);
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('Enter the code from that page here: ', function (code) {
            rl.close();
            oauth2Client.getToken(code, function (err, token) {
                if (err) {
                    console.log('Error while trying to retrieve access token', err);
                    return;
                }
                oauth2Client.credentials = token;
                storeToken(token);
                callback(oauth2Client);
            });
        });
    }

    /**
     * Store token to disk be used in later program executions.
     *
     * @param {Object} token The token to store to disk.
     * @returns {none} none
     */
    function storeToken(token) {
        try {
            fs.mkdirSync(TOKEN_DIR);
        } catch (err) {
            if (err.code != 'EEXIST') {
                throw err;
            }
        }
        fs.writeFile(TOKEN_PATH, JSON.stringify(token));
        console.log('Token stored to ' + TOKEN_PATH);
    }

    /*
     * Update strats.json with sheet data:
     */
    function updateStratsJSONFile(auth) {
        let sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
            auth: auth,
            spreadsheetId: process.env.SHEET_ID,
            range: 'R6 Strats!A2:C'
        }, function (err, response) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            let rows = response.values;
            if (rows.length == 0) {
                console.err('No data found.');
            } else {
                let obj = [];
                for (let i = 0; i < rows.length; i++) {
                    let row = rows[i];
                    // Print columns A and E, which correspond to indices 0 and 4.
                    // console.log('%s, %s, %s', row[0], row[1], row[2]);
                    obj.push({ strat: row[0], name: row[1], type: row[2] });
                }
                // console.log(obj);
                jsonfile.writeFile('./strats.json', obj, { spaces: 4 }, function (e) {
                    if (e) {
                        return msg.channel.send(`There seems to have been an error: ${e}`);
                    }
                    msg.channel.send('Strats have been fetched and updated!');
                });
            }
        });
    }
};

module.exports.properties = {
    name: prefix + 'fetchStrats',
    cmd: [prefix + 'fetchStrats']
};
