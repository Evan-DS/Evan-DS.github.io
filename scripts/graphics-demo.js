// 3D Graphics Demo
class GraphicsDemo {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.canvas = null;
    this.ctx = null;
    this.isAnimating = false;
    this.rotation = { x: 0, y: 0, z: 0 };
    this.currentShape = 'cube';
    this.animationId = null;
    
    this.shapes = {
      cube: {
        vertices: [
          [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
          [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ],
        faces: [
          [0, 1, 2, 3], [4, 7, 6, 5], [0, 4, 5, 1],
          [2, 6, 7, 3], [0, 3, 7, 4], [1, 5, 6, 2]
        ],
        color: '#3b82f6'
      },
      pyramid: {
        vertices: [
          [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1],
          [0, 1, 0]
        ],
        faces: [
          [0, 1, 2, 3], [0, 4, 1], [1, 4, 2], [2, 4, 3], [3, 4, 0]
        ],
        color: '#ef4444'
      },
      sphere: {
        vertices: [],
        faces: [],
        color: '#10b981'
      }
    };
    
    this.init();
  }

  init() {
    this.generateSphere();
    this.createDemo();
  }

  generateSphere(radius = 1, segments = 16) {
    const vertices = [];
    const faces = [];

    // Generate vertices
    for (let i = 0; i <= segments; i++) {
      const theta = (i * Math.PI) / segments;
      for (let j = 0; j <= segments; j++) {
        const phi = (j * 2 * Math.PI) / segments;
        
        const x = radius * Math.sin(theta) * Math.cos(phi);
        const y = radius * Math.cos(theta);
        const z = radius * Math.sin(theta) * Math.sin(phi);
        
        vertices.push([x, y, z]);
      }
    }

    // Generate faces
    for (let i = 0; i < segments; i++) {
      for (let j = 0; j < segments; j++) {
        const first = i * (segments + 1) + j;
        const second = first + segments + 1;
        
        faces.push([first, second, first + 1]);
        faces.push([second, second + 1, first + 1]);
      }
    }

    this.shapes.sphere.vertices = vertices;
    this.shapes.sphere.faces = faces;
  }

  createDemo() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="graphics-demo">
        <div class="graphics-controls">
          <div class="shape-controls">
            <button class="shape-btn active" data-shape="cube">Cube</button>
            <button class="shape-btn" data-shape="pyramid">Pyramid</button>
            <button class="shape-btn" data-shape="sphere">Sphere</button>
          </div>
          
          <div class="animation-controls">
            <button class="btn btn-primary" id="animate-btn">
              <i class="fas fa-play"></i> Animate
            </button>
            <button class="btn btn-secondary" id="reset-btn">
              <i class="fas fa-undo"></i> Reset
            </button>
          </div>
        </div>

        <div class="graphics-canvas-container">
          <canvas class="graphics-canvas" width="600" height="400"></canvas>
        </div>

        <div class="rotation-controls">
          <div class="rotation-control">
            <label>X Rotation</label>
            <input type="range" id="rotation-x" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
          <div class="rotation-control">
            <label>Y Rotation</label>
            <input type="range" id="rotation-y" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
          <div class="rotation-control">
            <label>Z Rotation</label>
            <input type="range" id="rotation-z" min="0" max="${Math.PI * 2}" step="0.1" value="0">
            <div class="rotation-value">0°</div>
          </div>
        </div>

        <div class="technical-info">
          <h4><i class="fas fa-bolt"></i> Technical Implementation</h4>
          <div class="technical-grid">
            <div class="technical-section">
              <strong>Rendering Features:</strong>
              <ul>
                <li>• 3D to 2D projection</li>
                <li>• Matrix transformations</li>
                <li>• Backface culling</li>
                <li>• Simple lighting model</li>
              </ul>
            </div>
            <div class="technical-section">
              <strong>Vector Mathematics:</strong>
              <ul>
                <li>• Rotation matrices (X, Y, Z)</li>
                <li>• Perspective projection</li>
                <li>• Real-time calculations</li>
                <li>• Coordinate transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupCanvas();
    this.setupEventListeners();
    this.drawShape();
  }

  setupCanvas() {
    this.canvas = this.container.querySelector('.graphics-canvas');
    this.ctx = this.canvas?.getContext('2d');
  }

  setupEventListeners() {
    // Shape selection
    this.container.querySelectorAll('.shape-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.shape-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentShape = btn.dataset.shape;
        this.drawShape();
      });
    });

    // Animation controls
    const animateBtn = this.container.querySelector('#animate-btn');
    const resetBtn = this.container.querySelector('#reset-btn');

    animateBtn?.addEventListener('click', () => {
      this.toggleAnimation();
    });

    resetBtn?.addEventListener('click', () => {
      this.resetRotation();
    });

    // Rotation controls
    ['x', 'y', 'z'].forEach(axis => {
      const slider = this.container.querySelector(`#rotation-${axis}`);
      const valueDisplay = slider?.nextElementSibling;

      slider?.addEventListener('input', (e) => {
        this.rotation[axis] = parseFloat(e.target.value);
        const degrees = Math.round((this.rotation[axis] * 180) / Math.PI);
        if (valueDisplay) valueDisplay.textContent = `${degrees}°`;
        if (!this.isAnimating) this.drawShape();
      });
    });
  }

  toggleAnimation() {
    const animateBtn = this.container.querySelector('#animate-btn');
    const icon = animateBtn?.querySelector('i');
    
    this.isAnimating = !this.isAnimating;
    
    if (this.isAnimating) {
      animateBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
      this.animate();
    } else {
      animateBtn.innerHTML = '<i class="fas fa-play"></i> Animate';
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
  }

  animate() {
    if (!this.isAnimating) return;

    this.rotation.x += 0.01;
    this.rotation.y += 0.02;
    this.rotation.z += 0.005;

    this.updateSliders();
    this.drawShape();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateSliders() {
    ['x', 'y', 'z'].forEach(axis => {
      const slider = this.container.querySelector(`#rotation-${axis}`);
      const valueDisplay = slider?.nextElementSibling;
      
      if (slider) {
        slider.value = this.rotation[axis];
        const degrees = Math.round((this.rotation[axis] * 180) / Math.PI);
        if (valueDisplay) valueDisplay.textContent = `${degrees}°`;
      }
    });
  }

  resetRotation() {
    this.rotation = { x: 0, y: 0, z: 0 };
    this.isAnimating = false;
    
    const animateBtn = this.container.querySelector('#animate-btn');
    animateBtn.innerHTML = '<i class="fas fa-play"></i> Animate';
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    this.updateSliders();
    this.drawShape();
  }

  // 3D transformation functions
  rotateX(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0],
      point[1] * cos - point[2] * sin,
      point[1] * sin + point[2] * cos
    ];
  }

  rotateY(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos + point[2] * sin,
      point[1],
      -point[0] * sin + point[2] * cos
    ];
  }

  rotateZ(point, angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos - point[1] * sin,
      point[0] * sin + point[1] * cos,
      point[2]
    ];
  }

  project(point) {
    const distance = 5;
    const scale = 100;
    
    const projected = [
      (point[0] * distance) / (point[2] + distance) * scale + this.canvas.width / 2,
      (point[1] * distance) / (point[2] + distance) * scale + this.canvas.height / 2
    ];
    
    return projected;
  }

  drawShape() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.fillStyle = '#1f2937';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    const currentShapeData = this.shapes[this.currentShape];
    
    // Transform vertices
    const transformedVertices = currentShapeData.vertices.map(vertex => {
      let point = [...vertex];
      point = this.rotateX(point, this.rotation.x);
      point = this.rotateY(point, this.rotation.y);
      point = this.rotateZ(point, this.rotation.z);
      return point;
    });

    // Draw faces
    currentShapeData.faces.forEach(face => {
      const projectedVertices = face.map(vertexIndex => 
        this.project(transformedVertices[vertexIndex])
      );

      // Calculate face center for depth testing
      const center = face.reduce((acc, vertexIndex) => {
        const vertex = transformedVertices[vertexIndex];
        return [acc[0] + vertex[0], acc[1] + vertex[1], acc[2] + vertex[2]];
      }, [0, 0, 0]).map(sum => sum / face.length);

      if (center[2] > -2) { // Simple depth test
        this.ctx.beginPath();
        this.ctx.moveTo(projectedVertices[0][0], projectedVertices[0][1]);
        projectedVertices.slice(1).forEach(vertex => {
          this.ctx.lineTo(vertex[0], vertex[1]);
        });
        this.ctx.closePath();

        // Simple lighting
        const lightIntensity = Math.max(0.3, (center[2] + 3) / 4);
        const color = currentShapeData.color;
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        this.ctx.fillStyle = `rgba(${Math.floor(r * lightIntensity)}, ${Math.floor(g * lightIntensity)}, ${Math.floor(b * lightIntensity)}, 0.8)`;
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#94a3b8';
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
      }
    });

    // Draw coordinate axes
    this.drawAxes(transformedVertices);
  }

  drawAxes(transformedVertices) {
    const axisLength = 2;
    const axes = [
      { start: [0, 0, 0], end: [axisLength, 0, 0], color: '#ef4444' }, // X - Red
      { start: [0, 0, 0], end: [0, axisLength, 0], color: '#10b981' }, // Y - Green
      { start: [0, 0, 0], end: [0, 0, axisLength], color: '#3b82f6' }  // Z - Blue
    ];

    axes.forEach(axis => {
      let start = this.rotateX([...axis.start], this.rotation.x);
      start = this.rotateY(start, this.rotation.y);
      start = this.rotateZ(start, this.rotation.z);
      
      let end = this.rotateX([...axis.end], this.rotation.x);
      end = this.rotateY(end, this.rotation.y);
      end = this.rotateZ(end, this.rotation.z);

      const projectedStart = this.project(start);
      const projectedEnd = this.project(end);

      this.ctx.beginPath();
      this.ctx.moveTo(projectedStart[0], projectedStart[1]);
      this.ctx.lineTo(projectedEnd[0], projectedEnd[1]);
      this.ctx.strokeStyle = axis.color;
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
    });
  }
}

// Modal functions for project demos
function openGraphicsDemo() {
  const modal = document.getElementById('graphics-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  
  // Initialize graphics demo
  new GraphicsDemo('graphics-demo-container');
  
  // Setup modal close
  setupModalClose(modal);
}

function openAlgorithmDemo() {
  const modal = document.getElementById('algorithm-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  setupModalClose(modal);
}

function openEcommerceDemo() {
  const modal = document.getElementById('ecommerce-modal');
  modal.classList.add('active');
  modal.querySelector('.modal-content').classList.add('animate-modal');
  setupModalClose(modal);
}

function setupModalClose(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  
  const closeModal = () => {
    modal.classList.remove('active');
  };
  
  closeBtn.onclick = closeModal;
  
  modal.onclick = (e) => {
    if (e.target === modal) {
      closeModal();
    }
  };
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// Make functions globally available
window.openGraphicsDemo = openGraphicsDemo;
window.openAlgorithmDemo = openAlgorithmDemo;
window.openEcommerceDemo = openEcommerceDemo;
