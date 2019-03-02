
const KEY_MAP = {
    ENTER: 13,
};

const textArea = document.getElementById('chat-content');
const submitChat = document.getElementById('submit-chat');
const userName = document.getElementById('username');
const userNameValidation = document.getElementById('username-validation');
const output = document.getElementById('chat-log-output');

const mapMessagesToChat = messages => {
    const elems = messages.map(msg => {
        return `
        <div class="message-wrapper">
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
        textArea.value = '';
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
