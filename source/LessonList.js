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
            name: "listL",
            onSetupItem: "setRow",
            components: [{name: "text"}]
        }
    ],
    lessons: null,
    
    create: function () {
        this.inherited(arguments);
        this.$.webService.send({
            reduce: false,
            startkey: JSON.stringify(["nl_NL", null]),
            endkey: JSON.stringify(["nl_NL", {}])
        });
    },
    listLessons: function (inSender, inEvent) {
        lessons = inEvent.data.rows;
        this.$.listL.setCount(inEvent.data.rows.length);
    },
    setRow: function (inSender, inEvent) {
        var item = inEvent.item,
            index = inEvent.index;
        item.$.text.setContent(lessons[index].key[1]);
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
