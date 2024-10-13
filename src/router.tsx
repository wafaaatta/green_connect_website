import { createBrowserRouter } from "react-router-dom";
import Routes from "./constants/routes";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import ArticlesPage from "./pages/Articles/Articles.tsx";
import EventsPage from "./pages/Events/Events";
import AnnouncesPage from "./pages/Announces/Announces.tsx";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AnnounceDetails from "./pages/Announces/AnnounceDetails.tsx";
import PolicyPage from "./pages/Privacy/PrivacyPolicy";
import About from "./pages/About/About.tsx";
import ConversationsPage from "./pages/conversations/Conversations.tsx";
import UserProfilePage from "./pages/User/UserProfile.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import ErrorPage from "./pages/Errors/ErrorPage.tsx";
import EmailVerificationRequired from "./pages/Auth/EmailVerificationRequired.tsx";

const router =  createBrowserRouter([
    {
        path: Routes.AUTH.LOGIN,
        element: <Login />
    },
    {
        path: Routes.AUTH.EMAIL_VERIFICATION_REQUIRED,
        element: <EmailVerificationRequired />
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
                path: Routes.PAGES.ARTICLES,
                element: <ArticlesPage />
            },
            {
                path: Routes.PAGES.EVENTS,
                element: <EventsPage />
            },
            {
                path: Routes.PAGES.ANNOUNCEMENTS,
                element: <AnnouncesPage />
            },
            {
                path: Routes.PAGES.ANNOUNCE_DETAILS,
                element: <AnnounceDetails />
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
        element: <ErrorPage statusCode={404} />
    }
]);

export default router