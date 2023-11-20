import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const AllProducts = () => {
    // State to store the list of companies
    const [companies, setCompanies] = useState([]);


    // Fetch companies data when the component mounts
    useEffect(() => {
        fetch("/companies")
        .then(response => response.json())
        .then(data => setCompanies(data))
    }, [])


// Return the JSX for the AllProducts component
    return(
        <>
            <Tab>
                <SmallTab>Search By Company!</SmallTab>
                <LargeTab> 
                    <ul>
                    {companies.map(company => (
                        <li key={company._id}>
                            <Link to={`/company/${company._id}`}>{company.name}</Link>
                        </li>
                    ))}
                </ul>
                </LargeTab>
            </Tab>
        <h1>OUR CATEGORIES</h1>
        </>
    )
}

// Styled components

const Tab = styled.div`
position: fixed;
left: 0;
top: 50%;
transform: translateY(-50%);
display: flex;
flex-direction: column;
align-items: flex-start;
`;


const SmallTab = styled.div`
background-color: #008060;
color: #fff;
padding: 10px;
border-radius: 0 5px 5px 0;
cursor: pointer;
transition: width 0.3s ease-in-out;


    &:hover{
        width: 0;
        display: none;
    }
`

const LargeTab = styled.div`
display: none;
background-color: #008060;
color: #fff;
padding: 20px;
border-radius: 0 5px 5px 0;
margin-top: 10px;
width: 150px; 
height: 300px;
overflow-y: auto;
border-right: 1px solid #ccc;

h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li{
        margin-bottom: 8px;
    }

    a{
        text-decoration: none;
        color: white;
        font-weight: bold;
        font-size: 1rem;

        &:hover{
            color: #333;
        }
    }
}

${Tab}:hover & {
    display: block;
    }
`;


export default AllProducts