// pages.tsx
'use client';
import styles from '../../styles/home.module.css';
import Image from 'next/image';
import wasi from "./images/wasi.png"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const startApp = () => {
    router.push('/theme');
  };

  return (
    <div className="container">
      <h1 className="title">決めておくれよ<br />ハクトウワシさん</h1>
      <button className="button" onClick={startApp}>
        決めてもらう
      </button>
      <figure className={styles.figure}>
      <Image
          src={wasi} 
          alt="Background image"
          layout="fill"
          objectFit="contain" 
          style={{ objectPosition: 'center' }}
          />
      </figure>
    </div>
  );
}
