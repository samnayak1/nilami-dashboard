
import { useState } from "react";
import CategoriesList from "../components/CategoriesList";

import LatestItems from "../components/LatestItems";
import { MyBidsTable } from "../components/MyBidsTable";



function DashboardPage() {

const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    return (

        <div>

            <CategoriesList 
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory} 
          
            />
            <LatestItems categoryId={selectedCategory}/>

            <MyBidsTable />
        </div>
        );
}

export default DashboardPage;