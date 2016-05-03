var frisby = require('./lib/frisby');
var constants = require('./lib/constants');

//Authentication Test
frisby.create('Authentication Test')
    .post(constants.MAIN_URL + constants.EMPLOYEE + 'authenticate/', {
        username: constants.USERNAME,
        password: constants.PASSWORD
    }, {
        json: true
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'application/json')
    .expectJSONTypes({
        token: String,
        user_id: Number
    })
    .afterJSON(
        function(res) {
            frisby.globalSetup({
                request: {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            });
            //Give Stars Test
            frisby.create('Give Stars Test')
                .post(constants.MAIN_URL + constants.STAR + constants.IDSERGIO + constants.GIVESTARS + constants.IDBOBBY + '/' , {
                    "pk": 1,
                    "category": "1",
                    "subcategory": "1",
                    "text": "MVP"
                },  {
                    json: true
                })
                .addHeader('Authorization', 'Token ' + res.token)
                .expectStatus(201)
                .afterJSON(
                    function() {
                        frisby.globalSetup({
                            request: {
                                headers: {
                                    'Accept': 'application/json'
                                }
                            }
                        });

                    })
                .toss();
        })
    .toss();


function log(params) {
    console.log(params);
}
