import { FC, useState, useEffect } from 'react';
import {
  fromEvent, interval, map, scan, switchMap, takeWhile, tap,
} from 'rxjs';
import {
  initialGameState, isGameContinue, StateModel, updateGameState,
} from '../../state/state';
import { getRandomColour, getRandomNumber } from '../../util/helpers';
import { TargetStyled, WrapperStyled } from './styled/GameStyled';
import Timer from './components/Timer';

const Game: FC = () => {
  const [targetProps, setTargetProps] = useState({
    styledHeight: '36px',
    styledWidth: '36px',
    styledTranslate: 'none',
    styledBackgroundColour: 'coral',
    score: 0,
  });
  const [countdown, setCountdown] = useState<string | number>(10);

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
    .pipe(
      map((time) => +countdown - time),
      tap((timeRemaining) => setCountdown(timeRemaining)),
    );

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
    const subscription = myObservable.subscribe({
      complete: () => setCountdown('GAME OVER'),
    });
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
    <WrapperStyled>
      <TargetStyled
        id="target"
        styledBackgroundColour={styledBackgroundColour}
        styledHeight={styledHeight}
        styledWidth={styledWidth}
        styledTranslate={styledTranslate}
      >
        {score}
      </TargetStyled>
      <Timer countdown={countdown} />
    </WrapperStyled>
  );
};

export default Game;
