const card = document.getElementById('card');
const wordText = document.getElementById('wordText');
const wordMeaning = document.getElementById('wordMeaning');
const backMeaning = document.getElementById('backMeaning');
const backPos = document.getElementById('backPos');
const backExample = document.getElementById('backExample');
const backRoot = document.getElementById('backRoot');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const flipButton = document.getElementById('flipButton');

const STORAGE_KEY = 'wordCards';
let currentIndex = 0;
let cards = [];

const defaultCards = [
  { word: 'ambitious', meaning: '有雄心的；有抱負的', pos: 'adj.', example: 'She is ambitious and aims to study abroad.', root: 'ambi = both, itious 表形容詞', back: '有強烈成功欲望的' },
  { word: 'consist', meaning: '由...組成；在於', pos: 'v.', example: 'Success consists of hard work and persistence.', root: 'con = together, sist = stand', back: '構成、存在於' },
  { word: 'contrast', meaning: '對比；對照', pos: 'n./v.', example: 'The contrast between the two paintings is obvious.', root: 'contra = against', back: '比較差異' },
  { word: 'dedicate', meaning: '奉獻；致力於', pos: 'v.', example: 'He dedicates himself to helping others.', root: 'de = down, dic = say', back: '投入心力於某事' },
  { word: 'emerge', meaning: '出現；顯現', pos: 'v.', example: 'A new leader emerged after the election.', root: 'e = out, merge = plunge', back: '從隱藏或困難中出現' },
  { word: 'essential', meaning: '必要的；基本的', pos: 'adj.', example: 'Water is essential for life.', root: 'ess = be, ent = adj.', back: '不可或缺的' },
  { word: 'frequent', meaning: '頻繁的；常見的', pos: 'adj.', example: 'Traffic jams are frequent during rush hour.', root: 'frequent = often', back: '經常發生的' },
  { word: 'generate', meaning: '產生；引起', pos: 'v.', example: 'The machine generates power for the entire building.', root: 'gen = produce', back: '造成或製造某物' },
  { word: 'highlight', meaning: '強調；突出', pos: 'v./n.', example: 'The teacher highlights the key points in the lesson.', root: 'high = high, light = shine', back: '標示重要部分' },
  { word: 'identify', meaning: '辨認；確認', pos: 'v.', example: 'Please identify the cause of the problem.', root: 'id = same, entify = make', back: '確認或辨識' },
  { word: 'maintain', meaning: '維持；保持', pos: 'v.', example: 'He maintains a balanced study schedule.', root: 'main = stay', back: '使狀態持續不變' },
  { word: 'observe', meaning: '觀察；遵守', pos: 'v.', example: 'Scientists observe the behavior carefully.', root: 'ob = toward, serve = keep', back: '注意並記錄' },
  { word: 'persuade', meaning: '說服；勸導', pos: 'v.', example: 'She persuaded him to join the club.', root: 'per = through, suade = urge', back: '讓別人接受你的看法' },
  { word: 'precise', meaning: '精確的；準確的', pos: 'adj.', example: 'The instructions must be precise.', root: 'pre = before, cise = cut', back: '非常準確、沒有誤差' },
  { word: 'represent', meaning: '代表；呈現', pos: 'v.', example: 'He represents his class in the council.', root: 're = again, present = show', back: '以某種方式表現或代表' },
  { word: 'require', meaning: '需要；要求', pos: 'v.', example: 'This task requires attention to detail.', root: 're = again, quire = ask', back: '必須具備或做某事' },
  { word: 'sufficient', meaning: '足夠的；充分的', pos: 'adj.', example: 'You have sufficient time to finish the project.', root: 'suf = under, fic = make, ient = adj.', back: '剛好夠用' },
  { word: 'transfer', meaning: '轉移；調動', pos: 'v.', example: 'She transferred to another school last year.', root: 'trans = across, fer = carry', back: '從一個地方移到另一個地方' },
  { word: 'unique', meaning: '獨特的；唯一的', pos: 'adj.', example: 'Every person has a unique talent.', root: 'uni = one', back: '與眾不同、特別' },
  { word: 'visible', meaning: '可見的；明顯的', pos: 'adj.', example: 'The mountain is visible from the city.', root: 'vis = see, ible = able', back: '能用眼睛看見的' }
];

function loadCards() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        cards = parsed;
        return;
      }
    } catch (error) {
      console.warn('無法解析儲存資料，使用預設單字。', error);
    }
  }
  cards = defaultCards;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

function renderCard(index) {
  const item = cards[index];
  if (!item) return;
  wordText.textContent = item.word;
  wordMeaning.textContent = `${item.pos}  ${item.meaning}`;
  backMeaning.textContent = item.meaning;
  backPos.textContent = item.pos;
  backExample.textContent = item.example;
  backRoot.textContent = item.root;
}

function showCard(index) {
  currentIndex = (index + cards.length) % cards.length;
  card.classList.remove('is-flipped');
  renderCard(currentIndex);
}

function toggleFlip() {
  card.classList.toggle('is-flipped');
}

card.addEventListener('click', () => toggleFlip());
prevButton.addEventListener('click', () => showCard(currentIndex - 1));
nextButton.addEventListener('click', () => showCard(currentIndex + 1));
flipButton.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleFlip();
});

window.addEventListener('DOMContentLoaded', () => {
  loadCards();
  showCard(0);
});
