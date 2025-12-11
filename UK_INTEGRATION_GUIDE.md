# UK Government API Integration Guide

## 🇬🇧 Official FREE UK APIs

### 1. DVLA Vehicle Enquiry Service (FREE!)

**Official API:** https://developer-portal.driver-vehicle-licensing.api.gov.uk/

**What It Provides:**
- Make, model, color
- Year of manufacture
- Fuel type
- Engine size (cc)
- CO2 emissions
- Tax status (taxed/SORN)
- Tax due date
- MOT status
- MOT expiry date

**How to Get Access:**
1. Register at DVLA Developer Portal
2. Get API key (instant, free)
3. Rate limit: 10 requests/second

**Example Request:**
```http
GET /vehicle-enquiry/v1/vehicles
Headers:
  x-api-key: YOUR_KEY_HERE
  Content-Type: application/json
Body:
{
  "registrationNumber": "AB12CDE"
}
```

**Response:**
```json
{
  "registrationNumber": "AB12CDE",
  "taxStatus": "Taxed",
  "taxDueDate": "2024-06-01",
  "motStatus": "Valid",
  "make": "TOYOTA",
  "yearOfManufacture": 2020,
  "engineCapacity": 1998,
  "co2Emissions": 140,
  "fuelType": "PETROL",
  "colour": "SILVER",
  "typeApproval": "M1"
}
```

---

### 2. DVSA MOT History API (FREE!)

**Official API:** https://documentation.history.mot.api.gov.uk/

**What It Provides:**
- Full MOT history
- Test date, result, mileage
- Advisories, minors, majors, dangerous
- Test station details
- Expiry date

**How to Get Access:**
1. Email: MOTHistoryAPI@dvsa.gov.uk
2. Request API key (takes 1-2 days)
3. Rate limit: 10 requests/second

**Example Request:**
```http
GET /trade/vehicles/mot-tests
Headers:
  x-api-key: YOUR_KEY_HERE
Params:
  registration=AB12CDE
```

**Response:**
```json
[
  {
    "completedDate": "2023-05-15",
    "testResult": "PASSED",
    "expiryDate": "2024-05-14",
    "odometerValue": "45678",
    "odometerUnit": "mi",
    "motTestNumber": "1234567890",
    "rfrAndComments": [
      {
        "text": "Nearside front tyre worn close to legal limit",
        "type": "ADVISORY"
      }
    ]
  }
]
```

---

### 3. DVSA Vehicle Recalls API (FREE!)

**Official API:** https://www.gov.uk/check-vehicle-recall

**What It Provides:**
- Active safety recalls
- Manufacturer campaigns
- Recall details and fix info

**Example:**
```http
GET /vehicle-recalls/v1/vehicles/AB12CDE/recalls
```

---

### 4. Transport for London (TfL) API (FREE!)

**Official API:** https://api.tfl.gov.uk/

**What It Provides:**
- ULEZ compliance check
- Congestion charge zone
- Daily charge amounts
- Exemptions

**How to Get Access:**
1. Register at TfL API portal
2. Get app_id and app_key (instant, free)
3. Rate limit: 300 requests/hour

**ULEZ Check:**
```http
GET /Vehicle/UlezCompliance
Params:
  vrm=AB12CDE
```

**Response:**
```json
{
  "vrm": "AB12CDE",
  "isCompliant": false,
  "isRetrofit": false,
  "isExempt": false,
  "compliance": {
    "ulez": false,
    "lez": true
  }
}
```

---

## 🛠️ Implementation Plan

### Step 1: Create Real UK Services

```typescript
// apps/backend/src/uk-government/dvla.service.ts
import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class DVLAService {
  private readonly apiKey = process.env.DVLA_API_KEY;
  private readonly baseUrl = 'https://driver-vehicle-licensing.api.gov.uk';

  async getVehicleDetails(registration: string) {
    const response = await this.http.post(
      `${this.baseUrl}/vehicle-enquiry/v1/vehicles`,
      { registrationNumber: registration },
      {
        headers: {
          'x-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      registration: response.data.registrationNumber,
      make: response.data.make,
      model: response.data.model || 'Unknown',
      year: response.data.yearOfManufacture,
      fuelType: response.data.fuelType,
      color: response.data.colour,
      engineSize: response.data.engineCapacity,
      co2: response.data.co2Emissions,
      taxStatus: response.data.taxStatus,
      taxDue: response.data.taxDueDate,
      motStatus: response.data.motStatus,
      motExpiry: response.data.motExpiryDate,
    };
  }
}
```

```typescript
// apps/backend/src/uk-government/dvsa.service.ts
@Injectable()
export class DVSAService {
  private readonly apiKey = process.env.DVSA_API_KEY;
  private readonly baseUrl = 'https://history.mot.api.gov.uk';

  async getMOTHistory(registration: string) {
    const response = await this.http.get(
      `${this.baseUrl}/trade/vehicles/mot-tests`,
      {
        params: { registration },
        headers: { 'x-api-key': this.apiKey },
      }
    );

    return response.data.map(test => ({
      date: test.completedDate,
      result: test.testResult,
      mileage: parseInt(test.odometerValue),
      expiryDate: test.expiryDate,
      advisories: test.rfrAndComments.filter(c => c.type === 'ADVISORY'),
      minors: test.rfrAndComments.filter(c => c.type === 'MINOR'),
      majors: test.rfrAndComments.filter(c => c.type === 'MAJOR'),
      dangerous: test.rfrAndComments.filter(c => c.type === 'DANGEROUS'),
    }));
  }

  async getRecalls(registration: string) {
    // Implementation for recalls check
  }
}
```

```typescript
// apps/backend/src/uk-government/tfl.service.ts
@Injectable()
export class TfLService {
  async checkULEZ(registration: string) {
    const response = await this.http.get(
      'https://api.tfl.gov.uk/Vehicle/UlezCompliance',
      {
        params: {
          vrm: registration,
          app_id: process.env.TFL_APP_ID,
          app_key: process.env.TFL_APP_KEY,
        },
      }
    );

    return {
      ulezCompliant: response.data.isCompliant,
      lezCompliant: response.data.compliance.lez,
      dailyCharge: response.data.isCompliant ? 0 : 12.50,
      isExempt: response.data.isExempt,
    };
  }
}
```

---

### Step 2: Add to Environment

```env
# UK Government APIs (ALL FREE!)
DVLA_API_KEY="your-dvla-key-here"
DVSA_API_KEY="your-dvsa-key-here"
TFL_APP_ID="your-tfl-app-id"
TFL_APP_KEY="your-tfl-app-key"
```

---

### Step 3: Update Vehicle Controller

```typescript
@Get('uk/lookup-real/:registration')
async lookupVehicleReal(@Param('registration') registration: string) {
  // Get data from REAL DVLA API
  const vehicleData = await this.dvlaService.getVehicleDetails(registration);
  
  // Get MOT history from REAL DVSA API
  const motHistory = await this.dvsaService.getMOTHistory(registration);
  
  // Check ULEZ compliance
  const ulezStatus = await this.tflService.checkULEZ(registration);
  
  // Check for recalls
  const recalls = await this.dvsaService.getRecalls(registration);
  
  return {
    ...vehicleData,
    motHistory,
    ulezStatus,
    recalls,
  };
}
```

---

## 🎯 What This Fixes

**Before:** Mock/fake data
**After:** Real government data, legally authoritative

**Benefits:**
1. ✅ **Legal compliance** - Official data sources
2. ✅ **User trust** - Gov.uk verified
3. ✅ **Accuracy** - Always up to date
4. ✅ **Free** - No API costs
5. ✅ **Fast** - Cached for 24 hours

---

## 📞 How to Get Keys

### DVLA Vehicle Enquiry
1. Visit: https://developer-portal.driver-vehicle-licensing.api.gov.uk/
2. Click "Sign Up"
3. Verify email
4. Create application
5. Get API key (instant)

### DVSA MOT History
1. Email: MOTHistoryAPI@dvsa.gov.uk
2. Subject: "API Key Request"
3. Include:
   - Business name
   - Purpose (vehicle history lookup)
   - Website URL
4. Receive key in 1-2 business days

### TfL (for ULEZ)
1. Visit: https://api-portal.tfl.gov.uk/
2. Register account
3. Create app
4. Get app_id and app_key (instant)

---

## ⚠️ Rate Limits & Caching

**DVLA:** 10 req/sec (very generous)
**DVSA:** 10 req/sec
**TfL:** 300 req/hour

**Solution: Cache for 24 hours**
- Vehicle data changes rarely
- MOT changes annually
- Tax changes annually
- Massive cost saving

---

## 🚀 Next: Scale Up with Real Data

Once we have these APIs integrated, we can add:
- Real-time MOT expiry alerts
- ULEZ zone warnings
- Tax renewal reminders
- Recall notifications
- Insurance group lookup
- Service interval recommendations

**All with OFFICIAL UK government data!**
