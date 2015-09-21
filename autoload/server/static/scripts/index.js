(function(global) {
    var TOTOPHEIGHT = 100;
    var mkdID, body, mkdContainer, options;

    mkdID = window.location.pathname.split('/').slice(2);
    body = document.body;
    mkdContainer = document.getElementById('js-markdown');
    options = (function() {
        var flagSign = '019600976811CE18D7D4F7699D774DFF',  //md5 of the yuuko.cn
            rFlagSign = flagSign.split('').reverse().join(''),
            aPoint = '<a style="position: relative;" href="#'+ rFlagSign +'" id="'+ rFlagSign +'"></a>',
            renderer = new marked.Renderer(),
            rImage = renderer.image,
            rLink = renderer.link;

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
                + raw.toLowerCase().replace(/[^\w]+/g, '-')
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
            }
            return html.join('\n');
        };

        renderer.listitem = function(text) {
            text = text.replace(flagSign, aPoint);
            return '<li>' + text + '</li>\n';
        };

        renderer.paragraph = function(text) {
            text = text.replace(flagSign, aPoint);
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
                    code[i] = line.replace(options.flagSign, '') + ' "' + options.flagSign + '"';
                }
            }
            code = code.join('\n');
            code =  hljs.highlightAuto(code).value;
            return code.replace('"' + options.flagSign + '"', options.aPoint);
        },
        renderer: options.renderer
    });

    function openConn() {
        global.conn = new WebSocket('ws://127.0.0.1:' + window.location.port + '/WebSocket/' + mkdID);
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
            }
        });
    }

    function winClose() {
        window.close()
    }

    openConn();

})(this);
