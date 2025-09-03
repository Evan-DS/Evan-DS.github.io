import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, RotateCcw } from "lucide-react";

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

export default function AlgorithmDemo() {
  const [array, setArray] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [algorithm, setAlgorithm] = useState<'bubble' | 'quick' | 'merge'>('bubble');

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setCurrentStep(0);
    setSteps([]);
    setIsRunning(false);
  };

  // Bubble Sort Algorithm with step tracking
  const bubbleSort = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const workingArray = [...arr];
    const n = workingArray.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Add step showing comparison
        steps.push({
          array: [...workingArray],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx)
        });

        if (workingArray[j] > workingArray[j + 1]) {
          // Add step showing swap
          [workingArray[j], workingArray[j + 1]] = [workingArray[j + 1], workingArray[j]];
          steps.push({
            array: [...workingArray],
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx)
          });
        }
      }
    }

    // Final sorted state
    steps.push({
      array: [...workingArray],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, idx) => idx)
    });

    return steps;
  };

  // Quick Sort Algorithm (simplified for visualization)
  const quickSort = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const workingArray = [...arr];

    const partition = (low: number, high: number): number => {
      const pivot = workingArray[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          array: [...workingArray],
          comparing: [j, high],
          swapping: [],
          sorted: []
        });

        if (workingArray[j] < pivot) {
          i++;
          [workingArray[i], workingArray[j]] = [workingArray[j], workingArray[i]];
          steps.push({
            array: [...workingArray],
            comparing: [],
            swapping: [i, j],
            sorted: []
          });
        }
      }
      [workingArray[i + 1], workingArray[high]] = [workingArray[high], workingArray[i + 1]];
      return i + 1;
    };

    const quickSortHelper = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    quickSortHelper(0, workingArray.length - 1);
    return steps;
  };

  const startSorting = () => {
    let sortSteps: SortStep[] = [];
    
    switch (algorithm) {
      case 'bubble':
        sortSteps = bubbleSort(array);
        break;
      case 'quick':
        sortSteps = quickSort(array);
        break;
      case 'merge':
        // Simplified merge sort for demo
        sortSteps = bubbleSort(array); // Using bubble sort as placeholder
        break;
    }
    
    setSteps(sortSteps);
    setCurrentStep(0);
    setIsRunning(true);
  };

  // Animation effect
  useEffect(() => {
    if (isRunning && currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (currentStep >= steps.length - 1) {
      setIsRunning(false);
    }
  }, [isRunning, currentStep, steps.length]);

  // Initialize with random array
  useEffect(() => {
    generateArray();
  }, []);

  const getBarColor = (index: number, step: SortStep) => {
    if (step.sorted.includes(index)) return 'bg-green-500';
    if (step.comparing.includes(index)) return 'bg-yellow-500';
    if (step.swapping.includes(index)) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const currentStepData = steps[currentStep] || { array, comparing: [], swapping: [], sorted: [] };

  return (
    <Card className="p-6 max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Algorithm Visualization Demo</h3>
          <p className="text-gray-600">Interactive demonstration of sorting algorithms</p>
        </div>

        {/* Algorithm Selection */}
        <div className="flex justify-center space-x-4">
          <Button 
            variant={algorithm === 'bubble' ? 'default' : 'outline'}
            onClick={() => setAlgorithm('bubble')}
            disabled={isRunning}
          >
            Bubble Sort
          </Button>
          <Button 
            variant={algorithm === 'quick' ? 'default' : 'outline'}
            onClick={() => setAlgorithm('quick')}
            disabled={isRunning}
          >
            Quick Sort
          </Button>
          <Button 
            variant={algorithm === 'merge' ? 'default' : 'outline'}
            onClick={() => setAlgorithm('merge')}
            disabled={isRunning}
          >
            Merge Sort
          </Button>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          <Button onClick={generateArray} disabled={isRunning}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Array
          </Button>
          <Button onClick={startSorting} disabled={isRunning || array.length === 0}>
            <Play className="w-4 h-4 mr-2" />
            Start Sorting
          </Button>
          <Button 
            onClick={() => setIsRunning(false)} 
            disabled={!isRunning}
            variant="outline"
          >
            <Pause className="w-4 h-4 mr-2" />
            Pause
          </Button>
        </div>

        {/* Visualization */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-end justify-center space-x-1 h-64">
            {currentStepData.array.map((value, index) => (
              <div
                key={index}
                className={`transition-all duration-300 ${getBarColor(index, currentStepData)} rounded-t`}
                style={{
                  height: `${(value / 100) * 200}px`,
                  width: '30px',
                  minHeight: '20px'
                }}
              >
                <div className="text-xs text-white text-center pt-1 font-bold">
                  {value}
                </div>
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>Sorted</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-2xl font-bold text-blue-600">{currentStep}</div>
            <div className="text-sm text-gray-600">Steps</div>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <div className="text-2xl font-bold text-green-600">{array.length}</div>
            <div className="text-sm text-gray-600">Elements</div>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <div className="text-2xl font-bold text-purple-600">{algorithm.toUpperCase()}</div>
            <div className="text-sm text-gray-600">Algorithm</div>
          </div>
        </div>
      </div>
    </Card>
  );
}