import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@carmaconcierge.com' },
    update: {},
    create: {
      email: 'admin@carmaconcierge.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      password: customerPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'CUSTOMER',
      phone: '+44123456789',
    },
  });
  console.log('✅ Created customer user:', customer.email);

  // Create supplier user
  const supplierPassword = await bcrypt.hash('supplier123', 10);
  const supplierUser = await prisma.user.upsert({
    where: { email: 'supplier@example.com' },
    update: {},
    create: {
      email: 'supplier@example.com',
      password: supplierPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'SUPPLIER',
      phone: '+44987654321',
    },
  });

  // Create supplier profile
  const supplier = await prisma.supplier.upsert({
    where: { userId: supplierUser.id },
    update: {},
    create: {
      userId: supplierUser.id,
      email: supplierUser.email,
      businessName: 'Quick Fix Auto',
      type: 'GARAGE',
      address: '123 High Street',
      city: 'London',
      postcode: 'SW1A 1AA',
      phone: '+44987654321',
      specialties: ['MOT', 'Servicing', 'Brakes'],
      isVerified: true,
      rating: 4.5,
      reviewCount: 25,
    },
  });
  console.log('✅ Created supplier:', supplier.businessName);

  // Create vehicle
  const vehicle = await prisma.vehicle.create({
    data: {
      userId: customer.id,
      make: 'Toyota',
      model: 'Corolla',
      year: 2020,
      registrationNumber: 'AB12 CDE',
      vin: '1HGBH41JXMN109186',
      type: 'CAR',
      fuelType: 'PETROL',
      mileage: 25000,
      color: 'Silver',
    },
  });
  console.log('✅ Created vehicle:', vehicle.registrationNumber);

  // Create job
  const job = await prisma.job.create({
    data: {
      userId: customer.id,
      vehicleId: vehicle.id,
      type: 'MOT',
      status: 'PENDING',
      description: 'Annual MOT test required',
      priority: 'HIGH',
      location: 'London',
      scheduledDate: new Date('2024-03-15'),
    },
  });
  console.log('✅ Created job:', job.id);

  // Create quote
  const quote = await prisma.quote.create({
    data: {
      jobId: job.id,
      supplierId: supplier.id,
      status: 'PENDING',
      totalAmount: 54.85,
      validUntil: new Date('2024-03-20'),
      notes: 'Standard MOT test',
      items: {
        create: [
          {
            description: 'MOT Test',
            quantity: 1,
            unitPrice: 54.85,
            total: 54.85,
          },
        ],
      },
    },
  });
  console.log('✅ Created quote:', quote.id);

  console.log('✨ Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
