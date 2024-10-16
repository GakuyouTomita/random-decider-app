// theme/pages.tsx

'use client';
import { useRouter } from 'next/navigation';
import themeDisplayNames from '../config/themeConfig';
import styles from '../../../styles/theme.module.css';
import Image from 'next/image';
import wasi from '../images/wasi.png';


export default function Theme() {
  const router = useRouter();

  return (
    <div className="container">
      <h1 className="title">何を決めて欲しい？</h1>

      <div className={styles.grid}>
        {Object.entries(themeDisplayNames).map(([key, label]) => {
          return (
            <button
              key={key}
              className={"button"}
              onClick={() => router.push(`/decide?theme=${key}`)}
            >
              {label}
            </button>
          );
        })}
      </div>
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
