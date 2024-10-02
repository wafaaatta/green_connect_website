class Routes {
    public static HOME = '/';

    public static PAGES = class {
        public static ANNOUNCEMENTS = '/announcements'
        public static ANNOUNCE_DETAILS = '/announcements/:id/details'
        public static EVENTS = '/events'
        public static EVENT_DETAILS = '/events/:id'
        public static ARTICLES = '/articles'
        public static PROFILE = '/profile'
        public static CONVERSATIONS = '/conversations'
        public static ABOUT = '/about'


        public static CHAT_ROOMS = '/chats'
        public static PRIVACY_POLICY = '/privacy-policy'
    }

    public static AUTH = class {
        public static LOGIN = '/auth/login'
        public static REGISTER = '/auth/register'
    }

    public static ERRORS = class {
        public static NOT_FOUND = '/404'
    }

}

export default Routes