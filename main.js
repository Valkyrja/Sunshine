var botui = new BotUI('Sunshine');
var user_feeling = 0;
var name = '';

function ask_how_user_is() {
  botui.message.add({
    content: "On a scale of 1 to 10 how are you today?"
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
            },
            {
              text: "6",
              value: '6'
            },
            {
              text: "7",
              value: '7'
            },
            {
              text: "8",
              value: '8'
            },
            {
              text: "9",
              value: '9'
            },
            {
              text: "10",
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
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about a funny video to cheer you up?"
        })
            .then (deal_with_answer)
      break;

    case "2":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about a cute cat to cheer you up?"
        }
      )
      .then (deal_with_answer)
      break;

    case "3":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about something nice to cheer you up?"
        }
      )
      .then (function(){
        botui.message.add(
        {
          type: 'html',
          content: '<img src= "https://quotesnhumor.com/wp-content/uploads/2015/08/Top-50-Funniest-Memes-Collection-meme-famous.jpg" widht="200">'
        }
        )
      }
      )
      .then (deal_with_answer)
      break;

    case "4":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling sad? How about a dog to cheer you up?"
        }
      )
      .then (deal_with_answer)
      break;

    case "5":
      botui.message.add(
        {
          content: "Well " + name + " you dont look that bad this quote will cheer you up"
        }
      )
      deal_with_answer();
      break;

    case "6":
      botui.message.add(
        {
          content: name + " you dont look that sad this will motivate you"
        }
      )
      .then (deal_with_answer)
      break;

    case "7":
      botui.message.add(
        {
          content: name + " it is dangerous to go out alone have this cat?"
        }
      )
      .then (deal_with_answer)
      break;

    case "8":
      botui.message.add(
        {
          content: name + " you're feeling that good?"
        }
      )
      .then (deal_with_answer)
      break;

    case "9":
      botui.message.add(
        {
          content: "Are you really that happy?" + name
        }
      )
      .then (deal_with_answer)
      break;

    case "10":
      botui.message.add(
        {
          content: "Awww " + name + " so your feeling that happy here look at the news!"
        }
      )
      .then (deal_with_answer)
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