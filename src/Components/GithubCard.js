import React, { useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar} from "@fortawesome/free-solid-svg-icons";
import {
    languages,
    fetchRepositories,
    fetchDevelopers,
  } from '@huchenme/github-trending';
import "./GithubCard.css";
import Autocomplete from "./Autocomplete"

const GithubCard = () => {
    const [repos, setRepositories] = useState([])
    const [isDeveloper, setToggle] = useState(false)
    const [developerData, setDevelopers] = useState([])
    const [rangeSelect, setSelectRange] = useState({value: ''})
    const [input, setAutocompleteInput] = useState({value: ''})
    const [buttonActive, setButtonActive] = useState('')
    const names = languages.map((l, i) => l.name )
    const ranges = ['Daily', 'Weekly', ' Monthly']
    names.unshift('Select Language')
    ranges.unshift('Select Date Range')

    useEffect(() => {
        fetchRepositories({ language: input.value, since: rangeSelect.value }).then(repositories => {
            setRepositories(repositories)
        })
        fetchDevelopers({ language: input.value, since: rangeSelect.value }).then(developers => {
            setDevelopers(developers)   
        })
      }, [rangeSelect.value, isDeveloper, input.value])

      const handleTimeSelectChange = (e) => {
        setSelectRange({value: e.target.value})
      }
      const handleInputChange = (item) => {
        setAutocompleteInput({value: item})
      }
      const handleRepoToggle = () => {
          setToggle(false)
          setButtonActive('repo-button-active')
      }
      const handleDevToggle = () => {
        setToggle(true)
        setButtonActive('dev-button-active')
      }
      console.log(repos)
      console.log(developerData)
    return (
        <div className="box">
          <div className="box-header">
            <button className={buttonActive ===  "repo-button-active" ? "repo-button-active" : "repo-button"}  type='button' onClick={ handleRepoToggle}> Repositories </button>
            <button className={buttonActive ===  "dev-button-active" ? "dev-button-active" : "dev-button"} type='button' onClick={ handleDevToggle}> Developers </button>
           <Autocomplete handleInput = {handleInputChange} items = { names }/>
            <span>
                &nbsp;
            </span>
            <select onChange = {handleTimeSelectChange} value={rangeSelect.value}>{ranges.map((n,i) => 
                <option className = 'option' key={i}>{n}</option>
               )}
            </select>
          </div>
        {!(isDeveloper) ? 
            repos.map((r, i) => 
                <ul key = {i}>
                <li className='box-row'>
                    <a className = 'repo-link' href = {r.url} target="_blank" rel="noopener noreferrer"> {r.author + '/' + r.name} </a>
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
                <span>
                    <img className = 'avatar' src = {d.avatar} alt = "avatar"/>
                    <h4><a className = 'repo-link' href = {d.url} target="_blank" rel="noopener noreferrer"> {d.name} </a></h4>
                    <p> {d.username} </p>
                </span>
                <span>
                    <FontAwesomeIcon icon={faStar}/>
                    &nbsp;
                    <span> Repository:</span>
                    &nbsp;
                    <a className='star-repository' href = {d.repo.url} target="_blank" rel="noopener noreferrer"> {d.username + '/' + d.repo.name } </a>
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