import Body from './avatar/body';
import Face from './avatar/face';
import styles from '../styles/Avatar.module.css';
import Hand from './avatar/hand';
import Leg from './avatar/leg';
import { ReactElement } from 'react';

export interface Position {
  x: number;
  y: number;
}

export const COLORS = [
  '#F87171',
  '#FBBF24',
  '#818CF8',
  '#F472B6',
  '#34D399',
  '#000',
  '#D3A327',
];

export enum FaceType {
  round = 'round',
  square = 'square',
}

export enum BodyType {
  round = 'round',
  square = 'square',
  topCorner = 'topCorner',
  bottomCorner = 'bottomCorner',
}

export interface AvatarStyle {
  faceType: FaceType;
  faceColor: string;
  bodyType: BodyType;
  bodyColor: string;
  handColor: string;
  legColor: string;
}

export interface AvatarAttributes {
  style: AvatarStyle;
  position: Position;
  message?: string;
  name?: string;
  id: string;
}

export default function Avatar({
  attributes,
}: {
  attributes: AvatarAttributes;
}): ReactElement {
  const clickedAvatar = (): void => {
    console.log('clicked avatar');
  };
  return (
    <div
      className={`${styles.avatar} pointer-events-none`}
      style={{
        left: `${attributes.position.x}%`,
        bottom: `${attributes.position.y}%`,
        zIndex: Math.round(100 - attributes.position.y),
      }}
    >
      <div onClick={clickedAvatar} className={styles.avatar}>
        {attributes.message ? (
          <div className={styles.message}>{attributes.message}</div>
        ) : null}
        <div className={styles.leg}>
          <Leg color={attributes.style.legColor} onClick={clickedAvatar}></Leg>
        </div>
        <div className={styles.body}>
          {attributes.name ? (
            <div className="absolute inset-0 flex justify-center items-center text-white">
              {attributes.name}
            </div>
          ) : null}
          <Body
            type={attributes.style.bodyType}
            color={attributes.style.bodyColor}
            onClick={clickedAvatar}
          ></Body>
        </div>
        <div className={styles.hand}>
          <Hand
            color={attributes.style.handColor}
            onClick={clickedAvatar}
          ></Hand>
        </div>
        <div className={styles.face}>
          <Face
            type={attributes.style.faceType}
            color={attributes.style.faceColor}
            onClick={clickedAvatar}
          ></Face>
        </div>
      </div>
    </div>
  );
}
