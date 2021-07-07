const keyChooser = (word) => {
  let wordFormated = word.toLowerCase();
  let key;

  switch (wordFormated) {
    case 'valorant':
      key = 1;
      break;

    case 'tucano':
      key = 2;
      break;

    case 'mojang':
      key = 3;
      break;

    case 'papa':
      key = 4;
      break;

    case 'acordar':
      key = 5;
      break;

    case 'oxente':
      key = 6;
      break;

    case 'bravo':
      key = 7;
      break;

    case 'delta':
      key = 8;
      break;

    case 'nuvem':
      key = 9;
      break;

    case 'porta':
      key = 10;
      break;

    case '462-067':
      key = -1;
      break;
    default:
      key = 0
  }

  return key;
}

module.exports = keyChooser;