import { Link } from "react-router-dom";

interface IFooter {
    url?: string,
    title?: string,
    children?: React.ReactNode
}
const Footer = ({url = '', title = '', children}: IFooter) => {

    return (
        <footer className='fixed bottom-1 flex w-full justify-center bg-[#EEEEEE] border-t gap-4 py-2'>
            <Link to={url} className='py-2 px-3 text-sm bg-blue-500 text-white rounded-xl'>{title}</Link>
            { children }
        </footer>
    );

};

export default Footer;