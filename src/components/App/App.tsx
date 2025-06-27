import 'react';
import { Slider } from '@ark-ui/react'
import { useState } from 'react'

export interface AppProps {
  backgroundColor?: string;
  label?: string;
  trackColor?: string;
  rangeColor?: string;
}

export const App = ({label = 'Label'}: AppProps) => {
  const [value, setValue] = useState([30]);

  return (
    <div className="p-8 rounded-xl">
      <Slider.Root
        min={-50}
        max={50}
        value={value}
        onValueChange={(e) => setValue(e.value)}
        className="w-full max-w-md mx-auto flex flex-col items-center gap-4"
      >
        <Slider.Label className="mb-2 text-lg font-medium text-gray-700">{label}</Slider.Label>
        <Slider.ValueText className="mb-2 text-blue-600 font-bold">{value}</Slider.ValueText>
        <Slider.Control className="w-full h-6 relative flex items-center">
          <Slider.Track className="w-full h-2 bg-gray-200 rounded-full relative">
            <Slider.Range className="absolute h-2 bg-blue-500 rounded-full" />
          </Slider.Track>
          <Slider.Thumb
            index={0}
            className="w-6 h-6 bg-blue-500 border-2 border-white rounded-full shadow-md cursor-pointer transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </Slider.Control>
      </Slider.Root>
    </div>
  );
};

export default App;
