import "./style.css"

type SuperButtonPropsType = {
    onClick?: () => void,
    name?: string
}

export const SuperButton = (props: SuperButtonPropsType) => {

    return (
        <div>
            <button className="superButton" onClick={props.onClick}>{props.name}</button>
        </div>
    )

}