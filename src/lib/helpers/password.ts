import bcrypt from 'bcrypt';

const hashPassword = (password: string) => bcrypt.hash(password, 10),
  validatePassword = (password: string, pashwordHash: string) =>
    bcrypt.compare(password, pashwordHash);

export { hashPassword, validatePassword };
