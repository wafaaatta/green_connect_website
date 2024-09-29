const PusherBroadcasts = Object.freeze({
    channels: {
        conversations: 'conversations-channel', 
        message_creation: 'message-creation-channel', 
    },

    events: {
        conversations: {
            created: 'conversation.created',
        },

        messages: {
            created: 'message.created',
        }
    }
})

export default PusherBroadcasts