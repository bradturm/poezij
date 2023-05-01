
import ReactDOMServer from 'react-dom/server';
import React from 'react';

import HtmlToReact from 'html-to-react';
const HtmlToReactParser = require('html-to-react').Parser;

/*
This component, used by wrapping other components containing HTML with it, transforms
HTML structures within HTML content of the form:

<figure class="image">
    <img src="http://localhost:4000/images/jon-tyson-P2aOvMMUJnY-unsplash.jpg">
    <figcaption>
        Some caption
    </figcaption>
</figure>

to:

<figure class="image">
      <div class="image">
        <a class="lightbox" href="#http://localhost:4000/images/hatsum-railway">  // image path used to create a unique id (href and id of lightbox-target div must be same)
        <img src="http://localhost:4000/images/small/hatsum-railway-small.jpg"></a>
        <div class="lightbox-target" id="http://localhost:4000/images/hatsum-railway">
          <a class="lightbox-image-close" href="#"><img src="http://localhost:4000/images/hatsum-railway.png"></a>
          <a class="lightbox-close" href="#"></a>
        </div>
      </div>
      <figcaption>
        Op Hatsum
      </figcaption>
    </figure>

    It will only process content within elements that have the style "image".

    In order for the lightbox to work, the following CSS must be applied to the output:

    
a.lightbox img {
 
  border: 3px solid white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, .3);
  margin: 20px 20px 20px 0;
  width: 95%;
}

Styles the lightbox, removes it from sight and adds the fade-in transition

.lightbox-target {
  position: fixed;
  top: -100%;
  width: 100%;
  background: rgba(0, 0, 0, .7);
  width: 100%;
  opacity: 0;
  -webkit-transition: opacity .5s ease-in-out;
  -moz-transition: opacity .5s ease-in-out;
  -o-transition: opacity .5s ease-in-out;
  transition: opacity .5s ease-in-out;
  overflow: hidden;
  z-index: 10000;
}

Styles the lightbox image, centers it vertically and horizontally, 
adds the zoom-in transition and makes it responsive using a combination 
of margin and absolute positioning

.lightbox-target img {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 0%;
  max-width: 0%;
  border: 3px solid white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, .3);
  box-sizing: border-box;
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
}

Styles the close link, adds the slide down transition

a.lightbox-close {
  display: block;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  background: transparent;
  color: black;
  text-decoration: none;
  position: absolute;
  top: -80px;
  right: 0;
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
}

Provides part of the "X" to eliminate an image from the close link

a.lightbox-close:before {
  content: "";
  display: block;
  height: 25px;
  width: 3px;
  background: white;
  position: absolute;
  left: 26px;
  top: 10px;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

Provides part of the "X" to eliminate an image from the close link

a.lightbox-close:after {
  content: "";
  display: block;
  height: 25px;
  width: 3px;
  background: white;
  position: absolute;
  left: 26px;
  top: 10px;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

Uses the :target pseudo-class to perform the animations upon clicking the .lightbox-target anchor

.lightbox-target:target {
  opacity: 1;
  top: 0;
  bottom: 0;
  left: 0;
}

.lightbox-target:target img {
  max-height: 100%;
  max-width: 100%;
}

.lightbox-target:target a.lightbox-close {
  top: 0px;
}

*/

function Parser(props) {

  const htmlInput = `
    <figure class="image">
    <img src="http://localhost:4000/images/jon-tyson-P2aOvMMUJnY-unsplash.jpg">
    <figcaption>
        Some caption
    </figcaption>
</figure>
`;

  const preprocessingInstructions = [
    {
      shouldPreprocessNode: function (node) {
        return node.attribs && node.attribs['class'] === 'image';
      },
      preprocessNode: function (node) {
        node.attribs['className'] = 'image';
      },
    }
  ];

  const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

  const processingInstructions = [
    {
      shouldProcessNode: function (node) {
        return node && node.name && node.name === 'img';
      },
      processNode: function (node, children, index) {

        let link = node.attribs['src'].substring(0, node.attribs['src'].length - 4);
        let thumbnailSrc = link.replace("images/", "images/small/") + "-small.jpg";
        let component =
          React.createElement('div', { className: 'image' },
            React.createElement('a', { className: 'lightbox', href: "#" + link },
              React.createElement('img', { key: index, src: thumbnailSrc })
            ),

            React.createElement('div', { className: 'lightbox-target', id: link },
              React.createElement('a', { className: 'lightbox-image-close', href: '#' },
                React.createElement('img', { key: index, src: node.attribs['src'] })),
              React.createElement('a', { className: 'lightbox-close', href: '#' })
            )
          );

        return component
      }
    },

    {
      // Anything else
      shouldProcessNode: function (node) {
        return true;
      },
      processNode: processNodeDefinitions.processDefaultNode
    }
  ];

  const isValidNode = function () {
    return true;
  }

  function ParseHTML(html) {

    const htmlToReactParser = new HtmlToReactParser();

    const reactComponent = htmlToReactParser.parseWithInstructions(html, isValidNode,
      processingInstructions, preprocessingInstructions);

    return reactComponent
  }

  return (
    <>
      <div>
        {ParseHTML(props.commentary)}
      </div>
    </>
  )
}

export default Parser;