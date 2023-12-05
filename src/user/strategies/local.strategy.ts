import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  private readonly logger = new Logger(LocalStrategy.name);
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      this.logger.debug(` ${username} not found!`);
      throw new UnauthorizedException();
    }
    this.logger.debug(` ${username} found!`);

    if (!bcrypt.compareSync(password, user['password'])) {
      this.logger.debug(`Invalid credentials for user ${username}`);
      throw new UnauthorizedException();
    }

    return user;
  }
}
