import { compare, hash } from 'bcryptjs';

const hashPassword = (password: string) => hash(password, 10),
  validatePassword = (password: string, pashwordHash: string) =>
    compare(password, pashwordHash);

export { hashPassword, validatePassword };
