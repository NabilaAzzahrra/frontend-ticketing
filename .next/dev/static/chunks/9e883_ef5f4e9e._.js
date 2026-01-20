(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/jquery/dist/jquery.js [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/9e883_jquery_dist_jquery_7271128f.js",
  "static/chunks/9e883_jquery_dist_jquery_bcbad30b.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/node_modules/jquery/dist/jquery.js [app-client] (ecmascript)");
    });
});
}),
"[project]/frontend/node_modules/datatables.net-dt/js/dataTables.dataTables.mjs [app-client] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "static/chunks/9e883_12eff7cd._.js",
  "static/chunks/9e883_datatables_net-dt_js_dataTables_dataTables_mjs_bcbad30b._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/node_modules/datatables.net-dt/js/dataTables.dataTables.mjs [app-client] (ecmascript)");
    });
});
}),
]);