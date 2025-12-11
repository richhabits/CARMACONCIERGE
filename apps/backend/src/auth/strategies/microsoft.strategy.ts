import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-microsoft';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MicrosoftStrategy extends PassportStrategy(Strategy, 'microsoft') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('MICROSOFT_CLIENT_ID'),
      clientSecret: configService.get('MICROSOFT_CLIENT_SECRET'),
      callbackURL: configService.get('MICROSOFT_CALLBACK_URL') || 'http://localhost:3000/api/v1/auth/microsoft/callback',
      scope: ['user.read'],
      tenant: 'common',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    const { displayName, emails } = profile;
    const names = displayName.split(' ');
    
    const user = {
      email: emails[0].value,
      firstName: names[0],
      lastName: names.slice(1).join(' '),
      accessToken,
      refreshToken,
      provider: 'MICROSOFT',
    };
    done(null, user);
  }
}
