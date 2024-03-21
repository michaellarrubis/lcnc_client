import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useContent = () => {
  const [isSidebarOpen, setSidebarState] = useState(true);

  const location = useLocation();
  const currentUser = useSelector(({ user }) => user.user);

  return {
    location,
    currentUser,
    isSidebarOpen,
    setSidebarState
  };
};
