// icon:image-alt | Bootstrap https://icons.getbootstrap.com/ | Bootstrap
import * as React from "react";

function IconImageAlt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="red"
      viewBox="0 0 16 16"
      height="1.5em"
      width="1.5em"
      style={{border: '1.5px solid black'}}
      {...props}
    >
      <path d="M7 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm4.225 4.053a.5.5 0 00-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 00-.63.062L.002 13v2a1 1 0 001 1h14a1 1 0 001-1v-4.5l-4.777-3.947z" />
    </svg>
  );
}

export default IconImageAlt;
