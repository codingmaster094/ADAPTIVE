import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout({ children, hostname }) {
    return (
        <>
            <Navbar hostname={hostname} />
            <main className="maindiv">{children}</main>
            <Footer hostname={hostname} />
        </>
    );
}
