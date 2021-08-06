import { BodyType } from '../avatar';

export default function Body({
  type,
  color,
}: {
  type: BodyType;
  color: string;
}) {
  switch (type) {
    case BodyType.round:
      return (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="65" cy="65" r="63.5" stroke="black" strokeWidth="3" />
        </svg>
      );
    case BodyType.square:
      return (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="1.5"
            y="1.5"
            width="127"
            height="127"
            rx="22.5"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
      );
    case BodyType.bottomCorner:
      return (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128.5 65V128.5H1.5V65C1.5 29.9299 29.9299 1.5 65 1.5C100.07 1.5 128.5 29.9299 128.5 65Z"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
      );
    case BodyType.topCorner:
      return (
        <svg
          width="130"
          height="130"
          viewBox="0 0 130 130"
          fill={color}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 1.5H128.5V65C128.5 100.07 100.07 128.5 65 128.5C29.9299 128.5 1.5 100.07 1.5 65V1.5Z"
            stroke="black"
            strokeWidth="3"
          />
        </svg>
      );
  }
}
