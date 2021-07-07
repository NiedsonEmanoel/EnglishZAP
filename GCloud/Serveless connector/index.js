const Positus = require('./positusApi.js');
const axios = require('axios')
const moment = require('moment')
const Credential = require('./oAuthDialogFlow.json');
const DialogFlow = require('./dialogflowClass.js');
const fallbackResponses = require('./fallbackResponses.js');
const KeyChooser = require('./key.js')

exports.helloWorld = async (req, res) => {
  try {
    if (!req.body.statuses) {
      if (req.body.messages[0]) {

        let preferences = await axios.get('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/preferences')
        let now = new Date()
        preferences = preferences.data;

        let { type, from } = req.body.messages[0]

        let bot = new DialogFlow(Credential, 'en-US', from)

        switch (type) {
          case 'text':
            let body = req.body.messages[0].text.body;

            if (KeyChooser(body) == 0) {
              return res.status(200).send({
                from,
                "situation": "ignored"
              })
            } else if (KeyChooser(body) == -1) {

              let name = req.body.contacts[0].profile.name;

              let cadResponse = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/users', {
                "fullName": name,
                "chatId": from
              });

              if (cadResponse.data.Type == 0) {
                await Positus.sendText(from, `Boas vindas, *${name}*!\nSeu número foi cadastrado com sucesso!\n\nAssim que divulgada, digite a palavra chave da questão.`)
              } else if (cadResponse.data.Type == 2) {
                await Positus.sendText(from, `Seu número já se encontra cadastrado!\n\nAssim que divulgada, digite a palavra chave da questão.`)
              } else {
                await Positus.sendText(from, `Os cadastros não estão sendo permitidos nesse momento.`)
              }

              return res.status(200).send({
                from,
                "situation": "cadastro"
              });

            } else {
              if (preferences.Type == 0) {
                await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                return res.status(200).send({
                  from,
                  "situation": "apressado"
                });
              }
              switch (KeyChooser(body)) {
                case 1:
                  let endOne;
                  try {
                    endOne = preferences.Preferences.QuestionOneEnd;
                    if (moment(endOne).isAfter(now)) {
                      await Positus.sendQuestion(from, 1,
                        `"All of this can be proven by any citizen”.\nA *forma ativa* dessa mesma frase é:`,
                        'Any citizen can prove all this', // essa
                        'Everything can be proved',
                        'Any citizen can prove all this',
                        'All this can be proven'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 2:
                  let endTwo;
                  try {
                    endTwo = preferences.Preferences.QuestionTwoEnd;
                    if (moment(endTwo).isAfter(now)) {
                      await Positus.sendQuestion(from, 2, 'Escolha a alternativa em que *há* agente da passiva.',
                        'We will be judged by our actions', //essa
                        'Look at all this land that is inhabited by these lawless people',
                        'Thank you for the book',
                        'I heard the news through'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 3:
                  let endThree;
                  try {
                    endThree = preferences.Preferences.QuestionThreeEnd;
                    if (moment(endThree).isAfter(now)) {
                      await Positus.sendQuestion(from, 3, `Indique a alternativa que expressa o *mesmo significado* de: “You can't wrap a whole mountain range in a blanket”.`,
                        'A whole mountain range can not be wrapped in a blanket', //essa
                        'A whole mountain range could not be wrapped in a blanket',
                        'In a blanket a whole mountain range is not wrapped',
                        'You can not be wrapped by a whole mountain range'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 4:
                  let endFour;
                  try {
                    endFour = preferences.Preferences.QuestionFourEnd;
                    if (moment(endFour).isAfter(now)) {
                      await Positus.sendQuestion(from, 4, ' Identifique qual das frases está na voz ativa​',
                        'The uniform was chosen by the coach',
                        'The exercises were corrected by the teacher',
                        'The teacher corrected all the exercises', // essa
                        'The exercises will be corrected by the teacher'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 5:
                  let endFive;
                  try {
                    endFive = preferences.Preferences.QuestionFiveEnd;
                    if (moment(endFive).isAfter(now)) {
                      await Positus.sendQuestion(from, 5, 'Qual dessas frases está na *voz passiva?*',
                        'Candidates made their speech', //essa
                        'The candidates had already made the speech',
                        'Candidates made theirs speech',
                        'Candidates would make the speech'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 6:
                  let endSix;
                  try {
                    endSix = preferences.Preferences.QuestionSixEnd;
                    if (moment(endSix).isAfter(now)) {
                      await Positus.sendQuestion(from, 6, `*Transforme para a voz passiva* a seguinte frase: "Never disobey your elders"`,
                        'You are ordered not to disobey your elders',
                        'You are not to disobey your elders',
                        'You are asked not to disobey your elders', //essa
                        'Do not disobey your elders'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 7:
                  let endSeven;
                  try {
                    endSeven = preferences.Preferences.QuestionSevenEnd;
                    if (moment(endSeven).isAfter(now)) {
                      await Positus.sendQuestion(from, 7, `*Tranforme para a voz ativa* a seguinte frase: "Servants should be told to prepare tea"`,
                        'The beggar laughs at the boy',
                        'To make a piece of tea the servants must be masters',
                        'To prepare tea servants should be told',
                        'Tell the servants to prepare tea' //essa
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 8:
                  let endEight;
                  try {
                    endEight = preferences.Preferences.QuestionEightEnd;
                    if (moment(endEight).isAfter(now)) {
                      await Positus.sendQuestion(from, 8,
                        `Veja o trecho da série abaixo e escolha a *voz passiva*`,
                        'I have saved you.',
                        'I did it',
                        'You have been saved by me', //Esse
                        `You have been save by me`
                      )
                      await Positus.sendVideo(from, 'https://github.com/NiedsonEmanoel/Myzap/blob/main/src/8.mp4?raw=true', 'Sean saves the World S1:E6')
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 9:
                  let endNine;
                  try {
                    endNine = preferences.Preferences.QuestionNineEnd;
                    if (moment(endNine).isAfter(now)) {
                      await Positus.sendQuestion(from, 9, `Veja o trecho da série abaixo e logo após escolha a *voz ativa*.`,
                        `You'll picked up by you`,
                        'Will the lessons had been completed.',
                        `I'll pick you up`, //essa
                        `I'll picked up by you`
                      )
                      await Positus.sendVideo(from, 'https://github.com/NiedsonEmanoel/Myzap/blob/main/src/9.mp4?raw=true', 'How to life with your parents S1:E1')
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;

                case 10:
                  let endTen;
                  try {
                    endTen = preferences.Preferences.QuestionTenEnd;
                    if (moment(endTen).isAfter(now)) {
                      await Positus.sendAudio(from, 'https://github.com/NiedsonEmanoel/Myzap/blob/main/src/2021-07-06_20-14-46.mp3?raw=true');
                      await Positus.sendQuestion(from, 10, `No áudio abaixo, temos a música Video Games de Lana del Rey. Qual trecho nos suporta em afirmar que essa parte da música contém voz passiva?`,
                        `It's better than I`,
                        `Dancing 'til the break of dawn`,
                        'Was built for two', //essa
                        'Baby, now you do'
                      )
                    } else {
                      await Positus.sendText(from, 'Tempo esgotado para essa questão!')
                    }
                  } catch (e) {
                    await Positus.sendText(from, 'Aguarde a autorização para utilizar essa palavra chave');
                  }
                  break;
              }
            }

            return res.status(200).send('sent');
            break;

          case 'voice':
            /*let voice = req.body.messages[0].voice
            await Positus.DownloadAudio(voice.id, 'audio.oga')
            let responseAudioFromDialogFlow = await bot.detectAudio(`/tmp/audio.oga`, false);

            if (responseAudioFromDialogFlow.queryText != undefined) {
              await Positus.sendText(from, `You said:\n\n🎙: ${responseAudioFromDialogFlow.queryText}`)
            } else {
              await Positus.sendText(from, `You said anything? 'cause I can't hear you.`)
            }
*/
            return res.status(200).send('sent')
            break;

          case 'interactive':
            let interactive = req.body.messages[0].interactive.list_reply.description;
            let id = req.body.messages[0].interactive.list_reply.id;
            let nowQuestion = preferences.Preferences.QuestionNow

            if ((nowQuestion == 1) && (id == 'q1-1')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionOneEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 2) && (id == 'q2-1')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionTwoEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 3) && (id == 'q3-1')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionThreeEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 4) && (id == 'q4-3')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionFourEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 5) && (id == 'q5-1')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionFiveEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 6) && (id == 'q6-3')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionSixEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 7) && (id == 'q7-4')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionSevenEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 8) && (id == 'q8-3')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionEightEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 9) && (id == 'q9-3')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionNineEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else if ((nowQuestion == 10) && (id == 'q10-3')) {
              let nowMoment = moment(now);
              let endMoment = moment(preferences.Preferences.QuestionTenEnd);

              let l = (300 - endMoment.diff(nowMoment, 'seconds'))
              let numPoints = new Number((1000 - ((1000 / 300)) * l) * 1).toFixed(0);

              let sasRes = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: numPoints, chatId: from, NumOfQuestion: nowQuestion })
              if (sasRes.data.Type == 1) {
                await Positus.sendText(from, 'Você já respondeu essa questão.')
              } else {
                await Positus.sendText(from, 'Parabéns você acertou!\n\nPontuação: ' + numPoints + '/1000')
              }
              res.status(200).send({
                "Question": "answered"
              });

            } else {
              let sas = await axios.post('https://engli-sadpmlwlvq-uc.a.run.app/api/v1/questions', { Points: 0, chatId: from, NumOfQuestion: nowQuestion })
              await Positus.sendText(from, `Você não respondeu corretamente :(\n\nMais sorte na próxima`)
            }

            return res.status(200).send('sent')
            break;

          default:
            return res.status(200).send('sent')
        }

      }
    } else {
      return res.status(200).send({
        working: true,
        message: "Callback recebido com sucesso",
        local_time: new Date()
      })
    }
  } catch (e) {
    if (req.method != 'POST') {
      e = `Unable to receive ${req.method} requests.`
    } else {
      console.error(e);
    }
    return res.status(500).send({
      working: true,
      error: e,
      local_time: new Date()
    })
  }

};
