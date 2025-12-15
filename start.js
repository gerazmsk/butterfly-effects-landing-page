const { exec } = require('child_process');
const PORT = process.env.PORT || 3000;

console.log('='.repeat(50));
console.log('Starting static file server...');
console.log(`PORT environment variable: ${process.env.PORT || 'not set'}`);
console.log(`Using port: ${PORT}`);
console.log('='.repeat(50));

const command = `npx serve -s . -l ${PORT}`;
console.log(`Executing: ${command}`);

const serve = exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
});

serve.stdout.on('data', (data) => {
  console.log(data.toString());
});

serve.stderr.on('data', (data) => {
  console.error(data.toString());
});

serve.on('exit', (code) => {
  console.log(`Process exited with code ${code}`);
});

