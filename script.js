const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn__new');
const btnRoll = document.querySelector('.btn__roll');
const btnHold = document.querySelector('.btn__hold');

const targetScore = 50;

// 점수 업데이트
function updateScores() {
  score0.textContent = scores[0];
  score1.textContent = scores[1];
}

// 초기값
const initGame = () => {
  scores = [0, 0];
  currentScore = [0, 0];
  activePlayer = 0;
  isGameOver = false;

  player0.classList.remove('winner');
  player1.classList.remove('winner');

  updateScores();

  current0.textContent = 0;
  current1.textContent = 0;

  // 두 번째 플레이어 전환 시 new game을 누르면 ✨표시가 모든 플레이어에게 나오는 현상 수정
  document.getElementById('turn--0').textContent = '✨';
  document.getElementById('turn--1').textContent = '';
};

// 플레이어 전환
function switchPlayer() {
  // 현재 활성화된 플레이어의 active 클래스 제거
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  // 텍스트 제거
  document.getElementById(`turn--${activePlayer}`).textContent = '';

  // 활성화된 플레이어 변경
  activePlayer = 1 - activePlayer;

  // 새로 활성화된 플레이어에 active 클래스 추가
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  // 새로 활성화된 플레이어에 텍스트 추가
  document.getElementById(`turn--${activePlayer}`).textContent = '✨';
}

// 주사위 굴리기 이벤트
btnRoll.addEventListener('click', function () {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  diceEl.classList.remove('hidden');
  diceEl.src = `./assets/dice-${diceRoll}.png`;

  if (diceRoll !== 1 && diceRoll !== 2) {
    currentScore[activePlayer] += diceRoll;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore[activePlayer];
  } else {
    currentScore[activePlayer] = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore[activePlayer];
    switchPlayer();
  }
});

// 점수 홀드 및 승리
btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore[activePlayer];
  currentScore[activePlayer] = 0;

  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore[activePlayer];

  if (scores[activePlayer] >= targetScore) {
    alert(`player ${activePlayer + 1}의 승리입니다!`);
    initGame();
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', initGame);

initGame();
