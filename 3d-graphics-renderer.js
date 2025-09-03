// 3D Graphics Renderer Project Details

export default {
    title: "3D Graphics Renderer",
    subtitle: "Advanced 3D graphics rendering engine using OpenGL with real-time lighting, vector mathematics, and interactive camera controls for educational visualization.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    description: "A sophisticated 3D graphics rendering engine built from scratch using modern OpenGL techniques. This project demonstrates advanced computer graphics concepts including shader programming, lighting models, texture mapping, and real-time rendering optimizations for educational and visualization purposes.",
    demoUrl: "https://graphics-demo.alexjohnson.dev",
    githubUrl: "https://github.com/alexjohnson/3d-graphics-renderer",
    
    technologies: [
        { name: "C++", icon: "fas fa-code" },
        { name: "OpenGL", icon: "fas fa-cube" },
        { name: "GLFW", icon: "fas fa-window-maximize" },
        { name: "GLM", icon: "fas fa-calculator" },
        { name: "GLSL", icon: "fas fa-paint-brush" },
        { name: "CMake", icon: "fas fa-tools" },
        { name: "Assimp", icon: "fas fa-file-import" },
        { name: "STB", icon: "fas fa-image" }
    ],
    
    features: [
        {
            icon: "fas fa-lightbulb",
            title: "Advanced Lighting Models",
            description: "Implementation of Phong, Blinn-Phong, and physically-based rendering (PBR) lighting models with multiple light sources."
        },
        {
            icon: "fas fa-cube",
            title: "3D Model Loading",
            description: "Support for popular 3D model formats (OBJ, FBX, GLTF) with automatic mesh optimization and material processing."
        },
        {
            icon: "fas fa-paint-brush",
            title: "Shader Programming",
            description: "Comprehensive shader system with vertex, fragment, and geometry shaders for advanced visual effects."
        },
        {
            icon: "fas fa-camera",
            title: "Interactive Camera System",
            description: "Flexible camera implementation with FPS-style controls, orbital camera, and smooth interpolation."
        },
        {
            icon: "fas fa-image",
            title: "Texture Mapping",
            description: "Advanced texture mapping techniques including normal mapping, parallax mapping, and cube mapping for reflections."
        },
        {
            icon: "fas fa-cogs",
            title: "Real-time Optimization",
            description: "Performance optimization techniques including frustum culling, level-of-detail (LOD), and efficient memory management."
        }
    ],
    
    architecture: [
        {
            title: "Rendering Pipeline",
            description: "Modern OpenGL rendering pipeline with efficient vertex and fragment processing.",
            points: [
                "Vertex Buffer Objects (VBO) and Vertex Array Objects (VAO)",
                "Instanced rendering for multiple object optimization",
                "Deferred rendering pipeline for complex lighting scenarios",
                "Shadow mapping implementation for realistic shadows",
                "Post-processing effects chain with bloom and tone mapping"
            ]
        },
        {
            title: "Mathematical Foundation",
            description: "Robust mathematical framework using GLM library for 3D transformations and calculations.",
            points: [
                "Matrix transformations for model, view, and projection",
                "Quaternion-based rotations for smooth animations",
                "Vector mathematics for lighting and collision detection",
                "Frustum and sphere intersection algorithms",
                "Bezier curves and spline interpolation for smooth motion"
            ]
        },
        {
            title: "Asset Management",
            description: "Efficient asset loading and management system for 3D models, textures, and shaders.",
            points: [
                "Assimp integration for 3D model import",
                "Texture loading with STB library support",
                "Shader compilation and linking with error handling",
                "Resource caching and memory pool allocation",
                "Hot-reloading of shaders for development workflow"
            ]
        }
    ],
    
    achievements: [
        {
            metric: "60 FPS",
            label: "Rendering Performance"
        },
        {
            metric: "10K+",
            label: "Triangles per Frame"
        },
        {
            metric: "100%",
            label: "GPU Utilization"
        },
        {
            metric: "<16ms",
            label: "Frame Time"
        }
    ]
};