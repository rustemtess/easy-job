import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../../../components/footer';

interface IRequest {
  user_firstname: string,
  user_lastname: string,
  user_age: number,
  user_gender: number,
  user_speciality: string,
  experience: string,
  user_languages: string,
  user_skill: string,
  work_time_name: string,
  location_name: string,
  speciality_level_name: string
}

const CandidateCard = () => {

  const [data, setData] = useState<IRequest>()
  const { id } = useParams()

  useEffect(() => {
    fetch('http://192.168.190.252:3000/request/get?id=' + id, {
      method: 'get'
    }).then(e => e.json()).then(e => setData(e))
  }, []) 

  

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#EEEEEE] pb-20">
      <div className='max-w-[400px] w-full p-2'>
      <div className="text-gray-800">
        <h2 className="text-xl font-bold">Кандидат</h2>
        <p className="mt-2">{(data?.user_gender === 0) ? 'Мужчина' : 'Женщина'}, {data?.user_age} лет</p>
        <p className="text-green-500 font-semibold mt-2">Активно ищет работу</p>
        <p className="mt-2">{data?.location_name}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Образование</h3>
        <p className="mt-2">{data?.speciality_level_name}</p>
        <p className="mt-4 font-semibold">Специализации:</p>
        <ul className="list-disc list-inside mt-2">
          <li>{data?.user_speciality}</li>
        </ul>
      </div>

      <div className="mt-6">
        <p className="font-semibold">График работы: {data?.work_time_name}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold">Навыки</h3>
        <div className="flex flex-wrap mt-2">
            <span className="bg-gray-200 rounded-full px-4 py-2 m-1 text-sm text-gray-700">{data?.user_skill}</span>
        </div>
      </div>


      
      <div className="mt-8">
        <h3 className="text-lg font-bold">Знание языков</h3>
        <div className="flex flex-wrap mt-2">
            <span  className="bg-gray-200 rounded-full px-4 py-2 m-1 text-sm text-gray-700">{data?.user_languages}</span>
        </div>
      </div>
        </div>
        <Footer title='Назад' url='/employer' />
    </div>
  );
};

export default CandidateCard;