import { FC, useState, useEffect } from 'react';
import { fromEvent, tap } from 'rxjs';
import { TargetStyled } from './styled/TargetStyled';

const Target: FC = () => {
  const getRandomNumber = () => (Math.random() * 300);

  const [targetProps, setTargetProps] = useState({
    styledHeight: '50px',
    styledWidth: '50px',
    styledTranslate: 'none',
    score: 0,
  });

  const updateTarget = () => {
    setTargetProps({
      ...targetProps,
      styledHeight: '50px',
      styledWidth: '50px',
      styledTranslate: `translate(${getRandomNumber()}px, ${getRandomNumber()}px)`,
      score: targetProps.score += 1,
    });
  };

  useEffect(() => {
    const myObservable = fromEvent(
      document.getElementById('target') as HTMLButtonElement,
      'click',
    ).pipe(
      tap(updateTarget),
    );
    const subscription = myObservable.subscribe();
    return () => { if (subscription) subscription.unsubscribe(); };
  }, []);

  const {
    styledHeight,
    styledWidth,
    styledTranslate,
    score,
  } = targetProps;
  return (
    <TargetStyled
      id="target"
      styledHeight={styledHeight}
      styledWidth={styledWidth}
      styledTranslate={styledTranslate}
    >
      {score}
    </TargetStyled>
  );
};

export default Target;
