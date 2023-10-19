import * as React from "react";
import type { SVGProps } from "react";
const SvgError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 512 512"
    {...props}
  >
    <path
      fill="#000"
      fillRule="evenodd"
      d="M256 42.667c117.803 0 213.333 95.53 213.333 213.333S373.803 469.333 256 469.333 42.667 373.803 42.667 256 138.197 42.667 256 42.667Zm48.917 134.25L256 225.835l-48.917-48.918-30.166 30.166L225.835 256l-48.918 48.917 30.166 30.166L256 286.165l48.917 48.918 30.166-30.166L286.165 256l48.918-48.917-30.166-30.166Z"
    />
  </svg>
);
export default SvgError;
