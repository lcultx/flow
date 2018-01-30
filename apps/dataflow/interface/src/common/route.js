exports.getRouteConfig = function () {
    return [
        { path: "/", component: "home" },
        { path: "/define/enum", component: "enum" },
        { path: "/define/struct", component: "struct" },
        { path: "/define/const", component: "const" }
    ]
}
