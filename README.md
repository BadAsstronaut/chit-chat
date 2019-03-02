# chit-chat

## Run it

Make sure you have Docker and docker-compose installed. Then, from the root directory of the repo, run `docker-compose up`.

Navigate to `http://localhost:3000` to see the application. Enter a user name, then click into the chat field. 

Chats can be submitted using `Control + Enter` or by clicking the `Chat` button. 

## Notes

I decided to play with some low-level implementations; the only dependencies are [ws](https://github.com/websockets/ws) for websockets and [redis](https://github.com/NodeRedis/node_redis) for data persistence. I opted to use `ws` over `socket.io` because I wanted to learn more directly about WebSocket protocols and from-scratch clients.

All of the front end code was completed using vanilla JS and the server uses the node `http` module directly.

I was actually surprised because I did not identify a lot of testing requirements for this app. I could use something like [rewire](https://www.npmjs.com/package/rewire) for testing non-exported functions and [proxyquire](https://www.npmjs.com/package/rewire) for mocking dependencies.

Thank you for reviewing and please reach out with any questions.
