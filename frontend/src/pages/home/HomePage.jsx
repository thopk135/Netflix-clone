import React from 'react'
import  {HomeScreen}  from './HomeScreen';
import  {AuthScreen}  from './AuthScreen';
import { useAuthStore } from '../../store/authUser';

export const HomePage = () => {
  const {user} = useAuthStore();
  return (
    <div>{ user? <HomeScreen/> : <AuthScreen/> }</div>
  )
}
