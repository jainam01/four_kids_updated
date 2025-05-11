import * as SliderPrimitive from "@radix-ui/react-slider";
import React from "react";

interface RangeSliderProps {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number[]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  min = 0,
  max = 1000,
  step = 10,
  onChange,
}) => {
  return (
    <div className="w-full">
      <SliderPrimitive.Root
        className="relative flex w-full touch-none select-none items-center"
        min={min}
        max={max}
        step={step}
        value={value}
        onValueChange={onChange}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-300">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-600" />
        </SliderPrimitive.Track>
        {value.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            className="block h-4 w-4 rounded-full bg-blue-600 shadow-md focus:outline-none"
          />
        ))}
      </SliderPrimitive.Root>
      <div className="flex justify-between text-sm mt-2 text-gray-600 font-medium">
        <span>₹{value[0]}</span>
        <span>₹{value[1]}</span>
      </div>
    </div>
  );
};
