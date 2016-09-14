import * as firebase from 'firebase';

var config = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    databaseURL: "Your databaseURL",
    storageBucket: "Your storageBucket"
};

firebase.initializeApp(config);

var firebaseDbh = firebase.database();

module.exports = firebaseDbh;
