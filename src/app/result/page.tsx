// result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from '../../../styles/result.module.css';
import wasiHappy from '../images/wasi_happy.png';
import Image from 'next/image';


export default function Result() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const theme = searchParams.get('theme');
    const options = searchParams.get('options')?.split(',') || [];
    const [decision, setDecision] = useState<string | null>(null);

    useEffect(() => {
        if (options.length > 0) {
            makeDecision();  // 即座に抽選結果を決定
        }
    }, [options]);

    const makeDecision = () => {
        const finalChoice = options[Math.floor(Math.random() * options.length)];
        setDecision(finalChoice);  // 抽選結果を決定
    };

    const goBackToTitle = () => {
        router.push('/');
    };

    const goToAnimePage = () => {
        const queryParams = new URLSearchParams({
          theme: theme || '',
          options:options.join(',')
        }).toString();
    
        router.push(`/anime?${queryParams}`);
      };


      
    const getCustomMessage = () => {
        if (!theme || !decision) return '';
        if (theme === 'movie') return `今日は「${decision}」を観てみたら？`;
        if (theme === 'routine') return `今夜は「${decision}」をやってから寝たら？`;
        if (theme === 'food') return `今は「${decision}」の気分かなぁ`;
        if (theme === 'creative') return `とりあえず「${decision}」を題材にしてみたら？`;
        if (theme === 'onigiri') return `よし「${decision}」を食べよう`;
        return '';
    };

    const customMessage = getCustomMessage();
    const splitMessage = (message: string) => {
        const parts = message.split('「');
        const customMessage1 = parts[0];
        const rest = parts[1]?.split('」');
        const result = rest?.[0] || '';
        const customMessage2 = rest?.[1] || '';
        return { customMessage1, result, customMessage2 };
    };

    const { customMessage1, result, customMessage2 } = splitMessage(customMessage);

    return (
        <div className="container">
            {decision ? (
                <>
                    <div className="title">
                        <div>{customMessage1}</div>
                        <div className={styles.result}>{result}</div>
                        <div>{customMessage2}</div>
                    </div>
                    <figure className={styles.figure}>
                        <Image
                            src={wasiHappy}
                            alt="Background image"
                            layout="fill"
                            objectFit="contain"
                            style={{ objectPosition: 'center' }}
                        />
                    </figure>
                    <div style={{ margin: '1rem' }}></div>
                    <button className="button" onClick={goToAnimePage}>
                    もう一度決めてもらう
                    </button>
                    <div style={{ margin: '1rem' }}></div>
                    <button onClick={goBackToTitle} className="button">
                        タイトルへ戻る
                    </button>
                </>
            ) : (
                <div>決定中...</div>
            )}
        </div>
    );
}
