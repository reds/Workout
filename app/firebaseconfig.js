import * as firebase from 'firebase';

var config = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    databaseURL: "Your databaseURL",
    storageBucket: "Your storageBucker"
};

firebase.initializeApp(config);

var firebaseDbh = firebase.database();

module.exports = firebaseDbh;
