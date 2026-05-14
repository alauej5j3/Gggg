const STORAGE_KEY = 'wordCards';
const wordForm = document.getElementById('wordForm');
const inputWord = document.getElementById('inputWord');
const inputMeaning = document.getElementById('inputMeaning');
const inputPos = document.getElementById('inputPos');
const inputExample = document.getElementById('inputExample');
const inputRoot = document.getElementById('inputRoot');
const wordList = document.getElementById('wordList');

function getStoredWords() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    return [];
  }
}

function saveStoredWords(words) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

function renderWordList() {
  const words = getStoredWords();
  wordList.innerHTML = '';
  if (words.length === 0) {
    wordList.innerHTML = '<li>目前沒有單字。請新增一個。</li>';
    return;
  }

  words.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${item.word}</strong> ${item.pos}<br />
      ${item.meaning}<br />
      <em>例句：</em>${item.example}<br />
      <em>字根：</em>${item.root}
    `;
    wordList.appendChild(li);
  });
}

wordForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newWord = inputWord.value.trim();
  const newMeaning = inputMeaning.value.trim();
  const newPos = inputPos.value.trim();
  const newExample = inputExample.value.trim();
  const newRoot = inputRoot.value.trim();

  if (!newWord || !newMeaning || !newPos || !newExample || !newRoot) {
    alert('請完整填寫所有欄位。');
    return;
  }

  const words = getStoredWords();
  words.push({
    word: newWord,
    meaning: newMeaning,
    pos: newPos,
    example: newExample,
    root: newRoot,
    back: newMeaning,
  });
  saveStoredWords(words);
  renderWordList();
  wordForm.reset();
  alert('單字已新增，請回到學習頁面查看。');
});

window.addEventListener('DOMContentLoaded', () => {
  renderWordList();
});
