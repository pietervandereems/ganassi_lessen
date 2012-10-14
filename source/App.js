enyo.kind({
    name: "App",
    kind: "Panels",
    fit: true,
    classes: "app-panels",
    arrangerKind: "CollapsingArranger",
    components: [
        {name: "List", kind: "enyo.Scroller", components: [ 
            {name: "Lessons", kind: "ganassi.LessonList"} 
        ]},
        {name: "Content"}
    ]
});
