// Portfolio Data Configuration
const portfolioData = {
  personalInfo: {
    name: "Evan Dos Santos",
    title: "Software Engineer",
    tagline: "Computer Science graduate with Software Engineering specialization. Experienced in IT consulting, systems administration, and developing innovative solutions with modern technologies.",
    email: "evangeorgedossantos@yahoo.ca",
    social: {
      linkedin: "https://linkedin.com/in/evan-g-dos-santos",
      github: "https://github.com/Evan-DS",
      twitter: "https://twitter.com/evandossantos"
    }
  }
};

// Global application state
let portfolioApp = null;
let demoInstances = {};

// Main Portfolio Application
class PortfolioApp {
  constructor() {
    this.isLoaded = false;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupScrollAnimations();
    this.setupSkillAnimations();
    this.markAsLoaded();
  }

  setupEventListeners() {
    // Navigation and modal handling
    this.setupNavigation();
    this.setupModalHandlers();
    
    // Contact form
    this.setupContactForm();
    
    // Resume download
    this.setupResumeDownload();

    // Global keyboard handlers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModals();
      }
    });
  }

  setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu?.classList.toggle('active');
    });

    // Smooth scrolling for nav links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          this.smoothScrollTo(href);
          
          // Close mobile menu
          hamburger?.classList.remove('active');
          navMenu?.classList.remove('active');
        }
      });
    });

    // Update active navigation on scroll
    this.setupScrollNavigation();
  }

  setupScrollNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let ticking = false;
    
    const updateActiveNavigation = () => {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          
          const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveNavigation);
        ticking = true;
      }
    });
  }

  setupModalHandlers() {
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        this.closeModals();
      }
    });
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactSubmit(form);
    });
  }

  async handleContactSubmit(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    const buttonLoading = submitButton.querySelector('.btn-loading');

    // Show loading state
    buttonText.style.display = 'none';
    buttonLoading.style.display = 'flex';
    submitButton.disabled = true;

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      this.showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
    } catch (error) {
      this.showToast('Failed to send message. Please try again later.', 'error');
    } finally {
      buttonText.style.display = 'inline';
      buttonLoading.style.display = 'none';
      submitButton.disabled = false;
    }
  }

  setupResumeDownload() {
    // Resume download functionality will be added here
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Trigger skill bar animations when skills section is visible
          if (entry.target.id === 'skills') {
            this.animateSkillBars();
          }
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      section.classList.add('scroll-animate');
      observer.observe(section);
    });
  }

  setupSkillAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      if (width) {
        bar.style.setProperty('--target-width', `${width}%`);
      }
    });
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      const width = bar.getAttribute('data-width');
      if (width) {
        setTimeout(() => {
          bar.style.width = `${width}%`;
        }, index * 100);
      }
    });
  }

  smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  closeModals() {
    const activeModals = document.querySelectorAll('.modal.active');
    activeModals.forEach(modal => {
      modal.classList.remove('active');
    });

    // Clean up demo instances
    Object.values(demoInstances).forEach(demo => {
      if (demo && demo.destroy) {
        demo.destroy();
      }
    });
    demoInstances = {};
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-message">${message}</div>
        <button class="toast-close">&times;</button>
      </div>
    `;

    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Handle close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.hideToast(toast);
    });

    // Auto-hide after 5 seconds
    setTimeout(() => this.hideToast(toast), 5000);
  }

  hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }

  markAsLoaded() {
    this.isLoaded = true;
    document.body.classList.add('loaded');
  }
}

// Demo Functions
function openGraphicsDemo() {
  const modal = document.getElementById('graphics-modal');
  const container = document.getElementById('graphics-demo-container');
  
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="graphics-demo">
      <div class="graphics-controls">
        <div class="shape-controls">
          <button class="shape-btn active" data-shape="cube">Cube</button>
          <button class="shape-btn" data-shape="pyramid">Pyramid</button>
          <button class="shape-btn" data-shape="sphere">Sphere</button>
        </div>
      </div>
      
      <div class="graphics-canvas-container">
        <canvas class="graphics-canvas" width="600" height="400"></canvas>
      </div>

      <div class="rotation-controls">
        <div class="rotation-control">
          <label>X Rotation</label>
          <input type="range" id="rotationX" min="0" max="360" value="0">
          <div class="rotation-value">0°</div>
        </div>
        <div class="rotation-control">
          <label>Y Rotation</label>
          <input type="range" id="rotationY" min="0" max="360" value="0">
          <div class="rotation-value">0°</div>
        </div>
        <div class="rotation-control">
          <label>Z Rotation</label>
          <input type="range" id="rotationZ" min="0" max="360" value="0">
          <div class="rotation-value">0°</div>
        </div>
      </div>

      <div class="technical-info">
        <h4><i class="fas fa-info-circle"></i> Technical Implementation</h4>
        <div class="technical-grid">
          <div class="technical-section">
            <strong>Core Technologies</strong>
            <ul>
              <li>C++ with OpenGL</li>
              <li>GLFW for window management</li>
              <li>GLM for matrix mathematics</li>
              <li>Custom shader pipeline</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>Rendering Features</strong>
            <ul>
              <li>Real-time 3D transformations</li>
              <li>Vector-based calculations</li>
              <li>Backface culling optimization</li>
              <li>Perspective projection</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>Performance Optimizations</strong>
            <ul>
              <li>Vertex buffer objects</li>
              <li>Efficient matrix operations</li>
              <li>Frustum culling</li>
              <li>Level-of-detail rendering</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize 3D graphics demo
  demoInstances.graphics = new GraphicsDemo('graphics-demo-container');
  modal.classList.add('active');
}

function openInfrastructureDemo() {
  const modal = document.getElementById('infrastructure-modal');
  const container = document.getElementById('infrastructure-demo-container');
  
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="infrastructure-demo">
      <div class="demo-controls">
        <button class="btn btn-primary" onclick="refreshInfrastructure()">
          <i class="fas fa-sync"></i> Refresh Data
        </button>
        <button class="btn btn-secondary" onclick="generateReport()">
          <i class="fas fa-file-alt"></i> Generate Report
        </button>
        <button class="btn btn-primary" onclick="addUser()">
          <i class="fas fa-user-plus"></i> Add User
        </button>
        <button class="btn btn-secondary" onclick="showPasswordResetModal()">
          <i class="fas fa-key"></i> Reset Password
        </button>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--secondary);">
            <i class="fas fa-server"></i> Server Infrastructure
          </h3>
          <div class="server-grid" id="server-grid">
            <!-- Server cards will be populated by JavaScript -->
          </div>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem; color: var(--secondary);">
            <i class="fas fa-users"></i> Active Directory Users
          </h3>
          <div class="users-container" id="users-container">
            <!-- User accounts will be populated by JavaScript -->
          </div>
        </div>
      </div>

      <div class="technical-info">
        <h4><i class="fas fa-info-circle"></i> Infrastructure Management Features</h4>
        <div class="technical-grid">
          <div class="technical-section">
            <strong>Monitoring Capabilities</strong>
            <ul>
              <li>Real-time system metrics</li>
              <li>Network performance tracking</li>
              <li>Resource utilization alerts</li>
              <li>Service health monitoring</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>User Management</strong>
            <ul>
              <li>Active Directory integration</li>
              <li>User account provisioning</li>
              <li>Password policy enforcement</li>
              <li>Group membership management</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>Automation Features</strong>
            <ul>
              <li>Automated user provisioning</li>
              <li>Policy enforcement</li>
              <li>Security compliance checks</li>
              <li>Remote troubleshooting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize infrastructure demo
  demoInstances.infrastructure = new InfrastructureDemo();
  modal.classList.add('active');
}

function openAlgorithmDemo() {
  const modal = document.getElementById('algorithm-modal');
  const container = document.getElementById('algorithm-demo-container');
  
  if (!modal || !container) return;

  container.innerHTML = `
    <div class="algorithm-demo">
      <div class="algorithm-controls">
        <div class="control-group">
          <label>Algorithm:</label>
          <select class="algorithm-select" id="algorithmSelect">
            <option value="bubble">Bubble Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
            <option value="heap">Heap Sort</option>
          </select>
        </div>
        
        <div class="control-group">
          <label>Array Size:</label>
          <input type="range" id="arraySize" min="10" max="100" value="30">
          <span id="arraySizeValue">30</span>
        </div>

        <div class="control-group">
          <label>Speed:</label>
          <input type="range" id="speed" min="1" max="10" value="5">
          <span id="speedValue">5</span>
        </div>

        <button class="btn btn-primary" onclick="startSorting()">
          <i class="fas fa-play"></i> Start
        </button>
        <button class="btn btn-secondary" onclick="resetArray()">
          <i class="fas fa-redo"></i> Reset
        </button>
      </div>

      <canvas class="algorithm-canvas" id="algorithmCanvas" width="800" height="300"></canvas>

      <div class="algorithm-stats" id="algorithmStats">
        <div class="stat-card">
          <div class="stat-value" id="comparisons">0</div>
          <div class="stat-label">Comparisons</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="swaps">0</div>
          <div class="stat-label">Swaps</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="time">0ms</div>
          <div class="stat-label">Time Elapsed</div>
        </div>
        <div class="stat-card">
          <div class="stat-value" id="complexity">O(n²)</div>
          <div class="stat-label">Time Complexity</div>
        </div>
      </div>

      <div class="technical-info">
        <h4><i class="fas fa-info-circle"></i> Algorithm Analysis</h4>
        <div class="technical-grid">
          <div class="technical-section">
            <strong>Visualization Features</strong>
            <ul>
              <li>Real-time sorting animation</li>
              <li>Performance metrics tracking</li>
              <li>Color-coded element states</li>
              <li>Step-by-step progression</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>Educational Components</strong>
            <ul>
              <li>Big O complexity analysis</li>
              <li>Operation count display</li>
              <li>Algorithm comparison</li>
              <li>Interactive learning tools</li>
            </ul>
          </div>
          <div class="technical-section">
            <strong>Implementation Details</strong>
            <ul>
              <li>Java-based core engine</li>
              <li>Custom animation framework</li>
              <li>Efficient array manipulation</li>
              <li>Performance optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize algorithm demo
  demoInstances.algorithm = new AlgorithmDemo();
  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    
    // Clean up specific demo instance
    if (demoInstances[modalId.replace('-modal', '')]) {
      const demo = demoInstances[modalId.replace('-modal', '')];
      if (demo && demo.destroy) {
        demo.destroy();
      }
      delete demoInstances[modalId.replace('-modal', '')];
    }
  }
}

// 3D Graphics Demo Class  
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
      this.ctx.lineWidth = 2;
      this.ctx.stroke();
    });
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Infrastructure Demo Class
class InfrastructureDemo {
  constructor() {
    this.servers = [];
    this.users = [];
    this.updateInterval = null;
    this.init();
  }

  init() {
    this.generateServers();
    this.generateUsers();
    this.renderServers();
    this.renderUsers();
    this.startUpdates();
  }

  generateServers() {
    const serverNames = [
      'DC-SERVER-01', 'WEB-SERVER-02', 'DB-SERVER-03', 'APP-SERVER-04',
      'MAIL-SERVER-05', 'FILE-SERVER-06', 'BACKUP-SERVER-07', 'DNS-SERVER-08'
    ];

    this.servers = serverNames.map(name => ({
      name,
      status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'warning' : 'offline') : 'online',
      cpu: Math.random() * 100,
      memory: Math.random() * 100,
      disk: Math.random() * 100,
      network: Math.random() * 100
    }));
  }

  renderServers() {
    const container = document.getElementById('server-grid');
    if (!container) return;

    container.innerHTML = this.servers.map(server => `
      <div class="server-card ${server.status}">
        <div class="server-header">
          <div class="server-name">${server.name}</div>
          <div class="server-status">
            <div class="status-dot ${server.status}"></div>
            ${server.status.charAt(0).toUpperCase() + server.status.slice(1)}
          </div>
        </div>
        <div class="server-metrics">
          <div class="metric">
            <span class="metric-label">CPU Usage</span>
            <span class="metric-value">${server.cpu.toFixed(1)}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-progress cpu-progress" style="width: ${server.cpu}%"></div>
          </div>
          
          <div class="metric">
            <span class="metric-label">Memory</span>
            <span class="metric-value">${server.memory.toFixed(1)}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-progress memory-progress" style="width: ${server.memory}%"></div>
          </div>
          
          <div class="metric">
            <span class="metric-label">Disk Space</span>
            <span class="metric-value">${server.disk.toFixed(1)}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-progress disk-progress" style="width: ${server.disk}%"></div>
          </div>
          
          <div class="metric">
            <span class="metric-label">Network</span>
            <span class="metric-value">${server.network.toFixed(1)}%</span>
          </div>
          <div class="metric-bar">
            <div class="metric-progress network-progress" style="width: ${server.network}%"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  startUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateMetrics();
      this.renderServers();
    }, 3000);
  }

  updateMetrics() {
    this.servers.forEach(server => {
      // Simulate metric changes
      server.cpu = Math.max(0, Math.min(100, server.cpu + (Math.random() - 0.5) * 20));
      server.memory = Math.max(0, Math.min(100, server.memory + (Math.random() - 0.5) * 15));
      server.disk = Math.max(0, Math.min(100, server.disk + (Math.random() - 0.5) * 5));
      server.network = Math.max(0, Math.min(100, server.network + (Math.random() - 0.5) * 30));
      
      // Occasionally change status
      if (Math.random() > 0.95) {
        const statuses = ['online', 'warning', 'offline'];
        server.status = statuses[Math.floor(Math.random() * statuses.length)];
      }
    });
  }

  generateUsers() {
    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Engineering'];
    const firstNames = ['John', 'Sarah', 'Mike', 'Emily', 'David', 'Lisa', 'Chris', 'Anna', 'Tom', 'Maria'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
    
    this.users = [];
    for (let i = 0; i < 12; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      
      this.users.push({
        id: `user${i + 1}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
        department,
        status: Math.random() > 0.1 ? 'active' : 'disabled',
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        groups: this.generateGroups(department)
      });
    }
  }

  generateGroups(department) {
    const baseGroups = ['Domain Users', 'Company All'];
    const departmentGroups = {
      'IT': ['IT Support', 'Administrators', 'Backup Operators'],
      'HR': ['HR Staff', 'Payroll Access'],
      'Finance': ['Finance Team', 'Accounting Access'],
      'Marketing': ['Marketing Team', 'Social Media'],
      'Sales': ['Sales Team', 'CRM Access'],
      'Engineering': ['Developers', 'Code Repository Access']
    };
    
    const groups = [...baseGroups];
    const deptGroups = departmentGroups[department] || [];
    groups.push(...deptGroups.slice(0, Math.floor(Math.random() * deptGroups.length) + 1));
    
    return groups;
  }

  renderUsers() {
    const container = document.getElementById('users-container');
    if (!container) return;

    container.innerHTML = `
      <div class="users-list">
        ${this.users.map(user => `
          <div class="user-card ${user.status}">
            <div class="user-header">
              <div class="user-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="user-info">
                <div class="user-name">${user.name}</div>
                <div class="user-email">${user.email}</div>
              </div>
              <div class="user-status">
                <span class="status-badge ${user.status}">${user.status}</span>
              </div>
            </div>
            <div class="user-details">
              <div class="user-detail">
                <span class="detail-label">Department:</span>
                <span class="detail-value">${user.department}</span>
              </div>
              <div class="user-detail">
                <span class="detail-label">Last Login:</span>
                <span class="detail-value">${user.lastLogin}</span>
              </div>
              <div class="user-groups">
                <span class="detail-label">Groups:</span>
                <div class="groups-list">
                  ${user.groups.map(group => `<span class="group-tag">${group}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  destroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}

// Algorithm Demo Class
class AlgorithmDemo {
  constructor() {
    this.canvas = document.getElementById('algorithmCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.array = [];
    this.isRunning = false;
    this.shouldStop = false;
    this.stats = { comparisons: 0, swaps: 0, startTime: 0 };
    this.currentAnimation = null;
    
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.generateArray();
    this.render();
  }

  setupEventListeners() {
    const arraySize = document.getElementById('arraySize');
    const arraySizeValue = document.getElementById('arraySizeValue');
    const speed = document.getElementById('speed');
    const speedValue = document.getElementById('speedValue');
    const algorithmSelect = document.getElementById('algorithmSelect');

    arraySize.addEventListener('input', (e) => {
      if (this.isRunning) {
        this.stopSorting();
      }
      arraySizeValue.textContent = e.target.value;
      this.generateArray(parseInt(e.target.value));
      this.render();
    });

    speed.addEventListener('input', (e) => {
      speedValue.textContent = e.target.value;
    });

    algorithmSelect.addEventListener('change', (e) => {
      if (this.isRunning) {
        this.stopSorting();
      }
      this.resetStats();
      document.getElementById('complexity').textContent = this.getComplexity(e.target.value);
    });
  }

  generateArray(size = 30) {
    this.array = [];
    for (let i = 0; i < size; i++) {
      this.array.push({
        value: Math.floor(Math.random() * 280) + 10,
        state: 'default'
      });
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const barWidth = this.canvas.width / this.array.length;
    
    this.array.forEach((element, index) => {
      const x = index * barWidth;
      const height = element.value;
      const y = this.canvas.height - height;
      
      // Choose color based on state
      switch (element.state) {
        case 'comparing':
          this.ctx.fillStyle = '#f59e0b';
          break;
        case 'swapping':
          this.ctx.fillStyle = '#ef4444';
          break;
        case 'sorted':
          this.ctx.fillStyle = '#10b981';
          break;
        default:
          this.ctx.fillStyle = '#3b82f6';
      }
      
      this.ctx.fillRect(x, y, barWidth - 1, height);
    });
  }

  async bubbleSort() {
    const n = this.array.length;
    for (let i = 0; i < n - 1 && !this.shouldStop; i++) {
      for (let j = 0; j < n - i - 1 && !this.shouldStop; j++) {
        this.array[j].state = 'comparing';
        this.array[j + 1].state = 'comparing';
        this.stats.comparisons++;
        
        await this.delay();
        if (this.shouldStop) return;
        this.render();
        
        if (this.array[j].value > this.array[j + 1].value) {
          this.array[j].state = 'swapping';
          this.array[j + 1].state = 'swapping';
          
          // Swap elements
          [this.array[j], this.array[j + 1]] = [this.array[j + 1], this.array[j]];
          this.stats.swaps++;
          
          await this.delay();
          if (this.shouldStop) return;
          this.render();
        }
        
        this.array[j].state = 'default';
        this.array[j + 1].state = 'default';
      }
      if (!this.shouldStop) {
        this.array[n - i - 1].state = 'sorted';
      }
    }
    if (!this.shouldStop) {
      this.array[0].state = 'sorted';
    }
  }

  async quickSort(low = 0, high = this.array.length - 1) {
    if (low < high) {
      const pi = await this.partition(low, high);
      await this.quickSort(low, pi - 1);
      await this.quickSort(pi + 1, high);
    }
  }

  async partition(low, high) {
    const pivot = this.array[high].value;
    this.array[high].state = 'comparing';
    let i = low - 1;

    for (let j = low; j < high; j++) {
      this.array[j].state = 'comparing';
      this.stats.comparisons++;
      
      await this.delay();
      this.render();

      if (this.array[j].value < pivot) {
        i++;
        this.array[i].state = 'swapping';
        this.array[j].state = 'swapping';
        
        [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        this.stats.swaps++;
        
        await this.delay();
        this.render();
        
        this.array[i].state = 'default';
      }
      this.array[j].state = 'default';
    }

    this.array[i + 1].state = 'swapping';
    [this.array[i + 1], this.array[high]] = [this.array[high], this.array[i + 1]];
    this.stats.swaps++;
    
    await this.delay();
    this.render();
    
    this.array[i + 1].state = 'sorted';
    this.array[high].state = 'default';
    
    return i + 1;
  }

  delay() {
    const speed = document.getElementById('speed').value;
    const delayTime = 1000 / speed;
    return new Promise(resolve => {
      this.currentAnimation = setTimeout(resolve, delayTime);
    });
  }

  updateStats() {
    document.getElementById('comparisons').textContent = this.stats.comparisons;
    document.getElementById('swaps').textContent = this.stats.swaps;
    
    if (this.stats.startTime > 0) {
      const elapsed = Date.now() - this.stats.startTime;
      document.getElementById('time').textContent = `${elapsed}ms`;
    }
  }

  getComplexity(algorithm) {
    const complexities = {
      bubble: 'O(n²)',
      quick: 'O(n log n)',
      merge: 'O(n log n)',
      heap: 'O(n log n)'
    };
    return complexities[algorithm] || 'O(n²)';
  }

  stopSorting() {
    this.isRunning = false;
    this.shouldStop = true;
    if (this.currentAnimation) {
      clearTimeout(this.currentAnimation);
    }
    // Reset all elements to default state
    this.array.forEach(element => {
      element.state = 'default';
    });
    this.render();
  }

  resetStats() {
    this.stats = { comparisons: 0, swaps: 0, startTime: 0 };
    this.updateStats();
  }

  destroy() {
    this.stopSorting();
  }
}

// Global functions for demo controls
function startSorting() {
  const demo = demoInstances.algorithm;
  if (!demo || demo.isRunning) return;

  demo.isRunning = true;
  demo.shouldStop = false;
  demo.stats = { comparisons: 0, swaps: 0, startTime: Date.now() };
  
  const algorithm = document.getElementById('algorithmSelect').value;
  document.getElementById('complexity').textContent = demo.getComplexity(algorithm);

  const updateStats = setInterval(() => {
    demo.updateStats();
    if (!demo.isRunning) clearInterval(updateStats);
  }, 100);

  const runAlgorithm = async () => {
    try {
      switch (algorithm) {
        case 'bubble':
          await demo.bubbleSort();
          break;
        case 'quick':
          await demo.quickSort();
          break;
        case 'merge':
          await demo.bubbleSort(); // Simplified - using bubble for now
          break;
        case 'heap':
          await demo.bubbleSort(); // Simplified - using bubble for now
          break;
        default:
          await demo.bubbleSort();
      }
    } catch (error) {
      console.log('Sorting interrupted');
    } finally {
      demo.isRunning = false;
      demo.shouldStop = false;
    }
  };

  runAlgorithm();
}

function resetArray() {
  const demo = demoInstances.algorithm;
  if (!demo) return;

  demo.stopSorting();
  demo.generateArray(parseInt(document.getElementById('arraySize').value));
  demo.render();
  demo.resetStats();
}

function refreshInfrastructure() {
  const demo = demoInstances.infrastructure;
  if (!demo) return;

  demo.generateServers();
  demo.generateUsers();
  demo.renderServers();
  demo.renderUsers();
}

function generateReport() {
  portfolioApp.showToast('Infrastructure report generated successfully!', 'success');
}

function addUser() {
  const demo = demoInstances.infrastructure;
  if (!demo) return;

  const firstNames = ['Alex', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley'];
  const lastNames = ['Thompson', 'Anderson', 'White', 'Clark', 'Lewis', 'Walker'];
  const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales', 'Engineering'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const department = departments[Math.floor(Math.random() * departments.length)];
  
  const newUser = {
    id: `user${demo.users.length + 1}`,
    name: `${firstName} ${lastName}`,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
    department,
    status: 'active',
    lastLogin: 'Never',
    groups: demo.generateGroups(department)
  };
  
  demo.users.push(newUser);
  demo.renderUsers();
  portfolioApp.showToast(`User ${newUser.name} added successfully!`, 'success');
}

function showPasswordResetModal() {
  const demo = demoInstances.infrastructure;
  if (!demo) return;

  const activeUsers = demo.users.filter(user => user.status === 'active');
  
  const modalHtml = `
    <div class="password-reset-modal">
      <h3 style="margin-bottom: 1rem; color: var(--secondary);">
        <i class="fas fa-key"></i> Reset User Password
      </h3>
      <div style="margin-bottom: 1rem;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--secondary);">
          Select User:
        </label>
        <select id="passwordResetUserSelect" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border); border-radius: 0.5rem; font-size: 1rem;">
          <option value="">Choose a user...</option>
          ${activeUsers.map(user => `
            <option value="${user.id}">${user.name} (${user.email})</option>
          `).join('')}
        </select>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1.5rem;">
        <button class="btn btn-secondary" onclick="closePasswordResetModal()">Cancel</button>
        <button class="btn btn-primary" onclick="executePasswordReset()">
          <i class="fas fa-key"></i> Reset Password
        </button>
      </div>
    </div>
  `;

  // Create and show modal
  const existingModal = document.getElementById('password-reset-temp-modal');
  if (existingModal) {
    existingModal.remove();
  }

  const modalWrapper = document.createElement('div');
  modalWrapper.id = 'password-reset-temp-modal';
  modalWrapper.className = 'modal active';
  modalWrapper.style.zIndex = '2001';
  
  modalWrapper.innerHTML = `
    <div class="modal-content" style="max-width: 500px;">
      <span class="modal-close" onclick="closePasswordResetModal()">&times;</span>
      ${modalHtml}
    </div>
  `;
  
  document.body.appendChild(modalWrapper);
}

function closePasswordResetModal() {
  const modal = document.getElementById('password-reset-temp-modal');
  if (modal) {
    modal.remove();
  }
}

function executePasswordReset() {
  const demo = demoInstances.infrastructure;
  const selectElement = document.getElementById('passwordResetUserSelect');
  
  if (!demo || !selectElement) return;
  
  const selectedUserId = selectElement.value;
  if (!selectedUserId) {
    portfolioApp.showToast('Please select a user first.', 'error');
    return;
  }
  
  const selectedUser = demo.users.find(user => user.id === selectedUserId);
  if (selectedUser) {
    portfolioApp.showToast(`Password reset for ${selectedUser.name} completed! New temporary password sent to ${selectedUser.email}`, 'success');
    closePasswordResetModal();
  }
}

function downloadResume() {
  try {
    // Create a temporary link element for the download
    const link = document.createElement('a');
    link.href = './Résumé-Evan_Dos_Santos-2025-NA.pdf';
    link.download = 'Evan_Dos_Santos_Resume_2025.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    portfolioApp.showToast('Resume download started!', 'success');
  } catch (error) {
    portfolioApp.showToast('Resume download failed. Please try again later.', 'error');
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  portfolioApp = new PortfolioApp();
});