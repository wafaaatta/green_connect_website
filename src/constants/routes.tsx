const Routes = Object.freeze({
    HOME: '/',

    PAGES: Object.freeze({
        ANNOUNCEMENTS: '/announcements',
        ANNOUNCE_DETAILS: '/announcements/:id/details',
        EVENTS: '/events',
        EVENT_DETAILS: '/events/:id',
        ARTICLES: '/articles',
        PROFILE: '/profile',
        CONVERSATIONS: '/conversations',
        ABOUT: '/about',


        CHAT_ROOMS: '/chats',
        PRIVACY_POLICY: '/privacy-policy',
    }),

    AUTH: Object.freeze({
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
    }),

    ERRORS: Object.freeze({
        NOT_FOUND: '/404',
    }),
});

export default Routes;
