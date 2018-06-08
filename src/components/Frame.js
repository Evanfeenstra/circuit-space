import React from 'react'

class Frame extends React.Component {

	constructor(props) {
        super(props);
        this.prepareSource = this.prepareSource.bind(this)
        this.frameRender = this.frameRender.bind(this)
    }

	get Pen() {
		return{
		    base_template:
		            "<!doctype html>\n" +
		            "<html>\n\t" +
		            "<head>\n\t\t" +
		            "<meta charset=\"utf-8\">\n\t\t" +
		            "<title>Circuit Space</title>\n\n\t\t\n\t" +
		            "</head>\n\t" +
		            "<body>\n\t\n\t" +
		            "</body>\n" +
		            "</html>",

		    bodyNoMargin: "body{margin:0;}",

		    scriptsy: "<script type='text/javascript' src='https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js'>\n</script><script src='//cdn.jsdelivr.net/phaser/2.6.2/phaser.min.js'></script>\n<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.4/p5.min.js'></script>\n<script>var WSURL='ws"+this.props.remote.substr(4)+"/page/'</script>"
	    }
	}

	prepareSource(html,css,js) {
        var src = '';
        src = this.Pen.base_template.replace('</body>', html + '</body>');
        css = '<style>' + this.Pen.bodyNoMargin + css + '</style>';
        src = src.replace('</head>', css + this.Pen.scriptsy + '</head>');
        js = '<script>' + js + '</script>';
        src = src.replace('</body>', js + '</body>');
        return src;
    }

    frameRender(html,css,js) {
        var iframe_doc = this.iframe.contentDocument;
        var source = this.prepareSource(html,css,js);
        iframe_doc.open();
        iframe_doc.write(source);
        iframe_doc.close();
    }

    emptyIframe() {
        this.iframe.src="about:blank"
    }

	render = function() {
        return (
            <iframe
            frameBorder='0'
            ref={(ref)=>{this.iframe=ref}}
            height={this.props.height} width={this.props.width}></iframe>
        )
    }

}

export default Frame