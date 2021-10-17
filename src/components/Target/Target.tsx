import { FC, useState, useEffect } from 'react';
import {
  fromEvent, interval, map, scan, switchMap, takeWhile, tap,
} from 'rxjs';
import {
  initialGameState, isGameContinue, StateModel, updateGameState,
} from '../../state/state';
import { getRandomColour, getRandomNumber } from '../../util/helpers';
import { TargetStyled } from './styled/TargetStyled';

const Target: FC = () => {
  const [targetProps, setTargetProps] = useState({
    styledHeight: '36px',
    styledWidth: '36px',
    styledTranslate: 'none',
    styledBackgroundColour: 'black',
    score: 0,
  });

  const updateTarget = () => {
    setTargetProps({
      ...targetProps,
      styledHeight: '12px',
      styledWidth: '12px',
      styledTranslate: `translate(${getRandomNumber()}px, ${getRandomNumber()}px)`,
      styledBackgroundColour: `#${getRandomColour()}`,
      score: targetProps.score += 1,
    });
  };

  const updateScore = (score: number) => {
    setTargetProps((prev) => ({
      ...prev,
      score,
    }));
  };

  const resetTargetSize = () => {
    setTargetProps((prev) => ({
      ...prev,
      styledHeight: '36px',
      styledWidth: '36px',
    }));
  };

  const makeInterval = (gameState: StateModel) => interval(gameState.time)
    .pipe(map((v) => 5 - v));

  useEffect(() => {
    const myObservable = fromEvent(
      document.getElementById('target') as HTMLButtonElement,
      'click',
    ).pipe(
      tap(updateTarget),
      scan<Event, StateModel>(updateGameState, initialGameState),
      tap(({ score }) => updateScore(score)),
      switchMap(makeInterval),
      tap(resetTargetSize),
      takeWhile(isGameContinue),
    );
    const subscription = myObservable.subscribe();
    return () => { if (subscription) subscription.unsubscribe(); };
  }, []);

  const {
    styledBackgroundColour,
    styledHeight,
    styledWidth,
    styledTranslate,
    score,
  } = targetProps;
  return (
    <TargetStyled
      id="target"
      styledBackgroundColour={styledBackgroundColour}
      styledHeight={styledHeight}
      styledWidth={styledWidth}
      styledTranslate={styledTranslate}
    >
      {score}
    </TargetStyled>
  );
};

export default Target;
