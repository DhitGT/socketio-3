class Bullet {
    constructor(x, y, radius, speed, angle, player,color,who) {
      this.x = x;
      this.y = y;
      this.sz = radius;
      this.angle = angle;
      this.radius = radius;
      this.speed = speed;
      this.damage = player.damage;
      this.history = []; 
      this.color = color;
      this.who = who
    }
  
  
    update() {
      if (this.speed < this.speed + 3) {
        this.speed += 0.4;
      }
      if (this.angle[0]) {
        this.y -= this.speed;
      } else if (this.angle[1]) {
        this.y += this.speed;
      }
      if (this.angle[2]) {
        this.x -= this.speed;
      } else if (this.angle[3]) {
        this.x += this.speed;
    }
    
    if(!this.angle[1] && !this.angle[2] && !this.angle[3] && !this.angle[4]){
        this.x += this.speed;
      }
      
  
      this.history.push({ x: this.x, y: this.y });
  
  
      if (this.history.length > 4) {
        this.history.shift(); 
      }
    }
  
    draw(c) {
      c.fillStyle = this.color;
  
      for (let i = 0; i < this.history.length; i++) {
        const position = this.history[i];
        const trailRadius = this.radius - (i * 0.8); 
        c.globalAlpha = 0.5 - (i * 0.08);
        c.beginPath();
        c.arc(position.x, position.y, trailRadius, 0, Math.PI * 2);
        c.fill();
        c.closePath();
      }
      c.globalAlpha = 1.0;
  
      
  
  
      c.beginPath();
      c.fillStyle = "white";
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.shadowColor = "rgba(255, 255, 25, 1)"; 
      c.shadowBlur = 10; 
      c.fill();
      c.shadowBlur = 0;
      c.closePath();
    }
    
    drawLight(c){
      c.shadowColor = "rgba(255, 255, 25, 1)"; 
      c.shadowBlur = 10; 
    }
  }

const socket = io("192.168.5.220:3000");

const ox = document.getElementById("ox");
const oy = document.getElementById("oy");
const oz = document.getElementById("oz");

const canvas = document.getElementById("mycanvas");
const c = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let playerX = 0;
let playerY = 0;
let speed = 5;
let fire = false;
let colldown = false;
let isReload = false;
let rateOfFire = 500;
let reloadDelay = 200;
let bullets = [];

let buttonData = {
  l: false,
  u: false,
  d: false,
  r: false,
  fire: false,
};

function reload() {
  isReload = true;
  if (isReload) {
    setTimeout(() => {
      mag = magMax;
      isReload = false;
    }, reloadDelay);
  }
}

function fcolldown() {
  if (!colldown) {
    colldown = true;
    setTimeout(() => {
      colldown = false;
    }, rateOfFire);
  }
}

function shoot() {
  if (!colldown) {
    if (buttonData.fire) {
        fcolldown()
      bullets.push(
        new Bullet(
          playerX + 50 / 2,
          playerY + 50 / 2,
          4,
          8,
          [buttonData.u, buttonData.d, buttonData.l, buttonData.r],
          "orange",
          "player"
        )
      );
      console.log(bullets);
    }
  }
}

const RoomIdTxt = document.getElementById("RoomId");
function generateRandomRoomId() {
  return Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
}

const roomId = 22334;
RoomIdTxt.innerHTML = roomId;
// socket.on('btn',v =>{
//     ox.innerHTML = v.BtnX
//     oy.innerHTML = v.BtnY
//     oz.innerHTML = v.BtnZ
//     console.log(v);
// })

socket.emit("joinRoom", roomId);

socket.on("btn", (data) => {
  // Ensure the data received is from the correct room
  if (data.roomId === roomId) {
    buttonData.l = data.buttons.BtnL;
    buttonData.r = data.buttons.BtnR;
    buttonData.d = data.buttons.BtnD;
    buttonData.u = data.buttons.BtnU;
    buttonData.fire = data.buttons.BtnFire;
    // ox.innerHTML = data.buttons.BtnX;
    // oy.innerHTML = data.buttons.BtnY;
    // oz.innerHTML = data.buttons.BtnZ;
    // console.log(data.buttons);
  }
});

function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "yellow";
  c.fillRect(playerX, playerY, 50, 50);
  bullets.forEach((e) => {
    e.draw(c);
  });
}

function update() {
  shoot();
  if (buttonData.l) {
    playerX -= speed;
  }
  if (buttonData.r) {
    playerX += speed;
  }
  if (buttonData.u) {
    playerY -= speed;
  }
  if (buttonData.d) {
    playerY += speed;
  }
  bullets.forEach((e) => {
    e.update();
  });
}

function loop() {
  update();
  draw();
}

setInterval(loop, 1000 / 30);
