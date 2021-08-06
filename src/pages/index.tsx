import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import buildingPic from '../../public/img/buildings.svg';
import cloudsPic from '../../public/img/clouds.svg';
import React, { useState } from 'react';
import Avatar, { BodyType, Color, FaceType } from '../components/avatar';

interface Position {
  x: number;
  y: number;
}

export default function Home() {
  const [myPosition, setMyPosition] = useState<Position>({ x: 0, y: 0 });

  const clickedGrass = (e: any): void => {
    if (e.target.id !== 'grass') {
      return;
    }
    const x = e.clientX - 167 / 2;
    const y = e.clientY - 314 - 239;
    setMyPosition({ x, y });
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
          <div
            className={styles.avatar}
            style={{
              position: 'absolute',
              left: myPosition.x,
              top: myPosition.y,
            }}
          >
            <Avatar
              attributes={{
                faceType: FaceType.square,
                faceColor: Color.red,
                bodyType: BodyType.topCorner,
                bodyColor: Color.green,
                handColor: Color.pink,
                legColor: Color.black,
              }}
            ></Avatar>
          </div>
        </div>
      </main>
    </div>
  );
}
