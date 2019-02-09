var botui = new BotUI('hello-world');

botui.message.add({
  content: 'Hello World from bot!'
}).then(function () { // wait till previous message has been shown.

  botui.message.add({
    delay: 1000,
    human: true,
    content: 'Hello World from human!'
  })
    .then(function () {
      $.get('http://quotes.rest/qod/categories', {}, function success(response) {
        botui.action.button({
          action: [
            { // show only one button
              text: 'inspire',
              value: 'one'
            },
            { // show only one button
              text: 'life',
              value: 'two'
            },
            { // show only one button
              text: 'funny',
              value: 'three'
            }
          ]

        }).then(function (buttonresult) {
          $.get('http://quotes.rest/qod.json?category=' + buttonresult.text, {}, function success(response) 
          { 
            var quote_obj = response.contents.quotes[0];
            botui.message.add({
              content: quote_obj.author + ' says: ' + '"' + quote_obj.quote +'"'
            }) 
          })

        })
      })
    })
})
