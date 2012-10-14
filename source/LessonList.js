enyo.kind({
    name: "ganassi.LessonList",
    kind: enyo.Control,

    components: [
        {
            kind: enyo.WebService,
            onResponse: "listLessons",
            url: ganassi.Config.couchDB.url + '/' + ganassi.Config.couchDB.lesson + '/' + ganassi.Config.lesson.viewUrl
        },
        {
            kind: enyo.Repeater,
            onSetupItem: "setRow",
            components: [{name: "text"}]
        }
        ],
    lessons: null,
    
    create: function () {
        this.inherited(arguments);
        this.$.webService.send({reduce: false});
    },
    listLessons: function (inSender, inEvent) {
        enyo.log('r24,', ganassi.Config.couchDB.url + '/' + ganassi.Config.couchDB.lesson + '/' + ganassi.Config.lesson.viewUrl);
        enyo.log('listLessons', inEvent.data);
    },
    setRow: function (inSender, inEvent) {
        var item = inEvent.item,
            index = inEvent.index;
        enyo.log("setRow", inSender, inEvent);
    }
});

/*
enyo.kind({
    name: "ganassi.LessonList",
    kind: enyo.Repeater,
    components: [ {
        kind: enyo.WebService,
        onResponse: "showResults",
        url: 'http://myservice.com/getResults'
     } ],
    create: function() { this.inherited(arguments);this.$.webService.send({}); },
    showResults: function (inSender, inEvent) {
        this.setContent(inEvent.result.data);
    }
});
*/
