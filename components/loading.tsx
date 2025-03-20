const Loader = () => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-14 h-14"></div>
        </div>
    );
};

export default Loader;
