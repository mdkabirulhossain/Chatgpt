import { useState } from 'react'
import './App.css'
import logo from './assets/chatgpt.svg'
import addimg from './assets/add-30.png'
import msgicon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import gptlogo from './assets/chatgptLogo.svg'
import send from './assets/send.svg'
import { sendMsgToOpenAI } from './openAI'

function App() {

  const [input, setInput] = useState("");

  const handleSend = async() =>{
    const res = await sendMsgToOpenAI(input);
    console.log(res);
  }

  return (
    <div className='min-h-screen flex'>
      <div className="sidebar w-96 flex flex-col  gap-0 border-r border-r-red-50">
        <div className="uperSide p-10 h-2/3 ">
          <div className='flex gap-1 items-center mb-10'>
            <img src={logo} alt="" />
            <span className='text-3xl'>ChatGPT</span>
          </div>
          <button className='flex gap-1 p-3 items-center justify-center w-full mx-auto rounded-md bg-[#5A4BFF] mb-12'><img src={addimg} className='w-7 h-7' alt="" /><span className='text-xl'>New Chat</span></button>
          <div className='flex flex-col gap-2'>
            <button className='flex gap-4 items-center p-6 rounded-md border border-[rgba(98,98,98,1)]'><img src={msgicon} alt="" /> What is Programming ?</button>
            <button className='flex gap-4 items-center p-6 rounded-md border border-[rgba(98,98,98,1)]'><img src={msgicon} alt="" /> How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide p-10 border-t border-t-red-50">
          <div className='flex gap-4 items-center m-3 py-1'><img src={home} className='min-w-5' alt="" />Home</div>
          <div className='flex gap-4 items-center m-3 py-1'><img src={saved} className='min-w-5' alt="" />Saved</div>
          <div className='flex gap-4 items-center m-3 py-1'><img src={upgrade} className='min-w-5' alt="" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main flex-1 flex flex-col mx-20 my-10">
        <div className='chats overflow-hidden overflow-y-scroll scroll-smooth w-full h-[calc(100vh_-_17rem)]'>
          <div className="flex ">
            {/* <img src={logo} alt="" /> */}
            <h3 className='mx-auto text-2xl'>Where should we begin?</h3>
          </div>
          <div className="chat flex items-start gap-2 mt-6 p-3 rounded-md bg-[#1c1e3a]">
            <img src={gptlogo} className='w-6 h-6' alt="" />
            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat ipsam eveniet suscipit incidunt non sit atque ipsa ratione, illum nam veniam? In architecto est repellendus nemo eaque voluptatem quas modi quisquam quod veritatis itaque, accusamus tempora facilis dolorem rem commodi culpa? Molestiae quis quibusdam repellat harum earum porro adipisci!</p>
          </div>

        </div>
        <div className='chatFooter mt-auto w-full flex items-center justify-center p-4 rounded-md bg-[#1c1e3a]'>
          <input className='w-full outline-none ' type="text" placeholder='Send a message'
          value={input} onChange={(e) => setInput(e.target.value)}

          />
          <button className='cursor-pointer' onClick={handleSend}><img src={send} alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default App
