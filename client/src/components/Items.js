import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MainContext } from "./MainContext";

import ItemThumbnail from "./ItemThumbnail"; 

const AllProducts = () => {
    const {
        actions: { requestItemCategoryPage,emptyPage },
        state: {  itemsCurrentPage },
         } = useContext(MainContext);

    // State to store the list of companies
    const [companies, setCompanies] = useState([]);
    const {category,page} = useParams()

    useEffect(()=>{
        emptyPage();
        requestItemCategoryPage({category:category,page:page});
    },[page])

    // Fetch companies data when the component mounts
    useEffect(() => {




        fetch("/companies")
        .then(response => response.json())
        .then(data => setCompanies(data))
    }, [])


// Return the JSX for the AllProducts component
    return(
        
        <ItemsMainDiv>
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
        <div style={{flex:"1"}}></div>
        <div style={{flex:"2"}}>

        <CategoryTitle>{category}</CategoryTitle>  
        <CoolLink  {...(page === "1" ?{className: "hide"}:{}) } ><Link to={`/items/${category}/${page-1}`}>PREV</Link> </CoolLink>
        <PageSection>Page: {page} </PageSection>
        {itemsCurrentPage.length === 20 && (
            <> 
             <Link to={`/items/${category}/${String(Number(page)+1)}`}><CoolLink>NEXT</CoolLink></Link>
            </>
        )}
            {itemsCurrentPage != [] && ( 
                <> 
                   
                    <ItemsList>
                    {itemsCurrentPage.map((item,index)=>{ 
                        
                        if (index % 5 === 0)
                        { 
                        }
                        return (
                            <ItemThumbnail key={item._id} item={item} />
                        );
                    })}
                    </ItemsList>
                    </>
                )}

        
                </div>
        </ItemsMainDiv> 
    )
}

// Styled components
const CoolLink = styled.span`
    color:rgb(255, 120, 0);
    cursor:pointer;
    font-size: 16px;
    &:hover{
    text-decoration: underline;}
    margin-right:5px;
    &.hide{
        cursor: none;
        visibility: hidden;
    }
`

const ItemsMainDiv = styled.div`
display: flex;
max-height: 100vh;
`
const PageSection = styled.span`
font-size:22px;
`
const CategoryTitle = styled.span`
font-size: 45px;
margin-right:20px;
`

const ItemsList = styled.div`
position: relative;
resize: none; 
/* left:-120px; */ 
width:800px;
display: grid;
grid-template-columns: repeat(auto-fill, minmax(150px, 150px));
margin-top: 30px; 
min-height: 0;  
min-width: 0; 
max-height:500px; 
`

const Tab = styled.div`
position: fixed;
left: 0;
flex:1;
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