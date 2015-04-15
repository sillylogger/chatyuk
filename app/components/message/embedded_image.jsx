var React  = require('react');

var ImageUtil = require('../../utils/image.js');

var style =  {
  width: '100%'
};


var EmbeddedImage = React.createClass({
  render: function() {
    var dimensions = ImageUtil.getDimensions(this.props.src, this.forceUpdate)

    if (dimensions.width < dimensions.height) {
      style.width = null;
      style.height = 150;
    }

    return <img style={style} src={this.props.src} />
  }

});

module.exports = EmbeddedImage;
