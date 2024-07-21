// icon:three-dots | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconThreeDots(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="white"
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      {...props}
    >
      <path d="M3 9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  );
}

export default IconThreeDots;
