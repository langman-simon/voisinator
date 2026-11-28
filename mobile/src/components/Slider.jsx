//found on https://mui.com/material-ui/react-slider/
export function Slider() {
  return (
    <Slider
      aria-label="Temperature"
      defaultValue={30}
      getAriaValueText={valuetext}
      valueLabelDisplay="auto"
      shiftStep={30}
      step={1}
      marks
      min={1}
      max={50}
    />
  );
}
