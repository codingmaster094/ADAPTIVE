import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const Line = ({
  xScale,
  yScale,
  color,
  data,
  isSmooth,
  animation,
  lineWidth,
  opacity_a,
  ...props
}) => {
  const ref = React.useRef(null);
  const animateLeft = React.useCallback(() => {
    const totalLength = ref.current.getTotalLength
      ? ref.current.getTotalLength()
      : 500;
    d3.select(ref.current)
      .attr("opacity", 1)
      .attr("stroke-dasharray", `${totalLength},${totalLength}`)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }, []);
  const animateFadeIn = React.useCallback(() => {
    d3.select(ref.current)
      .transition()
      .duration(750)
      .ease(d3.easeLinear)
      .attr("opacity", 1);
  }, []);
  const noneAnimation = React.useCallback(() => {
    d3.select(ref.current).attr("opacity", 1);
  }, []);

  React.useEffect(() => {
    switch (animation) {
      case "left":
        animateLeft();
        break;
      case "fadeIn":
        animateFadeIn();
        break;
      case "none":
      default:
        noneAnimation();
        break;
    }
  }, [animateLeft, animateFadeIn, noneAnimation, animation]);
  React.useEffect(() => {
    if (animation === "left") {
      const totalLength = ref.current.getTotalLength
        ? ref.current.getTotalLength()
        : 500;
      d3.select(ref.current).attr(
        "stroke-dasharray",
        `${totalLength},${totalLength}`
      );
    }
  }, [xScale, yScale, animation]);

  const line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value));

  const d = line(data);

  return (
    <path
      ref={ref}
      d={d?.match(/NaN|undefined/) ? "" : d}
      stroke={color}
      strokeWidth={lineWidth}
      fill="none"
      opacity={opacity_a}
      {...props}
    />
  );
};

Line.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.date,
      value: PropTypes.number
    })
  ),
  color: PropTypes.string,
  isSmooth: PropTypes.bool,
  animation: PropTypes.oneOf(["left", "fadeIn", "none"])
};

Line.defaultProps = {
  data: [],
  // color: "white",
  isSmooth: false,
  animation: "left"
};

export default Line;
