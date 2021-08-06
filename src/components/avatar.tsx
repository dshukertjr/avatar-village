import Body from './avatar/body';
import Face from './avatar/face';
import styles from '../styles/Avatar.module.css';
import Hand from './avatar/hand';
import Leg from './avatar/leg';

export enum Color {
  red = 'red',
  yellow = 'yellow',
  purpole = 'purpole',
  pink = 'pink',
  green = 'green',
  black = 'black',
  brown = 'brown',
}

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

const colorToColorCode = (color: Color): string => {
  switch (color) {
    case Color.red:
      return '#F87171';
    case Color.yellow:
      return '#FBBF24';
    case Color.purpole:
      return '#818CF8';
    case Color.pink:
      return '#F472B6';
    case Color.green:
      return '#34D399';
    case Color.black:
      return '#000';
    case Color.brown:
      return '#D3A327';
    default:
      return '#F87171';
  }
};

export interface AvatarAttributes {
  faceType: FaceType;
  faceColor: Color;
  bodyType: BodyType;
  bodyColor: Color;
  handColor: Color;
  legColor: Color;
}

export default function Avatar({
  attributes,
}: {
  attributes: AvatarAttributes;
}) {
  const clickedAvatar = (): void => {
    console.log('clicked avatar');
  };
  return (
    <div onClick={clickedAvatar} className={styles.avatar}>
      <div className={styles.leg}>
        <Leg color={colorToColorCode(attributes.legColor)}></Leg>
      </div>
      <div className={styles.body}>
        <Body
          type={attributes.bodyType}
          color={colorToColorCode(attributes.bodyColor)}
        ></Body>
      </div>
      <div className={styles.hand}>
        <Hand color={colorToColorCode(attributes.handColor)}></Hand>
      </div>
      <div className={styles.face}>
        <Face
          type={attributes.faceType}
          color={colorToColorCode(attributes.faceColor)}
        ></Face>
      </div>
    </div>
  );
}
