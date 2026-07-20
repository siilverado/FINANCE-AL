import { type sportInfo } from '../App/sportSlice';

import type ComplexType from './Complex.type';
import type User from './User.type';

export interface AppUser {
  user: {
    user: User;
  };
}

export interface appSport {
  sport: {
    sport: sportInfo[];
  };
}
export interface AppComplex {
  complex: {
    complex: ComplexType;
    hasComplex: boolean;
  };
}
