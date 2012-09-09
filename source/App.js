enyo.kind({
    name: "App",
    kind: "Panels",
    fit: true,
    classes: "app-panels",
    arrangerKind: "CollapsingArranger",
    components: [
        {name: "List"},
        {name: "MyMiddlePanel"}
    ]
});
