import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import buildingPic from '../public/img/buildings.svg'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Avatar Village</title>
        <meta name="description" content="Avatar Village is powered by Supabase and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <div className={`${styles.sky} relative`}>
          <div className={`${styles.font0} absolute bottom-0 left-0 right-0 flex justify-center`}>
            <Image src={buildingPic} alt="background buildings" />
          </div>
        </div>
        <div className={styles.grass}>

        </div>
      </main>

    </div>
  )
}
