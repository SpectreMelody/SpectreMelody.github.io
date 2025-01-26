const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const text = "SpectreMelody";
const fontSize = 48;
const flashlightSize = 170;

var w, h, mouseX, mouseY, loopId, id, particles;

var options = {
    particleColor: "rgba(227, 230, 224)",
    lineColor: "rgba(107, 132, 144)",
    particleAmount: 75,
    defaultRadius: 1,
    variantRadius: 1,
    defaultSpeed: 0.5,
    variantSpeed: 1,
    linkRadius: 100
};

var rgb = options.lineColor.match(/\d+/g);

document.addEventListener("DOMContentLoaded", init);

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    w = canvas.width;
    h = canvas.height;

    mouseX = 0;
    mouseY = 0;

    initialiseElements();
    startAnimation();

    canvas.addEventListener("mousemove", mousePosition);
}

function initialiseElements() {
    particles = [];
    for (var i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
    }
}

function startAnimation() {
    loopId = requestAnimationFrame(animationLoop);
}

function animationLoop() {
    ctx.clearRect(0,0,w,h);
    drawScene();

    id = requestAnimationFrame(animationLoop);
}

function drawScene() {
    drawLine();
    drawParticle();
    drawPlainText();
    drawText();
}

function mousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function drawPlainText()
{
    ctx.font = `${fontSize}px 'Orbitron', sans-serif`;
    ctx.fillStyle = "white";
    
    const textWidth = ctx.measureText(text).width;
    ctx.fillText(
        text,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2 + fontSize / 2
    );
}

function drawText() {
    ctx.save();

    ctx.beginPath();
    ctx.arc(mouseX, mouseY, flashlightSize / 2, 0, 2 * Math.PI);
    ctx.clip();

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const textWidth = ctx.measureText(text).width;
    const gradient = ctx.createLinearGradient(
        canvas.width / 2 - textWidth / 2, 
        canvas.height / 2, 
        canvas.width / 2 + textWidth / 2, 
        canvas.height / 2
    );
    
    gradient.addColorStop(0, 'rgba(255, 69, 0, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 165, 0, 1)');
    gradient.addColorStop(1, 'rgba(255, 255, 0, 1)');

    ctx.font = `${fontSize}px 'Orbitron', sans-serif`;
    ctx.fillStyle = gradient;

    ctx.fillText(
        text,
        canvas.width / 2 - textWidth / 2,
        canvas.height / 2 + fontSize / 2
    );

    ctx.restore();
}

function drawParticle() {
    for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

function drawLine() {
    for (var i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}

function linkPoints(point, hubs) {
    for (var i = 0; i < hubs.length; i++) {
        var distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
        var opacity = 1 - distance / options.linkRadius;
        if (opacity > 0) {
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+opacity+')';
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(hubs[i].x, hubs[i].y);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function checkDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

Particle = function() {
    var _this = this;

    _this.x = Math.random() * w;
    _this.y = Math.random() * h;
    _this.color = options.particleColor;
    _this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    _this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
    _this.directionAngle = Math.floor(Math.random() * 360);
    _this.vector = {
        x: Math.cos(_this.directionAngle) * _this.speed,
        y: Math.sin(_this.directionAngle) * _this.speed
    }

    _this.update = function() {
        _this.border();

        var distanceToCursor = checkDistance(_this.x, _this.y, mouseX, mouseY);

        if (distanceToCursor < 100) {
            var angleToCursor = Math.atan2(mouseY - _this.y, mouseX - _this.x);
            _this.vector.x = Math.cos(angleToCursor + Math.PI) * _this.speed;
            _this.vector.y = Math.sin(angleToCursor + Math.PI) * _this.speed;
        }

        _this.x += _this.vector.x;
        _this.y += _this.vector.y;
    }

    _this.border = function() {
        if (_this.x >= w || _this.x <= 0) {
            _this.vector.x *= -1;
        }
        if (_this.y >= h || _this.y <= 0) {
            _this.vector.y *= -1;
        }
        if (_this.x > w) _this.x = w;
        if (_this.y > h) _this.y = h;
        if (_this.x < 0) _this.x = 0;
        if (_this.y < 0) _this.y = 0;
    }

    _this.draw = function() {
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = _this.color;
        ctx.fill();
    }
}