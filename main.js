import './style.css'
import { WebContainer } from '@webcontainer/api';
import { files } from "./files";

let webcontainerInstance;

async function installDependencies() {
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);

  installProcess.output.pipeTo(new WritableStream({
    write(data) {
      console.log(data);
    }
  }));

  return installProcess.exit;
}

async function startDevServer() {
  await webcontainerInstance.spawn('npm', ['run', 'start']);

  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
}


window.addEventListener('load', async () => {
  textareaEl.value = files['index.js'].file.contents;

  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);

  const exitCode = await installDependencies();
  if (exitCode !== 0 ) {
    throw new Error('installation failed');
  };
  /* const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');*/
  /* console.log(packageJSON); */

  startDevServer();
});

document.querySelector('#app').innerHTML = `
  <div class="container">
    <div class="editor">
      <textarea>I am a textarea</textarea>
    </div>
    <div class="preview">
      <iframe src="loading.html"></iframe>
    </div>
  </div>
`
const iframeEl = document.querySelector('iframe');

const textareaEl = document.querySelector('textarea');