function normalizeCardsState(cardsState) {
  const numberOfCardsFacingUp = cardsState.reduce(
    (acc, state) => (state === 'face-up' ? acc + 1 : acc),
    0
  );
  if (numberOfCardsFacingUp > 1) {
    return cardsState.map(state => (state === 'face-up' ? 'face-down' : state));
  }
  return cardsState;
}

export function calculateNewCardsState(card, state) {
  const { cards, cardsState } = state;
  // let's prepare new state
  // new state will be created from existing state, with every "face-up-temp"
  // card state replaced with "face-down" (we want to flip them after some
  // amount of time elapsed or some interaction from the player)
  const newCardsState = normalizeCardsState([...cardsState]);

  const faceUpCardId = newCardsState.findIndex(card => card === 'face-up');

  // when we clicked on card that is already matched
  if (cardsState[card.id] === 'done') {
    return null;
  }

  // when we clicked on the same card in second move
  if (faceUpCardId === card.id) {
    return null;
  }

  if (faceUpCardId === -1) {
    // when first card from pair is flipped
    newCardsState[card.id] = 'face-up';
  } else if (cards[faceUpCardId].face === card.face) {
    // when second card from pair is flipped
    newCardsState[faceUpCardId] = 'done';
    newCardsState[card.id] = 'done';
  } else if (cards[faceUpCardId].face !== card.face) {
    // when second card doesn't match first card
    newCardsState[faceUpCardId] = 'face-up';
    newCardsState[card.id] = 'face-up';
  }

  return newCardsState;
}
