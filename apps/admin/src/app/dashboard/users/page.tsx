'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../dashboard.module.css';

export default function UsersPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      router.push('/login');
    } else if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.navHeader}>
          <h2>CARMACONCIERGE</h2>
        </div>
        <div className={styles.navLinks}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/dashboard/users" className={styles.navLink}>Users</Link>
          <Link href="/dashboard/vehicles" className={styles.navLink}>Vehicles</Link>
          <Link href="/dashboard/jobs" className={styles.navLink}>Jobs</Link>
          <Link href="/dashboard/quotes" className={styles.navLink}>Quotes</Link>
          <Link href="/dashboard/suppliers" className={styles.navLink}>Suppliers</Link>
          <Link href="/dashboard/messages" className={styles.navLink}>Messages</Link>
          <Link href="/dashboard/payments" className={styles.navLink}>Payments</Link>
        </div>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </nav>

      <main className={styles.main}>
        <div className={styles.header}>
          <h1>Users Management</h1>
          <p>View and manage all users</p>
        </div>

        <div style={{ background: 'white', padding: '30px', borderRadius: '12px' }}>
          <p>Users list will be displayed here. Connect to API to load user data.</p>
        </div>
      </main>
    </div>
  );
}
