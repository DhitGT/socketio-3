const socket = io('192.168.5.220:3000');

const ox = document.getElementById('ox')
const oy = document.getElementById('oy')
const oz = document.getElementById('oz')

const canvas = document.getElementById('mycanvas')
const c = canvas.getContext('2d')
canvas.width = 600
canvas.height = 400

let playerX = 0;
let playerY = 0;
let speed = 5;

let buttonData = {
    l : false,
    u : false,
    d : false,
    r : false, 
};

const RoomIdTxt = document.getElementById('RoomId')
function generateRandomRoomId() {
    return Math.floor(10000 + Math.random() * 90000); // Generates a random number between 10000 and 99999
}

const roomId = 22334;
RoomIdTxt.innerHTML = roomId
// socket.on('btn',v =>{
//     ox.innerHTML = v.BtnX
//     oy.innerHTML = v.BtnY
//     oz.innerHTML = v.BtnZ
//     console.log(v);
// })

socket.emit('joinRoom', roomId);

socket.on('btn', data => {
    // Ensure the data received is from the correct room
    if (data.roomId === roomId) {
        buttonData.l = data.buttons.BtnL
        buttonData.r = data.buttons.BtnR
        buttonData.d = data.buttons.BtnD
        buttonData.u = data.buttons.BtnU
        // ox.innerHTML = data.buttons.BtnX;
        // oy.innerHTML = data.buttons.BtnY;
        // oz.innerHTML = data.buttons.BtnZ;
        // console.log(data.buttons);
    }
});


function draw(){
    c.clearRect(0,0,canvas.width,canvas.height)
    c.fillStyle = 'yellow'
    c.fillRect(playerX,playerY,50,50)
}

function update(){
    console.log(buttonData)
    if(buttonData.l){
        playerX -= speed
    }
    if(buttonData.r){
        playerX += speed
    }
    if(buttonData.u){
        playerY -= speed
    }
    if(buttonData.d){
        playerY += speed
    }
}

function loop(){
    update()
    draw()
}


setInterval(loop,1000/30)