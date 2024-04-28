import { Link } from 'react-router-dom';
import './MyProfile.scss'
import { GrLocation } from "react-icons/gr";
import { RxOpenInNewWindow } from "react-icons/rx";
import { skillsByDomain } from '../../data';
import { useState } from 'react';
import { RiCloseCircleFill } from "react-icons/ri";
import { AiTwotoneCloseSquare } from "react-icons/ai";

export default function MyProfile() {
    const [search, setSearch] = useState('')
    const [skills, setSkills] = useState([])
    const [addClass, setAddClass] = useState(0)

    const addSkill = () => {
        setSkills([...skills, search])
    }
    const removeSkill = (id) => {
        const newArr = [...skills]
        newArr.splice(id, 1)
        setSkills(newArr)
    }
    const chekedSkill = (skill) => {
        setSearch(skill)
        document.getElementById('Skillslist').classList.add('hidde')
    }
    const handleChange = (e) => {
        setSearch(e.target.value)
        document.getElementById('Skillslist').classList.remove('hidde')
    }
    window.scrollTo(0, 0);
    return (
        <div className='profile'>
            <div className='container'>
                <div className='content1'>
                    <div className='items'>
                        <img src='cute.png' />
                        <span className='mySpan'>Hafid</span>
                        <div className='online'>
                            <span className='spn'>online</span>
                            <div className='location'>
                                <GrLocation />
                                <span>Morroco</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link className='Link'><RxOpenInNewWindow /><span>Click to view profile</span></Link>
                    </div>
                </div>
                <div className='form'>
                    <div className="content2">
                        <div className="items">
                            <label>Displayed Name</label>
                            <input type="text" placeholder="Hafid" />
                        </div>
                        <div className='itemDiv'>
                            <div className="items">
                                <label>Skills</label>
                                <div className='itemsDiv'>
                                    <div className='skillsDiv'>
                                        <div className='spansDiv'>
                                            {skills.map((item, id) => (
                                                <span key={id} className='block'><span>{item}</span><RiCloseCircleFill className='icone' onClick={() => removeSkill(id)} /></span>
                                            ))}
                                        </div>
                                        <button onClick={() => setAddClass(1)}>Add New Skill</button>
                                    </div>
                                    {addClass === 1 && (
                                        <>
                                            <div className='input'>
                                                <input value={search} type="text" placeholder="" onChange={handleChange} autoFocus list='Skillslist' />
                                                <div id='Skillslist' className=''>
                                                    {skillsByDomain.filter(skill => skill.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                                        .map((skill, id) => (
                                                            <span key={id} onClick={() => chekedSkill(skill)}>{skill}</span>
                                                        ))}
                                                </div>
                                                <div className='buttons'>
                                                    <button onClick={addSkill}>Add</button>
                                                    <button onClick={() => setAddClass(0)}><AiTwotoneCloseSquare size='30' /></button>
                                                </div>
                                            </div>
                                            {/* <select onChange={(e) => setSearch(e.target.value)}>
                                                {skillsByDomain.map((skill, id) => (
                                                    <option key={id} value={skill}>{skill}</option>
                                                ))}
                                            </select> */}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="items">
                            <label>Expiration month</label>
                            <input type="number" placeholder="MM" maxLength="2" className="no-spinners" />
                        </div>
                        <div className="items">
                            <label>Expiration year</label>
                            <input type="number" placeholder="YY" maxLength="2" className="no-spinners" />
                        </div>
                        <div className="items">
                            <label>Security code</label>
                            <input type="number" placeholder="3 digits" maxLength="3" className="no-spinners" />
                        </div>
                        <div className='itemDiv2'>
                            <div className="items">
                                <label>Languages</label>
                                <input type="text" placeholder="" />
                            </div>
                        </div>
                    </div>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}