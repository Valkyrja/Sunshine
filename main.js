var botui = new BotUI('Sunshine');
var user_feeling = 0;
var name = '';

function ask_how_user_is()
{
    botui.message.add({
        content: "On a scale of 1 to 10 how are you today?"
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
        ).then(function (res) {
            user_feeling = res.value
            loop_conversation();
        })
      })
}
      
function deal_with_answer(answer)
{
    botui.message.add({
        content: name + ' said: ' + answer.value
      });
}

function loop_conversation()
{
    if (user_feeling == 0) {
        ask_how_user_is();
    }
    else
    {
        botui.action.text({
          action: {
            placeholder: 'Enter your text here'
          }
        }).then(deal_with_answer)
        .then(loop_conversation);
    }
}

function main()
{
    botui.message.add({
        content: 'Hello girl, I knew I will see you in this awesome chatpot'
    }).then(function () {
        botui.message.add({
            type: 'embed', // this is 'text' by default
            content: 'https://giphy.com/embed/T3Vx6sVAXzuG4'
        }).then(function () {
            botui.message.add({
                content: 'Whats your name?'
            }).then(function () { // wait till previous message has been shown.
                  botui.action.text({
                    action: {placeholder:"your name...."}
                  }).then(function(username){
                      name = username.value;
                      botui.message.add({
                          content:"Hello " + username.value + " nice to meet you!"
                      }).then(loop_conversation);
                  });
            });
        });    
    });
}

main(); 

