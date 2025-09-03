import GraphicsDemo from "../components/graphics-demo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function GraphicsDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href="/">
            <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            3D Graphics Renderer
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Academic project implementing advanced 3D graphics rendering using OpenGL concepts 
            with vector mathematics, lighting systems, and real-time rendering capabilities.
          </p>
        </div>

        <GraphicsDemo />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">OpenGL Implementation Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Core Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Real-time 3D transformation matrices</li>
                  <li>• Perspective projection calculations</li>
                  <li>• Backface culling optimization</li>
                  <li>• Dynamic lighting and shading</li>
                  <li>• Interactive camera controls</li>
                  <li>• Multiple primitive shapes</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Technical Stack</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• C++ with OpenGL 3.3+ core profile</li>
                  <li>• GLFW for window management</li>
                  <li>• GLM for vector mathematics</li>
                  <li>• Vertex and fragment shaders</li>
                  <li>• Buffer object management</li>
                  <li>• Modern OpenGL pipeline</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Mathematics Implementation</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Transformation Matrix</h4>
                    <p className="text-sm text-gray-600">
                      Model-View-Projection matrix multiplication for 3D to 2D coordinate transformation.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Lighting Calculations</h4>
                    <p className="text-sm text-gray-600">
                      Phong reflection model with ambient, diffuse, and specular lighting components.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Vector Operations</h4>
                    <p className="text-sm text-gray-600">
                      Cross products for normals, dot products for angles, and quaternions for rotations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Project Achievements</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Performance Optimization</h4>
                  <p className="text-sm text-blue-700">
                    Achieved 60+ FPS rendering with efficient vertex buffer management and 
                    frustum culling techniques.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Academic Recognition</h4>
                  <p className="text-sm text-green-700">
                    Received excellent grade for advanced computer graphics course project, 
                    demonstrating mastery of 3D mathematics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}