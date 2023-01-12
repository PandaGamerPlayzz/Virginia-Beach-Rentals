import Styles from './Page404.module.css';

const Page404 = () => {
    return (
        <section id="section-404">
            <h1 id={Styles["label-404"]}>404</h1>
            <h1 id={Styles["label-page-not-found"]}>Page Not Found</h1>
        </section>
    );
}

export default Page404;