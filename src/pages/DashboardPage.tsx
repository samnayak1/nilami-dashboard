
import CategoriesList from "../components/CategoriesList";

import LatestItems from "../components/LatestItems";
import { MyBidsTable } from "../components/MyBidsTable";



function DashboardPage() {
 
     

    return (  
    
    <div>
      
   

        <CategoriesList/>
        <LatestItems />

        <MyBidsTable/>
    </div>);
}

export default DashboardPage;