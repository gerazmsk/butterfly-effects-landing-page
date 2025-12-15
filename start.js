const { spawn } = require('child_process');
const PORT = process.env.PORT || 3000;

console.log(`Starting serve on port ${PORT}...`);

const serve = spawn('npx', ['serve', '-s', '.', '-l', PORT.toString()], {
  stdio: 'inherit',
  shell: true
});

serve.on('error', (err) => {
  console.error('Failed to start serve:', err);
  process.exit(1);
});

serve.on('exit', (code) => {
  console.log(`Serve exited with code ${code}`);
  process.exit(code);
});

