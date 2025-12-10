import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>CARMACONCIERGE Admin</h1>
        <p className={styles.description}>
          National Vehicle Management Platform - Admin Dashboard
        </p>

        <div className={styles.grid}>
          <Link href="/vehicles" className={styles.card}>
            <h2>Vehicles</h2>
            <p>Manage all registered vehicles</p>
          </Link>

          <Link href="/users" className={styles.card}>
            <h2>Users</h2>
            <p>Manage users and fleet managers</p>
          </Link>

          <Link href="/mot-records" className={styles.card}>
            <h2>MOT Records</h2>
            <p>View and manage MOT records</p>
          </Link>

          <Link href="/services" className={styles.card}>
            <h2>Service Records</h2>
            <p>Track vehicle service history</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
