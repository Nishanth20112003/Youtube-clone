import video1 from "../../assets/video.mp4";
import likeIcon from "../../assets/like.png";
import dislikeIcon from "../../assets/dislike.png";
import shareIcon from "../../assets/share.png";
import saveIcon from "../../assets/save.png";
import jackIcon from "../../assets/jack.png";
import userProfileIcon from "../../assets/user_profile.jpg";
import { useEffect, useState } from "react";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] =  useState(null)
  const fetchVideoData = async()=>{
    //fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
    await fetch(videoDetails_url).then(response => response.json()).then(data=>setApiData(data.items[0]));
  }
  const fetchOtheraData = async()=>{
    const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`
    await fetch(channelData_url).then(response => response.json()).then(data => setChannelData(data.items[0]));
  // fetching comments
  const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId=${videoId}&key=${API_KEY}`
    await fetch(comment_url).then(response=>response.json()).then(data=>setCommentData(data.items))
  }
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);
  useEffect(()=>{
    fetchOtheraData()
  },[apiData])
  return (
    <>
      <div className="play-video">
        {/* <video src={video1} autoPlay controls muted></video> */}
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
        <h3>{apiData?apiData.snippet.title:"Title here"}</h3>
        <div className="play-video-info">
          <p>{apiData?value_converter(apiData.statistics.viewCount):"16k"} &bull; {apiData?moment(apiData.snippet.publishedAt).fromNow():""}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <span>
              <img src={likeIcon} alt="" />
              {apiData?value_converter(apiData.statistics.likeCount):"125"}
            </span>
            <span>
              <img src={dislikeIcon} alt="" />
            </span>
            <span>
              <img src={shareIcon} alt="" />
              share
            </span>
            <span>
              <img src={saveIcon} alt="" />
              save
            </span>
          </div>
        </div>
        <hr className="hr" />
        <div className="publisher">
          <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
          <div>
            <p>{apiData?apiData.snippet.channelTitle:"channel Title"}</p>
            <span>{channelData?value_converter(channelData.statistics.subscriberCount):"10k"} Subscribers</span>
          </div>
          <button style={{backgroundColor:'red'}}>Subcribe</button>
        </div>
        <div className="vid-description">
          <p>{apiData?apiData.snippet.description.slice(0,250):"Description here"}</p>
          <hr className="hr" />
          <h4>{apiData?value_converter(apiData.statistics.commentCount):"140"} Comments</h4>
          {commentData?commentData.map((item)=>{
            return (
              <div className="comment">
            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
            <div>
              <div className="demo">
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}</h3> <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow(  )}</span>
              </div>
              <p>
                {item.snippet.topLevelComment.snippet.textDisplay}
              </p>
              <div className="comment-action">
                <img src={likeIcon} alt="" /> <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislikeIcon} alt="" />
              </div>
            </div>
          </div>
            )
          }):""}
          
        </div>
      </div>
    </>
  );
}
export default PlayVideo;
