interface IPassForm {
    showPassForm: boolean,
    handleSubmitPassword: (e: React.FormEvent) => void,
}

export default function UpdatePass({showPassForm, handleSubmitPassword}: IPassForm) {
  return (
    <form onSubmit={handleSubmitPassword} className="shadow shadow-slate-900 rounded-md p-2 py-4 w-[90%] max-500:w-full relative mb-4 mt-8 flex flex-col">
      {/* old password */}
      <div>
        <label htmlFor="oldPassword">Enter Old Password: </label>
        <input
          type="password"
          name="oldPassword"
          id="oldPassword"
          placeholder="your old password"
          className="w-full p-2 bg-transparent shadow shadow-slate-500 rounded-md outline-none"
        />
      </div>

      {/* new password */}
      <div className="mt-5">
        <label htmlFor="newPassword">Enter Old Password: </label>
        <input
          type="password"
          name="newPassword"
          id="newPassword"
          placeholder="your new password"
          className="w-full p-2 bg-transparent shadow shadow-slate-500 rounded-md outline-none"
        />
      </div>
      <button
        type="submit"
        className="mt-5 bg-[#37a39a] p-2 rounded place-self-end hover:bg-[#37a39a]/80" 
      >
        Update Password
      </button>
    </form>
  );
}
