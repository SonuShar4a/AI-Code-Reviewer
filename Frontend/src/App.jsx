import { useState, useEffect } from 'react';
import "prismjs/themes/prism-tomorrow.css";
import prism from 'prismjs';
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";
import axios from 'axios';
import DeveloperData from "./DeveloperData"; 
import './App.css'
import { FaRegUserCircle } from "react-icons/fa";

function App() {
  const [review, setReview] = useState('');
  const [open,setopen]=useState(false);
  const [code, setCode] = useState(`function sum(){
    return a+b 
    }`);

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code})
    setReview(response.data);
  }
 function handlebtn(){
   if(!open){
    setopen(true)
   }
   else{
    setopen(false);
   }
 }
 
  return (
    <>
      <main>
  
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code","Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                boderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            >
            </Editor>
          </div>
          <div className="reviewBtn" onClick={reviewCode}>Review</div>
        </div>
        <div className="right"><Markdown
          rehypePlugins={[rehypeHighlight]}>
          {review}
        </Markdown>
        <FaRegUserCircle onClick={handlebtn} className='icon'/>
        {
           open ?  <DeveloperData/> : ""
        }        
        </div>
      </main>
    </>
  )
}

export default App
