const colors = [
    {name: "ĐỎ", color: "red"},
    {name: "XANH LÁ", color: "green"},
    {name: "VÀNG", color: "gold"},
    {name: "XANH DƯƠNG", color: "dodgerblue"},
    {name: "TÍM", color: "purple"},
    {name: "HỒNG", color: "deeppink"},
    {name: "CAM", color: "orange"},
    {name: "NÂU", color: "sienna"},
    {name: "XÁM", color: "gray"},
    {name: "XANH NGỌC", color: "turquoise"},
    {name: "XANH BIỂN", color: "skyblue"},
    {name: "VÀNG NHẠT", color: "khaki"}
];

const punishments = [
    "Ngồi xuống – đứng lên 3 lần",
    "Nhảy điệu silly 10 lần 🕺",
    "Cười điên loạn 5 giây 😜",
    "Giơ tay high-five bản thân ✋",
    "Hú 1 tiếng thật to 😆",
    "Vỗ tay 5 lần 👏",
    "Vươn vai 5 lần 🤸"
];

const rewards = [
    "Xuất sắc! 😎",
    "Tuyệt vời! 🧠✨",
    "Chính xác! 🎨",
    "Trí não đang đỉnh cao 🚀",
    "Bạn thông minh hơn mình tưởng 😆",
    "Bạn là bậc thầy chọn màu 👑"
];

const display = document.getElementById("displayText");
const buttonsDiv = document.getElementById("buttons");
const result = document.getElementById("result");
const timeBar = document.getElementById("timeBar");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
// stopBtn.style.display = "none";

let colorIndex = 0;
let timeInterval;
let timeLeft = 2;
let gameStarted = false;
let paused = false;

function startTimer() {
    timeLeft = 3.5;
    timeBar.style.width = "100%";
    if (timeInterval) clearInterval(timeInterval);
    timeInterval = setInterval(() => {
        if (paused) return; // tạm dừng
        timeLeft -= 0.05;
        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            const punishment = punishments[Math.floor(Math.random() * punishments.length)];
            result.style.color = "orange";
            result.textContent = "⏰ Hết giờ! Phạt: " + punishment;
            setTimeout(newRound, 1500);
        }
        timeBar.style.width = (timeLeft / 3 * 100) + "%";
    }, 50);
}

function newRound() {
    if (!gameStarted) return;
    clearInterval(timeInterval);
    startTimer();
    result.textContent = "";

    let textIndex = Math.floor(Math.random() * colors.length);

    if (Math.random() < 0.9) {
        do {
            colorIndex = Math.floor(Math.random() * colors.length);
        } while (colorIndex === textIndex);
    } else {
        colorIndex = textIndex;
    }

    display.textContent = colors[textIndex].name;
    display.style.color = colors[colorIndex].color;

    buttonsDiv.innerHTML = "";
    colors.forEach((c, i) => {
        const btn = document.createElement("button");
        btn.textContent = c.name;
        btn.onclick = () => {
            clearInterval(timeInterval);
            if (i === colorIndex) {
                const reward = rewards[Math.floor(Math.random() * rewards.length)];
                result.style.color = "lightgreen";
                result.textContent = "✔ Chính xác! " + reward;
                Swal.fire({
                    title: 'Chính xác!',
                    text: reward,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        newRound();
                    }
                });
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {y: 0.6},
                });
            } else {
                const punishment = punishments[Math.floor(Math.random() * punishments.length)];
                result.style.color = "red";
                result.textContent = "❌ Sai! Phạt: " + punishment;
                Swal.fire({
                    title: 'Sai! Phạt',
                    text: punishment,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        newRound();
                    }
                });
            }
        };
        buttonsDiv.appendChild(btn);
    });
}

startBtn.onclick = () => {
    stopBtn.style.display = "inline";
    if (!gameStarted) {
        // Bắt đầu lần đầu
        gameStarted = true;
        paused = false;
        newRound();
    } else if (paused) {
        paused = false;
        result.textContent = "▶ Game tiếp tục!";
    }
};

stopBtn.onclick = () => {
    paused = true;
    result.style.color = "yellow";
    result.textContent = "⏸ Game tạm dừng";
};
const instructionsDiv = document.getElementById("gameInstructions");
startBtn.onclick = () => {
    stopBtn.style.display = "inline";
    instructionsDiv.style.display = "none";

    if (!gameStarted) {
        gameStarted = true;
        paused = false;
        newRound();
    } else if (paused) {
        paused = false;
        result.textContent = "▶ Game tiếp tục!";
    }
};
