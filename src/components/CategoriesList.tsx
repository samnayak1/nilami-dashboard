import { Card, Flex, Tag } from "antd";
import { useCategories } from "../hooks/CategoryListHook";
import { useState } from "react";


function CategoriesList() {
const { data, isLoading } = useCategories();
const [showMore, isShowMore] = useState(false);

const toggleShowMore = () => {
  isShowMore(prev => !prev);
};


const categoriesToDisplay = showMore 
  ? data?.content 
  : data?.content.slice(0, 8);


const hasMoreThanLimit = data?.content && data.content.length > 8;

return (
  <Card loading={isLoading} className="bg-wheat border-2 my-10">
    <h2 className="text-left text-xl mb-6 font-semibold text-earth">Browse Categories</h2>
    
    <Flex wrap gap="small">
      {categoriesToDisplay?.map((category) => (
        <Tag 
          key={category.id} 
          className="py-1 px-4 rounded-lg text-md cursor-pointer bg-fresh-light border-none hover:bg-fresh hover:text-white"
        >
          {category.name}
        </Tag>
      ))}
    </Flex>

   
    {hasMoreThanLimit && (
      <div className="mt-6 text-left">
        <button 
          onClick={toggleShowMore}
          className="font-semibold hover:underline flex items-center gap-1"
        >
          {showMore ? 'Show Less ↑' : `Show All (${data.content.length}) ↓`}
        </button>
      </div>
    )}
  </Card>
  );
}

export default CategoriesList;