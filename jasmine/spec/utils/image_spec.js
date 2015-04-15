var ImageUtil = require('../../../app/utils/image.js');

describe("utils.ImageUtil", function() {

  describe('getDimensions', function() {

    context("when the image is already loaded", function() {
      it("returns the dimensions", function() {
        var spy = jasmine.createSpy('callback');

        var blankImageSrc = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        expect(ImageUtil.getDimensions(blankImageSrc, spy)).toEqual({
          width: 1,
          height: 1
        });
      });
    });

  });

});
