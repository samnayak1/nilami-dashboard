import { Outlet } from "react-router-dom";
import { useValidateSession } from "../hooks/ValidateTokenHook";
import { useAuthActions } from "../store/useAuthStore";
import { useEffect, useState } from "react";
import logoUrl from './../assets/nilamilogo.svg';
import { Button, Modal } from "antd";
import { CreateItemForm } from "../components/CreateItemForm";
import { UserRoles } from "../types";
function MainLayout() {


    const { data, isLoading, isError } = useValidateSession();
    const { setUserInfo, logout } = useAuthActions();

    const [isModalOpen, setIsModalOpen] = useState(false);

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
            <header className="flex items-center justify-between pb-8 bg-beige-light">
              

                <div>
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            data?.userInfo.username && <p className="text-xl">Hey, {data.userInfo.username}!</p>
                        )}
                </div>
                   <div>
                    <img src={logoUrl}
                        className="h-16 w-auto" alt="Logo" />
                </div>
                <div>
                    {data?.userInfo.roles.includes(UserRoles.ADMIN || UserRoles.SELLER) &&

                        <Button type="primary" onClick={showModal}>
                            Create New Auction
                        </Button>



                    }
                </div>

                <Modal
                    title="Create New Auction Item"
                    open={isModalOpen}
                    onCancel={handleClose}
                    footer={null}
                    destroyOnHidden
                    className="h-16 text-2xl"
                >
                    <CreateItemForm
                        onSuccess={handleClose}
                        onCancel={handleClose}
                    />
                </Modal>
           </header>
           <Outlet />
        </div>
    );
}

export default MainLayout;