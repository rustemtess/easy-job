import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";

interface IObject {
  locations: {
    location_id: number,
    location_name: string
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

function InformationPage(){

    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [number, setNumber] = useState<string>('')
    const [age, setAge] = useState<number>(0);
    const [gender, setGender] = useState<number>(0)
    const [locationId, setLocationId] = useState<number>(1)
    const [email, setEmail] = useState<string>('')
    const [speciality, setSpeciality] = useState<string>('')
    const [speciality_level_id, setSpeciality_level_id] = useState<number>(1)
    const [experience, setExperience] = useState<string>('')
    const [languages, setLanguages] = useState<string>('')
    const [skill, setSkill] = useState<string>('')
    const [work_time_id, setWork_time_id] = useState<number>(1)
    const navigate = useNavigate()
    const [data, setData] = useState<IObject>();

    useEffect(() => {
      fetch('http://192.168.190.252:3000/get/formdata', {
        method: 'get'
      }).then(e => e.json()).then(e => setData(e));
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const fd = new FormData()
      fd.append('user_id', '1');
      fd.append('firstname', firstname);
      fd.append('lastname', lastname)
      fd.append('number', number)
      fd.append('age', String(age))
      fd.append('gender', String(gender))
      fd.append('location_id', String(locationId))
      fd.append('email', email)
      fd.append('speciality', speciality)
      fd.append('speciality_level_id', String(speciality_level_id))
      fd.append('experience', experience)
      fd.append('languages', languages)
      fd.append('skill', skill)
      fd.append('work_time_id', String(work_time_id))
      fetch('http://192.168.190.252:3000/request/create', {
        method: 'POST',
        body: fd
      }).then(e => e.text()).then(e => (e === 'OK') ? navigate('/aspirant') : null);
    };
  
    return (
      <div className="bg-[#EEEEEE] min-h-screen pb-20">
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-3 px-3 pt-5">
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Имя:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="firstName"
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
        </label>
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Фамилия:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="lastName"
              onChange={(e) => setLastname(e.target.value)}
              required
            />
        </label>
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Номер телефона:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="lastName"
              onChange={(e) => setNumber(e.target.value)}
              required
            />
        </label>
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Возраст:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="tel"
              name="phoneNumber"
              onChange={(e) => setAge(Number(e.target.value))}
              required
            />
        </label>
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Пол:
            <select
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              name="educationLevel"
              onChange={(e) => setGender(Number(e.target.value))}
              required
            >
              <option value={0}>Мужчина</option>
              <option value={1}>Женщина</option>
            </select>
          </label>
        <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Электронная почта:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Город проживания:
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
            Образование:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="education"
              onChange={(e) => setSpeciality(e.target.value)}
              required
            />
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
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="education"
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm d w-full max-w-[300px]">
            Знание языков:
            <input
              className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"
              type="text"
              name="languages"
              onChange={(e) => setLanguages(e.target.value)}
              required
            />
          </label>
          <label className="block mb-1 font-medium text-gray-800 text-sm w-full max-w-[300px]">
            Навыки:
            <textarea onChange={(e) => setSkill(e.target.value)} name="Навыки" className="mt-1 text-base block w-full p-1 border border-gray-300 rounded-md"></textarea>
          
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
        <button type="submit" className="w-full max-w-[300px] p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300">Зарегистрироваться</button>
      </form>
      <Footer url="/aspirant" title="Назад" />
      </div>
    );
  };


export default InformationPage;



