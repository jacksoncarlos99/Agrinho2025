let farmerX = 100;
let farmerY = 360;
let speed = 5;
let velocityY = 1;
let gravity = 0.5;
let groundY = 390;
let isJumping = false;
let cameraY = 0;
let platforms = [];
let showInstructions = true;

function setup() {
  createCanvas(700, 550);

  // Plataformas fixas [horizontal, vertical, largura, altura]
  platforms = [
    [100, 250, 60, 15],
    [250, 110, 40, 15],
    [580, 50, 35, 15],
    [370, -30, 10, 15],
    [80, -50, 30, 15],
    [650, -100,  10, 15],
    [80, -200, 30, 15],
    [650, -250,  10, 15],
    [370, -400, 5, 15],
    [480, -540, 500, 50],    
  ];

  textFont('Arial');
}

function draw() {
  drawBackgroundSky(color(10, 24, 61), color(89, 178, 255));
  drawHouse();
  drawGround();
  drawPlatforms();

  handleMovement();
  applyPhysics();
  checkPlatformCollisions();
  handleCamera();
  checkFall();

  drawFarmer(farmerX, farmerY - cameraY);

  if (showInstructions) {
    displayInstructions();
  }
}

// Tecla para pular
function keyPressed() {
  if (key === ' ' && !isJumping) {
    velocityY = -12;
    isJumping = true;
  }
  showInstructions = false;
}

// Movimento esquerdo/direito
function handleMovement() {
  if (keyIsDown(65)) {
    farmerX -= speed;
  }
  if (keyIsDown(68)) {
    farmerX += speed;
  }
}

// Física do pulo e gravidade
function applyPhysics() {
  farmerY += velocityY;
  velocityY += gravity;
}

// Checa colisões com plataformas ou chão
function checkPlatformCollisions() {
  let onPlatform = false;
  for (let p of platforms) {
    if (
      farmerX + 15 > p[0] && farmerX - 15 < p[0] + p[2] &&
      farmerY + 45 >= p[1] - 5 && farmerY + 45 <= p[1] + 3 &&
      velocityY >= 0
    ) {
      farmerY = p[1] - 45;
      velocityY = 0;
      isJumping = false;
      onPlatform = true;
      break;
    }
  }

  if (!onPlatform && farmerY > groundY - 45) {
    farmerY = groundY - 45;
    velocityY = 0;
    isJumping = false;
  }
}

// Câmera segue jogador
function handleCamera() {
  if (farmerY - cameraY < 200) {
    cameraY = farmerY - 200;
  }
}

// Se jogador cair da tela
function checkFall() {
  if (farmerY - cameraY > height + 100) {
    resetGame();
  }
}

// Reinicia o jogo
function resetGame() {
  farmerX = 100;
  farmerY = 360;
  velocityY = 0;
  isJumping = false;
  cameraY = 0;
}

// Desenha o personagem
function drawFarmer(x, y) {
  fill('#FFCC99');
  ellipse(x, y, 30, 30);
  fill('#996633');
  rect(x - 15, y - 20, 30, 10);
  rect(x - 10, y - 30, 20, 10);
  fill('blue');
  rect(x - 10, y + 15, 20, 30);
  fill('#FFCC99');
  rect(x - 20, y + 15, 10, 25);
  rect(x + 10, y + 15, 10, 25);
  fill('brown');
  rect(x - 10, y + 45, 8, 20);
  rect(x + 2, y + 45, 8, 20);
}

// Cria fundo em degradê com map()
function drawBackgroundSky(grad1, grad2) {
  for (let i = 0; i < height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let gradColor = lerpColor(grad1, grad2, inter);
    stroke(gradColor);
    line(0, i, width, i);
  }
}

// Desenha chão
function drawGround() {
  fill('#4CAF50');
  rect(0, groundY - cameraY, width, 10);
  fill('#5A4036');
  rect(0, groundY + 10 - cameraY, width, 150);
}

// Desenha plataformas
function drawPlatforms() {
  for (let p of platforms) {
    fill('#5A4036');
    rect(p[0], p[1] + 7 - cameraY, p[2], 8);
    fill('#4CAF50');
    rect(p[0], p[1] - cameraY, p[2], 7);
    stroke('#81C784');
    strokeWeight(2);
    line(p[0], p[1] - cameraY, p[0] + p[2], p[1] - cameraY);
    noStroke();
  }
}

// Desenha casa do fundo
function drawHouse() {
  noStroke();
  fill('red');
  triangle(580, 330 - cameraY, 680, 330 - cameraY, 630, 280 - cameraY);
  fill('#FFEB3B');
  rect(580, 330 - cameraY, 100, 70);
  fill('#00BCD4');
  rect(590, 340 - cameraY, 15, 15);
  rect(650, 340 - cameraY, 15, 15);
  fill('#795548');
  rect(618, 365 - cameraY, 20, 70);
}

// Mostra instruções no início
function displayInstructions() {
  fill(255, 220);
  rect(50, 50, 600, 100, 10);
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  text("Use A/D para mover. Espaço para pular. Suba pelas plataformas!\nPressione qualquer tecla para começar.", width / 2, 100);
}
