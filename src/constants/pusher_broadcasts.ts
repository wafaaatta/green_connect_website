const PusherBroadcasts = Object.freeze({
    channels: {
        conversations: 'conversations-channel', 
        message_creation: 'message-creation-channel', 
    },

    events: {
        conversations: {
            created: 'conversation.created',
            updated: 'conversation.updated',
            deleted: 'conversation.deleted',
        },

        messages: {
            created: 'message.created',
        }
    }
})

export default PusherBroadcasts