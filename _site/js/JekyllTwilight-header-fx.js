(function() {
    // Variables
    let width, height, largeHeader, canvas, ctx, points, target;
    let animateHeader = true;

    // Initialize the animation
    function init() {
        try {
            initHeader();
            initAnimation();
            addListeners();
        } catch (error) {
            console.error('Initialization failed:', error);
        }
    }

    // Set up the header and canvas
    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById('home-slider');
        if (!largeHeader) {
            throw new Error('Element with ID "home-slider" not found.');
        }
        largeHeader.style.height = `${height}px`;

        canvas = document.getElementById('animation');
        if (!canvas) {
            throw new Error('Element with ID "animation" not found.');
        }
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // Create points
        points = createPoints(width, height);

        // Find the 5 closest points for each point
        points.forEach(p1 => {
            p1.closest = findClosestPoints(p1, points);
        });

        // Assign a circle to each point
        points.forEach(p => {
            p.circle = new Circle(p, 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        });
    }

    // Create points
    function createPoints(width, height) {
        const points = [];
        for (let x = 0; x < width; x += width / 20) {
            for (let y = 0; y < height; y += height / 20) {
                const px = x + Math.random() * (width / 20);
                const py = y + Math.random() * (height / 20);
                points.push({ x: px, originX: px, y: py, originY: py, active: 0, circle: null, closest: [] });
            }
        }
        return points;
    }

    // Find the 5 closest points for a given point
    function findClosestPoints(p1, points) {
        const closest = [];
        points.forEach(p2 => {
            if (p1 !== p2) {
                const distance = getDistance(p1, p2);
                if (closest.length < 5) {
                    closest.push({ point: p2, distance });
                } else {
                    const farthest = closest.reduce((max, curr) => (curr.distance > max.distance ? curr : max));
                    if (distance < farthest.distance) {
                        closest.splice(closest.indexOf(farthest), 1, { point: p2, distance });
                    }
                }
            }
        });
        return closest.map(c => c.point);
    }

    // Event listeners
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    // Handle mouse movement
    function mouseMove(e) {
        target.x = e.pageX || e.clientX + document.documentElement.scrollLeft;
        target.y = e.pageY || e.clientY + document.documentElement.scrollTop;
    }

    // Handle scroll events
    function scrollCheck() {
        animateHeader = document.body.scrollTop <= height;
    }

    // Handle window resize
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = `${height}px`;
        canvas.width = width;
        canvas.height = height;
    }

    // Initialize animation
    function initAnimation() {
        animate();
        points.forEach(p => shiftPoint(p));
    }

    // Main animation loop
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            points.forEach(p => {
                const distance = getDistance(target, p);
                if (distance < 4000) {
                    p.active = 0.3;
                    p.circle.active = 0.6;
                } else if (distance < 20000) {
                    p.active = 0.1;
                    p.circle.active = 0.3;
                } else if (distance < 40000) {
                    p.active = 0.02;
                    p.circle.active = 0.1;
                } else {
                    p.active = 0;
                    p.circle.active = 0;
                }
                drawLines(p);
                p.circle.draw();
            });
        }
        requestAnimationFrame(animate);
    }

    // Shift a point randomly
    function shiftPoint(p) {
        const duration = 1 + Math.random();
        const startX = p.x;
        const startY = p.y;
        const endX = p.originX - 50 + Math.random() * 100;
        const endY = p.originY - 50 + Math.random() * 100;
        const startTime = performance.now();

        function update() {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);
            p.x = easeInOut(progress, startX, endX - startX, 1);
            p.y = easeInOut(progress, startY, endY - startY, 1);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                shiftPoint(p);
            }
        }
        update();
    }

    // Draw lines between points
    function drawLines(p) {
        if (!p.active) return;
        p.closest.forEach(closest => {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(closest.x, closest.y);
            ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
            ctx.stroke();
        });
    }

    // Circle class
    function Circle(pos, rad, color) {
        this.pos = pos;
        this.radius = rad;
        this.color = color;
        this.active = 0;

        this.draw = function() {
            if (!this.active) return;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = `rgba(255,0,0,${this.active})`;
            ctx.fill();
        };
    }

    // Easing function
    function easeInOut(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Calculate distance between two points
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Start the script
    init();
})();
