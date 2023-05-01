import React from 'react'
import '../../../css/play-button.css'

function PlayButton({ play, isPlaying }) {
  return (
    <>
      <div className="circle">
        <span onClick={play} className="circle__btn">
          <img className={isPlaying ? 'pause' : 'play'} src="assets/images/pause.svg" alt="" />
          <img className={isPlaying ? 'play' : 'pause'} src="assets/images/play.svg" alt="" />
        </span>
        <span className={isPlaying ? 'circle__back-1' : 'circle__back-1 paused'}></span>
        <span className={isPlaying ? 'circle__back-2' : 'circle__back-2 paused'}></span>
      </div>
    </>
  )
}

export default PlayButton
