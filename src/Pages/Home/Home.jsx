import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import { useState } from "react";
function Home({ sidebar }) {
  let [category, setCategory] = useState(0);
  console.log(category)
  return (
    <>
      <Sidebar sidebar={sidebar} category = {category} setCategory={setCategory}/>
      <div className={`container ${sidebar ? "" : "large-container"}`}>
        <Feed category={category}/>
      </div>
    </>
  );
}
export default Home;
