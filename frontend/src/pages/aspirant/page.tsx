import Footer from "../../components/footer";
import Header from "../../components/header";
import { TelegramUser } from "../../interfaces/Telegram";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface IAspirantPage {
    user?: TelegramUser
}

interface IRequest {
    id: number,
    location_name: string,
    work_time_name: string,
    experience_name: string,
    speciality: string
}

const AspirantPage = ({ user }: IAspirantPage) => {

    const [data, setData] = useState<Array<IRequest>>()

    useEffect(() => {
        try{
            fetch('http://192.168.190.252:3000/vacancy/list', {
                method: 'get'
            }).then(e => e.json()).then(e => setData(e)).catch(e => console.log(e))
        }catch(Exception) {
            
        }
    }, [])

    return (
        <div className='min-h-screen flex flex-col p-2 bg-[#EEEEEE]'>
            <Header />
            <section className='flex flex-col gap-4 items-center'>
                { data && data.map(e => {
                    return <Link to={`/vacancy/` + e.id} className='border w-full max-w-[400px] px-4 py-5 flex flex-col gap-3 rounded-xl bg-white'>
                                <h2 className='text-xl font-medium'>{e.speciality}</h2>
                                <p className="inline-block px-3 py-1 text-sm text-red-700 bg-red-100 rounded-lg w-fit">
                                    Имеется вакансия
                                </p>
                                <div className='flex flex-wrap gap-2'>
                                    <p className='bg-orange-100 text-sm px-2 py-1 rounded'>Опыт {e.experience_name}</p>
                                    <p className='bg-green-100 text-sm px-2 py-1 rounded'>{e.work_time_name}</p>
                                </div>
                                <p className='text-slate-700'>{e.location_name}</p>
                            </Link>
                }) }
                { !data && <p>Никаких заявок нет</p> }
            </section>
            <Footer url="/information" title="Создать заявку">
                <Link to={'/employer'} className='py-2 px-3 text-sm bg-blue-500 text-white rounded-xl'>Работодателям</Link>
            </Footer>
        </div>
    );

};

export default AspirantPage;