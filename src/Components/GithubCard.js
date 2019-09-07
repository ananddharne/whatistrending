import React, { useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {
    languages,
    fetchRepositories,
    fetchDevelopers,
  } from '@huchenme/github-trending';
import "./GithubCard.css";

const GithubCard = () => {
    const [repos, setRepositories] = useState([])
    const [isDeveloper, setToggle] = useState(false)
    const [developerData, setDevelopers] = useState([])
    const [languageSelect, setSelectLanguage] = useState({value: ''})
    const [rangeSelect, setSelectRange] = useState({value: ''})
    const names = languages.map((l, i) => l.name )
    const ranges = ['Daily', 'Weekly', ' Monthly']
    names.unshift('Select Language')
    ranges.unshift('Select Date Range')

    useEffect(() => {
        fetchRepositories({ language: languageSelect.value, since: rangeSelect.value }).then(repositories => {
            setRepositories(repositories)
        })
        fetchDevelopers({ language: languageSelect.value, since: rangeSelect.value }).then(developers => {
            setDevelopers(developers)
        })
      }, [languageSelect.value, rangeSelect.value, isDeveloper])


      const handleLanguageSelectChange = (e) => {
        setSelectLanguage({value: e.target.value})
      }

      const handleTimeSelectChange = (e) => {
        setSelectRange({value: e.target.value})
      }
      const handleRepoToggle = () => {
          setToggle(false)
      }
      const handleDevToggle = () => {
        setToggle(true)
    }
      console.log(repos)
      console.log(developerData)
    return (
        <div className="box">
          <div className="box-header">
            <button type='button' onClick={ handleRepoToggle}> Repositories </button>
            <button type='button' onClick={ handleDevToggle}> Developers </button>
            <span>
                &nbsp;
            <select onChange = {handleLanguageSelectChange} value={languageSelect.value}>{names.map((n,i) => 
                <option key={i}>{n}</option>
               )}
            </select>
            </span>
            <select onChange = {handleTimeSelectChange} value={rangeSelect.value}>{ranges.map((n,i) => 
                <option key={i}>{n}</option>
               )}
            </select>
          </div>
        {!(isDeveloper) ? 
            repos.map((r, i) => 
                <ul key = {i}>
                <li className='box-row'>
                    <a href = {r.url} target="_blank" rel="noopener noreferrer"> {r.author + '/' + r.name} </a>
                    <p> {r.description} </p>
                    <span>
                        <FontAwesomeIcon icon={faStar}/>
                        &nbsp;
                        {r.stars}
                        &nbsp; &nbsp; &nbsp;
                        {r.language}
                        &nbsp; &nbsp; &nbsp;
                       Forks: {r.forks}
                    </span>
                </li>
                <hr/>
                </ul>
            ) :  developerData.map((d, i) => 
            <ul key = {i}>
            <li className='box-row'>
                <a href = {d.url} target="_blank" rel="noopener noreferrer"> {d.name} </a>
                <p> {d.username} </p>
                <span>
                    <FontAwesomeIcon icon={faStar}/>
                    &nbsp;
                    <span> Repository:</span>
                    &nbsp;
                    <a href = {d.repo.url} target="_blank" rel="noopener noreferrer"> {d.username + '/' + d.repo.name } </a>
                </span>
            </li>
            <hr/>
            </ul>
        )
            
            }
        </div> 
    )
}

export default GithubCard