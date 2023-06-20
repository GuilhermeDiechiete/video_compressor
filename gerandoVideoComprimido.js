const { spawn } = require('child_process') // importando spawn

const parent = process.argv[2]
let videos = []
if(process.argv[2]){
  const start = parseInt(process.argv[3])
  const end = parseInt(process.argv[4])

  for(let i = start; i <= end; i++){
    videos.push(i)
  }
  videos.reverse()
  processVideo() // essa função vai invocar o "recimencionarVideo"

} else {
  console.log('É necessario criar um diretorio de nivel superior')
}

function redimencionarVideo(video, qualidade){
  const p = new Promise((resolve, reject)=>{
    const ffmpeg = spawn('./ffmpeg-win64/bin/ffmpeg', [
      '-i',
      `${parent}/${video}.mp4`,
      '-codec:v',
      'libx264',
      '-profile:v',
      'main',
      '-preset',
      'slow',
      '-b:v',
      '400k',
      '-maxrate',
      '400k',
      '-bufsize',
      '800k',
      '-vf',
      `scale=-2:${qualidade}`,
      '-threads',
      '0',
      '-b:a',
      '128k',
      `${parent}/depositoDeVideos/${video}-${qualidade}.mp4`
    ])
    ffmpeg.stderr.on('data', (data)=>{
      console.log(data)
    })
    ffmpeg.on('close', (code)=>{
      resolve()
    })
  })
  return p
}

async function processVideo(){
  let video = videos.pop() // remove o elemento de um array retornando ele
  if(video){
    try{
      await redimencionarVideo(video, 720)
      await redimencionarVideo(video, 480)
      await redimencionarVideo(video, 360)

      console.log(`Videos renderizados - ${video}`)
      processVideo()
    }
    catch(e){
      console.log(e)
    }
  }
}