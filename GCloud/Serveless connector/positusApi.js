const axios = require('axios');
const Fs = require('fs')
const Path = require('path')
let positus = class {
  constructor(Token, Link) {
    this.TOKEN = `Bearer ${Token}`;
    this.LINK = Link
  }

  async DownloadAudio(id, name) {
    let url = this.LINK.replace("/messages", `/media/${id}`);
    console.log(url)
    const path = Path.resolve(`/tmp/${name}`)
    const writer = Fs.createWriteStream(path)

    const response = await axios({
      url,
      method: 'GET',
      headers: {
        'Authorization': this.TOKEN
      },
      responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }

  async Request(data) {
    console.log(this.LINK)
    let res = await axios.post(this.LINK
      , data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.TOKEN
        },
      }
    )
    return res;
  }

  async sendText(to, body) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "text",
      "text": {
        "body": body
      }
    })
    return res;
  }

  async sendLocation(to, latitude, longitude, name, adress) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "location",
      "location": {
        "longitude": longitude,
        "latitude": latitude,
        "name": name,
        "address": adress
      }
    })
    return res;
  }

  async sendImage(to, link, caption) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "image",
      "image": {
        "link": link,
        "caption": caption
      }
    })
    return res;
  }

  async sendVideo(to, link, caption) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "video",
      "video": {
        "link": link,
        "caption": caption
      }
    })
    return res;
  }

  async sendAudio(to, link) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "audio",
      "audio": {
        "link": link
      }
    })
    return res;

  }

  async sendButtons(to, header, body, footer, buttonsArr) {
    let sendNum = `+${to}`

    let buttons = []
    for (let key in buttonsArr) {
      let id = parseInt(key) + 1;
      const obj = {
        "type": "reply",
        "reply": {
          "id": `unique-postback-id-${id}`,
          "title": buttonsArr[key]
        }
      }
      buttons.push(obj)
    }

    const response = {
      "to": sendNum,
      "type": "interactive",
      "recipient_type": "individual",
      "interactive": {
        "type": "button",
        "header": {
          "type": "text",
          "text": header
        },
        "body": {
          "text": body
        },
        "footer": {
          "text": footer
        },
        "action": {
          "buttons": buttons
        }
      }
    }

    let res = await this.Request(response);
    return res
  }

  async sendDocument(to, link, caption) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "document",
      "document": {
        "link": link,
        "caption": caption
      }
    })
    return res;
  }

  async sendQuestion(to, numQuest, text, a, b, c, d) {
    let sendNum = `+${to}`
    let res = await this.Request({
      "to": sendNum,
      "type": "interactive",
      "interactive": {
        "type": "list",
        "header": {
          "type": "text",
          "text": "Questão " + numQuest
        },
        "body": {
          "text": text
        },
        "footer": {
          "text": "Toque abaixo e responda. Você só poderá responder uma vez."
        },
        "action": {
          "button": "Respostas",
          "sections": [
            {
              "title": "Active/Passive Voice",
              "rows": [
                {
                  "id": `q${numQuest}-1`,
                  "title": "A",
                  "description": a
                },
                {
                  "id": `q${numQuest}-2`,
                  "title": "B",
                  'description': b
                },
                {
                  "id": `q${numQuest}-3`,
                  "title": "C",
                  'description': c
                },
                {
                  "id": `q${numQuest}-4`,
                  "title": "D",
                  'description': d
                }
              ]
            }
          ]
        }
      }
    });
    return res
  }
}

const positusapi = new positus(process.env.TOKEN, process.env.LINK);
module.exports = positusapi;