(function () {
    ! function (e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
            var t;
            t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, (t.airbrakeJs || (t.airbrakeJs = {})).Client = e()
        }
    }(function () {
        return function e(t, n, r) {
            function o(a, c) {
                if (!n[a]) {
                    if (!t[a]) {
                        var s = "function" == typeof require && require;
                        if (!c && s) return s(a, !0);
                        if (i) return i(a, !0);
                        var u = new Error("Cannot find module '" + a + "'");
                        throw u.code = "MODULE_NOT_FOUND", u
                    }
                    var p = n[a] = {
                        exports: {}
                    };
                    t[a][0].call(p.exports, function (e) {
                        var n = t[a][1][e];
                        return o(n ? n : e)
                    }, p, p.exports, e, t, n, r)
                }
                return n[a].exports
            }
            for (var i = "function" == typeof require && require, a = 0; a < r.length; a++) o(r[a]);
            return o
        }({
            1: [function (e, t, n) {
                (function (n) {
                    var r, o, i;
                    e("./internal/compat"), i = e("./internal/merge"), o = e("./internal/promise"), r = function () {
                        function t(t) {
                            var r;
                            null == t && (t = {}), this._projectId = t.projectId || 0, this._projectKey = t.projectKey || "", this._host = "https://api.airbrake.io", this._processor = null, this._reporters = [], this._filters = [], void 0 !== t.processor ? this._processor = t.processor : this._processor = e("./processors/stack"), void 0 !== t.reporter ? this.addReporter(t.reporter) : (r = e("withCredentials" in new n.XMLHttpRequest ? "./reporters/xhr" : "./reporters/jsonp"), this.addReporter(r))
                        }
                        return t.prototype.setProject = function (e, t) {
                            return this._projectId = e, this._projectKey = t
                        }, t.prototype.setHost = function (e) {
                            return this._host = e
                        }, t.prototype.addContext = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: addContext is deprecated, please use addFilter"), this.addFilter(function (t) {
                                return t.context = i({}, e, t.context), t
                            })
                        }, t.prototype.setEnvironmentName = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: setEnvironmentName is deprecated, please use addFilter"), this.addFilter(function (t) {
                                return null == t.context.environment && (t.context.environment = e), t
                            })
                        }, t.prototype.addParams = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: addParams is deprecated, please use addFilter"), this.addFilter(function (t) {
                                return t.params = i({}, e, t.params), t
                            })
                        }, t.prototype.addEnvironment = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: addEnvironment is deprecated, please use addFilter"), this.addFilter(function (t) {
                                return t.environment = i({}, e, t.environment), t
                            })
                        }, t.prototype.addSession = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: addSession is deprecated, please use addFilter"), this.addFilter(function (t) {
                                return t.session = i({}, e, t.session), t
                            })
                        }, t.prototype.addReporter = function (e) {
                            return this._reporters.push(e)
                        }, t.prototype.addFilter = function (e) {
                            return this._filters.push(e)
                        }, t.prototype.notify = function (e) {
                            var t, r, a;
                            return t = {
                                language: "JavaScript",
                                sourceMapEnabled: !0
                            }, (null != (a = n.navigator) ? a.userAgent : void 0) && (t.userAgent = n.navigator.userAgent), n.location && (t.url = String(n.location)), r = new o, this._processor(e.error || e, function (n) {
                                return function (o, a) {
                                    var c, s, u, p, l, f, d, h, m, g, y;
                                    for (d = {
                                            notifier: {
                                                name: "airbrake-js-" + o,
                                                version: "0.5.2",
                                                url: "https://github.com/airbrake/airbrake-js"
                                            },
                                            errors: [a],
                                            context: i(t, e.context),
                                            params: e.params || {},
                                            environment: e.environment || {},
                                            session: e.session || {}
                                        }, m = n._filters, s = 0, p = m.length; p > s; s++) {
                                        if (c = m[s], f = c(d), null === f || f === !1) return;
                                        null != f.notifier && null != f.errors ? d = f : "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: filter must return notice or null to ignore the notice")
                                    }
                                    for (h = {
                                            projectId: n._projectId,
                                            projectKey: n._projectKey,
                                            host: n._host
                                        }, g = n._reporters, u = 0, l = g.length; l > u; u++)(y = g[u])(d, h, r)
                                }
                            }(this)), r
                        }, t.prototype.push = function (e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("airbrake: push is deprecated, please use notify"), this.notify(e)
                        }, t.prototype._wrapArguments = function (e) {
                            var t, n, r, o;
                            for (n = r = 0, o = e.length; o > r; n = ++r) t = e[n], "function" == typeof t && (e[n] = this.wrap(t));
                            return e
                        }, t.prototype.wrap = function (e) {
                            var t, n, r;
                            if (e.__airbrake__) return e;
                            r = this, t = function () {
                                var t, n;
                                t = r._wrapArguments(arguments);
                                try {
                                    return e.apply(this, t)
                                } catch (o) {
                                    return n = o, t = Array.prototype.slice.call(arguments), r.notify({
                                        error: n,
                                        params: {
                                            arguments: t
                                        }
                                    }), null
                                }
                            };
                            for (n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
                            return t.__airbrake__ = !0, t.__inner__ = e, t
                        }, t
                    }(), t.exports = r
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "./internal/compat": 2,
                "./internal/merge": 4,
                "./internal/promise": 5,
                "./processors/stack": 7,
                "./reporters/jsonp": 8,
                "./reporters/xhr": 9
            }],
            2: [function (e, t, n) {
                var r;
                null == (r = Array.prototype).indexOf && (r.indexOf = function (e, t) {
                    var n, r, o, i;
                    for (t = t || 0, n = r = o = t, i = this.length; i >= o ? i > r : r > i; n = i >= o ? ++r : --r)
                        if (this[n] === e) return n;
                    return -1
                })
            }, {}],
            3: [function (e, t, n) {
                var r, o, i;
                o = e("./truncate"), i = function (e, t) {
                    var n, r;
                    null == t && (t = 1e3), n = {};
                    for (r in e) n[r] = o(e[r], t = t);
                    return n
                }, r = function (e, t, n) {
                    var r, o;
                    for (null == t && (t = 1e3), null == n && (n = 64e3);;) {
                        if (e.params = i(e.params, t = t), e.environment = i(e.environment, t = t), e.session = i(e.session, t = t), o = JSON.stringify(e), o.length < n) return o;
                        if (0 === t) break;
                        t = Math.floor(t / 2)
                    }
                    throw r = new Error("airbrake-js: cannot jsonify notice (length=" + o.length + " maxLength=" + n + ")"), r.params = {
                        json: o.slice(0, +Math.floor(t / 2) + 1 || 9e9) + "..."
                    }, r
                }, t.exports = r
            }, {
                "./truncate": 6
            }],
            4: [function (e, t, n) {
                var r;
                r = function () {
                    var e, t, n, r, o, i;
                    for (i = Array.prototype.slice.call(arguments), e = i.shift() || {}, t = 0, r = i.length; r > t; t++) {
                        o = i[t];
                        for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (e[n] = o[n])
                    }
                    return e
                }, t.exports = r
            }, {}],
            5: [function (e, t, n) {
                var r;
                r = function () {
                    function e(e) {
                        var t, n;
                        this._onResolved = [], this._onRejected = [], n = function (e) {
                            return function () {
                                return e.resolve.apply(e, arguments)
                            }
                        }(this), t = function (e) {
                            return function () {
                                return e.reject.apply(e, arguments)
                            }
                        }(this), null != e && e(n, t)
                    }
                    return e.prototype.then = function (e, t) {
                        return e && (null != this._resolvedWith && e(this._resolvedWith), this._onResolved.push(e)), t && (null != this._rejectedWith && t(this._resolvedWith), this._onRejected.push(t)), this
                    }, e.prototype["catch"] = function (e) {
                        return null != this._rejectedWith && e(this._rejectedWith), this._onRejected.push(e), this
                    }, e.prototype.resolve = function () {
                        var e, t, n, r;
                        for (this._resolvedWith = arguments, r = this._onResolved, t = 0, n = r.length; n > t; t++) e = r[t], e.apply(this, this._resolvedWith);
                        return this
                    }, e.prototype.reject = function () {
                        var e, t, n, r;
                        for (this._rejectedWith = arguments, r = this._onRejected, t = 0, n = r.length; n > t; t++) e = r[t], e.apply(this, this._rejectedWith);
                        return this
                    }, e
                }(), t.exports = r
            }, {}],
            6: [function (e, t, n) {
                var r, o;
                r = function (e, t) {
                    var n;
                    try {
                        return e[t]
                    } catch (r) {
                        return void(n = r)
                    }
                }, o = function (e, t, n) {
                    var o, i, a, c, s;
                    return null == t && (t = 1e3), null == n && (n = 5), c = 0, a = [], s = [], i = function (e) {
                        var t, n, o, i, c;
                        for (n = s.indexOf(e), i = [a[n]], t = o = c = n; 0 >= c ? 0 >= o : o >= 0; t = 0 >= c ? ++o : --o) s[t] && r(s[t], i[0]) === e && (e = s[t], i.unshift(a[t]));
                        return "~" + i.join(".")
                    }, (o = function (e, u, p) {
                        var l, f, d, h, m, g;
                        if (null == u && (u = ""), null == p && (p = 0), c++, c > t) return "[Truncated]";
                        if (null === e || void 0 === e) return e;
                        switch (typeof e) {
                        case "boolean":
                        case "number":
                        case "string":
                        case "function":
                            return e;
                        case "object":
                            break;
                        default:
                            return String(e)
                        }
                        if (e instanceof Boolean || e instanceof Number || e instanceof String || e instanceof Date || e instanceof RegExp) return e;
                        if (s.indexOf(e) >= 0) return "[Circular " + i(e) + "]";
                        if (p++, p > n) return "[Truncated]";
                        if (a.push(u), s.push(e), c--, "[object Array]" === Object.prototype.toString.apply(e)) {
                            for (l = [], d = h = 0, m = e.length; m > h && (f = e[d], c++, !(c >= t)); d = ++h) l.push(o(f, u = d, p));
                            return l
                        }
                        l = {};
                        for (u in e)
                            if (Object.prototype.hasOwnProperty.call(e, u)) {
                                if (c++, c >= t) break;
                                g = r(e, u), void 0 !== g && (l[u] = o(g, u = u, p))
                            }
                        return l
                    })(e)
                }, t.exports = o
            }, {}],
            7: [function (e, t, n) {
                var r, o, i;
                o = [{
                    name: "v8",
                    re: /^\s*at\s(.+?)\s\((?:(?:(.+):(\d+):(\d+))|(.+))\)$/,
                    fn: function (e) {
                        return {
                            "function": e[1],
                            file: e[2] || e[5],
                            line: e[3] && parseInt(e[3], 10) || 0,
                            column: e[4] && parseInt(e[4], 10) || 0
                        }
                    }
                }, {
                    name: "firefox30",
                    re: /^(.*)@(.+):(\d+):(\d+)$/,
                    fn: function (e) {
                        var t, n, r, o;
                        return r = e[1], n = e[2], t = /^(\S+)\s(line\s\d+\s>\seval.*)$/, (o = n.match(t)) && (r = r.length > 0 ? r + " " + o[2] : o[2], n = o[1]), {
                            "function": r,
                            file: n,
                            line: parseInt(e[3], 10),
                            column: parseInt(e[4], 10)
                        }
                    }
                }, {
                    name: "firefox14",
                    re: /^(.*)@(.+):(\d+)$/,
                    fn: function (e, t, n) {
                        var r;
                        return r = 0 === t ? n.columnNumber || 0 : 0, {
                            "function": e[1],
                            file: e[2],
                            line: parseInt(e[3], 10),
                            column: r
                        }
                    }
                }, {
                    name: "v8-short",
                    re: /^\s*at\s(.+):(\d+):(\d+)$/,
                    fn: function (e) {
                        return {
                            "function": "",
                            file: e[1],
                            line: parseInt(e[2], 10),
                            column: parseInt(e[3], 10)
                        }
                    }
                }, {
                    name: "phantomjs",
                    re: /^\s*at\s(.+):(\d+)$/,
                    fn: function (e) {
                        return {
                            "function": "",
                            file: e[1],
                            line: parseInt(e[2], 10),
                            column: 0
                        }
                    }
                }, {
                    name: "default",
                    re: /.+/,
                    fn: function (e) {
                        return {
                            "function": e[0],
                            file: "",
                            line: 0,
                            column: 0
                        }
                    }
                }], i = /^\S+:\s.+$/, r = function (e, t) {
                    var n, r, a, c, s, u, p, l, f, d, h, m, g, y, v;
                    for (h = "nostack", g = e.stack || "", l = g.split("\n"), n = [], r = a = 0, s = l.length; s > a; r = ++a)
                        if (p = l[r], "" !== p)
                            for (c = 0, u = o.length; u > c; c++)
                                if (m = o[c], f = p.match(m.re)) {
                                    h = m.name, n.push(m.fn(f, r, e));
                                    break
                                }
                    return ("v8" === h || "v8-short" === h) && n.length > 0 && n[0]["function"].match(i) && (n = n.slice(1)), 0 !== n.length || null == e.fileName && null == e.lineNumber && null == e.columnNumber || n.push({
                        "function": "",
                        file: e.fileName || "",
                        line: parseInt(e.lineNumber, 10) || 0,
                        column: parseInt(e.columnNumber, 10) || 0
                    }), 0 !== n.length || null == e.filename && null == e.lineno && null == e.column && null == e.colno || n.push({
                        "function": "",
                        file: e.filename || "",
                        line: parseInt(e.lineno, 10) || 0,
                        column: parseInt(e.column || e.colno, 10) || 0
                    }), d = null != e.message ? e.message : String(e), null != e.name && "" !== e.name ? (y = e.name, d = y + ": " + d) : (v = /^Uncaught\s(.+?):\s.+$/, f = d.match(v), y = f ? f[1] : ""), t(h, {
                        type: y,
                        message: d,
                        backtrace: n
                    })
                }, t.exports = r
            }, {}],
            8: [function (e, t, n) {
                (function (n) {
                    var r, o, i;
                    o = e("../internal/jsonify_notice"), r = 0, i = function (e, t, i) {
                        var a, c, s, u, p, l, f;
                        return r++, a = "airbrakeCb" + String(r), n[a] = function (t) {
                            var r;
                            e.id = t.id, i.resolve(e);
                            try {
                                return delete n[a]
                            } catch (o) {
                                return r = o, n[a] = void 0
                            }
                        }, u = encodeURIComponent(o(e)), f = t.host + "/api/v3/projects/" + t.projectId + "/create-notice?key=" + t.projectKey + "&callback=" + a + "&body=" + u, c = n.document, s = c.getElementsByTagName("head")[0], l = c.createElement("script"), l.src = f, p = function () {
                            return s.removeChild(l)
                        }, l.onload = p, l.onerror = p, s.appendChild(l)
                    }, t.exports = i
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "../internal/jsonify_notice": 3
            }],
            9: [function (e, t, n) {
                (function (n) {
                    var r, o;
                    r = e("../internal/jsonify_notice"), o = function (e, t, o) {
                        var i, a, c;
                        return c = t.host + "/api/v3/projects/" + t.projectId + "/create-notice?key=" + t.projectKey, i = r(e), a = new n.XMLHttpRequest, a.open("POST", c, !0), a.send(i), a.onreadystatechange = function () {
                            var t;
                            return 4 === a.readyState && 200 === a.status ? (t = JSON.parse(a.responseText), e.id = t.id, o.resolve(e)) : void 0
                        }
                    }, t.exports = o
                }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
            }, {
                "../internal/jsonify_notice": 3
            }]
        }, {}, [1])(1)
    }),
    function (e) {
        "use strict";
        if (e.console) console.important = function (e) {
            console.log("%c" + e, "text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15); color: #fff; font-size: 50px; line-height: 1.1; font-weight: bold; background: url(http://i.imgur.com/IH9najC.jpg);")
        };
        else {
            var t = function () {};
            e.console = {
                log: t,
                info: t,
                warn: t,
                debug: t,
                error: t,
                important: t
            }
        }
        var n = "production",
            r = {}.hasOwnProperty,
            o = function () {
                return {
                    config: {
                        environment: n,
                        jsHost: "https://js.accepton.com",
                        checkoutHost: "https://checkout.accepton.com",
                        insightHost: "https://accepton.com",
                        analyticsHost: "https://accepton.com/analytics",
                        postMessageTargetOrigin: "*",
                        airbrakeEnvironment: "production",
                        airbrakeProjectId: "109456",
                        airbrakeProjectKey: "7fa07acade1960b7688b93c1f17e2fb5",
                        airbrakeEnabled: "true" === "true".toLowerCase(),
                        configureEndpoint: "/v1/form/configure",
                        subscriptionsEndpoint: "/v1/recurring/subscriptions",
                        rpcSignature: "accepton::",
                        configuration: "all".toLowerCase(),
                        whitelist: {
                            additionalConfig: {
                                referrer: !0,
                                url: !0,
                                appearance: !0,
                                hostAnalyticsData: !0
                            },
                            attributes: {
                                "public-key": !0,
                                token: !0,
                                target: !0,
                                "redirect-uri": !0,
                                "customer-email": !0,
                                "customer-email-required": !0,
                                "success-callback": !0,
                                image: !0,
                                "additional-fields": !0
                            },
                            additionalFields: {
                                name: !0,
                                phone: !0,
                                billing_address: !0,
                                shipping_address: !0
                            }
                        }
                    },
                    airbrake: null,
                    extendClass: function (e, t) {
                        function n() {
                            this.constructor = e
                        }
                        for (var o in t) r.call(t, o) && (e[o] = t[o]);
                        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                    },
                    logError: function (t, n) {
                        n = n || {}, e.__AcceptOn.config.airbrakeEnabled && e.__AcceptOn.airbrake ? "string" == typeof t ? (n.error = new Error(t), e.__AcceptOn.airbrake.notify(n)) : e.__AcceptOn.airbrake.notify(t) : console.error(t, n)
                    },
                    postMessageShim: function (t) {
                        e.postMessage(t, e.__AcceptOn.config.postMessageTargetOrigin)
                    }
                }
            };
        if (e.__AcceptOn || (e.__AcceptOn = new o), e.__AcceptOn.config.airbrakeEnabled && !e.__AcceptOn.airbrake) {
            e.__AcceptOn.airbrake = new airbrakeJs.Client({
                projectId: e.__AcceptOn.config.airbrakeProjectId,
                projectKey: e.__AcceptOn.config.airbrakeProjectKey
            }), e.__AcceptOn.airbrake.addFilter(function (t) {
                return t.errors[0] && t.errors[0].backtrace[0] && 0 === t.errors[0].backtrace[0].file.indexOf(e.__AcceptOn.config.jsHost) ? (t.context.environment = e.__AcceptOn.config.airbrakeEnvironment, t.session.config = e.__AcceptOn.config, t) : !1
            });
            var i = e.onerror;
            e.onerror = function (t, n, r) {
                i && i.apply(this, arguments), e.__AcceptOn.logError({
                    error: {
                        message: t,
                        fileName: n,
                        lineNumber: r
                    }
                })
            }
        }
    }(window);
    var requirejs, require, define;
    ! function (e) {
        function t(e, t) {
            return y.call(e, t)
        }

        function n(e, t) {
            var n, r, o, i, a, c, s, u, p, l, f, d = t && t.split("/"),
                h = m.map,
                g = h && h["*"] || {};
            if (e && "." === e.charAt(0))
                if (t) {
                    for (d = d.slice(0, d.length - 1), e = e.split("/"), a = e.length - 1, m.nodeIdCompat && b.test(e[a]) && (e[a] = e[a].replace(b, "")), e = d.concat(e), p = 0; p < e.length; p += 1)
                        if (f = e[p], "." === f) e.splice(p, 1), p -= 1;
                        else if (".." === f) {
                        if (1 === p && (".." === e[2] || ".." === e[0])) break;
                        p > 0 && (e.splice(p - 1, 2), p -= 2)
                    }
                    e = e.join("/")
                } else 0 === e.indexOf("./") && (e = e.substring(2));
            if ((d || g) && h) {
                for (n = e.split("/"), p = n.length; p > 0; p -= 1) {
                    if (r = n.slice(0, p).join("/"), d)
                        for (l = d.length; l > 0; l -= 1)
                            if (o = h[d.slice(0, l).join("/")], o && (o = o[r])) {
                                i = o, c = p;
                                break
                            }
                    if (i) break;
                    !s && g && g[r] && (s = g[r], u = p)
                }!i && s && (i = s, c = u), i && (n.splice(0, c, i), e = n.join("/"))
            }
            return e
        }

        function r(t, n) {
            return function () {
                var r = v.call(arguments, 0);
                return "string" != typeof r[0] && 1 === r.length && r.push(null), p.apply(e, r.concat([t, n]))
            }
        }

        function o(e) {
            return function (t) {
                return n(t, e)
            }
        }

        function i(e) {
            return function (t) {
                d[e] = t
            }
        }

        function a(n) {
            if (t(h, n)) {
                var r = h[n];
                delete h[n], g[n] = !0, u.apply(e, r)
            }
            if (!t(d, n) && !t(g, n)) throw new Error("No " + n);
            return d[n]
        }

        function c(e) {
            var t, n = e ? e.indexOf("!") : -1;
            return n > -1 && (t = e.substring(0, n), e = e.substring(n + 1, e.length)), [t, e]
        }

        function s(e) {
            return function () {
                return m && m.config && m.config[e] || {}
            }
        }
        var u, p, l, f, d = {},
            h = {},
            m = {},
            g = {},
            y = Object.prototype.hasOwnProperty,
            v = [].slice,
            b = /\.js$/;
        l = function (e, t) {
            var r, i = c(e),
                s = i[0];
            return e = i[1], s && (s = n(s, t), r = a(s)), s ? e = r && r.normalize ? r.normalize(e, o(t)) : n(e, t) : (e = n(e, t), i = c(e), s = i[0], e = i[1], s && (r = a(s))), {
                f: s ? s + "!" + e : e,
                n: e,
                pr: s,
                p: r
            }
        }, f = {
            require: function (e) {
                return r(e)
            },
            exports: function (e) {
                var t = d[e];
                return "undefined" != typeof t ? t : d[e] = {}
            },
            module: function (e) {
                return {
                    id: e,
                    uri: "",
                    exports: d[e],
                    config: s(e)
                }
            }
        }, u = function (n, o, c, s) {
            var u, p, m, y, v, b, w = [],
                _ = typeof c;
            if (s = s || n, "undefined" === _ || "function" === _) {
                for (o = !o.length && c.length ? ["require", "exports", "module"] : o, v = 0; v < o.length; v += 1)
                    if (y = l(o[v], s), p = y.f, "require" === p) w[v] = f.require(n);
                    else if ("exports" === p) w[v] = f.exports(n), b = !0;
                else if ("module" === p) u = w[v] = f.module(n);
                else if (t(d, p) || t(h, p) || t(g, p)) w[v] = a(p);
                else {
                    if (!y.p) throw new Error(n + " missing " + p);
                    y.p.load(y.n, r(s, !0), i(p), {}), w[v] = d[p]
                }
                m = c ? c.apply(d[n], w) : void 0, n && (u && u.exports !== e && u.exports !== d[n] ? d[n] = u.exports : m === e && b || (d[n] = m))
            } else n && (d[n] = c)
        }, requirejs = require = p = function (t, n, r, o, i) {
            if ("string" == typeof t) return f[t] ? f[t](n) : a(l(t, n).f);
            if (!t.splice) {
                if (m = t, m.deps && p(m.deps, m.callback), !n) return;
                n.splice ? (t = n, n = r, r = null) : t = e
            }
            return n = n || function () {}, "function" == typeof r && (r = o, o = i), o ? u(e, t, n, r) : setTimeout(function () {
                u(e, t, n, r)
            }, 4), p
        }, p.config = function (e) {
            return p(e)
        }, requirejs._defined = d, define = function (e, n, r) {
            n.splice || (r = n, n = []), t(d, e) || t(h, e) || (h[e] = [e, n, r])
        }, define.amd = {
            jQuery: !0
        }
    }(), "object" != typeof JSON && (JSON = {}),
        function () {
            "use strict";

            function f(e) {
                return 10 > e ? "0" + e : e
            }

            function this_value() {
                return this.valueOf()
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                    var t = meta[e];
                    return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, o, i, a, c = gap,
                    s = t[e];
                switch (s && "object" == typeof s && "function" == typeof s.toJSON && (s = s.toJSON(e)), "function" == typeof rep && (s = rep.call(t, e, s)), typeof s) {
                case "string":
                    return quote(s);
                case "number":
                    return isFinite(s) ? String(s) : "null";
                case "boolean":
                case "null":
                    return String(s);
                case "object":
                    if (!s) return "null";
                    if (gap += indent, a = [], "[object Array]" === Object.prototype.toString.apply(s)) {
                        for (i = s.length, n = 0; i > n; n += 1) a[n] = str(n, s) || "null";
                        return o = 0 === a.length ? "[]" : gap ? "[\n" + gap + a.join(",\n" + gap) + "\n" + c + "]" : "[" + a.join(",") + "]", gap = c, o
                    }
                    if (rep && "object" == typeof rep)
                        for (i = rep.length, n = 0; i > n; n += 1) "string" == typeof rep[n] && (r = rep[n], o = str(r, s), o && a.push(quote(r) + (gap ? ": " : ":") + o));
                    else
                        for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (o = str(r, s), o && a.push(quote(r) + (gap ? ": " : ":") + o));
                    return o = 0 === a.length ? "{}" : gap ? "{\n" + gap + a.join(",\n" + gap) + "\n" + c + "}" : "{" + a.join(",") + "}", gap = c, o
                }
            }
            "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
            var cx, escapable, gap, indent, meta, rep;
            "function" != typeof JSON.stringify && (escapable = /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, meta = {
                "\b": "\\b",
                "	": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            }, JSON.stringify = function (e, t, n) {
                var r;
                if (gap = "", indent = "", "number" == typeof n)
                    for (r = 0; n > r; r += 1) indent += " ";
                else "string" == typeof n && (indent = n);
                if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
                return str("", {
                    "": e
                })
            }), "function" != typeof JSON.parse && (cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, JSON.parse = function (text, reviver) {
                function walk(e, t) {
                    var n, r, o = e[t];
                    if (o && "object" == typeof o)
                        for (n in o) Object.prototype.hasOwnProperty.call(o, n) && (r = walk(o, n), void 0 !== r ? o[n] = r : delete o[n]);
                    return reviver.call(e, t, o)
                }
                var j;
                if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                        return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                    })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }(), define("accepton/utils", function () {
            "use strict";
            var e = {},
                t = "function" != typeof document.getElementsByClassName ? function (e) {
                    for (var t = [], n = new RegExp("(^| )" + e + "( |$)"), r = document.body.getElementsByTagName("*"), o = 0, i = r.length; i > o; o++) n.test(r[o].className) && t.push(r[o]);
                    return t
                } : function (e) {
                    return document.getElementsByClassName(e)
                };
            e.$ = function (e) {
                return t(e)
            }, e.addClass = function (e, t) {
                return e.className += " " + t
            }, e.append = function (e, t) {
                return e.appendChild(t)
            }, e.bind = function (e, t, n) {
                return void 0 !== e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, n)
            }, e.unbind = function (e, t, n) {
                return void 0 !== e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, n)
            }, e.bindToContext = function (e, t) {
                return function () {
                    e.apply(t, arguments)
                }
            }, e.insertAfter = function (e, t) {
                return e.parentNode.insertBefore(t, e.nextSibling)
            }, e.insertBefore = function (e, t) {
                return e.parentNode.insertBefore(t, e)
            }, e.canonicalize = function (e) {
                var t = document.createElement("a");
                return t.href = e, t.href
            };
            var n = Object.prototype.toString;
            return e.isString = function (e) {
                return "[object String]" === n.call(e)
            }, e.stringifyRPCCall = function (e) {
                return window.__AcceptOn.config.rpcSignature + JSON.stringify(e)
            }, e.isMobile = function () {
                var e = !1;
                return function (t) {
                    (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0)
                }(navigator.userAgent || navigator.vendor || window.opera), e
            }, e.createUrlFromView = function (e) {
                return e.host + e.path + "?instanceId=accepton-app-" + e.instanceId + "&referrer=" + window.location.href
            }, e
        }), define("accepton/views/iFrameView", function () {
            "use strict";
            var e, t = require("accepton/utils"),
                n = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                };
            return e = function (e, t) {
                this.host = e, this.path = t;
                this.handleKeyUp = n(this.handleKeyUp, this), this.instanceId = window.__AcceptOn.instanceCounter
            }, e.prototype.attachToDOM = function () {
                var e, n;
                return e = "z-index: 9999;\nmargin: 0;\npadding: 0;\nbackground: transparent;\nvisibility: hidden;\nborder: 0px none transparent;\noverflow-x: hidden;\noverflow-y: auto;\n", e += "position: fixed;\nheight: 100%;\nwidth: 100%;\ntop: 0;\nleft: 0;", n = document.createElement("iframe"), n.setAttribute("frameBorder", 0), n.setAttribute("allowtransparency", "true"), n.style.cssText = e, t.bind(n, "load", function () {
                    n.style.visibility = "visible"
                }), n.src = t.createUrlFromView(this), n.className = "accepton-app", t.append(document.body, n), n
            }, e.prototype.resize = function () {}, e.prototype.open = function () {
                this.iframe && this.close(), t.bind(document, "keyup", this.handleKeyUp), this.iframe = this.attachToDOM()
            }, e.prototype.close = function () {
                this.iframe && this.iframe.parentNode && (this.iframe.clearAttributes && this.iframe.clearAttributes(), window.XDomainRequest && this.iframe.setAttribute("src", ""), this.iframe.parentNode.removeChild(this.iframe), this.iframe = null), t.unbind(document, "keyup", this.handleKeyUp)
            }, e.prototype.handleKeyUp = function (e) {
                e = e || window.event, 27 == e.keyCode && this.notify({
                    method: "closeModal",
                    params: {}
                })
            }, e.prototype.notify = function (e) {
                this.iframe.contentWindow.postMessage(t.stringifyRPCCall(e), this.host)
            }, e
        }), define("accepton/views/inlineIFrameView", function () {
            "use strict";
            var e, t = require("accepton/utils");
            return e = function (e, t, n) {
                this.host = e, this.path = t, this.targetElement = n, this.instanceId = window.__AcceptOn.instanceCounter, this.iframe = this.attachToDOM()
            }, e.prototype.attachToDOM = function () {
                var e, n;
                return e = "width: 470px; height: 448px; overflow-x: hidden; overflow-y: hidden; visibility: hidden;", n = document.createElement("iframe"), n.setAttribute("frameBorder", 0), n.setAttribute("allowtransparency", "true"), n.style.cssText = e, t.bind(n, "load", function () {
                    n.style.visibility = "visible"
                }), n.src = t.createUrlFromView(this), n.className = "accepton-inline-app", t.insertAfter(this.targetElement, n), n
            }, e.prototype.resize = function (e, t) {
                this.iframe.style.width = (e || 470) + "px", this.iframe.style.height = (t || 448) + "px"
            }, e.prototype.notify = function (e) {
                this.iframe.contentWindow.postMessage(t.stringifyRPCCall(e), this.host)
            }, e
        }), define("accepton/views/windowView", function () {
            "use strict";
            var e, t = require("accepton/utils"),
                n = function (e, t) {
                    return function () {
                        return e.apply(t, arguments)
                    }
                };
            return e = function (e, t) {
                this.host = e, this.path = t;
                this.handleKeyUp = n(this.handleKeyUp, this), this.instanceId = window.__AcceptOn.instanceCounter
            }, e.prototype.attachToDOM = function () {
                var e = window.open(t.createUrlFromView(this), "_blank");
                return e
            }, e.prototype.resize = function () {}, e.prototype.open = function () {
                this.targetWindow && this.close(), t.bind(document, "keyup", this.handleKeyUp), this.targetWindow = this.attachToDOM()
            }, e.prototype.close = function () {
                this.targetWindow && (this.notify({
                    method: "closeSelf",
                    params: {}
                }), this.targetWindow = null), t.unbind(document, "keyup", this.handleKeyUp)
            }, e.prototype.handleKeyUp = function (e) {
                e = e || window.event, 27 == e.keyCode && this.notify({
                    method: "closeModal",
                    params: {}
                })
            }, e.prototype.notify = function (e) {
                this.targetWindow.postMessage(t.stringifyRPCCall(e), this.host)
            }, e
        }), define("accepton/controllers/app", function () {
            "use strict";
            var e, t = require("accepton/controllers/checkout"),
                n = require("accepton/utils");
            return e = function () {
                this.host = window.__AcceptOn.config.jsHost, this.scriptElement = this.findScriptElement(), this.options = this.parseOptions(), this.instanceId = "accepton-app-" + window.__AcceptOn.instanceCounter, n.addClass(this.scriptElement, "active")
            }, e.prototype.findScriptElement = function () {
                var e, t, r, o, i;
                if (e = n.$("accepton"), 0 === e.length) {
                    for (o = document.getElementsByTagName("script"), t = 0; t < o.length; ++t)
                        if (e = o[t], i = e.getAttribute("src"), i && (r = i.match(/accepton\.js/), r && void 0 === e.attributes["data-accepton-active"])) {
                            e.setAttribute("data-accepton-active", "");
                            break
                        }
                } else e = e[e.length - 1];
                return e
            }, e.prototype.parseOptions = function () {
                var e, t, r, o = this.scriptElement.attributes,
                    i = o.length,
                    a = {
                        referrer: document.referrer,
                        url: document.URL,
                        appearance: "modal"
                    };
                for (t = 0; i > t; t++)
                    if (e = o[t], r = e.name.match(/^data-(.+)$/), null !== r && r[1] && window.__AcceptOn.config.whitelist.attributes[r[1]]) {
                        var c = e.value;
                        "image" === r[1] && (c = n.canonicalize(c)), a[r[1]] = c
                    }
                return a.hasOwnProperty("target") && a.target && ("href" === a.target ? a.appearance = "modal" : a.appearance = "inline"), n.isMobile() && "modal" === a.appearance && (a.appearance = "window"), a
            }, e.prototype.redirect = function (e) {
                var t = document.createElement("form"),
                    n = document.createElement("input");
                n.name = "response", n.value = JSON.stringify(e.charge), t.action = e.uri, t.method = "POST", t.target = "_self", t.style.cssText = "display: none !important;", t.appendChild(n), document.body.appendChild(t), t.submit()
            }, e.prototype.paymentSuccess = function (e) {
                var t;
                if (this.options["success-callback"] && "function" == typeof window[this.options["success-callback"]] && (t = window[this.options["success-callback"]].call(window, e)), e.redirectUri && t !== !1) {
                    var n = this;
                    setTimeout(function () {
                        n.redirect({
                            charge: e.charge,
                            uri: e.redirectUri
                        })
                    }, 1)
                }
            }, e.prototype.setup = function () {
                this.checkout = new t(this.host, this.options, this.scriptElement)
            }, e.prototype.setHost = function (e) {
                this.host = e
            }, e.prototype.setupFrame = function () {
                if (this.checkout) {
                    var e = {};
                    for (var n in this.options) e[n] = this.options[n];
                    e.hostAnalyticsData = {
                        window: {
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight
                        },
                        document: {
                            location: location.href,
                            title: document.title
                        }
                    }, document.documentMode && (e.hostAnalyticsData.document.ieDocumentMode = document.documentMode), t.activeView.notify({
                        method: "configure",
                        params: e
                    })
                }
            }, e.prototype.resizeFrame = function (e) {
                this.checkout && t.activeView.resize(e.width, e.height)
            }, e.prototype.close = function () {
                t.activeView && t.activeView.close && t.activeView.close()
            }, e
        }), define("accepton/controllers/button", ["accepton/utils"], function () {
            "use strict";
            var e, t = require("accepton/utils");
            return e = function (e, n) {
                this.checkout = e, this.anchorElement = n, void 0 === this.anchorElement.parentNode.attributes["data-accepton-button"] ? (this.element = document.createElement("button"), this.element.setAttribute("type", "submit"), this.element.className = "accepton-button-submit", this.render()) : this.element = this.anchorElement.parentNode, t.bind(this.element, "click", t.bindToContext(this.launch, this))
            }, e.load = function (t, n) {
                var r = new e(t, n);
                return r.addToPage()
            }, e.prototype.addToPage = function () {
                !this.element || this.element.parentNode && 11 !== this.element.parentNode.nodeType || t.insertBefore(this.anchorElement, this.element)
            }, e.prototype.launch = function (e) {
                this.checkout.open(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, e.prototype.render = function () {
                return this.element.innerHTML = "", this.span = document.createElement("span"), this.span.innerHTML = "Pay Now", t.append(this.element, this.span)
            }, e
        }), define("accepton/controllers/checkout", function () {
            "use strict";
            var e, t = require("accepton/controllers/button"),
                n = require("accepton/controllers/href"),
                r = require("accepton/views/inlineIFrameView"),
                o = require("accepton/views/iFrameView"),
                i = require("accepton/views/windowView");
            return e = function (a, c, s) {
                switch (this.host = a, this.options = c, s && (this.element = s), this.options.appearance) {
                case "inline":
                    this.view = new r(this.host, "/index.html", this.element), e.activeView = this.view;
                    break;
                case "modal":
                    if (this.view = new o(this.host, "/index.html"), c.hasOwnProperty("target") && "href" === c.target) {
                        var u = window.__AcceptOn.config.insightHost + "/payment/" + c["public-key"] + "/" + c.token;
                        this.button = n.load(this, u)
                    } else this.button = t.load(this, this.element);
                    break;
                case "window":
                    if (this.view = new i(this.host, "/index.html"), c.hasOwnProperty("target") && "href" === c.target) {
                        var u = window.__AcceptOn.config.insightHost + "/payment/" + c["public-key"] + "/" + c.token;
                        this.button = n.load(this, u)
                    } else this.button = t.load(this, this.element);
                    break;
                default:
                    console.log("Invalid form appearance")
                }
            }, e.activeView = null, e.prototype.open = function (t) {
                return t = t || {}, e.activeView && e.activeView !== this.view && e.activeView.close(), e.activeView = this.view, this.view.open(t)
            }, e
        }), define("accepton/controllers/href", ["accepton/utils"], function () {
            "use strict";
            var e, t = require("accepton/utils"),
                n = {
                    hubspot: !1
                };
            return e = function (r, o) {
                this.checkout = r, n.hubspot = e._detectHubspot();
                for (var i = this, a = document.getElementsByTagName("a"), c = a.length - 1; c >= 0; c--) {
                    var s = a[c];
                    if (!s.getAttribute("data-accepton-href")) {
                        var u;
                        if (u = s.getAttribute("href") || "", 0 === u.indexOf(o)) {
                            var o = u + "?",
                                p = [];
                            for (var l in this.checkout.options)
                                if (this.checkout.options.hasOwnProperty(l)) {
                                    var f = this.checkout.options[l];
                                    p.push(encodeURIComponent(l) + "=" + encodeURIComponent(f))
                                }
                            o += p.join("&"), n.hubspot || (s.setAttribute("href", o), t.bind(s, "click", t.bindToContext(this.launch, this))), s.setAttribute("data-accepton-href", "")
                        }
                    }
                }
                n.hubspot && t.bind(document, "click", function (e) {
                    var t, n = e.target;
                    return "SPAN" === n.nodeName && (n = n.parentNode), "A" === n.nodeName && (t = n.getAttribute("cta_dest_link") || "", 0 === t.indexOf(o)) ? i.launch(e) : void 0;
                })
            }, e._detectHubspot = function () {
                var e = document.getElementsByTagName("meta").generator;
                return e && "HubSpot" === e.content ? !0 : !1
            }, e.load = function (t, n) {
                var r = new e(t, n);
                return r
            }, e.prototype.launch = function (e) {
                this.checkout.open(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }, e
        }),
        function (e) {
            "use strict";
            if (!e.__AcceptOn.configured) {
                e.__AcceptOn.configured = !0, e.__AcceptOn.config.airbrakeEnabled && e.__AcceptOn.airbrake && e.__AcceptOn.airbrake.addFilter(function (t) {
                    t.context.component = "loader";
                    try {
                        t.params.appInstances = e.__AcceptOn.__appInstances
                    } catch (n) {}
                    return t
                }), void 0 === e.__AcceptOn.instanceCounter && (e.__AcceptOn.instanceCounter = 0), void 0 === e.__AcceptOn.__appInstances && (e.__AcceptOn.__appInstances = {});
                var t = require("accepton/utils");
                t.bind(e, "message", function (n) {
                    if (n.origin !== e.__AcceptOn.config.jsHost || !t.isString(n.data) || 0 !== n.data.indexOf(e.__AcceptOn.config.rpcSignature)) return void("production" !== e.__AcceptOn.config.environment && console.warn("ignoring postMessage"));
                    var r = JSON.parse(n.data.substring(e.__AcceptOn.config.rpcSignature.length, n.data.length)),
                        o = e.__AcceptOn.__appInstances[r.instanceId];
                    return o ? "function" != typeof o[r.method] ? (e.__AcceptOn.logError("Invalid method in rpc call:" + r.method), !1) : void o[r.method].call(o, r.params) : (e.__AcceptOn.logError("Invalid app instance in rpc call:" + r.instanceId), !1)
                })
            }
            var n = require("accepton/controllers/app");
            e.__AcceptOn.instanceCounter++;
            var r = new n;
            e.__AcceptOn.__appInstances[r.instanceId] = r, r.setup()
        }(window);
}());
