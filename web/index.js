
const KEY_MAP = {
    ENTER: 13,
};

const textArea = document.getElementById('chat-content');
const submitChat = document.getElementById('submit-chat');
const userName = document.getElementById('username');
const userNameValidation = document.getElementById('username-validation');

const WebSocketHandler = (() => {
    const endpoint = 'ws://localhost:3000';
    const socket = new WebSocket(endpoint);
    socket.addEventListener('message', e => {
        debugger;
    });

    const sendMessage = (msg) => {
        socket.send(JSON.stringify(msg));
    };

    return {
        sendMessage,
    }
})();

const DomEventHandler = (() => {
    const submitChat = e => {
        e.preventDefault();

        if (!userName.value) {
            userNameValidation.classList.remove('hidden');
            window.setTimeout(() => {
                userNameValidation.classList.add('hidden');
            }, 1200);
            return;
        }

        if (!textArea.value) {
            return;
        }

        const message = {
            user: userName.value,
            message: textArea.value,
        };

        WebSocketHandler.sendMessage(message);
    };

    const textAreaKeyPress = e => {
        if (e.ctrlKey && e.keyCode === KEY_MAP.ENTER) {
            DomEventHandler.submitChat(e);
        }
    };

    return {
        textAreaKeyPress: textAreaKeyPress.bind(this),
        submitChat: submitChat.bind(this),
    };
})();

textArea.addEventListener('keydown', DomEventHandler.textAreaKeyPress);

submitChat.addEventListener('click', DomEventHandler.submitChat);
