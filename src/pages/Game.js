import React from 'react';
import Header from '../components/Header';
import CardGame from '../components/CardGame';
import imageBackgound from './../assets/imageBackground.jpeg'

class Game extends React.Component {
  render() {
    return (
    <div className=' relative h-screen w-screen'>
      <div className='bg-black text-white w-screen h-screen flex items-center justify-center bg-cover blur'
      style={{ backgroundImage: `url(${imageBackgound})`}}></div>
        <div className='absolute mx-auto w-3/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
          <div className='flex items-center justify-center text-center mt-5'>
            <div className='flex flex-col items-center justify-center w-full'>
              <div className='mb-2 flex items-center justify-center'>
                <Header />
              </div>
              <div className='bg-black bg-opacity-80 h-96 w-full px-5 py-2 text-xl rounded-2xl text-white'>
                <CardGame {...this.props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
