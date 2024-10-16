// anime/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import wasiUn from '../images/wasi_un.png';
import wasiSoudana from '../images/wasi_soudana.png';
import wasi from '../images/wasi.png'; // 追加
import styles from '../../../styles/anime.module.css';

export default function Anime() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const options = searchParams.get('options') || '';
  
  const images = [wasiUn, wasiSoudana, wasi]; // 画像の配列
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // 現在の画像のインデックス

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // インデックスを更新
    }, 1000); // 1秒ごとに切り替え

    const timeout = setTimeout(() => {
      const queryParams = new URLSearchParams({
        theme: theme || '',
        options: options
      }).toString();

      router.push(`/result?${queryParams}`); // 4秒後に結果ページへ遷移
    }, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router, theme, options]);

  return (
    <div className="container">
      <div className={styles.container}>
        <Image
          src={images[currentImageIndex]} // 現在のインデックスを使って画像を選択
          alt="Background image"
          layout="fill"
          objectFit="contain"
          style={{ objectPosition: 'center' }}
        />
      </div>
    </div>
  );
}
