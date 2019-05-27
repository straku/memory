// prettier-ignore
const names = ['4-LOM', 'Aayla Secura', 'Admiral Ackbar', 'Admiral Thrawn', 'Ahsoka Tano', 'Anakin Solo', 'Asajj Ventress', 'Aurra Sing', 'Senator Bail Organa', 'Barriss Offee', 'Bastila Shan', 'Ben Skywalker', 'Bib Fortuna', 'Biggs Darklighter', 'Boba Fett', 'Bossk', 'Brakiss', 'C-3PO', 'Cad Bane', 'Cade Skywalker', 'Callista Ming', 'Captain Rex', 'Carnor Jax', 'Chewbacca', 'Clone Commander Cody', 'Count Dooku', 'Darth Bane', 'Darth Krayt', 'Darth Maul', 'Darth Nihilus', 'Darth Vader', 'Dash Rendar', 'Dengar', 'Durge', 'Emperor Palpatine', 'Exar Kun', 'Galen Marek', 'General Crix Madine', 'General Dodonna', 'General Grievous', 'General Veers', 'Gilad Pellaeon', 'Grand Moff Tarkin', 'Greedo', 'Han Solo', 'IG 88', 'Jabba The Hutt', 'Jacen Solo', 'Jaina Solo', 'Jango Fett', 'Jarael', 'Jerec', 'Ki-Adi-Mundi', 'Kir Kanos', 'Kit Fisto', 'Kyle Katarn', 'Kyp Durron', 'Lando Calrissian', 'Luke Skywalker', 'Luminara Unduli', 'Lumiya', 'Mace Windu', 'Mara Jade', 'Mission Vao', 'Natasi Daala', 'Nom Anor', 'Obi-Wan Kenobi', 'Padmé Amidala', 'Plo Koon', 'Pre Vizsla', 'Prince Xizor', 'Princess Leia', 'PROXY', 'Qui-Gon Jinn', 'Quinlan Vos', 'R2-D2', 'Rahm Kota', 'Revan', 'Satele Shan', 'Savage Opress', 'Sebulba', 'Shaak Ti', 'Shmi Skywalker', 'Talon Karrde', 'Ulic Qel-Droma', 'Visas Marr', 'Watto', 'Wedge Antilles', 'Yoda', 'Zam Wesell', 'Zayne Carrick', 'Zuckuss'];

let scores = Array(92)
  .fill(0)
  .map((_, i) => ({
    nickname: names[i],
    value: Math.ceil(Math.random() * 500 + 300),
  }))
  .sort((a, b) => b.value - a.value)
  .map((score, i) => ({
    ...score,
    place: i + 1,
  }));

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export async function saveScore(userNickname, userScore) {
  const currentPlayerPos = scores.findIndex(score => score.currentPlayer);
  const pos = scores.findIndex(score => score.value < userScore);

  if (currentPlayerPos !== -1 && currentPlayerPos < pos) {
    throw new Error("You didn't beat your score, try again!");
  }

  scores = [
    ...scores.slice(0, pos),
    {
      nickname: userNickname,
      value: userScore,
      place: pos + 1,
      currentPlayer: true,
    },
    ...scores
      .slice(pos)
      .map(score => ({
        ...score,
        place: score.place + 1,
      }))
      .filter(score => score.currentPlayer !== true),
  ];

  const results = [];
  for (let i = pos - 3 < 0 ? 0 : pos - 3; i <= pos + 3; i++) {
    results.push(scores[i]);
  }

  await delay(1000);

  return results;
}

export async function getTopScores() {
  await delay(1000);
  console.log(scores.slice(0, 10));
  return scores.slice(0, 10);
}
