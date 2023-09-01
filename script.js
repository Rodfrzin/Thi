const sonic = document.querySelector('.sonic');
const robot = document.querySelector('.robot');
const bat = document.querySelector('.bat');
let isJumping = false;
let isGameOver = false;

document.addEventListener('keydown', jump);

function jump(event) {
    if (isGameOver) return;

    if (event.keyCode === 32 && !isJumping) {
        isJumping = true;
        let position = 0;
        const jumpInterval = setInterval(() => {
            if (position >= 100) {
                clearInterval(jumpInterval);
                const fallInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(fallInterval);
                        isJumping = false;
                    } else {
                        position -= 5;
                        sonic.style.bottom = position + 'px';
                    }
                }, 20);
            } else {
                position += 5;
                sonic.style.bottom = position + 'px';
            }
        }, 20);
    }
}

function checkCollision() {
    const sonicTop = parseInt(getComputedStyle(sonic).bottom);
    const robotLeft = parseInt(getComputedStyle(robot).left);
    const robotWidth = parseInt(getComputedStyle(robot).width); // Largura do robô
    const robotHeight = parseInt(getComputedStyle(robot).height); // Altura do robô
    const batLeft = parseInt(getComputedStyle(bat).left);
    const batWidth = parseInt(getComputedStyle(bat).width); // Largura do morcego
    const batHeight = parseInt(getComputedStyle(bat).height); // Altura do morcego
    const batBottom = parseInt(getComputedStyle(bat).bottom);

    // Defina a área de colisão do robô
    const robotCollisionLeft = robotLeft + robotWidth / 4;
    const robotCollisionRight = robotLeft + (3 * robotWidth) / 4;

    // Defina a área de colisão do morcego
    const batCollisionLeft = batLeft;
    const batCollisionRight = batLeft + batWidth;
    const batCollisionTop = batBottom;
    const batCollisionBottom = batBottom + batHeight;

    if (
        (sonicTop <= 40 &&
            robotLeft <= 50 &&
            robotCollisionRight >= 0 &&
            robotCollisionLeft <= 50) ||
        (sonicTop <= 30 &&
            batCollisionRight >= 0 &&
            batCollisionLeft <= 50 &&
            batCollisionTop <= 50 &&
            batCollisionBottom >= 10)
    ) {
        // Colisão detectada
        gameOver();
    }
}

function gameOver() {
    isGameOver = true;
    alert('Game Over! Pressione F5 para jogar novamente.');
    // Pode adicionar outras ações de reinício aqui, como reiniciar a posição do Sonic, do robô e do morcego.
}

function moveRobot() {
    let robotPosition = parseInt(getComputedStyle(robot).left);
    if (robotPosition > -20) {
        robot.style.left = (robotPosition - 5) + 'px';
    } else {
        robot.style.left = '800px';
    }

    checkCollision();
}

function moveBat() {
    let batPosition = parseInt(getComputedStyle(bat).left);
    let batBottom = parseInt(getComputedStyle(bat).bottom);

    if (batPosition > -20) {
        bat.style.left = (batPosition - 3) + 'px';
    } else {
        bat.style.left = '800px';

        // Ajuste para garantir que o morcego apareça em alturas possíveis para o Sonic
        const randomHeight = Math.floor(Math.random() * 150) + 50; // Altura aleatória entre 50 e 200 pixels do chão
        bat.style.bottom = randomHeight + 'px';
    }

    checkCollision();
}

setInterval(moveRobot, 20);
setInterval(moveBat, 20);
