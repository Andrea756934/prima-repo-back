export class userExistsError extends Error {
  constructor() {
    super();
    this.name = 'userExists';
    this.message = 'username already in use';
  }
}