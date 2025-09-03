import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Zap } from "lucide-react";

interface Shape3D {
  vertices: number[][];
  faces: number[][];
  color: string;
}

export default function GraphicsDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [shape, setShape] = useState<'cube' | 'pyramid' | 'sphere'>('cube');
  const animationRef = useRef<number>();

  // 3D Shape definitions
  const shapes: Record<string, Shape3D> = {
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
      vertices: [], // Will be generated
      faces: [],   // Will be generated
      color: '#10b981'
    }
  };

  // Generate sphere vertices and faces
  const generateSphere = (radius = 1, segments = 16) => {
    const vertices: number[][] = [];
    const faces: number[][] = [];

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

    shapes.sphere.vertices = vertices;
    shapes.sphere.faces = faces;
  };

  // 3D transformation functions
  const rotateX = (point: number[], angle: number): number[] => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0],
      point[1] * cos - point[2] * sin,
      point[1] * sin + point[2] * cos
    ];
  };

  const rotateY = (point: number[], angle: number): number[] => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos + point[2] * sin,
      point[1],
      -point[0] * sin + point[2] * cos
    ];
  };

  const rotateZ = (point: number[], angle: number): number[] => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return [
      point[0] * cos - point[1] * sin,
      point[0] * sin + point[1] * cos,
      point[2]
    ];
  };

  const project = (point: number[], canvas: HTMLCanvasElement): [number, number] => {
    const distance = 5;
    const scale = 100;
    
    const projected = [
      (point[0] * distance) / (point[2] + distance) * scale + canvas.width / 2,
      (point[1] * distance) / (point[2] + distance) * scale + canvas.height / 2
    ];
    
    return [projected[0], projected[1]];
  };

  const drawShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#1f2937';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const currentShape = shapes[shape];
    
    // Transform vertices
    const transformedVertices = currentShape.vertices.map(vertex => {
      let point = [...vertex];
      point = rotateX(point, rotation.x);
      point = rotateY(point, rotation.y);
      point = rotateZ(point, rotation.z);
      return point;
    });

    // Draw faces
    currentShape.faces.forEach((face, faceIndex) => {
      const projectedVertices = face.map(vertexIndex => 
        project(transformedVertices[vertexIndex], canvas)
      );

      // Calculate face normal for backface culling (simplified)
      const center = face.reduce((acc, vertexIndex) => {
        const vertex = transformedVertices[vertexIndex];
        return [acc[0] + vertex[0], acc[1] + vertex[1], acc[2] + vertex[2]];
      }, [0, 0, 0]).map(sum => sum / face.length);

      if (center[2] > -2) { // Simple depth test
        ctx.beginPath();
        ctx.moveTo(projectedVertices[0][0], projectedVertices[0][1]);
        projectedVertices.slice(1).forEach(vertex => {
          ctx.lineTo(vertex[0], vertex[1]);
        });
        ctx.closePath();

        // Lighting calculation (simplified)
        const lightIntensity = Math.max(0.3, (center[2] + 3) / 4);
        const color = currentShape.color;
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        
        ctx.fillStyle = `rgba(${Math.floor(r * lightIntensity)}, ${Math.floor(g * lightIntensity)}, ${Math.floor(b * lightIntensity)}, 0.8)`;
        ctx.fill();
        
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    // Draw axes
    const axisLength = 2;
    const axes = [
      { start: [0, 0, 0], end: [axisLength, 0, 0], color: '#ef4444' }, // X - Red
      { start: [0, 0, 0], end: [0, axisLength, 0], color: '#10b981' }, // Y - Green
      { start: [0, 0, 0], end: [0, 0, axisLength], color: '#3b82f6' }  // Z - Blue
    ];

    axes.forEach(axis => {
      let start = rotateX([...axis.start], rotation.x);
      start = rotateY(start, rotation.y);
      start = rotateZ(start, rotation.z);
      
      let end = rotateX([...axis.end], rotation.x);
      end = rotateY(end, rotation.y);
      end = rotateZ(end, rotation.z);

      const projectedStart = project(start, canvas);
      const projectedEnd = project(end, canvas);

      ctx.beginPath();
      ctx.moveTo(projectedStart[0], projectedStart[1]);
      ctx.lineTo(projectedEnd[0], projectedEnd[1]);
      ctx.strokeStyle = axis.color;
      ctx.lineWidth = 3;
      ctx.stroke();
    });
  };

  const animate = () => {
    if (isAnimating) {
      setRotation(prev => ({
        x: prev.x + 0.01,
        y: prev.y + 0.02,
        z: prev.z + 0.005
      }));
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    generateSphere();
    drawShape();
  }, [rotation, shape]);

  useEffect(() => {
    if (isAnimating) {
      animate();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating]);

  const resetRotation = () => {
    setRotation({ x: 0, y: 0, z: 0 });
    setIsAnimating(false);
  };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">3D Graphics Renderer</h3>
          <p className="text-gray-600">OpenGL-inspired 3D rendering with vector mathematics</p>
        </div>

        {/* Shape Selection */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant={shape === 'cube' ? 'default' : 'outline'}
            onClick={() => setShape('cube')}
          >
            Cube
          </Button>
          <Button 
            variant={shape === 'pyramid' ? 'default' : 'outline'}
            onClick={() => setShape('pyramid')}
          >
            Pyramid
          </Button>
          <Button 
            variant={shape === 'sphere' ? 'default' : 'outline'}
            onClick={() => setShape('sphere')}
          >
            Sphere
          </Button>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant={isAnimating ? 'outline' : 'default'}
          >
            {isAnimating ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isAnimating ? 'Pause' : 'Animate'}
          </Button>
          <Button onClick={resetRotation} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {/* 3D Canvas */}
        <div className="bg-gray-900 rounded-lg p-4">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            className="mx-auto border border-gray-700 rounded"
            style={{ display: 'block' }}
          />
        </div>

        {/* Manual Controls */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <label className="block text-sm font-medium mb-2">X Rotation</label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.1"
              value={rotation.x}
              onChange={(e) => setRotation(prev => ({ ...prev, x: parseFloat(e.target.value) }))}
              className="w-full"
              disabled={isAnimating}
            />
            <span className="text-xs text-gray-500">{(rotation.x * 180 / Math.PI).toFixed(0)}°</span>
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-2">Y Rotation</label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.1"
              value={rotation.y}
              onChange={(e) => setRotation(prev => ({ ...prev, y: parseFloat(e.target.value) }))}
              className="w-full"
              disabled={isAnimating}
            />
            <span className="text-xs text-gray-500">{(rotation.y * 180 / Math.PI).toFixed(0)}°</span>
          </div>
          <div className="text-center">
            <label className="block text-sm font-medium mb-2">Z Rotation</label>
            <input
              type="range"
              min="0"
              max={Math.PI * 2}
              step="0.1"
              value={rotation.z}
              onChange={(e) => setRotation(prev => ({ ...prev, z: parseFloat(e.target.value) }))}
              className="w-full"
              disabled={isAnimating}
            />
            <span className="text-xs text-gray-500">{(rotation.z * 180 / Math.PI).toFixed(0)}°</span>
          </div>
        </div>

        {/* Technical Info */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Zap className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-800">Technical Implementation</h4>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <strong>Rendering Features:</strong>
              <ul className="mt-1 space-y-1">
                <li>• 3D to 2D projection</li>
                <li>• Matrix transformations</li>
                <li>• Backface culling</li>
                <li>• Simple lighting model</li>
              </ul>
            </div>
            <div>
              <strong>Vector Mathematics:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Rotation matrices (X, Y, Z)</li>
                <li>• Perspective projection</li>
                <li>• Real-time calculations</li>
                <li>• Coordinate transformations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}