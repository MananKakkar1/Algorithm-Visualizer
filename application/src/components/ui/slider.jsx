import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../lib/utils";

const Slider = React.forwardRef(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("slider", className)}
    {...props}
  >
    <SliderPrimitive.Track className={cn("slider__track")}>
      <SliderPrimitive.Range className={cn("slider__range")} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn("slider__thumb")} />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
