import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import buildingPic from '../../public/img/buildings.svg';
import cloudsPic from '../../public/img/clouds.svg';
import React, { useEffect, useRef, useState } from 'react';
import Avatar, {
  AvatarAttributes,
  AvatarStyle,
  BodyType,
  COLORS,
  FaceType,
  Position,
} from '../components/avatar';
import { makeid, supabase } from '../util/constants';
import useSound from 'use-sound';

export default function Home() {
  const [avatars, setAvatars] = useState<AvatarAttributes[]>([]);

  const stateRef = useRef<AvatarAttributes[]>([]);
  stateRef.current = avatars;

  const [playWalk] = useSound('/sound/walk.wav', {
    volume: 1,
  });
  const [playMessage] = useSound('/sound/message.wav', {
    volume: 1,
  });

  useEffect(() => {
    const setup = async () => {
      let user = supabase.auth.user();
      console.log('user', user);
      if (!user) {
        await supabase.auth.signUp({
          email: `${makeid(10)}@sample.com`,
          password: makeid(12),
        });
        user = supabase.auth.user();
        setUserId(user?.id);
      } else {
        setUserId(user!.id);
        const { data: myData } = await supabase
          .from('users')
          .select()
          .eq('id', user!.id);
        if (myData && myData.length > 0) {
          const profile = myData![0];
          setMyAvatar({
            faceType: profile.face_type,
            faceColor: profile.face_color,
            bodyType: profile.body_type,
            bodyColor: profile.body_color,
            handColor: profile.hand_color,
            legColor: profile.leg_color,
          });
          setMyName(profile.name);
          setMyMessage(profile.message);
          setMyPosition({ x: profile.x, y: profile.y });
        }
      }
      const thirtyMinutesAgo = new Date();
      thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 10);
      const { data } = await supabase
        .from('users')
        .select()
        .gt('updated_at', thirtyMinutesAgo.toISOString());
      if (data) {
        const _avatars = data
          .filter((row) => row.id != user!.id)
          .map((row) => convertRowToAttributes(row));
        setAvatars(_avatars);
      }
      supabase
        .from('users')
        .on('*', (payload) => {
          const newRecord = payload.new;
          if (newRecord && newRecord.id != user!.id) {
            const _avatars = stateRef.current;
            const targetIndex = _avatars.findIndex(
              (avatar) => newRecord.id == avatar.id
            );
            if (targetIndex < 0) {
              _avatars.push(convertRowToAttributes(newRecord));
            } else {
              if (_avatars[targetIndex].message != newRecord.message) {
                playMessage();
              }
              _avatars[targetIndex] = convertRowToAttributes(newRecord);
            }
            setAvatars([..._avatars]);
            console.log('setAvatars called');
          }
        })
        .subscribe();
    };
    setup();
  }, []);

  const [userId, setUserId] = useState<string>();

  const [myPosition, setMyPosition] = useState<Position>({ x: 0, y: 0 });
  const [myAvatar, setMyAvatar] = useState<AvatarStyle>({
    faceType: FaceType.round,
    faceColor: '#000',
    bodyType: BodyType.round,
    bodyColor: '#000',
    handColor: '#000',
    legColor: '#000',
  });
  const [myMessage, setMyMessage] = useState<string>();
  const [myName, setMyName] = useState<string>('');
  const [typedMessage, setTypedMessage] = useState<string>('');

  const convertRowToAttributes = (row: any): AvatarAttributes => {
    return {
      style: {
        faceType: row.face_type,
        faceColor: row.face_color,
        bodyType: row.body_type,
        bodyColor: row.body_color,
        handColor: row.hand_color,
        legColor: row.leg_color,
      },
      position: {
        x: row.x,
        y: row.y,
      },
      message: row.message,
      name: row.name,
      id: row.id,
    } as AvatarAttributes;
  };

  const move = async (e: any): Promise<void> => {
    playWalk();
    if (e.target.id !== 'grass') {
      return;
    }
    const grassWidth = window.innerWidth;
    const grassHeight = window.innerHeight - 314;
    const clickedX = e.clientX;
    const clickedY = grassHeight - (e.clientY - 314);
    const x = (clickedX * 100) / grassWidth;
    const y = (clickedY * 100) / grassHeight;
    setMyPosition({ x, y });
    if (userId) {
      await supabase.from('users').upsert({
        id: userId,
        x,
        y,
      });
    }
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

  const changeAvatar = async (): Promise<void> => {
    const faceType = getRandomFaceType();
    const faceColor = getRandomColor();
    const bodyType = getRandomBodyType();
    const bodyColor = getRandomColor();
    const handColor = getRandomColor();
    const legColor = getRandomColor();
    setMyAvatar({
      faceType,
      faceColor,
      bodyType,
      bodyColor,
      handColor,
      legColor,
    });
    if (userId) {
      await supabase.from('users').upsert({
        id: userId,
        face_type: faceType,
        face_color: faceColor,
        body_type: bodyType,
        body_color: bodyColor,
        hand_color: handColor,
        leg_color: legColor,
      });
    }
  };

  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    playMessage();
    if (!typedMessage) {
      return;
    }
    setMyMessage(typedMessage);
    setTypedMessage('');
    if (userId) {
      await supabase.from('users').upsert({
        id: userId,
        message: typedMessage,
      });
    }
  };

  const setUserName = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const userName = e.target.value;
    setMyName(userName);
    if (userId) {
      await supabase.from('users').upsert({
        id: userId,
        name: userName,
      });
    }
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
        <div id="grass" className={`${styles.grass} relative`} onClick={move}>
          {userId ? (
            <Avatar
              key="myAvatar"
              attributes={{
                position: myPosition,
                style: myAvatar,
                message: myMessage,
                name: myName,
                id: userId,
              }}
            ></Avatar>
          ) : null}
          {avatars.map((avatar) => {
            return <Avatar key={avatar.id} attributes={avatar}></Avatar>;
          })}
        </div>
      </main>

      <button
        className={`fixed top-6 right-6 ${styles.front}`}
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

      <form
        className={`flex fixed bottom-4 left-1/2 ${styles.form} ${styles.front}`}
        onSubmit={submitMessage}
      >
        <input
          className="rounded-full border-2 border-black px-8 w-40 text-lg outline-none"
          type="text"
          value={myName}
          onChange={setUserName}
          placeholder="User Name"
        />
        <div className="w-12"></div>
        <input
          className="rounded-full border-2 border-black px-8 w-96 text-lg outline-none"
          type="text"
          value={typedMessage}
          onChange={(e) => setTypedMessage(e.target.value)}
          placeholder="Say hello to everyone!"
        />
        <div className="w-4"></div>
        <button className="h-16 w-28 flex items-center justify-center bg-indigo-400 border-2 border-black rounded-full text-white text-lg">
          Send
        </button>
      </form>
    </div>
  );
}
