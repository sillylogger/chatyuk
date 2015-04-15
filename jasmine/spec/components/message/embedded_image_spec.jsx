var React  = require('react/addons');
var TestUtils = React.addons.TestUtils;

var ImageUtil = require('../../../../app/utils/image.js');
var EmbeddedImage = require('../../../../app/components/message/embedded_image.jsx');

describe("EmbeddedImage", function() {

  describe('render', function() {

    context("when the image is square / portrait", function() {
      beforeEach(function() {
        spyOn(ImageUtil, 'getDimensions').and.returnValue({ width: 100, height: 100 });
      });

      it('renders the image that is set in the src property', function() {
        var embeddedImage = <EmbeddedImage src="http://fake.com/fake.png" />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('src')).toEqual('http://fake.com/fake.png');
      });

      it('sets the width to be 100%', function() {
        var embeddedImage = <EmbeddedImage src="http://example.com/fake.png" />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('style')).toEqual('width:100%;');
      });

    });

    context("when the image is tooo narrow / ramping", function() {

      it("will set the height to 150", function() {
        spyOn(ImageUtil, 'getDimensions').and.returnValue({ width: 5, height: 100 });
        var embeddedImage = <EmbeddedImage src="http://example.com/fake.png" />;
        instance = TestUtils.renderIntoDocument(embeddedImage);
        expect(instance.getDOMNode().getAttribute('style')).toEqual('height:150px;');
      });

    });

  });

});

