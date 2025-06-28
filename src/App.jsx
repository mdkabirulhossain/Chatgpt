import { useEffect, useRef, useState } from 'react'
import './App.css'
import logo from './assets/chatgpt.svg'
import addimg from './assets/add-30.png'
import msgicon from './assets/message.svg'
import home from './assets/home.svg'
import saved from './assets/bookmark.svg'
import upgrade from './assets/rocket.svg'
import gptlogo from './assets/chatgptLogo.svg'
import send from './assets/send.svg'
import userlogo from './assets/user-icon.png'
import { sendMsgToOpenAI } from './openAI'

function App() {

  const msgEnd = useRef(null)
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
      text: "Hi, I am chatGpt! How can I assist you?",
      isBot: true,
    }
  ])

  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  }, [message])

  const handleSend = async () => {
    const text = input;
    setInput('');
     setMessage(prev => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    console.log(res);
    setMessage(prev => [...prev, { text: res, isBot: true }]);
  }

  const handleEnter = async(e) =>{
    if(e.key === 'Enter') await handleSend();
  }

  const handleQuery = async(e) =>{
    const text = e.target.value;
    setInput('');
     setMessage(prev => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    console.log(res);
    setMessage(prev => [...prev, { text: res, isBot: true }]);
  }

  return (
    <div className='min-h-screen flex'>
      <div className="sidebar w-96 flex flex-col  gap-0 border-r border-r-red-50">
        <div className="uperSide p-10 h-2/3 ">
          <div className='flex gap-1 items-center mb-10'>
            <img src={logo} alt="" />
            <span className='text-3xl'>ChatGPT</span>
          </div>
          <button onClick={()=>{window.location.reload()}} className='flex gap-1 p-3 cursor-pointer items-center justify-center w-full mx-auto rounded-md bg-[#5A4BFF] mb-12'><img src={addimg} className='w-7 h-7' alt="" /><span className='text-xl'>New Chat</span></button>
          <div className='flex flex-col gap-2'>
            <button className='flex gap-4 items-center cursor-pointer p-6 rounded-md border border-[rgba(98,98,98,1)]' value={"What is Programming ?"} onClick={handleQuery}><img src={msgicon} alt="" /> What is Programming ?</button>
            <button className='flex gap-4 items-center cursor-pointer p-6 rounded-md border border-[rgba(98,98,98,1)]' value={"How to use an API ?"} onClick={handleQuery}><img src={msgicon} alt="" /> How to use an API ?</button>
          </div>
        </div>
        <div className="lowerSide p-10 border-t border-t-red-50">
          <div className='flex gap-4 items-center m-3 py-1'><img src={home} className='min-w-5' alt="" />Home</div>
          <div className='flex gap-4 items-center m-3 py-1'><img src={saved} className='min-w-5' alt="" />Saved</div>
          <div className='flex gap-4 items-center m-3 py-1'><img src={upgrade} className='min-w-5' alt="" />Upgrade to Pro</div>
        </div>
      </div>
      <div className="main flex-1 flex flex-col mx-20 my-10">
         <h3 className='mx-auto text-2xl'>Where should we begin?</h3>
        <div className='chats overflow-y-auto scroll-smooth w-full h-[calc(100vh_-_12rem)]'>
          
          {/* <div className="chat flex items-start gap-2 mt-6 p-3 rounded-md ">
            <img src={userlogo} className='w-6 h-6' alt="" />
            <p className='text-justify'>Lorem ipsum dolor sit </p>
          </div>

          <div className="chat flex items-start gap-2 mt-6 p-3 rounded-md bg-[#1c1e3a]">
            <img src={gptlogo} className='w-6 h-6' alt="" />
            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis fugiat ipsam eveniet suscipit incidunt non sit atque ipsa ratione, illum nam veniam? In architecto est repellendus nemo eaque voluptatem quas modi quisquam quod veritatis itaque, accusamus tempora facilis dolorem rem commodi culpa? Molestiae quis quibusdam repellat harum earum porro adipisci!</p>
          </div> */}
          {
            message.map((msg, index) => (
              <div key={index} className={msg.isBot ? "chat flex items-start gap-2 mt-6 p-3 rounded-md bg-[#1c1e3a]": "chat flex items-start gap-2 mt-6 p-3 rounded-md "}>
                <img src={ msg.isBot? gptlogo : userlogo} className='w-6 h-6' alt="" />
                <p className='text-justify'>{msg.text}</p>
              </div>
            ))
          }
          <div ref={msgEnd} />

        </div>
        <div className='chatFooter mt-auto w-full flex items-center justify-center p-4 rounded-md bg-[#1c1e3a]'>
          <input className='w-full outline-none ' type="text" placeholder='Send a message'
            value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button className='cursor-pointer' onClick={handleSend}><img src={send} alt="" /></button>
        </div>
      </div>
    </div>
  )
}

export default App
