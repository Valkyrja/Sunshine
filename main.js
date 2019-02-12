
var botui = new BotUI('Sunshine');
var user_feeling = 0;
var name = '';

function funny_animal_video()
{
    botui.message.add({
       content: 'Which of the animals do you like the best? Cat? Bats or Hedgehogs?'
    }).then(function () {
        botui.action.text({
          action: {
            placeholder: 'Enter your text here'
          }
        }).then(function (res) {
            switch(res.value.toLowerCase()) {
              case "cat":
              case "cats":
                botui.message.add({
                  type: 'embed', // this is 'text' by default
                  content: 'https://www.youtube.com/embed/hyjkWYM190E'
                });
                break;
              case "bat":
              case "bats":
                botui.message.add({
                  type: 'embed', // this is 'text' by default
                  content: 'https://www.youtube.com/embed/BV1TNxBh_gM'
                });
                break;
              case "hedgehog":
              case "hedgehogs":
                botui.message.add({
                  type: 'embed', // this is 'text' by default
                  content: 'https://www.youtube.com/embed/wWxwUUJDzMc'
                });
                break;
                default:
                botui.message.add({
                   content: 'Sorry, but if that is an animal, i don\'t know it. I guess my AI creator was to dumb to teach me :P'
                })
            }
        }).then(deal_with_answer);
    });
}

function quote() {
  botui.message.add({
    content: 'I also have days like that... do you want me to show you a cool quote?'
  })
    .then(function () {
      return botui.action.button({
        action: [
          { // show only one button
            text: 'Yes',
            value: 'yah'
          },
          { // show only one button
            text: 'No',
            value: 'nope'
          }
        ]
      })

        .then(function (res) {
          switch (res.value) {
            case 'yah':
              $.get('http://quotes.rest/qod/categories', {}, function success(response) {
                botui.action.button({
                  action: [
                    {
                      text: 'inspire',
                      value: 'one'
                    },
                    {
                      text: 'life',
                      value: 'two'
                    },
                    {
                      text: 'funny',
                      value: 'three'
                    }
                  ]

                }).then(function (buttonresult) {
                  $.get('http://quotes.rest/qod.json?category=' + buttonresult.text, {}, function success(response) {
                    var quote_obj = response.contents.quotes[0];
                    botui.message.add({
                      content: quote_obj.author + ' says: ' + '"' + quote_obj.quote + '"'
                    })
                  })
                }).then(deal_with_answer)
              })
              break;

            case 'nope':
              ask_how_user_is()
              break;
          }
        })
    })
}

function ask_how_user_is() {
  botui.message.add({
    content: "On a scale of 1 to 5 how are you today?"
  })
    .then(function () {
      botui.action.button(
        {
          action: [
            {
              text: "1",
              value: '1'
            },
            {
              text: "2",
              value: '2'
            },
            {
              text: "3",
              value: '3'
            },
            {
              text: "4",
              value: '4'
            },
            {
              text: "5",
              value: '5'
            }
          ]
        }
      ).then(function (res) {
        user_feeling = res.value
        loop_conversation();
      })
    })
}

function deal_with_answer() {
  botui.message.add({
    content: name + " are you feeling better now?"
  })
    .then(function () {
      return botui.action.button(
        {
          action: [
            {
              text: "YES",
              value: 'y'
            },
            {
              text: "NO",
              value: 'n'
            }]
        })
    })

    .then(function (res) {
      switch (res.value) {
        case 'y':
          botui.message.add(
            {
              content: "Thats great have a nice day!"
            }
          )
          break;
        case "n":
          ask_how_user_is()
      }
    }
    )
}

function loop_conversation() {
  switch (user_feeling) {
    case 0:
      ask_how_user_is();
      break;

    case "1":
        funny_animal_video()
      break;

    case "2":
      quote()
      break;

    case "3":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about something nice to cheer you up?"
        }
      )
        .then(function () {
          botui.message.add(
            {
              type: 'html',
              content: '<img src= "https://quotesnhumor.com/wp-content/uploads/2015/08/Top-50-Funniest-Memes-Collection-meme-famous.jpg" widht="200">'
            }
          )
        }
        )
        .then(deal_with_answer)
      break;

    case "4":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about a dog to cheer you up?"
        }
      )
        .then(function () {
          botui.message.add(
            {
              type: 'html',
              content: '<img src= "https://quotesnhumor.com/wp-content/uploads/2015/08/Top-50-Funniest-Memes-Collection-meme-pics.jpg" widht="200">'
            }
          )
        }
        )
        .then(deal_with_answer)
      break;

    case "5":
      botui.message.add(
        {
          content: "Well " + name + " are you sure?"
        })

        .then(function () {
          return botui.action.button(
            {
              action: [
                {
                  text: "YES",
                  value: 'y1'
                },
                {
                  text: "NO",
                  value: 'n2'
                }]
            })
        })
        .then(function (res) {
          switch (res.value) {
            case 'y1':
              botui.message.add({
                type: 'embed',
                content: "https://giphy.com/embed/wGIBgBiPb2QsE"
              })
              break;
            case 'n2':
              botui.message.add({
                type: 'embed',
                content: "https://giphy.com/embed/8KyKNbHQnwkuY"
              })
              break;
          }
        })
      break;

    default: console.log("default")
  }
}


/*  if (user_feeling == 0) {
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
 } */


function main() {
  botui.message.add({
    content: 'Hello girl, I knew I will see you in this awesome chatbot'
  }).then(function () {
    botui.message.add({
      type: 'embed', // this is 'text' by default
      content: 'https://giphy.com/embed/T3Vx6sVAXzuG4'
    }).then(function () {
      botui.message.add({
        content: 'Whats your name?'
      }).then(function () { // wait till previous message has been shown.
        botui.action.text({
          action: { placeholder: "your name...." }
        }).then(function (username) {
          name = username.value;
          botui.message.add({
            content: "Hello " + username.value + " nice to meet you!"
          }).then(loop_conversation);
        });
      });
    });
  });
}

main();