define(['../libs/eventEmmitter','jquery',"underscore"], function(eventEmmitter) { 
    /* adpated from 
    https://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/maplabel/src/maplabel.js
    */
    var MapLabel = function (opt_options) {
      this.set('fontFamily', 'sans-serif');
      this.set('fontSize', 10);
      this.set('fontColor', '#000000');
      this.set('strokeWeight', 1);
      this.set("lineSpace", 5);
      this.set('strokeColor', '#ffffff');
      this.set('align', 'center');
      this.set('zIndex', 1e3);
      this.set('maxLineWidth', 300);
      this.set('canvasMargin', 1.2);
      //the the  canvas width = canvasMargin * maxLineWidth || autoLineWidth;
      this.set('canvaseHeighWidthRatio', 0.6);
      //ratio of canvas Height = ratio * canvas width

      this.setValues(opt_options);
    };
    MapLabel.prototype = new google.maps.OverlayView();

    /** @inheritDoc */
    MapLabel.prototype.changed = function(prop) {
      switch (prop) {
        case 'fontFamily':
        case 'fontSize':
        case 'fontColor':
        case 'strokeWeight':
        case 'strokeColor':
        case 'align':
        case 'text':
          return this.drawCanvas_();
        case 'maxZoom':
        case 'minZoom':
        case 'position':
          return this.draw();
      }
    };

    /**
     * Draws the label to the canvas 2d context.
     * @private
     */
    MapLabel.prototype.calculateCanvas = function(texts, font) {
      //estimation of canvas width and height from the input texts array;
      
      var maxWidth = this.get('maxLineWidth') || 300;

      var xMargin = 1.45;

      // var ratio = this.get('canvaseHeighWidthRatio') || 0.6;
      var margin = this.get('canvasMargin') || 1.2;
      var lines = texts;

      var finalWidth = 0;
      var letterPerLine = Math.floor(maxWidth/font * xMargin); 
      //times xMargin to reduce margin on x-axis
      var output = [];

      lines.forEach(function(line, i){
        var len = line.length, thisLineWidth;
        if (len > letterPerLine) {
          for(var i = 0, j = Math.ceil(len / letterPerLine); i < j; i ++ ){
            output.push(line.substring(i*letterPerLine, (i+1)*letterPerLine));
          }
          thisLineWidth = maxWidth;
        } else {
          output.push(line);
          thisLineWidth = Math.floor(len * font / xMargin) ;// xMargin for adjusting margin on x-axis
        }
        console.log(thisLineWidth,finalWidth);
        finalWidth = Math.max(finalWidth, thisLineWidth);
      });

      var result = {
        "width": Math.floor(finalWidth),
        "height": Math.floor(output.length * (font + this.lineSpace__) + this.lineSpace__*5),
        //this.lineSpace__*5 is the margin on y axis
        "lines": output
      };
      // result.height = result.width * ratio;
      console.log(result);
      return result;
    };

    MapLabel.prototype.drawCanvas_ = function(canvas, ctx) {
      var text = this.get('text');
      var model = this.get('model');
      var font = Number(this.get('fontSize'));
      var strokeWeight = Number(this.get('strokeWeight'));//like the gap between letters and lines
      var lineSpace = Number(this.get('lineSpace'));
      if (!Array.isArray(text) || !lineSpace || !strokeWeight || !font || !canvas || !model ) { return; }
      this.strokeWeight__ = strokeWeight;
      this.font__ = font;
      this.model__ = model;
      this.lineSpace__ = lineSpace;
      var canvasContent = this.calculateCanvas(text, font);
      canvas.width = canvasContent.width;
      canvas.height = canvasContent.height;

      var style = canvas.style;
      style.zIndex = /** @type number */(this.get('zIndex'));
      style.marginTop = '+ 1em';
      style.borderRadius = '5px';
      style.borderWidth = '1px';
      style.backgroundColor = '#F5F5F5';


      ctx.clearRect(0, 0, canvas.width, canvas.height);//change to clearRect for clear background
      // ctx.strokeStyle = this.get('strokeColor');
      ctx.font = font + 'px ' + this.get('fontFamily');

      this.ctx__ = ctx;
      this.writeLines(canvasContent.lines);
    };

    MapLabel.prototype.writeLines = function(lines) {
      var controller = new eventEmmitter();
      var linesIndex = 0;
      this.writeLine(lines, linesIndex ,controller);
      var self = this;
      controller.on('endOneLine',function(i){//i is the linesIndex
        if(i < lines.length) {
          self.writeLine(lines, i, controller);
        } else {
          self.model__.renderNext();
        }
      });
    };

    MapLabel.prototype.writeLine = function(lines, linesIndex, controller) {
      var line = lines[linesIndex];
      var posX = 20;//initial positionX
      var posY = linesIndex * (this.font__ + this.lineSpace__) + this.lineSpace__*4;
      //+ this.lineSpace__*4 determines the initial posY.
      var letterIndex = 0;//initial letterIndex
      this.writeLetterInLine(line, letterIndex, posX, posY, controller, linesIndex);
    };

    MapLabel.prototype.writeLetterInLine = function(line, letterIndex, posX, posY, controller, linesIndex) {
      // add letter one by one. 
      // if (!line || !letterIndex || !posX || !posY || !controller) {return;}
      var self = this;
      setTimeout(function(){
        var letter = line[letterIndex];
        var textMeasure = self.ctx__.measureText(letter);
        var textWidth = textMeasure.width + posX + self.strokeWeight__;
        // style.marginLeft = self.getMarginLeft_(textWidth) + 'px';
        self.ctx__.lineWidth = self.strokeWeight__;
        self.ctx__.strokeText(letter, posX , posY);
        self.ctx__.fillText(letter, posX, posY);
      // Bring actual text top in line with desired latitude.
      // Cheaper than calculating height of text.
        if (letterIndex < line.length - 1) {
          self.writeLetterInLine(line, letterIndex + 1, textWidth, posY,controller, linesIndex);
        } else {
          controller.emit('endOneLine',linesIndex + 1);
        }
      }, 10);
    };

    /**
     * @inheritDoc
     */
    MapLabel.prototype.onAdd = function() {
      var canvas = this.canvas_ = document.createElement('canvas');
      var style = canvas.style;
      style.position = 'absolute';

      var ctx = canvas.getContext('2d');
      ctx.lineJoin = 'round';
      ctx.textBaseline = 'top';

      this.drawCanvas_(canvas, ctx);

      var panes = this.getPanes();
      if (panes) {
        panes.mapPane.appendChild(canvas);
      }
    };

    /**
     * Gets the appropriate margin-left for the canvas.
     * @private
     * @param {number} textWidth  the width of the text, in pixels.
     * @return {number} the margin-left, in pixels.
     */
    MapLabel.prototype.getMarginLeft_ = function(textWidth) {
      switch (this.get('align')) {
        case 'left':
          return 0;
        case 'right':
          return -textWidth;
      }
      return textWidth / -2;
    };

    /**
     * @inheritDoc
     */
    MapLabel.prototype.draw = function() {
      var projection = this.getProjection();

      if (!projection) {
        // The map projection is not ready yet so do nothing
        return;
      }

      if (!this.canvas_) {
        // onAdd has not been called yet.
        return;
      }

      var latLng = /** @type {google.maps.LatLng} */ (this.get('position'));
      if (!latLng) {
        return;
      }
      var pos = projection.fromLatLngToDivPixel(latLng);

      var style = this.canvas_.style;

      style['top'] = pos.y + 'px';
      style['left'] = pos.x + 'px';

      style['visibility'] = this.getVisible_();
    };
    MapLabel.prototype['draw'] = MapLabel.prototype.draw;

    /**
     * Get the visibility of the label.
     * @private
     * @return {string} blank string if visible, 'hidden' if invisible.
     */
    MapLabel.prototype.getVisible_ = function() {
      var minZoom = /** @type number */(this.get('minZoom'));
      var maxZoom = /** @type number */(this.get('maxZoom'));

      if (minZoom === undefined && maxZoom === undefined) {
        return '';
      }

      var map = this.getMap();
      if (!map) {
        return '';
      }

      var mapZoom = map.getZoom();
      if (mapZoom < minZoom || mapZoom > maxZoom) {
        return 'hidden';
      }
      return '';
    };

    /**
     * @inheritDoc
     */
    MapLabel.prototype.onRemove = function() {
      var canvas = this.canvas_;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
    MapLabel.prototype['onRemove'] = MapLabel.prototype.onRemove;

    return MapLabel;
});
