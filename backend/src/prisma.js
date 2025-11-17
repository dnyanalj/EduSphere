// import { PrismaClient } from '@prisma/client';
// i want old syntax
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;