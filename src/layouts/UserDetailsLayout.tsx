import { ClipLoader } from "react-spinners";
import { useValidateSession } from "../hooks/ValidateTokenHook";
import { useState } from "react";
import TopUpBalance from "../components/TopupBalance";
import { Dialog, DialogPanel } from '@headlessui/react';
function UserDetailsLayout() {

    const { data, isLoading, isError } = useValidateSession();
    const [isOpen, setIsOpen] = useState(false);
     if(isLoading){
            return <p>
              <ClipLoader color="#36d7b7" loading={isLoading} size={50} /></p>
        }

    if(isError){
        return <p>Error loading user details</p>;
    }

  return (

<div className="min-h-screen pt-[15vh] px-4 bg-beige-light/30"> 
  <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
   
    <div className="h-2 bg-pink-red w-full" />
    
    <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      
    
      <div className="space-y-4 text-center md:text-left">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-pink-red mb-1 block">Account Member</span>
          <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {data?.userInfo.username}
          </h2>
        </div>
        
        <div className="space-y-1">
          <p className="text-lg text-gray-600 flex items-center justify-center md:justify-start gap-2">
            <span className="opacity-60">✉</span> {data?.userInfo.email}
          </p>
          <p className="text-sm text-gray-400 italic flex items-center justify-center md:justify-start gap-2">
            <span className="opacity-60">📍</span> {data?.userInfo.address || "No address provided"}
          </p>
        </div>
      </div>

    
      <div className="flex flex-col items-center md:items-end gap-8">
  
        <div className="flex gap-2">
          {data?.userInfo.roles.map((role: string) => (
            <span key={role} className="px-3 py-1 bg-earth/10 text-earth text-xs font-black uppercase tracking-tighter rounded-md border border-earth/20">
              {role}
            </span>
          ))}
        </div>

        <div className="bg-fresh p-1 w-full max-w-[280px] rounded-2xl shadow-lg transform transition-transform hover:rotate-1">
          <div className="bg-fresh border border-white/20 rounded-xl p-6 text-center">
            <p className="text-cream/70 text-xs uppercase font-bold tracking-widest mb-1">Available Funds</p>
            <div className="text-cream text-4xl font-mono font-bold">
              ${data?.userInfo.balance?.toLocaleString() || "0.00"}
            </div>
                 <button 
        onClick={() => setIsOpen(true)}
        className="mt-4 w-full py-2 bg-white/10 hover:bg-white/20 text-cream text-xs rounded-lg transition-colors border border-white/10"
      >
        + Top Up Wallet
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 max-w-md w-full">
            <TopUpBalance />
          </DialogPanel>
        </div>
      </Dialog>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
     );
}

export default UserDetailsLayout;