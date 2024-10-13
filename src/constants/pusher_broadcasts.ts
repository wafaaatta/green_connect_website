const PusherBroadcasts = Object.freeze({
    channels: {
        conversations: 'conversations-channel', 
        message_creation: 'message-creation-channel',
        email_verification: 'email-verification-channel',
    },

    events: {
        conversations: {
            created: 'conversation.created',
            updated: 'conversation.updated',
            deleted: 'conversation.deleted',
        },

        messages: {
            created: 'message.created',
        },

        email_verification: {
            success: 'email-verification.success',
        }
    }
})

export default PusherBroadcasts