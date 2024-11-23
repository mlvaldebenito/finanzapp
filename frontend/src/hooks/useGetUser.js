import { useQuery } from '@apollo/client';
import { useEffect } from 'react';
import { GET_USER } from '../graphql/querys';
import useIsLogged from './useIsLogged';

const useGetUser = (onCompleted = () => {}) => {
  const isLogged = useIsLogged();
  const { data, loading, refetch, error } = useQuery(GET_USER, {
    onCompleted,
    onError: () => setTimeout(refetch, 1500),
  });
  useEffect(() => {
    if (!error && isLogged && !loading && !data?.getUser) {
      refetch();
    }
  }, [loading, isLogged, data]);
  return data?.getUser;
};

export default useGetUser;
