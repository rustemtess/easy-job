import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './index.css'
import AspirantPage from './pages/aspirant';
import EmployerPage from './pages/employer';
import VacancyPage from './pages/Request';
import InformationPage from './pages/information';
import RegisterPage from './pages/employer/register';
import CandidateCard from './pages/employer/worker_list/worker_information';
import JobList from './pages/employer/worker_list';

if (window.Telegram && window.Telegram.WebApp) {

  const userData = window.Telegram.WebApp.initDataUnsafe?.user;
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Index user={userData} />
    },
    {
      path: '/aspirant',
      element: <AspirantPage />
    },
    {
      path: '*',
      element: <NotFound />
    },
    {
      path: '/information',
      element: <InformationPage />
    },
    {
      path: '/employer/register' ,
      element: <RegisterPage />
    },
    {
      path: '/employer' ,
      element: <JobList />
    },
    {
      path: '/request/:id' ,
      element: <CandidateCard/>
    },
    {
      path: '/vacancy/:id',
      element: <VacancyPage />
    }

    

  ]);
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  
  root.render(
      <RouterProvider router={router} />
  );

}
