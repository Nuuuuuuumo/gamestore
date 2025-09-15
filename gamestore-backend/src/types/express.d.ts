import { User } from 'src/entities/user.entity.ts';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
