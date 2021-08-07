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
      className={styles.avatar}
      style={{
        left: `${attributes.position.x}%`,
        bottom: `${attributes.position.y}%`,
        zIndex: Math.round(attributes.position.y),
      }}
    >
      <div onClick={clickedAvatar} className={styles.avatar}>
        {attributes.message ? (
          <div className={styles.message}>{attributes.message}</div>
        ) : null}
        <div className={styles.leg}>
          <Leg color={attributes.style.legColor}></Leg>
        </div>
        <div className={styles.body}>
          <Body
            type={attributes.style.bodyType}
            color={attributes.style.bodyColor}
          ></Body>
        </div>
        <div className={styles.hand}>
          <Hand color={attributes.style.handColor}></Hand>
        </div>
        <div className={styles.face}>
          <Face
            type={attributes.style.faceType}
            color={attributes.style.faceColor}
          ></Face>
        </div>
      </div>
    </div>
  );
}
