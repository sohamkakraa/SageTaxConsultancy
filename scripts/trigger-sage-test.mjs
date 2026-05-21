#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(
  new URL('../.testing-agent-demo/frontend/package.json', import.meta.url)
);
const { io } = require('socket.io-client');
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const constantsPath = join(root, '.testing-agent-demo/frontend/lib/constants.ts');
const constants = readFileSync(constantsPath, 'utf8');

const testCaseMatch = constants.match(/export const TEST_CASE = `([\s\S]*?)`;/);
const urlMatch = constants.match(/export const TEST_APP_URL = "(.*?)"/);
const userInfoMatch = constants.match(/export const USER_INFO = \{([\s\S]*?)\};/);

const testCase = testCaseMatch?.[1] ?? 'Test the homepage loads.';
const url = urlMatch?.[1] ?? 'http://localhost:3006';

const userInfo = {
  name: 'Test User',
  email: 'test@example.com',
  address: 'Dubai, UAE',
};

const socket = io('http://localhost:8000', { transports: ['websocket'] });

socket.on('connect', () => {
  console.log('Connected to CUA server, starting test…');
  socket.emit('testCaseInitiated', {
    testCase,
    url,
    userName: '',
    password: '',
    loginRequired: false,
    userInfo: JSON.stringify(userInfo),
  });
});

socket.on('message', (msg) => console.log('[agent]', msg));
socket.on('testcases', (data) => console.log('[testcases]', typeof data === 'string' ? data.slice(0, 200) : data));
socket.on('disconnect', () => console.log('Disconnected'));

setTimeout(() => {
  console.log('Test run window ended (15 min max).');
  socket.close();
  process.exit(0);
}, 15 * 60 * 1000);
