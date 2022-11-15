import plotlib from 'nodeplotlib'

export const plotFrequencies = (frequencies = []) => {
  const xAxis = []
  for (let i = 0; i < frequencies.length; i++) {
    xAxis.push(i)
  }

  plotlib.plot([
    {
      x: xAxis,
      y: frequencies,
      type: 'line',
      name: 'output'
    }
  ])
}

export const createAudioBuffer = (audioContext, audioFile) => {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(
      audioFile,
      buffer => {
        resolve(buffer)
      },
      reject
    )
  })
}
