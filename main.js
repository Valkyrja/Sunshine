      var botui = new BotUI('hello-world');

      botui.message.add({
        content: 'Hello girl, I knew I will see you in this awesome chatpot'
      }).then(function () { // wait till previous message has been shown.

        botui.message.add({
          type: 'embed', // this is 'text' by default
          content: 'https://giphy.com/embed/T3Vx6sVAXzuG4'
        });
      });
