const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const elementsToAnimate = document.querySelectorAll(
    '.about, .topabout, .topskills, .skill-name, .skill-bar, .project-button, .project-name, .project-about, .project-language, .project-language-button, .project-language, .topcontacts, .contacts, .copyright'
);

elementsToAnimate.forEach(el => {
    observer.observe(el);
});

//===================================================================================

document.querySelectorAll('.between0').forEach(container => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    container.appendChild(canvas);

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '0';

    let width, height, columns;
    const fontSize = 16;
    let drops = [];

    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%^&*()*&^</>%".split("");

    function resize() {
        width = canvas.width = container.offsetWidth;
        height = canvas.height = container.offsetHeight;
        columns = Math.floor(width / fontSize);
        drops = new Array(columns).fill(1);
    }

    function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, width, height);

    let gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, "transparent");
    gradient.addColorStop(0.2, "#00FFFF");
    gradient.addColorStop(0.8, "#ff60ff");
    gradient.addColorStop(1, "transparent");

    ctx.fillStyle = gradient; 
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = symbols[Math.floor(Math.random() * symbols.length)];
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}


    window.addEventListener('resize', resize);
    resize();
    setInterval(draw, 30);
});

//===================================================================================

(function() {
    document.querySelectorAll('.between1').forEach(container => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        let width, height, shapes;
        const shapeCount = 20;

        function resize() {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            initShapes();
        }

        class Shape {
            constructor() { this.init(); }
            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 30 + 15;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.015;
                this.type = Math.floor(Math.random() * 3); 
                this.offset = 3; 
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotationSpeed;
                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;
            }

            drawShape(context, size, type) {
                context.beginPath();
                if (type === 0) { 
                    context.strokeRect(-size / 2, -size / 2, size, size);
                } else if (type === 1) { 
                    const h = size * (Math.sqrt(3)/2);
                    context.moveTo(0, -h/2);
                    context.lineTo(size/2, h/2);
                    context.lineTo(-size/2, h/2);
                    context.closePath();
                    context.stroke();
                } else if (type === 2) { 
                    const s = size / 2;
                    context.moveTo(-s, 0); context.lineTo(s, 0);
                    context.moveTo(0, -s); context.lineTo(0, s);
                    context.stroke();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.lineWidth = 4;
                ctx.lineJoin = "round";

                ctx.strokeStyle = "#00cccc";
                ctx.save();
                ctx.translate(this.offset, this.offset);
                this.drawShape(ctx, this.size, this.type);
                ctx.restore();

                ctx.strokeStyle = "#c045c0";
                this.drawShape(ctx, this.size, this.type);

                ctx.restore();
            }
        }

        function initShapes() {
            shapes = Array.from({ length: shapeCount }, () => new Shape());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            shapes.forEach(s => {
                s.update();
                s.draw();
            });

            ctx.globalCompositeOperation = 'destination-in';
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, 'rgba(0,0,0,0)');
            gradient.addColorStop(0.25, 'rgba(0,0,0,1)');
            gradient.addColorStop(0.75, 'rgba(0,0,0,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    });
})();

//===================================================================================

(function() {
    document.querySelectorAll('.between2').forEach(container => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        let width, height, lines;
        const lineCount = 15;

        function resize() {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
            initLines();
        }

        class DataPoint {
            constructor(y) {
                this.y = y;
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.speed = Math.random() * 4 + 2;
                this.length = Math.random() * 60 + 20;
                this.color = Math.random() > 0.5 ? "#ff60ff" : "#00FFFF";
            }

            update() {
                this.x += this.speed;
                if (this.x > width) {
                    this.x = -this.length;
                    this.speed = Math.random() * 4 + 2;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.lineWidth = 2;
                ctx.lineCap = "round";
                const grad = ctx.createLinearGradient(this.x, 0, this.x + this.length, 0);
                grad.addColorStop(0, "transparent");
                grad.addColorStop(1, this.color);
                
                ctx.strokeStyle = grad;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x + this.length, this.y);
                ctx.stroke();
            }
        }

        function initLines() {
            lines = [];
            const step = height / (lineCount + 1);
            for (let i = 1; i <= lineCount; i++) {
                lines.push(new DataPoint(i * step));
                if (Math.random() > 0.5) lines.push(new DataPoint(i * step));
            }
        }

        function animate() {
            ctx.fillStyle = "rgba(5, 5, 5, 0.5)";
            ctx.fillRect(0, 0, width, height);

            lines.forEach(p => {
                p.update();
                p.draw();
            });

            ctx.save();
            ctx.globalCompositeOperation = 'destination-in';
            const gradMask = ctx.createLinearGradient(0, 0, 0, height);
            gradMask.addColorStop(0, 'transparent');
            gradMask.addColorStop(0.3, 'black');
            gradMask.addColorStop(0.7, 'black');
            gradMask.addColorStop(1, 'transparent');
            ctx.fillStyle = gradMask;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', resize);
        resize();
        animate();
    });
})();

//===================================================================================

(function() {
    document.querySelectorAll('.between3').forEach(container => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        let width, height, boxes = [];
        const gridSize = 50; 

        function resize() {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
        }

        class ProjectBox {
            constructor() {
                this.init();
            }

            init() {
                this.gridX = Math.floor(Math.random() * (width / gridSize));
                this.gridY = Math.floor(Math.random() * (height / gridSize));
                this.w = (Math.floor(Math.random() * 2) + 1) * gridSize;
                this.h = (Math.floor(Math.random() * 2) + 1) * gridSize;
                this.life = 0;
                this.maxLife = Math.random() * 200 + 150; 
                this.color = Math.random() > 0.5 ? "#ff60ff" : "#00FFFF";
                this.opacity = 0;
            }

            update() {
                this.life++;
                let progress = this.life / this.maxLife;
                this.opacity = Math.sin(progress * Math.PI) * 0.6; 

                if (this.life >= this.maxLife) this.init();
            }

            draw() {
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = Math.max(0, this.opacity);
                ctx.lineWidth = 1.5;
                
                const margin = 5;
                ctx.strokeRect(
                    this.gridX * gridSize + margin, 
                    this.gridY * gridSize + margin, 
                    this.w - margin * 2, 
                    this.h - margin * 2
                );
            }
        }

        function init() {
            boxes = Array.from({ length: 6 }, () => new ProjectBox());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
            for (let x = 0; x <= width; x += gridSize) {
                ctx.moveTo(x, 0); ctx.lineTo(x, height);
            }
            for (let y = 0; y <= height; y += gridSize) {
                ctx.moveTo(0, y); ctx.lineTo(width, y);
            }
            ctx.stroke();

            boxes.forEach(box => {
                box.update();
                box.draw();
            });

            applyMask();

            requestAnimationFrame(animate);
        }

        function applyMask() {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-in';
            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.25, 'rgba(0,0,0,1)');
            grad.addColorStop(0.75, 'rgba(0,0,0,1)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    });
})();

//===================================================================================

(function() {
    document.querySelectorAll('.between4').forEach(container => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        container.appendChild(canvas);

        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';

        let width, height, pulses = [];

        function resize() {
            width = canvas.width = container.offsetWidth;
            height = canvas.height = container.offsetHeight;
        }

        class Pulse {
            constructor() {
                this.r = -Math.random() * 200; 
                this.init();
            }

            init() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.maxR = Math.random() * 100 + 80; 
                this.speed = Math.random() * 0.6 + 0.4;
                this.color = Math.random() > 0.5 ? "#ff60ff" : "#00FFFF";
                this.opacity = 0;
            }

            update() {
                this.r += this.speed;

                if (this.r > 0) {
                    this.opacity = Math.max(0, 1 - (this.r / this.maxR));
                } else {
                    this.opacity = 0;
                }

                if (this.r >= this.maxR) {
                    this.r = -Math.random() * 300;
                    this.init();
                }
            }

            draw() {
                if (this.r <= 0 || this.opacity <= 0) return;

                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = this.opacity * 0.4;
                ctx.lineWidth = 1.5;
                ctx.stroke();

                ctx.beginPath();
                ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fill();
            }
        }

        function init() {
            pulses = Array.from({ length: 15 }, () => new Pulse());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            pulses.forEach(p => {
                p.update();
                p.draw();
            });

            applyMask();
            requestAnimationFrame(animate);
        }

        function applyMask() {
            ctx.save();
            ctx.globalCompositeOperation = 'destination-in';
            const grad = ctx.createLinearGradient(0, 0, 0, height);
            grad.addColorStop(0, 'rgba(0,0,0,0)');
            grad.addColorStop(0.25, 'rgba(0,0,0,1)');
            grad.addColorStop(0.75, 'rgba(0,0,0,1)');
            grad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }

        window.addEventListener('resize', resize);
        resize();
        init();
        animate();
    });
})();
