import './style.css'

type SuperInputPropsType = {
    type: string;
    placeholder: string;
    value?: string|number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export const SuperInput = (props: SuperInputPropsType) => {
    return (
        <div className='input-container'>
            <input
                className='custom-input'
                type={props.type}
                placeholder={props.placeholder}
                value={props.value === 0 ? '' : props.value}
                onChange={props.onChange}
            />
        </div>
    );
};