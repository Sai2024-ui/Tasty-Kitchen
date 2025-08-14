import Slider from 'react-slick'
import {useState, useEffect} from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import './index.css'
import BeatLoader from 'react-spinners/BeatLoader'

const ReactSlick = () => {
    const settings = {
    dots: true,
    autoplay:true,
    speed:1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
  const [data, setData] = useState([])
  useEffect(()=>{
    // console.log(data)
    const getTop = async () => {
      const url = "https://apis.ccbp.in/restaurants-list/offers";
        const jwtToken = Cookies.get('jwt_token')
        const options={
            headers:{
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }
        const response = await fetch(url, options);
        if(response.ok==true){
            const fetchedData = await response.json();
            // console.log(fetchedData)
            const formattedData = fetchedData.offers.map(each=>({
                imageUrl:each.image_url
            }))
            setData(formattedData)  
        }
    }
    getTop()
  },[])
  return(
    <div>
      <div className="">
      {data.length>0?(
        <>
        <div className='slider-container'>
        <Slider {...settings}> 
          {data.map((each)=>(
              <div className='img-cont'>
            <img src={each.imageUrl} className='image'/>
            </div>
          ))}
       </Slider>
       </div>
      </>):<div className='beat-loader'><BeatLoader/></div>}
    </div>
  </div>
    );
}
export default ReactSlick