import { Button, Card, Flex, Tag } from "antd";
import { useCategories } from "../hooks/CategoryListHook";
import { useState } from "react";

interface CategoriesListProps {
  onSelectCategory: (id: string | undefined) => void;
  selectedCategoryId?: string;
}
function CategoriesList({ selectedCategoryId,onSelectCategory }: CategoriesListProps) {
const { data, isLoading } = useCategories(0,100);
const [showMore, isShowMore] = useState(false);

const toggleShowMore = () => {
  isShowMore(prev => !prev);
};


const categoriesToDisplay = showMore 
  ? data?.content 
  : data?.content.slice(0, 8);


const hasMoreThanLimit = data?.content && data.content.length > 8;

return (
  <Card loading={isLoading} className="bg-fresh-light border-2 my-10">
    <h2 className="text-left text-xl mb-6 font-semibold text-pink-red">Browse Categories</h2>
    <Button type="link" onClick={() => onSelectCategory(undefined)} className="text-earth">
          Clear Filter
        </Button>
    
    <Flex wrap gap="small">
      {categoriesToDisplay?.map((category) => {
          const isActive = selectedCategoryId === category.id;
          return (
            <Tag 
              key={category.id} 
              onClick={() => onSelectCategory(category.id)}
              className={`py-2 px-6 rounded-xl text-sm cursor-pointer transition-all border-2 
                ${isActive 
                  ? 'bg-pink-red text-white border-pink-red shadow-md' 
                  : 'bg-white border-gray-100 text-gray-600 hover:border-pink-red/30'
                }`}
            >
              {category.name}
            </Tag>
          );
        })}
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