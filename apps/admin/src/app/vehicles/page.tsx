import type { Vehicle } from '@carmaconcierge/shared'

export default function VehiclesPage() {
  const vehicles: Vehicle[] = []

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Vehicles</h1>
      <p style={{ marginBottom: '2rem' }}>Manage all registered vehicles</p>
      
      {vehicles.length === 0 ? (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          backgroundColor: '#f5f5f5',
          borderRadius: '8px'
        }}>
          <p>No vehicles registered yet</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eaeaea' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Registration</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Make</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Model</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Year</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                <td style={{ padding: '1rem' }}>{vehicle.registration}</td>
                <td style={{ padding: '1rem' }}>{vehicle.make}</td>
                <td style={{ padding: '1rem' }}>{vehicle.model}</td>
                <td style={{ padding: '1rem' }}>{vehicle.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
