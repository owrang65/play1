// متصل شدن به Firebase Realtime Database
const database = firebase.database();

// ایجاد یک بازی جدید در دیتابیس
function createGame(gameId) {
    database.ref('games/' + gameId).set({
        player1Score: 0,
        player2Score: 0,
        currentQuestion: 0
    });
}

// به‌روزرسانی امتیاز بازیکنان
function updateScore(gameId, player1Score, player2Score) {
    database.ref('games/' + gameId).update({
        player1Score: player1Score,
        player2Score: player2Score
    });
}

// دریافت اطلاعات بازی
function getGameData(gameId) {
    database.ref('games/' + gameId).once('value').then(function(snapshot) {
        const data = snapshot.val();
        console.log("Player 1 Score: " + data.player1Score);
        console.log("Player 2 Score: " + data.player2Score);
    });
}

// همگام‌سازی امتیازات بازیکنان در طول بازی
function syncScores(gameId) {
    database.ref('games/' + gameId).on('value', function(snapshot) {
        const data = snapshot.val();
        document.getElementById("score").textContent = `Player 1: ${data.player1Score} - Player 2: ${data.player2Score}`;
    });
}
