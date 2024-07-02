import { useState } from 'react';

export default function Home() {
  const [badgeId, setBadgeId] = useState('');
  const [token, setToken] = useState('');
  const [authStatus, setAuthStatus] = useState('');

  const handleScan = async () => {

    const scannedBadgeId = 'badge123';

    setBadgeId(scannedBadgeId);

    
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ badgeId: scannedBadgeId }),
    });

    const data = await res.json();
    setToken(data.token);
  };

  const handleVerify = async () => {
    
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    setAuthStatus(data.valid ? 'Access Granted' : 'Access Denied');
  };

  return (
    <div>
      <h1>Badge Scanner</h1>
      <button onClick={handleScan}>Scan Badge</button>
      {badgeId && <p>Badge ID: {badgeId}</p>}
      {token && <p>JWT: {token}</p>}
      <button onClick={handleVerify}>Verify Access</button>
      {authStatus && <p>{authStatus}</p>}
    </div>
  );
}
