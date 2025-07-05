const Contact = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl p-4 m-4">Contact us</h1>
      <form className="">
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="name"
        />
        <input
          type="text"
          className="border border-black p-2 m-2"
          placeholder="message"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
