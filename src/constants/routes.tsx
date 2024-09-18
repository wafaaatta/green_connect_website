class Routes {
    public static HOME = '/';

    public static PAGES = class {
        public static POSTS = '/posts'
        public static POST_DETAILS = '/posts/:id/details'
        public static EVENTS = '/events'
        public static EVENT_DETAILS = '/events/:id'
        public static BLOGS = '/blogs'
        public static ABOUT = '/about'

        public static PLANTS_WIKI = '/plants-wiki'
        public static PLANT_DETAILS = '/plants-wiki/:id'

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