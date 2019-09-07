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
          <a onClick = { () => setRender('twitter')} className="navLinks">Twitter</a>
          </div>
          <div className="2">
          <a onClick = { () => setRender('reddit')} className="navLinks">Reddit</a>
          </div>
          <div className="3">
          <a onClick = { () => setRender('news')} className="navLinks">News</a>
          </div>
          <div className="4">
          <a onClick = { () => setRender('github')} className="navLinks">Github</a>
          </div>
        </nav>
        {renderComponent()}
        </div>
    );
}

export default App