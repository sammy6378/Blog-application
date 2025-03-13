import { useContextFunc } from "@/components/context/AppContext";

interface IFormProps {
    submitInfo: (e: React.FormEvent) => void,
    name: string,
    setName: (name: string) => void,
    showReadonlyMessage: boolean,
    setShowReadonlyMessage: (showReadonlyMessage: boolean) => void;
}

export default function UpdateForm({submitInfo, name, setName, showReadonlyMessage, setShowReadonlyMessage}: IFormProps) {
    const {userInfo} = useContextFunc();
 
  return (
    <form
      onSubmit={submitInfo}
      className="shadow shadow-slate-900 rounded-md p-2 py-4 w-[90%] max-500:w-full items-center relative mb-4 mt-8 flex flex-col"
    >
      <input
        type="text"
        name="name"
        value={name || userInfo?.name}
        onChange={(e) => setName(e.target.value)}
        className={` w-full p-2 bg-transparent shadow shadow-slate-500 rounded-md outline-none `}
      />
      <input
        type="email"
        name="email"
        value={userInfo?.email}
        readOnly
        className="mt-[20px] w-full p-2 bg-transparent  rounded-md outline-none border border-crimson"
        onMouseOver={() => setShowReadonlyMessage(true)}
        onMouseLeave={() => setShowReadonlyMessage(false)}
      />
      {showReadonlyMessage && (
        <p className="w-full text-sm text-crimson absolute bottom-[55px] left-[10px]">email is readOnly!</p>
      )}

      <button
        type="submit"
        className="mt-5 bg-[#37a39a] p-2 rounded place-self-end hover:bg-[#37a39a]/80"
      >
        Update Info
      </button>
    </form>
  );
}
