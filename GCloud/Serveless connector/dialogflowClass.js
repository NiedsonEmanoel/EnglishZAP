const dialogflow = require('@google-cloud/dialogflow');
const util = require('util');
const fallbackResponses = require('./fallbackResponses.js');
const fs = require('fs');

module.exports = class {
  constructor(credential, languageCode, session) {
    this.sessionClient = new dialogflow.SessionsClient({ credentials: credential });
    this.projectID = credential.project_id;
    this.languageCode = languageCode;
    this.sessionID = session;
  }

  async detectIntent(query, contexts) {
    const sessionPath = this.sessionClient.projectAgentSessionPath(
      this.projectID,
      this.sessionID
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: this.languageCode,
        },
      },
    };

    if (contexts && contexts.length > 0) {
      request.queryParams = {
        contexts: contexts,
      };
    }

    const responses = await this.sessionClient.detectIntent(request);
    return responses[0];
  }

  async receiveText(query) {
    let context;
    let intentResponse;
    try {
      intentResponse = await this.detectIntent(
        query,
        context,
      );
      return intentResponse.queryResult;
    } catch (error) {
      console.log(error);
    }
  }

  async detectAudio(dir, deleteAtEnd) {
    const readFile = util.promisify(fs.readFile);
    const sessionPath = this.sessionClient.projectAgentSessionPath(this.projectID, this.sessionID);
    const inputAudio = await readFile(dir, 'base64');
    const request = {
      session: sessionPath,
      queryInput: {
        audioConfig: {
          sampleRateHertz: '16000',
          audioEncoding: 'AUDIO_ENCODING_OGG_OPUS',
          languageCode: 'pt-BR',
        },
      },
      inputAudio: inputAudio,
      outputAudioConfig: {
        audioEncoding: 'OUTPUT_AUDIO_ENCODING_LINEAR_16',
      },
    };

    let responses = await this.sessionClient.detectIntent(request);
    if (deleteAtEnd == true) { fs.unlink(dir, () => { }); }

    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    if (result.fulfillmentText) {
      console.log(`  Intent: ${result.intent.displayName}`);
      return responses[0].queryResult;
    }
    else {
      console.log(result);
      return fallbackResponses();
    }
  }
}