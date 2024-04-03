import './ErrorMessage.css';
function ErrorMessage({message}: {message: string}) {
    return (
        <div className="storybook-error-message">
            {message}
        </div>
    );
  }
  
  export default ErrorMessage;