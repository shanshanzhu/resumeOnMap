define(['jquery'], function() { 
    /* adpated from 
    https://code.google.com/p/google-maps-utility-library-v3/source/browse/trunk/maplabel/src/maplabel.js
    */
    var MapLabel = function (opt_options) {
      this.set('fontFamily', 'sans-serif');
      this.set('fontSize', 12);
      this.set('fontColor', '#000000');
      this.set('strokeWeight', 4);
      this.set('strokeColor', '#ffffff');
      this.set('align', 'center');

      this.set('zIndex', 1e3);

      this.setValues(opt_options);
    }
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
    MapLabel.prototype.drawCanvas_ = function() {
      var canvas = this.canvas_;
      var text = this.get('text');
      if (!text || !canvas) return;


      var style = canvas.style;
      style.zIndex = /** @type number */(this.get('zIndex'));

      var ctx = canvas.getContext('2d');
      var strokeWeight = Number(this.get('strokeWeight'));
      if (!text)
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = this.get('strokeColor');
      ctx.fillStyle = this.get('fontColor');
      ctx.font = this.get('fontSize') + 'px ' + this.get('fontFamily');

      var self = this;
      var writeLetter = function(text, i, posX) {
      // add letter one by one. 
        setTimeout(function(){
          var letter = text[i];
          var textMeasure = ctx.measureText(letter);
          var textWidth = textMeasure.width + posX + strokeWeight;
          style.marginLeft = self.getMarginLeft_(textWidth) + 'px';
          if (strokeWeight) {
            ctx.lineWidth = strokeWeight;
            ctx.strokeText(letter, posX , strokeWeight);
          }
          ctx.fillText(letter, posX,strokeWeight);
      // //       // Bring actual text top in line with desired latitude.
      // //       // Cheaper than calculating height of text.
          style.marginTop = '+ 1em';
          if (i < text.length-1) {
            writeLetter(text, i + 1, textWidth);
          } 
        }, 100);
      };

      writeLetter(text, 0, 0);
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

      this.drawCanvas_();

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
