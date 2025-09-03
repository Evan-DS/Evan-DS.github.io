import AlgorithmDemo from "../components/algorithm-demo";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function AlgorithmDemoPage() {
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
            Algorithm Optimization Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interactive demonstration of sorting algorithms implemented in C++ and Java. 
            This project showcases algorithm optimization, performance analysis, and complexity comparisons.
          </p>
        </div>

        <AlgorithmDemo />

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Technical Implementation</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Multiple sorting algorithm implementations</li>
                  <li>• Real-time visualization of sorting process</li>
                  <li>• Performance benchmarking and analysis</li>
                  <li>• Step-by-step algorithm execution tracking</li>
                  <li>• Complexity analysis (Time & Space)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Technologies</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• C++ for core algorithm implementation</li>
                  <li>• Java for comparative analysis</li>
                  <li>• Data structure optimization</li>
                  <li>• Performance profiling tools</li>
                  <li>• React/TypeScript for visualization</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">Algorithm Complexity Analysis</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-3">Algorithm</th>
                      <th className="text-left p-3">Best Case</th>
                      <th className="text-left p-3">Average Case</th>
                      <th className="text-left p-3">Worst Case</th>
                      <th className="text-left p-3">Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Bubble Sort</td>
                      <td className="p-3">O(n)</td>
                      <td className="p-3">O(n²)</td>
                      <td className="p-3">O(n²)</td>
                      <td className="p-3">O(1)</td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="p-3 font-medium">Quick Sort</td>
                      <td className="p-3">O(n log n)</td>
                      <td className="p-3">O(n log n)</td>
                      <td className="p-3">O(n²)</td>
                      <td className="p-3">O(log n)</td>
                    </tr>
                    <tr className="border-t">
                      <td className="p-3 font-medium">Merge Sort</td>
                      <td className="p-3">O(n log n)</td>
                      <td className="p-3">O(n log n)</td>
                      <td className="p-3">O(n log n)</td>
                      <td className="p-3">O(n)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}