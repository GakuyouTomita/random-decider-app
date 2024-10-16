// decide/page.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import themeDisplayNames from '../config/themeConfig';
import styles from '../../../styles/decide.module.css';
import Image from 'next/image';
import wasi from '../images/wasi.png';

export default function Decide() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = searchParams.get('theme');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const movieOptions = ['アクション', 'ホラー', 'ロマンス', 'SF', 'サスペンス', 'ドキュメンタリー', '歴史物', 'アドベンチャー', 'コメディ'];
  const routineOptions = ['筋トレ', '読書', '日記', 'アニメ鑑賞', '妄想'];
  const foodOptions = ['和食', '中華', '洋食', '東南アジア料理', '北欧料理'];
  const creativeOptions = ['都市', '人間', '鳥', 'どうぶつ', '最近夢に出てきたもの'];
  const onigiriOptions = ['おかか', '梅', '昆布', 'たらこ', 'しゃけ', 'ツナマヨ', 'すじこ', '鶏五目'];

  const getOptions = () => {
    if (theme === 'movie') return movieOptions;
    if (theme === 'routine') return routineOptions;
    if (theme === 'food') return foodOptions;
    if (theme === 'creative') return creativeOptions;
    if (theme === 'onigiri') return onigiriOptions;
    return [];
  };

  useEffect(() => {
    const options = getOptions();
    setSelectedOptions(options);
  }, [theme]);

  const handleCheckboxChange = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.includes(option)
        ? prevSelectedOptions.filter((opt) => opt !== option)
        : [...prevSelectedOptions, option]
    );
  };


  const goToThemePage = () => {
    router.push('/theme');
  };

  const goToAnimePage = () => {
    const queryParams = new URLSearchParams({
      theme: theme || '',
      options: selectedOptions.join(',')
    }).toString();

    router.push(`/anime?${queryParams}`);
  };

  const options = getOptions();

  return (
    <div className="container">
      <h1 className="title">
        {theme && <p className={styles.themeTitle}>{themeDisplayNames[theme] || theme}</p>}
        を決めて欲しいの？</h1>
      <button
        onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        className={styles.accordionButton}
      >
        <span className={styles.buttonText}>候補を調整する</span>
        <span className={styles.buttonIcon}>{isAccordionOpen ? 'ー' : '＋'}</span>
      </button>

      {isAccordionOpen && (
        <div className={styles.accordionContent}>
          {options.map((option) => (
            <label
              key={option}
              className={`${styles.optionLabel} ${selectedOptions.includes(option) ? styles.optionLabelSelected : styles.optionLabelUnselected}`}
            >
              <input
                type="checkbox"
                id={option}
                checked={selectedOptions.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className={styles.checkbox}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      <div style={{ margin: '1rem' }}></div>
      <button className="button" onClick={goToThemePage}>
        テーマを選び直す
      </button>
      <div style={{ margin: '1rem' }}></div>
      <button className="button" onClick={goToAnimePage}>
        お願いします！
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
