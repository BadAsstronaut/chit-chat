
const KEY_MAP = {
    ENTER: 13,
};

const textArea = document.getElementById('chat-content');
const submitChat = document.getElementById('submit-chat');
const username = document.getElementById('username');
const usernameValidation = document.getElementById('username-validation');
const output = document.getElementById('chat-log-output');
const chatWrapper = document.getElementsByClassName('chat-controls')[0];
const usernameWrapper = document.getElementsByClassName('username-wrapper')[0];

const mapMessagesToChat = messages => {
    const elems = messages.map(msg => {
        const isCurrentUser = username.value === msg.user;

        return `
        <div class="message-wrapper${isCurrentUser ? ' current-user' : ''}">
          <div class="message-meta">
            <div class="meta-user">
              ${msg.user}
            </div>
            <div class="meta-time">
              ${new Date(msg.datetime).toLocaleString()}
            </div>
          </div>
          <div class="message">
            ${msg.message}
          </div>
        </div>
        `;
    });

    output.innerHTML = elems.join('');
    output.scrollTop = output.scrollHeight;
};

const WebSocketHandler = (() => {
    const endpoint = 'ws://localhost:3000';
    const socket = new WebSocket(endpoint);

    socket.addEventListener('message', e => {
        mapMessagesToChat(JSON.parse(e.data));
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

        if (!username.value || username.value.length > 10) {
            usernameValidation.classList.remove('hidden');
            window.setTimeout(() => {
                usernameValidation.classList.add('hidden');
            }, 1200);
            return;
        }

        if (!textArea.value) {
            return;
        }

        const message = {
            user: username.value,
            message: textArea.value,
        };

        WebSocketHandler.sendMessage(message);
        textArea.value = '';
    };

    const textAreaKeyPress = e => {
        if (e.ctrlKey && e.keyCode === KEY_MAP.ENTER) {
            DomEventHandler.submitChat(e);
        }
    };

    const onFocusWrapper = wrapper => () => {
        wrapper.classList.add('focus');
    };

    const onBlurWrapper = wrapper => () => {
        wrapper.classList.remove('focus');
    };

    return {
        textAreaKeyPress: textAreaKeyPress,
        submitChat: submitChat,
        onFocusWrapper,
        onBlurWrapper,
    };
})();

textArea.addEventListener('keydown', DomEventHandler.textAreaKeyPress);
textArea.addEventListener('focus', DomEventHandler.onFocusWrapper(chatWrapper));
textArea.addEventListener('blur', DomEventHandler.onBlurWrapper(chatWrapper));

username.addEventListener('focus', DomEventHandler.onFocusWrapper(usernameWrapper));
username.addEventListener('blur', DomEventHandler.onBlurWrapper(usernameWrapper));

submitChat.addEventListener('click', DomEventHandler.submitChat);
submitChat.addEventListener('focus', DomEventHandler.onFocusWrapper(chatWrapper));
submitChat.addEventListener('blur', DomEventHandler.onBlurWrapper(chatWrapper));
