(function () {
    function e(a) {
        throw a;
    }
    var h = void 0,
        i = !0,
        k = null,
        m = !1;

    function aa() {
        return function (a) {
            return a
        }
    }

    function ca() {
        return function () {}
    }

    function da(a) {
        return function (b) {
            this[a] = b
        }
    }

    function n(a) {
        return function () {
            return this[a]
        }
    }

    function p(a) {
        return function () {
            return a
        }
    }
    var r, ea = ea || {},
        s = this;

    function fa(a, b) {
        var c = a.split("."),
            d = s;
        !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
        for (var f; c.length && (f = c.shift());)!c.length && ga(b) ? d[f] = b : d = d[f] ? d[f] : d[f] = {}
    }

    function ha(a) {
        for (var a = a.split("."), b = s, c; c = a.shift();)
            if (b[c] != k) b = b[c];
            else return k;
        return b
    }

    function ia() {}

    function t(a) {
        a.v = function () {
            return a.cj || (a.cj = new a)
        }
    }

    function ja(a) {
        var b = typeof a;
        if ("object" == b)
            if (a) {
                if (a instanceof Array) return "array";
                if (a instanceof Object) return b;
                var c = Object.prototype.toString.call(a);
                if ("[object Window]" == c) return "object";
                if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) return "array";
                if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) return "function"
            } else return "null";
        else if ("function" == b && "undefined" == typeof a.call) return "object";
        return b
    }

    function ga(a) {
        return a !== h
    }

    function ka(a) {
        return "array" == ja(a)
    }

    function la(a) {
        var b = ja(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function u(a) {
        return "string" == typeof a
    }

    function ma(a) {
        return "function" == ja(a)
    }

    function na(a) {
        var b = typeof a;
        return "object" == b && a != k || "function" == b
    }

    function oa(a) {
        return a[pa] || (a[pa] = ++qa)
    }
    var pa = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36),
        qa = 0;

    function ra(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function sa(a, b, c) {
        a || e(Error());
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function v(a, b, c) {
        v = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ra : sa;
        return v.apply(k, arguments)
    }

    function ta(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function () {
            var b = Array.prototype.slice.call(arguments);
            b.unshift.apply(b, c);
            return a.apply(this, b)
        }
    }
    var va = Date.now || function () {
        return +new Date
    };

    function w(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.b = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    };

    function wa(a, b, c, d, f, g) {
        this.xb = a || xa;
        this.Sf = b || 0;
        this.gb = c || 0;
        this.Wa = d || 0;
        this.ha = f || 0;
        this.Aa = g || 0
    }
    wa.prototype.va = function () {
        return new wa(this.xb, this.Sf, this.gb, this.Wa, this.ha, this.Aa)
    };
    var xa = 0;

    function ya() {}
    t(ya);
    ya.prototype.Mf = 0;

    function za(a) {
        return ":" + (a.Mf++).toString(36)
    }
    ya.v();
    var Aa = {
            Rk: "Id",
            zl: "TitleText",
            uk: "AddFilesHyperlinkText",
            Zk: "OrText",
            cl: "ClearAllHyperlinkText",
            Ul: "Width",
            Qk: "Height",
            bl: "ProgressBytesMode",
            rl: "ShowViewComboBox",
            Sl: "ViewComboBox",
            Rl: "ViewComboBoxText",
            Tl: "ViewMode",
            tk: "AddFilesButtonText",
            Jk: "EnableDescriptionEditor",
            Lk: "EnableRotation",
            Hk: "EnableAddingFiles",
            vl: "StatusPaneFilesUploadedText",
            sl: "StatusPaneDataUploadedText",
            wl: "NoFilesToUploadText",
            ul: "FilesToUploadText",
            Dl: "UploadButtonText",
            wk: "CancelUploadButtonText",
            Tk: "ItemTooltip",
            Sk: "ImageTooltip",
            dl: "RemovalIconTooltip",
            ol: "RotationIconTooltip",
            Gk: "DescriptionEditorIconTooltip",
            $k: "PaneItemToolbarAlwaysVisible",
            sk: "ActionUrl",
            Dk: "DescriptionEditorSaveButtonText",
            Ck: "DescriptionEditorCancelButtonText",
            el: "FileMask",
            fl: "MaxFileCount",
            jl: "MaxTotalFileSize",
            gl: "MaxFileSize",
            ll: "MinFileSize",
            il: "MaxImageWidth",
            nl: "MinImageWidth",
            hl: "MaxImageHeight",
            ml: "MinImageHeight",
            kl: "MinFileCount",
            vk: "AddFilesProgressDialogText",
            Ak: "CommonDialogCancelButtonText",
            Nk: "FileNameNotAllowedMessage",
            Bl: "MaxFileCountExceeded",
            Wk: "MaxTotalFileSizeExceeded",
            Ok: "MaxFileSizeExceeded",
            Pk: "FileSizeTooSmall",
            Fk: "DimensionsTooSmall",
            Ek: "DimensionsTooLarge",
            Mk: "FilesNotAdded",
            Al: "TooFewFiles",
            Ll: "UploadErrorMessage",
            pl: "ServerNotFoundMessage",
            ql: "ServerSideErrorMessage",
            Fl: "UploadCancelledByUserMessage",
            El: "UploadCancelledByCancelMethodMessage",
            Gl: "UploadCancelledFromAfterPackageUploadEventMessage",
            zk: "ClosePreviewTooltip",
            Ml: "IconItemWidth",
            Nl: "IconSize",
            Ol: "ThumbnailPreviewSize",
            Pl: "TileItemWidth",
            Ql: "TilePreviewSize",
            Uk: "Locale",
            yk: "ChunkSize",
            Yk: "MinImageWidthHeightLogic",
            tl: "StatusPaneFilesPreparedText",
            xl: "StatusPanePreparingText",
            yl: "StatusPaneSendingText",
            xk: "CannotReadFile",
            Xk: "MemoryLimitReached",
            al: "PreviewNotAvailable",
            Cl: "TooManyFilesSelectedToOpen",
            Kk: "EnableDisproportionalExifThumbnails",
            Bk: "CommonDialogOkButtonText",
            Vk: "MaxFileToLoadSize",
            Hl: "UploadErrorDialogHideDetailsButtonText",
            Il: "UploadErrorDialogMessage",
            Jl: "UploadErrorDialogShowDetailsButtonText",
            Kl: "UploadErrorDialogTitle",
            Ik: "EnableAutoRotation"
        },
        x = {};
    x.Id = "upldr" + za(ya.v());
    x.TitleText = "";
    x.AddFilesHyperlinkText = "";
    x.OrText = "";
    x.ClearAllHyperlinkText = "";
    x.ShowViewComboBox = "";
    x.ViewComboBox = [""];
    x.ViewComboBoxText = "";
    x.ViewMode = "tiles";
    x.Width = "600px";
    x.Height = "400px";
    x.ProgressBytesMode = "ByPackageSize";
    x.AddFilesButtonText = "+Add more files";
    x.EnableDescriptionEditor = i;
    x.EnableRotation = i;
    x.EnableAddingFiles = i;
    x.StatusPaneFilesUploadedText = "Files completed: {0} / {1}";
    x.StatusPaneDataUploadedText = "Data uploaded: {0} / {1}";
    x.NoFilesToUploadText = "No files to upload";
    x.FilesToUploadText = "Total files: {0}";
    x.UploadButtonText = "Upload";
    x.CancelUploadButtonText = "Cancel";
    x.ItemTooltip = "{0}\n{1}";
    x.ImageTooltip = "{0}\n{1}, {2}";
    x.RemovalIconTooltip = "Remove";
    x.RotationIconTooltip = "Rotate";
    x.DescriptionEditorIconTooltip = "Edit description";
    x.PaneItemToolbarAlwaysVisible = m;
    x.ActionUrl = ".";
    x.DescriptionEditorSaveButtonText = "Save";
    x.DescriptionEditorCancelButtonText = "Cancel";
    x.FileMask = "";
    x.MaxFileCount = 1;
    x.MaxTotalFileSize = 0;
    x.MaxFileSize = 0;
    x.MinFileSize = 0;
    x.MaxImageWidth = 0;
    x.MinImageWidth = 0;
    x.MaxImageHeight = 0;
    x.MinImageHeight = 0;
    x.MinFileCount = 1;
    x.AddFilesProgressDialogText = "Adding files to upload list...";
    x.CommonDialogCancelButtonText = "Cancel";
    x.FileNameNotAllowedMessage = 'The file "{0}" cannot be added. The website doesn\'t accept files of this type.';
    x.MaxFileCountExceeded = "You are allowed to upload no more than 1 file.";
    x.MaxTotalFileSizeExceeded = "Not all files were added. Maximum total file size ({0}) was exceeded.";
    x.MaxFileSizeExceeded = 'Size of "{0}" is too large to be added. Maximum allowed size is {1}.';
    x.FileSizeTooSmall = 'Size of "{0}" is too small to be added. Minimum allowed size is {1}.';
    x.DimensionsTooLarge = 'Dimensions of "{0}" are too large, the file wasn\'t added. Maximum allowed image dimensions are {1}x{2} pixels.';
    x.DimensionsTooSmall = 'Dimensions of "{0}" are too small, the file wasn\'t added. Minimum allowed image dimensions are {1}x{2} pixels.';
    x.FilesNotAdded = "{0} files were not added due to restrictions of the site.";
    x.TooFewFiles = "At least {0} files should be selected to start upload.";
    x.UploadErrorMessage = "Uploader encountered some problem. If you see this message, contact web master.";
    x.ServerNotFoundMessage = "The server or proxy {0} cannot be found.";
    x.ServerSideErrorMessage = "Some server-side error occurred. If you see this message, contact your Web master.";
    x.UploadCancelledByUserMessage = "Uploading is cancelled by user.";
    x.UploadCancelledByCancelMethodMessage = 'Uploading is cancelled by "cancelUpload" method.';
    x.UploadCancelledFromAfterPackageUploadEventMessage = "Upload cancelled from AfterPackageUpload event handler.";
    x.ClosePreviewTooltip = "Click to close";
    x.IconItemWidth = 0;
    x.IconSize = 0;
    x.ThumbnailPreviewSize = 120;
    x.TileItemWidth = 0;
    x.TilePreviewSize = 100;
    var Ba = {
        UploaderState: 0
    };
    Ba.UploadProgress = new wa;

    function Ca(a) {
        this.stack = Error().stack || "";
        if (a) this.message = "" + a
    }
    w(Ca, Error);
    Ca.prototype.name = "CustomError";

    function Da(a, b) {
        for (var c = 1; c < arguments.length; c++) var d = ("" + arguments[c]).replace(/\$/g, "$$$$"),
            a = a.replace(/\%s/, d);
        return a
    }

    function Ea(a) {
        return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
    }

    function Fa(a) {
        return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
    }

    function Ga(a) {
        return a.replace(/(\r\n|\r|\n)/g, "<br />")
    }

    function Ha(a) {
        if (!Ia.test(a)) return a; - 1 != a.indexOf("&") && (a = a.replace(Ja, "&amp;")); - 1 != a.indexOf("<") && (a = a.replace(Ka, "&lt;")); - 1 != a.indexOf(">") && (a = a.replace(La, "&gt;")); - 1 != a.indexOf('"') && (a = a.replace(Ma, "&quot;"));
        return a
    }
    var Ja = /&/g,
        Ka = /</g,
        La = />/g,
        Ma = /\"/g,
        Ia = /[&<>\"]/,
        Na = {};

    function Oa(a) {
        return Na[a] || (Na[a] = ("" + a).replace(/\-([a-z])/g, function (a, c) {
            return c.toUpperCase()
        }))
    };

    function Pa(a, b) {
        b.unshift(a);
        Ca.call(this, Da.apply(k, b));
        b.shift();
        this.am = a
    }
    w(Pa, Ca);
    Pa.prototype.name = "AssertionError";

    function Qa(a, b) {
        e(new Pa("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
    };
    var Ra = Array.prototype,
        Sa = Ra.indexOf ? function (a, b, c) {
            return Ra.indexOf.call(a, b, c)
        } : function (a, b, c) {
            c = c == k ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (u(a)) return !u(b) || 1 != b.length ? -1 : a.indexOf(b, c);
            for (; c < a.length; c++)
                if (c in a && a[c] === b) return c;
            return -1
        },
        y = Ra.forEach ? function (a, b, c) {
            Ra.forEach.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, f = u(a) ? a.split("") : a, g = 0; g < d; g++) g in f && b.call(c, f[g], g, a)
        },
        Ta = Ra.map ? function (a, b, c) {
            return Ra.map.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, f = Array(d), g = u(a) ?
                a.split("") : a, j = 0; j < d; j++) j in g && (f[j] = b.call(c, g[j], j, a));
            return f
        },
        Ua = Ra.some ? function (a, b, c) {
            return Ra.some.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, f = u(a) ? a.split("") : a, g = 0; g < d; g++)
                if (g in f && b.call(c, f[g], g, a)) return i;
            return m
        },
        Va = Ra.every ? function (a, b, c) {
            return Ra.every.call(a, b, c)
        } : function (a, b, c) {
            for (var d = a.length, f = u(a) ? a.split("") : a, g = 0; g < d; g++)
                if (g in f && !b.call(c, f[g], g, a)) return m;
            return i
        };

    function Wa(a, b) {
        return 0 <= Sa(a, b)
    }

    function Xa(a, b) {
        var c = Sa(a, b),
            d;
        (d = 0 <= c) && Ra.splice.call(a, c, 1);
        return d
    }

    function Ya(a) {
        return Ra.concat.apply(Ra, arguments)
    }

    function $a(a) {
        if (ka(a)) return Ya(a);
        for (var b = [], c = 0, d = a.length; c < d; c++) b[c] = a[c];
        return b
    }

    function ab(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c],
                f;
            if (ka(d) || (f = la(d)) && d.hasOwnProperty("callee")) a.push.apply(a, d);
            else if (f)
                for (var g = a.length, j = d.length, l = 0; l < j; l++) a[g + l] = d[l];
            else a.push(d)
        }
    }

    function bb(a, b, c, d) {
        Ra.splice.apply(a, cb(arguments, 1))
    }

    function cb(a, b, c) {
        return 2 >= arguments.length ? Ra.slice.call(a, b) : Ra.slice.call(a, b, c)
    };
    var db;

    function eb(a) {
        return (a = a.className) && "function" == typeof a.split ? a.split(/\s+/) : []
    }

    function A(a, b) {
        var c = eb(a),
            d = cb(arguments, 1),
            d = fb(c, d);
        a.className = c.join(" ");
        return d
    }

    function gb(a, b) {
        var c = eb(a),
            d = cb(arguments, 1),
            d = ib(c, d);
        a.className = c.join(" ");
        return d
    }

    function fb(a, b) {
        for (var c = 0, d = 0; d < b.length; d++) Wa(a, b[d]) || (a.push(b[d]), c++);
        return c == b.length
    }

    function ib(a, b) {
        for (var c = 0, d = 0; d < a.length; d++) Wa(b, a[d]) && (bb(a, d--, 1), c++);
        return c == b.length
    }

    function jb(a, b, c) {
        var d = eb(a);
        u(b) ? Xa(d, b) : ka(b) && ib(d, b);
        u(c) && !Wa(d, c) ? d.push(c) : ka(c) && fb(d, c);
        a.className = d.join(" ")
    };

    function kb(a, b, c) {
        for (var d in a) b.call(c, a[d], d, a)
    }

    function lb(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = a[d];
        return b
    }

    function mb(a) {
        var b = [],
            c = 0,
            d;
        for (d in a) b[c++] = d;
        return b
    }

    function nb(a, b, c) {
        b in a && e(Error('The object already contains the key "' + b + '"'));
        a[b] = c
    }

    function ob() {
        var a = {},
            b;
        for (b in x) a[b] = x[b];
        return a
    }
    var pb = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");

    function qb(a, b) {
        for (var c, d, f = 1; f < arguments.length; f++) {
            d = arguments[f];
            for (c in d) a[c] = d[c];
            for (var g = 0; g < pb.length; g++) c = pb[g], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    var rb, sb, tb, ub, vb, wb;

    function xb() {
        return s.navigator ? s.navigator.userAgent : k
    }

    function yb() {
        return s.navigator
    }
    vb = ub = tb = sb = rb = m;
    var zb;
    if (zb = xb()) {
        var Ab = yb();
        rb = 0 == zb.indexOf("Opera");
        sb = !rb && -1 != zb.indexOf("MSIE");
        ub = (tb = !rb && -1 != zb.indexOf("WebKit")) && -1 != zb.indexOf("Mobile");
        vb = !rb && !tb && "Gecko" == Ab.product
    }
    var Bb = rb,
        C = sb,
        Cb = vb,
        D = tb,
        Db = ub,
        Eb = yb();
    wb = -1 != (Eb && Eb.platform || "").indexOf("Mac");
    var Fb = !!yb() && -1 != (yb().appVersion || "").indexOf("X11"),
        Gb;
    a: {
        var Hb = "",
            Ib;
        if (Bb && s.opera) var Jb = s.opera.version,
            Hb = "function" == typeof Jb ? Jb() : Jb;
        else if (Cb ? Ib = /rv\:([^\);]+)(\)|;)/ : C ? Ib = /MSIE\s+([^\);]+)(\)|;)/ : D && (Ib = /WebKit\/(\S+)/), Ib) var Kb = Ib.exec(xb()),
            Hb = Kb ? Kb[1] : "";
        if (C) {
            var Lb, Mb = s.document;
            Lb = Mb ? Mb.documentMode : h;
            if (Lb > parseFloat(Hb)) {
                Gb = "" + Lb;
                break a
            }
        }
        Gb = Hb
    }
    var Nb = {};

    function E(a) {
        var b;
        if (!(b = Nb[a])) {
            b = 0;
            for (var c = Fa("" + Gb).split("."), d = Fa("" + a).split("."), f = Math.max(c.length, d.length), g = 0; 0 == b && g < f; g++) {
                var j = c[g] || "",
                    l = d[g] || "",
                    o = RegExp("(\\d*)(\\D*)", "g"),
                    q = RegExp("(\\d*)(\\D*)", "g");
                do {
                    var z = o.exec(j) || ["", "", ""],
                        B = q.exec(l) || ["", "", ""];
                    if (0 == z[0].length && 0 == B[0].length) break;
                    b = ((0 == z[1].length ? 0 : parseInt(z[1], 10)) < (0 == B[1].length ? 0 : parseInt(B[1], 10)) ? -1 : (0 == z[1].length ? 0 : parseInt(z[1], 10)) > (0 == B[1].length ? 0 : parseInt(B[1], 10)) ? 1 : 0) || ((0 == z[2].length) < (0 ==
                        B[2].length) ? -1 : (0 == z[2].length) > (0 == B[2].length) ? 1 : 0) || (z[2] < B[2] ? -1 : z[2] > B[2] ? 1 : 0)
                } while (0 == b)
            }
            b = Nb[a] = 0 <= b
        }
        return b
    }
    var Ob = {};

    function Qb(a) {
        return Ob[a] || (Ob[a] = C && document.documentMode && document.documentMode >= a)
    };

    function Rb(a, b) {
        this.width = a;
        this.height = b
    }
    Rb.prototype.va = function () {
        return new Rb(this.width, this.height)
    };
    Rb.prototype.toString = function () {
        return "(" + this.width + " x " + this.height + ")"
    };
    Rb.prototype.floor = function () {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    };
    Rb.prototype.round = function () {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    };
    var Sb = !C || Qb(9);
    !Cb && !C || C && Qb(9) || Cb && E("1.9.1");
    var Tb = C && !E("9");

    function F(a, b) {
        this.x = ga(a) ? a : 0;
        this.y = ga(b) ? b : 0
    }
    F.prototype.va = function () {
        return new F(this.x, this.y)
    };
    F.prototype.toString = function () {
        return "(" + this.x + ", " + this.y + ")"
    };

    function Ub(a, b) {
        return new F(a.x - b.x, a.y - b.y)
    };

    function Vb(a) {
        return a ? new Wb(Xb(a)) : db || (db = new Wb)
    }

    function Yb(a) {
        return u(a) ? document.getElementById(a) : a
    }

    function Zb(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? b.toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (!D || $b(document) || E("528")) && (b || c)) return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                for (var d = {}, f = 0, g = 0, j; j = a[g]; g++) b == j.nodeName && (d[f++] = j);
                d.length = f;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (g = f = 0; j = a[g]; g++) b = j.className, "function" == typeof b.split && Wa(b.split(/\s+/), c) && (d[f++] = j);
            d.length = f;
            return d
        }
        return a
    }

    function ac(a, b) {
        kb(b, function (b, d) {
            "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in bc ? a.setAttribute(bc[d], b) : 0 == d.lastIndexOf("aria-", 0) ? a.setAttribute(d, b) : a[d] = b
        })
    }
    var bc = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        rowspan: "rowSpan",
        valign: "vAlign",
        height: "height",
        width: "width",
        usemap: "useMap",
        frameborder: "frameBorder",
        maxlength: "maxLength",
        type: "type"
    };

    function cc(a, b, c) {
        return dc(document, arguments)
    }

    function dc(a, b) {
        var c = b[0],
            d = b[1];
        if (!Sb && d && (d.name || d.type)) {
            c = ["<", c];
            d.name && c.push(' name="', Ha(d.name), '"');
            if (d.type) {
                c.push(' type="', Ha(d.type), '"');
                var f = {};
                qb(f, d);
                d = f;
                delete d.type
            }
            c.push(">");
            c = c.join("")
        }
        c = a.createElement(c);
        if (d) u(d) ? c.className = d : ka(d) ? A.apply(k, [c].concat(d)) : ac(c, d);
        2 < b.length && ec(a, c, b, 2);
        return c
    }

    function ec(a, b, c, d) {
        function f(c) {
            c && b.appendChild(u(c) ? a.createTextNode(c) : c)
        }
        for (; d < c.length; d++) {
            var g = c[d];
            la(g) && !(na(g) && 0 < g.nodeType) ? y(fc(g) ? $a(g) : g, f) : f(g)
        }
    }

    function $b(a) {
        return "CSS1Compat" == a.compatMode
    }

    function gc(a, b) {
        ec(Xb(a), a, arguments, 1)
    }

    function hc(a) {
        for (var b; b = a.firstChild;) a.removeChild(b)
    }

    function ic(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    }

    function jc(a) {
        if (a.firstElementChild != h) a = a.firstElementChild;
        else
            for (a = a.firstChild; a && 1 != a.nodeType;) a = a.nextSibling;
        return a
    }

    function kc(a, b) {
        if (a.contains && 1 == b.nodeType) return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition) return a == b || Boolean(a.compareDocumentPosition(b) & 16);
        for (; b && a != b;) b = b.parentNode;
        return b == a
    }

    function Xb(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }

    function lc(a, b) {
        if ("textContent" in a) a.textContent = b;
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild;) a.removeChild(a.lastChild);
            a.firstChild.data = b
        } else hc(a), a.appendChild(Xb(a).createTextNode(b))
    }
    var mc = {
            SCRIPT: 1,
            STYLE: 1,
            HEAD: 1,
            IFRAME: 1,
            OBJECT: 1
        },
        nc = {
            IMG: " ",
            BR: "\n"
        };

    function oc(a) {
        var b = a.getAttributeNode("tabindex");
        return b && b.specified ? (a = a.tabIndex, "number" == typeof a && 0 <= a && 32768 > a) : m
    }

    function pc(a) {
        var b = [];
        qc(a, b, m);
        return b.join("")
    }

    function qc(a, b, c) {
        if (!(a.nodeName in mc))
            if (3 == a.nodeType) c ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in nc) b.push(nc[a.nodeName]);
        else
            for (a = a.firstChild; a;) qc(a, b, c), a = a.nextSibling
    }

    function fc(a) {
        if (a && "number" == typeof a.length) {
            if (na(a)) return "function" == typeof a.item || "string" == typeof a.item;
            if (ma(a)) return "function" == typeof a.item
        }
        return m
    }

    function Wb(a) {
        this.Q = a || s.document || document
    }
    r = Wb.prototype;
    r.q = Vb;

    function sc(a) {
        return a.Q
    }
    r.a = function (a) {
        return u(a) ? this.Q.getElementById(a) : a
    };
    r.d = function (a, b, c) {
        return dc(this.Q, arguments)
    };
    r.createElement = function (a) {
        return this.Q.createElement(a)
    };
    r.createTextNode = function (a) {
        return this.Q.createTextNode(a)
    };

    function tc(a) {
        return $b(a.Q)
    }

    function uc(a) {
        var b = a.Q,
            a = !D && $b(b) ? b.documentElement : b.body,
            b = b.parentWindow || b.defaultView;
        return new F(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
    }
    r.appendChild = function (a, b) {
        a.appendChild(b)
    };
    r.append = gc;
    r.Ng = jc;
    r.contains = kc;
    r.Vj = lc;

    function vc() {
        if (!wc()) return m;
        var a = m;
        (a = document.createElement("canvas").mozGetAsFile) || (a = window.atob && (window.Blob || window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder));
        return !!a
    }

    function wc() {
        var a = s.URL || s.webkitURL,
            a = a && a.createObjectURL;
        return !!a
    }

    function xc() {
        return "FormData" in s && "File" in s && "files" in document.createElement("input")
    }
    fa("Aurigma.ImageUploaderFlash.Control.isHtmlUploaderSupported", xc);
    fa("Aurigma.ImageUploaderFlash.Control.isThumbnailCreationSupported", vc);
    fa("Aurigma.ImageUploaderFlash.Control.isImageRestrictionsSupported", function () {
        return wc()
    });

    function yc() {}
    var zc = 0;
    r = yc.prototype;
    r.key = 0;
    r.ic = m;
    r.Se = m;
    r.md = function (a, b, c, d, f, g) {
        ma(a) ? this.Yg = i : a && a.handleEvent && ma(a.handleEvent) ? this.Yg = m : e(Error("Invalid listener argument"));
        this.Hc = a;
        this.th = b;
        this.src = c;
        this.type = d;
        this.capture = !!f;
        this.Zd = g;
        this.Se = m;
        this.key = ++zc;
        this.ic = m
    };
    r.handleEvent = function (a) {
        return this.Yg ? this.Hc.call(this.Zd || this.src, a) : this.Hc.handleEvent.call(this.Hc, a)
    };
    var Ac = !C || Qb(9),
        Bc = !C || Qb(9),
        Cc = C && !E("8");
    !D || E("528");
    Cb && E("1.9b") || C && E("8") || Bb && E("9.5") || D && E("528");
    !Cb || E("8");

    function Dc() {}
    Dc.prototype.Rd = m;
    Dc.prototype.j = function () {
        if (!this.Rd) this.Rd = i, this.h()
    };
    Dc.prototype.h = function () {
        this.li && Ec.apply(k, this.li)
    };

    function Fc(a) {
        a && "function" == typeof a.j && a.j()
    }

    function Ec(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            la(d) ? Ec.apply(k, d) : Fc(d)
        }
    };

    function G(a, b) {
        this.type = a;
        this.currentTarget = this.target = b
    }
    w(G, Dc);
    r = G.prototype;
    r.h = function () {
        delete this.type;
        delete this.target;
        delete this.currentTarget
    };
    r.hc = m;
    r.wd = i;
    r.stopPropagation = function () {
        this.hc = i
    };
    r.preventDefault = function () {
        this.wd = m
    };

    function Gc(a) {
        Gc[" "](a);
        return a
    }
    Gc[" "] = ia;

    function Hc(a, b) {
        a && this.md(a, b)
    }
    w(Hc, G);
    var Ic = [1, 4, 2];
    r = Hc.prototype;
    r.target = k;
    r.relatedTarget = k;
    r.offsetX = 0;
    r.offsetY = 0;
    r.clientX = 0;
    r.clientY = 0;
    r.screenX = 0;
    r.screenY = 0;
    r.button = 0;
    r.keyCode = 0;
    r.charCode = 0;
    r.ctrlKey = m;
    r.altKey = m;
    r.shiftKey = m;
    r.metaKey = m;
    r.Tf = m;
    r.fa = k;
    r.md = function (a, b) {
        var c = this.type = a.type;
        G.call(this, c);
        this.target = a.target || a.srcElement;
        this.currentTarget = b;
        var d = a.relatedTarget;
        if (d) {
            if (Cb) {
                var f;
                a: {
                    try {
                        Gc(d.nodeName);
                        f = i;
                        break a
                    } catch (g) {}
                    f = m
                }
                f || (d = k)
            }
        } else if ("mouseover" == c) d = a.fromElement;
        else if ("mouseout" == c) d = a.toElement;
        this.relatedTarget = d;
        this.offsetX = D || a.offsetX !== h ? a.offsetX : a.layerX;
        this.offsetY = D || a.offsetY !== h ? a.offsetY : a.layerY;
        this.clientX = a.clientX !== h ? a.clientX : a.pageX;
        this.clientY = a.clientY !== h ? a.clientY : a.pageY;
        this.screenX =
            a.screenX || 0;
        this.screenY = a.screenY || 0;
        this.button = a.button;
        this.keyCode = a.keyCode || 0;
        this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
        this.ctrlKey = a.ctrlKey;
        this.altKey = a.altKey;
        this.shiftKey = a.shiftKey;
        this.metaKey = a.metaKey;
        this.Tf = wb ? a.metaKey : a.ctrlKey;
        this.state = a.state;
        this.fa = a;
        delete this.wd;
        delete this.hc
    };

    function Jc(a) {
        return (Ac ? 0 == a.fa.button : "click" == a.type ? i : !!(a.fa.button & Ic[0])) && !(D && wb && a.ctrlKey)
    }
    r.stopPropagation = function () {
        Hc.b.stopPropagation.call(this);
        this.fa.stopPropagation ? this.fa.stopPropagation() : this.fa.cancelBubble = i
    };
    r.preventDefault = function () {
        Hc.b.preventDefault.call(this);
        var a = this.fa;
        if (a.preventDefault) a.preventDefault();
        else if (a.returnValue = m, Cc) try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) a.keyCode = -1
        } catch (b) {}
    };
    r.si = n("fa");
    r.h = function () {
        Hc.b.h.call(this);
        this.relatedTarget = this.currentTarget = this.target = this.fa = k
    };
    var Kc = {},
        Lc = {},
        Mc = {},
        Nc = {};

    function H(a, b, c, d, f) {
        if (b) {
            if (ka(b)) {
                for (var g = 0; g < b.length; g++) H(a, b[g], c, d, f);
                return k
            }
            var d = !!d,
                j = Lc;
            b in j || (j[b] = {
                ea: 0,
                Va: 0
            });
            j = j[b];
            d in j || (j[d] = {
                ea: 0,
                Va: 0
            }, j.ea++);
            var j = j[d],
                l = oa(a),
                o;
            j.Va++;
            if (j[l]) {
                o = j[l];
                for (g = 0; g < o.length; g++)
                    if (j = o[g], j.Hc == c && j.Zd == f) {
                        if (j.ic) break;
                        return o[g].key
                    }
            } else o = j[l] = [], j.ea++;
            g = Oc();
            g.src = a;
            j = new yc;
            j.md(c, g, a, b, d, f);
            c = j.key;
            g.key = c;
            o.push(j);
            Kc[c] = j;
            Mc[l] || (Mc[l] = []);
            Mc[l].push(j);
            a.addEventListener ? (a == s || !a.Dg) && a.addEventListener(b, g, d) : a.attachEvent(b in
                Nc ? Nc[b] : Nc[b] = "on" + b, g);
            return c
        }
        e(Error("Invalid event type"))
    }

    function Oc() {
        var a = Pc,
            b = Bc ? function (c) {
                return a.call(b.src, b.key, c)
            } : function (c) {
                c = a.call(b.src, b.key, c);
                if (!c) return c
            };
        return b
    }

    function Qc(a, b, c, d, f) {
        if (ka(b)) {
            for (var g = 0; g < b.length; g++) Qc(a, b[g], c, d, f);
            return k
        }
        a = H(a, b, c, d, f);
        Kc[a].Se = i;
        return a
    }

    function Rc(a, b, c, d, f) {
        if (ka(b))
            for (var g = 0; g < b.length; g++) Rc(a, b[g], c, d, f);
        else if (d = !!d, a = Sc(a, b, d))
            for (g = 0; g < a.length; g++)
                if (a[g].Hc == c && a[g].capture == d && a[g].Zd == f) {
                    Tc(a[g].key);
                    break
                }
    }

    function Tc(a) {
        if (!Kc[a]) return m;
        var b = Kc[a];
        if (b.ic) return m;
        var c = b.src,
            d = b.type,
            f = b.th,
            g = b.capture;
        c.removeEventListener ? (c == s || !c.Dg) && c.removeEventListener(d, f, g) : c.detachEvent && c.detachEvent(d in Nc ? Nc[d] : Nc[d] = "on" + d, f);
        c = oa(c);
        f = Lc[d][g][c];
        if (Mc[c]) {
            var j = Mc[c];
            Xa(j, b);
            0 == j.length && delete Mc[c]
        }
        b.ic = i;
        f.lh = i;
        Uc(d, g, c, f);
        delete Kc[a];
        return i
    }

    function Uc(a, b, c, d) {
        if (!d.ie && d.lh) {
            for (var f = 0, g = 0; f < d.length; f++) d[f].ic ? d[f].th.src = k : (f != g && (d[g] = d[f]), g++);
            d.length = g;
            d.lh = m;
            0 == g && (delete Lc[a][b][c], Lc[a][b].ea--, 0 == Lc[a][b].ea && (delete Lc[a][b], Lc[a].ea--), 0 == Lc[a].ea && delete Lc[a])
        }
    }

    function Vc(a) {
        var b, c = 0,
            d = b == k;
        b = !!b;
        if (a == k) kb(Mc, function (a) {
            for (var f = a.length - 1; 0 <= f; f--) {
                var g = a[f];
                if (d || b == g.capture) Tc(g.key), c++
            }
        });
        else if (a = oa(a), Mc[a])
            for (var a = Mc[a], f = a.length - 1; 0 <= f; f--) {
                var g = a[f];
                if (d || b == g.capture) Tc(g.key), c++
            }
    }

    function Sc(a, b, c) {
        var d = Lc;
        return b in d && (d = d[b], c in d && (d = d[c], a = oa(a), d[a])) ? d[a] : k
    }

    function Wc(a) {
        var a = oa(a),
            b = Mc[a];
        if (b) {
            var c = ga("progress"),
                d = ga(h);
            return c && d ? (b = Lc.progress, !!b && !!b[h] && a in b[h]) : !c && !d ? i : Ua(b, function (a) {
                return c && "progress" == a.type || d && a.capture == h
            })
        }
        return m
    }

    function Xc(a, b, c, d, f) {
        var g = 1,
            b = oa(b);
        if (a[b]) {
            a.Va--;
            a = a[b];
            a.ie ? a.ie++ : a.ie = 1;
            try {
                for (var j = a.length, l = 0; l < j; l++) {
                    var o = a[l];
                    o && !o.ic && (g &= Yc(o, f) !== m)
                }
            } finally {
                a.ie--, Uc(c, d, b, a)
            }
        }
        return Boolean(g)
    }

    function Yc(a, b) {
        var c = a.handleEvent(b);
        a.Se && Tc(a.key);
        return c
    }

    function Pc(a, b) {
        if (!Kc[a]) return i;
        var c = Kc[a],
            d = c.type,
            f = Lc;
        if (!(d in f)) return i;
        var f = f[d],
            g, j;
        if (!Bc) {
            g = b || ha("window.event");
            var l = i in f,
                o = m in f;
            if (l) {
                if (0 > g.keyCode || g.returnValue != h) return i;
                a: {
                    var q = m;
                    if (0 == g.keyCode) try {
                        g.keyCode = -1;
                        break a
                    } catch (z) {
                        q = i
                    }
                    if (q || g.returnValue == h) g.returnValue = i
                }
            }
            q = new Hc;
            q.md(g, this);
            g = i;
            try {
                if (l) {
                    for (var B = [], ba = q.currentTarget; ba; ba = ba.parentNode) B.push(ba);
                    j = f[i];
                    j.Va = j.ea;
                    for (var O = B.length - 1; !q.hc && 0 <= O && j.Va; O--) q.currentTarget = B[O], g &= Xc(j, B[O], d,
                        i, q);
                    if (o) {
                        j = f[m];
                        j.Va = j.ea;
                        for (O = 0; !q.hc && O < B.length && j.Va; O++) q.currentTarget = B[O], g &= Xc(j, B[O], d, m, q)
                    }
                } else g = Yc(c, q)
            } finally {
                if (B) B.length = 0;
                q.j()
            }
            return g
        }
        d = new Hc(b, this);
        try {
            g = Yc(c, d)
        } finally {
            d.j()
        }
        return g
    }
    var Zc = 0;

    function I() {}
    w(I, Dc);
    r = I.prototype;
    r.Dg = i;
    r.ne = k;
    r.bg = da("ne");
    r.addEventListener = function (a, b, c, d) {
        H(this, a, b, c, d)
    };
    r.removeEventListener = function (a, b, c, d) {
        Rc(this, a, b, c, d)
    };
    r.dispatchEvent = function (a) {
        var b = a.type || a,
            c = Lc;
        if (b in c) {
            if (u(a)) a = new G(a, this);
            else if (a instanceof G) a.target = a.target || this;
            else {
                var d = a,
                    a = new G(b, this);
                qb(a, d)
            }
            var d = 1,
                f, c = c[b],
                b = i in c,
                g;
            if (b) {
                f = [];
                for (g = this; g; g = g.ne) f.push(g);
                g = c[i];
                g.Va = g.ea;
                for (var j = f.length - 1; !a.hc && 0 <= j && g.Va; j--) a.currentTarget = f[j], d &= Xc(g, f[j], a.type, i, a) && a.wd != m
            }
            if (m in c)
                if (g = c[m], g.Va = g.ea, b)
                    for (j = 0; !a.hc && j < f.length && g.Va; j++) a.currentTarget = f[j], d &= Xc(g, f[j], a.type, m, a) && a.wd != m;
                else
                    for (f = this; !a.hc && f &&
                        g.Va; f = f.ne) a.currentTarget = f, d &= Xc(g, f, a.type, m, a) && a.wd != m;
            a = Boolean(d)
        } else a = i;
        return a
    };
    r.h = function () {
        I.b.h.call(this);
        Vc(this);
        this.ne = k
    };

    function $c(a, b, c) {
        G.call(this, a);
        this.Df = b;
        this.l = c
    }
    w($c, G);
    var ad = "collection_changed_" + Zc++;
    $c.prototype.la = n("l");
    $c.prototype.h = function () {
        $c.b.h.call(this);
        delete this.Df;
        delete this.l
    };

    function bd() {
        this.S = []
    }
    w(bd, I);
    r = bd.prototype;
    r.add = function (a) {
        this.S.push(a);
        a = new $c(ad, "add", [a]);
        try {
            this.dispatchEvent(a)
        } finally {
            a.j()
        }
    };
    r.remove = function (a) {
        return this.Kb(Sa(this.S, a))
    };
    r.Kb = function (a) {
        if (this.S.length > a) {
            var b = this.S[a];
            if (a = 1 == Ra.splice.call(this.S, a, 1).length) {
                b = new $c(ad, "remove", [b]);
                try {
                    this.dispatchEvent(b)
                } finally {
                    b.j()
                }
            }
            return a
        }
        return m
    };
    r.getItem = function (a) {
        return this.S[a]
    };
    r.clear = function () {
        if (0 < this.S.length) {
            this.S = [];
            var a = new $c(ad, "reset", []);
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
        }
    };
    r.contains = function (a) {
        return Wa(this.S, a)
    };
    r.Z = function () {
        return this.S.length
    };
    r.Ee = function () {
        return this.S.slice()
    };

    function cd(a, b) {
        switch (a) {
        case 11:
            return J(b, "UploadErrorMessage");
        case 2:
            return K(J(b, "ServerNotFoundMessage"), J(b, "ActionUrl"));
        case 4:
            return J(b, "ServerSideErrorMessage");
        case 0:
            return J(b, "UploadErrorMessage");
        default:
            return ""
        }
    };

    function dd(a) {
        this.r = a;
        this.W = []
    }
    w(dd, Dc);
    var ed = [];
    r = dd.prototype;
    r.c = function (a, b, c, d, f) {
        ka(b) || (ed[0] = b, b = ed);
        for (var g = 0; g < b.length; g++) this.W.push(H(a, b[g], c || this, d || m, f || this.r || this));
        return this
    };

    function fd(a, b, c, d, f, g) {
        if (ka(c))
            for (var j = 0; j < c.length; j++) fd(a, b, c[j], d, f, g);
        else a.W.push(Qc(b, c, d || a, f, g || a.r || a))
    }
    r.ja = function (a, b, c, d, f) {
        if (ka(b))
            for (var g = 0; g < b.length; g++) this.ja(a, b[g], c, d, f);
        else {
            a: {
                c = c || this;
                f = f || this.r || this;
                d = !!d;
                if (a = Sc(a, b, d))
                    for (b = 0; b < a.length; b++)
                        if (!a[b].ic && a[b].Hc == c && a[b].capture == d && a[b].Zd == f) {
                            a = a[b];
                            break a
                        }
                a = k
            }
            if (a) a = a.key,
            Tc(a),
            Xa(this.W, a)
        }
        return this
    };
    r.ub = function () {
        y(this.W, Tc);
        this.W.length = 0
    };
    r.h = function () {
        dd.b.h.call(this);
        this.ub()
    };
    r.handleEvent = function () {
        e(Error("EventHandler.handleEvent not implemented"))
    };

    function gd() {
        return m
    };
    /*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
    function hd() {
        if (ga(s.URL) && ga(s.URL.createObjectURL)) return s.URL;
        if (ga(s.webkitURL) && ga(s.webkitURL.createObjectURL)) return s.webkitURL;
        if (ga(s.createObjectURL)) return s;
        e(Error("This browser doesn't seem to support blob URLs"))
    };

    function id() {
        this.r = new dd(this);
        this.Ka = []
    }
    w(id, I);
    id.prototype.load = function (a, b) {
        this.U ? this.Ka.push({
            file: a,
            Zi: b
        }) : (this.U = i, this.xf = m, this.pa = b = b || new Image, wc() ? (this.r.c(b, ["load", "error"], this.$d), b.src = hd().createObjectURL(a)) : setTimeout(v(this.ei, this), 0))
    };
    id.prototype.ei = function () {
        this.$d(new G("error"))
    };
    id.prototype.$d = function (a) {
        if (this.pa && this.pa.src) {
            var b = this.pa.src;
            hd().revokeObjectURL(b)
        }
        this.r.ub();
        if ("load" == a.type) this.xf = i;
        try {
            this.dispatchEvent(jd)
        } finally {
            this.pa = k, this.U = this.xf = m, 0 < this.Ka.length && (a = this.Ka.shift(), this.load(a.file, a.Zi))
        }
    };
    id.prototype.Ec = n("xf");
    var jd = "load";

    function kd(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }

    function md(a) {
        a %= 360;
        return 0 > 360 * a ? a + 360 : a
    };

    function K(a, b) {
        var c = cb(arguments, 1);
        return a.replace(nd, function (a, b) {
            return c[parseInt(b, 10)]
        })
    }

    function od() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
            var b = 16 * Math.random() | 0;
            return ("x" == a ? b : b & 3 | 8).toString(16)
        })
    }

    function pd(a, b, c) {
        return setTimeout(c ? v(a, c) : a, b)
    }
    var nd = /{(\d+)}/g;

    function qd(a) {
        for (var a = a.split("."), b = 0, c = a.length - 1; b < c && !a[b]; ++b);
        return b < c ? a.pop() : ""
    }

    function rd(a) {
        e(Error(a))
    }

    function sd(a) {
        a = a.toString(16);
        a = "000000".slice(a.length) + a;
        return "#" + a
    };

    function td(a) {
        switch (qd(a).toLowerCase()) {
        case "jpg":
        case "jpeg":
        case "bmp":
        case "png":
        case "gif":
            return i
        }
        return m
    }

    function ud(a, b, c, d, f, g) {
        g != k || (g = "fit");
        f != k || (f = 0);
        var j, f = md(f);
        if (90 == f || 270 == f) f = a, a = b, b = f;
        switch (g) {
        case "actualsize":
            return {
                width: a,
                height: b
            };
        case "height":
            j = d / b;
            break;
        case "width":
            j = c / a;
            break;
        case "fit":
            j = d / b;
            c / a < j && (j = c / a);
            break;
        default:
            rd('Incorrect "fitMode" value.')
        }
        1 < j && (j = 1);
        return {
            width: Math.floor(a * j) || 1,
            height: Math.floor(b * j) || 1
        }
    }

    function vd(a, b) {
        var c = oa(a),
            d = wd[c];
        if (d) b({
            width: d.width,
            height: d.height
        });
        else {
            var f = new id;
            H(f, jd, function j() {
                Rc(f, jd, j);
                var a;
                if (f.Ec()) {
                    a = f.pa;
                    if (!("naturalWidth" in a)) a.naturalWidth = a.width, a.naturalHeight = a.height;
                    wd[c] = {
                        width: a.naturalWidth,
                        height: a.naturalHeight
                    };
                    a = {
                        width: a.naturalWidth,
                        height: a.naturalHeight
                    }
                } else wd[c] = {
                    width: 0,
                    height: 0
                }, a = {
                    width: 0,
                    height: 0
                };
                b(a)
            });
            f.load(a)
        }
    }
    var wd = {};
    var xd = "add_file_" + Zc++,
        yd = "property_change_" + Zc++,
        zd = "complete_" + Zc++;

    function Ad(a, b, c) {
        G.call(this, yd);
        this.sh = a;
        this.bm = b;
        this.ij = c
    }
    w(Ad, G);

    function Bd() {
        this.r = new dd(this);
        this.Ke = {}
    }
    w(Bd, I);
    Bd.prototype.H = function (a, b) {
        return a in this.Ke ? this.Ke[a] : b
    };
    Bd.prototype.ra = function (a, b, c) {
        var d = this.Ke,
            f = !c && d[a];
        d[a] = b;
        if (!c && f != b) {
            a = new Ad(a, f, b);
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
        }
    };
    Bd.prototype.h = function () {
        Bd.b.h.call(this);
        delete this.Ke;
        this.r.j();
        delete this.r
    };

    function Cd(a, b) {
        var c = "";
        ga(h) || (c = "B");
        var d = a,
            f = Dd,
            g = d,
            j, l = 1;
        0 > d && (d = -d);
        for (var o = 0; o < Ed.length; o++) {
            var q = Ed[o],
                l = f[q];
            if (d >= l || 1 >= l && d > 0.1 * l) {
                j = q;
                break
            }
        }
        ga(j) ? c && (j += c) : (j = "", l = 1);
        c = Math.pow(10, ga(b) ? b : 2);
        return Math.round(g / l * c) / c + j
    }
    var Ed = "P,T,G,M,K,,m,u,n".split(","),
        Dd = {
            "": 1,
            n: Math.pow(1024, -3),
            u: Math.pow(1024, -2),
            m: 1 / 1024,
            k: 1024,
            K: 1024,
            M: Math.pow(1024, 2),
            G: Math.pow(1024, 3),
            T: Math.pow(1024, 4),
            P: Math.pow(1024, 5)
        };
    C && E(8);

    function Fd(a) {
        Bd.call(this);
        this.Yb = a;
        this.Ae = this.Ce = k;
        Gd(this) ? (this.ra(Hd, Id, i), this.Ce = document.createElement("canvas"), this.Ae = document.createElement("canvas")) : this.ra(Hd, Jd, i);
        this.ra(Kd, 0, i);
        this.ra(Ld, 0, i);
        this.ra(Md, 0, i);
        this.ra(Nd, "", i)
    }
    w(Fd, Bd);
    var Kd = "imageWidth",
        Ld = "imageHeight",
        Md = "angle",
        Nd = "description",
        Hd = "state",
        Id = 0,
        Jd = 1;
    r = Fd.prototype;
    r.getFile = n("Yb");
    r.getName = function () {
        return this.Yb.name
    };
    r.yc = function () {
        return this.Yb.size
    };
    r.mf = function () {
        return this.Yb.type
    };

    function Od(a, b) {
        Gd(a) && (b = md(b), isNaN(b) || a.ra(Md, b))
    }
    r.Ia = function () {
        return this.H(Hd)
    };
    r.N = function (a) {
        a != k && this.ra(Hd, a)
    };

    function Gd(a) {
        return /^image\/(jpeg|bmp|png|gif)$/.test(a.mf()) || td(a.getName())
    }
    r.h = function () {
        Fd.b.h.call(this);
        delete this.Yb;
        delete this.Ae;
        delete this.Ce
    };

    function Pd(a, b, c, d, f, g, j, l, o) {
        this.Kg = Qd(a);
        this.dh = b || 0;
        this.fh = c || 0;
        this.eh = d || 0;
        this.hh = f || 0;
        this.If = g || 0;
        this.Kf = j || 0;
        this.Hf = l || 0;
        this.Jf = o || 0
    }

    function Rd(a, b, c, d) {
        var f;
        if (f = a.Kg) {
            var g = a.Kg;
            f = b.name;
            if (!g || !g.length) f = i;
            else {
                for (var g = g.replace(/([-()\[\]{}+.$\^|,:#<!\\])/g, "\\$1").replace(/\?/g, ".").replace(/\*/g, ".*"), j = "", g = g.split(";"), l = 0, o = g.length; l < o; ++l) g[l] && (j && (j += "|"), j += g[l]);
                f = RegExp("^(" + j + ")$", "gi").test(f)
            }
            f = !f
        }
        if (f) return Sd;
        if (0 != a.eh && b.size > a.eh) return Td;
        if (0 != a.hh && b.size < a.hh) return Ud;
        if (0 != a.dh && c + 1 > a.dh) return Vd;
        if (0 != a.fh && d + b.size > a.fh) return Wd;
        c = 0 < a.If || 0 < a.Kf;
        c |= 0 < a.Hf || 0 < a.Jf;
        return (c &= /^image\/(jpeg|bmp|png|gif)$/.test(b.type) ||
            td(b.name)) ? Xd : Yd
    }

    function Zd(a, b, c, d, f) {
        c = Rd(a, b, c, d);
        c == Xd ? vd(b, v(function (a) {
            f(0 != this.Hf && a.height > this.Hf ? $d : 0 != this.If && a.width > this.If ? ae : 0 != this.Jf && a.height < this.Jf ? be : 0 != this.Kf && a.width < this.Kf ? ce : Yd)
        }, a)) : pd(ta(f, c), 0)
    }

    function Qd(a) {
        if (!a || 0 == a.length) return "";
        var b = [];
        if (a instanceof Array) b = a;
        else if (-1 != a.indexOf(","))
            for (var a = a.replace(" ", "").split(","), c = 0 == a.length % 2 ? a.length : a.length - 1, d = 0; d < c; d += 2) b.push([a[d], a[d + 1]]);
        var f = [];
        y(b, function (a) {
            a && a[1] && "*.*" != a[1] && f.push(a[1])
        });
        return f.join(";").toLowerCase()
    }
    var Xd = -1,
        Yd = 0,
        Vd = 2,
        Td = 3,
        Ud = 4,
        Wd = 5,
        $d = 6,
        ae = 7,
        be = 8,
        ce = 9,
        Sd = 10;

    function de() {}
    w(de, I);

    function ee(a) {
        if (!a.ua) {
            var b = a.bd;
            if (!b || !(0 < b.length)) a.eb();
            else {
                for (var c = a.mg, d = a.Af, f = a.ce, g = [], j, l;
                    (j = b.shift()) && (l = Rd(c, j, d, f)) !== Xd;) {
                    var o = new Fd(j);
                    if (l === Yd)++d, f += j.size, g.push(o);
                    else switch (0 < g.length && (fe(a, g), g = []), l) {
                    case Sd:
                    case Td:
                    case Ud:
                        ge(a, o, l);
                        break;
                    case Vd:
                    case Wd:
                        ge(a, o, l);
                        a.eb();
                        return;
                    default:
                        rd('Unexpected "verifyCode" value.')
                    }
                }
                0 < g.length && fe(a, g);
                a.Af = d;
                a.ce = f;
                j && l === Xd ? Zd(c, j, d, f, v(a.mk, a, j)) : a.eb()
            }
        }
    }
    de.prototype.mk = function (a, b) {
        if (!this.ua) {
            var c = new Fd(a);
            if (b) switch (b) {
            case Sd:
            case Td:
            case Ud:
            case $d:
            case ae:
            case be:
            case ce:
                ge(this, c, b);
                ee(this);
                break;
            case Vd:
            case Wd:
                ge(this, c, b);
                this.eb();
                break;
            default:
                rd('Unexpected "verifyCode" value.')
            } else ++this.Af, this.ce += a.size, fe(this, [c]), ee(this)
        }
    };
    de.prototype.eb = function () {
        if (!this.ua) try {
            this.dispatchEvent(he)
        } finally {
            this.mg = this.bd = k
        }
    };

    function fe(a, b) {
        if (!a.ua) {
            var c = new G(ie);
            c.items = b;
            try {
                a.dispatchEvent(c)
            } finally {
                c.j()
            }
        }
    }

    function ge(a, b, c) {
        if (!a.ua) {
            var d = new G(je);
            d.item = b;
            d.code = c;
            try {
                a.dispatchEvent(d)
            } finally {
                d.j()
            }
        }
    }
    de.prototype.reset = function () {
        this.ua = i;
        this.mg = this.bd = k
    };
    var ie = "progress",
        he = zd,
        je = "fileSkipped_" + Zc++;

    function ke(a, b, c, d) {
        G.call(this, a);
        this.Ea = b || 0;
        this.response = c || "";
        this.Xc = d || ""
    }
    w(ke, G);
    ke.prototype.h = function () {
        ke.b.h.call(this)
    };

    function le(a, b, c, d, f, g) {
        this.xb = a;
        this.qa = b;
        this.gb = c;
        this.Wa = d;
        this.ha = f;
        this.Aa = g
    }
    le.prototype.va = function () {
        return new le(this.xb, this.qa, this.gb, this.Wa, this.ha, this.Aa)
    };

    function me(a, b, c, d, f) {
        G.call(this, a);
        this.le = b;
        this.Ea = c || 0;
        this.response = d || "";
        this.Xc = f || ""
    }
    w(me, G);

    function ne() {
        this.gf = new FormData
    };

    function oe(a) {
        G.call(this, zd);
        this.Fj = a
    }
    w(oe, G);

    function pe(a, b, c, d) {
        G.call(this, a || "progress");
        this.lengthComputable = !!b;
        this.loaded = c || 0;
        this.total = d || 0
    }
    w(pe, G);

    function qe(a) {
        if ("function" == typeof a.Zb) return a.Zb();
        if (u(a)) return a.split("");
        if (la(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++) b.push(a[d]);
            return b
        }
        return lb(a)
    }

    function re(a, b, c) {
        if ("function" == typeof a.forEach) a.forEach(b, c);
        else if (la(a) || u(a)) y(a, b, c);
        else {
            var d;
            if ("function" == typeof a.fd) d = a.fd();
            else if ("function" != typeof a.Zb)
                if (la(a) || u(a)) {
                    d = [];
                    for (var f = a.length, g = 0; g < f; g++) d.push(g)
                } else d = mb(a);
            else d = h;
            for (var f = qe(a), g = f.length, j = 0; j < g; j++) b.call(c, f[j], d && d[j], a)
        }
    };
    var se = "StopIteration" in s ? s.StopIteration : Error("StopIteration");

    function te() {}
    te.prototype.next = function () {
        e(se)
    };
    te.prototype.Oc = function () {
        return this
    };

    function ue(a) {
        if (a instanceof te) return a;
        if ("function" == typeof a.Oc) return a.Oc(m);
        if (la(a)) {
            var b = 0,
                c = new te;
            c.next = function () {
                for (;;) {
                    b >= a.length && e(se);
                    if (b in a) return a[b++];
                    b++
                }
            };
            return c
        }
        e(Error("Not implemented"))
    }

    function ve(a, b) {
        if (la(a)) try {
            y(a, b, h)
        } catch (c) {
            c !== se && e(c)
        } else {
            a = ue(a);
            try {
                for (;;) b.call(h, a.next(), h, a)
            } catch (d) {
                d !== se && e(d)
            }
        }
    };

    function we(a, b) {
        this.aa = {};
        this.W = [];
        var c = arguments.length;
        if (1 < c) {
            c % 2 && e(Error("Uneven number of arguments"));
            for (var d = 0; d < c; d += 2) this.set(arguments[d], arguments[d + 1])
        } else a && this.Me(a)
    }
    r = we.prototype;
    r.ea = 0;
    r.Fd = 0;
    r.Z = n("ea");
    r.Zb = function () {
        xe(this);
        for (var a = [], b = 0; b < this.W.length; b++) a.push(this.aa[this.W[b]]);
        return a
    };
    r.fd = function () {
        xe(this);
        return this.W.concat()
    };
    r.clear = function () {
        this.aa = {};
        this.Fd = this.ea = this.W.length = 0
    };
    r.remove = function (a) {
        return ye(this.aa, a) ? (delete this.aa[a], this.ea--, this.Fd++, this.W.length > 2 * this.ea && xe(this), i) : m
    };

    function xe(a) {
        if (a.ea != a.W.length) {
            for (var b = 0, c = 0; b < a.W.length;) {
                var d = a.W[b];
                ye(a.aa, d) && (a.W[c++] = d);
                b++
            }
            a.W.length = c
        }
        if (a.ea != a.W.length) {
            for (var f = {}, c = b = 0; b < a.W.length;) d = a.W[b], ye(f, d) || (a.W[c++] = d, f[d] = 1), b++;
            a.W.length = c
        }
    }
    r.get = function (a, b) {
        return ye(this.aa, a) ? this.aa[a] : b
    };
    r.set = function (a, b) {
        ye(this.aa, a) || (this.ea++, this.W.push(a), this.Fd++);
        this.aa[a] = b
    };
    r.Me = function (a) {
        var b;
        a instanceof we ? (b = a.fd(), a = a.Zb()) : (b = mb(a), a = lb(a));
        for (var c = 0; c < b.length; c++) this.set(b[c], a[c])
    };
    r.va = function () {
        return new we(this)
    };
    r.Oc = function (a) {
        xe(this);
        var b = 0,
            c = this.W,
            d = this.aa,
            f = this.Fd,
            g = this,
            j = new te;
        j.next = function () {
            for (;;) {
                f != g.Fd && e(Error("The map has changed since the iterator was created"));
                b >= c.length && e(se);
                var j = c[b++];
                return a ? j : d[j]
            }
        };
        return j
    };

    function ye(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    };

    function ze(a) {
        this.aa = new we;
        a && this.Me(a)
    }

    function Ae(a) {
        var b = typeof a;
        return "object" == b && a || "function" == b ? "o" + oa(a) : b.substr(0, 1) + a
    }
    r = ze.prototype;
    r.Z = function () {
        return this.aa.Z()
    };
    r.add = function (a) {
        this.aa.set(Ae(a), a)
    };
    r.Me = function (a) {
        for (var a = qe(a), b = a.length, c = 0; c < b; c++) this.add(a[c])
    };
    r.ub = function (a) {
        for (var a = qe(a), b = a.length, c = 0; c < b; c++) this.remove(a[c])
    };
    r.remove = function (a) {
        return this.aa.remove(Ae(a))
    };
    r.clear = function () {
        this.aa.clear()
    };
    r.contains = function (a) {
        a = Ae(a);
        return ye(this.aa.aa, a)
    };
    r.Wg = function (a) {
        for (var b = new ze, a = qe(a), c = 0; c < a.length; c++) {
            var d = a[c];
            this.contains(d) && b.add(d)
        }
        return b
    };
    r.Zb = function () {
        return this.aa.Zb()
    };
    r.va = function () {
        return new ze(this)
    };
    r.Oc = function () {
        return this.aa.Oc(m)
    };

    function Be(a) {
        return Ce(a || arguments.callee.caller, [])
    }

    function Ce(a, b) {
        var c = [];
        if (Wa(b, a)) c.push("[...circular reference...]");
        else if (a && 50 > b.length) {
            c.push(De(a) + "(");
            for (var d = a.arguments, f = 0; f < d.length; f++) {
                0 < f && c.push(", ");
                var g;
                g = d[f];
                switch (typeof g) {
                case "object":
                    g = g ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    g = "" + g;
                    break;
                case "boolean":
                    g = g ? "true" : "false";
                    break;
                case "function":
                    g = (g = De(g)) ? g : "[fn]";
                    break;
                default:
                    g = typeof g
                }
                40 < g.length && (g = g.substr(0, 40) + "...");
                c.push(g)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(Ce(a.caller, b))
            } catch (j) {
                c.push("[exception trying to get caller]\n")
            }
        } else a ?
            c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }

    function De(a) {
        if (Ee[a]) return Ee[a];
        a = "" + a;
        if (!Ee[a]) {
            var b = /function ([^\(]+)/.exec(a);
            Ee[a] = b ? b[1] : "[Anonymous]"
        }
        return Ee[a]
    }
    var Ee = {};

    function Fe(a, b, c, d, f) {
        this.reset(a, b, c, d, f)
    }
    Fe.prototype.Lj = 0;
    Fe.prototype.ef = k;
    Fe.prototype.df = k;
    var Ge = 0;
    Fe.prototype.reset = function (a, b, c, d, f) {
        this.Lj = "number" == typeof f ? f : Ge++;
        this.Nh = d || va();
        this.Gc = a;
        this.jh = b;
        this.dj = c;
        delete this.ef;
        delete this.df
    };
    Fe.prototype.$f = da("Gc");

    function He(a) {
        this.kh = a
    }
    He.prototype.ba = k;
    He.prototype.Gc = k;
    He.prototype.Y = k;
    He.prototype.hd = k;

    function Ie(a, b) {
        this.name = a;
        this.value = b
    }
    Ie.prototype.toString = n("name");
    var Je = new Ie("SEVERE", 1E3),
        Ke = new Ie("WARNING", 900),
        Le = new Ie("INFO", 800),
        Me = new Ie("CONFIG", 700),
        Ne = new Ie("FINE", 500),
        Oe = new Ie("FINER", 400),
        Pe = new Ie("FINEST", 300);

    function Qe(a) {
        s.console && (s.console.timeStamp ? s.console.timeStamp(a) : s.console.markTimeline && s.console.markTimeline(a));
        s.msWriteProfilerMark && s.msWriteProfilerMark(a)
    }
    r = He.prototype;
    r.getName = n("kh");
    r.getParent = n("ba");
    r.$f = da("Gc");

    function Re(a) {
        if (a.Gc) return a.Gc;
        if (a.ba) return Re(a.ba);
        Qa("Root logger has no level set.");
        return k
    }
    r.log = function (a, b, c) {
        if (a.value >= Re(this).value) {
            a = this.Ci(a, b, c);
            Qe("log:" + a.jh);
            for (b = this; b;) {
                var c = b,
                    d = a;
                if (c.hd)
                    for (var f = 0, g = h; g = c.hd[f]; f++) g(d);
                b = b.getParent()
            }
        }
    };
    r.Ci = function (a, b, c) {
        var d = new Fe(a, "" + b, this.kh);
        if (c) {
            d.ef = c;
            var f;
            var g = arguments.callee.caller;
            try {
                var j;
                var l = ha("window.location.href");
                if (u(c)) j = {
                    message: c,
                    name: "Unknown error",
                    lineNumber: "Not available",
                    fileName: l,
                    stack: "Not available"
                };
                else {
                    var o, q, z = m;
                    try {
                        o = c.lineNumber || c.Yl || "Not available"
                    } catch (B) {
                        o = "Not available", z = i
                    }
                    try {
                        q = c.fileName || c.filename || c.sourceURL || l
                    } catch (ba) {
                        q = "Not available", z = i
                    }
                    j = z || !c.lineNumber || !c.fileName || !c.stack ? {
                        message: c.message,
                        name: c.name,
                        lineNumber: o,
                        fileName: q,
                        stack: c.stack || "Not available"
                    } : c
                }
                f = "Message: " + Ha(j.message) + '\nUrl: <a href="view-source:' + j.fileName + '" target="_new">' + j.fileName + "</a>\nLine: " + j.lineNumber + "\n\nBrowser stack:\n" + Ha(j.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + Ha(Be(g) + "-> ")
            } catch (O) {
                f = "Exception trying to expose exception! You win, we lose. " + O
            }
            d.df = f
        }
        return d
    };

    function L(a, b) {
        a.log(Ke, b, h)
    }
    r.info = function (a, b) {
        this.log(Le, a, b)
    };

    function M(a, b) {
        a.log(Ne, b, h)
    }
    var Se = {},
        Te = k;

    function Ue() {
        Te || (Te = new He(""), Se[""] = Te, Te.$f(Me))
    }

    function N(a) {
        Ue();
        var b;
        if (!(b = Se[a])) {
            b = new He(a);
            var c = a.lastIndexOf("."),
                d = a.substr(c + 1),
                c = N(a.substr(0, c));
            if (!c.Y) c.Y = {};
            c.Y[d] = b;
            b.ba = c;
            Se[a] = b
        }
        return b
    };

    function Ve() {
        this.U = m;
        this.Ag = new dd(this);
        this.reset(0, [])
    }
    w(Ve, I);
    t(Ve);
    r = Ve.prototype;
    r.reset = function (a, b, c) {
        M(this.e, "Resetting packager");
        this.Bj = a;
        this.Cb = c || k;
        this.Cj = od();
        this.Rf = 0;
        this.Ka = [];
        this.sd = this.xa = k;
        this.Ag.ub();
        if (this.O)
            for (a = 0; c = this.O[a++];) c.reset();
        this.O = cb(b, 0);
        for (a = 0; c = this.O[a++];) this.Ag.c(c, zd, this.ji);
        this.U = m
    };
    r.af = function (a) {
        this.Ka.push(a);
        this.U || this.Ib()
    };
    r.Ib = function () {
        if (!this.U) {
            this.sd = k;
            var a = this.xa = this.Ka.shift();
            if (a) {
                M(this.e, "Creating new package " + this.Rf);
                this.U = i;
                var b = function () {
                    var b = this.sd = new ne,
                        d = [
                            ["PackageGuid", this.Cj],
                            ["PackageFileCount", 1],
                            ["PackageCount", this.Bj],
                            ["PackageIndex", this.Rf],
                            [K("SourceName_{0}", 0), a.getName()],
                            [K("SourceSize_{0}", 0), a.yc()],
                            [K("SourceWidth_{0}", 0), a.H(Kd)],
                            [K("SourceHeight_{0}", 0), a.H(Ld)],
                            [K("Angle_{0}", 0), a.H(Md)],
                            [K("Description_{0}", 0), a.H(Nd)]
                        ];
                    We(b, d);
                    if (d = this.Cb)
                        for (var f in d)
                            if (d.hasOwnProperty(f)) {
                                var g =
                                    d[f];
                                if (g)
                                    for (var j = 0, l = g.length; j < l; ++j) b.gf.append(f, g[j])
                            }
                    this.Tc = 0;
                    Xe(this)
                };
                a.Ia() < Jd ? (a.addEventListener(yd, function d(f) {
                    f.sh == Hd && f.ij >= Jd && (a.removeEventListener(yd, d, m, this), b.call(this))
                }, m, this), vd(a.getFile(), function (b) {
                    a.ra(Kd, b.width);
                    a.ra(Ld, b.height);
                    a.N(Jd)
                })) : b.call(this)
            }
        }
    };

    function Xe(a) {
        a.Tc < a.O.length ? a.O[a.Tc].apply(a.xa) : (We(a.sd, [
            ["PackageComplete", 1],
            ["RequestComplete", 1],
            ["RequestCount", 1]
        ]), 0 == a.O.length && a.Qd(), a.eb(), a.U = m, a.Rf++, a.Ib())
    }
    r.ji = function (a) {
        var b = a.ii;
        if (b) {
            var a = this.sd,
                c = this.Tc,
                b = b.mode == Ye ? [
                    [K("File{1}Mode_{0}", 0, c), b.mode]
                ] : [
                    [K("File{1}Mode_{0}", 0, c), b.mode],
                    [K("File{1}Name_{0}", 0, c), b.fileName],
                    [K("File{1}Size_{0}", 0, c), b.size],
                    [K("File{1}Width_{0}", 0, c), b.Lh],
                    [K("File{1}Height_{0}", 0, c), b.Kh],
                    [K("File{1}_{0}", 0, c), b.file, b.fileName]
                ];
            We(a, b)
        }
        this.Qd();
        this.Tc++;
        Xe(this)
    };

    function We(a, b) {
        for (var c, d = 0; c = b[d++];) a.gf.append(c[0], c[1])
    }
    r.eb = function () {
        M(this.e, "Package created.");
        this.dispatchEvent(new oe(this.sd))
    };
    r.Qd = function () {
        var a = new pe("progress", i, Math.min(this.Tc + 1, this.O.length), this.O.length);
        this.dispatchEvent(a);
        a.j()
    };
    r.h = function () {
        this.reset(0, []);
        Ve.b.h.call(this)
    };
    r.e = N("au.upldr.upload.Packager");
    var Ze = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");

    function $e(a, b) {
        this.ae = a || 1;
        this.Cd = b || af;
        this.Qe = v(this.ck, this);
        this.Gf = va()
    }
    w($e, I);
    $e.prototype.enabled = m;
    var af = s.window;
    r = $e.prototype;
    r.sa = k;
    r.ck = function () {
        if (this.enabled) {
            var a = va() - this.Gf;
            if (0 < a && a < 0.8 * this.ae) this.sa = this.Cd.setTimeout(this.Qe, this.ae - a);
            else if (this.dispatchEvent(bf), this.enabled) this.sa = this.Cd.setTimeout(this.Qe, this.ae), this.Gf = va()
        }
    };
    r.start = function () {
        this.enabled = i;
        if (!this.sa) this.sa = this.Cd.setTimeout(this.Qe, this.ae), this.Gf = va()
    };
    r.stop = function () {
        this.enabled = m;
        if (this.sa) this.Cd.clearTimeout(this.sa), this.sa = k
    };
    r.h = function () {
        $e.b.h.call(this);
        this.stop();
        delete this.Cd
    };
    var bf = "tick";

    function cf(a, b, c) {
        ma(a) ? c && (a = v(a, c)) : a && "function" == typeof a.handleEvent ? a = v(a.handleEvent, a) : e(Error("Invalid listener argument"));
        return 2147483647 < b ? -1 : af.setTimeout(a, b || 0)
    };

    function df() {}
    df.prototype.sg = k;

    function ef(a) {
        var b;
        if (!(b = a.sg)) b = {}, ff(a) && (b[0] = i, b[1] = i), b = a.sg = b;
        return b
    };
    var gf;

    function hf() {}
    w(hf, df);

    function jf(a) {
        return (a = ff(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    hf.prototype.uf = k;

    function ff(a) {
        if (!a.uf && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d), a.uf = d
                } catch (f) {}
            }
            e(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
        }
        return a.uf
    }
    gf = new hf;

    function kf(a) {
        this.headers = new we;
        this.Qb = a || k
    }
    w(kf, I);
    kf.prototype.B = N("goog.net.XhrIo");
    var lf = /^https?$/i;
    r = kf.prototype;
    r.nb = m;
    r.p = k;
    r.Nc = k;
    r.he = "";
    r.Ef = "";
    r.fc = 0;
    r.rb = "";
    r.Td = m;
    r.Cc = m;
    r.ld = m;
    r.dc = m;
    r.kc = 0;
    r.bb = k;
    r.qe = "";
    r.Yh = m;
    r.send = function (a, b, c, d) {
        this.p && e(Error("[goog.net.XhrIo] Object is active with another request"));
        b = b ? b.toUpperCase() : "GET";
        this.he = a;
        this.rb = "";
        this.fc = 0;
        this.Ef = b;
        this.Td = m;
        this.nb = i;
        this.p = this.Qb ? jf(this.Qb) : jf(gf);
        this.Nc = this.Qb ? ef(this.Qb) : ef(gf);
        this.p.onreadystatechange = v(this.Pf, this);
        try {
            M(this.B, mf(this, "Opening Xhr")), this.ld = i, this.p.open(b, a, i), this.ld = m
        } catch (f) {
            M(this.B, mf(this, "Error opening Xhr: " + f.message));
            nf(this, f);
            return
        }
        var a = c || "",
            g = this.headers.va();
        d && re(d, function (a,
            b) {
            g.set(b, a)
        });
        "POST" == b && !ye(g.aa, "Content-Type") && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        re(g, function (a, b) {
            this.p.setRequestHeader(b, a)
        }, this);
        if (this.qe) this.p.responseType = this.qe;
        if ("withCredentials" in this.p) this.p.withCredentials = this.Yh;
        try {
            if (this.bb) af.clearTimeout(this.bb), this.bb = k;
            if (0 < this.kc) M(this.B, mf(this, "Will abort after " + this.kc + "ms if incomplete")), this.bb = af.setTimeout(v(this.De, this), this.kc);
            M(this.B, mf(this, "Sending request"));
            this.Cc =
                i;
            this.p.send(a);
            this.Cc = m
        } catch (j) {
            M(this.B, mf(this, "Send error: " + j.message)), nf(this, j)
        }
    };
    r.De = function () {
        if ("undefined" != typeof ea && this.p) this.rb = "Timed out after " + this.kc + "ms, aborting", this.fc = 8, M(this.B, mf(this, this.rb)), this.dispatchEvent("timeout"), this.abort(8)
    };

    function nf(a, b) {
        a.nb = m;
        if (a.p) a.dc = i, a.p.abort(), a.dc = m;
        a.rb = b;
        a.fc = 5;
        of(a);
        a.oc()
    }

    function of(a) {
        if (!a.Td) a.Td = i, a.dispatchEvent("complete"), a.dispatchEvent("error")
    }
    r.abort = function (a) {
        if (this.p && this.nb) M(this.B, mf(this, "Aborting")), this.nb = m, this.dc = i, this.p.abort(), this.dc = m, this.fc = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), this.oc()
    };
    r.h = function () {
        if (this.p) {
            if (this.nb) this.nb = m, this.dc = i, this.p.abort(), this.dc = m;
            this.oc(i)
        }
        kf.b.h.call(this)
    };
    r.Pf = function () {
        !this.ld && !this.Cc && !this.dc ? this.sj() : pf(this)
    };
    r.sj = function () {
        pf(this)
    };

    function pf(a) {
        if (a.nb && "undefined" != typeof ea)
            if (a.Nc[1] && 4 == qf(a) && 2 == rf(a)) M(a.B, mf(a, "Local request error detected and ignored"));
            else if (a.Cc && 4 == qf(a)) af.setTimeout(v(a.Pf, a), 0);
        else if (a.dispatchEvent("readystatechange"), 4 == qf(a)) {
            M(a.B, mf(a, "Request complete"));
            a.nb = m;
            if (a.Ec()) a.dispatchEvent("complete"), a.dispatchEvent("success");
            else {
                a.fc = 6;
                var b;
                try {
                    b = 2 < qf(a) ? a.p.statusText : ""
                } catch (c) {
                    M(a.B, "Can not get status: " + c.message), b = ""
                }
                a.rb = b + " [" + rf(a) + "]";
                of(a)
            }
            a.oc()
        }
    }
    r.oc = function (a) {
        if (this.p) {
            var b = this.p,
                c = this.Nc[0] ? ia : k;
            this.Nc = this.p = k;
            if (this.bb) af.clearTimeout(this.bb), this.bb = k;
            a || this.dispatchEvent("ready");
            try {
                b.onreadystatechange = c
            } catch (d) {
                this.B.log(Je, "Problem encountered resetting onreadystatechange: " + d.message, h)
            }
        }
    };
    r.od = function () {
        return !!this.p
    };
    r.Ec = function () {
        var a = rf(this),
            b;
        a: switch (a) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 304:
        case 1223:
            b = i;
            break a;
        default:
            b = m
        }
        if (!b) {
            if (a = 0 === a) {
                a = ("" + this.he).match(Ze)[1] || k;
                if (!a && self.location) a = self.location.protocol, a = a.substr(0, a.length - 1);
                a = !lf.test(a ? a.toLowerCase() : "")
            }
            b = a
        }
        return b
    };

    function qf(a) {
        return a.p ? a.p.readyState : 0
    }

    function rf(a) {
        try {
            return 2 < qf(a) ? a.p.status : -1
        } catch (b) {
            return L(a.B, "Can not get status: " + b.message), -1
        }
    }

    function mf(a, b) {
        return b + " [" + a.Ef + " " + a.he + " " + rf(a) + "]"
    };

    function sf(a) {
        kf.call(this, a)
    }
    w(sf, kf);
    sf.prototype.send = function (a, b, c, d) {
        this.p && e(Error("[au.upldr.upload.XhrIo] Object is active with another request"));
        b = b ? b.toUpperCase() : "GET";
        this.he = a;
        this.rb = "";
        this.fc = 0;
        this.Ef = b;
        this.Td = m;
        this.nb = i;
        this.p = this.Qb ? jf(this.Qb) : jf(gf);
        if (Wc(this)) this.p.upload.onprogress = v(this.rk, this);
        this.Nc = this.Qb ? ef(this.Qb) : ef(gf);
        this.p.onreadystatechange = v(this.Pf, this);
        try {
            M(this.B, mf(this, "Opening Xhr")), this.ld = i, this.p.open(b, a, i), this.ld = m
        } catch (f) {
            L(this.B, mf(this, "Error opening Xhr: " + f.message));
            nf(this, f);
            return
        }
        var a = c || "",
            g = this.headers.va();
        d && re(d, function (a, b) {
            g.set(b, a)
        });
        "POST" == b && !(c instanceof FormData) && !ye(g.aa, "Content-Type") && g.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        re(g, function (a, b) {
            this.p.setRequestHeader(b, a)
        }, this);
        if (this.qe) this.p.responseType = this.qe;
        if ("withCredentials" in this.p) this.p.withCredentials = this.Yh;
        try {
            if (this.bb) af.clearTimeout(this.bb), this.bb = k;
            if (0 < this.kc) M(this.B, mf(this, "Will abort after " + this.kc + "ms if incomplete")),
                this.bb = af.setTimeout(v(this.De, this), this.kc);
            M(this.B, mf(this, "Sending request"));
            this.Cc = i;
            this.p.send(a);
            this.Cc = m
        } catch (j) {
            L(this.B, mf(this, "Send error: " + j.message)), nf(this, j)
        }
    };
    sf.prototype.oc = function (a) {
        if (this.p && this.p.upload && this.p.upload.onprogress) this.p.upload.onprogress = this.Nc[0] ? ia : k;
        sf.b.oc.call(this, a)
    };
    sf.prototype.rk = function (a) {
        this.dispatchEvent(new pe(a.type, a.lengthComputable, a.loaded, a.total))
    };
    sf.prototype.B = N("au.upldr.upload.XhrIo");

    function tf() {
        this.U = m;
        this.r = new dd(this);
        this.reset()
    }
    w(tf, I);
    t(tf);
    r = tf.prototype;
    r.af = function (a) {
        this.Ka.push(a);
        this.U || this.Ib()
    };
    r.reset = function (a) {
        M(this.e, "Resetting transmitter (" + a + ")");
        this.p && (this.p.j(), delete this.p);
        this.Ka = [];
        this.U = m;
        this.lk = a || ".";
        a = this.p = new sf(h);
        this.r.c(a, "ready", this.qk).c(a, "complete", this.ok).c(a, "progress", this.pk)
    };
    r.Ib = function () {
        if (!this.U) {
            var a = this.Ka.shift();
            if (a) M(this.e, "Uploading package..."), this.U = i, this.p.send(this.lk, "POST", a.gf)
        }
    };
    r.ok = function () {
        var a = this.p,
            b, c = rf(a),
            d;
        try {
            d = a.p ? a.p.responseText : ""
        } catch (f) {
            M(a.B, "Can not get responseText: " + f.message), d = ""
        }
        var g;
        a.Ec() ? (b = zd, M(this.e, "Package uploaded [" + c + "]")) : (b = "error", g = u(a.rb) ? a.rb : "" + a.rb, L(this.e, K('Package upload error \n\t{ errorCode: {0}, errorMessage: "{1}", responseText: "{2}" }', a.fc, g, d)));
        a = new ke(b, c, d, g);
        this.dispatchEvent(a);
        a.j()
    };
    r.qk = function () {
        this.U = m;
        pd(this.Ib, 0, this)
    };
    r.pk = function (a) {
        this.dispatchEvent(new pe("progress", a.lengthComputable, a.loaded, a.total))
    };
    r.h = function () {
        this.reset();
        this.r.ub();
        this.p.j();
        delete this.p;
        tf.b.h.call(this)
    };
    r.e = N("au.upldr.upload.Transmitter");

    function uf(a, b, c) {
        this.me = a = a || Ve.v();
        this.Fe = b = b || tf.v();
        this.ua = this.vd = m;
        this.fm = 0;
        this.Ic = c || "ByPackageSize";
        this.r = new dd(this);
        this.r.c(a, zd, this.Dj).c(a, "progress", this.Ej).c(b, zd, this.ek).c(b, "progress", this.gk).c(b, "error", this.fk)
    }
    w(uf, I);

    function vf(a, b, c, d, f) {
        a.e.info("Starting upload...");
        a.vd && (a.e.log(Je, "UploadManager is busy. Cancel current operation with stopUpload or wailt until it completes.", h), rd("UploadManager is busy. Cancel current operation with stopUpload or wailt until it completes."));
        a.vd = i;
        a.ua = m;
        if (ka(b)) a.l = cb(b, 0);
        else
            for (var g = 0, j = b.Z(); g < j; g++) a.l.push(b.getItem(g));
        a.me.reset(a.l.length, c, f);
        a.Fe.reset(d || ".");
        var l = a.Vc = 0;
        "BySourceSize" == a.Ic && y(a.l, function (a) {
            l += a.yc()
        });
        b = a.gc = new le(1, 0, 0, a.l.length,
            0, l);
        wf(a);
        0 < a.l.length ? (b.xb = 2, xf(a)) : (a.vd = m, b.xb = 4, b.qa = 100, wf(a), yf(a))
    }
    r = uf.prototype;
    r.Te = function () {
        M(this.e, "Cancel upload.");
        this.me.reset(0, []);
        this.Fe.reset();
        this.Vc = 0;
        this.l = [];
        this.vd = m;
        this.ua = i;
        this.yf = 0
    };

    function xf(a) {
        M(a.e, "Enqueue item to package");
        if ("ByPackageSize" === a.Ic) a.gc.ha = 0, a.gc.Aa = 0;
        a.dispatchEvent(new me("beforePackageUpload", a.Vc));
        var b = a.l.shift();
        a.yf = b.yc();
        a.me.af(b)
    }

    function yf(a, b, c) {
        a.e.info("All files has been uploaded successfully.");
        a.ua || a.dispatchEvent(new ke(zd, b, c))
    }
    r.Dj = function (a) {
        M(this.e, "Packager complete handler");
        if (!this.ua) a = a.Fj, M(this.e, "Enqueue package to upload."), this.gc.xb = 3, this.Fe.af(a)
    };
    r.Ej = function (a) {
        if ("ByPackageSize" === this.Ic) {
            var b = this.gc,
                c = b.qa;
            b.qa = 0 < a.total ? b.qa + 50 * a.loaded / a.total / b.Wa : b.qa + 50 / b.Wa;
            wf(this);
            b.qa = c
        }
    };
    r.ek = function (a) {
        this.e.info("Package " + this.Vc + " uploaded [" + a.Ea + "]");
        if (!this.ua) {
            this.dispatchEvent(new me("afterPackageUpload", this.Vc, a.Ea, a.response, a.Xc));
            var b = 0 >= this.l.length,
                c = this.gc;
            c.gb++;
            c.ha = "ByPackageSize" === this.Ic ? c.Aa : c.ha + this.yf;
            b ? (c.xb = 4, c.qa = 100) : c.qa = "ByPackageSize" === this.Ic ? 100 * c.gb / c.Wa : 100 * c.ha / c.Aa;
            wf(this);
            this.Vc++;
            b ? (this.vd = m, yf(this, a.Ea, a.response)) : xf(this)
        }
    };
    r.gk = function (a) {
        var b = this.gc;
        if ("ByPackageSize" === this.Ic) b.Aa = a.total, b.ha = a.loaded, b.qa = 100 * (b.gb + 0.5) / b.Wa, 0 < b.Aa && (b.qa += 50 * b.ha / b.Wa / b.Aa), wf(this);
        else {
            var c = b.ha;
            b.ha += Math.min(a.loaded, this.yf);
            b.qa = 100 * b.ha / b.Aa;
            wf(this);
            b.ha = c;
            b.qa = 100 * b.ha / b.Aa
        }
    };
    r.fk = function (a) {
        this.Vb(new ke("error", a.Ea, a.response, "Upload error: " + a.Xc))
    };

    function wf(a) {
        var b = new G("progress");
        b.state = a.gc.va();
        a.dispatchEvent(b)
    }
    r.Vb = function (a) {
        this.dispatchEvent(a)
    };
    r.h = function () {
        this.r.ub();
        this.Fe.j();
        this.me.j();
        uf.b.h.call(this)
    };
    r.e = N("au.upldr.upload.UploadManager");

    function zf(a, b) {
        G.call(this, a || zd);
        this.ii = b
    }
    w(zf, G);

    function Af(a, b, c, d) {
        G.call(this, a);
        this.canvas = b;
        this.Xl = c;
        this.Vl = d || 0;
        this.width = b && b.width || 0;
        this.height = b && b.height || 0
    }
    w(Af, G);

    function Bf() {
        this.pb = new id;
        this.r = new dd(this);
        this.r.c(this.pb, jd, this.vf)
    }
    w(Bf, I);
    Bf.prototype.create = function (a, b, c, d, f, g, j) {
        this.U && rd("ThumbnailCreator is busy. Wailt until the current operation completes.");
        this.U = i;
        this.ua = m;
        this.Lg = b;
        this.nk = c;
        this.Wi = d;
        this.di = f;
        this.pg = g;
        this.vg = j;
        this.pb.load(a)
    };
    Bf.prototype.reset = function () {
        this.ua = i;
        this.U = m
    };
    Bf.prototype.vf = function () {
        var a = this.vg;
        delete this.vg;
        if (this.ua) this.U = m;
        else {
            var b;
            if (this.pb.Ec()) {
                var c = this.pb.pa;
                0 < c.width && 0 < c.height && (a = a || document.createElement("canvas"), (a = Cf(c, this.Lg, this.nk, this.Wi, this.di, this.pg, a)) && (b = new Af(zd, a, this.Lg, this.pg)))
            }
            b || (b = new Af("error"));
            this.U = m;
            this.dispatchEvent(b);
            b.j()
        }
    };

    function Cf(a, b, c, d, f, g, j) {
        if (j != k && 0 < a.width && 0 < a.height) {
            var l;
            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/))
                if (l = a.naturalWidth, 1048576 > l * a.naturalHeight) l = m;
                else {
                    var o = document.createElement("canvas");
                    o.width = o.height = 1;
                    o = o.getContext("2d");
                    o.drawImage(a, -l + 1, 0);
                    l = 0 === o.getImageData(0, 0, 1, 1).data[3]
                } else l = m; if (l) return k;
            l = ud(a.width, a.height, c, d, g, b);
            j.width = l.width;
            j.height = l.height;
            try {
                for (var q = j.getContext("2d"), z = a.width, B = a.height, ba = ud(z,
                        B, c, d, 0, b), O = document.createElement("canvas"), hb = document.createElement("canvas");
                    (z = Math.floor(z / 2)) > ba.width && (B = Math.floor(B / 2)) > ba.height;) O.width = z, O.height = B, O.getContext("2d").drawImage(a, 0, 0, z, B), a = O, O = hb, hb = a;
                if (f != k) q.save(), q.fillStyle = sd(f), q.fillRect(0, 0, l.width, l.height), q.restore();
                var b = !(g % 180),
                    g = g * Math.PI / 180,
                    rc = Math.sin(g),
                    ua = Math.cos(g);
                q.setTransform(ua, rc, -rc, ua, l.width / 2, l.height / 2);
                var Z = b ? l.width : l.height,
                    Pb = b ? l.height : l.width;
                q.drawImage(a, -Z / 2, -Pb / 2, Z, Pb);
                return j
            } catch (ld) {}
        }
        return k
    }
    Bf.prototype.h = function () {
        this.r.ub();
        Bf.b.h.call(this)
    };

    function Df(a, b, c, d, f) {
        this.mode = a;
        this.fileName = b;
        this.file = c;
        this.Lh = d || 0;
        this.Kh = f || 0;
        this.size = c ? c.size : 0
    };
    var Ye = "none";

    function Ef(a, b, c, d, f, g) {
        this.U = m;
        this.Vg = a;
        this.Jc = Ff(b);
        this.Be = c == k ? 96 : c;
        this.ze = d == k ? 96 : d;
        this.ye = Gf(f);
        this.xe = g == k ? 16777215 : g;
        this.vb = 0;
        this.jg = new Bf;
        this.r = new dd(this);
        this.r.c(this.jg, [zd, "error"], this.bk)
    }
    w(Ef, I);
    r = Ef.prototype;
    r.apply = function (a) {
        this.U && rd("Converter is busy. Wait until current operation completes.");
        this.e.info("Applying converter " + ("{ index: " + this.Vg + ", mode: " + Hf(this) + ", thimbnailFitMode: " + this.ye + ", thumbnailWidth: " + this.Be + ", thumbnailHeight: " + this.ze + ", thumbnailBgColor: " + sd(this.xe) + " }"));
        this.U = i;
        this.xa = a;
        this.vb = If(this.Jc, 0, a.getName());
        Jf(this)
    };
    r.reset = function () {
        this.U = m;
        this.vb = 0;
        this.Kd = this.xa = k;
        this.jg.reset()
    };

    function Jf(a) {
        var b;
        b = 0 <= a.vb ? a.Jc[a.vb].mode : Ye;
        if ("sourceFile" == b) M(a.e, 'Creating "sourceFile" converted item'), b = a.xa, a.Kd = new Df("sourceFile", b.getName(), b.getFile(), b.H(Kd), b.H(Ld)), pd(a.eb, 0, a);
        else if (b == Ye) Kf(a);
        else if ("thumbnail" == b) M(a.e, 'Creating "thumbnail" converted item'), b = a.xa, Gd(b) ? a.jg.create(b.getFile(), a.ye, a.Be, a.ze, a.xe, b.H(Md)) : (a.e.info("Item is not an image.Trying to apply next convert rule."), b = a.xa, a.vb = If(a.Jc, a.vb + 1, b.getName()), -1 == a.vb ? Kf(a) : Jf(a))
    }

    function Kf(a) {
        M(a.e, 'Creating "none" converted item');
        a.Kd = new Df(Ye, "", k);
        pd(a.eb, 0, a)
    }
    r.eb = function () {
        var a = this.Kd;
        a ? this.e.info("Item created: { mode: " + a.mode + ", name: " + a.fileName + ", file: " + a.file + ", width: " + a.Lh + ", height: " + a.Kh + "}") : this.e.info("Item created: null");
        try {
            this.dispatchEvent(new zf(zd, a))
        } finally {
            this.reset()
        }
    };
    r.bk = function (a) {
        var b = this.xa.getName();
        if (a.type == zd && a.canvas != k) {
            M(this.e, K("Thumbnail created: {0}x{1}", a.width, a.height));
            var b = b + "_Thumbnail" + this.Vg + ".jpg",
                c;
            if (a.canvas.mozGetAsFile) c = a.canvas.mozGetAsFile(b, "image/jpeg");
            else {
                var d = a.canvas.toDataURL("image/jpeg");
                c = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
                for (var f = window.atob(d.split(",")[1]), d = d.split(",")[0].split(":")[1].split(";")[0], g = new ArrayBuffer(f.length), j = new Uint8Array(g), l =
                    0; l < f.length; l++) j[l] = f.charCodeAt(l);
                window.Blob ? c = new Blob([j.buffer], {
                    type: d
                }) : (c = new c, c.append(g), c = c.getBlob(d))
            }
            this.Kd = new Df("thumbnail", b, c, a.width, a.height);
            this.eb()
        } else M(this.e, "Thumbnail not created. Trying to apply next convert rule."), this.vb = If(this.Jc, this.vb + 1, b), Jf(this)
    };

    function If(a, b, c) {
        0 > b && (b = 0);
        if (b < a.length) {
            do
                if (a[b].pattern.test(c)) return b;
            while (a[++b])
        }
        return -1
    }

    function Ff(a) {
        for (var b = 'Can not parse "' + a + '" string', a = a.split(";"), c = [], d, f = 0; d = a[f++];) {
            d = d.split("=");
            2 != d.length && rd(b);
            var g = Fa(d[0]);
            d = Fa(d[1]);
            (!g || !d) && rd(b);
            var g = g.toLowerCase().split(","),
                j = [];
            y(g, function (a, b, c) {
                j[b] = Fa(a);
                c[b] = j[b].replace(/\./g, "\\.").replace(/\?/g, ".").replace(/\*/g, ".+")
            });
            g = RegExp("^" + g.join("|") + "$", "i");
            j = j.join(",");
            d = d.toLowerCase();
            "none" == d ? d = Ye : "thumbnail" == d ? vc() ? d = "thumbnail" : (window.alert("Thumbnail converter is not supported in your browser."), d = Ye) :
                "sourcefile" == d ? d = "sourceFile" : rd(b);
            c.push({
                pattern: g,
                mode: d,
                fj: j
            })
        }
        return c
    }

    function Hf(a) {
        for (var a = a.Jc, b = "", c, d = 0; c = a[d++];) b && (b += ";"), b += c.fj + "=" + c.mode;
        return b
    }

    function Gf(a) {
        if (!a) return "fit";
        a = (a + "").toLowerCase();
        switch (a) {
        case "fit":
        case "width":
        case "height":
        case "actualsize":
            return a;
        default:
            return "fit"
        }
    }
    r.e = N("au.upldr.upload.Converter");
    var P = {};
    P.Width = P.Height = function (a) {
        a = (a + "").toLowerCase();
        /^\d+$/.test(a) && (a += "px");
        return a
    };
    P.ViewMode = function (a) {
        a = (a + "").toLowerCase();
        if ("tiles" !== a && "thumbnails" !== a && "icons" !== a) P.Le("ViewMode", a), a = x.ViewMode;
        return a
    };
    P.ViewComboBox = function (a) {
        if (!a || !ka(a) || 3 !== a.length) P.Le("ViewComboBox", a), a = x.ViewComboBox;
        return a
    };
    P.Je = function (a, b) {
        if (!wc()) return L(P.B, "The image restrictions are not supported in this browser."), x[a];
        var c = parseInt(b, 10);
        isNaN(c) && (c = x[a], P.Le(a, b));
        return c
    };
    P.MaxImageHeight = ta(P.Je, "MaxImageHeight");
    P.MaxImageWidth = ta(P.Je, "MaxImageWidth");
    P.MinImageHeight = ta(P.Je, "MinImageHeight");
    P.MinImageWidth = ta(P.Je, "MinImageWidth");
    P.ProgressBytesMode = function (a) {
        var b = (a + "").toLowerCase();
        "bysourcesize" == b || "1" === b ? b = "BySourceSize" : "bypackagesize" === b || "0" === b ? b = "ByPackageSize" : (b = "ByPackageSize", P.Le("ProgressBytesMode", a));
        return b
    };
    P.Le = function (a, b) {
        L(P.B, 'Incorrect value for "' + a + '": "' + b + '"')
    };
    P.B = N("au.upldr.validate");
    var Lf;
    (Lf = "ScriptEngine" in s && "JScript" == s.ScriptEngine()) && (s.ScriptEngineMajorVersion(), s.ScriptEngineMinorVersion(), s.ScriptEngineBuildVersion());

    function Mf(a, b) {
        this.Oa = Lf ? [] : "";
        a != k && this.append.apply(this, arguments)
    }
    Mf.prototype.set = function (a) {
        this.clear();
        this.append(a)
    };
    Lf ? (Mf.prototype.Re = 0, Mf.prototype.append = function (a, b, c) {
        b == k ? this.Oa[this.Re++] = a : (this.Oa.push.apply(this.Oa, arguments), this.Re = this.Oa.length);
        return this
    }) : Mf.prototype.append = function (a, b, c) {
        this.Oa += a;
        if (b != k)
            for (var d = 1; d < arguments.length; d++) this.Oa += arguments[d];
        return this
    };
    Mf.prototype.clear = function () {
        Lf ? this.Re = this.Oa.length = 0 : this.Oa = ""
    };
    Mf.prototype.toString = function () {
        if (Lf) {
            var a = this.Oa.join("");
            this.clear();
            a && this.append(a);
            return a
        }
        return this.Oa
    };

    function Nf(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    }
    Nf.prototype.va = function () {
        return new Nf(this.top, this.right, this.bottom, this.left)
    };
    Nf.prototype.toString = function () {
        return "(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
    };
    Nf.prototype.contains = function (a) {
        return !this || !a ? m : a instanceof Nf ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
    };

    function Of(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    r = Of.prototype;
    r.va = function () {
        return new Of(this.left, this.top, this.width, this.height)
    };
    r.toString = function () {
        return "(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
    };
    r.Wg = function (a) {
        var b = Math.max(this.left, a.left),
            c = Math.min(this.left + this.width, a.left + a.width);
        if (b <= c) {
            var d = Math.max(this.top, a.top),
                a = Math.min(this.top + this.height, a.top + a.height);
            if (d <= a) return this.left = b, this.top = d, this.width = c - b, this.height = a - d, i
        }
        return m
    };
    r.contains = function (a) {
        return a instanceof Of ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
    };
    r.yc = function () {
        return new Rb(this.width, this.height)
    };

    function Pf(a, b, c) {
        a.style[Oa(c)] = b
    }

    function Qf(a, b) {
        var c = Xb(a);
        return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, k)) ? c[b] || c.getPropertyValue(b) : ""
    }

    function Rf(a, b) {
        return a.currentStyle ? a.currentStyle[b] : k
    }

    function Sf(a, b) {
        return Qf(a, b) || Rf(a, b) || a.style && a.style[b]
    }

    function Tf(a, b, c) {
        var d, f = Cb && (wb || Fb) && E("1.9");
        b instanceof F ? (d = b.x, b = b.y) : (d = b, b = c);
        a.style.left = Uf(d, f);
        a.style.top = Uf(b, f)
    }

    function Vf(a) {
        a = a ? 9 == a.nodeType ? a : Xb(a) : document;
        return C && !Qb(9) && !tc(Vb(a)) ? a.body : a.documentElement
    }

    function Wf(a) {
        var b = a.getBoundingClientRect();
        if (C) a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop;
        return b
    }

    function Xf(a) {
        if (C && !Qb(8)) return a.offsetParent;
        for (var b = Xb(a), c = Sf(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode; a && a != b; a = a.parentNode)
            if (c = Sf(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) return a;
        return k
    }

    function Yf(a) {
        for (var b = new Nf(0, Infinity, Infinity, 0), c = Vb(a), d = c.Q.body, f = c.Q.documentElement, g = !D && $b(c.Q) ? c.Q.documentElement : c.Q.body; a = Xf(a);)
            if ((!C || 0 != a.clientWidth) && (!D || 0 != a.clientHeight || a != d) && a != d && a != f && "visible" != Sf(a, "overflow")) {
                var j = Zf(a),
                    l;
                l = a;
                if (Cb && !E("1.9")) {
                    var o = parseFloat(Qf(l, "borderLeftWidth"));
                    if ($f(l)) var q = l.offsetWidth - l.clientWidth - o - parseFloat(Qf(l, "borderRightWidth")),
                        o = o + q;
                    l = new F(o, parseFloat(Qf(l, "borderTopWidth")))
                } else l = new F(l.clientLeft, l.clientTop);
                j.x +=
                    l.x;
                j.y += l.y;
                b.top = Math.max(b.top, j.y);
                b.right = Math.min(b.right, j.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, j.y + a.clientHeight);
                b.left = Math.max(b.left, j.x)
            }
        d = g.scrollLeft;
        g = g.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, g);
        c = c.Q.parentWindow || c.Q.defaultView || window;
        f = c.document;
        D && !E("500") && !Db ? ("undefined" == typeof c.innerHeight && (c = window), f = c.innerHeight, a = c.document.documentElement.scrollHeight, c == c.top && a < f && (f -= 15), c = new Rb(c.innerWidth, f)) : (c = $b(f) ? f.documentElement : f.body, c =
            new Rb(c.clientWidth, c.clientHeight));
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, g + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : k
    }

    function Zf(a) {
        var b, c = Xb(a),
            d = Sf(a, "position"),
            f = Cb && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY),
            g = new F(0, 0),
            j = Vf(c);
        if (a == j) return g;
        if (a.getBoundingClientRect) b = Wf(a), a = uc(Vb(c)), g.x = b.left + a.x, g.y = b.top + a.y;
        else if (c.getBoxObjectFor && !f) b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(j), g.x = b.screenX - a.screenX, g.y = b.screenY - a.screenY;
        else {
            b = a;
            do {
                g.x += b.offsetLeft;
                g.y += b.offsetTop;
                b != a && (g.x += b.clientLeft || 0, g.y += b.clientTop || 0);
                if (D && "fixed" == Sf(b, "position")) {
                    g.x += c.body.scrollLeft;
                    g.y += c.body.scrollTop;
                    break
                }
                b = b.offsetParent
            } while (b && b != a);
            if (Bb || D && "absolute" == d) g.y -= c.body.offsetTop;
            for (b = a;
                (b = Xf(b)) && b != c.body && b != j;)
                if (g.x -= b.scrollLeft, !Bb || "TR" != b.tagName) g.y -= b.scrollTop
        }
        return g
    }

    function ag(a, b, c) {
        b instanceof Rb ? (c = b.height, b = b.width) : c == h && e(Error("missing height argument"));
        a.style.width = Uf(b, i);
        a.style.height = Uf(c, i)
    }

    function Uf(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }

    function bg(a) {
        if ("none" != Sf(a, "display")) return cg(a);
        var b = a.style,
            c = b.display,
            d = b.visibility,
            f = b.position;
        b.visibility = "hidden";
        b.position = "absolute";
        b.display = "inline";
        a = cg(a);
        b.display = c;
        b.position = f;
        b.visibility = d;
        return a
    }

    function cg(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight,
            d = D && !b && !c;
        return (!ga(b) || d) && a.getBoundingClientRect ? (a = Wf(a), new Rb(a.right - a.left, a.bottom - a.top)) : new Rb(b, c)
    }

    function dg(a) {
        var b = Zf(a),
            a = bg(a);
        return new Of(b.x, b.y, a.width, a.height)
    }

    function Q(a, b) {
        a.style.display = b ? "" : "none"
    }

    function $f(a) {
        return "rtl" == Sf(a, "direction")
    }
    var eg = Cb ? "MozUserSelect" : D ? "WebkitUserSelect" : k;

    function fg(a, b, c) {
        c = !c ? a.getElementsByTagName("*") : k;
        if (eg) {
            if (b = b ? "none" : "", a.style[eg] = b, c)
                for (var a = 0, d; d = c[a]; a++) d.style[eg] = b
        } else if (C || Bb)
            if (b = b ? "on" : "", a.setAttribute("unselectable", b), c)
                for (a = 0; d = c[a]; a++) d.setAttribute("unselectable", b)
    }

    function gg(a, b) {
        if (/^\d+px?$/.test(b)) return parseInt(b, 10);
        var c = a.style.left,
            d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        var f = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return f
    }

    function hg(a, b) {
        if (C) {
            var c = gg(a, Rf(a, b + "Left")),
                d = gg(a, Rf(a, b + "Right")),
                f = gg(a, Rf(a, b + "Top")),
                g = gg(a, Rf(a, b + "Bottom"));
            return new Nf(f, d, g, c)
        }
        c = Qf(a, b + "Left");
        d = Qf(a, b + "Right");
        f = Qf(a, b + "Top");
        g = Qf(a, b + "Bottom");
        return new Nf(parseFloat(f), parseFloat(d), parseFloat(g), parseFloat(c))
    }
    var ig = {
        thin: 2,
        medium: 4,
        thick: 6
    };

    function jg(a, b) {
        if ("none" == Rf(a, b + "Style")) return 0;
        var c = Rf(a, b + "Width");
        return c in ig ? ig[c] : gg(a, c)
    }

    function kg(a) {
        if (C) {
            var b = jg(a, "borderLeft"),
                c = jg(a, "borderRight"),
                d = jg(a, "borderTop"),
                a = jg(a, "borderBottom");
            return new Nf(d, c, a, b)
        }
        b = Qf(a, "borderLeftWidth");
        c = Qf(a, "borderRightWidth");
        d = Qf(a, "borderTopWidth");
        a = Qf(a, "borderBottomWidth");
        return new Nf(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
    };

    function R(a) {
        this.Da = a || Vb();
        this.xd = lg
    }
    w(R, I);
    R.prototype.Yi = ya.v();
    var lg = k;

    function mg(a, b) {
        switch (a) {
        case 1:
            return b ? "disable" : "enable";
        case 2:
            return b ? "highlight" : "unhighlight";
        case 4:
            return b ? "activate" : "deactivate";
        case 8:
            return b ? "select" : "unselect";
        case 16:
            return b ? "check" : "uncheck";
        case 32:
            return b ? "focus" : "blur";
        case 64:
            return b ? "open" : "close"
        }
        e(Error("Invalid component state"))
    }
    r = R.prototype;
    r.Bc = k;
    r.F = m;
    r.g = k;
    r.xd = k;
    r.i = k;
    r.ba = k;
    r.Y = k;
    r.Pa = k;
    r.Wh = m;

    function ng(a) {
        return a.Bc || (a.Bc = za(a.Yi))
    }

    function og(a, b) {
        if (a.ba && a.ba.Pa) {
            var c = a.ba.Pa,
                d = a.Bc;
            d in c && delete c[d];
            nb(a.ba.Pa, b, a)
        }
        a.Bc = b
    }
    r.a = n("g");

    function S(a) {
        return a.zc || (a.zc = new dd(a))
    }

    function pg(a, b) {
        a == b && e(Error("Unable to set parent component"));
        b && a.ba && a.Bc && qg(a.ba, a.Bc) && a.ba != b && e(Error("Unable to set parent component"));
        a.ba = b;
        R.b.bg.call(a, b)
    }
    r.getParent = n("ba");
    r.bg = function (a) {
        this.ba && this.ba != a && e(Error("Method not supported"));
        R.b.bg.call(this, a)
    };
    r.q = n("Da");
    r.d = function () {
        this.g = this.Da.createElement("div")
    };
    r.X = function (a) {
        rg(this, a)
    };

    function rg(a, b, c) {
        a.F && e(Error("Component already rendered"));
        a.g || a.d();
        b ? b.insertBefore(a.g, c || k) : a.Da.Q.body.appendChild(a.g);
        (!a.ba || a.ba.F) && a.t()
    }
    r.I = function (a) {
        this.F && e(Error("Component already rendered"));
        if (a && this.R(a)) {
            this.Wh = i;
            if (!this.Da || this.Da.Q != Xb(a)) this.Da = Vb(a);
            this.Qa(a);
            this.t()
        } else e(Error("Invalid element to decorate"))
    };
    r.R = p(i);
    r.Qa = da("g");
    r.t = function () {
        this.F = i;
        T(this, function (a) {
            !a.F && a.a() && a.t()
        })
    };
    r.oa = function () {
        T(this, function (a) {
            a.F && a.oa()
        });
        this.zc && this.zc.ub();
        this.F = m
    };
    r.h = function () {
        R.b.h.call(this);
        this.F && this.oa();
        this.zc && (this.zc.j(), delete this.zc);
        T(this, function (a) {
            a.j()
        });
        !this.Wh && this.g && ic(this.g);
        this.ba = this.i = this.g = this.Pa = this.Y = k
    };

    function sg(a, b) {
        return ng(a) + "." + b
    }
    r.z = function (a, b) {
        this.Pc(a, U(this), b)
    };
    r.Pc = function (a, b, c) {
        a.F && (c || !this.F) && e(Error("Component already rendered"));
        (0 > b || b > U(this)) && e(Error("Child component index out of bounds"));
        if (!this.Pa || !this.Y) this.Pa = {}, this.Y = [];
        a.getParent() == this ? (this.Pa[ng(a)] = a, Xa(this.Y, a)) : nb(this.Pa, ng(a), a);
        pg(a, this);
        bb(this.Y, b, 0, a);
        a.F && this.F && a.getParent() == this ? (c = this.J(), c.insertBefore(a.a(), c.childNodes[b] || k)) : c ? (this.g || this.d(), b = this.A(b + 1), rg(a, this.J(), b ? b.g : k)) : this.F && !a.F && a.g && a.t()
    };
    r.J = n("g");

    function tg(a) {
        if (a.xd == k) a.xd = $f(a.F ? a.g : a.Da.Q.body);
        return a.xd
    }
    r.Lc = function (a) {
        this.F && e(Error("Component already rendered"));
        this.xd = a
    };

    function U(a) {
        return a.Y ? a.Y.length : 0
    }

    function qg(a, b) {
        return a.Pa && b ? (b in a.Pa ? a.Pa[b] : h) || k : k
    }
    r.A = function (a) {
        return this.Y ? this.Y[a] || k : k
    };

    function T(a, b, c) {
        a.Y && y(a.Y, b, c)
    }

    function ug(a, b) {
        return a.Y && b ? Sa(a.Y, b) : -1
    }
    r.removeChild = function (a, b) {
        if (a) {
            var c = u(a) ? a : ng(a),
                a = qg(this, c);
            if (c && a) {
                var d = this.Pa;
                c in d && delete d[c];
                Xa(this.Y, a);
                b && (a.oa(), a.g && ic(a.g));
                pg(a, k)
            }
        }
        a || e(Error("Child is not in parent component"));
        return a
    };

    function vg(a, b) {
        R.call(this, b);
        this.pd = ga(a) ? a : "";
        this.Ug = m
    }
    w(vg, R);
    vg.prototype.d = function () {
        this.Qa(this.Da.d("span", h, this.pd))
    };
    vg.prototype.Qa = function (a) {
        vg.b.Qa.call(this, a);
        this.pd = a.firstChild && a.firstChild.nodeValue || "";
        A(a, "au-upldr-label")
    };

    function wg(a, b, c) {
        a.pd = ga(b) ? b : "";
        a.Ug = !!c;
        if (b = a.a()) a.Ug ? b.innerHTML = a.pd : lc(b, a.pd)
    };

    function xg(a, b) {
        a.setAttribute("role", b);
        a.dm = b
    }

    function yg(a, b, c) {
        a.setAttribute("aria-" + b, c)
    };

    function zg() {}
    var Ag;
    t(zg);
    r = zg.prototype;
    r.wa = ca();
    r.d = function (a) {
        var b = a.q().d("div", this.Ra(a).join(" "), a.Ha);
        this.se(a, b);
        return b
    };
    r.J = aa();
    r.Wc = function (a, b, c) {
        if (a = a.a ? a.a() : a)
            if (C && !E("7")) {
                var d = Bg(eb(a), b);
                d.push(b);
                ta(c ? A : gb, a).apply(k, d)
            } else c ? A(a, b) : gb(a, b)
    };
    r.R = p(i);
    r.I = function (a, b) {
        b.id && og(a, b.id);
        var c = this.J(b);
        c && c.firstChild ? Cg(a, c.firstChild.nextSibling ? $a(c.childNodes) : c.firstChild) : a.Ha = k;
        var d = 0,
            f = this.f(),
            g = this.f(),
            j = m,
            l = m,
            c = m,
            o = eb(b);
        y(o, function (a) {
            !j && a == f ? (j = i, g == f && (l = i)) : !l && a == g ? l = i : d |= this.lf(a)
        }, this);
        a.Pb = d;
        j || (o.push(f), g == f && (l = i));
        l || o.push(g);
        var q = a.Ya;
        q && o.push.apply(o, q);
        if (C && !E("7")) {
            var z = Bg(o);
            0 < z.length && (o.push.apply(o, z), c = i)
        }
        if (!j || !l || q || c) b.className = o.join(" ");
        this.se(a, b);
        return b
    };
    r.Dc = function (a) {
        tg(a) && this.Lc(a.a(), i);
        a.isEnabled() && this.wb(a, a.V())
    };
    r.se = function (a, b) {
        a.isEnabled() || this.Ga(b, 1, i);
        V(a, 8) && this.Ga(b, 8, i);
        a.da & 16 && this.Ga(b, 16, V(a, 16));
        a.da & 64 && this.Ga(b, 64, V(a, 64))
    };
    r.yd = function (a, b) {
        fg(a, !b, !C && !Bb)
    };
    r.Lc = function (a, b) {
        this.Wc(a, this.f() + "-rtl", b)
    };
    r.Eb = function (a) {
        var b;
        return a.da & 32 && (b = a.ga()) ? oc(b) : m
    };
    r.wb = function (a, b) {
        var c;
        if (a.da & 32 && (c = a.ga())) {
            if (!b && V(a, 32)) {
                try {
                    c.blur()
                } catch (d) {}
                V(a, 32) && a.$b(k)
            }
            if (oc(c) != b) b ? c.tabIndex = 0 : (c.tabIndex = -1, c.removeAttribute("tabIndex"))
        }
    };
    r.D = function (a, b) {
        Q(a, b)
    };
    r.N = function (a, b, c) {
        var d = a.a();
        if (d) {
            var f = this.dd(b);
            f && this.Wc(a, f, c);
            this.Ga(d, b, c)
        }
    };
    r.Ga = function (a, b, c) {
        Ag || (Ag = {
            1: "disabled",
            8: "selected",
            16: "checked",
            64: "expanded"
        });
        (b = Ag[b]) && yg(a, b, c)
    };
    r.ma = function (a, b) {
        var c = this.J(a);
        if (c && (hc(c), b))
            if (u(b)) lc(c, b);
            else {
                var d = function (a) {
                    if (a) {
                        var b = Xb(c);
                        c.appendChild(u(a) ? b.createTextNode(a) : a)
                    }
                };
                ka(b) ? y(b, d) : la(b) && !("nodeType" in b) ? y($a(b), d) : d(b)
            }
    };
    r.ga = function (a) {
        return a.a()
    };
    r.f = p("goog-control");
    r.Ra = function (a) {
        var b = this.f(),
            c = [b],
            d = this.f();
        d != b && c.push(d);
        b = a.Ia();
        for (d = []; b;) {
            var f = b & -b;
            d.push(this.dd(f));
            b &= ~f
        }
        c.push.apply(c, d);
        (a = a.Ya) && c.push.apply(c, a);
        C && !E("7") && c.push.apply(c, Bg(c));
        return c
    };

    function Bg(a, b) {
        var c = [];
        b && (a = a.concat([b]));
        y([], function (d) {
            Va(d, ta(Wa, a)) && (!b || Wa(d, b)) && c.push(d.join("_"))
        });
        return c
    }
    r.dd = function (a) {
        this.Hd || Dg(this);
        return this.Hd[a]
    };
    r.lf = function (a) {
        if (!this.Jh) {
            this.Hd || Dg(this);
            var b = this.Hd,
                c = {},
                d;
            for (d in b) c[b[d]] = d;
            this.Jh = c
        }
        a = parseInt(this.Jh[a], 10);
        return isNaN(a) ? 0 : a
    };

    function Dg(a) {
        var b = a.f();
        a.Hd = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    };

    function Eg() {}
    w(Eg, zg);
    t(Eg);
    r = Eg.prototype;
    r.wa = p("button");
    r.Ga = function (a, b, c) {
        16 == b ? yg(a, "pressed", c) : Eg.b.Ga.call(this, a, b, c)
    };
    r.d = function (a) {
        var b = Eg.b.d.call(this, a),
            c = a.Db();
        c && this.jb(b, c);
        (c = a.$()) && this.C(b, c);
        a.da & 16 && this.Ga(b, 16, V(a, 16));
        return b
    };
    r.I = function (a, b) {
        var b = Eg.b.I.call(this, a, b),
            c = this.$(b);
        a.zb = c;
        a.mb = this.Db(b);
        a.da & 16 && this.Ga(b, 16, V(a, 16));
        return b
    };
    r.$ = ia;
    r.C = ia;
    r.Db = function (a) {
        return a.title
    };
    r.jb = function (a, b) {
        if (a) a.title = b || ""
    };
    r.f = p("goog-button");

    function Fg(a, b) {
        ma(a) || e(Error("Invalid component class " + a));
        ma(b) || e(Error("Invalid renderer class " + b));
        var c = oa(a);
        Gg[c] = b
    }

    function Hg(a, b) {
        a || e(Error("Invalid class name " + a));
        ma(b) || e(Error("Invalid decorator function " + b));
        Ig[a] = b
    }
    var Gg = {},
        Ig = {};

    function Jg(a, b, c, d, f) {
        if (!C && (!D || !E("525"))) return i;
        if (wb && f) return Kg(a);
        if (f && !d || !c && (17 == b || 18 == b) || C && d && b == a) return m;
        switch (a) {
        case 13:
            return !(C && Qb(9));
        case 27:
            return !D
        }
        return Kg(a)
    }

    function Kg(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || D && 0 == a) return i;
        switch (a) {
        case 32:
        case 63:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
            return i;
        default:
            return m
        }
    };

    function Lg(a, b) {
        a && this.Rb(a, b)
    }
    w(Lg, I);
    r = Lg.prototype;
    r.g = k;
    r.ee = k;
    r.Bf = k;
    r.fe = k;
    r.Gb = -1;
    r.Fb = -1;
    var Mg = {
            3: 13,
            12: 144,
            63232: 38,
            63233: 40,
            63234: 37,
            63235: 39,
            63236: 112,
            63237: 113,
            63238: 114,
            63239: 115,
            63240: 116,
            63241: 117,
            63242: 118,
            63243: 119,
            63244: 120,
            63245: 121,
            63246: 122,
            63247: 123,
            63248: 44,
            63272: 46,
            63273: 36,
            63275: 35,
            63276: 33,
            63277: 34,
            63289: 144,
            63302: 45
        },
        Ng = {
            Up: 38,
            Down: 40,
            Left: 37,
            Right: 39,
            Enter: 13,
            F1: 112,
            F2: 113,
            F3: 114,
            F4: 115,
            F5: 116,
            F6: 117,
            F7: 118,
            F8: 119,
            F9: 120,
            F10: 121,
            F11: 122,
            F12: 123,
            "U+007F": 46,
            Home: 36,
            End: 35,
            PageUp: 33,
            PageDown: 34,
            Insert: 45
        },
        Og = {
            61: 187,
            59: 186
        },
        Pg = C || D && E("525");
    r = Lg.prototype;
    r.Ri = function (a) {
        if (D && (17 == this.Gb && !a.ctrlKey || 18 == this.Gb && !a.altKey)) this.Fb = this.Gb = -1;
        Pg && !Jg(a.keyCode, this.Gb, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.Fb = Cb && a.keyCode in Og ? Og[a.keyCode] : a.keyCode
    };
    r.Si = function () {
        this.Fb = this.Gb = -1
    };
    r.handleEvent = function (a) {
        var b = a.fa,
            c, d;
        C && "keypress" == a.type ? (c = this.Fb, d = 13 != c && 27 != c ? b.keyCode : 0) : D && "keypress" == a.type ? (c = this.Fb, d = 0 <= b.charCode && 63232 > b.charCode && Kg(c) ? b.charCode : 0) : Bb ? (c = this.Fb, d = Kg(c) ? b.keyCode : 0) : (c = b.keyCode || this.Fb, d = b.charCode || 0, wb && 63 == d && !c && (c = 191));
        var f = c,
            g = b.keyIdentifier;
        c ? 63232 <= c && c in Mg ? f = Mg[c] : 25 == c && a.shiftKey && (f = 9) : g && g in Ng && (f = Ng[g]);
        a = f == this.Gb;
        this.Gb = f;
        b = new Qg(f, d, a, b);
        try {
            this.dispatchEvent(b)
        } finally {
            b.j()
        }
    };
    r.a = n("g");
    r.Rb = function (a, b) {
        this.fe && this.detach();
        this.g = a;
        this.ee = H(this.g, "keypress", this, b);
        this.Bf = H(this.g, "keydown", this.Ri, b, this);
        this.fe = H(this.g, "keyup", this.Si, b, this)
    };
    r.detach = function () {
        if (this.ee) Tc(this.ee), Tc(this.Bf), Tc(this.fe), this.fe = this.Bf = this.ee = k;
        this.g = k;
        this.Fb = this.Gb = -1
    };
    r.h = function () {
        Lg.b.h.call(this);
        this.detach()
    };

    function Qg(a, b, c, d) {
        d && this.md(d, h);
        this.type = "key";
        this.keyCode = a;
        this.charCode = b;
        this.repeat = c
    }
    w(Qg, Hc);

    function W(a, b, c) {
        R.call(this, c);
        if (!b) {
            for (var b = this.constructor, d; b;) {
                d = oa(b);
                if (d = Gg[d]) break;
                b = b.b ? b.b.constructor : k
            }
            b = d ? ma(d.v) ? d.v() : new d : k
        }
        this.w = b;
        this.Ha = a
    }
    w(W, R);
    r = W.prototype;
    r.Ha = k;
    r.Pb = 0;
    r.da = 39;
    r.Qc = 255;
    r.we = 0;
    r.ka = i;
    r.Ya = k;
    r.qf = i;
    r.Gd = m;
    r.oe = k;
    r.Zg = n("qf");

    function Rg(a, b) {
        a.F && b != a.qf && Sg(a, b);
        a.qf = b
    }
    r.ga = function () {
        return this.w.ga(this)
    };
    r.Vd = function () {
        return this.Ua || (this.Ua = new Lg)
    };
    r.Wc = function (a, b) {
        if (b) {
            if (a) this.Ya ? Wa(this.Ya, a) || this.Ya.push(a) : this.Ya = [a], this.w.Wc(this, a, i)
        } else if (a && this.Ya) {
            Xa(this.Ya, a);
            if (0 == this.Ya.length) this.Ya = k;
            this.w.Wc(this, a, m)
        }
    };
    r.d = function () {
        var a = this.w.d(this);
        this.g = a;
        var b = this.oe || this.w.wa();
        b && xg(a, b);
        this.Gd || this.w.yd(a, m);
        this.V() || this.w.D(a, m)
    };
    r.J = function () {
        return this.w.J(this.a())
    };
    r.R = function (a) {
        return this.w.R(a)
    };
    r.Qa = function (a) {
        this.g = a = this.w.I(this, a);
        var b = this.oe || this.w.wa();
        b && xg(a, b);
        this.Gd || this.w.yd(a, m);
        this.ka = "none" != a.style.display
    };
    r.t = function () {
        W.b.t.call(this);
        this.w.Dc(this);
        if (this.da & -2 && (this.Zg() && Sg(this, i), this.da & 32)) {
            var a = this.ga();
            if (a) {
                var b = this.Vd();
                b.Rb(a);
                S(this).c(b, "key", this.Sa).c(a, "focus", this.ac).c(a, "blur", this.$b)
            }
        }
    };

    function Sg(a, b) {
        var c = S(a),
            d = a.a();
        b ? (c.c(d, "mouseover", a.Ac).c(d, "mousedown", a.bc).c(d, "mouseup", a.cc).c(d, "mouseout", a.rf), C && c.c(d, "dblclick", a.Og)) : (c.ja(d, "mouseover", a.Ac).ja(d, "mousedown", a.bc).ja(d, "mouseup", a.cc).ja(d, "mouseout", a.rf), C && c.ja(d, "dblclick", a.Og))
    }
    r.oa = function () {
        W.b.oa.call(this);
        this.Ua && this.Ua.detach();
        this.V() && this.isEnabled() && this.w.wb(this, m)
    };
    r.h = function () {
        W.b.h.call(this);
        this.Ua && (this.Ua.j(), delete this.Ua);
        delete this.w;
        this.Ya = this.Ha = k
    };
    r.ma = function (a) {
        this.w.ma(this.a(), a);
        this.Ha = a
    };

    function Cg(a, b) {
        a.Ha = b
    }
    r.vc = function () {
        var a = this.Ha;
        if (!a) return "";
        if (!u(a))
            if (ka(a)) a = Ta(a, pc).join("");
            else {
                if (Tb && "innerText" in a) a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n");
                else {
                    var b = [];
                    qc(a, b, i);
                    a = b.join("")
                }
                a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
                a = a.replace(/\u200B/g, "");
                Tb || (a = a.replace(/ +/g, " "));
                " " != a && (a = a.replace(/^\s*/, ""))
            }
        return Ea(a)
    };
    r.Lc = function (a) {
        W.b.Lc.call(this, a);
        var b = this.a();
        b && this.w.Lc(b, a)
    };
    r.yd = function (a) {
        this.Gd = a;
        var b = this.a();
        b && this.w.yd(b, a)
    };
    r.V = n("ka");
    r.D = function (a, b) {
        if (b || this.ka != a && this.dispatchEvent(a ? "show" : "hide")) {
            var c = this.a();
            c && this.w.D(c, a);
            this.isEnabled() && this.w.wb(this, a);
            this.ka = a;
            return i
        }
        return m
    };
    r.isEnabled = function () {
        return !V(this, 1)
    };
    r.za = function (a) {
        var b = this.getParent();
        if ((!b || "function" != typeof b.isEnabled || b.isEnabled()) && Tg(this, 1, !a)) a || (this.setActive(m), this.Ma(m)), this.V() && this.w.wb(this, a), this.N(1, !a)
    };
    r.Ma = function (a) {
        Tg(this, 2, a) && this.N(2, a)
    };
    r.od = function () {
        return V(this, 4)
    };
    r.setActive = function (a) {
        Tg(this, 4, a) && this.N(4, a)
    };
    r.Nb = function (a) {
        Tg(this, 8, a) && this.N(8, a)
    };
    r.ca = function (a) {
        Tg(this, 64, a) && this.N(64, a)
    };
    r.Ia = n("Pb");

    function V(a, b) {
        return !!(a.Pb & b)
    }
    r.N = function (a, b) {
        if (this.da & a && b != V(this, a)) this.w.N(this, a, b), this.Pb = b ? this.Pb | a : this.Pb & ~a
    };

    function Ug(a, b, c) {
        a.F && V(a, b) && !c && e(Error("Component already rendered"));
        !c && V(a, b) && a.N(b, m);
        a.da = c ? a.da | b : a.da & ~b
    }

    function Vg(a, b) {
        return !!(a.Qc & b) && !!(a.da & b)
    }

    function Wg(a, b, c) {
        a.we = c ? a.we | b : a.we & ~b
    }

    function Tg(a, b, c) {
        return !!(a.da & b) && V(a, b) != c && (!(a.we & b) || a.dispatchEvent(mg(b, c))) && !a.Rd
    }
    r.Ac = function (a) {
        (!a.relatedTarget || !kc(this.a(), a.relatedTarget)) && this.dispatchEvent("enter") && this.isEnabled() && Vg(this, 2) && this.Ma(i)
    };
    r.rf = function (a) {
        if ((!a.relatedTarget || !kc(this.a(), a.relatedTarget)) && this.dispatchEvent("leave")) Vg(this, 4) && this.setActive(m), Vg(this, 2) && this.Ma(m)
    };
    r.bc = function (a) {
        this.isEnabled() && (Vg(this, 2) && this.Ma(i), Jc(a) && (Vg(this, 4) && this.setActive(i), this.w.Eb(this) && this.ga().focus()));
        !this.Gd && Jc(a) && a.preventDefault()
    };
    r.cc = function (a) {
        this.isEnabled() && (Vg(this, 2) && this.Ma(i), this.od() && this.Hb(a) && Vg(this, 4) && this.setActive(m))
    };
    r.Og = function (a) {
        this.isEnabled() && this.Hb(a)
    };
    r.Hb = function (a) {
        if (Vg(this, 16)) {
            var b = !V(this, 16);
            Tg(this, 16, b) && this.N(16, b)
        }
        Vg(this, 8) && this.Nb(i);
        Vg(this, 64) && this.ca(!V(this, 64));
        b = new G("action", this);
        if (a) b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.Tf = a.Tf;
        return this.dispatchEvent(b)
    };
    r.ac = function () {
        Vg(this, 32) && Tg(this, 32, i) && this.N(32, i)
    };
    r.$b = function () {
        Vg(this, 4) && this.setActive(m);
        Vg(this, 32) && Tg(this, 32, m) && this.N(32, m)
    };
    r.Sa = function (a) {
        return this.V() && this.isEnabled() && this.Za(a) ? (a.preventDefault(), a.stopPropagation(), i) : m
    };
    r.Za = function (a) {
        return 13 == a.keyCode && this.Hb(a)
    };
    Fg(W, zg);
    Hg("goog-control", function () {
        return new W(k)
    });

    function Xg() {}
    w(Xg, Eg);
    t(Xg);
    r = Xg.prototype;
    r.wa = ca();
    r.d = function (a) {
        Yg(a);
        return a.q().d("button", {
            "class": this.Ra(a).join(" "),
            disabled: !a.isEnabled(),
            title: a.Db() || "",
            value: a.$() || ""
        }, a.vc() || "")
    };
    r.R = function (a) {
        return "BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
    };
    r.I = function (a, b) {
        Yg(a);
        b.disabled && A(b, this.dd(1));
        return Xg.b.I.call(this, a, b)
    };
    r.Dc = function (a) {
        S(a).c(a.a(), "click", a.Hb)
    };
    r.yd = ia;
    r.Lc = ia;
    r.Eb = function (a) {
        return a.isEnabled()
    };
    r.wb = ia;
    r.N = function (a, b, c) {
        Xg.b.N.call(this, a, b, c);
        if ((a = a.a()) && 1 == b) a.disabled = c
    };
    r.$ = function (a) {
        return a.value
    };
    r.C = function (a, b) {
        if (a) a.value = b
    };
    r.Ga = ia;

    function Yg(a) {
        Rg(a, m);
        a.Qc &= -256;
        Ug(a, 32, m)
    };

    function X(a, b, c) {
        W.call(this, a, b || Xg.v(), c)
    }
    w(X, W);
    r = X.prototype;
    r.$ = n("zb");
    r.C = function (a) {
        this.zb = a;
        this.w.C(this.a(), a)
    };
    r.Db = n("mb");
    r.jb = function (a) {
        this.mb = a;
        this.w.jb(this.a(), a)
    };
    r.h = function () {
        X.b.h.call(this);
        delete this.zb;
        delete this.mb
    };
    r.t = function () {
        X.b.t.call(this);
        if (this.da & 32) {
            var a = this.ga();
            a && S(this).c(a, "keyup", this.Za)
        }
    };
    r.Za = function (a) {
        return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.Hb(a) : 32 == a.keyCode
    };
    Hg("goog-button", function () {
        return new X(k)
    });

    function Zg() {}
    w(Zg, Eg);
    t(Zg);
    r = Zg.prototype;
    r.J = aa();
    r.d = function (a) {
        var b = {
            "class": "goog-inline-block " + this.Ra(a).join(" "),
            title: a.Db() || ""
        };
        return a.q().d("div", b, a.Ha)
    };
    r.R = function (a) {
        return "DIV" == a.tagName
    };
    r.I = function (a, b) {
        A(b, "goog-inline-block", this.f());
        return Zg.b.I.call(this, a, b)
    };
    r.f = p("goog-css3-button");
    Hg("goog-css3-button", function () {
        return new X(k, Zg.v())
    });
    Hg("goog-css3-toggle-button", function () {
        var a = new X(k, Zg.v());
        Ug(a, 16, i);
        return a
    });

    function $g() {}
    w($g, I);
    r = $g.prototype;
    r.zb = 0;
    r.$a = 0;
    r.hb = 100;
    r.fb = 0;
    r.ig = 1;
    r.qb = m;
    r.Lf = m;
    r.C = function (a) {
        a = ah(this, a);
        if (this.zb != a) this.zb = a + this.fb > this.hb ? this.hb - this.fb : a < this.$a ? this.$a : a, !this.qb && !this.Lf && this.dispatchEvent("change")
    };
    r.$ = function () {
        return ah(this, this.zb)
    };
    r.zd = function (a) {
        if (this.$a != a) {
            var b = this.qb;
            this.qb = i;
            this.$a = a;
            if (a + this.fb > this.hb) this.fb = this.hb - this.$a;
            a > this.zb && this.C(a);
            if (a > this.hb) this.fb = 0, this.Mb(a), this.C(a);
            this.qb = b;
            !this.qb && !this.Lf && this.dispatchEvent("change")
        }
    };
    r.Wd = function () {
        return ah(this, this.$a)
    };
    r.Mb = function (a) {
        a = ah(this, a);
        if (this.hb != a) {
            var b = this.qb;
            this.qb = i;
            this.hb = a;
            a < this.zb + this.fb && this.C(a - this.fb);
            if (a < this.$a) this.fb = 0, this.zd(a), this.C(this.hb);
            if (a < this.$a + this.fb) this.fb = this.hb - this.$a;
            this.qb = b;
            !this.qb && !this.Lf && this.dispatchEvent("change")
        }
    };
    r.xc = function () {
        return ah(this, this.hb)
    };

    function ah(a, b) {
        return a.ig == k ? b : a.$a + Math.round((b - a.$a) / a.ig) * a.ig
    };

    function bh(a) {
        R.call(this, a);
        this.Jb = new $g;
        H(this.Jb, "change", this.Mi, m, this)
    }
    w(bh, R);
    var ch = {
        vertical: "progress-bar-vertical",
        horizontal: "progress-bar-horizontal"
    };
    r = bh.prototype;
    r.d = function () {
        this.Na = dh(this);
        var a = ch[this.ya];
        this.g = this.q().d("div", a, this.Na);
        eh(this);
        fh(this);
        gh(this)
    };
    r.t = function () {
        bh.b.t.call(this);
        C && 7 > Gb && H(this.a(), "resize", this.Ed, m, this);
        this.Ed();
        xg(this.a(), "progressbar");
        yg(this.a(), "live", "polite")
    };
    r.oa = function () {
        bh.b.oa.call(this);
        hh(this)
    };

    function dh(a) {
        return a.q().d("div", "progress-bar-thumb")
    }

    function hh(a) {
        C && 7 > Gb && Rc(a.a(), "resize", a.Ed, m, a)
    }
    r.Qa = function (a) {
        bh.b.Qa.call(this, a);
        A(this.a(), ch[this.ya]);
        a = Zb(document, k, "progress-bar-thumb", this.a())[0];
        a || (a = dh(this), this.a().appendChild(a));
        this.Na = a
    };
    r.$ = function () {
        return this.Jb.$()
    };
    r.C = function (a) {
        this.Jb.C(a);
        this.a() && eh(this)
    };

    function eh(a) {
        yg(a.a(), "valuenow", a.$())
    }
    r.Wd = function () {
        return this.Jb.Wd()
    };
    r.zd = function (a) {
        this.Jb.zd(a);
        this.a() && fh(this)
    };

    function fh(a) {
        yg(a.a(), "valuemin", a.Wd())
    }
    r.xc = function () {
        return this.Jb.xc()
    };
    r.Mb = function (a) {
        this.Jb.Mb(a);
        this.a() && gh(this)
    };

    function gh(a) {
        yg(a.a(), "valuemax", a.xc())
    }
    r.ya = "horizontal";
    r.Mi = function () {
        this.Ed();
        this.dispatchEvent("change")
    };
    r.Ed = function () {
        if (this.Na) {
            var a = this.Wd(),
                b = this.xc(),
                a = (this.$() - a) / (b - a),
                b = Math.round(100 * a);
            "vertical" == this.ya ? C && 7 > Gb ? (this.Na.style.top = 0, this.Na.style.height = "100%", b = this.Na.offsetHeight, a = Math.round(a * b), this.Na.style.top = b - a + "px", this.Na.style.height = a + "px") : (this.Na.style.top = 100 - b + "%", this.Na.style.height = b + "%") : this.Na.style.width = b + "%"
        }
    };
    r.ag = function (a) {
        if (this.ya != a) {
            var b = ch[this.ya],
                c = ch[a];
            this.ya = a;
            if (this.a()) {
                for (var a = this.a(), d = eb(a), f = m, g = 0; g < d.length; g++) d[g] == b && (bb(d, g--, 1), f = i);
                if (f) d.push(c), a.className = d.join(" ");
                b = this.Na.style;
                "vertical" == this.ya ? (b.left = 0, b.width = "100%") : (b.top = b.left = 0, b.height = "100%");
                this.Ed()
            }
        }
    };
    r.h = function () {
        hh(this);
        bh.b.h.call(this);
        this.Na = k;
        this.Jb.j()
    };

    function ih(a, b) {
        R.call(this, b);
        this.i = a
    }
    w(ih, R);
    r = ih.prototype;
    r.f = p("au-upldr-status-pane");
    r.d = function () {
        var a = this.q(),
            b = a.d("div", [this.f(), "statusBar"].join(" "));
        this.g = b;
        var c = this.tb = new bh;
        c.Mb(100);
        c.zd(0);
        this.z(c, i);
        A(c.a(), "uploadProgressBar");
        var d, f = a.d("div", k, c = a.d("div"), d = a.d("div"));
        this.ad = new vg;
        this.z(this.ad, m);
        this.ad.X(c);
        A(this.ad.a(), "statusBarText0");
        a = a.createElement("br");
        c.appendChild(a);
        this.Ub = new vg;
        this.z(this.Ub, m);
        this.Ub.X(c);
        A(this.Ub.a(), "statusBarText1");
        this.Xa = new X("", Zg.v());
        this.z(this.Xa, m);
        this.Xa.X(d);
        A(this.Xa.a(), "sendButton");
        this.Ge();
        b.appendChild(f)
    };
    r.t = function () {
        ih.b.t.call(this);
        var a = this.i,
            b = a.o;
        Y(b, "UploaderState", this.Ge, this);
        Y(b, "UploadButtonText", this.Ge, this);
        Y(b, "CancelUploadButtonText", this.Ge, this);
        Y(b, "FilesToUploadText", this.Dd, this);
        Y(b, "NoFilesToUploadText", this.Dd, this);
        Y(b, "UploadProgress", this.hk, this);
        b = S(this);
        b.c(this.Xa, "action", this.xj);
        b.c(a.la(), ad, this.Dd)
    };
    r.Ge = function () {
        var a = this.i.o;
        switch (J(a, "UploaderState")) {
        case 0:
            Q(this.tb.a(), m);
            Q(this.Ub.a(), m);
            a = J(a, "UploadButtonText");
            this.Xa.ma(a);
            jb(this.Xa.a(), "cancelButton", "sendButton");
            this.Dd();
            break;
        case 1:
            Q(this.tb.a(), m);
            Q(this.Ub.a(), m);
            a = J(a, "UploadButtonText");
            this.Xa.ma(a);
            jb(this.Xa.a(), "cancelButton", "sendButton");
            this.Dd();
            break;
        case 2:
            Q(this.tb.a(), i), Q(this.Ub.a(), i), a = J(a, "CancelUploadButtonText"), this.Xa.ma(a), this.Xa.za(i), jb(this.Xa.a(), "sendButton", "cancelButton")
        }
    };
    r.hk = function () {
        var a = this.i.o;
        if (2 == J(a, "UploaderState")) {
            var b = J(a, "UploadProgress");
            this.tb.C(b.Sf);
            var c = J(a, "StatusPaneFilesUploadedText"),
                c = K(c, b.gb, b.Wa);
            wg(this.ad, c);
            c = J(a, "StatusPaneDataUploadedText");
            a = Cd(b.ha);
            b = Cd(b.Aa);
            c = K(c, a, b);
            wg(this.Ub, c)
        }
    };
    r.Dd = function () {
        var a = this.i,
            b = a.o;
        switch (J(b, "UploaderState")) {
        case 0:
            b = J(b, "NoFilesToUploadText");
            a = m;
            break;
        case 1:
            b = J(b, "FilesToUploadText");
            b = K(b, a.la().Z());
            a = i;
            break;
        default:
            return
        }
        wg(this.ad, b, i);
        this.Xa.za(a)
    };
    r.xj = function () {
        var a = this.i;
        switch (J(a.o, "UploaderState")) {
        case 1:
            a.upload();
            break;
        case 2:
            jh(a, h) && a.Vb(9, -1, "", J(a.o, "UploadCancelledByUserMessage"))
        }
    };
    r.R = gd;

    function kh(a, b) {
        this.r = new dd(this);
        this.Zf(a || k);
        if (b) this.Mc = b
    }
    w(kh, I);
    r = kh.prototype;
    r.g = k;
    r.rg = i;
    r.qg = k;
    r.Fc = m;
    r.Yj = m;
    r.Ff = -1;
    r.$g = -1;
    r.Sg = m;
    r.pi = i;
    r.Mc = "toggle_display";
    r.mf = n("Mc");
    r.a = n("g");
    r.Zf = function (a) {
        lh(this);
        this.g = a
    };

    function mh(a) {
        lh(a);
        a.rg = m
    }

    function nh(a, b) {
        lh(a);
        a.Sg = b
    }

    function lh(a) {
        a.Fc && e(Error("Can not change this state of the popup while showing."))
    }
    r.V = n("Fc");
    r.D = function (a) {
        this.Ad && this.Ad.stop();
        this.kd && this.kd.stop();
        if (a) {
            if (!this.Fc && this.Nf()) {
                this.g || e(Error("Caller must call setElement before trying to show the popup"));
                this.La();
                a = Xb(this.g);
                this.Sg && this.r.c(a, "keydown", this.nj, i);
                if (this.rg)
                    if (this.r.c(a, "mousedown", this.nh, i), C) {
                        var b;
                        try {
                            b = a.activeElement
                        } catch (c) {}
                        for (; b && "IFRAME" == b.nodeName;) {
                            try {
                                var d = b.contentDocument || b.contentWindow.document
                            } catch (f) {
                                break
                            }
                            a = d;
                            b = a.activeElement
                        }
                        this.r.c(a, "mousedown", this.nh, i);
                        this.r.c(a, "deactivate",
                            this.mh)
                    } else this.r.c(a, "blur", this.mh);
                    "toggle_display" == this.Mc ? (this.g.style.visibility = "visible", Q(this.g, i)) : "move_offscreen" == this.Mc && this.La();
                this.Fc = i;
                this.Ad ? (Qc(this.Ad, "end", this.oh, m, this), this.Ad.play()) : this.oh()
            }
        } else oh(this)
    };
    r.La = ia;

    function oh(a, b) {
        if (!a.Fc || !a.dispatchEvent({
            type: "beforehide",
            target: b
        })) return m;
        a.r && a.r.ub();
        a.kd ? (Qc(a.kd, "end", ta(a.zg, b), m, a), a.kd.play()) : a.zg(b);
        return i
    }
    r.zg = function (a) {
        if ("toggle_display" == this.Mc) this.Yj ? cf(this.Tg, 0, this) : this.Tg();
        else if ("move_offscreen" == this.Mc) this.g.style.left = "-200px", this.g.style.top = "-200px";
        this.Fc = m;
        this.Of(a)
    };
    r.Tg = function () {
        this.g.style.visibility = "hidden";
        Q(this.g, m)
    };
    r.Nf = function () {
        return this.dispatchEvent("beforeshow")
    };
    r.oh = function () {
        this.Ff = va();
        this.$g = -1;
        this.dispatchEvent("show")
    };
    r.Of = function (a) {
        this.$g = va();
        this.dispatchEvent({
            type: "hide",
            target: a
        })
    };
    r.nh = function (a) {
        a = a.target;
        !kc(this.g, a) && (!this.qg || kc(this.qg, a)) && !(150 > va() - this.Ff) && oh(this, a)
    };
    r.nj = function (a) {
        27 == a.keyCode && oh(this, a.target) && (a.preventDefault(), a.stopPropagation())
    };
    r.mh = function (a) {
        if (this.pi) {
            var b = Xb(this.g);
            if (C || Bb) {
                if (a = b.activeElement, !a || kc(this.g, a) || "BODY" == a.tagName) return
            } else if (a.target != b) return;
            150 > va() - this.Ff || oh(this)
        }
    };
    r.h = function () {
        kh.b.h.call(this);
        this.r.j();
        Fc(this.Ad);
        Fc(this.kd);
        delete this.g;
        delete this.r
    };

    function ph(a, b, c, d, f, g, j, l) {
        var o, q = c.offsetParent;
        if (q) {
            var z = "HTML" == q.tagName || "BODY" == q.tagName;
            if (!z || "static" != Sf(q, "position")) o = Zf(q), z || (o = Ub(o, new F(q.scrollLeft, q.scrollTop)))
        }
        q = dg(a);
        (z = Yf(a)) && q.Wg(new Of(z.left, z.top, z.right - z.left, z.bottom - z.top));
        var z = Vb(a),
            B = Vb(c);
        if (z.Q != B.Q) {
            var ba = z.Q.body,
                B = B.Q.parentWindow || B.Q.defaultView,
                O = new F(0, 0),
                hb = Xb(ba) ? Xb(ba).parentWindow || Xb(ba).defaultView : window,
                rc = ba;
            do {
                var ua;
                if (hb == B) ua = Zf(rc);
                else {
                    var Z = rc;
                    ua = new F;
                    if (1 == Z.nodeType)
                        if (Z.getBoundingClientRect) Z =
                            Wf(Z), ua.x = Z.left, ua.y = Z.top;
                        else {
                            var Pb = uc(Vb(Z)),
                                Z = Zf(Z);
                            ua.x = Z.x - Pb.x;
                            ua.y = Z.y - Pb.y
                        } else {
                        var Pb = ma(Z.si),
                            ld = Z;
                        Z.targetTouches ? ld = Z.targetTouches[0] : Pb && Z.fa.targetTouches && (ld = Z.fa.targetTouches[0]);
                        ua.x = ld.clientX;
                        ua.y = ld.clientY
                    }
                }
                O.x += ua.x;
                O.y += ua.y
            } while (hb && hb != B && (rc = hb.frameElement) && (hb = hb.parent));
            ba = Ub(O, Zf(ba));
            C && !tc(z) && (ba = Ub(ba, uc(z)));
            q.left += ba.x;
            q.top += ba.y
        }
        a = (b & 4 && $f(a) ? b ^ 2 : b) & -5;
        b = new F(a & 2 ? q.left + q.width : q.left, a & 1 ? q.top + q.height : q.top);
        o && (b = Ub(b, o));
        f && (b.x += (a & 2 ? -1 : 1) * f.x,
            b.y += (a & 1 ? -1 : 1) * f.y);
        var Za;
        if (j && (Za = Yf(c)) && o) Za.top -= o.y, Za.right -= o.x, Za.bottom -= o.y, Za.left -= o.x;
        return qh(b, c, d, g, Za, j, l)
    }

    function qh(a, b, c, d, f, g, j) {
        var a = a.va(),
            l = 0,
            o = (c & 4 && $f(b) ? c ^ 2 : c) & -5,
            c = bg(b),
            j = j ? j.va() : c.va();
        if (d || 0 != o) o & 2 ? a.x -= j.width + (d ? d.right : 0) : d && (a.x += d.left), o & 1 ? a.y -= j.height + (d ? d.bottom : 0) : d && (a.y += d.top);
        if (g) {
            if (f) {
                l = a;
                d = 0;
                if (65 == (g & 65) && (l.x < f.left || l.x >= f.right)) g &= -2;
                if (132 == (g & 132) && (l.y < f.top || l.y >= f.bottom)) g &= -5;
                if (l.x < f.left && g & 1) l.x = f.left, d |= 1;
                if (l.x < f.left && l.x + j.width > f.right && g & 16) j.width = Math.max(j.width - (l.x + j.width - f.right), 0), d |= 4;
                if (l.x + j.width > f.right && g & 1) l.x = Math.max(f.right - j.width,
                    f.left), d |= 1;
                g & 2 && (d |= (l.x < f.left ? 16 : 0) | (l.x + j.width > f.right ? 32 : 0));
                if (l.y < f.top && g & 4) l.y = f.top, d |= 2;
                if (l.y >= f.top && l.y + j.height > f.bottom && g & 32) j.height = Math.max(j.height - (l.y + j.height - f.bottom), 0), d |= 8;
                if (l.y + j.height > f.bottom && g & 4) l.y = Math.max(f.bottom - j.height, f.top), d |= 2;
                g & 8 && (d |= (l.y < f.top ? 64 : 0) | (l.y + j.height > f.bottom ? 128 : 0));
                l = d
            } else l = 256; if (l & 496) return l
        }
        Tf(b, a);
        if (!(c == j || (!c || !j ? 0 : c.width == j.width && c.height == j.height))) f = tc(Vb(Xb(b))), C && (!f || !E("8")) ? (a = b.style, f ? (f = hg(b, "padding"), b =
            kg(b), a.pixelWidth = j.width - b.left - f.left - f.right - b.right, a.pixelHeight = j.height - b.top - f.top - f.bottom - b.bottom) : (a.pixelWidth = j.width, a.pixelHeight = j.height)) : (b = b.style, Cb ? b.MozBoxSizing = "border-box" : D ? b.WebkitBoxSizing = "border-box" : b.boxSizing = "border-box", b.width = Math.max(j.width, 0) + "px", b.height = Math.max(j.height, 0) + "px");
        return l
    };

    function rh(a, b) {
        R.call(this, b);
        this.i = a
    }
    w(rh, R);
    r = rh.prototype;
    r.f = p("au-upldr-progress-dialog");
    r.d = function () {
        var a = this.i.o,
            b = this.q(),
            c = b.d("div", this.f());
        A(c, "waitWindowPanel");
        this.g = c;
        Q(c, m);
        var d = this.Fa = new kh(c);
        d.D(m);
        nh(d, m);
        mh(d);
        var f = new vg(J(a, "AddFilesProgressDialogText"));
        this.z(f, i);
        Y(a, "AddFilesProgressDialogText", function () {
            wg(f, J(a, "AddFilesProgressDialogText"))
        });
        d = this.tb = new bh;
        d.Mb(100);
        d.zd(0);
        this.z(d, i);
        A(d.a(), "waitWindowProgressBar");
        d = b.createElement("div");
        b.appendChild(c, d);
        b = this.nc = new X(J(a, "CommonDialogCancelButtonText"), Zg.v());
        this.z(b, m);
        b.X(d);
        Y(a, "CommonDialogCancelButtonText",
            function () {
                this.nc.ma(J(a, "CommonDialogCancelButtonText"))
            }, this)
    };
    r.t = function () {
        rh.b.t.call(this);
        S(this).c(this.Fa, "hide", this.td).c(this.Fa, "show", this.ud).c(this.nc, "action", this.mi).c(this.nc, "action", this.Ta)
    };
    r.show = function () {
        this.Fa.D(i)
    };
    r.Ta = function () {
        this.Fa.D(m)
    };
    r.Mb = function (a) {
        this.tb.Mb(a)
    };
    r.xc = function () {
        return this.tb.xc()
    };
    r.$ = function () {
        return this.tb.$()
    };
    r.C = function (a) {
        this.tb.C(a)
    };
    r.td = function () {
        this.dispatchEvent(sh)
    };
    r.ud = function () {
        this.dispatchEvent(th)
    };
    r.mi = function () {
        this.dispatchEvent(uh)
    };
    r.R = gd;
    r.e = N("au.upldr.ui.ProgressDialog");
    var th = "show",
        sh = "hide",
        uh = "cancel";

    function vh(a, b) {
        R.call(this, b);
        this.i = a;
        this.Jd = new X("X", Zg.v());
        this.z(this.Jd);
        this.ge = new vg;
        this.z(this.ge);
        S(this).c(this.Jd, "action", this.Ta).c(a.rd, ad, this.jj);
        this.ka = i;
        this.De = 1E4
    }
    w(vh, R);
    r = vh.prototype;
    r.f = p("au-upldr-information-bar");
    r.d = function () {
        var a = this.q().d("div", this.f());
        A(a, "informationBar");
        this.g = a;
        this.Jd.X(a);
        A(this.Jd.a(), "informationBarCloseButton");
        this.ge.X(a);
        A(this.ge.a(), "informationBarText");
        this.Ta()
    };
    r.t = function () {
        vh.b.t.call(this);
        this.Wl = bg(this.a()).height
    };
    r.R = gd;
    r.Ta = function () {
        this.sa && (clearTimeout(this.sa), delete this.sa);
        this.ka = m;
        this.a() && A(this.a(), "au-upldr-information-bar-collapsed");
        var a = wh(this);
        a != k && pd(v(this.show, this, a), 100)
    };
    r.show = function (a) {
        if (a != k && "" !== (a += "")) M(this.e, 'Show message: "' + a + '"'), this.ka = i, wg(this.ge, a), this.a() && gb(this.a(), "au-upldr-information-bar-collapsed"), this.sa = pd(this.Ta, this.De, this)
    };
    r.jj = function (a) {
        !this.ka && "add" == a.Df && (M(this.e, "New notifications added: [" + this.i.rd.Z() + "]"), this.show(wh(this)))
    };

    function wh(a) {
        var a = a.i.rd,
            b;
        0 < a.Z() && (b = a.getItem(0), a.Kb(0));
        return b
    }
    r.e = N("au.upldr.ui.InformationBar");

    function xh() {}
    xh.prototype.La = ca();

    function yh(a, b) {
        this.Ue = a instanceof F ? a : new F(a, b)
    }
    w(yh, xh);
    yh.prototype.La = function (a, b, c, d) {
        ph(Vf(a), 0, a, b, this.Ue, c, k, d)
    };

    function zh(a, b, c) {
        this.element = a;
        this.Uc = b;
        this.Aj = c
    }
    w(zh, xh);
    zh.prototype.La = function (a, b, c) {
        ph(this.element, this.Uc, a, b, h, c, this.Aj)
    };

    function Ah(a, b, c) {
        zh.call(this, a, b);
        this.ah = c ? 5 : 0
    }
    w(Ah, zh);
    Ah.prototype.La = function (a, b, c, d) {
        var f = ph(this.element, this.Uc, a, b, k, c, 10, d);
        if (f & 496) {
            var g = Bh(f, this.Uc),
                b = Bh(f, b),
                f = ph(this.element, g, a, b, k, c, 10, d);
            f & 496 && (g = Bh(f, g), b = Bh(f, b), ph(this.element, g, a, b, k, c, this.ah, d))
        }
    };

    function Bh(a, b) {
        a & 48 && (b ^= 2);
        a & 192 && (b ^= 1);
        return b
    };

    function Ch(a, b) {
        this.rh = 4;
        this.Uf = b || h;
        kh.call(this, a)
    }
    w(Ch, kh);

    function Dh(a) {
        a.rh = 0;
        a.V() && a.La()
    }
    Ch.prototype.cg = function (a) {
        this.Uf = a || h;
        this.V() && this.La()
    };
    Ch.prototype.La = function () {
        if (this.Uf) {
            var a = !this.V() && "move_offscreen" != this.mf(),
                b = this.a();
            if (a) b.style.visibility = "hidden", Q(b, i);
            this.Uf.La(b, this.rh, this.Zl);
            a && Q(b, m)
        }
    };

    function Eh(a, b) {
        R.call(this, b);
        this.xa = k;
        this.i = a
    }
    w(Eh, R);
    r = Eh.prototype;
    r.f = p("au-upldr-description-editor");
    r.d = function () {
        var a = this.i,
            b = this.q();
        this.yb = b.d("textarea", {
            rows: 3,
            cols: 25
        });
        A(this.yb, "descriptionEditorTextBox");
        var c = b.d("div", this.f(), this.yb);
        A(c, "descriptionEditorWindow");
        this.g = c;
        Q(c, m);
        var d = this.Fa = new Ch(c);
        d.D(m);
        nh(d, i);
        Dh(d);
        d = b.createElement("div");
        b.appendChild(c, d);
        b = Zg.v();
        c = this.je = new X(J(a, "DescriptionEditorSaveButtonText"), b);
        this.z(c, m);
        c.X(d);
        Y(a, "DescriptionEditorSaveButtonText", function () {
            this.je.ma(J(a, "DescriptionEditorSaveButtonText"))
        }, this);
        c = this.nc = new X(J(a,
            "DescriptionEditorCancelButtonText"), b);
        this.z(c, m);
        c.X(d);
        Y(a, "DescriptionEditorCancelButtonText", function () {
            this.nc.ma(J(a, "DescriptionEditorCancelButtonText"))
        }, this)
    };
    r.t = function () {
        Eh.b.t.call(this);
        S(this).c(this.Fa, "hide", this.td).c(this.Fa, "show", this.ud).c(this.nc, "action", this.Ta).c(this.je, "action", this.wh).c(this.je, "action", this.Ta).c(this.yb, "keydown", this.ak)
    };
    r.show = function (a, b) {
        this.xa = a;
        this.yb.value = a.H(Nd);
        var c = this.Fa;
        c.cg(new Ah(b, 1, i));
        c.D(i)
    };
    r.Ta = function () {
        this.Fa.D(m)
    };
    r.ak = function (a) {
        13 === a.keyCode && !a.shiftKey && !a.altKey && !a.metaKey && !a.ctrlKey && (a.preventDefault(), this.wh(), this.Ta())
    };
    r.wh = function () {
        var a = this.yb.value;
        a != k && this.xa.ra(Nd, a)
    };
    r.td = function () {
        this.xa = k;
        this.yb.value = "";
        this.dispatchEvent(Fh)
    };
    r.ud = function () {
        if (this.yb.value) this.yb.focus();
        else {
            var a = this.je.a();
            fd(S(this), a, "keydown", function () {
                this.yb.focus()
            });
            a.focus()
        }
        this.dispatchEvent(Gh)
    };
    r.R = gd;
    r.e = N("au.upldr.ui.DescriptionEditor");
    var Gh = "show",
        Fh = "hide";

    function Hh(a) {
        G.call(this, xd);
        this.bd = a
    }
    w(Hh, G);

    function Ih(a, b) {
        this.Yc = new dd(this);
        var c = a;
        b && (c = Xb(a));
        this.Yc.c(c, "dragenter", this.lj);
        c != a && this.Yc.c(c, "dragover", this.mj);
        this.Yc.c(a, "dragover", this.oj);
        this.Yc.c(a, "drop", this.pj)
    }
    w(Ih, I);
    r = Ih.prototype;
    r.sc = m;
    r.B = N("goog.events.FileDropHandler");
    r.h = function () {
        Ih.b.h.call(this);
        this.Yc.j()
    };
    r.lj = function (a) {
        this.B.log(Oe, '"' + a.target.id + '" (' + a.target + ") dispatched: " + a.type, h);
        var b = a.fa.dataTransfer;
        (this.sc = !(!b || !(b.types && (Wa(b.types, "Files") || Wa(b.types, "public.file-url")) || b.files && 0 < b.files.length))) && a.preventDefault();
        this.B.log(Oe, "dndContainsFiles_: " + this.sc, h)
    };
    r.mj = function (a) {
        this.B.log(Pe, '"' + a.target.id + '" (' + a.target + ") dispatched: " + a.type, h);
        if (this.sc) a.preventDefault(), a.fa.dataTransfer.dropEffect = "none"
    };
    r.oj = function (a) {
        this.B.log(Pe, '"' + a.target.id + '" (' + a.target + ") dispatched: " + a.type, h);
        if (this.sc) a.preventDefault(), a.stopPropagation(), a = a.fa.dataTransfer, a.effectAllowed = "all", a.dropEffect = "copy"
    };
    r.pj = function (a) {
        this.B.log(Oe, '"' + a.target.id + '" (' + a.target + ") dispatched: " + a.type, h);
        if (this.sc) {
            a.preventDefault();
            a.stopPropagation();
            M(this.B, "Firing DROP event...");
            a = new Hc(a.fa);
            a.type = "drop";
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
        }
    };

    function Jh(a) {
        this.ba = a || k;
        this.qd = this.ib = this.g = this.pc = k;
        this.Wf = m;
        this.ec = this.ve = this.$e = this.Sd = k;
        this.r = new dd(this)
    }
    r = Jh.prototype;
    r.Rb = function (a) {
        this.pc && this.detach();
        a.F || rd("Container is not rendered.");
        this.pc = a;
        this.g = a.a();
        this.r.c(this.g, "mousedown", this.Ig)
    };
    r.detach = function () {
        this.r.ja(this.g, "mousedown", this.Ig);
        this.pc = k
    };
    r.Ig = function (a) {
        var b = this.g;
        if (a.target == b && Jc(a)) {
            this.Sd = Zf(b);
            var c = a.fa,
                c = Kh(this, new F(c.pageX, c.pageY));
            if (c.x < b.clientWidth && c.y < b.scrollHeight) this.r.c(document, "mousemove", this.Gg, i).c(document, "mouseup", this.Hg, m), this.$e = new Rb(b.clientWidth, b.scrollHeight), this.ve = c, Lh(this), a.preventDefault()
        }
    };

    function Lh(a) {
        var b = [];
        T(a.pc, function (a, d) {
            var f = a.a();
            b[d] = new Of(f.offsetLeft, f.offsetTop, f.offsetWidth, f.offsetHeight)
        });
        a.ec = b
    }

    function Kh(a, b) {
        var c = a.g;
        if (!a.Sd) a.Sd = Zf(c);
        var d = Ub(b, a.Sd);
        d.x += c.scrollLeft;
        d.y += c.scrollTop;
        return d
    }

    function Mh(a, b) {
        if (!a.qd) {
            var c = a.qd = cc("div", "au-upldr-rectselection-bg");
            Qc(c, "click", function () {
                ic(c)
            });
            window.document.body.appendChild(c)
        }
        if (!a.ib) a.ib = cc("li", "au-upldr-rectselection");
        Q(a.ib, m);
        a.Wf = m;
        Tf(a.ib, b.x, b.y);
        (a.ba || window.document.body).appendChild(a.ib)
    }
    r.Gg = function (a) {
        var b = this.ib;
        if (!b) Mh(this, this.ve), b = this.ib;
        var c = this.ve,
            d = a.fa,
            f = Kh(this, new F(d.pageX, d.pageY)),
            d = Math.min(c.x, f.x),
            g = Math.min(c.y, f.y),
            j = kd(Math.abs(f.x - c.x), 1, this.$e.width - d - 4),
            c = kd(Math.abs(f.y - c.y), 1, this.$e.height - g - 4);
        Tf(b, d, g);
        ag(b, j, c);
        var f = f.y,
            l = this.g;
        if (0 > f - l.scrollTop) l.scrollTop = f;
        else if (f - l.scrollTop > l.clientHeight) l.scrollTop = f - l.clientHeight;
        if (!this.Wf && (5 < j || 5 < c)) this.Wf = i, Q(b, i);
        Nh(this, new Of(d, g, j, c));
        a.preventDefault();
        a.stopPropagation()
    };

    function Nh(a, b) {
        T(a.pc, function (a, d) {
            var f = V(a, 8);
            f ^ (this.ec[d].left <= b.left + b.width && b.left <= this.ec[d].left + this.ec[d].width && this.ec[d].top <= b.top + b.height && b.top <= this.ec[d].top + this.ec[d].height) && this.pc.A(d).Nb(!f)
        }, a)
    }
    r.Hg = function () {
        this.r.ja(document, "mousemove", this.Gg, i).ja(document, "mouseup", this.Hg, m);
        if (this.ib) ic(this.ib), this.ib = k;
        if (this.qd) ic(this.qd), this.qd = k;
        this.ve = k
    };

    function Oh(a, b, c) {
        this.Da = c || (a ? Vb(Yb(a)) : Vb());
        Ch.call(this, this.Da.d("div", {
            style: "position:absolute;display:none;"
        }));
        this.Xe = new F(1, 1);
        this.Wb = new ze;
        a && this.Rb(a);
        b != k && lc(this.a(), b)
    }
    w(Oh, Ch);
    var Ph = [];
    r = Oh.prototype;
    r.Ba = k;
    r.className = "goog-tooltip";
    r.Ch = 500;
    r.Xi = 0;
    r.q = n("Da");
    r.Rb = function (a) {
        a = Yb(a);
        this.Wb.add(a);
        H(a, "mouseover", this.Ac, m, this);
        H(a, "mouseout", this.Yd, m, this);
        H(a, "mousemove", this.Pg, m, this);
        H(a, "focus", this.ac, m, this);
        H(a, "blur", this.Yd, m, this)
    };
    r.detach = function (a) {
        if (a) a = Yb(a), Qh(this, a), this.Wb.remove(a);
        else {
            for (var b = this.Wb.Zb(), c = 0; a = b[c]; c++) Qh(this, a);
            this.Wb.clear()
        }
    };

    function Qh(a, b) {
        Rc(b, "mouseover", a.Ac, m, a);
        Rc(b, "mouseout", a.Yd, m, a);
        Rc(b, "mousemove", a.Pg, m, a);
        Rc(b, "focus", a.ac, m, a);
        Rc(b, "blur", a.Yd, m, a)
    }
    r.Zf = function (a) {
        var b = this.a();
        b && ic(b);
        Oh.b.Zf.call(this, a);
        if (a) b = this.Da.Q.body, b.insertBefore(a, b.lastChild)
    };
    r.Ia = function () {
        return this.Ob ? this.V() ? 4 : 1 : this.jd ? 3 : this.V() ? 2 : 0
    };
    r.Nf = function () {
        if (!kh.prototype.Nf.call(this)) return m;
        if (this.anchor)
            for (var a, b = 0; a = Ph[b]; b++) kc(a.a(), this.anchor) || a.D(m);
        Wa(Ph, this) || Ph.push(this);
        a = this.a();
        a.className = this.className;
        Rh(this);
        H(a, "mouseover", this.Rg, m, this);
        H(a, "mouseout", this.Qg, m, this);
        Sh(this);
        return i
    };
    r.Of = function () {
        Xa(Ph, this);
        for (var a = this.a(), b, c = 0; b = Ph[c]; c++) b.anchor && kc(a, b.anchor) && b.D(m);
        this.qh && Th(this.qh);
        Rc(a, "mouseover", this.Rg, m, this);
        Rc(a, "mouseout", this.Qg, m, this);
        this.anchor = h;
        if (0 == this.Ia()) this.re = m;
        kh.prototype.Of.call(this)
    };
    r.gh = function (a, b) {
        if (this.anchor == a && this.Wb.contains(this.anchor))
            if (this.re || !this.cm) {
                if (this.D(m), !this.V()) this.anchor = a, this.cg(b || Uh(this, 0)), this.D(i)
            } else this.anchor = h;
        this.Ob = h
    };
    r.gj = function (a) {
        this.jd = h;
        a == this.anchor && (this.Ba == k || this.Ba != this.a() && !this.Wb.contains(this.Ba)) && (!this.wg || !this.wg.Ba) && this.D(m)
    };

    function Vh(a, b) {
        var c = uc(a.Da);
        a.Xe.x = b.clientX + c.x;
        a.Xe.y = b.clientY + c.y
    }
    r.Ac = function (a) {
        var b = Wh(this, a.target);
        this.Ba = b;
        Rh(this);
        if (b != this.anchor) {
            this.anchor = b;
            if (!this.Ob) this.Ob = cf(v(this.gh, this, b, h), this.Ch);
            Xh(this);
            Vh(this, a)
        }
    };

    function Wh(a, b) {
        try {
            for (; b && !a.Wb.contains(b);) b = b.parentNode;
            return b
        } catch (c) {
            return k
        }
    }
    r.Pg = function (a) {
        Vh(this, a);
        this.re = i
    };
    r.ac = function (a) {
        this.Ba = a = Wh(this, a.target);
        this.re = i;
        if (this.anchor != a) {
            this.anchor = a;
            var b = Uh(this, 1);
            Rh(this);
            if (!this.Ob) this.Ob = cf(v(this.gh, this, a, b), this.Ch);
            Xh(this)
        }
    };

    function Uh(a, b) {
        if (0 == b) {
            var c = a.Xe.va();
            return new Yh(c)
        }
        return new Zh(a.Ba)
    }

    function Xh(a) {
        if (a.anchor)
            for (var b, c = 0; b = Ph[c]; c++)
                if (kc(b.a(), a.anchor)) b.wg = a, a.qh = b
    }
    r.Yd = function (a) {
        var b = Wh(this, a.target),
            c = Wh(this, a.relatedTarget);
        if (b != c) {
            if (b == this.Ba) this.Ba = k;
            Sh(this);
            this.re = m;
            this.V() && (!a.relatedTarget || !kc(this.a(), a.relatedTarget)) ? Th(this) : this.anchor = h
        }
    };
    r.Rg = function () {
        var a = this.a();
        if (this.Ba != a) Rh(this), this.Ba = a
    };
    r.Qg = function (a) {
        var b = this.a();
        if (this.Ba == b && (!a.relatedTarget || !kc(b, a.relatedTarget))) this.Ba = k, Th(this)
    };

    function Sh(a) {
        if (a.Ob) af.clearTimeout(a.Ob), a.Ob = h
    }

    function Th(a) {
        if (2 == a.Ia()) a.jd = cf(v(a.gj, a, a.anchor), a.Xi)
    }

    function Rh(a) {
        if (a.jd) af.clearTimeout(a.jd), a.jd = h
    }
    r.h = function () {
        this.D(m);
        Sh(this);
        this.detach();
        this.a() && ic(this.a());
        this.Ba = k;
        delete this.Da;
        Oh.b.h.call(this)
    };

    function Yh(a, b) {
        yh.call(this, a, b)
    }
    w(Yh, yh);
    Yh.prototype.La = function (a, b, c) {
        b = Vf(a);
        b = Yf(b);
        c = c ? new Nf(c.top + 10, c.right, c.bottom, c.left + 10) : new Nf(10, 0, 0, 10);
        qh(this.Ue, a, 4, c, b, 9) & 496 && qh(this.Ue, a, 4, c, b, 5)
    };

    function Zh(a) {
        zh.call(this, a, 3)
    }
    w(Zh, zh);
    Zh.prototype.La = function (a, b, c) {
        var d = new F(10, 0);
        ph(this.element, this.Uc, a, b, d, c, 9) & 496 && ph(this.element, 2, a, 1, d, c, 5)
    };

    function $h() {}
    w($h, Eg);
    t($h);
    r = $h.prototype;
    r.d = function (a) {
        var b = {
                "class": "goog-inline-block " + this.Ra(a).join(" "),
                title: a.Db() || ""
            },
            b = a.q().d("div", b, this.Ld(a.Ha, a.q()));
        this.se(a, b);
        return b
    };
    r.wa = p("button");
    r.se = function (a, b) {
        a.isEnabled() || this.Ga(b, 1, i);
        V(a, 8) && this.Ga(b, 8, i);
        a.da & 16 && this.Ga(b, 16, i);
        V(a, 64) && this.Ga(b, 64, i)
    };
    r.J = function (a) {
        return a && a.firstChild.firstChild
    };
    r.Ld = function (a, b) {
        return b.d("div", "goog-inline-block " + (this.f() + "-outer-box"), b.d("div", "goog-inline-block " + (this.f() + "-inner-box"), a))
    };
    r.R = function (a) {
        return "DIV" == a.tagName
    };
    r.I = function (a, b) {
        ai(b, i);
        ai(b, m);
        var c;
        a: {
            if ((c = a.q().Ng(b)) && -1 != c.className.indexOf(this.f() + "-outer-box"))
                if ((c = a.q().Ng(c)) && -1 != c.className.indexOf(this.f() + "-inner-box")) {
                    c = i;
                    break a
                }
            c = m
        }
        c || b.appendChild(this.Ld(b.childNodes, a.q()));
        A(b, "goog-inline-block", this.f());
        return $h.b.I.call(this, a, b)
    };
    r.f = p("goog-custom-button");

    function ai(a, b) {
        if (a)
            for (var c = b ? a.firstChild : a.lastChild, d; c && c.parentNode == a;) {
                d = b ? c.nextSibling : c.previousSibling;
                if (3 == c.nodeType) {
                    var f = c.nodeValue;
                    if ("" == Fa(f)) a.removeChild(c);
                    else {
                        c.nodeValue = b ? f.replace(/^[\s\xa0]+/, "") : f.replace(/[\s\xa0]+$/, "");
                        break
                    }
                } else break;
                c = d
            }
    };

    function bi() {}
    w(bi, $h);
    t(bi);
    bi.prototype.f = p("goog-toolbar-button");

    function ci(a, b, c) {
        X.call(this, a, b || bi.v(), c)
    }
    w(ci, X);
    Hg("goog-toolbar-button", function () {
        return new ci(k)
    });

    function di() {}
    w(di, zg);
    t(di);
    di.prototype.d = function (a) {
        return a.q().d("div", this.f())
    };
    di.prototype.I = function (a, b) {
        b.id && og(a, b.id);
        if ("HR" == b.tagName) {
            var c = b,
                b = this.d(a);
            c.parentNode && c.parentNode.insertBefore(b, c);
            ic(c)
        } else A(b, this.f());
        return b
    };
    di.prototype.ma = ca();
    di.prototype.f = p("goog-menuseparator");

    function ei() {}
    w(ei, di);
    t(ei);
    ei.prototype.d = function (a) {
        return a.q().d("div", this.f() + " goog-inline-block", "\u00a0")
    };
    ei.prototype.I = function (a, b) {
        b = ei.b.I.call(this, a, b);
        A(b, "goog-inline-block");
        return b
    };
    ei.prototype.f = p("goog-toolbar-separator");

    function fi(a, b) {
        W.call(this, k, a || di.v(), b);
        Ug(this, 1, m);
        Ug(this, 2, m);
        Ug(this, 4, m);
        Ug(this, 32, m);
        this.Pb = 1
    }
    w(fi, W);
    fi.prototype.t = function () {
        fi.b.t.call(this);
        xg(this.a(), "separator")
    };
    Hg("goog-menuseparator", function () {
        return new fi
    });

    function gi() {}
    t(gi);
    r = gi.prototype;
    r.wa = ca();

    function hi(a, b) {
        if (a) a.tabIndex = b ? 0 : -1
    }
    r.d = function (a) {
        return a.q().d("div", this.Ra(a).join(" "))
    };
    r.J = aa();
    r.R = function (a) {
        return "DIV" == a.tagName
    };
    r.I = function (a, b) {
        b.id && og(a, b.id);
        var c = this.f(),
            d = m,
            f = eb(b);
        f && y(f, function (b) {
            b == c ? d = i : b && (b == c + "-disabled" ? a.za(m) : b == c + "-horizontal" ? a.ag(ii) : b == c + "-vertical" && a.ag(ji))
        }, this);
        d || A(b, c);
        ki(this, a, this.J(b));
        return b
    };

    function ki(a, b, c) {
        if (c)
            for (var d = c.firstChild, f; d && d.parentNode == c;) {
                f = d.nextSibling;
                if (1 == d.nodeType) {
                    var g = a.ed(d);
                    if (g) g.g = d, b.isEnabled() || g.za(m), b.z(g), g.I(d)
                } else(!d.nodeValue || "" == Fa(d.nodeValue)) && c.removeChild(d);
                d = f
            }
    }
    r.ed = function (a) {
        a: {
            for (var b = eb(a), c = 0, d = b.length; c < d; c++)
                if (a = b[c] in Ig ? Ig[b[c]]() : k) break a;
            a = k
        }
        return a
    };
    r.Dc = function (a) {
        a = a.a();
        fg(a, i, Cb);
        if (C) a.hideFocus = i;
        var b = this.wa();
        b && xg(a, b)
    };
    r.ga = function (a) {
        return a.a()
    };
    r.f = p("goog-container");
    r.Ra = function (a) {
        var b = this.f(),
            c = [b, a.ya == ii ? b + "-horizontal" : b + "-vertical"];
        a.isEnabled() || c.push(b + "-disabled");
        return c
    };
    r.Mg = function () {
        return ji
    };

    function li(a, b, c) {
        R.call(this, c);
        this.w = b || gi.v();
        this.ya = a || this.w.Mg()
    }
    w(li, R);
    var ii = "horizontal",
        ji = "vertical";
    r = li.prototype;
    r.Cf = k;
    r.Ua = k;
    r.w = k;
    r.ya = k;
    r.ka = i;
    r.Xb = i;
    r.ff = i;
    r.Ja = -1;
    r.ia = k;
    r.sb = m;
    r.bi = m;
    r.zj = i;
    r.ob = k;
    r.ga = function () {
        return this.Cf || this.w.ga(this)
    };
    r.Vd = function () {
        return this.Ua || (this.Ua = new Lg(this.ga()))
    };
    r.d = function () {
        this.g = this.w.d(this)
    };
    r.J = function () {
        return this.w.J(this.a())
    };
    r.R = function (a) {
        return this.w.R(a)
    };
    r.Qa = function (a) {
        this.g = this.w.I(this, a);
        if ("none" == a.style.display) this.ka = m
    };
    r.t = function () {
        li.b.t.call(this);
        T(this, function (a) {
            a.F && mi(this, a)
        }, this);
        var a = this.a();
        this.w.Dc(this);
        this.D(this.ka, i);
        S(this).c(this, "enter", this.nf).c(this, "highlight", this.of).c(this, "unhighlight", this.sf).c(this, "open", this.Ui).c(this, "close", this.Oi).c(a, "mousedown", this.bc).c(Xb(a), "mouseup", this.Qi).c(a, ["mousedown", "mouseup", "mouseover", "mouseout"], this.Ni);
        this.Eb() && ni(this, i)
    };

    function ni(a, b) {
        var c = S(a),
            d = a.ga();
        b ? c.c(d, "focus", a.ac).c(d, "blur", a.$b).c(a.Vd(), "key", a.Sa) : c.ja(d, "focus", a.ac).ja(d, "blur", a.$b).ja(a.Vd(), "key", a.Sa)
    }
    r.oa = function () {
        oi(this, -1);
        this.ia && this.ia.ca(m);
        this.sb = m;
        li.b.oa.call(this)
    };
    r.h = function () {
        li.b.h.call(this);
        if (this.Ua) this.Ua.j(), this.Ua = k;
        this.w = this.ia = this.ob = this.Cf = k
    };
    r.nf = p(i);
    r.of = function (a) {
        var b = ug(this, a.target);
        if (-1 < b && b != this.Ja) {
            var c = pi(this);
            c && c.Ma(m);
            this.Ja = b;
            c = pi(this);
            this.sb && c.setActive(i);
            this.zj && this.ia && c != this.ia && (c.da & 64 ? c.ca(i) : this.ia.ca(m))
        }
        yg(this.a(), "activedescendant", a.target.a().id)
    };
    r.sf = function (a) {
        if (a.target == pi(this)) this.Ja = -1;
        yg(this.a(), "activedescendant", "")
    };
    r.Ui = function (a) {
        if ((a = a.target) && a != this.ia && a.getParent() == this) this.ia && this.ia.ca(m), this.ia = a
    };
    r.Oi = function (a) {
        if (a.target == this.ia) this.ia = k
    };
    r.bc = function (a) {
        if (this.Xb) this.sb = i;
        var b = this.ga();
        b && oc(b) ? b.focus() : a.preventDefault()
    };
    r.Qi = function () {
        this.sb = m
    };
    r.Ni = function (a) {
        var b;
        a: {
            b = a.target;
            if (this.ob)
                for (var c = this.a(); b && b !== c;) {
                    var d = b.id;
                    if (d in this.ob) {
                        b = this.ob[d];
                        break a
                    }
                    b = b.parentNode
                }
            b = k
        }
        if (b) switch (a.type) {
        case "mousedown":
            b.bc(a);
            break;
        case "mouseup":
            b.cc(a);
            break;
        case "mouseover":
            b.Ac(a);
            break;
        case "mouseout":
            b.rf(a)
        }
    };
    r.ac = ca();
    r.$b = function () {
        oi(this, -1);
        this.sb = m;
        this.ia && this.ia.ca(m)
    };
    r.Sa = function (a) {
        return this.isEnabled() && this.V() && (0 != U(this) || this.Cf) && this.Za(a) ? (a.preventDefault(), a.stopPropagation(), i) : m
    };
    r.Za = function (a) {
        var b = pi(this);
        if (b && "function" == typeof b.Sa && b.Sa(a) || this.ia && this.ia != b && "function" == typeof this.ia.Sa && this.ia.Sa(a)) return i;
        if (a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) return m;
        switch (a.keyCode) {
        case 27:
            if (this.Eb()) this.ga().blur();
            else return m;
            break;
        case 36:
            qi(this);
            break;
        case 35:
            ri(this);
            break;
        case 38:
            if (this.ya == ji) si(this);
            else return m;
            break;
        case 37:
            if (this.ya == ii) tg(this) ? ti(this) : si(this);
            else return m;
            break;
        case 40:
            if (this.ya == ji) ti(this);
            else return m;
            break;
        case 39:
            if (this.ya ==
                ii) tg(this) ? si(this) : ti(this);
            else return m;
            break;
        default:
            return m
        }
        return i
    };

    function mi(a, b) {
        var c = b.a(),
            c = c.id || (c.id = ng(b));
        if (!a.ob) a.ob = {};
        a.ob[c] = b
    }
    r.z = function (a, b) {
        li.b.z.call(this, a, b)
    };
    r.Pc = function (a, b, c) {
        Wg(a, 2, i);
        Wg(a, 64, i);
        (this.Eb() || !this.bi) && Ug(a, 32, m);
        Rg(a, m);
        li.b.Pc.call(this, a, b, c);
        a.F && this.F && mi(this, a);
        b <= this.Ja && this.Ja++
    };
    r.removeChild = function (a, b) {
        if (a = u(a) ? qg(this, a) : a) {
            var c = ug(this, a); - 1 != c && (c == this.Ja ? a.Ma(m) : c < this.Ja && this.Ja--);
            var d = a.a();
            if (d && d.id && this.ob) c = this.ob, d = d.id, d in c && delete c[d]
        }
        a = li.b.removeChild.call(this, a, b);
        Rg(a, i);
        return a
    };
    r.ag = function (a) {
        this.a() && e(Error("Component already rendered"));
        this.ya = a
    };
    r.V = n("ka");
    r.D = function (a, b) {
        if (b || this.ka != a && this.dispatchEvent(a ? "show" : "hide")) {
            this.ka = a;
            var c = this.a();
            c && (Q(c, a), this.Eb() && hi(this.ga(), this.Xb && this.ka), b || this.dispatchEvent(this.ka ? "aftershow" : "afterhide"));
            return i
        }
        return m
    };
    r.isEnabled = n("Xb");
    r.za = function (a) {
        if (this.Xb != a && this.dispatchEvent(a ? "enable" : "disable")) a ? (this.Xb = i, T(this, function (a) {
            a.Xh ? delete a.Xh : a.za(i)
        })) : (T(this, function (a) {
            a.isEnabled() ? a.za(m) : a.Xh = i
        }), this.sb = this.Xb = m), this.Eb() && hi(this.ga(), a && this.ka)
    };
    r.Eb = n("ff");
    r.wb = function (a) {
        a != this.ff && this.F && ni(this, a);
        this.ff = a;
        this.Xb && this.ka && hi(this.ga(), a)
    };

    function oi(a, b) {
        var c = a.A(b);
        c ? c.Ma(i) : -1 < a.Ja && pi(a).Ma(m)
    }
    r.Ma = function (a) {
        oi(this, ug(this, a))
    };

    function pi(a) {
        return a.A(a.Ja)
    }

    function qi(a) {
        ui(a, function (a, c) {
            return (a + 1) % c
        }, U(a) - 1)
    }

    function ri(a) {
        ui(a, function (a, c) {
            a--;
            return 0 > a ? c - 1 : a
        }, 0)
    }

    function ti(a) {
        ui(a, function (a, c) {
            return (a + 1) % c
        }, a.Ja)
    }

    function si(a) {
        ui(a, function (a, c) {
            a--;
            return 0 > a ? c - 1 : a
        }, a.Ja)
    }

    function ui(a, b, c) {
        for (var c = 0 > c ? ug(a, a.ia) : c, d = U(a), c = b.call(a, c, d), f = 0; f <= d;) {
            var g = a.A(c);
            if (g && a.tg(g)) {
                oi(a, c);
                break
            }
            f++;
            c = b.call(a, c, d)
        }
    }
    r.tg = function (a) {
        return a.V() && a.isEnabled() && !!(a.da & 2)
    };

    function vi() {}
    w(vi, gi);
    t(vi);
    vi.prototype.wa = p("toolbar");
    vi.prototype.ed = function (a) {
        return "HR" == a.tagName ? new fi(ei.v()) : vi.b.ed.call(this, a)
    };
    vi.prototype.f = p("goog-toolbar");
    vi.prototype.Mg = function () {
        return ii
    };

    function wi(a, b, c) {
        li.call(this, b, a || vi.v(), c)
    }
    w(wi, li);

    function xi() {}
    w(xi, zg);
    r = xi.prototype;
    r.f = p("au-upldr-list-item");
    r.d = function (a) {
        var b = a.q().d("li", "au-upldr-list-item " + this.Ra(a).join(" ")),
            c = this.kf(a);
        if (0 < c) b.style.width = c + "px";
        a.g = b;
        this.Bg(a);
        return b
    };
    r.kf = p(0);
    r.Bg = function (a) {
        var b = a.q(),
            c = a.J();
        b.appendChild(c, this.Ab(a));
        var d = this.Bb(a);
        a.lb = d;
        a.z(d, i);
        A(d.a(), "iconsBar");
        b.appendChild(c, this.qc(a));
        a = yi(a);
        b.appendChild(c, a)
    };

    function yi(a) {
        var b = a.i.H(Nd),
            c = a.q().d("div", {
                "class": "au-upldr-description-icon",
                id: sg(a, zi)
            });
        Q(c, !!b);
        var d = a.Pd;
        d && d.j();
        d = new Oh(c);
        if (b != k) b = Ga(b), d.a().innerHTML = b;
        a.Pd = d;
        return c
    }
    r.Ab = function (a) {
        var b = "au-upldr-preview",
            c = a.i;
        Gd(c) && (b += " au-upldr-file-image");
        var d = qd(c.getName() || "");
        d && (b += " au-upldr-file-" + d);
        var f = a.q().d("div", {
            "class": b,
            id: sg(a, Ai)
        });
        if (a = c.H(Md)) {
            var g = "rotate(" + a + "deg)";
            y(["-webkit-transform", "-moz-transform", "transform"], function (a) {
                u(a) ? Pf(f, g, a) : kb(a, ta(Pf, f))
            })
        }
        return f
    };
    r.Bb = function () {
        var a = new wi;
        a.wb(m);
        og(a, za(ya.v()));
        return a
    };
    r.qc = function (a) {
        return a.q().d("div", "au-upldr-item-content")
    };
    r.wa = p("listitem");

    function Bi() {}
    w(Bi, Zg);
    t(Bi);
    Bi.prototype.f = p("au-upldr-css3-toolbar-button");

    function Ci() {}
    w(Ci, xi);
    t(Ci);
    r = Ci.prototype;
    r.f = p("au-upldr-tile-list-item");
    r.kf = function (a) {
        return J(a.ta.o, "TileItemWidth")
    };
    r.Ab = function (a) {
        var b = Ci.b.Ab.call(this, a),
            c = J(a.ta.o, "TilePreviewSize");
        if (0 < c) b.style.width = b.style.height = c + "px";
        (a = a.i.Ce) && b.appendChild(a);
        return b
    };
    r.Bb = function (a) {
        var b = Ci.b.Bb.call(this, a),
            a = a.ta.o,
            c, d, f = Bi.v();
        //J(a, "EnableDescriptionEditor") && (c = new ci(cc("div", "au-upldr-button au-upldr-button-edit-description"), f), c.C(1), d = J(a, "DescriptionEditorIconTooltip"), c.jb(d), og(c, sg(b, (1).toString(36))), b.z(c, i));
        //J(a, "EnableRotation") && (c = new ci(cc("div", "au-upldr-button au-upldr-button-rotate"), f), c.C(2), d = J(a, "RotationIconTooltip"), c.jb(d), og(c, sg(b, (2).toString(36))), b.z(c, i));
        c = new ci(cc("div", "au-upldr-button au-upldr-button-remove"), f);
        c.C(3);
        d = J(a, "RemovalIconTooltip");
        c.jb(d);
        og(c, sg(b, (3).toString(36)));
        b.z(c, i);
        return b
    };
    r.qc = function (a) {
        var b = a.q(),
            c = a.i,
            d = Ci.b.qc.call(this, a),
            f = b.d("div", "au-upldr-filename", c.getName());
        A(f, "tilesViewFileNameText");
        b.appendChild(d, f);
        f = b.d("div", "au-upldr-filesize", Cd(c.Yb.size, 0));
        A(f, "tilesViewParamText");
        b.appendChild(d, f);
        Gd(c) && (b = new vg(""), og(b, sg(a, "dimension")), a.z(b), b.X(f));
        return d
    };

    function Di(a, b, c) {
        W.call(this, k, c);
        Ug(this, 8, i);
        this.Qc &= -9;
        this.i = a;
        this.ta = b;
        this.mb = new Oh;
        this.He();
        this.lb = k;
        S(this).c(a, yd, this.rj)
    }
    w(Di, W);
    var Ai = "preview",
        zi = "descriptionicon";
    r = Di.prototype;
    r.rj = function (a) {
        a = a.sh;
        if (a == Kd || a == Ld) Ei(this), this.He();
        else if (a == Md) Fi(this);
        else if (a == Nd) {
            var a = this.i.H(Nd) + "",
                b = Yb(sg(this, zi));
            this.Pd.a().innerHTML = Ga(a);
            Q(b, !!a)
        }
    };
    r.He = function () {
        var a = this.i,
            b = Gd(a),
            c = b ? a.H(Kd) : 0,
            b = b ? a.H(Ld) : 0,
            d;
        d = J(this.ta.o, 0 < c && 0 < b ? "ImageTooltip" : "ItemTooltip");
        var f = d.replace(/[,\u3001]\s*\n.*[:\uff1a]\s*\{2\}$/g, "");
        f != d && (d = f.replace(/\{3\}/g, "{2}"));
        d = K(d, a.getName(), Cd(a.Yb.size, 0), c + "x" + b);
        d = Ga(d);
        d.match(/^\s*$/) ? this.mb.detach(this.a()) : this.mb.a().innerHTML = d
    };

    function Ei(a) {
        var b = qg(a, sg(a, "dimension"));
        if (b) {
            var c = a.i,
                a = c.H(Kd),
                c = c.H(Ld);
            0 < a && 0 < c && wg(b, ", " + a + "x" + c)
        }
    }

    function Fi(a) {
        var b = "rotate(" + a.i.H(Md) + "deg)",
            c = Yb(sg(a, Ai));
        y(["-webkit-transform", "-moz-transform", "transform"], function (a) {
            u(a) ? Pf(c, b, a) : kb(a, ta(Pf, c))
        })
    }
    r.vj = function (a) {
        if (a.target instanceof ci) switch (a.target.$()) {
        case 1:
            this.ta.na.Eg.show(this.i, this.lb.a());
            break;
        case 3:
            var b = this.ta;
            b.la();
            if (V(this, 8)) {
                var c = [];
                T(this.getParent(), function (a, b) {
                    V(a, 8) && c.unshift(b)
                });
                y(c, function (a) {
                    b.pe(a)
                })
            } else b.pe(ug(this.getParent(), this));
            break;
        case 2:
            V(this, 8) ? T(this.getParent(), function (a) {
                V(a, 8) && Gi(a)
            }) : Gi(this)
        }
        a.stopPropagation()
    };
    r.wj = function (a) {
        if (V(this, 8)) {
            var b = J(this.ta.o, "PaneItemToolbarAlwaysVisible"),
                c = this,
                d = c.getParent();
            if ("highlight" == a.type) {
                var a = this.lb,
                    f = a.Ja,
                    g = qg(a, sg(a, (1).toString(36))); - 1 != f && a.A(f) !== g && T(d, function (a) {
                    if (c != a) {
                        var d = V(a, 8);
                        d && T(a.lb, function (a, c) {
                            Wg(a, 2, m);
                            c == f ? (a.Ma(i), a.D(i)) : b || a.D(m);
                            Wg(a, 2, i)
                        });
                        Hi(a, d)
                    }
                })
            } else T(d, function (a) {
                c != a && (T(a.lb, function (a) {
                    Wg(a, 2, m);
                    a.Ma(m);
                    Wg(a, 2, i);
                    a.D(i)
                }), Hi(a, m))
            })
        }
    };

    function Hi(a, b) {
        J(a.ta.o, "PaneItemToolbarAlwaysVisible") && (b = i);
        a.lb.a().style.visibility = b ? "visible" : "hidden"
    }

    function Gi(a) {
        a = a.i;
        Od(a, (a.H(Md) || 0) + 90)
    }
    r.t = function () {
        Di.b.t.call(this);
        var a = this.a();
        this.mb.Rb(a);
        S(this).c(this.lb, ["highlight", "unhighlight"], this.wj).c(this, ["highlight", "unhighlight"], function (a) {
            a.target == this && Hi(this, "highlight" == a.type)
        }).c(this.lb, "action", this.vj).c(this.lb.a(), ["mouseup", "dblclick"], function (a) {
            a.stopPropagation()
        }).c(a, "dblclick", this.Zj);
        Hi(this, m);
        Ei(this)
    };
    r.Zj = function () {
        this.ta.na.wf.show(this.i)
    };
    r.oa = function () {
        Di.b.oa.call(this);
        this.mb.detach(this.a())
    };
    r.h = function () {
        this.mb.j();
        delete this.mb;
        this.Pd.j();
        delete this.Pd;
        Di.b.h.call(this)
    };
    r.R = gd;
    Fg(Di, Ci);

    function Ii() {}
    w(Ii, xi);
    t(Ii);
    Ii.prototype.f = p("au-upldr-thumbnail-list-item");
    Ii.prototype.Bb = function (a) {
        var b = Ii.b.Bb.call(this, a),
            a = a.ta.o,
            c, d, f = Bi.v();
        J(a, "EnableDescriptionEditor") && (c = new ci(cc("div", "au-upldr-button au-upldr-button-edit-description"), f), c.C(1), d = J(a, "DescriptionEditorIconTooltip"), c.jb(d), og(c, sg(b, (1).toString(36))), b.z(c, i));
        J(a, "EnableRotation") && (c = new ci(cc("div", "au-upldr-button au-upldr-button-rotate"), f), c.C(2), d = J(a, "RotationIconTooltip"), c.jb(d), og(c, sg(b, (2).toString(36))), b.z(c, i));
        c = new ci(cc("div", "au-upldr-button au-upldr-button-remove"),
            f);
        c.C(3);
        d = J(a, "RemovalIconTooltip");
        c.jb(d);
        og(c, sg(b, (3).toString(36)));
        b.z(c, i);
        return b
    };
    Ii.prototype.Ab = function (a) {
        var b = Ii.b.Ab.call(this, a),
            c = J(a.ta.o, "ThumbnailPreviewSize");
        if (0 < c) b.style.width = b.style.height = c + "px";
        (a = a.i.Ae) && b.appendChild(a);
        return b
    };
    Ii.prototype.Bg = function (a) {
        var b = a.q(),
            c = a.J();
        b.appendChild(c, this.Ab(a));
        var d = b.d("div", "au-upldr-toolbar-outer");
        b.appendChild(c, d);
        var f = this.Bb(a);
        a.lb = f;
        a.z(f, m);
        f.X(d);
        A(f.a(), "iconsBar");
        b.appendChild(c, this.qc(a));
        a = yi(a);
        b.appendChild(c, a)
    };

    function Ji() {}
    w(Ji, xi);
    t(Ji);
    r = Ji.prototype;
    r.f = p("au-upldr-icon-list-item");
    r.kf = function (a) {
        return J(a.ta.o, "IconItemWidth")
    };
    r.Bb = function (a) {
        var b = Ji.b.Bb.call(this, a),
            c = Bi.v(),
            c = new ci(cc("div", "au-upldr-button au-upldr-button-remove"), c);
        c.C(3);
        c.jb(J(a.ta.o, "RemovalIconTooltip"));
        og(c, sg(b, (3).toString(36)));
        b.z(c, i);
        return b
    };
    r.Ab = function (a) {
        var b = Ji.b.Ab.call(this, a),
            a = J(a.ta.o, "IconSize");
        if (0 < a) b.style.width = b.style.height = a + "px";
        return b
    };
    r.qc = function (a) {
        var b = Ji.b.qc.call(this, a);
        a.q().Vj(b, a.i.getName());
        A(b, "iconsViewFileNameText");
        return b
    };

    function Ki(a, b, c) {
        W.call(this, k);
        this.gi = c;
        this.ta = b;
        this.i = a;
        Ug(this, 32, m)
    }
    w(Ki, W);
    Ki.prototype.f = function () {
        return "au-upldr-button-list-item " + this.gi
    };
    Ki.prototype.d = function () {
        var a = this.q().d("li", this.f());
        xg(a, "listitem");
        this.g = a;
        var b = this.i,
            c = new X(J(b, "AddFilesButtonText"), Zg.v());
        Ug(c, 32, m);
        this.z(c, i);
        c.za(J(b, "EnableAddingFiles"));
        Y(b, "AddFilesButtonText", function () {
            c.ma(J(b, "AddFilesButtonText"))
        });
        Y(b, "EnableAddingFiles", function () {
            c.za(J(b, "EnableAddingFiles"))
        });
        A(c.a(), "addFilesButton")
    };
    Ki.prototype.t = function () {
        Ki.b.t.call(this);
        var a = this.A(0);
        S(this).c(a, "action", this.fi)
    };
    Ki.prototype.fi = function () {
        this.ta.Oe()
    };

    function Li() {}
    w(Li, gi);
    t(Li);
    Li.prototype.f = p("au-upldr-list");
    Li.prototype.d = function (a) {
        function b() {
            var b = Mi(a);
            f.forEach(function (c) {
                c = new Di(c, d, b);
                a.z(c, i)
            });
            var c = "";
            b instanceof Ci ? c = "au-upldr-tile-list-item" : b instanceof Ii ? c = "au-upldr-thumbnail-list-item" : b instanceof Ji && (c = "au-upldr-icon-list-item");
            c = new Ki(g, a.i, c);
            a.Ne = c;
            c.X(a.J())
        }
        var c = a.q().d("ul", this.Ra(a).join(" "));
        a.g = c;
        A(c, "tileList");
        var d = a.i,
            f = d.la(),
            g = d.o;
        Y(g, "ViewMode", function () {
            for (; a.Y && 0 != a.Y.length;) {
                var c = a.removeChild(a.A(0), i);
                c && c.j()
            }
            a.Ne.j();
            a.Ne = k;
            b()
        });
        b();
        return c
    };
    Li.prototype.wa = p("list");

    function Ni(a) {
        li.call(this, ii, Li.v());
        this.i = a;
        this.Ca = -1;
        this.kb = 0
    }
    w(Ni, li);
    r = Ni.prototype;
    r.t = function () {
        Ni.b.t.call(this);
        var a = this.i.la(),
            b = this.a();
        S(this).c(a, ad, this.zf).c(this, "action", this.qj).c(b, "click", this.oi)
    };
    r.oi = function (a) {
        a.target == this.a() && Oi(this)
    };
    r.qj = function (a) {
        var b = a.target;
        if (b instanceof Di) {
            var c = ug(this, b);
            a.ctrlKey ? Pi(this, c, 1, i) : a.shiftKey ? (b = this.kb, c -= b, Pi(this, b, c + (0 < c ? 1 : -1), m)) : Pi(this, c, 1, m);
            a.stopPropagation()
        }
    };
    r.zf = function (a) {
        var b = a.Df;
        if ("add" == b) {
            var c = Mi(this),
                d = this.i;
            y(a.la(), function (a) {
                this.z(new Di(a, d, c), i)
            }, this)
        } else if ("remove" == b) {
            var f = a.la();
            T(this, function (a) {
                Wa(f, a.i) && (this.removeChild(a, i), a.j())
            }, this)
        } else if ("reset" == b)
            for (; this.Y && 0 != this.Y.length;)(a = this.removeChild(this.A(0), i)) && a.j();
        Oi(this)
    };
    r.A = function (a) {
        return a === U(this) ? this.Ne : Ni.b.A.call(this, a)
    };

    function Mi(a) {
        a = J(a.i.o, "ViewMode");
        if ("tiles" != a) {
            if ("thumbnails" == a) return Ii.v();
            if ("icons" == a) return Ji.v()
        }
        return Ci.v()
    }
    r.Za = function (a) {
        var b = pi(this);
        if (b && "function" == typeof b.Sa && b.Sa(a)) return i;
        if (a.ctrlKey || a.metaKey || a.altKey) return m;
        b = a.shiftKey;
        switch (a.keyCode) {
        case 27:
            Oi(this);
            break;
        case 36:
            b && 0 < this.kb ? (b = this.kb, a = -1 - b) : (b = 0, a = 1);
            Pi(this, b, a, m);
            break;
        case 35:
            a = U(this);
            b ? (b = this.kb, a -= b) : (b = a - 1, a = 1);
            Pi(this, b, a, m);
            break;
        case 38:
            a = Qi(this);
            if (0 < a) {
                var c;
                b ? (b = this.kb, c = kd(this.Ca - a, 0, U(this) - 1), a = c - b, a += 0 < a ? 1 : -1) : (c = b = kd(this.Ca - a, 0, U(this) - 1), a = 1);
                this.A(this.Ca).a().offsetTop !== this.A(c).a().offsetTop &&
                    Pi(this, b, a, m)
            }
            break;
        case 40:
            a = Qi(this);
            if (0 < a) b ? (b = this.kb, c = kd(this.Ca + a, 0, U(this) - 1), a = c - b, a += 0 < a ? 1 : -1) : (c = b = kd(this.Ca + a, 0, U(this) - 1), a = 1), this.A(this.Ca).a().offsetTop !== this.A(c).a().offsetTop && Pi(this, b, a, m);
            break;
        case 37:
            tg(this) ? Ri(this, b) : Si(this, b);
            break;
        case 39:
            tg(this) ? Si(this, b) : Ri(this, b);
            break;
        case 46:
            Ti(this);
            Pi(this, this.Ca, 1, m);
            break;
        default:
            return m
        }
        return i
    };

    function Ti(a) {
        var b = a.i;
        b.la();
        var c = [];
        T(a, function (a, b) {
            V(a, 8) && c.unshift(b)
        });
        y(c, function (a) {
            b.pe(a)
        })
    }
    r.hf = function () {
        var a = this.A(0);
        if (a) {
            var a = a.a(),
                b = hg(a, "margin"),
                c = this.a();
            return Math.min(U(this) - 2, Math.floor(c.scrollTop / (a.offsetHeight + b.top + b.bottom)) * Math.floor(c.clientWidth / (a.offsetWidth + b.right + b.left)))
        }
        return 0
    };

    function Oi(a) {
        T(a, function (a) {
            a.Nb(m)
        });
        a.Ca = -1;
        a.kb = 0
    }

    function Qi(a) {
        if (0 < U(a)) {
            var b = a.A(0).a(),
                a = a.a().clientWidth,
                c = b.offsetWidth,
                b = hg(b, "margin"),
                c = c + (b.left + b.right);
            return Math.floor(a / c)
        }
        return 0
    }

    function Ri(a, b) {
        var c, d;
        b ? (c = a.kb, d = kd(a.Ca + 1, 0, U(a) - 1) - c, d += 0 < d ? 1 : -1) : (c = a.Ca + 1, d = 1);
        Pi(a, c, d, m)
    }

    function Si(a, b) {
        var c, d;
        b ? (c = a.kb, d = kd(a.Ca - 1, 0, U(a) - 1) - c, d += 0 < d ? 1 : -1) : (c = 0 <= a.Ca ? a.Ca - 1 : U(a) - 1, d = 1);
        Pi(a, c, d, m)
    }

    function Pi(a, b, c, d) {
        var f = U(a);
        if (0 < f) {
            b = kd(b, 0, f - 1);
            d || T(a, function (a) {
                a.Nb(m)
            });
            var d = kd(b + c, -1, f),
                g;
            if (0 <= c)
                for (c = b; c < d; c++) a.A(c).Nb(i), g = c;
            else
                for (c = b; c > d; c--) a.A(c).Nb(i), g = c;
            a.kb = b;
            if (ga(g)) a.Ca = g, Ui(a, g)
        }
    }

    function Ui(a, b) {
        var c = a.A(b).a();
        if (c) {
            var d = a.a(),
                f = Zf(c),
                g = Zf(d),
                j = kg(d),
                l = f.x - g.x - j.left,
                f = f.y - g.y - j.top,
                g = d.clientHeight - c.offsetHeight;
            d.scrollLeft += Math.min(l, Math.max(l - (d.clientWidth - c.offsetWidth), 0));
            d.scrollTop += Math.min(f, Math.max(f - g, 0))
        }
    }
    r.R = gd;
    r.e = N("au.upldr.ui.List");
    Fg(Ni, Li);

    function Vi(a, b) {
        R.call(this, b);
        this.Xf = this.Ud = k;
        this.i = a
    }
    w(Vi, R);
    r = Vi.prototype;
    r.f = p("au-upldr-upload-pane");
    r.t = function () {
        Vi.b.t.call(this);
        var a = this.a();
        this.Ud = new Ih(a, m);
        var b = S(this);
        b.c(this.Ud, "drop", this.qi);
        b.c(a, "dragover", function () {
            2 != this.i.Ia() && Wi(this, i)
        });
        b.c(a, "dragleave", function () {
            Wi(this, m)
        });
        this.Xf.Rb(this.A(0));
        Y(this.i.o, "UploaderState", this.kg, this)
    };
    r.oa = function () {
        Vi.b.oa.call(this);
        this.Ud.j();
        delete this.Ud;
        this.Xf.detach()
    };
    r.d = function () {
        var d;
        var a = this.q(),
            b = a.createElement("div"),
            c = a.createElement("div");
        this.g = c;
        c.appendChild(b);
        b = this.i;
        A(c, this.f());
        A(c, "uploadPaneBar");
        b = new Ni(b);
        this.z(b, i);
        d = this.Rc = a.d("div", this.f() + "-bg"), a = d;
        Q(a, m);
        c.firstChild.appendChild(a);
        this.Xf = new Jh(b.a())
    };
    r.J = function () {
        return jc(this.a())
    };
    r.qi = function (a) {
        2 != this.i.Ia() && (Wi(this, m), this.dispatchEvent(new Hh(a.fa.dataTransfer.files)))
    };

    function Wi(a, b) {
        var c = a.f() + "-dragover";
        b ? A(a.a(), c) : gb(a.a(), c)
    }
    r.kg = function () {
        Q(this.Rc, 2 == this.i.Ia())
    };
    r.R = gd;

    function Xi(a, b) {
        R.call(this, b);
        this.xa = k;
        this.i = a
    }
    w(Xi, R);
    r = Xi.prototype;
    r.f = p("au-upldr-image-preview");
    r.d = function () {
        var a = this.i,
            b = this.q();
        this.pa = b.createElement("img");
        this.Sc = new vg;
        var c = b.d("div", this.f(), b.d("div", k, this.pa, b = b.createElement("div")));
        c.title = J(a, "ClosePreviewTooltip");
        Y(a, "ClosePreviewTooltip", this.He, this);
        this.Sc.X(b);
        A(this.Sc.a(), "previewFileNameLabelText");
        this.g = c;
        Q(c, m);
        a = this.Fa = new Ch(c);
        a.D(m);
        nh(a, i)
    };
    r.He = function () {
        this.a().title = J(this.i, "ClosePreviewTooltip")
    };
    r.t = function () {
        Xi.b.t.call(this);
        S(this).c(this.Fa, "hide", this.td).c(this.Fa, "show", this.ud).c(this.pa, ["load", "error"], this.$d).c(this.a(), "click", this.Ta)
    };
    r.show = function (a) {
        if (Gd(a)) {
            this.xa = a;
            var b = a.getName();
            this.pa.alt = b;
            wg(this.Sc, b);
            var b = this.pa,
                c;
            c = a.getFile();
            c = hd().createObjectURL(c);
            b.src = c;
            b = a.H(Md);
            c = a.H(Kd);
            var d = a.H(Ld),
                f = bg(this.a().parentNode),
                g = f.width,
                j = f.height,
                a = this.a().style,
                l = !!(b % 180);
            f.width -= 20;
            f.height -= 60;
            f.width < c || f.height < d ? (f = ud(c, d, f.width, f.height, b), l && (f = {
                width: f.height,
                height: f.width
            })) : f = {
                width: c,
                height: d
            };
            a.top = Math.floor((j - f.height - 60) / 2) + "px";
            c = Math.max(f.width, bg(this.a()).width);
            a.left = Math.floor((g - c - 20) /
                2) + "px";
            a = this.pa.style;
            a.maxWidth = f.width + "px";
            a.maxHeight = f.height + "px";
            c = l ? Math.floor((f.width - f.height) / 2) + "px" : 0;
            b = "rotate(" + b + "deg)";
            f = ["Webkit", "Moz", "O", "ms"];
            if ("transform" in a) a.transform = b;
            for (g = 0; f[g];) l = f[g] + "Transform", l in a && (a[l] = b), ++g;
            this.Sc.a().parentNode.style.marginTop = c;
            this.Fa.D(i)
        }
    };
    r.Ta = function () {
        this.Fa.D(m)
    };
    r.$d = function () {
        var a = this.pa.src;
        hd().revokeObjectURL(a)
    };
    r.td = function () {
        this.xa = k;
        var a = this.pa.src;
        hd().revokeObjectURL(a);
        this.pa.src = "";
        wg(this.Sc, "");
        this.dispatchEvent(Yi)
    };
    r.ud = function () {
        this.dispatchEvent(Zi)
    };
    r.R = gd;
    r.e = N("au.upldr.ui.ImagePreview");
    var Zi = "show",
        Yi = "hide";

    function $i() {}
    w($i, Eg);
    t($i);
    r = $i.prototype;
    r.d = function (a) {
        var b = {
            "class": "goog-inline-block " + this.Ra(a).join(" "),
            title: a.Db() || ""
        };
        return a.q().d("div", b, a.Ha)
    };
    r.wa = p("button");
    r.R = function (a) {
        return "DIV" == a.tagName
    };
    r.I = function (a, b) {
        A(b, "goog-inline-block");
        return $i.b.I.call(this, a, b)
    };
    r.$ = p(k);
    r.f = p("goog-flat-button");
    Hg("goog-flat-button", function () {
        return new X(k, $i.v())
    });

    function aj() {}
    w(aj, $i);
    t(aj);
    aj.prototype.f = p("goog-link-button");
    Hg("goog-link-button", function () {
        return new X(k, aj.v())
    });

    function bj(a, b, c, d) {
        Ah.call(this, a, b, c || d);
        if (c || d) this.ah = 65 | (d ? 32 : 132)
    }
    w(bj, Ah);
    var cj, dj, ej, fj;
    fj = ej = dj = cj = m;
    var gj = xb();
    gj && (-1 != gj.indexOf("Firefox") ? cj = i : -1 != gj.indexOf("Camino") || (-1 != gj.indexOf("iPhone") || -1 != gj.indexOf("iPod") ? dj = i : -1 != gj.indexOf("iPad") ? ej = i : -1 != gj.indexOf("Android") || -1 != gj.indexOf("Chrome") || -1 != gj.indexOf("Safari") && (fj = i)));
    var hj = cj,
        ij = dj,
        jj = ej,
        kj = fj;

    function lj() {}
    w(lj, gi);
    t(lj);
    r = lj.prototype;
    r.wa = p("menu");
    r.R = function (a) {
        return "UL" == a.tagName || lj.b.R.call(this, a)
    };
    r.ed = function (a) {
        return "HR" == a.tagName ? new fi : lj.b.ed.call(this, a)
    };
    r.Tb = function (a, b) {
        return kc(a.a(), b)
    };
    r.f = p("goog-menu");
    r.Dc = function (a) {
        lj.b.Dc.call(this, a);
        yg(a.a(), "haspopup", "true")
    };
    Hg("goog-menuseparator", function () {
        return new fi
    });

    function mj() {
        this.xg = []
    }
    w(mj, zg);
    t(mj);

    function nj(a, b) {
        var c = a.xg[b];
        if (!c) {
            switch (b) {
            case 0:
                c = a.f() + "-highlight";
                break;
            case 1:
                c = a.f() + "-checkbox";
                break;
            case 2:
                c = a.f() + "-content"
            }
            a.xg[b] = c
        }
        return c
    }
    r = mj.prototype;
    r.wa = p("menuitem");
    r.d = function (a) {
        var b = a.q().d("div", this.Ra(a).join(" "), oj(this, a.Ha, a.q()));
        pj(this, a, b, !!(a.da & 8) || !!(a.da & 16));
        return b
    };
    r.J = function (a) {
        return a && a.firstChild
    };
    r.I = function (a, b) {
        var c = jc(b),
            d = nj(this, 2);
        c && -1 != c.className.indexOf(d) || b.appendChild(oj(this, b.childNodes, a.q()));
        Wa(eb(b), "goog-option") && (a.te(i), this.te(a, b, i));
        return mj.b.I.call(this, a, b)
    };
    r.ma = function (a, b) {
        var c = this.J(a),
            d = qj(this, a) ? c.firstChild : k;
        mj.b.ma.call(this, a, b);
        d && !qj(this, a) && c.insertBefore(d, c.firstChild || k)
    };

    function oj(a, b, c) {
        a = nj(a, 2);
        return c.d("div", a, b)
    }
    r.dg = function (a, b, c) {
        b && (xg(b, c ? "menuitemradio" : this.wa()), pj(this, a, b, c))
    };
    r.te = function (a, b, c) {
        b && (xg(b, c ? "menuitemcheckbox" : this.wa()), pj(this, a, b, c))
    };

    function qj(a, b) {
        var c = a.J(b);
        if (c) {
            var c = c.firstChild,
                d = nj(a, 1);
            return !!c && !!c.className && -1 != c.className.indexOf(d)
        }
        return m
    }

    function pj(a, b, c, d) {
        d != qj(a, c) && (d ? A(c, "goog-option") : gb(c, "goog-option"), c = a.J(c), d ? (a = nj(a, 1), c.insertBefore(b.q().d("div", a), c.firstChild || k)) : c.removeChild(c.firstChild))
    }
    r.dd = function (a) {
        switch (a) {
        case 2:
            return nj(this, 0);
        case 16:
        case 8:
            return "goog-option-selected";
        default:
            return mj.b.dd.call(this, a)
        }
    };
    r.lf = function (a) {
        var b = nj(this, 0);
        switch (a) {
        case "goog-option-selected":
            return 16;
        case b:
            return 2;
        default:
            return mj.b.lf.call(this, a)
        }
    };
    r.f = p("goog-menuitem");

    function rj(a, b, c, d) {
        W.call(this, a, d || mj.v(), c);
        this.C(b)
    }
    w(rj, W);
    r = rj.prototype;
    r.$ = function () {
        var a = this.i;
        return a != k ? a : this.vc()
    };
    r.C = da("i");
    r.dg = function (a) {
        Ug(this, 8, a);
        V(this, 16) && !a && Tg(this, 16, m) && this.N(16, m);
        var b = this.a();
        b && this.w.dg(this, b, a)
    };
    r.te = function (a) {
        Ug(this, 16, a);
        var b = this.a();
        b && this.w.te(this, b, a)
    };
    r.vc = function () {
        var a = this.Ha;
        return ka(a) ? (a = Ta(a, function (a) {
            var c = eb(a);
            return Wa(c, "goog-menuitem-accel") || Wa(c, "goog-menuitem-mnemonic-separator") ? "" : pc(a)
        }).join(""), Ea(a)) : rj.b.vc.call(this)
    };
    r.cc = function (a) {
        var b = this.getParent();
        if (b) {
            var c = b.ph;
            b.ph = k;
            if (b = c && "number" == typeof a.clientX) b = new F(a.clientX, a.clientY), b = c == b ? i : !c || !b ? m : c.x == b.x && c.y == b.y;
            if (b) return
        }
        rj.b.cc.call(this, a)
    };
    r.Za = function (a) {
        return a.keyCode == this.ih && this.Hb(a) ? i : rj.b.Za.call(this, a)
    };
    r.Ei = n("ih");
    Hg("goog-menuitem", function () {
        return new rj(k)
    });

    function sj() {}
    w(sj, zg);
    t(sj);
    sj.prototype.f = p("goog-menuheader");

    function tj(a, b, c) {
        W.call(this, a, c || sj.v(), b);
        Ug(this, 1, m);
        Ug(this, 2, m);
        Ug(this, 4, m);
        Ug(this, 32, m);
        this.Pb = 1
    }
    w(tj, W);
    Hg("goog-menuheader", function () {
        return new tj(k)
    });

    function uj(a, b) {
        li.call(this, ji, b || lj.v(), a);
        this.wb(m)
    }
    w(uj, li);
    r = uj.prototype;
    r.Pe = i;
    r.ci = m;
    r.f = function () {
        return this.w.f()
    };
    r.Tb = function (a) {
        if (this.w.Tb(this, a)) return i;
        for (var b = 0, c = U(this); b < c; b++) {
            var d = this.A(b);
            if ("function" == typeof d.Tb && d.Tb(a)) return i
        }
        return m
    };
    r.cb = function (a) {
        this.z(a, i)
    };
    r.mc = function (a, b) {
        this.Pc(a, b, i)
    };
    r.wc = function (a) {
        return this.A(a)
    };
    r.jf = function () {
        return U(this)
    };
    r.la = function () {
        var a = [];
        T(this, function (b) {
            a.push(b)
        });
        return a
    };
    r.cg = function (a, b) {
        var c = this.V();
        c || Q(this.a(), i);
        var d = this.a(),
            f = a,
            g = b,
            j = Zf(d);
        if (f instanceof F) g = f.y, f = f.x;
        Tf(d, d.offsetLeft + (f - j.x), d.offsetTop + (g - j.y));
        c || Q(this.a(), m)
    };
    r.D = function (a, b, c) {
        (b = uj.b.D.call(this, a, b)) && a && this.F && this.Pe && this.ga().focus();
        this.ph = a && c && "number" == typeof c.clientX ? new F(c.clientX, c.clientY) : k;
        return b
    };
    r.nf = function (a) {
        this.Pe && this.ga().focus();
        return uj.b.nf.call(this, a)
    };
    r.tg = function (a) {
        return (this.ci || a.isEnabled()) && a.V() && !!(a.da & 2)
    };
    r.Qa = function (a) {
        var b = this.w,
            c;
        c = this.q();
        c = Zb(c.Q, "div", b.f() + "-content", a);
        for (var d = c.length, f = 0; f < d; f++) ki(b, this, c[f]);
        uj.b.Qa.call(this, a)
    };
    r.Za = function (a) {
        var b = uj.b.Za.call(this, a);
        b || T(this, function (c) {
            !b && c.Ei && c.ih == a.keyCode && (this.isEnabled() && this.Ma(c), b = c.Sa(a))
        }, this);
        return b
    };

    function vj() {}
    w(vj, $h);
    t(vj);
    if (Cb) vj.prototype.ma = function (a, b) {
        var c = vj.b.J.call(this, a && a.firstChild);
        if (c) {
            var d = this.createCaption(b, Vb(a)),
                f = c.parentNode;
            f && f.replaceChild(d, c)
        }
    };
    r = vj.prototype;
    r.J = function (a) {
        a = vj.b.J.call(this, a && a.firstChild);
        if (Cb && a && a.__goog_wrapper_div) a = a.firstChild;
        return a
    };
    r.I = function (a, b) {
        var c = Zb(document, "*", "goog-menu", b)[0];
        if (c) {
            Q(c, m);
            Xb(c).body.appendChild(c);
            var d = new uj;
            d.I(c);
            a.Kc(d)
        }
        return vj.b.I.call(this, a, b)
    };
    r.Ld = function (a, b) {
        return vj.b.Ld.call(this, [this.createCaption(a, b), this.Md(b)], b)
    };
    r.createCaption = function (a, b) {
        return b.d("div", "goog-inline-block " + (this.f() + "-caption"), a)
    };
    r.Md = function (a) {
        return a.d("div", "goog-inline-block " + (this.f() + "-dropdown"), "\u00a0")
    };
    r.f = p("goog-menu-button");

    function wj(a, b, c, d) {
        X.call(this, a, c || vj.v(), d);
        Ug(this, 64, i);
        b && this.Kc(b);
        this.hj = k;
        this.sa = new $e(500);
        if ((ij || jj) && !E("533.17.9")) this.be = i
    }
    w(wj, X);
    r = wj.prototype;
    r.ai = i;
    r.Yf = m;
    r.be = m;
    r.vh = m;
    r.t = function () {
        wj.b.t.call(this);
        this.s && xj(this, this.s, i);
        yg(this.a(), "haspopup", "true")
    };
    r.oa = function () {
        wj.b.oa.call(this);
        if (this.s) {
            this.ca(m);
            this.s.oa();
            xj(this, this.s, m);
            var a = this.s.a();
            a && ic(a)
        }
    };
    r.h = function () {
        wj.b.h.call(this);
        this.s && (this.s.j(), delete this.s);
        delete this.Gj;
        this.sa.j()
    };
    r.bc = function (a) {
        wj.b.bc.call(this, a);
        if (this.od() && (this.ca(!V(this, 64), a), this.s)) this.s.sb = V(this, 64)
    };
    r.cc = function (a) {
        wj.b.cc.call(this, a);
        if (this.s && !this.od()) this.s.sb = m
    };
    r.Hb = function () {
        this.setActive(m);
        return i
    };
    r.Pi = function (a) {
        this.s && this.s.V() && !this.Tb(a.target) && this.ca(m)
    };
    r.Tb = function (a) {
        return a && kc(this.a(), a) || this.s && this.s.Tb(a) || m
    };
    r.Za = function (a) {
        if (32 == a.keyCode) {
            if (a.preventDefault(), "keyup" != a.type) return m
        } else if ("key" != a.type) return m;
        if (this.s && this.s.V()) {
            var b = this.s.Sa(a);
            return 27 == a.keyCode ? (this.ca(m), i) : b
        }
        return 40 == a.keyCode || 38 == a.keyCode || 32 == a.keyCode ? (this.ca(i), i) : m
    };
    r.pf = function () {
        this.ca(m)
    };
    r.Ti = function () {
        this.od() || this.ca(m)
    };
    r.$b = function (a) {
        this.be || this.ca(m);
        wj.b.$b.call(this, a)
    };

    function yj(a) {
        a.s || a.Kc(new uj(a.q()));
        return a.s || k
    }
    r.Kc = function (a) {
        var b = this.s;
        if (a != b && (b && (this.ca(m), this.F && xj(this, b, m), delete this.s), a)) {
            this.s = a;
            pg(a, this);
            a.D(m);
            var c = this.be;
            (a.Pe = c) && a.wb(i);
            this.F && xj(this, a, i)
        }
        return b
    };
    r.cb = function (a) {
        yj(this).z(a, i)
    };
    r.mc = function (a, b) {
        yj(this).Pc(a, b, i)
    };
    r.wc = function (a) {
        return this.s ? this.s.A(a) : k
    };
    r.jf = function () {
        return this.s ? U(this.s) : 0
    };
    r.D = function (a, b) {
        var c = wj.b.D.call(this, a, b);
        c && !this.V() && this.ca(m);
        return c
    };
    r.za = function (a) {
        wj.b.za.call(this, a);
        this.isEnabled() || this.ca(m)
    };
    r.ca = function (a, b) {
        wj.b.ca.call(this, a);
        if (this.s && V(this, 64) == a) {
            if (a) this.s.F || (this.vh ? this.s.X(this.a().parentNode) : this.s.X()), this.lc = Yf(this.a()), this.Sb = dg(this.a()), zj(this), oi(this.s, -1);
            else if (this.setActive(m), this.s.sb = m, this.a() && yg(this.a(), "activedescendant", ""), this.ke != k) {
                this.ke = h;
                var c = this.s.a();
                c && ag(c, "", "")
            }
            this.s.D(a, m, b);
            if (!this.Rd) {
                var c = S(this),
                    d = a ? c.c : c.ja;
                d.call(c, sc(this.q()), "mousedown", this.Pi, i);
                this.be && d.call(c, this.s, "blur", this.Ti);
                d.call(c, this.sa, bf, this.uj);
                a ? this.sa.start() : this.sa.stop()
            }
        }
    };

    function zj(a) {
        if (a.s.F) {
            var b = a.Gj || a.a(),
                c = a.$l;
            c || (c = new bj(b, a.ai ? 5 : 7, !a.Yf, a.Yf));
            b = a.s.a();
            if (!a.s.V()) b.style.visibility = "hidden", Q(b, i);
            if (!a.ke && a.Yf) a.ke = bg(b);
            c.La(b, c.Uc ^ 1, a.hj, a.ke);
            if (!a.s.V()) Q(b, m), b.style.visibility = "visible"
        }
    }
    r.uj = function () {
        var a = dg(this.a()),
            b = Yf(this.a());
        if (!(this.Sb == a || (!this.Sb || !a ? 0 : this.Sb.left == a.left && this.Sb.width == a.width && this.Sb.top == a.top && this.Sb.height == a.height)) || !(this.lc == b || (!this.lc || !b ? 0 : this.lc.top == b.top && this.lc.right == b.right && this.lc.bottom == b.bottom && this.lc.left == b.left))) this.Sb = a, this.lc = b, zj(this)
    };

    function xj(a, b, c) {
        var d = S(a),
            c = c ? d.c : d.ja;
        c.call(d, b, "action", a.pf);
        c.call(d, b, "highlight", a.of);
        c.call(d, b, "unhighlight", a.sf)
    }
    r.of = function (a) {
        yg(this.a(), "activedescendant", a.target.a().id)
    };
    r.sf = function () {
        pi(this.s) || yg(this.a(), "activedescendant", "")
    };
    Hg("goog-menu-button", function () {
        return new wj(k)
    });

    function Aj(a) {
        this.l = [];
        Bj(this, a)
    }
    w(Aj, I);
    r = Aj.prototype;
    r.Lb = k;
    r.xh = k;
    r.jf = function () {
        return this.l.length
    };
    r.wc = function (a) {
        return this.l[a] || k
    };

    function Bj(a, b) {
        b && (y(b, function (a) {
            Cj(this, a, m)
        }, a), ab(a.l, b))
    }
    r.cb = function (a) {
        this.mc(a, this.jf())
    };
    r.mc = function (a, b) {
        a && (Cj(this, a, m), bb(this.l, b, 0, a))
    };
    r.gd = n("Lb");
    r.la = function () {
        return $a(this.l)
    };
    r.jc = function (a) {
        if (a != this.Lb) Cj(this, this.Lb, m), this.Lb = a, Cj(this, a, i);
        this.dispatchEvent("select")
    };
    r.Xd = function () {
        return this.Lb ? Sa(this.l, this.Lb) : -1
    };
    r.eg = function (a) {
        this.jc(this.wc(a))
    };
    r.clear = function () {
        var a = this.l;
        if (!ka(a))
            for (var b = a.length - 1; 0 <= b; b--) delete a[b];
        a.length = 0;
        this.Lb = k
    };
    r.h = function () {
        Aj.b.h.call(this);
        delete this.l;
        this.Lb = k
    };

    function Cj(a, b, c) {
        b && ("function" == typeof a.xh ? a.xh(b, c) : "function" == typeof b.Nb && b.Nb(c))
    };

    function Dj(a, b, c, d) {
        wj.call(this, a, b, c, d);
        this.Od = a;
        Ej(this);
        this.oe = "listbox"
    }
    w(Dj, wj);
    r = Dj.prototype;
    r.L = k;
    r.Od = k;
    r.t = function () {
        Dj.b.t.call(this);
        Ej(this);
        Fj(this);
        yg(this.a(), "haspopup", "false")
    };
    r.Qa = function (a) {
        Dj.b.Qa.call(this, a);
        (a = this.vc()) ? (this.Od = a, Ej(this)) : this.eg(0)
    };
    r.h = function () {
        Dj.b.h.call(this);
        if (this.L) this.L.j(), this.L = k;
        this.Od = k
    };
    r.pf = function (a) {
        this.jc(a.target);
        Dj.b.pf.call(this, a);
        a.stopPropagation();
        this.dispatchEvent("action")
    };
    r.Vi = function () {
        var a = this.gd();
        Dj.b.C.call(this, a && a.$());
        Ej(this)
    };
    r.Kc = function (a) {
        var b = Dj.b.Kc.call(this, a);
        a != b && (this.L && this.L.clear(), a && (this.L ? T(a, function (a) {
            Gj(a);
            this.L.cb(a)
        }, this) : Hj(this, a)));
        return b
    };
    r.cb = function (a) {
        Gj(a);
        Dj.b.cb.call(this, a);
        this.L ? this.L.cb(a) : Hj(this, yj(this))
    };
    r.mc = function (a, b) {
        Gj(a);
        Dj.b.mc.call(this, a, b);
        this.L ? this.L.mc(a, b) : Hj(this, yj(this))
    };
    r.jc = function (a) {
        if (this.L) {
            var b = this.gd();
            this.L.jc(a);
            a != b && this.dispatchEvent("change")
        }
    };
    r.eg = function (a) {
        this.L && this.jc(this.L.wc(a))
    };
    r.C = function (a) {
        if (a != k && this.L)
            for (var b = 0, c; c = this.L.wc(b); b++)
                if (c && "function" == typeof c.$ && c.$() == a) {
                    this.jc(c);
                    return
                }
        this.jc(k)
    };
    r.gd = function () {
        return this.L ? this.L.gd() : k
    };
    r.Xd = function () {
        return this.L ? this.L.Xd() : -1
    };

    function Hj(a, b) {
        a.L = new Aj;
        b && T(b, function (a) {
            Gj(a);
            this.L.cb(a)
        }, a);
        Fj(a)
    }

    function Fj(a) {
        a.L && S(a).c(a.L, "select", a.Vi)
    }

    function Ej(a) {
        var b = a.gd();
        a.ma(b ? b.vc() : a.Od)
    }

    function Gj(a) {
        a.oe = a instanceof rj ? "option" : "separator"
    }
    r.ca = function (a, b) {
        Dj.b.ca.call(this, a, b);
        V(this, 64) && oi(yj(this), this.Xd())
    };
    Hg("goog-select", function () {
        return new Dj(k)
    });

    function Ij(a, b, c) {
        rj.call(this, a, b, c);
        this.dg(i)
    }
    w(Ij, rj);
    Ij.prototype.Hb = function () {
        return this.dispatchEvent("action")
    };
    Hg("goog-option", function () {
        return new Ij(k)
    });

    function Jj() {}
    w(Jj, $i);
    t(Jj);
    r = Jj.prototype;
    r.d = function (a) {
        var b = {
            "class": "goog-inline-block " + this.Ra(a).join(" "),
            title: a.Db() || ""
        };
        return a.q().d("div", b, [this.createCaption(a.Ha, a.q()), this.Md(a.q())])
    };
    r.J = function (a) {
        return a && a.firstChild
    };
    r.I = function (a, b) {
        var c = Zb(document, "*", "goog-menu", b)[0];
        if (c) {
            Q(c, m);
            sc(a.q()).body.appendChild(c);
            var d = new uj;
            d.I(c);
            a.Kc(d)
        }
        Zb(document, "*", this.f() + "-caption", b)[0] || b.appendChild(this.createCaption(b.childNodes, a.q()));
        Zb(document, "*", this.f() + "-dropdown", b)[0] || b.appendChild(this.Md(a.q()));
        return Jj.b.I.call(this, a, b)
    };
    r.createCaption = function (a, b) {
        return b.d("div", "goog-inline-block " + (this.f() + "-caption"), a)
    };
    r.Md = function (a) {
        return a.d("div", "goog-inline-block " + (this.f() + "-dropdown"), "\u00a0")
    };
    r.f = p("goog-flat-menu-button");
    Hg("goog-flat-menu-button", function () {
        return new wj(k, k, Jj.v())
    });

    function Kj() {}
    w(Kj, zg);
    t(Kj);
    Kj.prototype.f = p("au-upldr-top-pane");
    Kj.prototype.d = function (a) {
        var b = a.q().d("div", this.Ra(a).join(" "));
        a.g = b;
        var c = a.i.o,
            d = aj.v(),
            f = cc("div", "au-upldr-title");
        A(f, "titleText");
        b.appendChild(f);
        var g = new vg(J(c, "TitleText"));
        Y(c, "TitleText", function () {
            wg(g, J(c, "TitleText"))
        });
        a.z(g, m);
        g.X(f);
        var j = [new X(J(c, "AddFilesHyperlinkText"), d), new vg(J(c, "OrText")), new X(J(c, "ClearAllHyperlinkText"), d)];
        j[0].za(J(c, "EnableAddingFiles"));
        j[2].za(m);
        Y(c, "AddFilesHyperlinkText", function () {
            j[0].ma(J(c, "AddFilesHyperlinkText"))
        });
        Y(c, "EnableAddingFiles",
            function () {
                j[0].za(J(c, "EnableAddingFiles"))
            });
        Y(c, "OrText", function () {
            wg(j[1], J(c, "OrText"))
        });
        Y(c, "ClearAllHyperlinkText", function () {
            j[2].ma(J(c, "ClearAllHyperlinkText"))
        });
        y(j, function (c, d) {
            0 < d && gc(b, "\u00a0");
            a.z(c, i)
        });
        A(j[0].a(), "htmlLink");
        A(j[1].a(), "uploadPanelOrText");
        A(j[2].a(), "htmlLink");
        var d = J(c, "ViewComboBox"),
            l = new Dj(k, k, Jj.v());
        l.cb(new rj(d[0], "tiles"));
        l.cb(new rj(d[1], "thumbnails"));
        l.cb(new rj(d[2], "icons"));
        l.C(J(c, "ViewMode"));
        l.vh = i;
        Y(c, "ViewComboBox", function () {
            for (var a =
                J(c, "ViewComboBox"), b = 0; 3 > b; b++) l.wc(b).ma(a[b]);
            l.eg(l.Xd())
        });
        Y(c, "ViewMode", function () {
            l.C(J(c, "ViewMode"))
        });
        f = cc("div", "au-upldr-change-view");
        b.insertBefore(f, b.childNodes[0] || k);
        var o = [new vg(J(c, "ViewComboBoxText")), l];
        Y(c, "ViewComboBoxText", function () {
            wg(o[0], J(c, "ViewComboBoxText"))
        });
        y(o, function (c, d) {
            0 < d && gc(b, "\u00a0");
            a.z(c, m);
            c.X(f)
        });
        A(o[0].a(), "panelText");
        A(o[1].a(), "viewComboBox");
        var q = f;
        Q(q, J(c, "ShowViewComboBox"));
        Y(c, "ShowViewComboBox", function () {
            Q(q, J(c, "ShowViewComboBox"))
        });
        return b
    };

    function Lj(a, b) {
        W.call(this, k, b);
        this.i = a;
        Ug(this, 255, m)
    }
    w(Lj, W);
    r = Lj.prototype;
    r.t = function () {
        Lj.b.t.call(this);
        var a = S(this);
        a.c(this.A(1), "action", this.kj);
        a.c(this.A(3), "action", this.tj);
        var b = this.A(5);
        a.c(b, "action", this.yj);
        var c, d;
        d = yj(b).F;
        d || (c = yj(b).a(), b.a().parentNode.appendChild(c));
        var f = bg(c);
        d || ic(c);
        if (0 < f.width) c = b.a(), b = hg(c, "padding"), c.style.width = Uf(f.width - b.left - b.right, i);
        a.c(this.i.la(), ad, this.zf);
        Y(this.i.o, "UploaderState", this.kg, this)
    };
    r.kg = function () {
        for (var a = [this.A(1), this.A(2), this.A(3)], b = this.i.Ia(), c = 0; c < a.length; c++) Q(a[c].J(), 2 != b)
    };
    r.kj = function () {
        this.i.Oe()
    };
    r.tj = function () {
        var a = this.i;
        a.l.clear();
        a.N(0)
    };
    r.yj = function (a) {
        this.i.o.setProperty("ViewMode", a.target.$())
    };
    r.zf = function (a) {
        this.A(3).za(0 < a.target.Z())
    };
    r.R = gd;
    r.Zg = gd;
    Fg(Lj, Kj);

    function Mj(a, b) {
        R.call(this, b);
        this.i = a
    }
    w(Mj, R);
    r = Mj.prototype;
    r.f = p("au-upldr-uploader");
    r.hf = function () {
        return this.A(2).A(0).hf()
    };
    r.d = function () {
        var a = this.i,
            b = a.o,
            c = new Mf;
        c.append("width:");
        c.append(J(b, "Width"));
        c.append(";height:");
        c.append(J(b, "Height"));
        var d = this.q(),
            f = [d.d("div", k), d.d("div", k), d.d("div", k), d.d("div", k)],
            g = d.d("div", this.f() + "-panes", f[0], f[1], f[2], f[3], f[4]);
        "-ms-flex" in g.style && A(g, "flexbox");
        this.g = g = d.d("div", {
            className: this.f(),
            id: J(b, "Id"),
            style: c.toString()
        }, g);
        for (var c = [new Lj(a), new vh(a), new Vi(a), new ih(a)], j = 0; j < c.length; j++) c[j] && (this.z(c[j], m), c[j].X(f[j]));
        this.Rc = d.d("div", this.f() +
            "-bg");
        Q(this.Rc, m);
        g.appendChild(this.Rc);
        (this.Eg = new Eh(b)).X(g);
        (this.ab = new rh(a)).X(g);
        this.wf = new Xi(b);
        this.wf.X(g)
    };
    r.t = function () {
        Mj.b.t.call(this);
        S(this).c(this.Eg, [Fh, Gh], this.Ye).c(this.ab, [sh, th], this.Ye).c(this.wf, [Yi, Zi], this.Ye)
    };
    r.Ah = function (a, b) {
        this.fg && (clearTimeout(this.fg), delete this.fg);
        0 < b ? this.fg = pd(v(this.Ah, this, a), b) : Q(this.Rc, !a)
    };
    r.Ye = function (a) {
        this.Ah(a.type === Fh)
    };
    r.R = gd;

    function Nj() {
        this.uh = va()
    }
    var Oj = new Nj;
    Nj.prototype.set = da("uh");
    Nj.prototype.reset = function () {
        this.set(va())
    };
    Nj.prototype.get = n("uh");

    function Pj(a) {
        this.Vf = a || "";
        this.$j = Oj
    }
    r = Pj.prototype;
    r.Bh = i;
    r.Fh = i;
    r.Eh = i;
    r.Dh = m;
    r.Gh = m;

    function Qj(a) {
        return 10 > a ? "0" + a : "" + a
    }

    function Rj(a, b) {
        var c = (a.Nh - b) / 1E3,
            d = c.toFixed(3),
            f = 0;
        if (1 > c) f = 2;
        else
            for (; 100 > c;) f++, c *= 10;
        for (; 0 < f--;) d = " " + d;
        return d
    }

    function Sj(a) {
        Pj.call(this, a)
    }
    w(Sj, Pj);

    function Tj() {
        this.Hj = v(this.$h, this);
        this.uc = new Sj(this.Vf);
        this.uc.Bh = m;
        this.uc.Dh = i;
        this.uc.Gh = i;
        this.uc.Fh = m;
        this.Xg = this.uc.Eh = m
    }
    w(Tj, I);
    t(Tj);
    Tj.prototype.Vf = "[htmluploader_trace]";
    Tj.prototype.$h = function (a) {
        var b = this.uc,
            c = [];
        c.push(b.Vf, " ");
        if (b.Bh) {
            var d = new Date(a.Nh);
            c.push("[", Qj(d.getFullYear() - 2E3) + Qj(d.getMonth() + 1) + Qj(d.getDate()) + " " + Qj(d.getHours()) + ":" + Qj(d.getMinutes()) + ":" + Qj(d.getSeconds()) + "." + Qj(Math.floor(d.getMilliseconds() / 10)), "] ")
        }
        b.Fh && c.push("[", Rj(a, b.$j.get()), "s] ");
        b.Eh && c.push("[", a.dj, "] ");
        b.Gh && c.push("[", a.Gc.name, "] ");
        c.push(a.jh, "\n");
        b.Dh && a.ef && c.push(a.df, "\n");
        a = c.join("");
        b = new G("trace");
        b.log = a;
        this.dispatchEvent(b);
        b.j()
    };
    N("au.upldr").$f(Le);
    Qe = ca();
    var Uj = {
        "*.323": "text/h323",
        "*.asx": "video/x-ms-asf",
        "*.acx": "application/internet-property-stream",
        "*.ai": "application/postscript",
        "*.aif": "audio/x-aiff",
        "*.aiff": "audio/aiff",
        "*.axs": "application/olescript",
        "*.aifc": "audio/aiff",
        "*.asr": "video/x-ms-asf",
        "*.avi": "video/x-msvideo",
        "*.asf": "video/x-ms-asf",
        "*.au": "audio/basic",
        "*.application": "application/x-ms-application",
        "*.bin": "application/octet-stream",
        "*.bas": "text/plain",
        "*.bcpio": "application/x-bcpio",
        "*.bmp": "image/bmp",
        "*.cdf": "application/x-cdf",
        "*.cat": "application/vndms-pkiseccat",
        "*.crt": "application/x-x509-ca-cert",
        "*.c": "text/plain",
        "*.css": "text/css",
        "*.cer": "application/x-x509-ca-cert",
        "*.crl": "application/pkix-crl",
        "*.cmx": "image/x-cmx",
        "*.csh": "application/x-csh",
        "*.cod": "image/cis-cod",
        "*.cpio": "application/x-cpio",
        "*.clp": "application/x-msclip",
        "*.crd": "application/x-mscardfile",
        "*.deploy": "application/octet-stream",
        "*.dll": "application/x-msdownload",
        "*.dot": "application/msword",
        "*.doc": "application/msword",
        "*.dvi": "application/x-dvi",
        "*.dir": "application/x-director",
        "*.dxr": "application/x-director",
        "*.der": "application/x-x509-ca-cert",
        "*.dib": "image/bmp",
        "*.dcr": "application/x-director",
        "*.disco": "text/xml",
        "*.exe": "application/octet-stream",
        "*.etx": "text/x-setext",
        "*.evy": "application/envoy",
        "*.eml": "message/rfc822",
        "*.eps": "application/postscript",
        "*.flr": "x-world/x-vrml",
        "*.fif": "application/fractals",
        "*.gtar": "application/x-gtar",
        "*.gif": "image/gif",
        "*.png": "image/png",
        "*.gz": "application/x-gzip",
        "*.hta": "application/hta",
        "*.htc": "text/x-component",
        "*.htt": "text/webviewhtml",
        "*.h": "text/plain",
        "*.hdf": "application/x-hdf",
        "*.hlp": "application/winhlp",
        "*.html": "text/html",
        "*.htm": "text/html",
        "*.hqx": "application/mac-binhex40",
        "*.isp": "application/x-internet-signup",
        "*.iii": "application/x-iphone",
        "*.ief": "image/ief",
        "*.ivf": "video/x-ivf",
        "*.ins": "application/x-internet-signup",
        "*.ico": "image/x-icon",
        "*.jpg": "image/jpeg",
        "*.jfif": "image/pjpeg",
        "*.jpe": "image/jpeg",
        "*.jpeg": "image/jpeg",
        "*.js": "application/x-javascript",
        "*.lsx": "video/x-la-asf",
        "*.latex": "application/x-latex",
        "*.lsf": "video/x-la-asf",
        "*.manifest": "application/x-ms-manifest",
        "*.mhtml": "message/rfc822",
        "*.mny": "application/x-msmoney",
        "*.mht": "message/rfc822",
        "*.mid": "audio/mid",
        "*.mpv2": "video/mpeg",
        "*.man": "application/x-troff-man",
        "*.mvb": "application/x-msmediaview",
        "*.mpeg": "video/mpeg",
        "*.m3u": "audio/x-mpegurl",
        "*.mdb": "application/x-msaccess",
        "*.mpp": "application/vnd.ms-project",
        "*.m1v": "video/mpeg",
        "*.mpa": "video/mpeg",
        "*.me": "application/x-troff-me",
        "*.m13": "application/x-msmediaview",
        "*.movie": "video/x-sgi-movie",
        "*.m14": "application/x-msmediaview",
        "*.mpe": "video/mpeg",
        "*.mp2": "video/mpeg",
        "*.mov": "video/quicktime",
        "*.mp3": "audio/mpeg",
        "*.mpg": "video/mpeg",
        "*.ms": "application/x-troff-ms",
        "*.nc": "application/x-netcdf",
        "*.nws": "message/rfc822",
        "*.oda": "application/oda",
        "*.odt": "application/vnd.oasis.opendocument.text",
        "*.ods": "application/oleobject",
        "*.pmc": "application/x-perfmon",
        "*.p7r": "application/x-pkcs7-certreqresp",
        "*.p7b": "application/x-pkcs7-certificates",
        "*.p7s": "application/pkcs7-signature",
        "*.pmw": "application/x-perfmon",
        "*.ps": "application/postscript",
        "*.p7c": "application/pkcs7-mime",
        "*.pbm": "image/x-portable-bitmap",
        "*.ppm": "image/x-portable-pixmap",
        "*.pub": "application/x-mspublisher",
        "*.pnm": "image/x-portable-anymap",
        "*.pml": "application/x-perfmon",
        "*.p10": "application/pkcs10",
        "*.pfx": "application/x-pkcs12",
        "*.p12": "application/x-pkcs12",
        "*.pdf": "application/pdf",
        "*.pps": "application/vnd.ms-powerpoint",
        "*.p7m": "application/pkcs7-mime",
        "*.pko": "application/vndms-pkipko",
        "*.ppt": "application/vnd*.ms-powerpoint",
        "*.pmr": "application/x-perfmon",
        "*.pma": "application/x-perfmon",
        "*.pot": "application/vnd.ms-powerpoint",
        "*.prf": "application/pics-rules",
        "*.pgm": "image/x-portable-graymap",
        "*.qt": "video/quicktime",
        "*.ra": "audio/x-pn-realaudio",
        "*.rgb": "image/x-rgb",
        "*.ram": "audio/x-pn-realaudio",
        "*.rmi": "audio/mid",
        "*.ras": "image/x-cmu-raster",
        "*.roff": "application/x-troff",
        "*.rtf": "application/rtf",
        "*.rtx": "text/richtext",
        "*.sv4crc": "application/x-sv4crc",
        "*.spc": "application/x-pkcs7-certificates",
        "*.setreg": "application/set-registration-initiation",
        "*.snd": "audio/basic",
        "*.stl": "application/vndms-pkistl",
        "*.setpay": "application/set-payment-initiation",
        "*.stm": "text/html",
        "*.shar": "application/x-shar",
        "*.sh": "application/x-sh",
        "*.sit": "application/x-stuffit",
        "*.spl": "application/futuresplash",
        "*.sct": "text/scriptlet",
        "*.scd": "application/x-msschedule",
        "*.sst": "application/vndms-pkicertstore",
        "*.src": "application/x-wais-source",
        "*.sv4cpio": "application/x-sv4cpio",
        "*.tex": "application/x-tex",
        "*.tgz": "application/x-compressed",
        "*.t": "application/x-troff",
        "*.tar": "application/x-tar",
        "*.tr": "application/x-troff",
        "*.tif": "image/tiff",
        "*.txt": "text/plain",
        "*.texinfo": "application/x-texinfo",
        "*.trm": "application/x-msterminal",
        "*.tiff": "image/tiff",
        "*.tcl": "application/x-tcl",
        "*.texi": "application/x-texinfo",
        "*.tsv": "text/tab-separated-values",
        "*.ustar": "application/x-ustar",
        "*.uls": "text/iuls",
        "*.vcf": "text/x-vcard",
        "*.wps": "application/vnd.ms-works",
        "*.wav": "audio/wav",
        "*.wrz": "x-world/x-vrml",
        "*.wri": "application/x-mswrite",
        "*.wks": "application/vnd.ms-works",
        "*.wmf": "application/x-msmetafile",
        "*.wcm": "application/vnd.ms-works",
        "*.wrl": "x-world/x-vrml",
        "*.wdb": "application/vnd.ms-works",
        "*.wsdl": "text/xml",
        "*.xml": "text/xml",
        "*.xlm": "application/vnd.ms-excel",
        "*.xaf": "x-world/x-vrml",
        "*.xla": "application/vnd.ms-excel",
        "*.xls": "application/vnd.ms-excel",
        "*.xof": "x-world/x-vrml",
        "*.xlt": "application/vnd.ms-excel",
        "*.xlc": "application/vnd.ms-excel",
        "*.xsl": "text/xml",
        "*.xbm": "image/x-xbitmap",
        "*.xlw": "application/vnd*.ms-excel",
        "*.xpm": "image/x-xpixmap",
        "*.xwd": "image/x-xwindowdump",
        "*.xsd": "text/xml",
        "*.z": "application/x-compress",
        "*.zip": "application/x-zip-compressed",
        "*.*": ""
    };

    function Vj(a, b) {
        var c;
        if (kj || hj) {
            c = [];
            if (b && 0 != b.length)
                for (var d = b.split(";"), f = 0; f < d.length; f++) {
                    var g;
                    g = d[f];
                    var j = Uj[g];
                    g = j ? j : g.replace("*", ""); - 1 == c.indexOf(g) && c.push(g)
                }
            c = 0 == c.length ? "" : c.join(",")
        } else if (b && 0 != b.length) {
            c = [];
            d = b.split(";");
            for (f = 0; f < d.length; f++) c.push(d[f].replace("*", ""));
            c = c.join(",")
        } else c = "";
        this.tc = cc("input", {
            type: "file",
            multiple: "multiple",
            accept: c,
            style: "position:absolute;visibility:hidden;top:-100px;width:1px;height:1px"
        });
        (a || document.body).appendChild(this.tc);
        H(this.tc, "change", this.ri, m, this)
    }
    w(Vj, I);
    Vj.prototype.open = function () {
        this.tc.click()
    };
    Vj.prototype.ri = function (a) {
        a = a.target;
        this.dispatchEvent(new Hh(a.files));
        a.value = ""
    };
    Vj.prototype.h = function () {
        Vj.b.h.call(this);
        Vc(this.tc);
        ic(this.tc);
        delete this.tc
    };

    function Wj(a, b) {
        this.bh = b;
        this.cd = [];
        a > this.bh && e(Error("[goog.structs.SimplePool] Initial cannot be greater than max"));
        for (var c = 0; c < a; c++) this.cd.push(this.Nd())
    }
    w(Wj, Dc);
    r = Wj.prototype;
    r.Cg = k;
    r.Fg = k;

    function Xj(a, b) {
        a.cd.length < a.bh ? a.cd.push(b) : a.Ze(b)
    }
    r.Nd = function () {
        return this.Cg ? this.Cg() : {}
    };
    r.Ze = function (a) {
        if (this.Fg) this.Fg(a);
        else if (na(a))
            if (ma(a.j)) a.j();
            else
                for (var b in a) delete a[b]
    };
    r.h = function () {
        Wj.b.h.call(this);
        for (var a = this.cd; a.length;) this.Ze(a.pop());
        delete this.cd
    };

    function Yj() {
        this.Zc = [];
        this.Qf = new we;
        this.Ph = this.Qh = this.Rh = this.Hh = 0;
        this.Bd = new we;
        this.yg = this.Oh = 0;
        this.Mf = 1;
        this.bf = new Wj(0, 4E3);
        this.bf.Nd = function () {
            return new Zj
        };
        this.Ih = new Wj(0, 50);
        this.Ih.Nd = function () {
            return new $j
        };
        var a = this;
        this.tf = new Wj(0, 2E3);
        this.tf.Nd = function () {
            return "" + a.Mf++
        };
        this.tf.Ze = ca();
        this.ki = 3
    }
    Yj.prototype.B = N("goog.debug.Trace");

    function $j() {
        this.lg = this.Mh = this.Ve = 0
    }
    $j.prototype.toString = function () {
        var a = [];
        a.push(this.type, " ", this.Ve, " (", Math.round(10 * this.Mh) / 10, " ms)");
        this.lg && a.push(" [VarAlloc = ", this.lg, "]");
        return a.join("")
    };

    function Zj() {}

    function ak(a, b, c, d) {
        var f = []; - 1 == c ? f.push("    ") : f.push(bk(a.Jg - c));
        f.push(" ", ck(a.Jg - b));
        0 == a.cf ? f.push(" Start        ") : 1 == a.cf ? (f.push(" Done "), f.push(bk(a.em - a.startTime), " ms ")) : f.push(" Comment      ");
        f.push(d, a);
        0 < a.dk && f.push("[VarAlloc ", a.dk, "] ");
        return f.join("")
    }
    Zj.prototype.toString = function () {
        return this.type == k ? this.hi : "[" + this.type + "] " + this.hi
    };
    Yj.prototype.reset = function (a) {
        this.ki = a;
        for (a = 0; a < this.Zc.length; a++) {
            var b = this.bf.id;
            b && Xj(this.tf, b);
            Xj(this.bf, this.Zc[a])
        }
        this.Zc.length = 0;
        this.Qf.clear();
        this.Hh = va();
        this.yg = this.Oh = this.Ph = this.Qh = this.Rh = 0;
        b = this.Bd.fd();
        for (a = 0; a < b.length; a++) {
            var c = this.Bd.get(b[a]);
            c.Ve = 0;
            c.Mh = 0;
            c.lg = 0;
            Xj(this.Ih, c)
        }
        this.Bd.clear()
    };
    Yj.prototype.toString = function () {
        for (var a = [], b = -1, c = [], d = 0; d < this.Zc.length; d++) {
            var f = this.Zc[d];
            1 == f.cf && c.pop();
            a.push(" ", ak(f, this.Hh, b, c.join("")));
            b = f.Jg;
            a.push("\n");
            0 == f.cf && c.push("|  ")
        }
        if (0 != this.Qf.Z()) {
            var g = va();
            a.push(" Unstopped timers:\n");
            ve(this.Qf, function (b) {
                a.push("  ", b, " (", g - b.startTime, " ms, started at ", ck(b.startTime), ")\n")
            })
        }
        b = this.Bd.fd();
        for (d = 0; d < b.length; d++) c = this.Bd.get(b[d]), 1 < c.Ve && a.push(" TOTAL ", c, "\n");
        a.push("Total tracers created ", this.Oh, "\n", "Total comments created ",
            this.yg, "\n", "Overhead start: ", this.Rh, " ms\n", "Overhead end: ", this.Qh, " ms\n", "Overhead comment: ", this.Ph, " ms\n");
        return a.join("")
    };

    function bk(a) {
        var a = Math.round(a),
            b = "";
        1E3 > a && (b = " ");
        100 > a && (b = "  ");
        10 > a && (b = "   ");
        return b + a
    }

    function ck(a) {
        a = Math.round(a);
        return ("" + (100 + a / 1E3 % 60)).substring(1, 3) + "." + ("" + (1E3 + a % 1E3)).substring(1, 4)
    }
    new Yj;

    function dk() {
        this.r = new dd(this);
        this.pb = new id;
        this.r.c(this.pb, jd, this.vf);
        this.Ka = [];
        this.rc = k
    }
    w(dk, I);
    t(dk);
    dk.prototype.create = function (a, b) {
        M(this.e, "Enqueue new item to preview generation");
        this.Ka.push({
            item: a,
            size: b
        });
        this.rc || this.Ib()
    };
    dk.prototype.Ib = function () {
        if (!(this.rc || 0 == this.Ka.length)) this.rc = this.Ka.shift(), this.pb.load(this.rc.item.getFile())
    };
    dk.prototype.vf = function () {
        if (this.pb.Ec()) {
            var a = this.pb.pa,
                b = this.rc;
            b.item.ra(Kd, a.width);
            b.item.ra(Ld, a.height);
            b.item.N(Jd);
            for (var c = b.size, b = [b.item.Ce, b.item.Ae], d = 0; 2 > d; d++) {
                var f = b[d];
                if (f = Cf(a, "fit", c[d].width, c[d].height, k, 0, f)) f.style.marginTop = Math.round((c[d].height - f.height) / 2) + "px", f.style.marginLeft = Math.round((c[d].width - f.width) / 2) + "px"
            }
        }
        this.dispatchEvent(zd);
        this.rc = k;
        this.Ib()
    };
    dk.prototype.e = N("au.upldr.image.PreviewGenerator");

    function ek() {
        this.S = []
    }
    w(ek, I);
    r = ek.prototype;
    r.add = function (a) {
        if (!Wa(this.S, a)) {
            var b = this.S;
            Wa(b, a) || b.push(a);
            a = new $c(ad, "add", [a]);
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
            return i
        }
        return m
    };
    r.remove = function (a) {
        var b = m;
        if (ka(a))
            for (var c, d = 0; c = a[d++];) b |= Xa(this.S, c);
        else b = Xa(this.S, a); if (b) {
            a = new $c(ad, "remove", [a]);
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
        }
        return b
    };
    r.Kb = function (a) {
        return this.remove(this.getItem(a))
    };
    r.getItem = function (a) {
        return this.S[a]
    };
    r.clear = function () {
        if (0 < this.S.length) {
            this.S = [];
            var a = new $c(ad, "reset", []);
            try {
                this.dispatchEvent(a)
            } finally {
                a.j()
            }
        }
    };
    r.contains = function (a) {
        return Wa(this.S, a)
    };
    r.forEach = function (a, b) {
        y(this.S, function (c, d) {
            a.call(b, c, d, this)
        }, this)
    };
    r.Z = function () {
        return this.S.length
    };
    r.Ee = function () {
        return this.S.slice()
    };

    function fk() {}
    w(fk, I);
    fk.prototype.setProperty = function (a, b) {
        var c = a + "_";
        b !== this[c] && (this[c] = b, this.dispatchEvent(a + "Changed"))
    };

    function Y(a, b, c, d) {
        H(a, b + "Changed", c, m, d)
    }

    function J(a, b) {
        return a[b + "_"]
    }
    fk.prototype.e = N("au.upldr.PropertyHolder");

    function gk() {
        this.l = []
    }
    r = gk.prototype;
    r.add = function (a) {
        var b = this.l.length;
        a instanceof Ef || (a ? u(a) && (a = {
            mode: a
        }) : a = {}, a = new Ef(b, a.mode || "*.*=SourceFile", a.thumbnailWidth, a.thumbnailHeight, a.thumbnailFitMode, a.thumbnailBgColor));
        this.l.push(a);
        return b
    };
    r.Kb = function (a) {
        return this.l.length > a ? 1 == Ra.splice.call(this.l, a, 1).length : m
    };
    r.getItem = function (a) {
        return this.l[a]
    };
    r.Z = function () {
        return this.l.length
    };
    r.Ee = function () {
        return this.l.slice()
    };
    r.e = N("au.upldr.Converters");

    function hk(a) {
        this.r = new dd(this);
        ik(this);
        xc() || (L(this.e, "HTML5 Uploader is not supported in this browser."), window.alert("HTML5 Uploader is not supported in this browser."));
        var b = ob();
        na(a) && qb(b, a);
        this.l = new ek;
        this.na = new Mj(this);
        this.o = new fk;
        this.O = new gk;
        this.rd = new bd;
        this.nd = new de;
        this.r.c(this.nd, ie, this.bj).c(this.nd, he, this.$i).c(this.nd, je, this.aj);
        this.Cb = {};
        this.de = {};
        this.We = m;
        jk(this, b);
        this.r.c(dk.v(), zd, function () {
            this.We = m;
            kk(this)
        })
    }
    w(hk, I);
    r = hk.prototype;
    r.Oe = function () {
        this.$c.open()
    };
    r.pe = function (a) {
        M(this.e, "Remove file at " + a + " position");
        (a = this.l.Kb(a)) && (0 < this.l.Z() ? this.N(1) : this.N(0));
        return a
    };
    r.X = function (a) {
        if (xc()) {
            this.Kj && rd("Uploader already rendered");
            this.na.X(a);
            this.r.c(this.na, xd, this.og);
            var b = Qd(J(this.o, "FileMask"));
            this.$c = new Vj(a, b);
            this.r.c(this.$c, xd, this.og);
            this.Kj = i;
            this.e.info("Version: 8.0.60.0; Build date: 2014-1-16");
            pd(this.ni, 0, this)
        } else this.e.error("HTML5 Uploader is not supported in this browser.")
    };
    r.ni = function () {
        try {
            this.dispatchEvent("initComplete")
        } catch (a) {
            L(this.e, 'Error in "initComplete" event: ' + a.message)
        }
    };
    r.og = function (a) {
        M(this.e, "Adding files...");
        a = a.bd;
        if (0 < a.length) {
            for (var b = this.l, c = b.Z(), d = 0, f = 0; f < c; ++f) d += b.getItem(f).yc();
            this.hg = 0;
            this.gg = [];
            b = this.o;
            b = new Pd(J(b, "FileMask"), J(b, "MaxFileCount"), J(b, "MaxTotalFileSize"), J(b, "MaxFileSize"), J(b, "MinFileSize"), J(b, "MaxImageWidth"), J(b, "MinImageWidth"), J(b, "MaxImageHeight"), J(b, "MinImageHeight"));
            fd(this.r, this.na.ab, uh, this.ug);
            this.na.ab.Mb(a.length);
            this.na.ab.C(0);
            this.na.ab.show();
            f = this.nd;
            f.bd = Array.prototype.slice.call(a);
            f.Af = c;
            f.ce =
                d;
            f.mg = b;
            f.ua = m;
            ee(f)
        }
    };

    function ik(a) {
        var b = Tj.v();
        if (i != b.Xg) {
            Ue();
            var c = Te,
                d = b.Hj;
            if (!c.hd) c.hd = [];
            c.hd.push(d);
            b.Xg = i
        }
        a.r.c(b, "trace", a.ej)
    }
    r.ej = function (a) {
        var b = new G("trace");
        b.log = a.log;
        try {
            this.dispatchEvent(b)
        } catch (c) {} finally {
            b.j()
        }
    };
    r.bj = function (a) {
        for (var a = a.items, b = 0, c = a.length; b < c; ++b) {
            var d = a[b];
            this.l.add(d);
            Gd(d) && (this.de[oa(d)] = 1)
        }
        0 < c && this.na.ab.C(this.na.ab.$() + c);
        this.N(0 < this.l.Z() ? 1 : 0)
    };
    r.aj = function (a) {
        var b = a.item,
            a = a.code;
        M(this.e, 'File "' + b.getName() + '" skipped (' + a + ")");
        this.hg++;
        var c, d = -1,
            b = b.getName(),
            f = this.o;
        switch (a) {
        case Sd:
            c = K(J(f, "FileNameNotAllowedMessage"), b);
            d = 5;
            break;
        case Vd:
            c = K(J(f, "MaxFileCountExceeded"), J(f, "MaxFileCount"));
            d = 6;
            break;
        case Wd:
            c = K(J(f, "MaxTotalFileSizeExceeded"), Cd(J(f, "MaxTotalFileSize"), 0));
            d = 7;
            break;
        case Td:
            c = K(J(f, "MaxFileSizeExceeded"), b, Cd(J(f, "MaxFileSize"), 0));
            d = 0;
            break;
        case Ud:
            c = K(J(f, "FileSizeTooSmall"), b, Cd(J(f, "MinFileSize"), 0));
            d =
                1;
            break;
        case $d:
        case ae:
            c = K(J(f, "DimensionsTooLarge"), b, J(f, "MaxImageWidth"), J(f, "MaxImageHeight"));
            d = 3;
            break;
        case be:
        case ce:
            c = K(J(f, "DimensionsTooSmall"), b, J(f, "MinImageWidth"), J(f, "MinImageHeight")), d = 4
        }
        c && this.gg.push(c);
        if (-1 < d) {
            c = d;
            a = new G("restrictionFailed");
            a.code = c;
            try {
                this.dispatchEvent(a)
            } catch (g) {
                L(this.e, 'Error in "restrictionFailed" event: ' + g.message)
            } finally {
                a.j()
            }
        }
        this.na.ab.C(this.na.ab.$() + 1)
    };
    r.$i = function () {
        M(this.e, "Files added.");
        this.na.ab.Ta();
        this.r.ja(this.na.ab, uh, this.ug);
        var a = this.gg;
        if (4 < a.length) this.ue(K(J(this.o, "FilesNotAdded"), this.hg));
        else
            for (var b = 0, c = a.length; b < c; ++b) this.ue(a[b]);
        this.gg = [];
        this.hg = 0;
        try {
            this.dispatchEvent("itemsAdded")
        } catch (d) {
            L(this.e, 'Error in "itemsAdded" event: ' + d.message)
        }
        kk(this)
    };

    function kk(a) {
        if (!a.We)
            if (wc()) {
                var b = dk.v(),
                    c;
                c = J(a.o, "TilePreviewSize");
                c = {
                    width: c,
                    height: c
                };
                var d;
                d = J(a.o, "ThumbnailPreviewSize");
                d = {
                    width: d,
                    height: d
                };
                for (var f = a.l, g = f.Z(), j = a.na.hf(), j = Math.max(0, Math.min(g - 1, j)), l = 0; l < g; l++) {
                    var o = f.getItem(j);
                    if (o) {
                        var q = oa(o);
                        if (a.de[q]) {
                            delete a.de[q];
                            a.We = i;
                            b.create(o, [c, d]);
                            break
                        }
                    }
                    j = (j + 1) % g
                }
            } else a.de = {}, L(a.e, "The browser doesn't support Blob URI. Preview wouldn't be created.")
    }
    r.ug = function () {
        this.nd.reset()
    };
    r.la = n("l");

    function jk(a, b) {
        kb(Ba, function (a, b) {
            this.setProperty(b, a)
        }, a.o);
        y(lb(Aa), function (a) {
            this["set" + a](b[a])
        }, a)
    }
    r.Ia = function () {
        return J(this.o, "UploaderState")
    };
    r.N = function (a) {
        this.o.setProperty("UploaderState", a)
    };
    r.h = function () {
        hk.b.h.call(this);
        this.na.j();
        delete this.na;
        this.$c && (this.$c.j(), delete this.$c);
        this.o.j();
        delete this.o;
        this.l.forEach(function (a) {
            a.j()
        });
        delete this.l;
        lk(this)
    };
    r.upload = function () {
        if (1 == this.Ia())
            if (this.l.Z() >= J(this.o, "MinFileCount")) {
                M(this.e, "Dispatch BeforeUpload event");
                var a;
                try {
                    a = this.dispatchEvent("beforeUpload")
                } catch (b) {
                    L(this.e, 'Error in "beforeUpload" event: ' + b.message)
                }
                if (a) {
                    M(this.e, "Start upload");
                    this.N(2);
                    mk(this, 1, 0, 0, this.la().Z(), 0, 0);
                    a = this.Ie = new uf(h, h, J(this.o, "ProgressBytesMode"));
                    this.r.c(a, "beforePackageUpload", this.Th).c(a, "afterPackageUpload", this.Sh).c(a, zd, this.Uh).c(a, "progress", this.Vh).c(a, "error", this.kk);
                    var c = J(this.o,
                        "ActionUrl");
                    this.ng("UploaderId", J(this.o, "Id"));
                    vf(a, this.la().Ee(), this.O.Ee(), c, this.Cb)
                }
            } else a = J(this.o, "TooFewFiles"), a = K(a, J(this.o, "MinFileCount")), this.ue(a), this.Vb(1, -1, "", a)
    };
    r.Th = function (a) {
        M(this.e, "BeforePackageUpload event: " + a.le);
        var b = new G("beforePackageUpload");
        b.index = a.le;
        try {
            this.dispatchEvent(b)
        } catch (c) {
            L(this.e, 'Error in "beforePackageUpload" event: ' + c.message)
        } finally {
            b.j()
        }
    };
    r.Sh = function (a) {
        M(this.e, "AfterPackageUpload event: " + a.le + ", httpStatus: " + a.Ea);
        var b = new G("afterPackageUpload");
        b.index = a.le;
        b.response = a.response;
        var c;
        try {
            c = !this.dispatchEvent(b)
        } catch (d) {
            L(this.e, 'Error in "afterPackageUpload" event: ' + d.message)
        } finally {
            b.j()
        }
        c ? jh(this) && this.Vb(18, -1, "", J(this.o, "UploadCancelledFromAfterPackageUploadEventMessage")) : this.la().Kb(0)
    };
    r.Uh = function (a) {
        M(this.e, "Upload complete: { httpStatus: " + a.Ea + ', response: "' + a.response + '", errorMessage: "' + a.Xc + '" }');
        lk(this);
        this.N(0 < this.la().Z() ? 1 : 0);
        var b = new G("afterUpload");
        b.response = a.response;
        try {
            this.dispatchEvent(b)
        } catch (c) {
            L(this.e, 'Error in "afterUpload" event: ' + c.message)
        } finally {
            b.j()
        }
    };
    r.Vh = function (a) {
        a = a.state;
        mk(this, a.xb, a.qa, a.gb, a.Wa, a.ha, a.Aa);
        this.Qd(a.qa, a.gb, a.Wa, a.ha, a.Aa)
    };
    r.Qd = function (a, b, c, d, f) {
        var g = new G("progress");
        g.percent = a;
        g.uploadedFiles = b;
        g.totalFiles = c;
        g.uploadedBytes = d;
        g.totalBytes = f;
        try {
            this.dispatchEvent(g)
        } catch (j) {
            L(this.e, 'Error in "progress" event: ' + j.message)
        } finally {
            g.j()
        }
    };
    r.kk = function (a) {
        M(this.e, a.Xc);
        var b = 300 <= a.Ea && 400 > a.Ea ? 11 : 400 <= a.Ea && 500 > a.Ea ? 2 : 500 <= a.Ea && 600 > a.Ea ? 4 : 0,
            c = cd(b, this.o);
        jh(this, c);
        this.Vb(b, a.Ea, a.response, c)
    };
    r.Vb = function (a, b, c, d) {
        var f = new G("error");
        f.errorCode = a;
        f.httpStatus = b;
        f.response = c;
        f.additionalInfo = d;
        try {
            this.dispatchEvent(f)
        } catch (g) {
            L(this.e, 'Error in "error" event: ' + g.message)
        } finally {
            f.j()
        }
    };

    function mk(a, b, c, d, f, g, j) {
        var l = J(a.o, "UploadProgress"),
            l = l.va();
        l.xb = b;
        l.Sf = c;
        l.gb = d;
        l.Wa = f;
        l.ha = g;
        l.Aa = j;
        a.o.setProperty("UploadProgress", l)
    }

    function jh(a, b) {
        return 2 == a.Ia() ? (M(a.e, "Cancel upload: " + b), a.Ie && a.Ie.Te(), lk(a), a.N(0 < a.la().Z() ? 1 : 0), b && a.rd.add(b), i) : m
    }

    function lk(a) {
        var b = a.Ie;
        b && (a.r.ja(b, "beforePackageUpload", a.Th).ja(b, "afterPackageUpload", a.Sh).ja(b, zd, a.Uh).ja(b, "progress", a.Vh), b.j(), delete a.Ie)
    }
    r.H = function (a) {
        return J(this.o, a)
    };
    r.ra = function (a, b) {
        P[a] && (b = P[a](b, this));
        this.o.setProperty(a, b)
    };
    r.e = N("au.upldr.BaseUploader");

    function $(a) {
        hk.call(this, a);
        H(document.getElementsByTagName("body")[0], ["drop", "dragover"], function (a) {
            a.preventDefault()
        })
    }
    w($, hk);
    y(lb(Aa), function (a) {
        $.prototype["get" + a] = function () {
            return this.H(a)
        };
        $.prototype["set" + a] = function (b) {
            this.ra(a, b)
        }
    });
    r = $.prototype;
    r.Zh = function (a) {
        if (3 > this.O.Z()) return this.O.add(a);
        L(this.e, "Converter was not added. 3 converters already added.")
    };
    r.Ij = function (a) {
        return this.O.Kb(a)
    };
    r.ti = function () {
        return this.O.Z()
    };
    r.ui = function (a) {
        if (a = this.O.getItem(a)) return Hf(a)
    };
    r.Mj = function (a, b) {
        var c = this.O.getItem(a);
        return c ? (c.Jc = Ff(b), i) : m
    };
    r.vi = function (a) {
        if (a = this.O.getItem(a)) return a.xe
    };
    r.Nj = function (a, b) {
        var c = this.O.getItem(a);
        if (c) {
            var d = b;
            if (u(d)) {
                var f = 10;
                0 == d.lastIndexOf("0x", 0) || 0 == d.lastIndexOf("0X", 0) ? (d = d.slice(2), f = 16) : 0 == d.lastIndexOf("#", 0) && (d = d.slice(1), f = 16);
                d = parseInt(d, f)
            }
            c.xe = d;
            return i
        }
        return m
    };
    r.wi = function (a) {
        if (a = this.O.getItem(a)) return a.ye
    };
    r.Oj = function (a, b) {
        var c = this.O.getItem(a);
        return c ? (c.ye = Gf(b), i) : m
    };
    r.xi = function (a) {
        if (a = this.O.getItem(a)) return a.ze
    };
    r.Pj = function (a, b) {
        var c = this.O.getItem(a);
        return c ? (c.ze = b, i) : m
    };
    r.zi = function (a) {
        if (a = this.O.getItem(a)) return a.Be
    };
    r.Rj = function (a, b) {
        var c = this.O.getItem(a);
        return c ? (c.Be = b, i) : m
    };
    r.yi = function () {
        L(this.e, "Not implemented.");
        return 0
    };
    r.Qj = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.yh = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.zh = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Gi = function () {
        return this.l.Z()
    };
    r.jk = function (a) {
        return this.l.Kb(a)
    };
    r.ik = function () {
        this.l.clear()
    };
    r.Fi = function (a) {
        if (a = this.l.getItem(a)) return a.H(Md)
    };
    r.Wj = function (a, b) {
        var c = this.l.getItem(a);
        return c ? (Od(c, b), i) : m
    };
    r.Hi = function (a) {
        if (a = this.l.getItem(a)) return a.H(Nd)
    };
    r.Xj = function (a, b) {
        var c = this.l.getItem(a);
        return c ? (b != k && c.ra(Nd, b), i) : m
    };
    r.Ii = function (a) {
        if (a = this.l.getItem(a)) return a.H(Ld)
    };
    r.Ji = function (a) {
        if (a = this.l.getItem(a)) return a.getName()
    };
    r.Ki = function (a) {
        if (a = this.l.getItem(a)) return a.yc()
    };
    r.Li = function (a) {
        if (a = this.l.getItem(a)) return a.H(Kd)
    };
    r.ng = function (a, b, c) {
        this.Cb[a] && c ? this.Cb[a].push(b) : this.Cb[a] = [b];
        return i
    };
    r.Jj = function (a) {
        return this.Cb.hasOwnProperty(a) ? (delete this.Cb[a], i) : m
    };
    r.Ai = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Sj = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Bi = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Tj = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Di = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.Uj = function () {
        L(this.e, "Not implemented.");
        return m
    };
    r.ue = function (a) {
        a != k && "" != (a += "") && this.rd.add(a)
    };
    r.Te = function (a) {
        jh(this, a) && this.Vb(12, -1, "", J(this.o, "UploadCancelledByCancelMethodMessage"))
    };
    r.e = N("au.upldr.Uploader");
    fa("Aurigma.ImageUploaderFlash.Control.Uploader", $);
    var nk = {
            addFiles: $.prototype.Oe,
            removeFile: $.prototype.pe,
            render: $.prototype.X,
            upload: $.prototype.upload,
            cancelUpload: $.prototype.Te,
            addEventListener: $.prototype.addEventListener,
            removeEventListener: $.prototype.removeEventListener,
            addCustomField: $.prototype.ng,
            removeCustomField: $.prototype.Jj,
            showInformationBar: $.prototype.ue,
            getExtractExif: $.prototype.Ai,
            setExtractExif: $.prototype.Sj,
            getExtractIptc: $.prototype.Bi,
            setExtractIptc: $.prototype.Tj,
            getMetadataValueSeparator: $.prototype.Di,
            setMetaDataValueSeparator: $.prototype.Uj,
            addConverter: $.prototype.Zh,
            removeConverter: $.prototype.Ij,
            getConverterCount: $.prototype.ti,
            getConverterMode: $.prototype.ui,
            setConverterMode: $.prototype.Mj,
            getConverterThumbnailBgColor: $.prototype.vi,
            setConverterThumbnailBgColor: $.prototype.Nj,
            getConverterThumbnailFitMode: $.prototype.wi,
            setConverterThumbnailFitMode: $.prototype.Oj,
            getConverterThumbnailHeight: $.prototype.xi,
            setConverterThumbnailHeight: $.prototype.Pj,
            getConverterThumbnailWidth: $.prototype.zi,
            setConverterThumbnailWidth: $.prototype.Rj,
            getConverterThumbnailJpegQuality: $.prototype.yi,
            setConverterThumbnailJpegQuality: $.prototype.Qj,
            getConverterThumbnailCopyExif: $.prototype.yh,
            setConverterThumbnailCopyExif: $.prototype.yh,
            getConverterThumbnailCopyIptc: $.prototype.zh,
            setConverterThumbnailCopyIptc: $.prototype.zh,
            getUploadFileCount: $.prototype.Gi,
            uploadFileRemoveAt: $.prototype.jk,
            uploadFileRemoveAll: $.prototype.ik,
            getUploadFileAngle: $.prototype.Fi,
            setUploadFileAngle: $.prototype.Wj,
            getUploadFileDescription: $.prototype.Hi,
            setUploadFileDescription: $.prototype.Xj,
            getUploadFileHeight: $.prototype.Ii,
            getUploadFileName: $.prototype.Ji,
            getUploadFileSize: $.prototype.Ki,
            getUploadFileWidth: $.prototype.Li
        },
        ok;
    for (ok in nk) nk.hasOwnProperty(ok) && ($.prototype[ok] = nk[ok]);
})();