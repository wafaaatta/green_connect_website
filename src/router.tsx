import { createBrowserRouter } from "react-router-dom";
import Routes from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import BlogsPage from "./pages/Blogs/Blogs";
import EventsPage from "./pages/Events/Events";
import PostsPage from "./pages/Posts/Posts";
import EventDetailsPage from "./pages/Events/Details/EventDetails";
import Custom404 from "./pages/Errors/404";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PostDetails from "./pages/Posts/PostDetails";
import PolicyPage from "./pages/Privacy/PrivacyPolicy";
import About from "./pages/About/About.tsx";
import ConversationsPage from "./pages/conversations/Conversations.tsx";
import UserProfilePage from "./pages/User/UserProfile.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import RequireAuth from "./components/RequireAuth.tsx";

const router =  createBrowserRouter([
    {
        path: Routes.AUTH.LOGIN,
        element: <Login />
    },
    {
        path: Routes.AUTH.REGISTER,
        element: <Register />
    },
    {
        path: Routes.PAGES.CONVERSATIONS,  
        element: <UserLayout /> ,
        children: [
            {
                path: Routes.PAGES.CONVERSATIONS,
                element: <RequireAuth>
                    <ConversationsPage />
                </RequireAuth>
            }
        ]
    },
    {
        path: Routes.PAGES.PROFILE,  
        element: <UserLayout />,
        children: [
            {
                path: Routes.PAGES.PROFILE,
                element: <RequireAuth>
                    <UserProfilePage />
                </RequireAuth>
            }
        ]
    },
    {
        path: Routes.HOME,
        element: <MainLayout />,
        children: [
            {
                path: Routes.HOME,
                element: <Home />
            },
            {
                path: Routes.PAGES.BLOGS,
                element: <BlogsPage />
            },
            {
                path: Routes.PAGES.EVENTS,
                element: <EventsPage />
            },
            {
                path: Routes.PAGES.POSTS,
                element: <PostsPage />
            },
            {
                path: Routes.PAGES.POST_DETAILS,
                element: <PostDetails />
            },
            {
                path: Routes.PAGES.EVENT_DETAILS,
                element: <EventDetailsPage />
            },
            {
                path: Routes.PAGES.PRIVACY_POLICY,
                element: <PolicyPage />
            },
            {
                path: Routes.PAGES.ABOUT,  
                element: <About />  
            },
        ]
    },
    {
        path: '*',
        element: <Custom404 />
    }
]);

export default router