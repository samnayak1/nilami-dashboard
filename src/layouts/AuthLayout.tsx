import { Outlet } from "react-router-dom";
import logoUrl from './../assets/nilamilogo.svg';
import winBidImage from './../assets/man_wins.png'
import packageDelivered from './../assets/package_delivered.png'

function AuthLayout() {
    return (
        <div>
            <header className="flex items-center justify-center pb-8 bg">

                <img src={logoUrl}
                    className="h-12 w-auto" alt="Logo" />


            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full mx-auto px-4 gap-6">

                <div>
                    <Outlet />
                </div>


                <div className="flex flex-col gap-16 py-10 max-w-5xl mx-auto">

        
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2">
                            <img src={winBidImage} className="rounded-2xl shadow-lg border border-wheat" />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <h3 className="text-2xl font-bold text-earth mb-4">Sign up now and get $100 worth of free credits.</h3>
        
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                        <div className="w-full md:w-1/2">
                            <img src={packageDelivered}  className="rounded-2xl shadow-lg border border-wheat" />
                        </div>
                        <div className="w-full md:w-1/2 px-4">
                            <h3 className="text-2xl font-bold text-earth mb-4">Outbid others and win.</h3>
    
                        </div>
                    </div>

                </div>
            </div>
        </div>);
}

export default AuthLayout;