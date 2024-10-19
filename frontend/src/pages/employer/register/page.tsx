import React, { useState, useEffect } from 'react';
import Footer from '../../../components/footer';
import { useNavigate } from 'react-router-dom';

interface IObject {
  locations: {
    location_id: number,
    location_name: string
  }[],
  experiences: {
    experience_id: number,
    experience_name: string
  }[],
  speciality_level: {
    speciality_level_id: number,
    speciality_level_name: string
  }[]
  work_time: {
    work_time_id: number,
    work_time_name: string
  }[]
}

function RegisterPage() {

  const [companyName, setCompanyName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [locationId, setLocationId] = useState<number>(1)
  const [speciality, setSpeciality] = useState<string>('')
  const [minSalary, setMinSalary] = useState<number>(0);
  const [maxSalary, setMaxSalary] = useState<number>(0);
  const [experienceId, setExperienceId] = useState<number>(1)
  const [work_time_id, setWork_time_id] = useState<number>(1)
  const [speciality_level_id, setSpeciality_level_id] = useState<number>(1)
  const [requirements, setRequirements] = useState<string>('')
  const [data, setData] = useState<IObject>();
  const [description, setDescription] = useState<string>('')
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://192.168.190.252:3000/get/formdata', {
      method: 'get'
    }).then(e => e.json()).then(e => setData(e));
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData()
    fd.append('user_id', '1');
    fd.append('companyName', companyName)
    fd.append('location_id', String(locationId))
    fd.append('email', email)
    fd.append('speciality', speciality)
    fd.append('speciality_level_id', String(speciality_level_id))
    fd.append('experience_id', String(experienceId))
    fd.append('work_time_id', String(work_time_id))
    fd.append('requirements', requirements)
    fd.append('description', description)
    fd.append('minSalary', String(minSalary))
    fd.append('maxSalary', String(maxSalary))

    fetch('http://192.168.190.252:3000/vacancy/create', {
      method: 'POST',
      body: fd
    }).then(e => e.text()).then(e => (e === 'OK') ? navigate('/employer') : null);
  };

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#EEEEEE] pb-20">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3 px-3 pt-5 w-full">
          <label className="block mb-1 font-medium text-gray-800 text-sm w-full max-w-[300px]">
            Название компании:
            <input
              type="text"
              name="companyName"
              required
              onChange={(e) => setCompanyName(e.target.value)}
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>

          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Электронная почта:
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Специалист:
            <input
              type="text"
              name="email"
              onChange={(e) => setSpeciality(e.target.value)}
              required
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Город:
            <select
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              name="educationLevel"
              onChange={(e) => setLocationId(Number(e.target.value))}
              required
            >
              {data && data.locations.map(e => {
                return <option value={e.location_id}>{e.location_name}</option>
              })}
              </select>
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Уровень образования:
            <select
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              name="educationLevel"
              onChange={(e) => setSpeciality_level_id(Number(e.target.value))}
              required
            >
              {data && data.speciality_level.map(e => {
                return <option value={e.speciality_level_id}>{e.speciality_level_name}</option>
              })}
            </select>
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Опыт работы:
            <select
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              name="educationLevel"
              onChange={(e) => setExperienceId(Number(e.target.value))}
              required
            >
              {data && data.experiences.map(e => {
                return <option value={e.experience_id}>{e.experience_name}</option>
              })}
            </select>
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            График работы:
            <select
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              name="educationLevel"
              onChange={(e) => setWork_time_id(Number(e.target.value))}
              required
            >
              {data && data.work_time.map(e => {
                return <option value={e.work_time_id}>{e.work_time_name}</option>
              })}
            </select>
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Зарплата от:
            <input
              type="number"
              name="email"
              onChange={(e) => setMinSalary(Number(e.target.value))}
              required
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Зарплата до:
            <input
              type="number"
              name="email"
              onChange={(e) => setMaxSalary(Number(e.target.value))}
              required
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Требования к вакансии:
            <textarea
              name="jobRequirements"
              onChange={(e) => setRequirements(e.target.value)}
              required
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Описание компании:
            <textarea
              name="companyDescription"
              required
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
            />
          </label>

        <button type="submit" className="w-full max-w-[300px] p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">
          Зарегистрироваться
        </button>
      </form>
      <Footer title='Назад' url='/employer' />
    </div>
  );
};


export default RegisterPage