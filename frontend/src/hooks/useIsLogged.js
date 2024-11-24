import { useReactiveVar } from '@apollo/client';
import { refreshTokenVar } from '../graphql/reactive';

const useIsLogged = () => {
  const refreshToken = useReactiveVar(refreshTokenVar);
  return !!refreshToken;
};

export default useIsLogged;