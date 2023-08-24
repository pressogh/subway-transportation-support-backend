import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoGuard extends AuthGuard('kakao') {}
