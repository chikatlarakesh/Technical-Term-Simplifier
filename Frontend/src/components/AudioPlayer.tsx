import { FC, useState } from 'react';
import { Volume2, Play, Pause, SkipForward, SkipBack, StepBack, StepForward } from 'lucide-react';

const AudioPlayer: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const duration = 125; // example duration in seconds
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center">
          {/* Currently Playing */}
          <div className="flex items-center mb-3 sm:mb-0 sm:w-1/4">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Volume2 size={20} className="text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Currently playing
              </h3>
              <p className="text-xs text-gray-500">
                Neural Networks Explained
              </p>
            </div>
          </div>
          
          {/* Player Controls */}
          <div className="flex-1 flex flex-col items-center">
            {/* Controls */}
            <div className="flex items-center space-x-4 mb-2">
              <button className="text-gray-400 hover:text-gray-700">
                <SkipBack size={18} />
              </button>
              <button className="text-gray-400 hover:text-gray-700">
                <StepBack size={18} />
              </button>
              <button 
                onClick={togglePlayPause}
                className="p-2 bg-purple-600 rounded-full text-white"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <button className="text-gray-400 hover:text-gray-700">
                <StepForward size={18} />
              </button>
              <button className="text-gray-400 hover:text-gray-700">
                <SkipForward size={18} />
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full flex items-center space-x-2">
              <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-2 bg-purple-600"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-500">{formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Speed & Volume */}
          <div className="flex items-center mt-3 sm:mt-0 sm:w-1/4 justify-end">
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="mr-4 px-2 py-1 text-xs bg-gray-100 rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-1 focus:ring-purple-500"
            >
              {speeds.map((speed) => (
                <option key={speed} value={speed}>
                  {speed}x
                </option>
              ))}
            </select>
            
            <div className="flex items-center">
              <Volume2 size={16} className="text-gray-400 mr-2" />
              <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-2 bg-purple-600 w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;