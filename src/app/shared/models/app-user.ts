
export class AppUser {
  uid: string;
  name: string;
  email: string;
  isAdmin = false;

  constructor(init?: Partial<AppUser>) {
    Object.assign(this, init);
  }
}
