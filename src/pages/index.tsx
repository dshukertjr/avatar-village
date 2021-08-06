import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import buildingPic from '../../public/img/buildings.svg';
import cloudsPic from '../../public/img/clouds.svg';
import React, { useState } from 'react';
import Avatar, {
  AvatarStyle,
  BodyType,
  COLORS,
  FaceType,
  Position,
} from '../components/avatar';

export default function Home() {
  const [myPosition, setMyPosition] = useState<Position>({ x: 0, y: 0 });
  const [myAvatar, setMyAvatar] = useState<AvatarStyle>({
    faceType: FaceType.round,
    faceColor: '#000',
    bodyType: BodyType.round,
    bodyColor: '#000',
    handColor: '#000',
    legColor: '#000',
  });

  const clickedGrass = (e: any): void => {
    if (e.target.id !== 'grass') {
      return;
    }
    const grassWidth = window.innerWidth;
    const grassHeight = window.innerHeight - 314;
    const clickedX = e.clientX - 167 / 2;
    const clickedY = e.clientY - 314 - 239;
    const x = (clickedX * 100) / grassWidth;
    const y = (clickedY * 100) / grassHeight;
    setMyPosition({ x, y });
  };

  const getRandomColor = (): string => {
    const rand = Math.round(Math.random() * COLORS.length - 0.5);
    return COLORS[rand];
  };

  const getRandomFaceType = (): FaceType => {
    const rand = Math.round(Math.random() * 2 - 0.5);
    if (rand == 0) {
      return FaceType.round;
    } else if (rand == 1) {
      return FaceType.square;
    }
    return FaceType.round;
  };

  const getRandomBodyType = (): BodyType => {
    const rand = Math.round(Math.random() * 4 - 0.5);
    if (rand == 0) {
      return BodyType.round;
    } else if (rand == 1) {
      return BodyType.square;
    } else if (rand == 2) {
      return BodyType.bottomCorner;
    } else if (rand == 3) {
      return BodyType.topCorner;
    }
    return BodyType.round;
  };

  const changeAvatar = () => {
    setMyAvatar({
      faceType: getRandomFaceType(),
      faceColor: getRandomColor(),
      bodyType: getRandomBodyType(),
      bodyColor: getRandomColor(),
      handColor: getRandomColor(),
      legColor: getRandomColor(),
    });
  };
  return (
    <div>
      <Head>
        <title>Avatar Village</title>
        <meta
          name="description"
          content="Avatar Village is powered by Supabase and Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col items-stretch overflow-hidden">
        <div className={`${styles.sky} relative`}>
          <div
            className={`${styles.font0} absolute bottom-0 left-0 right-0 flex justify-center`}
          >
            <Image src={buildingPic} alt="background buildings" />
          </div>
          <div
            className={`${styles.font0} ${styles.cloud} absolute top-2 left-0 w-screen flex justify-center`}
          >
            <Image src={cloudsPic} alt="background clouds" />
          </div>
          <div
            className={`${styles.font0} ${styles.cloud} absolute top-2 right-full w-screen flex justify-center`}
          >
            <Image src={cloudsPic} alt="background clouds" />
          </div>
        </div>
        <div
          id="grass"
          className={`${styles.grass} relative`}
          onClick={clickedGrass}
        >
          <Avatar
            attributes={{
              position: myPosition,
              style: myAvatar,
            }}
          ></Avatar>
        </div>
      </main>

      <button
        className="fixed top-6 right-6"
        onClick={changeAvatar}
        title="Change avatar style"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12"
          viewBox="0 0 20 20"
          stroke="#000"
          fill="#fff"
        >
          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
        </svg>
      </button>
    </div>
  );
}
