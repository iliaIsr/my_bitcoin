import {SuperButton} from "../superButton/SuperButton";
import './styles.css';
import '../../index.css';
import {useState} from "react";
import {AssetsInPortfolio} from "./assetsPortfolio/AssetsInPortfolio";
import {Form} from "../form/Form";


export const PortfolioOver = () => {

    const [active, setActive] = useState(false);

    const OpenForm = () => {
        setActive(true);
    };

    const CloseForm = () => {
        setActive(false);
    };


    return (
        <div className='container'>
            <div className='containerH1Button'>
                <h1 className='portfolioOver'>PORTFOLIO OVERVIEW</h1>
                <SuperButton onClick={OpenForm} name="добавить"/>
            </div>
            <AssetsInPortfolio/>
            {active && (
                <div className="overlay">
                    <Form onClose={CloseForm} />
                </div>
            )}
        </div>
    )
}