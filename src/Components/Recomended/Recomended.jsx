import { useSearchParams, Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
function Recomended({categoryId}){
     const [apiData, setApiData] = useState([]);
     const fetchData = async()=>{
          const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`
          await fetch(relatedVideo_url).then(response=>response.json()).then(data=>setApiData(data.items))
     }
     useEffect(()=>{
        fetchData()  
     //    console.log(apiData)
     },[])
     return(
          <>
             <div className="recomended">
               {apiData.map((item, index)=>{
                    return(
                         <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                         <img src={item.snippet.thumbnails.medium.url} alt="" />
                         <div className="vid-info">
                              <h4>{item.snippet.title}</h4>
                              <p>{item.snippet.channelTitle}</p>
                              <p>{value_converter(item.statistics.viewCount)}views</p>
                         </div>
                    </Link>   
                    )
               })}
               
               
             </div>  
          </>
     )
}
export default Recomended;