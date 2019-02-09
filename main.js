      var botui = new BotUI('Sunshine');

      botui.message.add({
        content: 'Hello whats your name?'
      }).then(function () { // wait till previous message has been shown.
        botui.action.text({
          action: {placeholder:"your name...."}
        })
        .then(function(username){
          botui.message.add({
            content:"Hello " + username.value + " nice to meet you!"})
          })
          .then(function(){
            botui.message.add({
              content:"On a scale of 1 to 10 how are you today?"})
            })
            .then(function(){
              botui.action.button(
                {
                  action: [
                    {
                      text:"1",
                      value: '1'
                    },
                    {
                      text:"2",
                      value: '2'
                    },
                    {
                      text:"3",
                      value: '3'
                    },
                    {
                      text:"4",
                      value: '4'
                    },
                    {
                      text:"5",
                      value: '5'
                    },
                    {
                      text:"6",
                      value: '6'
                    },
                    {
                      text:"7",
                      value: '7'
                    },
                    {
                      text:"8",
                      value: '8'
                    },
                    {
                      text:"9",
                      value: '9'
                    },
                    {
                      text:"10",
                      value: '10'
                    }                    
                  ]
                }
              )
            })

        });
       



      
