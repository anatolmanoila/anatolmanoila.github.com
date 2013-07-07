/**
sample javascript from xui
*/

var undefined,
    xui,
    window     = this,
    string     = new String('string'),
    document   = window.document,
    simpleExpr = /^#?([\w-]+)$/,
    idExpr     = /^#/,
    tagExpr    = /<([\w:]+)/,
    slice      = function (e) { return [].slice.call(e, 0); };
