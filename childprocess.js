const { spawn } = require('child_process')
const ls = spawn('ls', ['-lh', '/usr'])

// stdio -> o que eu quero fazer
ls.stdout.on('data', (data)=>{
  console.log(`stdout: ${data}` )
})

// se der erro
ls.stderr.on('data', (data)=>{
  console.log(`stderr: ${data}`)
})

ls.on('close', (code)=>{
  console.log('Processo em segundo plano finalizado com sucesso!' + code)
})