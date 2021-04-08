import React, { useState, useEffect, Suspense } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Header from './components/Header';
import Loader from './components/Loader';

function App() {
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
		fetchData();
		window.addEventListener('scroll', handleScroll);
	}, []);

  const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		){
      return;
    }
    console.log("bottom")
		setIsFetching(true);
	};
  
  useEffect(()=>{
    console.log(isFetching)
  },[isFetching])

  const fetchData = async ()=>{
    setLoadings(true);
    setTimeout(async()=>{
      try{
        console.log("here");
        if(page > 10){
          return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Cookie", "__cfduid=d8f83833b02b4825374adb1dc6c0387ab1617788553");
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        const data = await fetch(`https://jsonplaceholder.typicode.com/users/${page}`, requestOptions);
        const result = await data.text();
        console.log(JSON.parse(result));
        setPage(page + 1);
        setProfiles([...profiles,JSON.parse(result)]);
        setLoading(false);
        setLoadings(false);
      }
      catch(error){
        console.log(error);
      }
    },1000)
  }

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(() => {
		if (!isFetching) return;
		fetchMoreListItems();
	}, [isFetching]);

	const fetchMoreListItems = () => {
		fetchData();
		setIsFetching(false);
	};

  return (
    <div className="App">
      <Header/>
      {loading ? (
        <Container style={{paddingTop:"100px"}}>
          <Loader />
        </Container>
      ) : (
        <>
          <Container style={{paddingTop:"100px"}}>
            <Row style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              {profiles.map((listItem) => (
                <Col xs={8}>
                  <div className='card mb-3 p-2' key={listItem.id} style={{borderRadius:"20px", minHeight:"100vh"}}>
                    <Suspense fallback={<Loader />}>
                      <img src={`https://avatars.dicebear.com/api/male/${listItem.name}.svg?background=%230000ff`} style={{width:"100%", borderRadius:"20px"}} alt=""/>
                    </Suspense>

                    <div className='container text-center mt-1'>
                      <h4>
                        <b>{listItem.name}</b>
                      </h4>
                      <Row style={{textAlign:'left'}}>
                        <Col xs={6}>
                          <span style={{fontWeight:"500"}}>Email</span> : {listItem.email}<br/>
                          <span style={{fontWeight:"500"}}>Id</span> : {listItem.id}
                        </Col>
                        <Col xs={6}>
                          <span style={{fontWeight:"500"}}>Website</span> : <a href={listItem.website}>{listItem.website}</a><br/>
                          <span style={{fontWeight:"500"}}>Username</span> : {listItem.username}
                        </Col>
                      </Row>
                    </div>
                  </div>
                  {loadings && <Loader />}
                </Col>
              ))}
            </Row>
            <Row style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
              {page >10 && <h6>No more users</h6>}
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default App;
