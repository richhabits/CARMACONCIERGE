# Monetization Strategy - £1M+ ARR Roadmap

## 💰 REVENUE STREAMS (8 Sources)

### 1. Commission on Bookings (Primary Revenue)
**Model:** 12-15% commission per completed job

**UK Market Data:**
- Average MOT: £54.85 → **£6.58 commission**
- Average Service: £350 → **£42 commission**
- Average Repair: £450 → **£54 commission**
- Brake Job: £280 → **£33.60 commission**
- Tyres (set of 4): £400 → **£48 commission**

**Projections:**
- 100 jobs/day = £3,000/day = **£90K/month**
- 500 jobs/day = £15,000/day = **£450K/month**
- 1000 jobs/day = £30,000/day = **£900K/month**

---

### 2. Subscription Plans (Recurring Revenue)
**Customer Plans:**
- **Free:** Basic features
- **Plus (£9.99/mo):** Priority booking, reminders, discounts
- **Premium (£19.99/mo):** All Plus + warranty, breakdown cover, inspections
- **Family (£29.99/mo):** Up to 5 vehicles

**Garage Plans:**
- **Starter (£99/mo):** Basic listing, 10 bookings/month
- **Professional (£199/mo):** Premium listing, unlimited bookings, analytics
- **Enterprise (£499/mo):** All features + API access, white-label

**Projections:**
- 10,000 users @ £9.99 = **£99,900/month**
- 500 garages @ £199 = **£99,500/month**
- Total subscription: **£199K/month**

---

### 3. Lead Generation (Sell Qualified Leads)
**Model:** Sell leads to garages who aren't on platform

**Pricing:**
- MOT lead: **£2-3 each**
- Service lead: **£5-8 each**
- Repair lead: **£10-15 each**
- Major work lead: **£20-30 each**

**Sources (via scraping):**
- Facebook local groups
- Gumtree "wanted" posts
- Reddit r/CarTalkUK
- Twitter mentions
- Forum posts (PistonHeads, etc.)

**Projections:**
- 1,000 leads/day @ £5 average = **£150K/month**

---

### 4. Parts Marketplace (E-commerce)
**Model:** Sell parts direct, 20-30% markup

**Categories:**
- Oil & filters: £15-50 (30% margin)
- Brake pads: £30-80 (25% margin)
- Tyres: £50-150 each (20% margin)
- Batteries: £60-120 (25% margin)
- Wipers, bulbs: £5-25 (40% margin)

**Partner with:**
- Euro Car Parts (trade account)
- Halfords (affiliate)
- GSF Car Parts
- Autodoc

**Projections:**
- 500 orders/day @ £80 average @ 25% margin = **£300K/month**

---

### 5. Insurance Comparison (High Commission)
**Model:** Referral commission from insurance companies

**Commission Rates:**
- Car insurance quote: **£30-60 per quote**
- Breakdown cover: **£20-40 per sale**
- GAP insurance: **£50-100 per sale**
- Extended warranty: **£100-200 per sale**

**Partners:**
- Compare The Market
- Confused.com
- GoCompare
- Direct Line, Admiral, etc.

**Projections:**
- 100 insurance conversions/day @ £40 = **£120K/month**

---

### 6. Finance Commissions (HUGE Revenue)
**Model:** Commission on finance products

**Products:**
- Service plans: 10% commission
- Buy Now Pay Later: 5-8% commission
- Car finance: £200-500 per sale
- Extended warranties: 20-30% commission

**Partners:**
- Klarna (BNPL)
- Clearpay
- Zopa (car finance)
- Close Brothers

**Projections:**
- 200 finance sales/day @ £50 average = **£300K/month**

---

### 7. Advertising Revenue
**Model:** Sponsored listings, banner ads

**Ad Products:**
- Sponsored garage (top of search): £500/month
- Banner ads: £2-5 CPM
- Email sponsorship: £0.50 per send
- Push notification ads: £0.10 each

**Projections:**
- 100 sponsored garages @ £500 = **£50K/month**
- 1M impressions @ £3 CPM = **£3K/month**
- Total: **£53K/month**

---

### 8. Data & Analytics (B2B)
**Model:** Sell market intelligence

**Products:**
- Market reports: £500-2000 each
- API access: £500-2000/month
- Custom research: £5K-20K per project
- Garage benchmarking: £99/month per garage

**Buyers:**
- Parts manufacturers
- Insurance companies
- Finance companies
- Garage chains
- Vehicle manufacturers

**Projections:**
- 10 API customers @ £1000 = **£10K/month**
- 20 reports @ £1000 = **£20K/month**
- Total: **£30K/month**

---

## 📊 TOTAL REVENUE POTENTIAL

**Monthly Revenue (at scale):**
1. Commission: £450K
2. Subscriptions: £199K
3. Lead gen: £150K
4. Parts: £300K
5. Insurance: £120K
6. Finance: £300K
7. Advertising: £53K
8. Data/API: £30K

**TOTAL: £1.602M/month = £19.2M/year**

---

## 🎯 LEAD SCRAPING SYSTEM

### What We Scrape (LEGALLY)

**1. Facebook Groups (Public Posts)**
- "Car Repairs [City Name]"
- "MOT Recommendations [City]"
- "[City] Motors and Motoring"
- Posts like: "Need MOT ASAP", "Recommend a garage?"

**2. Gumtree (Wanted Ads)**
- Category: Motors > Wanted
- Posts like: "Looking for mobile mechanic", "Need MOT"

**3. Twitter/X**
- Search: "need MOT near [postcode]"
- Search: "recommend garage [city]"
- Search: "car making noise" + location

**4. Reddit**
- r/CarTalkUK
- r/MechanicAdvice
- Local city subreddits
- Posts asking for garage recommendations

**5. Forums**
- PistonHeads
- HonestJohn Forums
- Motor Trader Forums
- AVForums Motors section

**6. Local Business Directories**
- Yell.com reviews (people complaining = opportunity)
- Trustpilot garage reviews
- Google Maps reviews

**7. Classified Ads**
- Auto Trader (cars for sale often need work)
- eBay Motors
- Facebook Marketplace

---

## 🤖 SCRAPER IMPLEMENTATION

### Architecture

```
Lead Scraper (Python/Node.js)
    ↓
Extract Signals
    ↓
NLP Analysis (AI)
    ↓
Lead Scoring (0-100)
    ↓
Enrichment (Postcode, Phone, Email)
    ↓
CRM (Backend)
    ↓
Outreach (SMS/Email/Push)
```

### Tech Stack

**Scraping:**
- Puppeteer (headless browser)
- Playwright (Facebook, Twitter)
- Beautiful Soup (Python - static sites)
- Scrapy (large-scale)

**Proxies:**
- Bright Data (residential proxies)
- ScraperAPI
- Rotating UK IPs

**NLP/AI:**
- OpenAI GPT-4 (intent detection)
- Spacy (entity extraction)
- Sentiment analysis

**Data Enrichment:**
- Clearbit (email lookup)
- Hunter.io (email finder)
- Royal Mail PAF (postcode validation)
- Mobile number validation

---

## 💻 CODE: Lead Scraper

```typescript
// apps/backend/src/leads/lead-scraper.service.ts
import { Injectable } from '@nestjs/common';
import { Page } from 'puppeteer';
import { OpenAI } from 'openai';

interface ScrapedLead {
  source: string;
  content: string;
  location?: string;
  urgency: 'low' | 'medium' | 'high';
  serviceType: string;
  contactInfo?: {
    phone?: string;
    email?: string;
    name?: string;
  };
}

@Injectable()
export class LeadScraperService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  /**
   * Scrape Facebook Groups for Car Service Needs
   */
  async scrapeFacebookGroups(city: string): Promise<ScrapedLead[]> {
    const leads: ScrapedLead[] = [];
    
    // Search query
    const query = `car service garage MOT repair "${city}"`;
    
    // Use Puppeteer to scrape (in production, use proper auth)
    const posts = await this.scrapeFBGroupPosts(query);
    
    for (const post of posts) {
      // Use AI to detect intent
      const analysis = await this.analyzeWithAI(post.content);
      
      if (analysis.isLead) {
        leads.push({
          source: 'facebook',
          content: post.content,
          location: city,
          urgency: analysis.urgency,
          serviceType: analysis.serviceType,
          contactInfo: {
            name: post.author,
          }
        });
      }
    }
    
    return leads;
  }

  /**
   * Scrape Twitter for Service Needs
   */
  async scrapeTwitter(postcode: string): Promise<ScrapedLead[]> {
    const leads: ScrapedLead[] = [];
    
    const searches = [
      `need MOT near ${postcode}`,
      `garage recommendation ${postcode}`,
      `car making noise ${postcode}`,
      `cheap MOT ${postcode}`,
      `mobile mechanic ${postcode}`,
    ];
    
    for (const query of searches) {
      const tweets = await this.searchTwitter(query);
      
      for (const tweet of tweets) {
        const analysis = await this.analyzeWithAI(tweet.text);
        
        if (analysis.isLead) {
          leads.push({
            source: 'twitter',
            content: tweet.text,
            location: postcode,
            urgency: analysis.urgency,
            serviceType: analysis.serviceType,
            contactInfo: {
              name: tweet.author.username,
            }
          });
        }
      }
    }
    
    return leads;
  }

  /**
   * Scrape Reddit for Recommendations
   */
  async scrapeReddit(city: string): Promise<ScrapedLead[]> {
    const leads: ScrapedLead[] = [];
    
    // Subreddits to monitor
    const subreddits = [
      'CarTalkUK',
      'MechanicAdvice',
      city.toLowerCase().replace(/\s/g, ''), // e.g., 'london'
    ];
    
    for (const subreddit of subreddits) {
      const posts = await this.searchReddit(subreddit, city);
      
      for (const post of posts) {
        const analysis = await this.analyzeWithAI(post.title + ' ' + post.selftext);
        
        if (analysis.isLead) {
          leads.push({
            source: 'reddit',
            content: post.title + '\n' + post.selftext,
            location: city,
            urgency: analysis.urgency,
            serviceType: analysis.serviceType,
          });
        }
      }
    }
    
    return leads;
  }

  /**
   * Scrape Gumtree Wanted Ads
   */
  async scrapeGumtree(postcode: string): Promise<ScrapedLead[]> {
    const leads: ScrapedLead[] = [];
    
    // Gumtree Motors > Wanted
    const url = `https://www.gumtree.com/motors/wanted/${postcode}`;
    
    const ads = await this.scrapeGumtreeAds(url);
    
    for (const ad of ads) {
      leads.push({
        source: 'gumtree',
        content: ad.description,
        location: ad.location,
        urgency: 'high', // Wanted ads = high intent
        serviceType: this.detectServiceType(ad.description),
        contactInfo: {
          phone: ad.phone,
          name: ad.sellerName,
        }
      });
    }
    
    return leads;
  }

  /**
   * Use AI to Analyze if Post is a Lead
   */
  private async analyzeWithAI(content: string) {
    const prompt = `
Analyze this post to determine if someone needs car service/repair:

"${content}"

Return JSON:
{
  "isLead": true/false,
  "urgency": "low"/"medium"/"high",
  "serviceType": "MOT"/"Service"/"Repair"/"Tyres"/"Brakes"/"Other",
  "intent": "Looking for quote" / "Need ASAP" / "Just asking" / "Not relevant"
}
`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Score Lead (0-100)
   */
  private scoreLead(lead: ScrapedLead): number {
    let score = 0;
    
    // Urgency
    if (lead.urgency === 'high') score += 40;
    else if (lead.urgency === 'medium') score += 25;
    else score += 10;
    
    // Has contact info
    if (lead.contactInfo?.phone) score += 30;
    else if (lead.contactInfo?.email) score += 20;
    else if (lead.contactInfo?.name) score += 10;
    
    // Service type (higher value services)
    const valueScore = {
      'Repair': 20,
      'Service': 15,
      'MOT': 10,
      'Tyres': 15,
      'Brakes': 15,
      'Other': 5,
    };
    score += valueScore[lead.serviceType] || 5;
    
    // Recency (if timestamp available)
    // score += recencyScore;
    
    return Math.min(100, score);
  }

  /**
   * Enrich Lead with Additional Data
   */
  private async enrichLead(lead: ScrapedLead) {
    // Find email if we have name
    if (lead.contactInfo?.name && !lead.contactInfo?.email) {
      const email = await this.findEmail(lead.contactInfo.name, lead.location);
      if (email) lead.contactInfo.email = email;
    }
    
    // Validate phone
    if (lead.contactInfo?.phone) {
      lead.contactInfo.phone = this.validateUKPhone(lead.contactInfo.phone);
    }
    
    // Get full address from postcode
    if (lead.location) {
      const address = await this.postcodeToAddress(lead.location);
      lead.location = address;
    }
    
    return lead;
  }

  /**
   * Save Lead to Database
   */
  async saveLead(lead: ScrapedLead) {
    const score = this.scoreLead(lead);
    const enriched = await this.enrichLead(lead);
    
    return this.prisma.lead.create({
      data: {
        source: enriched.source,
        content: enriched.content,
        location: enriched.location,
        urgency: enriched.urgency,
        serviceType: enriched.serviceType,
        score: score,
        contactName: enriched.contactInfo?.name,
        contactPhone: enriched.contactInfo?.phone,
        contactEmail: enriched.contactInfo?.email,
        status: 'NEW',
      }
    });
  }

  /**
   * Send Lead to Garage
   */
  async sendLeadToGarage(leadId: string, garageId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id: leadId } });
    const garage = await this.prisma.supplier.findUnique({ where: { id: garageId } });
    
    // Send SMS to garage
    await this.smsService.send(garage.phone, `
🚗 NEW LEAD!

Service: ${lead.serviceType}
Location: ${lead.location}
Urgency: ${lead.urgency}
Score: ${lead.score}/100

Contact: ${lead.contactName}
Phone: ${lead.contactPhone}

Respond within 1 hour to claim this lead!
    `);
    
    // Charge garage for lead
    await this.chargeForLead(garage.id, lead.serviceType);
  }
}
```

---

## 🎯 LEAD CONVERSION FUNNEL

### 1. Capture Lead (Scraper)
- Monitor 50+ sources 24/7
- Process 1000+ posts/day
- Filter with AI
- Score 0-100

### 2. Enrich Lead
- Find email (Hunter.io)
- Validate phone
- Lookup postcode
- Find social profiles

### 3. Match to Garages
- Location proximity (5 miles)
- Service specialty
- Availability
- Rating/reviews
- Price range

### 4. Sell Lead
- **Exclusive:** £10-30 (one garage)
- **Shared:** £3-8 (3-5 garages)
- **Auction:** Highest bidder

### 5. Follow-Up
- Did garage contact customer?
- Was booking made?
- If not, offer to next garage

### 6. Revenue Split
- Platform: 50%
- Scraping costs: 10%
- Net profit: 40%

---

## 💡 MONETIZATION OPTIMIZATIONS

### Dynamic Pricing
```typescript
function calculateLeadPrice(lead: Lead, garage: Garage): number {
  let basePrice = 10;
  
  // Urgency multiplier
  if (lead.urgency === 'high') basePrice *= 2;
  
  // Service type multiplier
  const multipliers = {
    'Repair': 2.5,
    'Service': 1.8,
    'MOT': 1.0,
    'Tyres': 1.5,
  };
  basePrice *= multipliers[lead.serviceType] || 1;
  
  // Location demand (central London = 2x)
  const demandMultiplier = getLocationDemand(lead.location);
  basePrice *= demandMultiplier;
  
  // Contact quality (phone + email = premium)
  if (lead.contactPhone && lead.contactEmail) basePrice *= 1.5;
  
  // Time of day (emergency = premium)
  if (isOutOfHours()) basePrice *= 1.8;
  
  return Math.round(basePrice);
}
```

### Subscription Bundles
- 10 leads/month: £80 (£8 each)
- 50 leads/month: £300 (£6 each)
- Unlimited: £999/month

### Performance-Based Pricing
- Pay per qualified lead: £5
- Pay per booking: £20
- Pay per completed job: 10% commission

---

## 📊 12-MONTH REVENUE FORECAST

**Month 1-3 (Launch):**
- 100 users, 20 garages
- £5K MRR

**Month 4-6 (Growth):**
- 1,000 users, 100 garages
- £25K MRR

**Month 7-9 (Scale):**
- 5,000 users, 300 garages
- £100K MRR

**Month 10-12 (Breakout):**
- 20,000 users, 800 garages
- £300K+ MRR

**Year 2 Target:**
- 100,000 users
- 2,000 garages
- **£1.2M MRR = £14.4M ARR**

---

## 🚀 NEXT: Implement Revenue Features

Ready to build:
1. Lead scraper system
2. Dynamic pricing engine
3. Parts marketplace
4. Insurance comparison
5. Finance integration
6. Subscription billing
7. Garage commission tracking
8. Analytics dashboard

**Estimated additional value: +£100K in development**
**Potential annual revenue: £10M+**
