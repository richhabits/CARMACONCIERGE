import { Injectable } from '@nestjs/common';

/**
 * INTERNATIONALIZATION (i18n) SERVICE
 * Supports multiple languages
 */
@Injectable()
export class I18nService {
  private translations = {
    en: {
      // English (UK)
      'app.name': 'CARMACONCIERGE',
      'app.tagline': 'Your Trusted Car Service Platform',
      'nav.home': 'Home',
      'nav.vehicles': 'Vehicles',
      'nav.jobs': 'Jobs',
      'nav.profile': 'Profile',
      'booking.mot': 'MOT Test',
      'booking.service': 'Service',
      'booking.repair': 'Repair',
      'reminder.mot': 'MOT Due',
      'reminder.service': 'Service Due',
      'reminder.tax': 'Tax Due',
      'reminder.insurance': 'Insurance Due',
      'price.vat': 'Incl. VAT',
      'common.book_now': 'Book Now',
      'common.get_quote': 'Get Quote',
      'common.call_us': 'Call Us',
    },
    cy: {
      // Welsh (Cymraeg)
      'app.name': 'CARMACONCIERGE',
      'app.tagline': 'Eich Platfform Gwasanaeth Car Dibynadwy',
      'nav.home': 'Cartref',
      'nav.vehicles': 'Cerbydau',
      'nav.jobs': 'Swyddi',
      'nav.profile': 'Proffil',
      'booking.mot': 'Prawf MOT',
      'booking.service': 'Gwasanaeth',
      'booking.repair': 'Atgyweirio',
    },
    pl: {
      // Polish (Common in UK)
      'app.name': 'CARMACONCIERGE',
      'app.tagline': 'Twoja Zaufana Platforma Serwisu Samochodowego',
      'nav.home': 'Strona główna',
      'nav.vehicles': 'Pojazdy',
      'nav.jobs': 'Prace',
      'nav.profile': 'Profil',
    },
    ur: {
      // Urdu (Common in UK)
      'app.name': 'CARMACONCIERGE',
      'app.tagline': 'آپ کا بھروسہ مند کار سروس پلیٹ فارم',
    },
  };

  translate(key: string, language: string = 'en'): string {
    return this.translations[language]?.[key] || this.translations['en'][key] || key;
  }

  t(key: string, language: string = 'en'): string {
    return this.translate(key, language);
  }

  getSupportedLanguages() {
    return Object.keys(this.translations);
  }
}
