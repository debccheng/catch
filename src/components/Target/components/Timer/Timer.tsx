import { FC } from 'react';
import { TimerStyled } from './styled/TimerStyled';

type Props = {
  countdown: string | number;
}

const Timer: FC<Props> = ({ countdown }: Props) => {
  return (
    <TimerStyled>{ countdown }</TimerStyled>
  );
};

export default Timer;
