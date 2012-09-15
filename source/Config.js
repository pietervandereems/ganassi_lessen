enyo.singleton({
    kind: enyo.Control,
	name: "ganassi.Config",
	published: {
		couchDB: {
		    url: "http://localhost:3333/db",
		    lesson: "lesson"
		},
		lesson: {
		    db: null,
		    view: null
		}
	},
	create: function () {
	    var couchdb=fermata.json(this.couchDB.url);
	    this.inherited(arguments);
	    this.lesson.db = couchdb(this.couchDB.lesson);
	    this.lesson.view = this.lesson.db('_design/frontend/_view/');
        console.log('crea');
	}
})
