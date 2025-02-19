import React from "react";
import { css, cx } from "@emotion/css";

// CSS for the gradient animation
const gradientAnimation = css`
  @keyframes gradient-xy {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  }

  .animate-gradient-xy {
    background-size: 200% 200%;
    animation: gradient-xy 15s ease infinite;
  }
`;

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className={cx("w-full h-full bg-gradient-to-r from-blue-400 to-purple-600", gradientAnimation)}></div>
    </div>
  );
};

export default AnimatedBackground;
