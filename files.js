export const files = {
    'index.js': {
      file: {
        contents: `
  import express from 'express';
  const app = express();
  const port = 3111;
  
  app.get('/', (req, res) => {
    res.send('this thing works! yay');
  });
  
  app.listen(port, () => {
    console.log(\`App is live at http://localhost:\${port}\`);
  });`,
      },
    },
    'package.json': {
      file: {
        contents: `
  {
    "name": "kafka-web",
    "type": "module",
    "dependencies": {
      "express": "latest",
      "nodemon": "latest"
    },
    "scripts": {
      "start": "nodemon --watch './' index.js"
    }
  }`,
      },
    },
  };
  