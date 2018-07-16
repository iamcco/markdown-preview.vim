(function(global) {
    var TOTOPHEIGHT = 100;
    var mkdID, body, html, mkdContainer, options, isLoadMathJax;

    mkdID = window.location.pathname.split('/').slice(2);
    body = document.body;
    html = document.querySelector('html');
    mkdContainer = document.getElementById('js-markdown');


    function updateTitle() {
        var slash = getSlash();
        var fileName = Base64.decode(location.search.slice(1)).split('&')[0].split(slash).pop();
        var title = document.getElementsByTagName('title')[0];
        title.innerHTML = fileName;
    }

    function fixAllImg(text) {
        var match, reg = /<img[^>]+?(src=("|')([^\2]+?)\2)[^>]+?>/g;
        while((match = reg.exec(text)) !== null) {
            if(match && match.length === 4) {
                text = text.replace(match[3], getAbsPath(location.search, match[3]));
            }
        }
        return text;
    }

    function getSlash() {
        var platform = navigator.platform;
        var slash;
        if(/^win.*/i.test(platform)) {
            slash = '\\';
        } else {
            slash = '/';
        }
        return slash;
    }

    function getAbsPath(base, path) {
        var slash = getSlash();
        var bases = Base64.decode(base.slice(1)).split('&')[0].split(slash).slice(0, -1);
        var paths = path.split(slash);
        if(/^https?:?/i.test(paths[0]) || /^\/DIYURL?.*$/.test(path)) {
            return path;
        } else if(/^$|^[a-zA-Z]:.*$/.test(paths[0])) {
            return '/DIYURL?' + Base64.encode(path);
        } else {
            for(var i = 0, len = paths.length; i < len; i++) {
                if(paths[i] === '..') {
                    bases.pop();
                } else if(paths[i] !== '.') {
                    bases.push(paths[i]);
                }
            }
        }
        return '/DIYURL?' + Base64.encode(bases.join(slash));
    }

    function loadMathJax() {
        var h, s;
        if (!isLoadMathJax) {
            isLoadMathJax = true;
            window.MATHJAX_PATH = Base64.decode(location.search.slice(1)).split('&')[1];
            h = document.getElementsByTagName('head')[0];
            s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = '/DIYURL/MathJax.js?' + Base64.encode(window.MATHJAX_PATH + 'MathJax.js') + '&config=TeX-AMS-MML_HTMLorMML';
            h.appendChild(s);
        }
    }

    options = (function() {
        var flagSign = '019600976811CE18D7D4F7699D774DFF',  //md5 of the yuuko.cn
            rFlagSign = flagSign.split('').reverse().join(''),
            aPoint = '<a style="position: relative;" href="#'+ rFlagSign +'" id="'+ rFlagSign +'"></a>',
            renderer = new marked.Renderer(),
            rImage = renderer.image,
            rLink = renderer.link,
            displaymath = renderer.displaymath,
            inlineMath = renderer.math;

        renderer.displaymath = function(text) {
            loadMathJax();
            var result = '';
            text = text.replace('>', 'style="visibility: hidden;">')
            if (text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                result = aPoint;
            }
            return result + displaymath(text);
        };
        renderer.math = function(text) {
            loadMathJax();
            var result = '';
            if (text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                result = aPoint;
            }
            return result + inlineMath(text);
        };
        //do solve for the position sign
        renderer.heading = function(text, level, raw) {
            var result = '';
            if(text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                raw = text;
                result = aPoint;
            }
            return result
                + '<h'
                + level
                + ' id="'
                + this.options.headerPrefix
                + raw.toLowerCase().replace(/[\s]+/g, '-')
                + '">'
                + text
                + '</h'
                + level
                + '>\n';
        };

        renderer.html = function(html) {
            var i, len, line;
            html = html.split('\n');
            for(i = 0, len = html.length; i < len; i++) {
                line = html[i];
                if(line.indexOf(flagSign) !== -1) {
                    html[i] = line.replace(flagSign, '') + aPoint;
                }
                html[i] = fixAllImg(html[i]);
            }
            return html.join('\n');
        };

        renderer.listitem = function(text) {
            text = fixAllImg(text);
            var checked = '<input type="checkbox" class="task-list-item" checked disabled>',
                unChecked = '<input type="checkbox" class="task-list-item" disabled>',
                reg = /^\[\s*[xX]\s*\]/,
                unReg = /^\[\s*\]/;

            text = text.replace(/<p>(.*?)<\/p>/, '$1');
            text = text.replace(flagSign, '');

            var aPointText = text.indexOf(flagSign) != -1 ? aPoint : '';

            if(reg.test(text)) {
                text = text.replace(reg, '');
                return '<li class="task-list-item" checked>' + aPointText + checked + text + '</li>\n';
            } else if(unReg.test(text)) {
                text = text.replace(unReg, '');
                return '<li class="task-list-item">' + aPointText + unChecked + text + '</li>\n';
            } else {
                return '<li>' + aPointText + text + '</li>\n';
            }
        };

        renderer.paragraph = function(text) {
            text = fixAllImg(text.replace(flagSign, aPoint));
            return '<p>' + text + '</p>\n';
        };

        renderer.tablerow = function(content) {
            content = content.replace(flagSign, aPoint);
            return '<tr>\n' + content + '</tr>\n';
        };

        renderer.codespan = function(text) {
            var result = '';
            if(text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                result = aPoint;
            }
            return result + '<code>' + text + '</code>\n'
        };

        renderer.image = function(href, title, text) {
            var result = '';
            if(!!title && title.indexOf(flagSign) !== -1) {
                title = title.replace(flagSign, '');
                result = aPoint;
            }
            if(!!text && text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                result = aPoint;
            }
            return result + rImage.call(renderer, href, title, text);
        };

        renderer.link = function(href, title, text) {
            var result = '';
            if(!!href && href.indexOf(flagSign) !== -1) {
                href = href.replace(flagSign, '');
                result = aPoint;
            }
            if(!!title && title.indexOf(flagSign) !== -1) {
                title = title.replace(flagSign, '');
                result = aPoint;
            }
            if(!!text && text.indexOf(flagSign) !== -1) {
                text = text.replace(flagSign, '');
                result = aPoint;
            }
            return result + rLink.call(renderer, href, title, text);
        };
        return {
            renderer: renderer,
            flagSign: flagSign,
            rFlagSign: rFlagSign,
            aPoint: aPoint
        };
    })();

    marked.setOptions({
        highlight: function (code) {
            var i, len, line;
            code = code.split('\n');
            for(i = 0, len = code.length; i < len; i++) {
                line = code[i];
                if(line.indexOf(options.flagSign) !== -1) {
                    code[i] = line.replace(options.flagSign, '') + ' code' + options.flagSign + 'code';
                }
            }
            code = code.join('\n');
            code =  hljs.highlightAuto(code).value;
            return code.replace('code' + options.flagSign + 'code', options.aPoint);
        },
        renderer: options.renderer,
        breaks: false
    });

    function openConn() {
        global.conn = new WebSocket('ws://' + window.location.host + '/WebSocket/' + mkdID);
        global.conn.addEventListener('open', onOpen);
        global.conn.addEventListener('close', onClose);
        global.conn.addEventListener('message', onMessage);
    }

    function onOpen() {
    }

    function onClose() {
            winClose()
    }

    function onMessage(event) {
        mkdRefresh(event.data);
    }

    function mkdRefresh(data) {
        marked(data, function(err, content) {
            var aPoint;
            if(err) {
                throw err;
            }
            mkdContainer.innerHTML = content;
            aPoint = document.getElementById(options.rFlagSign);
            if(aPoint) {
                TweenLite.to(body, 0.4, {scrollTop: aPoint.offsetTop - TOTOPHEIGHT, ease:Power2.easeOut});
                TweenLite.to(html, 0.4, {scrollTop: aPoint.offsetTop - TOTOPHEIGHT, ease:Power2.easeOut});
            }

            window.MathJax && MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
        });
    }

    function winClose() {
        window.close();
    }

    updateTitle();
    openConn();

})(this);
