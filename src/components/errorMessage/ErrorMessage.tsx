function ErrorMessage({message}: {message: string}) {
    return (
        <div className="text-center my-4 p-2 bg-red-100 text-red-700 rounded w-full">
            {message}
        </div>
    );
  }
  
  export default ErrorMessage;