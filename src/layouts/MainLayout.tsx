import { Outlet, useNavigate } from "react-router-dom";
import { useValidateSession } from "../hooks/ValidateTokenHook";
import { useAuthActions } from "../store/useAuthStore";
import { useEffect, useMemo, useState } from "react";
import logoUrl from './../assets/nilamilogo.svg';
import { AutoComplete, Avatar, Button, Input, Modal, Spin } from "antd";
import { CreateItemForm } from "../components/CreateItemForm";
import { UserRoles, type Item } from "../types";
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useSearchItems } from "../hooks/SearchItemsHook";
function MainLayout() {


    const { data, isLoading, isError } = useValidateSession();
    const { setUserInfo, logout } = useAuthActions();

    const [searchKeyword, setSearchKeyword] = useState("");

    const navigate = useNavigate();
    const { data: searchData, isLoading: isSearchItemsLoading } = useSearchItems(0, 20, searchKeyword);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const debouncedSetKeyword = useMemo(
        () => _.debounce((value: string) => {
            setSearchKeyword(value);
        }, 500),
        []
    );


    const options = useMemo(() => {
        if (!searchData?.content) return [];

        return searchData.content.map((item: Item) => ({
            value: item.title,
            label: (
                <div
                    key={item.id}
                    className="flex items-center justify-between py-1"
                    onClick={() => navigate(`/items/${item.id}`)}
                >
                    <div className="flex items-center gap-3">
                        <img
                            src={item.pictureIds[0]}
                            alt={item.title}
                            className="w-10 h-10 object-cover rounded shadow-sm"
                        />
                        <div>
                            <div className="font-semibold text-gray-800">{item.title}</div>
                            <div className="text-xs text-gray-400">{item.brand}</div>
                        </div>
                    </div>
                    <div className="text-pink-red font-bold">
                        ${item.highestBidPrice || item.basePrice}
                    </div>
                </div>
            ),
        }));
    }, [searchData, navigate]);


    const showModal = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    useEffect(() => {
        if (data?.valid && data.userInfo) {
            setUserInfo(data.userInfo);
        } else if (data?.valid === false || isError) {
            logout();
        }
    }, [data, isError, setUserInfo, logout]);


    return (

        <div>
            <header className="sticky top-0 z-50 w-full px-8 py-4
             bg-beige-light border-b border-gray-200/50 backdrop-blur-md shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">

         
                    <div className="flex-shrink-0">
                        <img
                            onClick={() => navigate('/dashboard')}
                            src={logoUrl}
                            className="h-12 w-auto cursor-pointer transition-opacity hover:opacity-80"
                            alt="Nilami Logo"
                        />
                    </div>

            
                    <div className="flex-grow max-w-xl">
                        <AutoComplete
                            popupMatchSelectWidth={500}
                            className="w-full"
                            options={options}
                            onSearch={debouncedSetKeyword}
                        >
                            <Input.Search
                                size="large"
                                placeholder="Search for auctions..."
                                loading={isSearchItemsLoading}
                                allowClear
                                className="rounded-lg overflow-hidden border-gray-300"
                            />
                        </AutoComplete>
                    </div>

         
                    <div className="flex items-center gap-6">
              
                        {data?.userInfo.roles.some(role => [UserRoles.ADMIN, UserRoles.SELLER].includes(role)) && (
                            <Button
                                type="primary"
                                icon={<PlusCircleOutlined />}
                                onClick={showModal}
                                className="bg-pink-red hover:bg-pink-red/90 border-none h-11 px-6 rounded-full shadow-md flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                            >
                                <span className="font-bold text-cream">Post New Auction</span>
                            </Button>
                        )}

                  
                        <div className="flex items-center border-l pl-6 border-gray-300">
                            {isLoading ? (
                                <Spin size="small" />
                            ) : (
                                data?.userInfo.username && (
                                    <div
                                        className="flex gap-3 items-center cursor-pointer group"
                                        onClick={() => navigate('/profile')}
                                    >
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-gray-500 uppercase tracking-tighter leading-none mb-1">Welcome,</p>
                                            <p className="text-sm font-bold text-gray-800 group-hover:text-pink-red transition-colors">
                                                {data.userInfo.username}
                                            </p>
                                        </div>
                                        <Avatar
                                            style={{ backgroundColor: '#7D6E5D' }}
                                            className="shadow-sm border-2 border-white group-hover:border-pink-red transition-all"
                                            shape="circle" 
                                            size={44} 
                                            icon={<UserOutlined />}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

 
                <Modal
                    title="Create New Auction Item"
                    open={isModalOpen}
                    onCancel={handleClose}
                    footer={null}
                    destroyOnClose
                    width={700}
                >
                    <CreateItemForm onSuccess={handleClose} onCancel={handleClose} />
                </Modal>
            </header>

            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;