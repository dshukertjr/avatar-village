import { FaceType } from '../avatar';

export default function Face({
  type,
  color,
  onClick,
}: {
  type: FaceType;
  color: string;
  onClick: any;
}) {
  if (type == FaceType.round) {
    return (
      <svg
        width="107"
        height="107"
        viewBox="0 0 107 107"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          onClick={() => onClick()}
          className="cursor-pointer pointer-events-auto"
          cx="53.5"
          cy="53.5"
          r="52"
          stroke="black"
          strokeWidth="3"
        />
        <ellipse
          cx="31.677"
          cy="55.3404"
          rx="20.3597"
          ry="20.3597"
          fill="white"
        />
        <ellipse
          cx="34.4376"
          cy="55.3404"
          rx="10.6975"
          ry="10.6975"
          fill="black"
        />
        <circle cx="75.9173" cy="55.3404" r="20.3597" fill="white" />
        <ellipse
          cx="78.6779"
          cy="55.3404"
          rx="10.6975"
          ry="10.6975"
          fill="black"
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="107"
        height="107"
        viewBox="0 0 107 107"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          onClick={() => onClick()}
          className="cursor-pointer pointer-events-auto"
          x="1.5"
          y="1.5"
          width="104"
          height="104"
          rx="22.5"
          stroke="black"
          strokeWidth="3"
        />
        <ellipse
          cx="31.677"
          cy="50.1963"
          rx="20.3597"
          ry="20.3597"
          fill="white"
        />
        <ellipse
          cx="34.4376"
          cy="50.1963"
          rx="10.6975"
          ry="10.6975"
          fill="black"
        />
        <ellipse
          cx="75.9173"
          cy="50.1963"
          rx="20.3597"
          ry="20.3597"
          fill="white"
        />
        <circle cx="78.6779" cy="50.1963" r="10.6975" fill="black" />
      </svg>
    );
  }
}
