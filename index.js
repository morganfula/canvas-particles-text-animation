const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particleArray = [];

// Handle Mouse
const mouse = {
	x: null,
	y: null,
	radius: 150,
};

window.addEventListener('mousemove', e => {
	mouse.x = e.x;
	mouse.y = e.y;
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('M', 0, 30);
const data = ctx.getImageData(0, 0, 100, 100);

class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = 3;
		this.baseX = this.x;
		this.baseY = this.y;
		this.density = Math.random() * 30 + 1;
	}

	draw() {
		ctx.fillStyle = 'blue';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}

	udpate() {
		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < 100) {
			this.size = 30;
		} else {
			this.size = 3;
		}
	}
}

const init = () => {
	particleArray = [];
	for (let i = 0; i < 1000; i++) {
		let x = Math.random() * canvas.width;
		let y = Math.random() * canvas.height;
		particleArray.push(new Particle(x, y));
	}
};
init();

const animate = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particleArray.length; i++) {
		particleArray[i].draw();
		particleArray[i].udpate();
	}
	requestAnimationFrame(animate);
};
animate();
