import React, { useState } from "react";
import "./App.css"
import NewsCard from "./NewsCard"
import RedditCard from "./RedditCard"
import TwitterCard from "./TwitterCard"
import GithubCard from "./GithubCard"

const App = () => {
    const [render, setRender] = useState('github')

    function renderComponent() {
        switch(render){
          case 'twitter': return <TwitterCard/>
          case 'reddit': return <RedditCard/>
          case 'news': return <NewsCard/>
          case 'github': return <GithubCard/>
          default: return null
        }
    }
    return (
        <div className = "">
        <nav className="container">
          <div className="1">
          <button onClick = { () => setRender('twitter')} className="navLinks">Twitter</button>
          </div>
          <div className="2">
          <button onClick = { () => setRender('reddit')} className="navLinks">Reddit</button>
          </div>
          <div className="3">
          <button onClick = { () => setRender('news')} className="navLinks">News</button>
          </div>
          <div className="4">
          <button onClick = { () => setRender('github')} className="navLinks">Github</button>
          </div>
        </nav>
        {renderComponent()}
        </div>
    );
}

export default App