// Egyptian Movies Game App

// Game data from JSON
const movies = [
  "الأرض", "العزيمة", "المومياء", "دعاء الكروان", "بين القصرين", "الحرام", "القاهرة 30",
  "المتوحشة", "سلام يا صاحبي", "امرأة ضد القانون", "عفريت مراتي", "الراجل ده حيجنني",
  "أفريكانو", "تتح", "الباشا تلميذ", "365 يوم سعادة", "كده رضا", "هي فوضى",
  "ألف مبروك", "أبو علي", "الناظر", "مدرسة المشاغبين", "غش الزوجية", "بوشكاش",
  "أحلام حقيقية", "عاصفة في فنجان", "الكيت كات", "أصحاب... ولا أعز", "مالي كي ك",
  "X-Large", "الفيل الأزرق", "تصبح على خير", "هلاوة", "فول الصين العظيم", "سمير وشهير وبهير",
  "ابن النجار", "الواد محروس بتاع الوزير", "مطاردة غرامية", "مش أنا", "ونحب تاني ليه",
  "نص كيلو لحمة", "إسكندرية كمان وكمان", "بحب السيما", "سعيد كلاكيت", "يوم حلو ويوم مر",
  "عوكل", "فتوة السلخانة", "وقعة زلزال", "الاختيار", "امرأة العين", "المصير",
  "مطب صناعي", "عيار ناري", "الإرهابي", "الأشقياء الثلاثة", "باب شرق", "صعيدي في جامعة أمريكية",
  "اسماعيل ياسين في البوليس", "مجنون ليلى", "كدب في كدب", "بوب الذهبي", "هليوبوليس",
  "دكان شحاتة", "ركبة بركبة", "الكوميديا الإلهية", "بلية ودماغه العالية", "العفريته",
  "جوازة ميري", "ضرب نار", "بدل فاقد", "مفيش غير النضارة", "خمسة باب",
  "حكاية الثلاث بنات", "عيلة الدوغري", "يمهل ولا يهمل", "صباح الفل", "خمسة شارع الحبايب",
  "مدرسة الحب", "ضحك ولعب وجد وحب", "حلال علينا حرام عليكم", "القاهرة في الليل", "كأس العزاب",
  "لا مؤاخذة", "عنتر في بلاد الرومان", "ألف ليلة وليلة", "حياتي عذاب", "المجانين في نعيم",
  "دنيا أحلى", "نص دستة اشرار", "صيدلية الغاية", "امي نور عيني", "الوسادة الخالية",
  "المملكة", "مركب نوح", "عصر الحب", "القرش ذو الدراع الذهبية", "المنتقم",
  "ليالي الحلمية", "طيور الظلام", "رد قلبي", "القطة", "عن العشق والهوى",
  "السيرك", "مسرحية مدرسة الحب", "الوحوش", "بنات أفكاري", "لص ولكن ظريف",
  "حبيبي دائماً", "بين الأطلال", "المدينة", "القاتل", "عفاريت عدلي علام",
  "نادية", "إنسان مجهول الهوية", "مودة", "البيت المالوش راجل", "زقاق المدق"
];

// Game state
let gameState = {
  currentScreen: 'welcome',
  gameDuration: 0, // in seconds
  currentPlayer: 1, // 1 or 2
  player1Score: 0,
  player2Score: 0,
  timeRemaining: 0,
  usedMovies: [],
  availableMovies: [],
  currentMovie: '',
  timerInterval: null,
  isPaused: false,
  gameStartTime: null,
  highScore: { player1: 0, player2: 0 },
  maxScore: 5 // Maximum score to win
};

// Initialize the app
function init() {
  console.log('Initializing app...');
  
  // Load high score
  updateHighScoreDisplay();
  
  // Setup event listeners
  setupEventListeners();
  
  // Show welcome screen
  showScreen('welcome');
  
  console.log('App initialized successfully');
}

// Update high score display
function updateHighScoreDisplay() {
  const display = `${gameState.highScore.player1} - ${gameState.highScore.player2}`;
  const highScoreElement = document.getElementById('high-score');
  if (highScoreElement) {
    highScoreElement.textContent = display;
  }
}

// Setup event listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Welcome screen
  const startGameBtn = document.getElementById('start-game');
  if (startGameBtn) {
    startGameBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Start game button clicked');
      showScreen('duration');
    });
    console.log('Start game button listener added');
  } else {
    console.error('Start game button not found!');
  }

  // Duration screen
  const backToWelcomeBtn = document.getElementById('back-to-welcome');
  if (backToWelcomeBtn) {
    backToWelcomeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showScreen('welcome');
    });
  }

  const durationBtns = document.querySelectorAll('.duration-btn');
  durationBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      selectDuration(btn);
    });
  });

  const startPlayingBtn = document.getElementById('start-playing');
  if (startPlayingBtn) {
    startPlayingBtn.addEventListener('click', function(e) {
      e.preventDefault();
      startGame();
    });
  }

  // Game screen
  const pauseBtn = document.getElementById('pause-btn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', function(e) {
      e.preventDefault();
      pauseGame();
    });
  }

  const correctAnswerBtn = document.getElementById('correct-answer');
  if (correctAnswerBtn) {
    correctAnswerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      correctAnswer();
    });
  }

  const wrongAnswerBtn = document.getElementById('wrong-answer');
  if (wrongAnswerBtn) {
    wrongAnswerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      wrongAnswer();
    });
  }

  const newMovieBtn = document.getElementById('new-movie');
  if (newMovieBtn) {
    newMovieBtn.addEventListener('click', function(e) {
      e.preventDefault();
      getNewMovie();
    });
  }

  // Pause screen
  const resumeGameBtn = document.getElementById('resume-game');
  if (resumeGameBtn) {
    resumeGameBtn.addEventListener('click', function(e) {
      e.preventDefault();
      resumeGame();
    });
  }

  const endGameBtn = document.getElementById('end-game');
  if (endGameBtn) {
    endGameBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showResults();
    });
  }

  // Results screen
  const playAgainBtn = document.getElementById('play-again');
  if (playAgainBtn) {
    playAgainBtn.addEventListener('click', function(e) {
      e.preventDefault();
      playAgain();
    });
  }

  const newDurationBtn = document.getElementById('new-duration');
  if (newDurationBtn) {
    newDurationBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showScreen('duration');
    });
  }

  const backToHomeBtn = document.getElementById('back-to-home');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showScreen('welcome');
    });
  }

  console.log('Event listeners setup complete');
}

// Show specific screen
function showScreen(screenName) {
  console.log('Showing screen:', screenName);
  
  // Hide all screens
  const screens = document.querySelectorAll('.screen');
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  // Show target screen
  const targetScreen = document.getElementById(`${screenName}-screen`);
  if (targetScreen) {
    targetScreen.classList.add('active');
    targetScreen.classList.add('fade-in');
    
    setTimeout(() => {
      targetScreen.classList.remove('fade-in');
    }, 500);
    
    console.log(`Screen ${screenName} shown successfully`);
  } else {
    console.error(`Screen ${screenName}-screen not found!`);
  }

  gameState.currentScreen = screenName;
}

// Select duration
function selectDuration(selectedBtn) {
  console.log('Duration selected:', selectedBtn.dataset.minutes);
  
  // Remove selected class from all buttons
  const durationBtns = document.querySelectorAll('.duration-btn');
  durationBtns.forEach(btn => {
    btn.classList.remove('selected');
  });

  // Add selected class to clicked button
  selectedBtn.classList.add('selected');

  // Get duration in minutes and convert to seconds
  const minutes = parseInt(selectedBtn.dataset.minutes);
  gameState.gameDuration = minutes * 60;

  // Enable start playing button
  const startPlayingBtn = document.getElementById('start-playing');
  if (startPlayingBtn) {
    startPlayingBtn.disabled = false;
  }
}

// Start game
function startGame() {
  console.log('Starting game with duration:', gameState.gameDuration, 'seconds');
  resetGameState();
  setupGame();
  showScreen('game');
  startTimer();
}

// Reset game state
function resetGameState() {
  gameState.currentPlayer = 1;
  gameState.player1Score = 0;
  gameState.player2Score = 0;
  gameState.timeRemaining = gameState.gameDuration;
  gameState.usedMovies = [];
  gameState.availableMovies = [...movies];
  gameState.isPaused = false;
  gameState.gameStartTime = Date.now();

  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
  }
}

// Setup game interface
function setupGame() {
  updateScoreDisplay();
  updateCurrentTurn();
  getNewMovie();
}

// Start timer
function startTimer() {
  console.log('Starting timer');
  updateTimerDisplay(); // Initial display
  
  gameState.timerInterval = setInterval(() => {
    if (!gameState.isPaused) {
      gameState.timeRemaining--;
      updateTimerDisplay();

      if (gameState.timeRemaining <= 0) {
        endGame();
      }
    }
  }, 1000);
}

// Update timer display
function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeRemaining / 60);
  const seconds = gameState.timeRemaining % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const timerText = document.getElementById('timer-text');
  if (timerText) {
    timerText.textContent = timeString;
  }

  // Update timer fill
  const percentage = (gameState.timeRemaining / gameState.gameDuration) * 100;
  const timerFill = document.getElementById('timer-fill');
  if (timerFill) {
    timerFill.style.width = `${percentage}%`;

    // Update timer styling based on remaining time
    timerFill.className = 'timer-fill';
    timerText.className = '';

    if (gameState.timeRemaining <= 30) {
      timerFill.classList.add('danger');
      timerText.classList.add('danger');
    } else if (gameState.timeRemaining <= 60) {
      timerFill.classList.add('warning');
      timerText.classList.add('warning');
    }
  }
}

// Update score display
function updateScoreDisplay() {
  const player1Score = document.getElementById('player1-score');
  if (player1Score) {
    player1Score.textContent = gameState.player1Score;
  }
  
  const player2Score = document.getElementById('player2-score');
  if (player2Score) {
    player2Score.textContent = gameState.player2Score;
  }

  // Highlight current player
  const player1Container = player1Score?.parentElement;
  const player2Container = player2Score?.parentElement;

  if (player1Container && player2Container) {
    player1Container.classList.toggle('active', gameState.currentPlayer === 1);
    player2Container.classList.toggle('active', gameState.currentPlayer === 2);
  }
}

// Update current turn text
function updateCurrentTurn() {
  const playerName = gameState.currentPlayer === 1 ? 'اللاعب الأول' : 'اللاعب الثاني';
  const currentTurnText = document.getElementById('current-turn-text');
  if (currentTurnText) {
    currentTurnText.textContent = `دور ${playerName}`;
  }
}

// Get new movie
function getNewMovie() {
  if (gameState.availableMovies.length === 0) {
    // Refill available movies if all used
    gameState.availableMovies = [...movies];
    gameState.usedMovies = [];
  }

  const randomIndex = Math.floor(Math.random() * gameState.availableMovies.length);
  const selectedMovie = gameState.availableMovies[randomIndex];

  // Remove from available and add to used
  gameState.availableMovies.splice(randomIndex, 1);
  gameState.usedMovies.push(selectedMovie);

  gameState.currentMovie = selectedMovie;

  const currentMovie = document.getElementById('current-movie');
  if (currentMovie) {
    currentMovie.textContent = selectedMovie;
  }
  
  console.log('New movie selected:', selectedMovie);
}

// Handle correct answer
function correctAnswer() {
  console.log('Correct answer clicked for player', gameState.currentPlayer);
  
  // Add point to current player
  if (gameState.currentPlayer === 1) {
    gameState.player1Score++;
  } else {
    gameState.player2Score++;
  }

  updateScoreDisplay();

  // Check if player reached maximum score
  if (gameState.player1Score >= gameState.maxScore || gameState.player2Score >= gameState.maxScore) {
    endGame();
    return;
  }

  // Switch to next turn
  switchPlayer();
}

// Handle wrong answer
function wrongAnswer() {
  console.log('Wrong answer clicked for player', gameState.currentPlayer);
  
  // No points awarded for wrong answer, just switch player
  switchPlayer();
}

// Switch to next player and get new movie
function switchPlayer() {
  // Switch player
  gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
  updateCurrentTurn();

  // Get new movie
  getNewMovie();
}

// Pause game
function pauseGame() {
  console.log('Game paused');
  gameState.isPaused = true;
  showScreen('pause');
}

// Resume game
function resumeGame() {
  console.log('Game resumed');
  gameState.isPaused = false;
  showScreen('game');
}

// End game
function endGame() {
  console.log('Game ended');
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }

  // Update high score
  if (gameState.player1Score > gameState.highScore.player1 || 
      gameState.player2Score > gameState.highScore.player2) {
    gameState.highScore.player1 = Math.max(gameState.highScore.player1, gameState.player1Score);
    gameState.highScore.player2 = Math.max(gameState.highScore.player2, gameState.player2Score);
    updateHighScoreDisplay();
  }

  showResults();
}

// Show results
function showResults() {
  console.log('Showing results');
  
  // Update final scores
  const finalPlayer1Score = document.getElementById('final-player1-score');
  if (finalPlayer1Score) {
    finalPlayer1Score.textContent = gameState.player1Score;
  }
  
  const finalPlayer2Score = document.getElementById('final-player2-score');
  if (finalPlayer2Score) {
    finalPlayer2Score.textContent = gameState.player2Score;
  }

  // Determine winner and set message
  let winnerIcon = '🏆';
  let winnerTitle = 'انتهت اللعبة!';
  let winnerMessage = '';
  let messageClass = '';

  if (gameState.player1Score > gameState.player2Score) {
    winnerIcon = '🥇';
    winnerTitle = 'اللاعب الأول فاز!';
    winnerMessage = `🎉 مبروك! اللاعب الأول حقق ${gameState.player1Score} نقاط`;
    messageClass = 'winner';
  } else if (gameState.player2Score > gameState.player1Score) {
    winnerIcon = '🥇';
    winnerTitle = 'اللاعب الثاني فاز!';
    winnerMessage = `🎉 مبروك! اللاعب الثاني حقق ${gameState.player2Score} نقاط`;
    messageClass = 'winner';
  } else {
    winnerIcon = '🤝';
    winnerTitle = 'تعادل!';
    winnerMessage = `⚖️ تعادل بين اللاعبين بنتيجة ${gameState.player1Score} - ${gameState.player2Score}`;
    messageClass = 'tie';
  }

  const winnerIconElement = document.getElementById('winner-icon');
  if (winnerIconElement) {
    winnerIconElement.textContent = winnerIcon;
  }
  
  const winnerTitleElement = document.getElementById('winner-title');
  if (winnerTitleElement) {
    winnerTitleElement.textContent = winnerTitle;
  }
  
  const winnerMessageElement = document.getElementById('winner-message');
  if (winnerMessageElement) {
    winnerMessageElement.textContent = winnerMessage;
    winnerMessageElement.className = `winner-message ${messageClass}`;
  }

  showScreen('results');
}

// Play again with same duration
function playAgain() {
  console.log('Playing again');
  startGame();
}

// Handle page visibility change (pause when tab not active)
document.addEventListener('visibilitychange', () => {
  if (gameState.currentScreen === 'game' && !gameState.isPaused) {
    if (document.hidden) {
      pauseGame();
    }
  }
});

// Prevent accidental zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded - Initializing app...');
  init();
});