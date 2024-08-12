// src/components/GoogleOAuthProvider.tsx

import React from 'react';
import { GoogleOAuthProvider as Provider } from '@react-oauth/google';

const GoogleOAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const clientId =
    "502902386423-eqvoa78b9bfe87cqg7dulc755ib4id0a.apps.googleusercontent.com"; 
  return <Provider clientId={clientId}>{children}</Provider>;
};

export default GoogleOAuthProvider;
