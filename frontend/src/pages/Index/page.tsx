import { useEffect, useState } from 'react';
import { TelegramUser } from '../../interfaces/Telegram';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, ContactRound, ArrowRight } from 'lucide-react';

interface IIndex {
    user?: TelegramUser
}

const Index = ({ user }: IIndex) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [isRegistered, setRegistered] = useState<boolean>(false);

    useEffect(() => {
        // const fd = new FormData();
        // if(user) {
        //     fd.append('tg_id', String(user?.id));
        //     fd.append('tg_firstname', String(user?.first_name));
        // }else {
        //     fd.append('tg_id', '00001');
        //     fd.append('tg_firstname', 'Rustem');
        // }
        // fetch('http://192.168.190.252:3000/user/create', {
        //     method: 'post',
        //     body: fd
        // }).then(e => e.text()).catch();
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='min-h-screen bg-[#EEEEEE] flex flex-col items-center justify-center font-sans'>
            <h1 className='text-3xl gradient-text'>Привет, {user ? user.first_name : 'Гость'}!</h1>
            <p className='text-gray-600 text-xl mt-1'>Куда мы направимся?</p>
            <div className='flex flex-wrap justify-center items-center gap-4 mt-8'>
                <Link to={'/aspirant'} className='flex gap-4 border border-gray-300 border-[1px] w-[300px] px-4 items-center justify-between py-3 rounded-xl'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-[rgba(240,116,39,0.3)] p-3 rounded-xl'>
                            <ContactRound size={30} color='rgb(240,116,39)' />
                        </div>
                        <span className='text-lg font-medium text-gray-700'>Я Соискатель</span>
                    </div>
                    <ArrowRight size={20} color='rgb(31,41,55)' />
                </Link>
                <Link to={'/employer'} className='flex gap-4 border border-gray-300 border-[1px] w-[300px] px-4 items-center justify-between py-3 rounded-xl'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-[rgba(49,140,231,0.3)] p-3 rounded-xl w-fit'>
                            <BriefcaseBusiness size={30} color='rgb(49,140,231)' />
                        </div>
                        <span className='text-lg font-medium text-gray-700'>Я Работодатель</span>
                    </div>
                    <ArrowRight size={20} color='rgb(31,41,55)' />
                </Link>
            </div>
       </div>
    );
};

export default Index;
