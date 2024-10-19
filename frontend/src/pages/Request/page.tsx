import { useParams } from 'react-router-dom';
import Footer from '../../components/footer';
import { useState, useEffect } from 'react';

interface IVacancy {
   company_name: string,
   company_email: string,
   minSalary: number,
   maxSalary: number,
   speciality: string,
   experience_name: string,
   description: string,
   requirements: string,
   work_time_name: string,
   location_name: string,
   speciality_level_name: string
 }

const VacancyPage = () => {

   const [data, setData] = useState<IVacancy>()
   const { id } = useParams()
 
   useEffect(() => {
     fetch('http://192.168.190.252:3000/vacancy/get?id=1', {
       method: 'get'
     }).then(e => e.json()).then(e => setData(e))
   }, []) 

    return (
        <div className='flex flex-col justify-center items-center  bg-[#EEEEEE] min-h-screen pb-20'>
            <div className=" rounded overflow-hidden rounded-2xl m-4">
                <div className="px-6 py-4 w-full max-w-[800px]">
                    <div className="font-bold text-xl mb-2"></div>
                        <h1 className='text-center text-4xl'>{data?.speciality}</h1>
                        <p className="text-gray-900 text-shadow text-xl pt-6">от {data?.minSalary} ₸ до {data?.maxSalary} ₸</p>
                        <p className="text-gray-800 mt-3 text-lg">Требуемый опыт работы: {data?.experience_name}</p>
                        <p className="text-gray-800 text-lg">График работы: {data?.work_time_name}</p>
                        <p className="text-gray-800 text-lg mt-3">Oбразование: {data?.speciality_level_name} образование</p>
                        <p className="text-gray-800 text-lg">Компания: {data?.company_name}</p>
                        <p className="text-gray-800 text-lg mt-3">{data?.requirements}</p>
                        <p className="text-slate-600 text-lg mt-3">{data?.description}</p>
                        

                    </div>
                <div className="px-6 py-4 text-center">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded">
                    Подать заявку на работу
                    </button>
                </div>
      
            </div>
            <Footer title='Назад' url='/aspirant'/>

        </div>
    );
};

export default VacancyPage;
