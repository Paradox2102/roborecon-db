const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.copyScoutingReportsToTableau = functions.database.ref('/event_scouting_reports/{eventId}/{teamId}/{rptId}').onWrite(event => {
    // grab params
    var rptId = event.params.rptId;
    var teamId = event.params.teamId;
    var eventId = event.params.eventId;

    // grab actual scouting report
    var rpt = event.data.val();

    return admin.database().ref(`/team_keys/${teamId}/report_key`).once('value').then(snapshot => {
        var key = snapshot.val();
        return admin.database().ref(`/team_scouting_reports/${teamId}/${key}/${eventId}/${rptId}`).update(rpt);
    })
    

    // must return a Promise when performing asynchronous tasks inside a Functions
    // return event.data.ref.root.child(`/reports/${teamId}/parad0x/${eventId}/${rptId}`).update(rpt);
    //return event.data.ref.parent.child('uppercase').set(uppercase);
});