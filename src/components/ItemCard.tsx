import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import type { Item } from "../types";
import CountdownTimer from "./CountdownTimer";


function ItemCard(item: Item) {


    const navigate = useNavigate();
    function handleCardClick(id: string): void {
        navigate(`/items/${id}`);
    }
    return (

        <div>

            <Card
                hoverable
                onClick={() => handleCardClick(item.id)}
                className="bg-fresh-light shadow-lg"

            >
                <div className="grid lg:grid-cols-2">
                    <div>
                        <img alt={item.title} src={item.pictureIds[0]}
                            className="w-36 h-32 rounded-ee-2xl object-fill
                 shadow-xl transition-transform 
                   duration-300 transform hover:scale-105"/>

                        <h2 className="font-semibold text- text-fresh text-left mt-4">{item.title}</h2>
                        <p className="text-left font-light text truncate">{item.brand}</p>
                    </div>

                    <div className="flex flex-col justify-start gap-6">

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              
                                <span className={`text-lg ${item.highestBidPrice > item.basePrice
                                        ? "text-gray-400 line-through font-normal"
                                        : "text-main-text font-semibold"
                                    }`}>
                                    ${item.basePrice}
                                </span>

                              
                                {item.highestBidPrice > item.basePrice && (
                                    <span className="text-lg font-bold text-pink-red animate-pulse-subtle">
                                        ${item.highestBidPrice}
                                    </span>
                                )}
                            </div>
                        </div>

                        <CountdownTimer expiryTime={item.expiryTime} />

                    </div>



                </div>
            </Card>

        </div>);
}

export default ItemCard;