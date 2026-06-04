import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: string;
  tag?: keyof JSX.IntrinsicElements;
  onLetterAnimationComplete?: () => void;
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;
      const el = ref.current;

      /* manually split text into word + char spans */
      const words = text.split(' ');
      el.innerHTML = '';

      const allChars: HTMLSpanElement[] = [];
      const allWords: HTMLSpanElement[] = [];

      words.forEach((word, wi) => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word';
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';

        for (const char of word) {
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.style.display = 'inline-block';
          charSpan.textContent = char;
          wordSpan.appendChild(charSpan);
          allChars.push(charSpan);
        }

        allWords.push(wordSpan);
        el.appendChild(wordSpan);

        if (wi < words.length - 1) {
          const space = document.createElement('span');
          space.innerHTML = '&nbsp;';
          space.style.display = 'inline-block';
          el.appendChild(space);
        }
      });

      let targets: HTMLSpanElement[];
      if (splitType.includes('chars')) {
        targets = allChars;
      } else if (splitType.includes('words')) {
        targets = allWords;
      } else {
        targets = allChars;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
            anticipatePin: 0.4,
          },
          onComplete: () => {
            animationCompletedRef.current = true;
            onCompleteRef.current?.();
          },
          willChange: 'transform, opacity',
          force3D: true,
        },
      );

      return () => {
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === el) st.kill();
        });
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    },
  );

  const style: React.CSSProperties = {
    textAlign: textAlign as React.CSSProperties['textAlign'],
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity',
  };

  const Tag = (tag || 'p') as keyof JSX.IntrinsicElements;
  const classes = `split-parent ${className}`;

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} style={style} className={classes}>
      {text}
    </Tag>
  );
};

export default SplitText;
