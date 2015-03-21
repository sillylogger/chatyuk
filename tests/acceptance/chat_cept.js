module.exports = {
  "Test Jasmine specs" : function (browser) {
    browser
      .url("http://chatyuk.com:8000/jasmine/SpecRunner.html")
      .waitForElementVisible('body', 4000)
      .assert.containsText('.alert .bar', '0 failures')
      .end();
  },

  "Test login page" : function (browser) {
    var uniqueUsername = 'testusername' + (new Date()).getTime();
    var uniqueRoom = 'testroom' + (new Date()).getTime();
    var copy = 'Logged in as ' + uniqueUsername + ' in ' + uniqueRoom;

    browser
      .url("http://chatyuk.com:8000/public/chat.html")
      .waitForElementVisible('body', 1000)
      .clearValue('input[name=username]')
      .setValue('input[name=username]', uniqueUsername)
      .clearValue('input[name=room]')
      .setValue('input[name=room]', uniqueRoom)
      .click('input[type=submit]')
      .waitForElementVisible('.chat-content', 1000)
      .assert.containsText('.chat-area', copy)
      .setValue('.chat-textarea', ['test message', browser.Keys.ENTER])
      .waitForElementVisible('.chat-message', 1000)
      .assert.containsText('.chat-message', 'test message')
      .click('input[value=Logout]')
      .end();
  },

};
