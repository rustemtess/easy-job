import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer";

interface IRequest {
  id: number,
  location_name: string,
  age: number,
  work_time_name: string,
  experience: string,
  speciality: string
}

const JobList = () => {

  const [data, setData] = useState<Array<IRequest>>()

    useEffect(() => {
        try{
            fetch('http://192.168.190.252:3000/request/list', {
                method: 'get'
            }).then(e => e.json()).then(e => setData(e)).catch(e => console.log(e))
        }catch(Exception) {
            
        }
    }, [])

  return (
    <div className="flex flex-col items-center space-y-4 p-2 overflow-auto min-h-screen bg-[#EEEEEE] pb-20">
      { data && data.map(e => {
                    return <Link to={'/request/' + e.id} className="w-full max-w-md p-6 border border-gray-200 rounded-lg bg-white">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold">
                          {e.speciality}
                        </h2>
                        <p className="text-sm text-gray-500">{e.age} лет</p>
                        <p className="inline-block mt-2 px-3 py-1 text-sm text-green-700 bg-green-100 rounded-lg">
                          Активно ищет работу
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm text-slate-500">Опыт работы</h3>
                      <p className="text-sm font-medium">{e.experience}</p>
                      <h3 className="text-sm mt-1 text-slate-500">График работы</h3>
                      <p className="text-sm font-medium">{e.work_time_name}</p>
                      <h3 className="text-sm mt-1 text-slate-500">Город</h3>
                      <p className="text-sm font-medium">{e.location_name}</p>
                    </div>
                  </Link>
                }) }
                { !data && <p>Никаких заявок нет</p> }
                <Footer title="Создать вакансию" url="/employer/register">
                <Link to={'/aspirant'} className='py-2 px-3 text-sm bg-blue-500 text-white rounded-xl'>Сооискателям</Link>
                </Footer>
    </div>
  );
};

export default JobList;
