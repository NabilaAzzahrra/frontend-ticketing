module.exports = [
"[project]/frontend/node_modules/jquery/dist/jquery.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/9e883_jquery_dist_jquery_6c2d6a04.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/node_modules/jquery/dist/jquery.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/frontend/node_modules/datatables.net-dt/js/dataTables.dataTables.mjs [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/9e883_4c1f0371._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/frontend/node_modules/datatables.net-dt/js/dataTables.dataTables.mjs [app-ssr] (ecmascript)");
    });
});
}),
];