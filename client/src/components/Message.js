const Message = ({message}) => {
    return ( 
        <div className="messageError">
            {message.error}
        </div>

    );
}

export default Message;