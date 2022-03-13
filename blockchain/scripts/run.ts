import { ethers } from 'hardhat'

const main = async () => {
  const [owner, randomPerson] = await ethers.getSigners()
  const waveContractFactory = await ethers.getContractFactory('WavePortal')
  const waveContract = await (
    await waveContractFactory.deploy({
      value: ethers.utils.parseEther('0.1'),
    })
  ).deployed()

  const contractBalance = await ethers.provider.getBalance(waveContract.address)

  console.log('Contract balance:', ethers.utils.formatEther(contractBalance))

  console.log('Contract deployed to:', waveContract.address)
  console.log('Contract deployed by:', owner.address)

  const initialWaveCount = await waveContract.totalwaves()

  // owner wave
  await (await waveContract.wave('this is wave #1')).wait()
  await (await waveContract.wave('this is wave #2')).wait()
  await (await waveContract.wave('this is wave #3')).wait()
  await (await waveContract.wave('this is wave #4')).wait()

  // random person wave
  await (
    await waveContract.connect(randomPerson).wave('random person has waved')
  ).wait()

  const updatedWaveCount = await waveContract.totalwaves()
  const allWaves = await waveContract.getAllWaves()

  console.log({ initialWaveCount })
  console.log({ updatedWaveCount })
  console.log({ allWaves })
}

const runMain = async () => {
  try {
    await main()
    process.exit(0) // exit Node process without error
  } catch (error) {
    console.log(error)
    process.exit(1) // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
}

runMain()
